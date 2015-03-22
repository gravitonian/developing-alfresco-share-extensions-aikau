var TOGGLE_LOGO_TOPIC_NAME = "TOGGLE_LOGO_TOPIC";
var SHOW_ATTRIBUTE_NAME = "show";
var SHOW_ATTRIBUTE_ALFRESCO_VALUE = "SHOW_ALFRESCO_LOGO";
var SHOW_ATTRIBUTE_SURF_VALUE = "SHOW_SURF_LOGO";

var showAlfrescoLogoNextVisibilityConfig = {
    initialValue: false,
    rules: [
        {
            topic: TOGGLE_LOGO_TOPIC_NAME,
            attribute: SHOW_ATTRIBUTE_NAME,
            is: [SHOW_ATTRIBUTE_SURF_VALUE],
            isNot: [SHOW_ATTRIBUTE_ALFRESCO_VALUE]
        }
    ]
};

var showSurfLogoNextVisibilityConfig = {
    initialValue: true,
    rules: [
        {
            topic: TOGGLE_LOGO_TOPIC_NAME,
            attribute: SHOW_ATTRIBUTE_NAME,
            is: [SHOW_ATTRIBUTE_ALFRESCO_VALUE],
            isNot: [SHOW_ATTRIBUTE_SURF_VALUE]
        }
    ]
};

var showAlfrescoLogoLinkWidget = {
    name: "alfresco/renderers/PropertyLink",
    config: {
        visibilityConfig: showAlfrescoLogoNextVisibilityConfig,
        currentItem: {
            label: "Show Alfresco Logo Instead"
        },
        propertyToRender: "label",
        useCurrentItemAsPayload: false,
        publishTopic: TOGGLE_LOGO_TOPIC_NAME,
        publishPayloadType: "CONFIGURED",
        publishPayload: {
            show: SHOW_ATTRIBUTE_ALFRESCO_VALUE
        }
    }
};

var showSurfLogoLinkWidget = {
    name: "alfresco/renderers/PropertyLink",
    config: {
        visibilityConfig: showSurfLogoNextVisibilityConfig,
        currentItem: {
            label: "Show Surf Logo Instead"
        },
        propertyToRender: "label",
        useCurrentItemAsPayload: false,
        publishTopic: TOGGLE_LOGO_TOPIC_NAME,
        publishPayloadType: "CONFIGURED",
        publishPayload: {
            show: SHOW_ATTRIBUTE_SURF_VALUE
        }
    }
};

var alfrescoLogoWidget = {
    name: "alfresco/logo/Logo",
    config: {
        logoClasses: "alfresco-logo-only",
        visibilityConfig: showSurfLogoNextVisibilityConfig
    }
};

var surfLogoWidget = {
    name: "alfresco/logo/Logo",
    config: {
        logoClasses: "surf-logo-large",
        visibilityConfig: showAlfrescoLogoNextVisibilityConfig
    }
};


model.jsonModel = {
    widgets: [
        {
            id: "MY_HORIZONTAL_WIDGET_LAYOUT",
            name: "alfresco/layout/HorizontalWidgets",
            config: {
                widgetWidth: 25,
                widgets: [ alfrescoLogoWidget, showAlfrescoLogoLinkWidget,
                           showSurfLogoLinkWidget, surfLogoWidget ]
            }
        }
    ]
};

