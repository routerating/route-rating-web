import uuid
from unittest.mock import patch, Mock

from api.jwt import Jwt
from api.users import users_service
from api.users.user import User
from api.handlers.users_handler import (
    create_user_handler,
    create_admin_user_handler,
    update_user_handler,
)
from tests.offline_handler import OfflineHandler
from tests.test_base import TestBase

from tests.utilities import (
    ApiGatewayEvent,
    generate_jwt,
    MockUsersRepository,
)


class TestCreateUsersHandlers(TestBase):
    def setUp(self) -> None:
        self.valid_new_user = User(
            first_name="first",
            last_name="last",
            email="email@gmail.com",
            password="LKJ)(*098ljk",
            username="someusername",
            city="Ames",
            state="Iowa",
            phone_number="9999999999",
            authority=None,
            role=None,
            user_id=str(uuid.uuid4()),
        )

        self.invalid_new_user = User(
            first_name="first",
            last_name="last",
            email="emailgmail.com",
            password="aa)(*098ljk",
            username="someu)(*&^%$sername",
            city="Ames",
            state="Iowa",
            phone_number="999999999",
            authority=None,
            role=None,
            user_id=str(uuid.uuid4()),
        )
        self.valid_jwt_payload = {
            "email": "lukeshay",
            "id": "some_id",
            "authorities": "ADMIN",
            "expires_in": "never",
            "issued_at": "10000",
        }
        self.valid_basic_jwt_payload = {
            "email": "lukeshay",
            "id": "some_id",
            "authorities": "BASIC",
            "expires_in": "never",
            "issued_at": "10000",
        }

        self.basic_headers = {
            "Authorization": f"Bearer {generate_jwt(self.valid_basic_jwt_payload)}"
        }
        self.admin_headers = {
            "Authorization": f"Bearer {generate_jwt(self.valid_jwt_payload)}"
        }

    @patch("api.users.users_repository.UsersRepository.save")
    @patch("api.users.users_repository.UsersRepository.get_user_by_email")
    @patch("api.users.users_repository.UsersRepository.get_user_by_username")
    def test_create_valid_basic_user(
        self, mock_get_user_by_username, mock_get_user_by_email, mock_save
    ):
        mock_get_user_by_username.return_value = None
        mock_get_user_by_email.return_value = None
        mock_save.return_value = self.valid_new_user

        response = OfflineHandler(create_user_handler).handle(
            ApiGatewayEvent(body=self.valid_new_user.as_camel_dict()).as_dict()
        )

        mock_get_user_by_username.assert_called_once()
        mock_get_user_by_email.assert_called_once()
        mock_save.assert_called_once()
        self.assertEqual(self.valid_new_user.as_json_response(), response["body"])
        self.assertEqual(200, response["statusCode"])

    def test_create_missing_field_basic_user(self):
        response = OfflineHandler(create_user_handler).handle(
            ApiGatewayEvent(body={}).as_dict()
        )
        self.assertEqual({"message": "A field is missing."}, response["body"])
        self.assertEqual(400, response["statusCode"])

    @patch("api.users.users_repository.UsersRepository.save")
    @patch("api.users.users_repository.UsersRepository.get_user_by_email")
    @patch("api.users.users_repository.UsersRepository.get_user_by_username")
    def test_create_valid_basic_user_username_and_email_taken(
        self, mock_get_user_by_username, mock_get_user_by_email, mock_save
    ):
        temp_user = self.valid_new_user
        temp_user.id = "adsf"
        mock_get_user_by_username.return_value = self.valid_new_user
        mock_get_user_by_email.return_value = self.valid_new_user

        response = OfflineHandler(create_user_handler).handle(
            ApiGatewayEvent(body=self.valid_new_user.as_camel_dict()).as_dict()
        )

        mock_get_user_by_username.assert_called_once()
        mock_get_user_by_email.assert_called_once()
        mock_save.assert_not_called()
        self.assertEqual(
            {"email": "Email is taken.", "username": "Username is taken."},
            response["body"],
        )
        self.assertEqual(400, response["statusCode"])

    @patch("api.users.users_repository.UsersRepository.save")
    @patch("api.users.users_repository.UsersRepository.get_user_by_email")
    @patch("api.users.users_repository.UsersRepository.get_user_by_username")
    def test_create_invalid_basic_user(
        self, mock_get_user_by_username, mock_get_user_by_email, mock_save
    ):
        mock_get_user_by_username.return_value = None
        mock_get_user_by_email.return_value = None
        mock_save.return_value = self.valid_new_user

        response = OfflineHandler(create_user_handler).handle_v2(
            body=self.invalid_new_user.as_camel_dict()
        )

        self.assertEqual(
            {
                "email": "Invalid email.",
                "password": "Invalid password.",
                "username": "Invalid username.",
                "phoneNumber": "Invalid phone number.",
            },
            response["body"],
        )
        self.assertEqual(400, response["statusCode"])

    @patch("api.users.users_repository.UsersRepository.save")
    @patch("api.users.users_repository.UsersRepository.get_user_by_email")
    @patch("api.users.users_repository.UsersRepository.get_user_by_username")
    def test_create_valid_admin_user(
        self, mock_get_user_by_username, mock_get_user_by_email, mock_save
    ):
        mock_get_user_by_username.return_value = None
        mock_get_user_by_email.return_value = None
        mock_save.return_value = self.valid_new_user

        response = OfflineHandler(create_admin_user_handler).handle_v2(
            body=self.valid_new_user.as_camel_dict(), headers=self.admin_headers
        )

        self.assertEqual(200, response["statusCode"])
        self.assertEqual(self.valid_new_user.as_json_response(), response["body"])
        mock_get_user_by_username.assert_called_once()
        mock_get_user_by_email.assert_called_once()
        mock_save.assert_called_once()

    def test_create_missing_field_admin_user(self):
        response = OfflineHandler(create_admin_user_handler).handle(
            ApiGatewayEvent(body={}, headers=self.admin_headers).as_dict()
        )
        self.assertEqual({"message": "A field is missing."}, response["body"])
        self.assertEqual(400, response["statusCode"])

    @patch("api.users.users_repository.UsersRepository.save")
    @patch("api.users.users_repository.UsersRepository.get_user_by_email")
    @patch("api.users.users_repository.UsersRepository.get_user_by_username")
    def test_create_valid_admin_user_username_and_email_taken(
        self, mock_get_user_by_username, mock_get_user_by_email, mock_save
    ):
        temp_user = self.valid_new_user
        temp_user.id = "adsf"
        mock_get_user_by_username.return_value = self.valid_new_user
        mock_get_user_by_email.return_value = self.valid_new_user

        response = OfflineHandler(create_admin_user_handler).handle(
            ApiGatewayEvent(
                body=self.valid_new_user.as_camel_dict(), headers=self.admin_headers
            ).as_dict()
        )

        mock_get_user_by_username.assert_called_once()
        mock_get_user_by_email.assert_called_once()
        mock_save.assert_not_called()
        self.assertEqual(
            {"email": "Email is taken.", "username": "Username is taken."},
            response["body"],
        )
        self.assertEqual(400, response["statusCode"])

    @patch("api.users.users_repository.UsersRepository.save")
    @patch("api.users.users_repository.UsersRepository.get_user_by_email")
    @patch("api.users.users_repository.UsersRepository.get_user_by_username")
    def test_create_invalid_admin_user(
        self, mock_get_user_by_username, mock_get_user_by_email, mock_save
    ):
        mock_get_user_by_username.return_value = None
        mock_get_user_by_email.return_value = None
        mock_save.return_value = self.valid_new_user

        response = OfflineHandler(create_admin_user_handler).handle_v2(
            body=self.invalid_new_user.as_camel_dict(), headers=self.admin_headers
        )

        self.assertEqual(
            {
                "email": "Invalid email.",
                "password": "Invalid password.",
                "username": "Invalid username.",
                "phoneNumber": "Invalid phone number.",
            },
            response["body"],
        )
        self.assertEqual(400, response["statusCode"])

    def test_create_admin_user_unauthorized(self):
        response = OfflineHandler(create_admin_user_handler).handle(
            ApiGatewayEvent(body={}, headers=self.basic_headers).as_dict()
        )
        self.assertEqual({}, response["body"])
        self.assertEqual(401, response["statusCode"])


