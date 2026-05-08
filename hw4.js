hw4.js
// Homework 4 - Complete implementation with Fetch API, Cookies, Local Storage
function $(id){return document.getElementById(id)}
function setError(id, msg){ const el = document.getElementById('err-'+id); if(el) el.textContent = msg || ''; }
function onlyDigits(s){return s.replace(/\D/g,'')}
function setCookie(name, cvalue, expiryDays){ const day = new Date(); day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000)); document.cookie = name + '=' + encodeURIComponent(cvalue) + ';expires=' + day.toUTCString() + ';path=/'; }
function getCookie(name){ const cookieName = name + '='; const cookies = document.cookie.split(';'); for(const cookie of cookies){ const trimmed = cookie.trim(); if(trimmed.indexOf(cookieName)===0){ return decodeURIComponent(trimmed.substring(cookieName.length)); }} return ''; }
function deleteCookie(name){ document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'; }
function clearAppStorage(){ Object.keys(localStorage).filter(k=>k.startsWith('hw4_')).forEach(k=> localStorage.removeItem(k)); }
function saveLocalField(id){ const el = $(id); if(!el) return; let value = '';
  if(el.type==='checkbox') value = el.checked;
  else value = el.value;
  localStorage.setItem('hw4_'+id, value);
}
function saveRadio(name){ const selected = document.querySelector('input[name="'+name+'"]:checked'); if(selected) localStorage.setItem('hw4_'+name, selected.value); else localStorage.removeItem('hw4_'+name); }
function saveSymptoms(){ const choices = Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(cb=>cb.value); localStorage.setItem('hw4_symptoms', JSON.stringify(choices)); }
function populateStateOptions(states){ const stateSelect = $('state'); if(!stateSelect) return; stateSelect.innerHTML = '<option value="">-- Select state --</option>'; states.forEach(code=>{ const opt = document.createElement('option'); opt.value = code; opt.textContent = code; stateSelect.appendChild(opt); }); const storedState = localStorage.getItem('hw4_state'); if(storedState) stateSelect.value = storedState; }
function populateSymptomOptions(symptoms){ const container = document.querySelector('input[name="symptom"]').parentElement.parentElement; if(!container) return; // Add symptom checkboxes dynamically if needed
  const stored = localStorage.getItem('hw4_symptoms'); if(stored){ try{ const choices = JSON.parse(stored); document.querySelectorAll('input[name="symptom"]').forEach(cb=>{ cb.checked = choices.includes(cb.value); }); } catch(_){} }
  document.querySelectorAll('input[name="symptom"]').forEach(cb=> cb.addEventListener('change', ()=>{ saveSymptoms(); validateSymptoms(); })); }
function loadLocalForm(){ const fields = ['firstName','middleInitial','lastName','dobMonth','dobDay','dobYear','addr1','addr2','city','state','zip','email','comments','salary','userId']; fields.forEach(id=>{ const stored = localStorage.getItem('hw4_'+id); const el = $(id); if(!el || stored===null) return; if(el.type==='checkbox') el.checked = stored==='true'; else el.value = stored; }); const vac = localStorage.getItem('hw4_vaccinated'); if(vac){ const radio = document.querySelector('input[name="vaccinated"][value="'+vac+'"]'); if(radio) radio.checked = true; }
  const symptoms = localStorage.getItem('hw4_symptoms'); if(symptoms){ try{ const choices = JSON.parse(symptoms); document.querySelectorAll('input[name="symptom"]').forEach(cb=>{ cb.checked = choices.includes(cb.value); }); } catch(_){} }
}
function clearFormAndStorage(){ if($('patientForm')) $('patientForm').reset(); clearAppStorage(); deleteCookie('cookie_firstName'); deleteCookie('cookie_rememberMe'); }
async function loadFetchData(){ const status = $('fetchStatus'); if(status) status.textContent = 'Loading state options...'; const defaultStates = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']; const defaultSymptoms = ['Chicken Pox','Measles','Covid-19','Mumps','Other'];
  try{
    const response = await fetch('state-content.json');
    if(!response.ok) throw new Error('Fetch failed: '+response.status);
    const data = await response.json();
    populateStateOptions(data.states || defaultStates);
    populateSymptomOptions(data.symptoms || defaultSymptoms);
    if(status) status.textContent = 'Loaded state and symptom options from external file.';
  } catch(err){
    populateStateOptions(defaultStates);
    populateSymptomOptions(defaultSymptoms);
    if(status) status.textContent = 'Could not load external options file; using built-in defaults.';
    console.warn(err);
  }
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const welcome1 = $('welcome1');
  const welcome2 = $('welcome2');
  const firstName = getCookie('cookie_firstName');
  const rememberCookie = getCookie('cookie_rememberMe') === 'true';
  const rememberInput = $('remember-me');

  if(firstName){
    if(welcome1) welcome1.textContent = 'Welcome back, ' + firstName + '!';
    if(welcome2) welcome2.innerHTML = 'Not ' + firstName + '? <a href="#" id="new-user">Click here to start as a new user.</a>';
  } else {
    if(welcome1) welcome1.textContent = 'Hello New Patient';
    if(welcome2) welcome2.textContent = 'Please complete the form below.';
  }

  if(rememberInput){
    rememberInput.checked = rememberCookie || !firstName;
    rememberInput.addEventListener('change', (e)=>{
      if(!e.target.checked){ clearFormAndStorage(); }
      else { if($('firstName') && $('firstName').value.trim()){ setCookie('cookie_firstName',$('firstName').value.trim(),2); setCookie('cookie_rememberMe','true',2); } }
    });
  }

  if(firstName && !rememberCookie){ if(welcome2) welcome2.textContent += ' (Remember Me is currently disabled.)'; }

  await loadFetchData();

  if(firstName && rememberCookie){ loadLocalForm(); }

  if(firstName){
    const newUserLink = $('new-user');
    if(newUserLink){ newUserLink.addEventListener('click', (e)=>{ e.preventDefault(); clearFormAndStorage(); location.reload(); }); }
  }

  const salary = $('salary');
  const salaryDisplay = $('salaryDisplay');
  const submitBtn = $('submitBtn');
  const validateBtn = $('validateBtn');
  const form = $('patientForm');
  const persistFields = ['firstName','middleInitial','lastName','dobMonth','dobDay','dobYear','addr1','addr2','city','state','zip','email','comments','salary','userId'];

  persistFields.forEach(id=>{
    const el = $(id); if(!el) return;
    el.addEventListener('blur', ()=>{ saveLocalField(id); if(id==='firstName' && rememberInput && rememberInput.checked){ setCookie('cookie_firstName', el.value.trim(), 2); setCookie('cookie_rememberMe','true',2); } });
    if(el.tagName==='SELECT' || el.type==='checkbox' || el.type==='radio'){
      el.addEventListener('change', ()=> saveLocalField(id));
    }
  });

  document.querySelectorAll('input[name="vaccinated"]').forEach(rb=> rb.addEventListener('change', ()=>{ saveRadio('vaccinated'); validateVaccinated(); }));

  if($('state')) $('state').addEventListener('change', ()=> saveLocalField('state'));
  if(salary){ salary.addEventListener('input', ()=>{ updateSalary(); validateSalary(); saveLocalField('salary'); }); updateSalary(); }

  validateBtn.addEventListener('click', (e)=>{ e.preventDefault(); runAllValidations(); });
  if(form) form.addEventListener('submit', (e)=>{ e.preventDefault(); if(runAllValidations()){ window.location='hw4-thanks.html'; } });

  ['firstName','middleInitial','lastName','dobMonth','dobDay','dobYear','addr1','addr2','city','state','zip','email','comments','userId','password','confirmPassword'].forEach(id=>{
    const el = $(id); if(!el) return; el.addEventListener('blur', ()=> validateField(id)); el.addEventListener('input', ()=> validateField(id));
  });
});

  function validateSymptoms(){ const checked = document.querySelectorAll('input[name="symptom"]:checked').length; if(checked===0){ setError('symptoms','At least one should be checked'); return false; } setError('symptoms',''); return true; }
  function validateHousing(){ const sel = document.querySelector('input[name="housing"]:checked'); if(!sel){ setError('housing','Please choose housing'); return false; } setError('housing',''); return true; }
  function validateVaccinated(){ const sel = document.querySelector('input[name="vaccinated"]:checked'); if(!sel){ setError('vaccinated','Vaccination required'); return false; } setError('vaccinated',''); return true; }
  function validateSalary(){ const val = Number(salary.value); if(isNaN(val)){ setError('salary','Salary must be a number'); return false; } if(val<20000||val>200000){ setError('salary','Salary out of range'); return false; } setError('salary',''); return true; }

  function validateUserId(){ let v = $('userId').value.trim(); $('userId').value = v; if(!v){ setError('userId','User ID required'); return false; } if(v.length<5||v.length>20){ setError('userId','Must be 5-20 characters'); return false; } if(/^[0-9]/.test(v)){ setError('userId','Cannot start with a number'); return false; } if(!/^[A-Za-z0-9_-]+$/.test(v)){ setError('userId','Only letters, numbers, -, _ allowed'); return false; } setError('userId',''); return true; }

  function validatePasswords(){ const p = $('password').value; const c = $('confirmPassword').value; if(!p){ setError('password','Password required'); return false; } if(p.length<8){ setError('password','At least 8 characters'); return false; } if(!/[A-Z]/.test(p)||!/[a-z]/.test(p)||!/[0-9]/.test(p)){ setError('password','Requires upper, lower and digit'); return false; } if(p===$('userId').value){ setError('password','Password cannot equal user ID'); return false; } setError('password',''); if(p!==c){ setError('confirmPassword','Passwords do not match'); return false; } setError('confirmPassword',''); return true; }

  function runAllValidations(){
    const results = [
      validateName('firstName',true), validateMiddle(), validateName('lastName',true), validateDOB(), validateSSN(),
      validateAddr1(), validateAddr2(), validateCity(), validateState(), validateZip(), validateEmail(),
      validateComments(), validateSymptoms(), validateHousing(), validateVaccinated(), validateSalary(),
      validateUserId(), validatePasswords()
    ];
    const ok = results.every(Boolean);
    submitBtn.disabled = !ok; return ok;
  }

});
