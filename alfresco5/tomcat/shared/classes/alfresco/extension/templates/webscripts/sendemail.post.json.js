// Get the POSTed JSON data
var toAddress = json.get("toAddress");
var subject = json.get("subject");
var bodyTextStart = json.get("bodyText");
var nodeRefArray = json.getJSONArray("nodeRefs"); // org.json.JSONArray

// Compile the body of the email with links to each node
var bodyText = bodyTextStart + "\n\n";
var arrayLength = nodeRefArray.length();
for (var i = 0; i < arrayLength; i++) {
  var aNode = search.findNode(nodeRefArray.getString(i));
  bodyText += aNode.name + ": " + 
	"http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser/root?objectId=" + 
	aNode.id + "\n";   
}

// Send the email 
var mail = actions.create("mail");
mail.parameters.to = toAddress;
mail.parameters.from = "local@alfresco";
mail.parameters.subject = subject;
mail.parameters.text = bodyText;
mail.execute(companyhome);

// Put some stuff in the model for the HTML template
model.toAddress = toAddress;
model.subject = subject;
model.bodyText = bodyText;
model.nodeRefArray = nodeRefArray;

// Store the sent email info in the /Guest Home/sentEmails.json file
var fileNames = "";
for (var i = 0; i < arrayLength; i++) {
  var aNode = search.findNode(nodeRefArray.getString(i));
  fileNames += aNode.name + ",";   
}
var emailInfoObj = 
	{ 
	 'toAddress': toAddress, 
	 'subject': subject, 
	 'bodyText': bodyTextStart, 
	 'files': fileNames 
	};
var sentEmailsFileName = "sentEmails.json";
var guestHomeFolder = companyhome.childByNamePath("Guest Home");
var sentEmailsFile = guestHomeFolder.childByNamePath(sentEmailsFileName);
if (sentEmailsFile == null) {
  sentEmailsFile = guestHomeFolder.createFile(sentEmailsFileName);
  sentEmailsFile.mimetype = "application/json";
} else {
  sentEmailsFile.content += ",\r\n";
}
sentEmailsFile.content += jsonUtils.toJSONString(emailInfoObj);