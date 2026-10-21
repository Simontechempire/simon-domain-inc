// SIMON TECH INC - Website.js
async function checkDomain(){
  const name = document.getElementById('search').value;
  if(!name) return alert("Enter name");
  
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "Checking...";
  
  // Check with our api.js
  const res = await fetch('/api/check?name='+name);
  const data = await res.json();
  
  let html = `<h3>Results for ${name}</h3>`;
  data.forEach(d => {
    if(d.available){
      html += `<p>🟢 <b>${d.domain}</b> - FREE <button onclick="createDomain('${d.domain}')">Create Now</button></p>`;
    } else {
      html += `<p>🔴 <b>${d.domain}</b> - TAKEN (Created)</p>`;
    }
  });
  resultDiv.innerHTML = html;
}

async function createDomain(domain){
  if(!confirm(`Create ${domain}?`)) return;
  
  const res = await fetch('/api/create', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({domain})
  });
  const data = await res.json();
  alert(data.message);
      }
