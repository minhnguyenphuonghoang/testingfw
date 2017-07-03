@regression
Feature: User Can Navigate to Tenant using Context Browser

  Scenario: I navigate to the APM Dashboard page and check validate one of the charts

    Given The application is correctly logged in
    When I go to the dashboard and select a chart from E2E edison
    Then I should be able to see all the chart's details


#  Scenario: Once logged in Regression, check for wrong tenant name
#
#    Given The application is logged in
#    Then I can select Asset Management and view wrong tenant from context




