define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dijit/_TemplatedMixin",
        "dojo/text!./HelloWorldWidget.html"],
    function(declare, _Widget, Core, _Templated, template) {
        return declare([_Widget, Core, _Templated], {
           templateString: template,
           i18nScope: "ECMStuff",
           i18nRequirements: [ {i18nFile: "./HelloWorldWidget.properties"} ],
           cssRequirements: [{cssFile:"./HelloWorldWidget.css"}],

           postMixInProperties: function mycompany_widgets_HelloWorldWidget__postMixInProperties() {
            this.greeting = this.message("helloworld.label");
           }
        });
    }
);
