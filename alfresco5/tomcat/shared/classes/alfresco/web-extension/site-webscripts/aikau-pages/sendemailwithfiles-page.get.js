var documentPickerWidget = {
    name: "alfresco/forms/controls/DocumentPicker",
    config: {
        label: "Select files to email",
        name: "selected_file_nodeRefs"
    }
};

var emailAddressTextBoxWidget = {
   name: "alfresco/forms/controls/TextBox",
   config: {
      fieldId: "EMAIL_ADDRESS",
      name: "email_address",
      label: "Send-To Email",
      description: "Send the selected files to this e-mail address",
      placeHolder: "name@address.com",
      requirementConfig: {
         initialValue: true
      },
      validationConfig: [
         {
            validation: "regex",
            regex: "^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$",
            errorMessage: "A valid E-mail address is required"
         }
      ]
   }
};
	
var emailSubjectTextBoxWidget = {
   name: "alfresco/forms/controls/TextBox",
   config: {
      fieldId: "EMAIL_SUBJECT",
      name: "email_subject",
      label: "Subject",
      description: "This is the subject text for the email",
      placeHolder: "Files from Alfresco Repo",
      requirementConfig: {
         initialValue: true
      }
   }
};

var emailBodyTextAreaWidget = {
   name: "alfresco/forms/controls/TextArea",
   config: {
      fieldId: "EMAIL_BODY_TEXT",
      name: "email_body_text",
      label: "Email Body Text",
      description: "This the text that should go into the email body",
      requirementConfig: {
         initialValue: true
      }
   }
};

var formWidget = {
    name: "alfresco/forms/Form",
    config: {
        showOkButton: true,
        okButtonLabel: "Send Email",
        showCancelButton: false,
        cancelButtonLabel: "Not used...",
        okButtonPublishTopic: "SEND_EMAIL_TOPIC",
        okButtonPublishGlobal: true,
        widgets: [ documentPickerWidget, emailAddressTextBoxWidget,
                emailSubjectTextBoxWidget, emailBodyTextAreaWidget ]
    }
};

var emailListWidget = {
 name: "alfresco/lists/AlfList",
 config: {
    loadDataPublishTopic: "ALF_CRUD_GET_ALL",
    loadDataPublishPayload: {
      url: "ecmstuff/sentemails"
    },
    itemsProperty: "emails",
    widgets: [
	{
	  name: "alfresco/lists/views/AlfListView",
	  config: {
	    additionalCssClasses: "bordered",
	    widgetsForHeader: [
	     {
	       name: "alfresco/lists/views/layouts/HeaderCell",
	       config: {
		 additionalCssClasses: "mediumpad",
	         label: "To-Address"
	       }
	     }, 
	     {
	       name: "alfresco/lists/views/layouts/HeaderCell",
	       config: {
		 additionalCssClasses: "mediumpad",
	         label: "Subject"
	       }
	     }, 
	     {
	       name: "alfresco/lists/views/layouts/HeaderCell",
	       config: {
		 additionalCssClasses: "mediumpad",
	         label: "Body Text"
	       }
	     }, 
	     {
	       name: "alfresco/lists/views/layouts/HeaderCell",
	       config: {
		 additionalCssClasses: "mediumpad",
	         label: "Files"
	       }
	     } 
            ],
	    widgets: [
	      {
		name: "alfresco/lists/views/layouts/Row",
		config: {
		  widgets: [
		    {
		      name: "alfresco/lists/views/layouts/Cell",
		      config: {
	    	        additionalCssClasses: "mediumpad",
			widgets: [
			  {
			    name: "alfresco/renderers/Property",
			    config: {
			      propertyToRender: "toAddress"
			    }
			  }
			]
		      }
		    },
		    {
		      name: "alfresco/lists/views/layouts/Cell",
		      config: {
	    	        additionalCssClasses: "mediumpad",
			widgets: [
			  {
			    name: "alfresco/renderers/Property",
			    config: {
			      propertyToRender: "subject"
			    }
			  }
			]
		      }
		    },
		    {
		      name: "alfresco/lists/views/layouts/Cell",
		      config: {
	    	        additionalCssClasses: "mediumpad",
			widgets: [
			  {
			    name: "alfresco/renderers/Property",
			    config: {
			      propertyToRender: "bodyText"
			    }
			  }
			]
		      }
		    },
		    {
		      name: "alfresco/lists/views/layouts/Cell",
		      config: {
			additionalCssClasses: "mediumpad",
			widgets: [
			  {
			    name: "alfresco/renderers/Property",
			    config: {
			      propertyToRender: "files"
			    }
			  }
			]
		      }
		    }
		  ]
		}
	      }
	    ]
	  }
	}
     ]
 }
};

var emailListWindowWidget = {
  name: "alfresco/layout/VerticalWidgets",
  widthPc: "65",
  config: {
    widgets: [
      {
        name: "alfresco/layout/ClassicWindow",
        config: {
          title: "Sent Emails",
	  widgets: [ emailListWidget ]
        }
      }
    ]
  }
};

var horizontalLayoutWidget = {
   name: "alfresco/layout/HorizontalWidgets",
   config: {
      "widgetMarginLeft": 25,
      "widgetMarginRight": 25,
      "widgets": [ formWidget, emailListWindowWidget ]
   }
};

var verticalLayoutWidget = {
   "name": "alfresco/layout/VerticalWidgets",
   "config": {
      "widgetMarginTop": 25,
      "widgetMarginBottom": 25,
      "widgets": [ horizontalLayoutWidget ]
    }
};

model.jsonModel = {
    services: [
      "alfresco/dialogs/AlfDialogService",
      "alfresco/services/DocumentService",
      "alfresco/services/SiteService",
      "alfresco/services/CrudService",
      "ecmstuff/services/EmailService",
      {
        name: "alfresco/services/LoggingService",
        config: {
          loggingPreferences: {
            enabled: true,
            all: true
          }
        }
      }
    ],
    widgets: [ 
 	{
           id: "SET_PAGE_TITLE",
           name: "alfresco/header/SetTitle",
           config: {
               title: "Pick files and send as links in email",
           }
        },
	verticalLayoutWidget /*, 
	{
	  name: "alfresco/logging/SubscriptionLog"
	}*/
   ]
};

