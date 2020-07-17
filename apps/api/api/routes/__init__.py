import logging

from api.utils.db_utils import create_database_session


class Route:
    def __init__(
        self,
        route_id=None,
        gym_id=None,
        wall_id=None,
        name=None,
        setter=None,
        grade=None,
        rating=None,
        color=None,
        types=None,
    ):
        self.id = route_id
        self.gym_id = gym_id
        self.wall_id = wall_id
        self.name = name
        self.setter = setter
        self.grade = grade
        self.rating = rating
        self.color = color
        self.types = types

    def as_camel_dict(self) -> dict:
        return {
            "id": self.id,
            "gymId": self.gym_id,
            "wallId": self.wall_id,
            "name": self.name,
            "setter": self.setter,
            "grade": self.grade,
            "rating": self.rating,
        }

    def as_snake_dict(self) -> dict:
        return {
            "id": self.id,
            "gym_id": self.gym_id,
            "wall_id": self.wall_id,
            "name": self.name,
            "setter": self.setter,
            "grade": self.grade,
            "rating": self.rating,
        }


class RoutesRepository:
    def __init__(self, database_session):
        self.session = (
            database_session if database_session else create_database_session()
        )


class RoutesService:
    def __init__(self, database_session=None):
        self.log = logging.getLogger(self.__class__.__name__)
        self.log.debug("Initializing")
        self.users_repository = RoutesRepository(database_session)
