@regression
Feature: Highchart access using utils
  Scenario Outline: Load Highcharts demo page and navigate to Line Chart

    Given I navigate <env>
    When  I click on Line chart
    Then  I should see the chart loaded

    Examples:
      | env |
      | http://www.highcharts.com/demo |

  Scenario: Once chart is visible and loaded, I can see the details

    Given The chart is loaded on the page
    Then I can view the chart details
