#!/bin/bash

# Set environment variables
export GH_USERNAME="your_github_username"
export GH_TOKEN="your_github_token"

# Run Docker command with environment variables
docker run --rm \
    -e ENV_VAR1="$MY_ENV_VAR1" \
    -e ENV_VAR2="$MY_ENV_VAR2" \
    your_docker_image_name


docker login -u <username> -p <github_token> ghcr.io