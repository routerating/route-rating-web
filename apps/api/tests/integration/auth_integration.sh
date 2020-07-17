#!/bin/bash -e

data() {
    printf "{\"headers\": {\"Authorization\": \"%s\"}}" "${1}"
}

check_status() {
    echo "${1}"
    test $(echo "${1}" | jq ".statusCode") = "200"
}

basic-local() {
    echo "Invoking local basic-auth with expected status ${2}..."
    RESPONSE=$(yarn -s serverless invoke local -f BasicAuth -d "$(data "${1}")" -s "${3}")
    echo "Lambda response:"
    echo "${RESPONSE}"
    test $(echo "${RESPONSE}" | jq ".statusCode") = "${2}"
}

basic-remote() {
    echo "Invoking remote basic-auth with expected status ${2}..."
    RESPONSE=$(yarn -s serverless invoke -f BasicAuth -d "$(data "${1}")" -s "${3}")
    echo "Lambda response:"
    echo "${RESPONSE}"
    test $(echo "${RESPONSE}" | jq ".statusCode") = "${2}"
}

admin-local() {
    echo "Invoking local admin-auth with expected status ${2}..."
    RESPONSE=$(yarn -s serverless invoke local -f AdminAuth -d "$(data "${1}")" -s "${3}")
    echo "Lambda response:"
    echo "${RESPONSE}"
    test $(echo "${RESPONSE}" | jq ".statusCode") = "${2}"
}

admin-remote() {
    echo "Invoking remote admin-auth with expected status ${2}..."
    RESPONSE=$(yarn -s serverless invoke -f AdminAuth -d "$(data "${1}")" -s "${3}")
    echo "Lambda response:"
    echo "${RESPONSE}"
    test $(echo "${RESPONSE}" | jq ".statusCode") = "${2}"
}
