const fs = require('fs');
require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const analysisRoutes = require('./src/routes/analysisRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to Dermafie API');
});

app.use('/users', userRoutes);
app.use('/analyze', analysisRoutes);

// Check if key file exists
const keyFilePath = process.env.GCLOUD_KEYFILE_PATH;
fs.access(keyFilePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Key file not found: ${keyFilePath}`);
  } else {
    console.log(`Key file found: ${keyFilePath}`);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
