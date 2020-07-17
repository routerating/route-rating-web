#!/bin/bash

cd /workspace

yarn
yarn bootstrap
pip install -Ur apps/api/requirements.txt -Ur apps/api/requirements-dev.txt
sleep infinity