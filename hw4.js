hw4.js
//local storage - 
function saveField(id) {
  var el = document.getElementById(id);
  if (el == null) return;
  localStorage.setItem(id,el.value);
}
function loadSavedForm() {
  var fields = ["firstName", "middleInitial", "lastName", "dobMonth", "dobDay", "dobYear", "addr1", "addr2", "city", "zip", "email", "comments" "userId"];
  for(var i = 0; i < fields.length; i++) {
    var saved = localStorage.getItem(fields[i]);
    var el = document.getElementById(fields[i]);
    if(saved!= null && !=null) {
      el.value = saved;
    }
}

function setCookie(name, value, days)
{
  var d = new Data();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}
  function getCookie(name) {
    var cookies = document.cookie.split(";";
    for (var i = 0; i < cookies.length; i++) {
      var c = cookies[i].trim();
      if(c.startsWith(name + "=")) {
        return c.substring(name.length + 1);
      }
  }
    return "";
  }
function deleteCookie(name) {
  document.cookie = name + "expires=Thu, 01 Jan 2027 00:00:00 UTC;path=/"; 
}
  //errors when a mssg field 
  function showError(fieldId, msg)
  {
    var errDiv = document.getElementById("err-" + fieldId);
    if (errDiv) {
      errDiv.textContent = msg;
    }
  }

  function clearError(fieldId) {
    var errDiv = Document.getElementById("err-" + fieldId);
    if (errDiv) {
      errDiv.textContent = "";
    }
  }

//state dropdown
var savedState = localStorage.getItem("state");
  if(savedState) {
    document.getElementById("state").value = savedState;
  }

  //radio vaccine buttons

  var savedVac = localStorage.getItem("vaccinated");
  if (savedVax) {
    var radios = document.querySelectorAll("input[name='vaccinated']");
    for(var i = 0; i < radios.length; i++)
    {
      if radio[i].value == savedVax) {
        radios[i].checked = true;
      }
    }
  }
  //symptoms 

  var savedSymptoms = localStorage.getItem("symptoms");
  if (savedSymptoms) {
    var symptomsList = savedSymptoms.split (",");
    var checkboxes = document.querySelectorAll("input[name= 'symptom']");
    for( var i = 0; i < checkboxes.length; i++)
    {
      if (symptomList.includes(checkboxes[i].value)) {
        checkboxes[i].checked = true;
      }
    }
  }
}
//clear storage

function clearStorage() 
{
  localStorage.clear();
  deleteCookie("firstName");
  deleteCookie("rememberMe");
}

async function loadStatesFromFile() {
    var defaultStates = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI",
                         "ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN",
                         "MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH",
                         "OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VT","VA",
                         "WA","WV","WI","WY"];
 
    try {
        var response = await fetch("state-content.json");
        if (!response.ok) {
            throw new Error("could not load file");
        }
        var data = await response.json();
        fillStateDropdown(data.states);
    } catch (err) {
        console.log("fetch didnt work, using default states");
        fillStateDropdown(defaultStates);
    }
}
 
function fillStateDropdown(stateList) {
    var dropdown = document.getElementById("state");
    dropdown.innerHTML = '<option value="">-- Select state --</option>';
    for (var i = 0; i < stateList.length; i++) {
        var opt = document.createElement("option");
        opt.value = stateList[i];
        opt.textContent = stateList[i];
        dropdown.appendChild(opt);
    }
    // restore saved value if there is one
    var saved = localStorage.getItem("state");
    if (saved) {
        dropdown.value = saved;
    }
}
 

