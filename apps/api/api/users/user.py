from api.utils.model import get_region, get_endpoint
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute
from pynamodb.indexes import AllProjection, GlobalSecondaryIndex
from pynamodb.models import Model
from datetime import datetime
import json
import os


class IdIndex(GlobalSecondaryIndex):
    class Meta:
        index_name = f"{os.getenv('DYNAMODB_USERS_TABLE', '')}-id-index"
        read_capacity_units = 10
        write_capacity_units = 20
        projection = AllProjection()

    id = UnicodeAttribute(attr_name="Id", hash_key=True)


class User(Model):
    class Meta:
        table_name = os.getenv("DYNAMODB_USERS_TABLE", "")
        region = get_region()
        endpoint = get_endpoint()
        read_capacity_units = 10
        write_capacity_units = 20

    id = UnicodeAttribute(attr_name="Id")
    id_index = IdIndex()
    email = UnicodeAttribute(attr_name="Email", hash_key=True)
    first_name = UnicodeAttribute(attr_name="FirstName")
    last_name = UnicodeAttribute(attr_name="LastName")
    phone_number = UnicodeAttribute(attr_name="PhoneNumber")
    city = UnicodeAttribute(attr_name="City")
    state = UnicodeAttribute(attr_name="State")
    password = UnicodeAttribute(attr_name="Password")
    authority = UnicodeAttribute(attr_name="Authority")
    role = UnicodeAttribute(attr_name="Role")
    last_updated = UTCDateTimeAttribute(attr_name="LastUpdated")
    created = UTCDateTimeAttribute(attr_name="Created", default=datetime.now)

    def all_fields_present(self) -> bool:
        return (
            self.id != None
            and self.created != None
            and self.new_user_fields_present()
        )

    def new_user_fields_present(self) -> bool:
        return (
            self.password != None
            and self.city != None
            and self.state != None
            and self.first_name != None
            and self.last_name != None
            and self.email != None
            and self.phone_number != None
        )

    @classmethod
    def from_camel_dict(cls, body):
        if isinstance(body, str):
            body = json.loads(body)

        return cls(
            id=body.get("id", None),
            password=body.get("password", None),
            city=body.get("city", None),
            state=body.get("state", None),
            first_name=body.get("firstName", None),
            last_name=body.get("lastName", None),
            email=body.get("email", None),
            phone_number=body.get("phoneNumber"),
            authority=body.get("authority", None),
            role=body.get("role", None),
        )

    @classmethod
    def from_snake_dict(cls, body):
        if isinstance(body, str):
            body = json.loads(body)

        return cls(
            id=body.get("id", None),
            password=body.get("password", None),
            city=body.get("city", None),
            state=body.get("state", None),
            first_name=body.get("first_name", None),
            last_name=body.get("last_name", None),
            email=body.get("email", None),
            phone_number=body.get("phone_number"),
            authority=body.get("authority", None),
            role=body.get("role", None),
        )

    @classmethod
    def from_database_dict(cls, body):
        if isinstance(body, str):
            body = json.loads(body)

        return cls(
            id=body.get("Id", None),
            password=body.get("Password", None),
            city=body.get("City", None),
            state=body.get("State", None),
            first_name=body.get("FirstName", None),
            last_name=body.get("LastName", None),
            email=body.get("Email", None),
            phone_number=body.get("PhoneNumber"),
            authority=body.get("Authority", None),
            role=body.get("Role", None),
        )

    def get_expression_attribute_values(self):
        return {
            ":password": self.password,
            ":city": self.city,
            ":state": self.state,
            ":firstName": self.first_name,
            ":lastName": self.last_name,
            ":email": self.email,
            ":phoneNumber": self.phone_number,
            ":authority": self.authority,
            ":role": self.role,
        }

    def as_camel_dict(self) -> dict:
        return {
            "id": self.id,
            "password": self.password,
            "city": self.city,
            "state": self.state,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "phoneNumber": self.phone_number,
            "authority": self.authority,
            "role": self.role,
        }

    def as_snake_dict(self) -> dict:
        return {
            "id": self.id,
            "password": self.password,
            "city": self.city,
            "state": self.state,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "authority": self.authority,
            "role": self.role,
        }

    def as_dict(self) -> dict:
        return self.as_camel_dict()

    def as_json_response(self):
        body = self.as_camel_dict()
        body.pop("password")
        return body

    def __add__(self, other):
        if not isinstance(other, User):
            raise TypeError

        user = User()

        user.first_name = self.first_name if self.first_name else other.first_name
        user.last_name = self.last_name if self.last_name else other.last_name
        user.id = self.id if self.id else other.id
        user.password = self.password if self.password else other.password
        user.email = self.email if self.email else other.email
        user.city = self.city if self.city else other.city
        user.state = self.state if self.state else other.state
        user.phone_number = (
            self.phone_number if self.phone_number else other.phone_number
        )

        return user
