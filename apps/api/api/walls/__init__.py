import logging

from api.utils.db_utils import create_database_session


class Wall:
    def __init__(self, wall_id=None, types=None, gym_id=None, name=None):
        self.id = wall_id
        self.types = types
        self.gym_id = gym_id
        self.name = name

    def as_camel_dict(self) -> dict:
        return {
            "id": self.id,
            "types": self.types,
            "gymId": self.gym_id,
            "name": self.name,
        }

    def as_snake_dict(self) -> dict:
        return {
            "id": self.id,
            "types": self.types,
            "gym_id": self.gym_id,
            "name": self.name,
        }


class WallsRepository:
    def __init__(self, database_session):
        self.session = (
            database_session if database_session else create_database_session()
        )


class WallsService:
    def __init__(self, database_session=None):
        self.log = logging.getLogger(self.__class__.__name__)
        self.log.debug("Initializing")
        self.users_repository = WallsRepository(database_session)
