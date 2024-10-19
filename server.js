//server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = 5001;


// Enable CORS
app.use(cors());


// Root Route
app.get('/', (req, res) => {
   res.send('Welcome to the Drug Interaction Checker API!');
 });


// Drug interaction API endpoint (example: using RxNav API)


const OPENFDA_API_URL = 'https://api.fda.gov/drug/label.json';




app.get('/check-interaction', async (req, res) => {
   const { drug1, drug2 } = req.query;
    if (!drug1 || !drug2) {
     return res.status(400).json({ error: 'Please provide two drugs' });
   }
    try {
     // Fetch data for drug 1
     const response1 = await axios.get(`${OPENFDA_API_URL}`, {
       params: {
         search: `openfda.brand_name:"${drug1}"`,
         limit: 1,
       },
     });
      // Fetch data for drug 2
     const response2 = await axios.get(`${OPENFDA_API_URL}`, {
       params: {
         search: `openfda.brand_name:"${drug2}"`,
         limit: 1,
       },
     });
      // Extract drug interaction information
     const drug1Interactions = response1.data.results[0]?.drug_interactions || 'No interaction info found';
     const drug2Interactions = response2.data.results[0]?.drug_interactions || 'No interaction info found';
      res.json({
       drug1: { name: drug1, interactions: drug1Interactions },
       drug2: { name: drug2, interactions: drug2Interactions },
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Error fetching drug interaction data' });
   }
 });
  app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
 });
