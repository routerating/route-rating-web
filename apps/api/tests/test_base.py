import os
from unittest import TestCase
from unittest.mock import Mock
import boto3

from api.users import users_service
from api.users.users_service import UsersService


class TestBase(TestCase):
    os.environ["TEST_RUN"] = "TRUE"
    # os.environ["LOG"] = "TRUE"

    @classmethod
    def setUpClass(cls):
        cls.mock_create_database_session = Mock()
        boto3.resource = cls.mock_create_database_session

        cls.users_service = UsersService()
        cls.mock_validate_email = Mock(return_value=True)
        users_service.validate_email = cls.mock_validate_email