class TestUpdateUserHandler(TestBase):
    def setUp(self):
        self.update_user_handler = OfflineHandler(update_user_handler)

        self.basic_user = User(
            user_id=str(uuid.uuid4()),
            first_name="first",
            last_name="last",
            email="email@gmail.com",
            password="LKJ)(*098ljk",
            username="someusername",
            city="Ames",
            state="Iowa",
            phone_number="9999999999",
            authority="BASIC",
            role="BASIC_ROLE",
        )

        self.basic_user_update = User(
            user_id=self.basic_user.id,
            email="email2@gmail.com",
            username="someusername4",
            password="!$&FGHJh123ja",
            city="Ames",
            state="Iowa",
            phone_number="9999999999",
        )

        self.basic_user_headers = {
            "Authorization": f"Bearer {Jwt().generate_jwt_token(self.basic_user)}"
        }

        self.admin_user = User(
            user_id=str(uuid.uuid4()),
            first_name="first",
            last_name="last",
            email="email@gmail.com",
            password="LKJ)(*098ljk",
            username="someusername",
            city="Ames",
            state="Iowa",
            phone_number="9999999999",
            authority="ADMIN",
            role="ADMIN_ROLE",
        )

        self.admin_user_headers = {
            "Authorization": f"Bearer {Jwt().generate_jwt_token(self.admin_user)}"
        }

        self.mock_users_repository = MockUsersRepository()
        self.temp_mock = Mock(return_value=self.mock_users_repository)

        users_service.UsersRepository = self.temp_mock

    def test_update_user_handler_valid_basic_user(self):
        self.basic_user_update.username = self.basic_user.username
        user = self.basic_user_update + self.basic_user

        self.mock_users_repository.get_user_by_id.return_value = self.basic_user
        self.mock_users_repository.update.return_value = user

        response = OfflineHandler(update_user_handler).handle_v2(
            headers=self.basic_user_headers,
            body=self.basic_user_update.as_camel_dict(),
        )

        user.password = self.users_service.encrypt_password(user.password)

        self.assertEqual(200, response["statusCode"])
        self.assertEqual(user.as_json_response(), response["body"])
        self.mock_users_repository.get_user_by_id.assert_called_once_with(user.id)
        self.mock_users_repository.get_user_by_username.assert_not_called()
        self.mock_users_repository.get_user_by_email.assert_called_once_with(user.email)
        self.mock_users_repository.update.assert_called_once_with(user.as_snake_dict())

    def test_update_user_handler_valid_basic_user_no_password(self):
        self.basic_user_update.password = None
        self.basic_user_update.username = self.basic_user.username
        user = self.basic_user_update + self.basic_user

        self.mock_users_repository.get_user_by_id.return_value = self.basic_user
        self.mock_users_repository.update.return_value = user

        response = OfflineHandler(update_user_handler).handle_v2(
            headers=self.basic_user_headers,
            body=self.basic_user_update.as_camel_dict(),
        )

        self.assertEqual(200, response["statusCode"])
        self.assertEqual(user.as_json_response(), response["body"])
        self.mock_users_repository.get_user_by_id.assert_called_once_with(user.id)
        self.mock_users_repository.get_user_by_username.assert_not_called()
        self.mock_users_repository.get_user_by_email.assert_called_once_with(user.email)
        self.mock_users_repository.update.assert_called_once_with(user.as_snake_dict())

    def test_update_user_handler_invalid_auth(self):
        response = OfflineHandler(update_user_handler).handle_v2(
            headers=self.basic_user_headers, body=self.admin_user.as_json_response()
        )

        self.assertEqual(401, response["statusCode"])
        self.assertEqual({}, response["body"])

    def test_update_user_handler_taken_fields(self):
        self.mock_users_repository.get_user_by_id.return_value = self.basic_user
        self.mock_users_repository.get_user_by_username.return_value = self.admin_user
        self.mock_users_repository.get_user_by_email.return_value = self.admin_user

        response = OfflineHandler(update_user_handler).handle_v2(
            headers=self.basic_user_headers,
            body=self.basic_user_update.as_json_response(),
        )

        self.assertEqual(400, response["statusCode"])
        self.assertEqual(
            {"email": "Email is taken.", "username": "Username is taken."},
            response["body"],
        )

    def test_update_user_handler_invalid_fields(self):
        self.basic_user_update.email = "email.com"

        self.mock_users_repository.get_user_by_id.return_value = self.basic_user

        response = OfflineHandler(update_user_handler).handle_v2(
            headers=self.basic_user_headers,
            body=self.basic_user_update.as_json_response(),
        )

        self.assertEqual(400, response["statusCode"])
        self.assertEqual(
            {"email": "Invalid email."}, response["body"],
        )
