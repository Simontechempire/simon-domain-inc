// SIMON DOMAIN INC - TLD Database
const TLDs = [
  {tld:".com", price:"$7", status:"free", note:"LIKELY FREE"},
  {tld:".com.ng", price:"₦1200", status:"free", note:"NIGERIA"},
  {tld:".ng", price:"₦1500", status:"free"},
  {tld:".net", price:"$8", status:"free"},
  {tld:".org", price:"$7", status:"free"},
  {tld:".tech", price:"$4", status:"free", note:"Best for Tech"},
  {tld:".io", price:"$30", status:"free"},
  {tld:".co", price:"$8", status:"free"},
  {tld:".inc", price:"$30", status:"free", note:"Perfect for INC!"},
  {tld:".app", price:"$12", status:"free"},
  {tld:".dev", price:"$12", status:"free"},
  {tld:".ai", price:"$50", status:"free"},
];

// Show all TLDs on page
function loadTLDs(){
  const div = document.getElementById('tlds');
  let html = "";
  TLDs.forEach(t => {
    html += `<div class="tld"><span class="${t.status}">${t.status=='free'?'🟢':'🔴'} simontechinc${t.tld}</span> <br><small>${t.price} - ${t.note||''}</small></div>`;
  });
  div.innerHTML = html;
}
loadTLDs();
