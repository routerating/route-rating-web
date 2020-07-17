import os
from typing import Optional


def get_region() -> Optional[str]:
    return "local" if os.getenv("IS_OFFLINE") else os.getenv("AWS_REGION")


def get_endpoint() -> Optional[str]:
    return "http://localhost:8000" if os.getenv("IS_OFFLINE") else os.getenv("TODO")