//validate first name
function validatefirstName() {
  fname = document.getElementById("firstName").value.trim();
  var namePattern =/^[a-zA-Z'-]+$/;
  if (firstName == "") 
  {
    document.getElementById("firstName-error").innerHTML = "First name field can't be blank"
        return false;
    } else if (firstName != "") {
        if (!firstName.match(namePattern)) {
        document.getElementById("firstName-error").innerHTML = "Letters, apostrophes, and dashes only.";
        return false;
    } else if (firstName.length < 2) {
        document.getElementById("firstName-error").innerHTML = "First name cannot be less than 2 characters.";
        return false;
    } else if (firstName.length > 30) {
        document.getElementById("firstName-error").innerHTML = "First name cannot be more than 30 characters.";
        return false;
    } else {
        document.getElementById("firstName-error").innerHTML = "";
        return true;
    }
}
}



//last name

function validatelastName() {
    lname = document.getElementById("lastName").value.trim();
    var namePattern = /^[a-zA-Z'-]+$/;
    if (lastName == "") {
        document.getElementById("lastName-error").innerHTML = "Last name field cannot be empty"
        return false;
    } else if (lastName != "") {
        if (!lastName.match(namePattern)) {
        document.getElementById("lastName-error").innerHTML = "Letters, apostrophes, and dashes only.";
        return false;
    } else if (lastName.length < 2) {
        document.getElementById("lastName-error").innerHTML = "Last name cannot be less than 2 characters.";
        return false;
    } else if (lastName.length > 30) {
        document.getElementById("lastName-error").innerHTML = "Last name cannot be more than 30 characters.";
        return false;
    } else {
        document.getElementById("lastName-error").innerHTML = "";
        return true;
    }
    // middle
      function validatemiddleInitial() {
    mini = document.getElementById("middleInitial").value;
    var namePattern = /^[A-Z]+$/;

    middleInitial = middleInitial.toUpperCase();
    document.getElementById("middleInitial").value = middleInitial;

    if (!middleInitial.match(namePattern)) {
        document.getElementById("middleInitial-error").innerHTML = 
        "Middle initial must be a single uppercase letter";
        return false;
    } else {
        document.getElementById("middleInitial-error").innerHTML = "";
        return true;
    }
}
}
}

function validateDOB() {
    var mm = document.getElementById("dobMonth").value.trim();
    var dd = document.getElementById("dobDay").value.trim();
    var yyyy = document.getElementById("dobYear").value.trim();
 
    if (mm == "" || dd == "" || yyyy == "") {
        showError("dob", "Date of birth is required");
        return false;
    }
 
    var month = parseInt(mm);
    var day = parseInt(dd);
    var year = parseInt(yyyy);
 
    if (isNaN(month) || month < 1 || month > 12) {
        showError("dob", "Invalid month");
        return false;
    }
    if (isNaN(day) || day < 1 || day > 31) {
        showError("dob", "Invalid day");
        return false;
    }
    if (isNaN(year) || year < 1900 || year > 2025) {
        showError("dob", "Invalid year");
        return false;
    }
    clearError("dob");
    return true;
}
 
function validateSSN() {
    var val = document.getElementById("ssn").value.replace(/\D/g, "");
    if (val.length != 9) {
        showError("ssn", "SSN must be 9 digits");
        return false;
    }
    // format it
    document.getElementById("ssn").value = val.slice(0,3) + "-" + val.slice(3,5) + "-" + val.slice(5);
    clearError("ssn");
    return true;
}
 
function validateAddr1() {
    var val = document.getElementById("addr1").value.trim();
    if (val == "") {
        showError("addr1", "Address is required");
        return false;
    }
    clearError("addr1");
    return true;
}
 
function validateCity() {
    var val = document.getElementById("city").value.trim();
    if (val == "") {
        showError("city", "City is required");
        return false;
    }
    clearError("city");
    return true;
}
 
function validateState() {
    var val = document.getElementById("state").value;
    if (val == "") {
        showError("state", "Please select a state");
        return false;
    }
    clearError("state");
    return true;
}
 
function validateZip() {
    var val = document.getElementById("zip").value.trim();
    if (!/^\d{5}$/.test(val)) {
        showError("zip", "Zip must be 5 digits");
        return false;
    }
    clearError("zip");
    return true;
}
 
function validateEmail() {
    var val = document.getElementById("email").value.trim();
    if (val == "") {
        showError("email", "Email is required");
        return false;
    }
    if (!val.includes("@") || !val.includes(".")) {
        showError("email", "Enter a valid email");
        return false;
    }
    clearError("email");
    return true;
}
 
function validateSymptoms() {
    var checked = document.querySelectorAll("input[name='symptom']:checked");
    if (checked.length == 0) {
        showError("symptoms", "Please check at least one");
        return false;
    }
    clearError("symptoms");
    return true;
}
 
function validateVaccinated() {
    var selected = document.querySelector("input[name='vaccinated']:checked");
    if (!selected) {
        showError("vaccinated", "Please select one");
        return false;
    }
    clearError("vaccinated");
    return true;
}
 
function validateUserId() {
    var val = document.getElementById("userId").value.trim();
    if (val == "") {
        showError("userId", "User ID is required");
        return false;
    }
    if (val.length < 5 || val.length > 20) {
        showError("userId", "Must be 5-20 characters");
        return false;
    }
    if (/^\d/.test(val)) {
        showError("userId", "Cannot start with a number");
        return false;
    }
    if (!/^[A-Za-z0-9_-]+$/.test(val)) {
        showError("userId", "Only letters, numbers, _ and - allowed");
        return false;
    }
    clearError("userId");
    return true;
}
 
function validatePassword() {
    var pass = document.getElementById("password").value;
    var confirm = document.getElementById("confirmPassword").value;
    var userId = document.getElementById("userId").value;
 
    if (pass == "") {
        showError("password", "Password is required");
        return false;
    }
    if (pass.length < 8) {
        showError("password", "At least 8 characters required");
        return false;
    }
    if (!/[A-Z]/.test(pass) || !/[a-z]/.test(pass) || !/[0-9]/.test(pass)) {
        showError("password", "Need uppercase, lowercase, and a number");
        return false;
    }
    if (pass == userId) {
        showError("password", "Password cannot be the same as user ID");
        return false;
    }
    clearError("password");
 
    if (pass != confirm) {
        showError("confirmPassword", "Passwords don't match");
        return false;
    }
    clearError("confirmPassword");
    return true;
}
 
function validateComments() {
    var val = document.getElementById("comments").value;
    if (val.length > 500) {
        showError("comments", "Max 500 characters");
        return false;
    }
    clearError("comments");
    return true;
}
 
function runAllValidations() {
    var ok = true;
 
    if (!validateFirstName()) ok = false;
    if (!validateMiddleInitial()) ok = false;
    if (!validateLastName()) ok = false;
    if (!validateDOB()) ok = false;
    if (!validateSSN()) ok = false;
    if (!validateAddr1()) ok = false;
    if (!validateCity()) ok = false;
    if (!validateState()) ok = false;
    if (!validateZip()) ok = false;
    if (!validateEmail()) ok = false;
    if (!validateComments()) ok = false;
    if (!validateSymptoms()) ok = false;
    if (!validateVaccinated()) ok = false;
    if (!validateUserId()) ok = false;
    if (!validatePassword()) ok = false;
 
    if (ok) {
        document.getElementById("submitBtn").disabled = false;
    }
    return ok;
}
 
// runs when page loads
window.onload = async function() {
 
    // check if we have a returning user cookie
    var savedName = getCookie("firstName");
    var rememberMe = getCookie("rememberMe");
 
    if (savedName != "") {
        document.getElementById("welcome1").textContent = "Welcome back, " + savedName + "!";
        document.getElementById("welcome2").innerHTML = 'Not ' + savedName + '? <a href="#" id="newUserLink">Click here</a>';
 
        document.getElementById("newUserLink").addEventListener("click", function(e) {
            e.preventDefault();
            clearStorage();
            location.reload();
        });
    } else {
        document.getElementById("welcome1").textContent = "Hello New Patient";
        document.getElementById("welcome2").textContent = "Please fill out the form below.";
    }
 
    // load remember me checkbox
    var rememberCheckbox = document.getElementById("remember-me");
    if (rememberMe == "true") {
        rememberCheckbox.checked = true;
    }
 
    // load state dropdown from fetch
    await loadStatesFromFile();
 
    // load saved form data if remember me was on
    if (rememberMe == "true") {
        loadSavedForm();
    }
 
    // salary slider
    var slider = document.getElementById("salary");
    var display = document.getElementById("salaryDisplay");
    slider.addEventListener("input", function() {
        display.textContent = slider.value;
        localStorage.setItem("salary", slider.value);
    });
 
    // save fields when user leaves them
    var textFields = ["firstName", "middleInitial", "lastName", "dobMonth", "dobDay",
                      "dobYear", "addr1", "addr2", "city", "zip", "email", "comments", "userId"];
    for (var i = 0; i < textFields.length; i++) {
        (function(id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener("blur", function() {
                    saveField(id);
                });
            }
        })(textFields[i]);
    }
 
    // save state when changed
    document.getElementById("state").addEventListener("change", function() {
        localStorage.setItem("state", this.value);
    });
 
    // save vaccinated radio
    var vacRadios = document.querySelectorAll("input[name='vaccinated']");
    for (var i = 0; i < vacRadios.length; i++) {
        vacRadios[i].addEventListener("change", function() {
            localStorage.setItem("vaccinated", this.value);
        });
    }
 
    // save symptoms checkboxes
    var symptomBoxes = document.querySelectorAll("input[name='symptom']");
    for (var i = 0; i < symptomBoxes.length; i++) {
        symptomBoxes[i].addEventListener("change", function() {
            var checked = document.querySelectorAll("input[name='symptom']:checked");
            var values = [];
            for (var j = 0; j < checked.length; j++) {
                values.push(checked[j].value);
            }
            localStorage.setItem("symptoms", values.join(","));
        });
    }
 
    // save cookie when first name is filled in and remember me is checked
    document.getElementById("firstName").addEventListener("blur", function() {
        if (rememberCheckbox.checked && this.value.trim() != "") {
            setCookie("firstName", this.value.trim(), 2);
            setCookie("rememberMe", "true", 2);
        }
    });
 
    // validate button
    document.getElementById("validateBtn").addEventListener("click", function() {
        runAllValidations();
    });
 
    // submit
    document.getElementById("patientForm").addEventListener("submit", function(e) {
        e.preventDefault();
        if (runAllValidations()) {
            window.location = "hw4-thanks.html";
        }
    });
 
    // reset button
    document.getElementById("resetBtn").addEventListener("click", function() {
        clearStorage();
    });
}
 
















