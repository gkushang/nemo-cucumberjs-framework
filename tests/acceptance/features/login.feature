@login
Feature: Login to Gmail

  In order to check emails
  Fred, a Google user
  Wants to login to Gmail

  @invalidUsername
  Scenario: Fred is not able to login with invalid username

    Given Fred wants to login to Gmail
    When he enters invalid username
    Then he is warned about invalid email or phone

  @invalidUserPhone @WIP
  Scenario: Fred is not able to login with invalid user phone number

    Given Fred wants to login to Gmail
    When he enters invalid phone number
    Then he is warned about invalid email or phone
