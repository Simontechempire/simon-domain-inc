// SIMON DOMAIN INC - api.js - Render Version
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));

const RENDER_API_KEY = process.env.RENDER_API_KEY; // From Render Dashboard!

// Database of created domains (In real app, use MongoDB)
let createdDomains = ["google.com","facebook.com","simon.com"]; // TAKEN examples

// Check if domain is created or uncreated
app.get('/api/check', (req,res)=>{
  const name = req.query.name;
  const results = [];
  
  const allTLDs = [".com",".com.ng",".ng",".net",".org",".tech",".io",".co",".inc"];
  
  allTLDs.forEach(tld=>{
    const full = name + tld;
    const isTaken = createdDomains.includes(full) || full.includes("google");
    results.push({
      domain: full,
      available: !isTaken,
      price: tld==".com.ng"?"₦1200":"$7"
    });
  });
  
  res.json(results);
});

// Create domain with Render API
app.post('/api/create', async (req,res)=>{
  const {domain} = req.body;
  
  try {
    // Use Render API Key to create custom domain
    const response = await fetch(`https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/custom-domains`, {
      method:'POST',
      headers:{
        'Authorization': `Bearer ${RENDER_API_KEY}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({name: domain})
    });
    
    // Save as created
    createdDomains.push(domain);
    
    res.json({success:true, message: `✅ ${domain} CREATED! Now live on SIMON TECH INC`});
  } catch(e){
    res.json({success:true, message: `✅ ${domain} CREATED! (Simulated - Add real Render Service ID)`});
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log(`SIMON TECH INC running on ${PORT}`));
