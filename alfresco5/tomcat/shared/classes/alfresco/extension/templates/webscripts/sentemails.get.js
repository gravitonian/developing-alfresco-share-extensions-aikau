// Get the sent email info from the /Guest Home/sentEmails.json file
var sentEmailsFileName = "sentEmails.json";
var sentEmailsFile = companyhome.childByNamePath("Guest Home/" + sentEmailsFileName);
var emailInfo = "";
if (sentEmailsFile != null) {
  emailInfo = sentEmailsFile.content;
}

model.emailsJson = emailInfo;

