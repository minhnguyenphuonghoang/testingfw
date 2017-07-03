@regression
Feature: User Can Login to AWB 

  Scenario Outline: US6400:Search successfully

    Given I choose a tenant <evn>
    When  I authenticate with a valid tenant <tenant_name> 
    When  I authenticate with valid <user_name> and <password>
    Then  I should see the home page
    When  I click to Search Icon
    Then  I should see the search page
    When  I put query to query field <query_text>
    When  I click Query button
    Then  I should see data

    Examples:
      | env | tenant_name | user_name | password | query_text |
      | baseUrl | tenantname | username  | password | query |
