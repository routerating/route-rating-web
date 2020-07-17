import os
from unittest import TestCase
from unittest.mock import Mock
from api.users import users_service
from api.users.users_service import UsersService
from api.users.user import User


class TestBase(TestCase):
    @classmethod
    def setUpClass(cls):
        os.environ["TEST_RUN"] = "TRUE"
        os.environ["IS_OFFLINE"] = "TRUE"
        os.environ["DYNAMODB_USERS_TABLE"] = "users-table"

        cls.users_service = UsersService()
        cls.mock_validate_email = Mock(return_value=True)
        users_service.validate_email = cls.mock_validate_email

    def tearDown(self):
        if User.exists():
            User.delete_table()
            User.create_table()
