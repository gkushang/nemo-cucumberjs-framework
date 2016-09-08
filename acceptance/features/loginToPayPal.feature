@loginToPayPal
Feature: Login to PayPal

  In order to view PayPal account
  Fred, a PayPal customer
  Wants to login to PayPal

  @loginSuccess
  Scenario: Fred logs into PayPal

    Given Fred navigates to PayPal's login
    When he enters valid credentials
    Then he is able to view his account
