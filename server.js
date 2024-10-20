//server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5001;
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function query(data, drug1, drug2) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `You are a helpful assistant that concisely summarizes the effects of ${drug1} and ${drug2} and how they interact with each other.` 
        },
        { 
          role: "user", 
          content: `Summarize the following interaction details: ${data.inputs}` 
        },
      ],
      max_tokens: 200,  // Adjust token limit as needed
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw error;
  }
}

// async function query(data) {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//     {
//       headers: {
//         Authorization: "Bearer "+process.env.HUGGING_FACE_API_KEY, 
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(data),
//     }
//   );
//   const result = await response.json();
//   return result;
// }


var userid;

var con = mysql.createConnection({
  host: "localhost",
  user: "hackwashu",
  password: "c0kef3nt!",
  database: "medicatesafe"
});

//connect to mysql
con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

app.use(express.json());  // To handle JSON bodies
app.use(express.urlencoded({ extended: true }));  // To handle form-encoded bodies

// Enable CORS
app.use(cors());


// Root Route
app.get('/', (req, res) => {
   res.send('Welcome to the Drug Interaction Checker API!');
 });


// Drug interaction API endpoint (example: using RxNav API)


const OPENFDA_API_URL = 'https://api.fda.gov/drug/label.json';


function simpleExtractiveSummary(text, text2, drug1, drug2, numSentences = 7) {
  // Split the texts into sentences
  const sentences = text.split('. ').filter(sentence => sentence.length > 0);
  const sentences2 = text2.split('. ').filter(sentence => sentence.length > 0);

  // Sort the filtered sentences by length and take the top 'numSentences'
  let summarySentences = sentences
    .sort((a, b) => b.length - a.length)
    .slice(0, numSentences); // Take the top 'numSentences'
  
  let summarySentences2 = sentences2
    .sort((a, b) => b.length - a.length)
    .slice(0 , numSentences); // Take the top 'numSentences'

  // Concatenate and return the summary
  drug1=drug1.concat("compare this drug with ");
  drug1=drug1.concat(drug2);
  summarySentences = summarySentences.concat(summarySentences2);
  summarySentences = summarySentences.concat(drug1)
  return summarySentences.join('. ') + '.';
}

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
     drug1Interactions = response1.data.results[0]?.drug_interactions || 'No interaction info found';
     drug2Interactions = response2.data.results[0]?.drug_interactions || 'No interaction info found';
     
     fullInteractionText = `Drug 1 (${drug1}) Interactions: ${drug1Interactions}. Drug 2 (${drug2}) Interactions: ${drug2Interactions}.`;

     fullInteractionText= simpleExtractiveSummary(String(drug1Interactions),String(drug2Interactions),String(drug1), String(drug2))

     const summary = await query({ inputs: fullInteractionText }, drug1, drug2);

     // Log the full response to check the structure
     console.log('Hugging Face response:', summary);
 
     res.json({
       drug1: { name: drug1, interactions: drug1Interactions },
       drug2: { name: drug2, interactions: drug2Interactions },
       summary,
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Error fetching drug interaction data' });
   }
 });


 app.post('/register', (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).json({ message: 'Username and password are required' });  
  }

  try {
    const HashedPassword = bcrypt.hashSync(Password, 10);
    const sql = `INSERT INTO users (Username, HashedPassword) VALUES (?, ?)`;

    con.query(sql, [Username, HashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.json({ message: 'Registration successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing registration' });
  }

});


app.post('/login', (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
      return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const sql = `SELECT HashedPassword FROM users WHERE Username = ?`;
    con.query(sql, [Username], (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const HashedPassword = result[0].HashedPassword;
      if (bcrypt.compareSync(Password, HashedPassword)) {
        res.json({ message: 'Login successful' });
        const sql = `SELECT userid FROM users WHERE Username = ?`;
        con.query(sql, [Username], (err, result) => {
          if (err || result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
          }
          userid=result[0].userid;
          console.log(userid)
        });
      } 
      else {
        res.status(401).json({ message: 'Incorrect password' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing login' });
  }
});

  app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
 });