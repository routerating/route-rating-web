#!/usr/bin/env bash

./.github/generate.sh

YAML=$(tail -n +28 .github/workflows/ci.yml)

echo "name: CI" > .github/workflows/ci.yml
echo "on: [push]" >> .github/workflows/ci.yml
echo "${YAML}" >> .github/workflows/ci.yml
