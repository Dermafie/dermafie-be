require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to Dermafie API');
});

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});