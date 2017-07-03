/**
 * Created by 212350438 on 7/9/15.
 */

(function () {

    'use strict';

    //   var dataTablePage = require('../common/add-asset-po');


    var path = require( 'path' );
    var contextname;


    var AnalysisPage = function () {

        return {
            get: function () {
                return browser.get( pageUrl );
            },

            getContextBrowser: function () {
               return TestHelperPO.isElementPresent(element( by.css( 'div.px-context-browser')));
            },

            getContextBrowser_dropdown: function () {
                return element( by.css( '#selectContext > div.flex__item--middle.style-scope.px-context-browser > h1 > i' ) );

            },

            clickAsset: function (txt) {
                return TestHelperPO.elementToBeClickable(element(by.cssContainingText( 'span.px-context-browser', txt )));
            },

            getOpenAssetButton: function () {
                return  TestHelperPO.elementToBeClickable(element.all( by.css( 'li.selected button.opener' )).last());
            },

            getTagToolbox: function () {

                return element( by.css( 'tag-toolbox#tag-toolbox' ) );
            },

            getViewMenu: function() {

                return element(by.css('#view-menu-new'));
            },

            // Save as evidence kebab icon

            getSaveEvidenceKebabIcn: function() {

                return element(by.css('view-menu-new#view-menu-new-evidence div'));
            },

            // Save as evidence menu option

            getSaveEvidenceOptn: function() {

                return element(by.cssContainingText('view-menu-new#view-menu-new-evidence li span', 'Save as Evidence'));
            },


            //save as evidence template

            getSaveAsTemplate: function() {


                return element.all(by.css('save-view-template div.save-view-template-container')).get(1);

            },

            getEviNameInput: function() {

                return element.all(by.css('div.view-name input#viewNameInput')).get(1);

            },
            getTagtToolBoxKebabIcon: function() {

                return element(by.css('tag-toolbox view-menu-new div i'));

            },

            // alert details evidence name
            getAlertEvidenceName: function(name) {

                return element(by.cssContainingText('span.analysis-evidence-name', name));
            },

            // search menu option in tag toolbox

            getTagToolSearchOpt: function(arg) {

               return element(by.cssContainingText('view-options-menu-new li', arg));
            },


            getViewMeuOption: function(txt) {

                return element(by.cssContainingText('#view-menu-new div#menu ul li',txt));
            },

            getSaveViewTemplateCnt: function() {

                return element(by.css('div.save-view-template-container'));
            },

            getAssetContextSaveView: function(){

                return element(by.css('span.save-view-template.ng-binding'));
            },

            getConfirmationModal: function(){

                return element(by.css('section.px-modal'));
            },

            getModalOkButton: function(){
                return element(by.css('button#OK'));
            },

            getModalCancelButton:function() {
                return element(by.css('button#Cancel'));
            },

            getViewNameInput: function(){


                return element(by.id('viewNameInput'));
            },

            getViewMenuTagAlias: function(){
                return element.all(by.css('div.tag-list-controls-container div.button-container')).get(1);
            },

            getTagAliasMenuItem: function(){

                return element(by.css('tag-toolbox#tag-toolbox div#submenucontainer li'));
            },

            getPlottedTagInfoIndicator: function(){

                return element(by.css('div.plotted-tag-info-indicator'));
            },

            getTagInfoBackButton: function(){
                return element(by.css('span.tag-header-back'));
            },

            getPlottedTaginfoScreen: function(){

                return element(by.css('plotted-tag-info#plotted-tag-info'));
            },

            getSaveViewBtnElements: function(){

                return element(by.css('div.save-view-actions button'))
            },

//            getSearchInput: function () {
//
//                return element( by.css( 'input#tagSearch' ) )
//            },

            getSearchIcon: function () {

                return element( by.css( 'span.tag-toolbox i.fa-search' ) );
            },

            getTagFilter: function () {


                return element( by.css( 'li.tag-filter-open' ) );
            },
            getSearchInputDeleteIcon: function () {

                return element( by.css( 'div.tag-list-controls-container span.x-icon' ) )
            },

            getSearchInputFilterIcon: function () {

                return element( by.css( 'div.tag-list-controls-container span.search-icon' ) )
            },

            getTagResultsArea: function () {

                return TestHelperPO.isElementPresent(element(by.css( '.tag-toolbox-lists.style-scope.tag-toolbox' )));
            },

            getSpinner: function () {

                return element( by.css( 'div.px-spinner' ) );
            },

            getPlottedTagsHeader: function () {

                return element( by.css( 'plotted-tag-list.tag-toolbox div.tag-list-controls-container' ) );
            },

            getPlottedTag: function () {

                return element( by.css( 'plotted-tag-list.tag-toolbox  h4' ) );
            },

            getPlottedTagSearchResult: function () {

                return element( by.css( 'ul.display-tag-list li' ) );
            },

            getDeleteIcon: function () {
                return TestHelperPO.elementToBeClickable(element(by.css('div.tag-toolbox span.x-icon i.fa-times-circle')));
            },

            getMuteButtonOn: function () {

                return element( by.css( 'span.mute-button-on' ) );
            },

            getMuteButtonOff: function () {

                return element( by.css( 'span.mute-button-off' ) );
            },

            getFromDateField: function () {

                return element( by.css( 'div#fromFields' ) );
            },

            getToDateField: function () {

                return element( by.css( 'div#toFields' ) );
            },

            getSubmitBtn: function () {

                return element( by.css( 'button.px-range-fields' ) );
            },

            getDisplayMsgElement: function () {

                return element.all( by.css( 'div.displayMsg' ) ).get( 1 );
            },

            getLoggedProfileImage: function () {

                return element( by.css( 'img.logout-menu-avatar' ) );
            },

            getLoggedUserName: function () {
                return element( by.css( 'span.username-wrap' ) );
            },

            getGearIcon: function () {
                return element( by.css( 'i.fa-gear' ) );
            },

            getLogoutMenu: function () {

                return element( by.css( 'i.logout-menu-angle-up' ) );
            },

            getHighchartsElement: function () {

                return element( by.css( 'rect.highcharts-background' ) );
            },

            getContextBrowserToggle: function () {

                return element( by.css( 'span.px-context-browser' ) );
            },

            getPlottedChartTracker: function () {

                return element( by.css( 'path.highcharts-tracker' ) )
            },

            getCardEditDropdown: function () {

                return element( by.css( 'i.editDropDown' ) )
            },

            getUserName: function () {

               return TestHelperPO.isElementPresent(element( by.name( 'username' )));
            },


            getEditProfile: function(){
                return element(by.cssContainingText('button' , 'Edit'));
            },
            getSelectAssetName: function(assetName){
                //  return element.all(by.model('userProfile.edit.preference') ).get(1) ;
                element(by.css('select') ).click() ;
                return element(by.cssContainingText('option', assetName)) ;
            },

            getSaveProfileButton: function(){
                return element(by.cssContainingText('button', 'Save')) ;
            },

            getAssetName:function(){

                return element(by.css('p.displayPreferenceForAssetName')) ;
            },

//left navigation
            getLeftTab: function (textName) {

                return element( by.cssContainingText( '#navitemlist li a span', textName ) );
            },
//should change to element
            getAllLeftTab: function () {
                 TestHelperPO.isElementPresent(element.all( by.css( '#navitemlist a span' )).get(0)).then(function(){
                    return element.all( by.css( '#navitemlist a span' )).get(0);
                })
            },

            //
            //getAllLeftTab: function(){
            //
            //    return by.css('#navitemlist a span') ;
            //},


            getAllToolTipNav: function () {

                return by.css( 'ul.nav-login li a' );
            },
//            getTagSearchViewMnuIcon: function() {
//
//                return element.all(by.css('div.tag-list-controls-container div.button-container.view-menu-new')).get(0);
//            },

            getAnalysisHeader: function () {

                return by.css( 'header#selectContext' );
            },
            getSearch: function () {
                return TestHelperPO.elementToBeClickable(element.all(by.css( 'i.fa.fa-search.style-scope.tag-toolbox' )).get(1));
            },
            getAnalysisTab: function () {
                return TestHelperPO.isElementPresent(element(by.linkText('Analysis')));
            },
            getDashboardTab: function () {
                return TestHelperPO.isElementPresent(element(by.linkText('Dashboard')));
            },
            //edit dashboard widgets

            getWidgetHover: function (widget_number) {
                var widgetClassName = 'div.widget-' + widget_number;
                console.log('inside hover ' + widget_number);
                return element( by.css( widgetClassName ) );
            },

            getWidgetPencilIcon: function (widget_number) {
                var widgetClassName = 'div.widget-' + widget_number + ' i.fa.fa-pencil';
                return element( by.css( widgetClassName ) );
            },

            getWidgetTitle: function (widget_number) {
                var cssWidgetTitle = 'div.widget-' + widget_number + ' .display-header';
                return element( by.css( cssWidgetTitle ) );
            },

//edit widget title
            getEditWidgetTitle: function () {
                return element.all( by.css( 'input.text-input' ) ).get( 1 );
            },
            getSaveWidgetButton: function () {
                return element(by.cssContainingText( 'button.btn--primary.edit-widget-header', 'Save'));
            },
            getCancelWidgetButton: function () {
                return element( by.css( '#btn-back-to-dashboard' ) );
            },
            getContextColumnBrowser: function () {
                return element( by.css( 'div#columnBrowser' ) );
            },
            getCancelWidgetModalButton: function(){
                return element(by.css('#Cancel')) ;
            },
            getOkWidgetModalButton: function(){
                return element(by.css('#OK')) ;
            },

            getEditWidgetConfirmationModal: function(){

                return element(by.css('#Cancel'));
                //         return element(by.css('div.modal__buttons'));


                //    return element(by.css('#edit-widget-confirm-title'));
            },
            getEditWidgetConfirmationModalOk: function(){

                return element(by.css('#OK'));
            },
            getEditWidgetConfirmationModalCancel: function(){

                return element(by.css('#Cancel'));

            },

            getOutputWidgetEditName1: function(){

                return element.all(by.css('input.text-input.configure-output-capacity-widget') ).get(1);
            },
            getOutputWidgetEditName2: function(){

                return element.all(by.css('input.text-input.configure-output-capacity-widget') ).get(4);
            },
            getOutputWidgetEditUnit: function(){

                return element.all(by.css('input.text-input.configure-output-capacity-widget') ).get(2);
            },

            getOutputWidgetNameUnits1: function () {
                return element.all(by.css('div.output-display') ).get(0);
            },
            getOutputWidgetNameUnits2: function () {
                return element.all(by.css('div.output-display') ).get(1);
            },
            getPerformanceWidgetEditUnit: function () {
                return element.all(by.css('input.text-input.configure-performance-widget') ).get(1);
            },
            getPerformanceWidgetUnit: function () {
                return element(by.css('div.capacity-display.performance-widget') );
            },
            getNumberWidgetEditName1: function () {
                return element.all(by.css('input.text-input.configure-number-widget') ).get(1);
            },
            getNumberWidgetEditName2: function () {
                return element.all(by.css('input.text-input.configure-number-widget') ).get(3);
            },
            getNumberWidgetEditUnit1: function () {
                return element.all(by.css('input.text-input.configure-number-widget') ).get(2);
            },
            getNumberWidgetEditUnit2: function () {
                return element.all(by.css('input.text-input.configure-number-widget') ).get(4);
            },
            getNumberWidgetName1: function () {
                return element.all(by.css('div.number-widget.epsilon') ).get(0);
            },
            getNumberWidgetName2: function () {
                return element.all(by.css('div.number-widget.epsilon') ).get(2);
            },
            getNumberWidgetUnit1: function () {
                return element.all(by.css('div.number-widget.epsilon') ).get(1);
            },
            getNumberWidgetUnit2: function () {
                return element.all(by.css('div.number-widget.epsilon') ).get(3);
            },
						
			/*
***********************************************Properties by Monira Sultana******************************************************
*/			
// <analysis>.<Asset or Tag search input box>
            getSearchInput: function () {
                return TestHelperPO.isElementPresent(element(by.css('input#tagSearch'))).then(function(){
                    return element( by.css('input#tagSearch' ) )
                })
            },
			
// <analisis>.<Tag Search In> dropdown icon**********************************************************
            getTagSearchViewMnuIcon: function() {
				return element(by.css('div.tag-list-controls-container div.button-container.view-menu-new'));								
            },
			
// <analisis>.<Search in> selection from dropdown list*****************************
            getTagSearchViewMnuIcon_SearchIn: function() {				
                return element.all(by.css('div.tag-list-controls-container div.button-container.view-menu-new')).get(0);
            },
			
// <analisis>.<Tags> or <Tags+Child> or <Assets> selection from dropdown list***************************
            getTagAssetSearchDropDown_selectMenuItems: function(text) {               
				return element(by.cssContainingText('view-options-menu-new li.view-options-menu-new', text));	
            },

			
// <analisis>.<TagSearch Input field Placeholder> ******************************************************
            getTagSearchInputPlaceholder: function() {
                return element( by.css( 'input#tagSearch' )).getAttribute('placeholder');
            },

// <analisis>.<Tag Expression option from dropdown> ******************************************************
			 getViewMenuTagExpression: function(){
                return element.all(by.css('div.tag-list-controls-container div.button-container')).get(1);
            },
			getViewOptionsMenuNew_selectItems: function(text){
				return element(by.cssContainingText('view-options-menu-new li.view-options-menu-new', text));
            },

// <analisis>.<Tag Expression popup window> *************************************************
			 getTagExpressionWindow: function(){
                return element(by.id('expressionTag'));
            },

// <analisis>.<Validate Expression btn> *****************************************************
			 getValidateTagExpressionBtn: function(){
                return element(by.id('validateExpressionBtn'));
            },

// <analisis>.<Create Expression btn> ******************************************************
			 getCreateTagExpressionBtn: function(){
                return element(by.id('Create'));
            },	

// <analisis>.<Cancel Expression btn> ******************************************************
			 getCancelTagExpressionBtn: function(){
                return element(by.css('div#expressionTag button#Cancel'));
            },
			
// <analisis>.<Tag Expression popup window> ******************************************************
			 getTagExpressionPopup: function(){
                // return element(by.css('#expressionTag > div')); // non microapp
                 // ('#expressionTag').getElementsByTagName('div')[1]

                 return element.all(by.css('#expressionTag div')).get(1); // target refactroed

             },
			

// <analisis>.<All Cancel btn> ******************************************************
			 getCancel_for_TagExpression_Btn: function(){
                return element.all(by.id('Cancel')).get(3);
            },
			
// <analisis>.<Tag Expression - Result Preview Message> *************************************
			 getTagExpressionResultPreviewMessage: function(){
                return element(by.id('resultPreview')).getText();
			 },

// <analisis>.<Tag Expression - Result Preview ERROR BLOCK> *************************************
			 getTagExpressionErrorMessage: function(){
                return element(by.id('error-block')).getText();
			 },			 
			 
// <analisis>.<Tag Expression Name- Input Field> *********************************************
			 getTagExpressionNameInput: function(){
                return element(by.id('expressionName'));
			 },

// <analisis>.<Tag Expression- Input Field> **************************************************
			 getTagExpressionInput: function(){
                return element(by.id('expression'));
			 },
		
// <analisis>.<saveTemplateErrorMessage selector for all error> **********************************************************************************************
			 getsaveTemplateAlert_selector: function(){
				 // return element(by.css('div.message.style-scope.px-alert-message > p > span:nth-child(2)'));
				 return element (by.id('alert'));  // target the location to all alerts for save template
                				
			 },
			 
		 
// <analisis>.<saveTemplateErrorMessage for Tag Expression existes on the view> **********************************************************************************************
			 getsaveTemplateErrorMessageForTagExp: function(){
                
				// return element.all( by.css( 'div.message.style-scope.px-alert-message > p > span:nth-child(2)')).get(8); //Before refactor

                return element.all(by.css('div.message.style-scope.px-alert-message >p > span:nth-child(2)')); // target refactroed


			 },			 
			 
			 
// <analisis>.<Tag Expression Header- Field LABEL> *************************************************
			 getTagExpressionHeader_LABEL: function() {
                 return element(by.id('expressionTag-title'));
             },
// <analisis>.<Tag Expression Name- Field LABEL> *************************************************
			 getTagExpressionNameField_LABEL: function(){
                return element(by.css('#expressionTag > section > p:nth-child(2) > b'));   
			 },			 
// <analisis>.<Tag Expression- Field LABEL> *************************************************
			getTagExpressionField_LABEL: function(){
			return element(by.css('#expressionTag > section > p:nth-child(4) > b'));
			},	

// <analisis>.<Tag Expression RESULT PREVIEW- Field LABEL> *************************************************
			getTagExpressionResultPreview_LABEL: function(){
			return element(by.css('#expressionTag > section > p:nth-child(6) > b'));
			},

// <analisis>.<Date Range- From Field > ***********************************
            getFromField_DateRange: function(){
                return TestHelperPO.elementToBeClickable(element(by.css('#fromDate > div > label > input')));
            },
// <analisis>.<Date Range- From Field > ***********************************
            getToField_DateRange: function(){
                return TestHelperPO.elementToBeClickable(element(by.css('#toDate > div > label > input')));
            },

// <analisis>.<Date Range- Apply button > ***********************************
            getApplyBTN_DateRange: function(){
                return TestHelperPO.elementToBeClickable(element(by.css('#submitButton')));
            },

// <analisis>.<saveTemplateErrorMessage for unauthorized user existes on the view> **********************************************************************************************
            getsaveTemplateErrorMessageForViewOnlyAuth: function(){

                // return element.all(by.css('div.message.style-scope.px-alert-message >p > span:nth-child(2)')); // target refactroed

                return element.all(by.css('#message > span:nth-child(2)')); // target refactroed

            },

// <analisis>.<View Save Template dropdown > ***********************************
            getViewTemplateDropdownArrow: function(){
                return element(by.css('#my-deck-selector > div > i'));
            },
// <analisis>.<View Save Template dropdown > ***********************************
            getViewTemplateDropdownOption: function(){
                return element(by.css('#dropdown'));
            },
// <analisis>.<New Save Template- view template dropdown menu > ***********************************
            getViewTemplateDropdownMenu_lastOption: function(){
                return element(by.css('#dropdown > li.deck-editor.style-scope.px-deck-selector > div'));
            },

// <analisis>.<Analysis Line Charts Resize on Left Menu Collapse/Expand > ***********************************

            // Target for left menu on the top of the screen
            getLeftMenu: function(){
                return TestHelperPO.elementToBeClickable(element(by.css('body > aside > div.pxh-drawer-toggle > a > svg > path')));
            },

            // Target for chart area
            getChartArea: function(){
                return TestHelperPO.isElementPresent(element(by.css('rect.highcharts-background'))).then(function(){
                    return element(by.css('rect.highcharts-background'));  // for Chart Area
                })
            },

            // Target for high chart area
            getHighChartGrid: function(){
                return TestHelperPO.isElementPresent(element(by.id('px-chart-container'))).then(function() {
                    return element(by.id('px-chart-container'));  // High Chart Grid
                });
            },

            //checkForPlottedData: function(){
            //    return TestHelperPO.isElementPresent(element(by.css('.spinner.style-scope.px-spinner'))).then(function() {
            //       return  element(by.css('.spinner.style-scope.px-spinner')).getInnerHtml().then(function(result){
            //        if(result.toEqual("")){
            //            console.log("EMPTY NO CHILD");
            //            return false;
            //        }
            //            else{
            //            console.log("NOT EMPTY. HAS CHILD");
            //            return true;
            //        }
            //        });
            //    });
            //},
            checkForPlottedData: function(){
                return TestHelperPO.isElementPresent(element.all(by.css('.spinner.style-scope.px-spinner')).get(4)).then(function() {
                    return  element.all(by.css('.spinner.style-scope.px-spinner')).get(4)
                });
            },


            getLeftNav: function(){
                return element(by.css('body > aside > nav'));  // Left Navigation
            },



            // Multi-asset label
            getMultiAssetLabel: function(){
                return element(by.css('#plotted-assets-list > li > div > div.tag-name-container.style-scope.plotted-asset-list > h4'));
            }

            /*
            *****************************************************End of Monira Sultana Properties*******************************************************
            */
        }
    };



    

    module.exports = new AnalysisPage();

}())

