
Feature: F1860_US5957 - Analysis Template Enhancement - Multi-chart Templates (Instance and Class)

#Description: So that I can further analyze a particular asset instance, as an Analyst I want to Save an asset instance Analysis template
# which contains multiple charts

#Acceptance criteria:
#1. on Save of an asset instance template which contains multiple chart, details for the analysis are saved
#2. the Asset Instance associated with the template
#3. all tags associated with the analysis for each chart
#4. tags that were saved for the chart are saved
#5. mute state of tags are saved


  Scenario Outline: Pre-condition- Verify that the analysis user logged in and creates a Multi-chart template

    Given I go to url
    Then the page title should contain "GE : Single Sign On" or "Predix"
    When a user with "<permission>" authorization is logged in
    Then the landing page should contain "Analysis" and "Dashboards" tabs
    When I click on the "Analysis" microapp link on the left nav
    When I click inner node "<enterprise>" from the context browser
    When I click inner node "<site>" from the context browser
    When I click inner node "<segment>" from the context browser
    When I click inner node "<asset>" from the context browser
    When I click on the open button

    Examples:
      |permission|enterprise|site|segment|asset|
      |analysisManager|AViD ENTERPRISE| AViD SITE2|AViD SEGMENT3 |AViD AUTOMATION SEG3 Asset 1|

    # As a precondition creating a template
    When I see the Save as template option
    When I click on the Save template option
    Then the save template container should appear with required elements
    Given I Enter the random template name in to the Save template container
    When I click on the save button


    Scenario Outline: Verify create a New Adhoc Analysis and save as New template for Multi charts
     When I click on view saved template dropdown option
     Then the dropdown displays "<option>" as last option
     When I click on the "<option>" for New Ad Hoc Analysis

     When the user clicks on the search icon in the tag control window after loading analysis 
     Then the system displays a search window, and search results area. 
     Given I enter 3 chars for tag search
      When the user enters "<TagChars>" characters in the search box
     Then the system displays a list of tags as a list item based on the visual design below.
      When I add 1 tags from the tags menu-item
      Then a new chart with the plotted tag gets added

      Then the user drags a tag to a new chart area
      Then the user drags a tag to a new chart area
      Then the user drags a tag to a new chart area


      When I see the Save as template option
      When I click on the Save template option
      Then the save template container should appear with required elements
      Given I Enter the random template name in to the Save template container
      When I click on the save button


    Examples:
    |option|TagChars|
    |New Ad Hoc Analysis|tag_auto|





