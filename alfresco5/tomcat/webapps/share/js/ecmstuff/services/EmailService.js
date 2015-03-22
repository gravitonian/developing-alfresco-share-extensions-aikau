/**
 * This Aikau Service makes a call to a custom Web Script that sends an email.
 * The content of the email, and where to send it, is passed in via 
 * SEND_EMAIL_TOPIC event data payload.
 * The event is send from a custom form where email information is specified 
 * and documents are picked. 
 *
 * @module ecmstuff/services/EmailService
 * @extends module:alfresco/core/Core
 * @author Martin Bergljung
 */
define(["dojo/_base/declare",
	"dojo/_base/lang",
        "alfresco/core/Core",
        "alfresco/core/CoreXhr",
	"service/constants/Default",
        "alfresco/core/NotificationUtils"],
        function(declare, lang, AlfCore, AlfCoreXhr, AlfConstants, AlfNotificationUtils) {
   return declare([AlfCore, AlfCoreXhr, AlfNotificationUtils], {
      
      /**
       * Sets up the subscriptions for Send Email Events
       * 
       * @instance
       * @param {array} args Constructor arguments
       */
      constructor: function ecmstuff_services_EmailService__constructor(args) {
          lang.mixin(this, args);
          this.alfSubscribe("SEND_EMAIL_TOPIC", lang.hitch(this, "onSendEmail"));
      },
      
      /**
       * Make a REST-based call to a Web Script that sends the email
       * 
       * @instance
       * @param {object} payload The details of the email to be sent, such as email address, 
       *                         subject, body, noderefs for files to create links for
       */
      onSendEmail: function ecmstuff_services_EmailService__onSendEmail(payload) {
         var ajaxCallPostData = {
	     toAddress: payload.email_address, 
	     subject: payload.email_subject, 
	     bodyText: payload.email_body_text, 
	     nodeRefs: payload.selected_file_nodeRefs
         };

         var ajaxCallConfig = { 
             url: AlfConstants.PROXY_URI + "/ecmstuff/sendemail",
             method: "POST",
             data: ajaxCallPostData,
             successCallback: this.onSendEmailSuccess,
             failureCallback: this.onSendEmailFailure,
             callbackScope: this
         };
         
         this.serviceXhr(ajaxCallConfig);
      },

     /**
       * Success callback handler when sending email
       * 
       * @instance
       * @param {object} response The response from the request
       * @param {object} originalRequestConfig The configuration passed on the original request
       */
      onSendEmailSuccess: function alfresco_services_ActionService__onSendEmailSuccess(response, originalRequestConfig) {
          var msg = "Successfully sent email to " + originalRequestConfig.data.toAddress;
          this.alfLog("log", msg, response, originalRequestConfig);
          this.displayMessage(msg);
          // Have the email list reload after a new email has been sent, it will reload with current configuration
          this.alfPublish("ALF_DOCLIST_RELOAD_DATA", {});
      },
      
      /**
       * Failure callback handler when sending email
       * 
       * @instance
       * @param {object} response The response from the request
       * @param {object} originalRequestConfig The configuration passed on the original request
       */
      onSendEmailFailure: function alfresco_services_ActionService__onSendEmailSuccess(response, originalRequestConfig) {
          var msg = "Failure sending email to " + originalRequestConfig.data.toAddress;
          this.alfLog("log", msg, response, originalRequestConfig);
          this.displayMessage(msg);
      }

   });
});

