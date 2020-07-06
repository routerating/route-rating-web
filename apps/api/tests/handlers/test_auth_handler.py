from unittest.mock import patch
from api.utils.auth import Auth
from api.handlers.auth_handler import (
    basic_auth_handler,
    admin_auth_handler,
    login_handler,
)
from api.users.user import User
from tests.offline_handler import OfflineHandler
from tests.test_base import TestBase
from tests.utilities import (
    ApiGatewayEvent,
    generate_jwt,
    generate_refresh,
)
import os
import bcrypt


class TestAuthHandler(TestBase):
    def setUp(self) -> None:
        self.valid_jwt_payload = {
            "email": "lukeshay",
            "id": "some_id",
            "authorities": "ADMIN",
            "expires_in": "never",
            "issued_at": "10000",
        }
        self.expired_jwt_payload = {
            "email": "lukeshay",
            "id": "some_id",
            "authorities": "ADMIN",
            "expires_in": "0",
            "issued_at": "0",
        }
        self.valid_basic_jwt_payload = {
            "email": "lukeshay",
            "id": "some_id",
            "authorities": "BASIC",
            "expires_in": "never",
            "issued_at": "10000",
        }
        self.invalid_jwt_payload_no_expires = {
            "email": "lukeshay",
            "id": "some_id",
            "authorities": "ADMIN",
            "issued_at": "10000",
        }
        self.invalid_jwt_payload_no_email = {
            "id": "some_id",
            "authorities": "ADMIN",
            "expires_in": "never",
            "issued_at": "10000",
        }
        self.invalid_jwt_payload_no_authorities = {
            "email": "lukeshay",
            "id": "some_id",
            "expires_in": "never",
            "issued_at": "10000",
        }
        self.invalid_jwt_payload_no_id = {
            "email": "lukeshay",
            "authorities": "ADMIN",
            "expires_in": "never",
            "issued_at": "10000",
        }
        self.invalid_jwt_payload_no_issued_at = {
            "email": "lukeshay",
            "id": "some_id",
            "authorities": "ADMIN",
            "expires_in": "never",
        }

        self.test_password = "some_password"
        self.test_id = "THIS IS AN ID"

        self.test_user = User(
            email="some_email",
            password=bcrypt.hashpw(
                self.test_password.encode("utf8"),
                bcrypt.gensalt(rounds=10, prefix=b"2a"),
            ).decode("utf8"),
            user_id=self.test_id,
            authority="ADMIN",
            role="ADMIN_ROLE",
            state="Iowa",
            city="Ames",
            username="some_username",
            first_name="some_first_name",
            last_name="some_last_name",
            phone_number="8765309",
        )

    def test_basic_admin_valid_jwt(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.valid_jwt_payload)}
        )

        self.assertEqual(200, response.get("statusCode", None))

    def test_basic_basic_valid_jwt(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.valid_basic_jwt_payload)}
        )

        self.assertEqual(200, response.get("statusCode", None))

    def test_basic_invalid_jwt_no_expires(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.invalid_jwt_payload_no_expires)}
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_basic_invalid_jwt_no_email(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.invalid_jwt_payload_no_email)}
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_basic_invalid_jwt_no_id(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.invalid_jwt_payload_no_id)}
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_basic_invalid_jwt_no_authorities(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={
                "Authorization": generate_jwt(self.invalid_jwt_payload_no_authorities)
            }
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_basic_invalid_jwt_no_issued_at(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={
                "Authorization": generate_jwt(self.invalid_jwt_payload_no_issued_at)
            }
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_basic_invalid_jwt_wrong_secret(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={
                "Authorization": generate_jwt(
                    self.valid_jwt_payload,
                    secret="nmSRM5ERGOE4NR8RE41cdvDeIUecHCjSiRzqztG2Fi1kOqol",
                )
            }
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_basic_no_jwt(self):
        response = basic_auth_handler(ApiGatewayEvent(headers={}).as_dict(), None,)
        self.assertEqual(403, response.get("statusCode", None))

    def test_basic_expired_jwt(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.expired_jwt_payload,)}
        )
        self.assertEqual(403, response.get("statusCode", None))

    def test_basic_expired_jwt_with_refresh(self):
        response = OfflineHandler(basic_auth_handler).handle_v2(
            headers={
                "Authorization": generate_jwt(self.expired_jwt_payload),
                "Refresh": generate_jwt(
                    self.valid_jwt_payload, secret=os.getenv("REFRESH_SECRET")
                ),
            }
        )
        self.assertEqual(200, response.get("statusCode", None))
        self.assertNotEqual(
            generate_jwt(self.expired_jwt_payload),
            response.get("headers").get("Authorization"),
        )

    def test_basic_unexpected_exception(self):
        response = basic_auth_handler(ApiGatewayEvent().as_dict(), None)
        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_admin_valid_jwt(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.valid_jwt_payload)}
        )

        self.assertEqual(200, response.get("statusCode", None))

    def test_admin_basic_valid_jwt(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.valid_basic_jwt_payload)}
        )

        self.assertEqual(401, response.get("statusCode", None))

    def test_admin_invalid_jwt_no_expires(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.invalid_jwt_payload_no_expires)}
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_invalid_jwt_no_email(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.invalid_jwt_payload_no_email)}
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_invalid_jwt_no_id(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.invalid_jwt_payload_no_id)}
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_invalid_jwt_no_authorities(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={
                "Authorization": generate_jwt(self.invalid_jwt_payload_no_authorities)
            }
        )
        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_invalid_jwt_no_issued_at(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={
                "Authorization": generate_jwt(self.invalid_jwt_payload_no_issued_at)
            }
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_invalid_jwt_wrong_secret(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={
                "Authorization": generate_jwt(
                    self.valid_jwt_payload,
                    secret="nmSRM5ERGOE4NR8RE41cdvDeIUecHCjSiRzqztG2Fi1kOqol",
                )
            }
        )

        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_no_jwt(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(headers={})
        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_expired_jwt(self):
        response = OfflineHandler(admin_auth_handler).handle_v2(
            headers={"Authorization": generate_jwt(self.expired_jwt_payload)}
        )
        self.assertEqual(403, response.get("statusCode", None))

    def test_admin_unexpected_exception(self):
        response = OfflineHandler(admin_auth_handler).handle_v2()
        self.assertEqual(403, response.get("statusCode", None))

    def test_get_refresh_token(self):
        auth = Auth(
            ApiGatewayEvent(
                headers={
                    "Refresh": f"Bearer {generate_refresh(self.valid_jwt_payload)}"
                }
            ).as_dict(),
        )

        self.assertEqual(generate_refresh(self.valid_jwt_payload), auth.refresh_header)

    @patch("api.users.users_repository.UsersRepository.get_user_by_email")
    def test_login_valid_credentials(self, mock_get_user_by_email):
        mock_get_user_by_email.return_value = self.test_user

        response = OfflineHandler(login_handler).handle_v2(
            body={"email": self.test_user.email, "password": self.test_password,}
        )

        self.assertEqual(200, response.get("statusCode", None))
        self.assertEqual(self.test_user.email, response.get("body")["email"])
        self.assertEqual(self.test_user.id, response.get("body")["id"])
        self.assertIsNotNone(response.get("headers").get("Authorization"))
        self.assertIsNotNone(response.get("headers").get("Refresh"))
        self.assertTrue("Bearer " in response.get("headers").get("Authorization"))
        self.assertTrue("Bearer " in response.get("headers").get("Refresh"))

    @patch("api.users.users_repository.UsersRepository.get_user_by_email")
    def test_login_invalid_credentials(self, mock_get_user_by_email):
        mock_get_user_by_email.return_value = self.test_user
        response = OfflineHandler(login_handler).handle_v2(
            body={"email": self.test_user.email, "password": "EYYYEYE"}
        )
        self.assertEqual(403, response.get("statusCode", None))
