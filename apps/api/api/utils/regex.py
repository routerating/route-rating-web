import re


EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
SPECIAL_CHARACTER_REGEX = re.compile(r".*[^A-Za-z0-9\.].*")
NUMBER_REGEX = re.compile(r".*[0-9].*")
NON_NUMBER_REGEX = re.compile(r".*[^0-9].*")
UPPERCASE_REGEX = re.compile(r".*[A-Z].*")
LOWERCASE_REGEX = re.compile(r".*[a-z].*")


class RegexUtils:
    @staticmethod
    def valid_email(email):
        return (
            EMAIL_REGEX.match(email)
            and len(email.split("@")) == 2
            and not RegexUtils.special_character(email.split("@")[0])
        )

    @staticmethod
    def special_character(string):
        return SPECIAL_CHARACTER_REGEX.match(string) is not None

    @staticmethod
    def number(string):
        return NUMBER_REGEX.match(string) is not None

    @staticmethod
    def uppercase(string):
        return UPPERCASE_REGEX.match(string) is not None

    @staticmethod
    def lowercase(string):
        return LOWERCASE_REGEX.match(string) is not None

    @staticmethod
    def non_number(string):
        return NON_NUMBER_REGEX.match(string) is not None
