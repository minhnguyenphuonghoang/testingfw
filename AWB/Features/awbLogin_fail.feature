@regression
Feature: User Can't Login to AWB 

  Scenario Outline: US6400:Login fail

    Given I choose a tenant <evn>
    When  I authenticate with a valid tenant <tenant_name> 
    When  I authenticate with invalid <user_name> and <password>
    Then  I should see the an error message 


    Examples:
      | env | tenant_name | user_name | password |
      | baseUrl | tenantname | username  | password |
