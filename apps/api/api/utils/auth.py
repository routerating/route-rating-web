from typing import Optional, Tuple

from munch import Munch
import logging
from api.jwt import Jwt, JwtPayload

ADMIN_AUTHORITY = "ADMIN"
BASIC_AUTHORITY = "BASIC"


class Auth:
    def __init__(self, event):
        self._event = Munch.fromDict(event)
        self.jwt = Jwt()

    @property
    def auth_header(self) -> Optional[str]:
        if self.event.headers.get("Authorization"):
            return (
                self.event.headers.Authorization[7:]
                if "Bearer " in self.event.headers.Authorization
                else self.event.headers.Authorization
            )

    @property
    def refresh_header(self) -> Optional[str]:
        if self.event.headers.get("Refresh"):
            return (
                self.event.headers.Refresh[7:]
                if "Bearer " in self.event.headers.Refresh
                else self.event.headers.Refresh
            )

    def validate_jwt(self) -> Tuple[bool, Optional[str], Optional[str]]:
        jwt_payload = self.get_jwt_payload()

        if not jwt_payload:
            logging.info("JWT payload is missing.")
            return False, None, None

        if not jwt_payload.all_fields_present():
            logging.info("JWT payload is missing a field.")
            return False, None, None

        if jwt_payload.is_expired():
            refresh_payload = self.get_refresh_payload()

            if (
                refresh_payload
                and refresh_payload.all_fields_present()
                and not refresh_payload.is_expired()
            ):
                new_jwt = self.jwt.extend_jwt_token(jwt_payload)
                return (
                    True,
                    new_jwt,
                    self.refresh_header,
                )

            return False, None, None

        return True, self.auth_header, self.refresh_header

    def is_admin(self) -> bool:
        payload = self.get_jwt_payload()
        return ADMIN_AUTHORITY in payload.authorities if payload else False

    def get_jwt_payload(self) -> Optional[JwtPayload]:
        return self.jwt.decode_jwt_token(self.auth_header)

    def get_refresh_payload(self) -> Optional[JwtPayload]:
        return self.jwt.decode_refresh_token(self.refresh_header)

    @property
    def event(self) -> Munch:
        return Munch.fromDict(self._event)
