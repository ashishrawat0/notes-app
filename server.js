const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directorsady
app.use(express.static(__dirname + '/dist/notes-app'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/notes-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('Console is running')