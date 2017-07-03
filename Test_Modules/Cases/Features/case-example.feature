@regression
Feature: User Can Navigate to Tenant using Context Browser

  Scenario: I navigate to the APM Asset page and check if elements are visible

    Given The application is authenticated
    Then I can select cases and wait until it is loaded


#  Scenario: Once logged in Regression, check for wrong tenant name
#
#    Given The application is logged in
#    Then I can select Asset Management and view wrong tenant from context




