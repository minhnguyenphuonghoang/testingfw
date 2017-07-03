@regression
Feature: User Can Navigate to Config DashBoard using Context Browser

  Scenario: I navigate to the OO Dashboard page and check validate one of the charts

    Given The OO application is correctly logged in
    When I go OO Config dashboard and select a chart from BPCANORTH
    Then I should be able to see all the OO DashBoard chart's details


#  Scenario: Once logged in Regression, check for wrong tenant name
#
#    Given The application is logged in
#    Then I can select Asset Management and view wrong tenant from context




