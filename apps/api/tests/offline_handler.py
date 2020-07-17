import json

from tests.utilities import ApiGatewayEvent


class OfflineHandler:
    def __init__(self, handler):
        self._handler = handler
        self._context = None

    def handle(self, request) -> dict:
        response = self._handler(request, self._context)
        response["body"] = json.loads(response["body"])

        return response

    def handle_v2(self, headers=None, body=None):
        return self.handle(ApiGatewayEvent(headers, body).as_dict())
