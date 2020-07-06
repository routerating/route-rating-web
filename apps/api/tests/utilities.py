from unittest.mock import Mock

import os

from api.jwt import Jwt


class ApiGatewayEvent:
    def __init__(self, headers=None, body=None):
        self.headers = headers
        self.body = body

    def as_dict(self):
        return {"headers": self.headers, "body": self.body}


def generate_jwt(payload, secret=None):
    if not secret:
        secret = os.getenv("JWT_SECRET")

    return Jwt()._generate_jwt(payload, secret) if secret else None


def generate_refresh(payload, secret=None):
    if not secret:
        secret = os.getenv("REFRESH_SECRET")

    return Jwt()._generate_jwt(payload, secret) if secret else None


class MockUsersRepository:
    def __init__(self):
        self.get_user_by_email = Mock(return_value=None)
        self.get_user_by_username = Mock(return_value=None)
        self.get_user_by_id = Mock(return_value=None)
        self.update = Mock(return_value=None)
        self.save = Mock(return_value=None)
