@recoverUsername
Feature: Recover Username

  In order to recover username
  John, a Google user
  Wants to verify the identity to recover the account

  @findYourEmail @WIP
  Scenario: John is not able to recover the username for an invalid phone number

    Given Fred wants to recover his Gmail username
    When he enters invalid recovery phone number
    Then he is warned about invalid email or phone
