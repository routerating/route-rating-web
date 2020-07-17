from api.users.user import User
from api.utils.auth import Jwt
from api.utils.decorators import log
from api.utils.regex import RegexUtils
from datetime import datetime
from pynamodb.exceptions import DoesNotExist, UpdateError
from typing import Optional, Dict, Tuple
from validate_email import validate_email
import bcrypt
import logging
import uuid
import os


SALT = bcrypt.gensalt(rounds=10, prefix=b"2a")

LOG = logging.getLogger(__file__)


class UsersService:
    def __init__(self):
        self.jwt = Jwt()
        if not User.exists():
            User.create_table(wait=True)

    def login(self, user) -> Tuple[Optional[User], Optional[Dict]]:
        """
        Gets the user from the database an validates the passwords match.
        :param user: The user object. Must have username or email and password
        :return: The Tuple[Optional[User], Optional[Dict]]
        """
        user_result = self.get_user_by_email(user)

        LOG.info(user_result)

        if not user_result or not self.check_passwords(
            user.password, user_result.password
        ):
            return None, None

        jwt_token = self.jwt.generate_jwt_token(user_result)
        refresh_token = self.jwt.generate_refresh_token(user_result)

        return (
            user_result,
            {
                "Authorization": f"Bearer {jwt_token}",
                "Refresh": f"Bearer {refresh_token}",
            },
        )

    @staticmethod
    def get_user_by_email(request_user: User) -> Optional[User]:
        try:
            return User.get(hash_key=request_user.email)
        except DoesNotExist:
            return None

    @staticmethod
    def check_passwords(password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf8"), hashed_password.encode("utf8"))

    @staticmethod
    def encrypt_password(password: str) -> str:
        return bcrypt.hashpw(password.encode("utf8"), SALT).decode("utf8")

    @staticmethod
    def create_user(new_user: User) -> Optional[User]:
        new_user.id = str(uuid.uuid4())
        new_user.password = UsersService.encrypt_password(new_user.password)
        new_user.last_updated = datetime.now()

        try:
            new_user.save()
            new_user.refresh()
            return new_user
        except Exception as e:
            LOG.exception(str(e))
            return None

    @staticmethod
    def valid_email(user: User) -> bool:
        return RegexUtils.valid_email(user.email) and validate_email(
            user.email, verify=True
        )

    @staticmethod
    def valid_phone_number(user: User) -> bool:
        return (
            not RegexUtils.non_number(user.phone_number)
            and len(user.phone_number) == 10
        )

    @staticmethod
    def valid_password(user: User) -> bool:
        return (
            len(user.password) > 7
            and RegexUtils.special_character(user.password)
            and RegexUtils.number(user.password)
            and RegexUtils.uppercase(user.password)
            and RegexUtils.lowercase(user.password)
        )

    def get_user_by_id(self, request_user: User) -> Optional[User]:
        user_iterator = User.id_index.query(request_user.id)

        if user_iterator.total_count == 0:
            return None

        user = user_iterator.next()

        return user if user and user.id and user.id != "" else None

    @staticmethod
    def update_user(self, updated_user: User) -> Optional[User]:
        updated_user.last_updated = datetime.now()

        try:
            updated_user.save()
            updated_user.refresh()
            return updated_user
        except Exception as e:
            LOG.exception(str(e))
            return None
