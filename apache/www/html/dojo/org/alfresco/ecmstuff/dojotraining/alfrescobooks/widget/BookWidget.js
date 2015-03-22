define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",			// Base class for this widget
    "dijit/_TemplatedMixin",			// This widget uses a HTML template (extends dijit/_AttachMixin)
    "dijit/_WidgetsInTemplateMixin",		// Mixin new declarative widgets from HTML template (i.e. the button) (extends dojo/parser)
    "dojo/text!./templates/BookWidget.html",	// The HTML template to use     
    "dijit/form/Button"  			// Used in the HTML template (needs to be last as otherwise it will be used as template)
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        // Some default values for our book properties, in case they are missing in the JSON object
        title: "Unknown Title",
        author: "Unknown Author",
        summary: "",

        // Using require.toUrl, we can get a path to our BookWidget's space
        // and we want to have a default cover image, just in case
        coverImage: require.toUrl("./widget/images/defaultCoverImage.png"),

	// Keep track of how many has viewed this book and clicked the Viewed button
	viewCount: 0,

        // The Widget HTML template = content of BookWidget.html
        templateString: template,
 
        // A CSS class to be applied to the root node in our HTML template (i.e. the top level div)
        baseClass: "bookWidget",

	// Button click event handler
	viewed: function () {
	    this.viewCount += 1;
            this._setText('Count is now ' + this.viewCount);
        },

	// Set the new view count as text node
	_setText: function (text) {
            var node = document.createTextNode(text);
            this.viewCountNode.innerHTML = '';
            this.viewCountNode.appendChild(node);
        }
  }); 
});
