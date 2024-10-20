import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Login from './components/login';
import Register from './components/register'
import ProfileIcon from './components/profile';


function App() {
 const [drug1, setDrug1] = useState('');
 const [drug2, setDrug2] = useState('');
 const [interactionResult, setInteractionResult] = useState(null);
 const [error, setError] = useState(null);
 const [showLogin, setShowLogin] = useState(false);
 const [showRegister, setShowRegister] = useState(false);
 const [profileName, setProfileName] = useState("Profile");

 const handleProfileClick = () => {
  setShowLogin(true);
 }

 const handleRegister = (credentials) => {
  console.log('Registering user:', credentials);
  setShowLogin(false);
};

const handleLogin = (credentials) => {
  console.log('Logging in user:', credentials);
  setProfileName(credentials.username);
  setShowLogin(false);
};

const handleCloseModal = () => {
  setShowLogin(false);
};

const switchToRegister = () => {
  setShowRegister(true);
};

const switchToLogin = () => {
  setShowRegister(false);
};


 const checkInteraction = async () => {
   setError(null);
   setInteractionResult(null);


   if (!drug1 || !drug2) {
     setError('Please enter two drug names.');
     return;
   }


   try {
     const response = await axios.get('http://localhost:5001/check-interaction', {
       params: { drug1, drug2 },
     });
     setInteractionResult(response.data);
   } catch (err) {
     setError('Error fetching interaction data. Please try again.');
   }
 };


 return (
   <div className="App">
      <ProfileIcon
        onClick = {handleProfileClick}
        text = {profileName}
      />
      {showLogin  && (
        showRegister 
        ? <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} onClose = {handleCloseModal}/> 
        : <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} onClose = {handleCloseModal}/>
      )}
     <h1>Drug Interaction Checker</h1>
     <div className="input-container">
       <input
         type="text"
         placeholder="Enter first drug"
         value={drug1}
         onChange={(e) => setDrug1(e.target.value)}
       />
       <input
         type="text"
         placeholder="Enter second drug"
         value={drug2}
         onChange={(e) => setDrug2(e.target.value)}
       />
       <button onClick={checkInteraction}>Check Interaction</button>
     </div>


     {error && <p className="error">{typeof error === 'string' ? error : JSON.stringify(error)}</p>}


     {interactionResult && (
       <div className="result">
         <h2>Interaction Result:</h2>
         <pre>{JSON.stringify(interactionResult, null, 2)}</pre>
         <h3>Summary:</h3>
         <p>{typeof interactionResult.summary === 'string' ? interactionResult.summary : JSON.stringify(interactionResult.summary)}</p>

       </div>
     )}
   </div>
 );
}


export default App;
