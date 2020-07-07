import os
from unittest import TestCase
from unittest.mock import Mock
import boto3

from api.users import users_service
from api.users.users_service import UsersService


class TestBase(TestCase):
    @classmethod
    def setUpClass(cls):
        os.environ["TEST_RUN"] = "TRUE"
        os.environ["IS_OFFLINE"] = "TRUE"
        os.environ["DYNAMODB_USERS_TABLE"] = "users-table"

        cls.users_service = UsersService()
        cls.mock_validate_email = Mock(return_value=True)
        users_service.validate_email = cls.mock_validate_email
