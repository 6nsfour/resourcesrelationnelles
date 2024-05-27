Feature: Verify different cases in wrong and right uses in UserRepository

  Scenario : Add a new user
    Given a empty database
    When I call the add function with required parameters
    Then It should exist a new user defined by the parameters sent