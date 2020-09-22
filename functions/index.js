const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

// just for testing
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

// load app with private key
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testrest-319e0.firebaseio.com"
});

// get the db.json
const fs = require('fs');
var dbJson = "";
fs.readFile('./db.json', (err, data) => {
    if (err) throw err;
    dbJson = JSON.parse(data);
});

// endpoints
app.get('/get_team_suggested_members_options', (req, res) => {
  return res.status(200).send(dbJson["get_team_suggested_members_options"]);
});

app.get('/get_team_suggested_members', (req, res) => {
  return res.status(200).send(dbJson["get_team_suggested_members"]);
});

app.get('/get_team_invited_members', (req, res) => {
  return res.status(200).send(dbJson["get_team_invited_members"]);
});

app.get('/get_team_invites', (req, res) => {
  return res.status(200).send(dbJson["get_team_invites"]);
});

app.get('/get_member_team_state', (req, res) => {
  return res.status(200).send(dbJson["get_member_team_state"]);
});


exports.app = functions.https.onRequest(app);
