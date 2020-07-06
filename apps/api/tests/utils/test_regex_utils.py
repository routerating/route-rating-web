from unittest import TestCase
from api.utils.regex import RegexUtils


class TestRegexUtils(TestCase):
    def assert_strings(self, valid_strings, invalid_strings, method):
        for valid_string in valid_strings:
            self.assertTrue(method(valid_string), valid_string)

        for invalid_string in invalid_strings:
            self.assertFalse(method(invalid_string), invalid_string)

    def test_email_regex(self):
        self.assert_strings(
            ["luke@shay.com"],
            ["luke@shay.", "@shay.com", ")(*@shay.com"],
            RegexUtils.valid_email,
        )

    def test_special_character(self):
        self.assert_strings(
            [")(*asdf", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "=",],
            ["asfd", "asdf3123", "2"],
            RegexUtils.special_character,
        )

    def test_uppercase(self):
        self.assert_strings(
            ["(kkkkKkkkk9", "JJJJJJJJJ", "0983H*(&(*&"],
            ["asdf", "*()asdf", "123aa"],
            RegexUtils.uppercase,
        )

    def test_lowercase(self):
        self.assert_strings(
            ["asdf", "f)92489(", "FHDJK432HFKAfKJHKJH098"],
            ["LJK:LJ:LKJ:LKJ:LKJLKJ:L", ")(&^%GHJ"],
            RegexUtils.lowercase,
        )

    def test_non_number(self):
        self.assert_strings(
            ["LJK:LJ:LKJ:LKJ:LKJLKJ:L", ")(&^%GHJ", "5678asd789"],
            ["1234567890"],
            RegexUtils.non_number,
        )

    def test_number(self):
        self.assert_strings(
            ["9)(&^%GHJ", "5678asd789"], ["LJK:LJ:LKJ:LKJ:LKJLKJ:L"], RegexUtils.number,
        )
