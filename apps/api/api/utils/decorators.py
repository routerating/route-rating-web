import inspect
import logging


def log():
    def decorator(function):
        def wrapper(*args, **kwargs):
            logging.debug(
                f"Function: {function.__name__}\nArgs: {str(args)}\nKwargs: {str(kwargs)}"
            )

            return function(args, kwargs)

        return wrapper

    return decorator
