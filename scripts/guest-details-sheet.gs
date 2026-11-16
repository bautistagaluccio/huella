// Google Apps Script for the "Guest details" responses sheet.
// The website's guest form (/guests/gudauri) POSTs each response here and this adds it as a row.
//
// Setup (once): in the Google Sheet, Extensions → Apps Script, paste this file, then
// Project Settings → Script Properties → add SECRET with the same value as GUEST_SHEET_SECRET
// in Vercel. Deploy → New deployment → Web app, execute as Me, access Anyone.
// Put the web app URL in Vercel as GUEST_SHEET_URL.

var HEADERS = [
  "Received",
  "Trip",
  "Full name",
  "Email",
  "WhatsApp",
  "Ski level",
  "Shoe size (EU)",
  "Height (cm)",
  "Weight (kg)",
  "Dietary needs and allergies",
  "Nationality",
  "Passport origin",
  "Passport number",
  "Date of birth",
  "Passport expiry",
  "Anything else",
  "Payment proof",
];

// Payment proofs are saved to this Drive folder (created on first use) and linked in the sheet.
var PROOF_FOLDER = "Huella payment proofs";

var KEYS = [
  "trip",
  "fullName",
  "email",
  "phone",
  "skiLevel",
  "shoeSize",
  "height",
  "weight",
  "dietary",
  "nationality",
  "passportOrigin",
  "passportNumber",
  "dateOfBirth",
  "passportExpiry",
  "notes",
];

function doPost(e) {
  var body = JSON.parse(e.postData.contents);
  var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!secret || body.secret !== secret) return reply({ ok: false, error: "unauthorized" });

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    var row = [new Date()].concat(
      KEYS.map(function (key) {
        // Leading apostrophe keeps Sheets from turning sizes, numbers and dates into other values.
        return "'" + String(body.details[key] || "");
      }),
    );
    row.push(saveProof(body.details));
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

function saveProof(details) {
  var proof = details.paymentProof;
  if (!proof) return "";
  var folders = DriveApp.getFoldersByName(PROOF_FOLDER);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(PROOF_FOLDER);
  var name = details.fullName + " · " + proof.name;
  var file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(proof.data), proof.type, name));
  return file.getUrl();
}

function reply(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
