import time
from typing import Optional

import jwt
import os
from jwt import DecodeError
import logging

ONE_DAY = 86_400_000
ONE_WEEK = ONE_DAY * 7


def current_milli_time():
    return int(round(time.time() * 1000))


class JwtPayload:
    def __init__(self, user_id, email, authorities, issued_at, expires_in):
        self.id = user_id
        self.email = email
        self.authorities = authorities
        self.issued_at = issued_at
        self.expires_in = expires_in

    def all_fields_present(self):
        return (
            self.id
            and self.email
            and self.authorities
            and self.issued_at
            and self.expires_in
        )

    def is_expired(self):
        return (
            self.expires_in != "never"
            and int(self.issued_at) + int(self.expires_in) < current_milli_time()
        )

    @classmethod
    def from_jwt_payload(cls, jwt_payload):
        return cls(
            jwt_payload.get("id", None),
            jwt_payload.get("email", None),
            jwt_payload.get("authorities", None),
            jwt_payload.get("issued_at", None),
            jwt_payload.get("expires_in", None),
        )

    @classmethod
    def generate_as_dict(cls, user_id, email, authorities, expires_in):
        return cls(
            user_id, email, authorities, current_milli_time(), expires_in
        ).as_dict()

    def as_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "authorities": self.authorities,
            "issued_at": self.issued_at,
            "expires_in": self.expires_in,
        }


class Jwt:
    def __init__(self):
        self._jwt_secret = os.getenv("JWT_SECRET")
        self._refresh_secret = os.getenv("REFRESH_SECRET")
        self._algorithm = "HS256"

    def generate_jwt_token(self, user) -> str:
        return self._generate_jwt(
            JwtPayload.generate_as_dict(user.id, user.email, [user.authority], ONE_DAY),
            self._jwt_secret,
        )

    def generate_refresh_token(self, user) -> str:
        return self._generate_jwt(
            JwtPayload.generate_as_dict(
                user.id, user.email, [user.authority], ONE_WEEK
            ),
            self._refresh_secret,
        )

    def extend_jwt_token(self, jwt_payload: JwtPayload) -> str:
        return self._generate_jwt(
            JwtPayload.generate_as_dict(
                jwt_payload.id, jwt_payload.email, jwt_payload.authorities, ONE_DAY
            ),
            self._jwt_secret,
        )

    def _generate_jwt(self, payload, secret) -> str:
        return jwt.encode(payload, secret, self._algorithm).decode("utf8")

    def decode_jwt_token(self, token) -> Optional[JwtPayload]:
        return self._decode_token(token, self._jwt_secret)

    def decode_refresh_token(self, token) -> Optional[JwtPayload]:
        return self._decode_token(token, self._refresh_secret)

    def _decode_token(self, token, secret) -> Optional[JwtPayload]:
        try:
            return JwtPayload.from_jwt_payload(
                jwt.decode(token, secret, algorithms=[self._algorithm])
            )
        except DecodeError as e:
            logging.debug(e)
            return None
