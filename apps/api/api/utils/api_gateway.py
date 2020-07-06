import json
from typing import Optional, Dict


class ApiGatewayEvent:
    def __init__(
        self, event, context, user_id=None, user_authority=None, headers=None,
    ):
        self._event = event
        self._context = context
        self._user_id = user_id
        self._user_authority = user_authority
        self._headers = headers if headers else {}

    @property
    def body(self) -> Dict:
        """
        :return: The body from the API Gateway event as a dict
        """
        return self._event.get("body", {})

    @property
    def user_id(self) -> Optional[str]:
        """
        :return: The currently signed in user id or none
        """
        return self._user_id

    @property
    def user_authority(self) -> Optional[str]:
        """
        :return: The currently signed in user authority or none
        """
        return self._user_authority

    def ok_response(self, body=None, headers=None) -> Dict:
        """
        Returns the dict for an OK (200) response. The content type header
        defaults to JSON unless otherwise specified. The response format is
        what is required for API Gateway.
        :param body: The body of the response
        :param headers: The headers of the response
        :return: The response message as a dict
        """
        return self._response(200, body, headers)

    def bad_request_response(self, body=None, headers=None) -> Dict:
        """
        Returns the dict for a BAD_REQUEST (400) response. The content type
        header defaults to JSON unless otherwise specified. The response format
        is what is required for API Gateway.
        :param body: The body of the response
        :param headers: The headers of the response
        :return: The response message as a dict
        """
        return self._response(400, body, headers)

    def unauthorized_response(self, body=None, headers=None) -> Dict:
        """
        Returns the dict for an UNAUTHORIZED (401) response. The content type
        header defaults to JSON unless otherwise specified. The response format
        is what is required for API Gateway.
        :param body: The body of the response
        :param headers: The headers of the response
        :return: The response message as a dict
        """
        return self._response(401, body, headers)

    def forbidden_response(self, body=None, headers=None) -> Dict:
        """
        Returns the dict for an FORBIDDEN (403) response. The content type
        header defaults to JSON unless otherwise specified. The response format
        is what is required for API Gateway.
        :param body: The body of the response
        :param headers: The headers of the response
        :return: The response message as a dict
        """
        return self._response(403, body, headers)

    def internal_server_error_response(self, body=None, headers=None) -> Dict:
        """
        Returns the dict for an INTERNAL_SERVER_ERROR (500) response. The
        content type header defaults to JSON unless otherwise specified. The
        response format is what is required for API Gateway.
        :param body: The body of the response
        :param headers: The headers of the response
        :return: The response message as a dict
        """
        return self._response(500, body, headers)

    def _response(self, status_code=200, body=None, headers=None) -> Dict:
        if not headers:
            headers = {}

        if not body:
            body = {}

        headers.update({"Content-type": "application/json"})

        return {
            "statusCode": status_code,
            "body": json.dumps(body),
            "headers": {**self._headers, **headers},
        }
