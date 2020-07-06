import logging
import os
import traceback
import sys
import json

from api.utils.auth import Auth
from api.utils.api_gateway import ApiGatewayEvent


def validate_kwargs(*args):
    logging.debug("ARGS: " + str(args[0][0]))
    # if len(args[0][0]) != 2:
    #     raise InvalidRequestException

    return args[0][0], None


def validate_jwt(function, event, context, admin_auth):
    try:
        auth = Auth(event)

        valid, jwt_token, refresh_token = auth.validate_jwt()

        if not valid:
            return ApiGatewayEvent(event, context).forbidden_response()

        if admin_auth and not auth.is_admin():
            return ApiGatewayEvent(event, context).unauthorized_response()

        return function(
            ApiGatewayEvent(
                event,
                context,
                auth.get_jwt_payload().id,
                auth.get_jwt_payload().authorities,
                headers={"Authorization": jwt_token, "Refresh": refresh_token},
            )
        )
    except Exception as e:
        logging.error("Exception raised while authenticating.")
        logging.error(traceback.format_exc())
        logging.exception(e)

        return ApiGatewayEvent(event, context).forbidden_response()


def handler():
    def decorator(function):
        def wrapper(*args, **kwargs):
            setup_logger()
            event, context = validate_kwargs(args, kwargs)
            return function(ApiGatewayEvent(event, context))

        return wrapper

    return decorator


def admin_handler():
    def decorator(function):
        def wrapper(*args, **kwargs):
            setup_logger()
            event, context = validate_kwargs(args)
            return validate_jwt(function, event, context, True)

        return wrapper

    return decorator


def basic_handler():
    def decorator(function):
        def wrapper(*args, **kwargs):
            setup_logger()
            event, context = validate_kwargs(args)
            print("YEET: " + str(event))
            return validate_jwt(function, event, context, False)

        return wrapper

    return decorator


class InvalidRequestException(Exception):
    def __init__(self):
        super().__init__()


def setup_logger():
    handlers = []
    basic_format = logging.Formatter(logging.BASIC_FORMAT)

    stdout_handler = logging.StreamHandler(sys.stdout)
    stdout_handler.setLevel(logging.ERROR)

    # if os.getenv("LOG", None) == "TRUE" or os.getenv("TEST_RUN") == "TRUE":
    stdout_handler.setLevel(logging.DEBUG)

    stdout_handler.setFormatter(basic_format)
    handlers.append(stdout_handler)

    logging.basicConfig(level=logging.DEBUG, handlers=handlers, force=True)
