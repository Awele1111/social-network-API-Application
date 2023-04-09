// const router = require('express').Router();
// const apiRoutes = require('./api');

// router.use('/api', apiRoutes);

// router.use((req, res) => {
//   return res.send('Wrong route!');
// });

// module.exports = router;

const router = require('express').Router();
const apiRoutes = require("./api");

// give prefixes to all routes in subdirectories
router.use("/api", apiRoutes);

// if inelligible route is used in search bar, return a 404 error
router.use((req, res) => {
  res.status(404).send('<h1>404 Error: This page does not exist!</h1>');
});

// exports
module.exports = router;
