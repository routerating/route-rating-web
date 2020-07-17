#!/bin/bash -e

yarn
yarn bootstrap

pip install -Ur apps/api/requirements-dev.txt -Ur apps/api/requirements.txt
