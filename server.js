// const express = require('express');
// const db = require('./config/connection');
// const routes = require('./routes');

// const cwd = process.cwd();

// const PORT = 3001;
// const app = express();

// // Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes('01-Activities')
//   ? cwd.split('/01-Activities/')[1]
//   : cwd;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server for ${activity} running on port ${PORT}!`);
//   });
// });


const express = require('express');
const mongoose = require("mongoose");

// instantiate the app with a variable port
const app = express();
const PORT = process.env.PORT || 3001;

// implement formatting of data using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// directory
app.use(require('./routes'));

// tell mongoose to connect to db. it will create the db if it doesn't already exist
mongoose.connect(process.env.MONGOD_URI || "mongodb://localhost:27017/social_network", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
// log mongo queries being executed
mongoose.set("debug", true);

// set up app to listen on a variable port
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
