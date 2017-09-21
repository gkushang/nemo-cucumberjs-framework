@login
Feature: Login to Gmail

  In order to check emails
  Fred, a Google user
  Wants to login to Gmail

  @invalidUserEmail
  Scenario: Fred is not able to login with invalid username

    Given Fred wants to login to Gmail
    When he enters invalid username
    Then he is warned about invalid email or phone
