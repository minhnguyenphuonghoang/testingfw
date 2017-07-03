@regression
Feature: User Can Login to AWB 

  Scenario Outline: US6400:Login successfully

    Given I choose a tenant <evn>
    When  I authenticate with a valid tenant <tenant_name> 
    When  I authenticate with valid <user_name> and <password>
    Then  I should see the home page
    When  I Logout
    Then  I should see the tenant page

    Examples:
      | env | tenant_name | user_name | password |
      | baseUrl | tenantname | username  | password |
