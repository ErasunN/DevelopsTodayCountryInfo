require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const countriesRoutes = require('./routes/countries.routes')
const countryRoutes = require('./routes/country.routes')

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/countries', countriesRoutes);
app.use('/country', countryRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});