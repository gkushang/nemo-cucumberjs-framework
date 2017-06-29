@loginToPayPal
Feature: Login to PayPal

  In order to view PayPal account
  Fred, a PayPal customer
  Wants to login to PayPal

  @invalidLogin
  Scenario: Fred is not able to login to PayPal with invalid credentials

    Given Fred wants to login to PayPal
    When he enters invalid credentials
    Then he is not able to login

  @loginSuccess @skip
  Scenario: Fred logs into PayPal

    Given Fred wants to login to PayPal
    When he enters valid credentials
    Then he is able to view his account
