from api.utils.db_utils import create_database_session
import logging


class Gym:
    def __init__(
        self,
        address=None,
        city=None,
        gym_id=None,
        name=None,
        state=None,
        zip_code=None,
        email=None,
        website=None,
        phone_number=None,
        logo_url=None,
        photo_url=None,
        owner=None,
        authorized_editors=None,
    ):
        self.id = gym_id
        self.name = name
        self.address = address
        self.city = city
        self.state = state
        self.zip_code = zip_code
        self.email = email
        self.website = website
        self.phone_number = phone_number
        self.logo_url = logo_url
        self.photo_url = photo_url
        self.owner = owner
        self.authorized_editors = authorized_editors

    def as_camel_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zipCode": self.zip_code,
            "email": self.email,
            "website": self.website,
            "phoneNumber": self.phone_number,
            "logoUrl": self.logo_url,
            "photoUrl": self.photo_url,
            "owner": self.owner,
            "authorizedEditors": self.authorized_editors,
        }

    def as_snake_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "email": self.email,
            "website": self.website,
            "phone_number": self.phone_number,
            "logo_url": self.logo_url,
            "photo_url": self.photo_url,
            "owner": self.owner,
            "authorized_editors": self.authorized_editors,
        }

    def __add__(self, other):
        if not isinstance(other, Gym):
            raise TypeError

        gym = Gym()
        gym.id = self.id if self.id else other.id
        gym.address = self.address if self.address else other.address
        gym.city = self.city if self.city else other.city
        gym.state = self.state if self.state else other.state
        gym.zip_code = self.zip_code if self.zip_code else other.zip_code
        gym.email = self.email if self.email else other.email
        gym.website = self.website if self.website else other.website
        gym.phone_number = (
            self.phone_number if self.phone_number else other.phone_number
        )
        gym.owner = self.owner if self.owner else other.owner
        gym.logo_url = self.logo_url if self.logo_url else other.logo_url
        gym.photo_url = self.photo_url if self.photo_url else other.photo_url
        gym.authorized_editors = (
            self.authorized_editors
            if self.authorized_editors
            else other.authorized_editors
        )

        return gym


class GymsRepository:
    def __init__(self, database_session):
        self.session = (
            database_session if database_session else create_database_session()
        )


class GymsService:
    def __init__(self, database_session=None):
        self.log = logging.getLogger(self.__class__.__name__)
        self.log.debug("Initializing")
        self.users_repository = GymsRepository(database_session)
