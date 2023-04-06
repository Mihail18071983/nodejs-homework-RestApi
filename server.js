const app = require('./app');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const { DB_HOST } =process.env

const launchPort = app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
})


mongoose.connect(DB_HOST).then(launchPort);