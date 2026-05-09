*
 Program Name: hw4.js
 Name: Sahar Shiekh
 Date Created: 2026-05-04
 Date Modified: 2026-05-04
 Version: 1.0
 Description: MIS 3371 Homework 4 Patient Form JS
*/
 
// displays today date
const d = new Date();
document.getElementById("today") && (document.getElementById("today").innerHTML = d.toLocaleDateString());
 
// slider 
let slider = document.getElementById("salary");
let output = document.getElementById("salaryDisplay");
if (slider && output) {
    output.innerHTML = slider.value;
    slider.oninput = function() { output.innerHTML = this.value; };
}
 
// first name validating
function validateFirstName() {
    fname = document.getElementById("firstName").value.trim();
    var namePattern = /^[a-zA-Z'-]+$/;
 
    if (fname == "") {
        document.getElementById("err-firstName").innerHTML = "First name cannot be empty";
        return false;
    } else if (fname != "") {
        if (!fname.match(namePattern)) {
            document.getElementById("err-firstName").innerHTML = "Letters, apostrophes, and hyphens only.";
            return false;
        } else if (fname.length > 30) {
            document.getElementById("err-firstName").innerHTML = "First name cannot be more than 30 characters.";
            return false;
        } else {
            document.getElementById("err-firstName").innerHTML = "";
            return true;
        }
    }
}
 
// the last name validation
function validateLastName() {
    lname = document.getElementById("lastName").value.trim();
    var namePattern = /^[a-zA-Z'-]+$/;
 
    if (lname == "") {
        document.getElementById("err-lastName").innerHTML = "Last name cannot be empty";
        return false;
    } else if (lname != "") {
        if (!lname.match(namePattern)) {
            document.getElementById("err-lastName").innerHTML = "Letters, apostrophes, and hyphens only.";
            return false;
        } else if (lname.length > 30) {
            document.getElementById("err-lastName").innerHTML = "Last name cannot be more than 30 characters.";
            return false;
        } else {
            document.getElementById("err-lastName").innerHTML = "";
            return true;
        }
    }
}
 
//  the middle initial validation
function validateMiddleInitial() {
    mini = document.getElementById("middleInitial").value;
    var namePattern = /^[A-Za-z]$/;
 
    if (mini == "") {
        document.getElementById("err-middleInitial").innerHTML = "";
        return true; // optional field
    }
    if (!mini.match(namePattern)) {
        document.getElementById("err-middleInitial").innerHTML = "Middle initial must be a single letter";
        return false;
    } else {
        document.getElementById("err-middleInitial").innerHTML = "";
        return true;
    }
}
 
// DOBS validation
function validateDOB() {
    var mm = document.getElementById("dobMonth").value.trim();
    var dd = document.getElementById("dobDay").value.trim();
    var yyyy = document.getElementById("dobYear").value.trim();
 
    if (mm == "" || dd == "" || yyyy == "") {
        document.getElementById("err-dob").innerHTML = "Date of birth is required";
        return false;
    }
 
    var month = parseInt(mm);
    var day = parseInt(dd);
    var year = parseInt(yyyy);
 
    if (isNaN(month) || month < 1 || month > 12) {
        document.getElementById("err-dob").innerHTML = "Invalid month";
        return false;
    }
    if (isNaN(day) || day < 1 || day > 31) {
        document.getElementById("err-dob").innerHTML = "Invalid day";
        return false;
    }
    if (isNaN(year) || year < 1900 || year > 2026) {
        document.getElementById("err-dob").innerHTML = "Invalid year";
        return false;
    }
    document.getElementById("err-dob").innerHTML = "";
    return true;
}
 
// social security  validation
function validateSSN() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;
 
    if (!ssnR.test(ssn)) {
        document.getElementById("err-ssn").innerHTML = "Please enter a valid SSN";
        return false;
    } else {
        document.getElementById("err-ssn").innerHTML = "";
        return true;
    }
}
 
// addy validation
function validateAddr1() {
    var ad1 = document.getElementById("addr1").value;
    console.log(ad1);
    console.log(ad1.length);
 
    if (ad1.length < 2) {
        document.getElementById("err-addr1").innerHTML = "Please enter something on address line";
        return false;
    } else {
        document.getElementById("err-addr1").innerHTML = "";
        return true;
    }
}
 
// which city validation
function validateCity() {
    const city = document.getElementById("city");
    if (!city) return true;
    const val = city.value.trim();
    if (val.length < 2) {
        document.getElementById("err-city").innerHTML = "Please enter a valid city";
        return false;
    }
    document.getElementById("err-city").innerHTML = "";
    return true;
}
 
// the state validation
function validateState() {
    var val = document.getElementById("state").value;
    if (val == "") {
        document.getElementById("err-state").innerHTML = "Please select a state";
        return false;
    }
    document.getElementById("err-state").innerHTML = "";
    return true;
}
 
// zip code validation if it works 
function validateZip() {
    const zipInput = document.getElementById("zip");
    if (!zipInput) return false;
    let zip = zipInput.value.replace(/[^\d]/g, "");
 
    if (!zip) {
        document.getElementById("err-zip").innerHTML = "Zip code can't be blank";
        return false;
    }
    zip = zip.slice(0, 5);
    zipInput.value = zip;
 
    if (zip.length != 5) {
        document.getElementById("err-zip").innerHTML = "Zip must be 5 digits";
        return false;
    }
    document.getElementById("err-zip").innerHTML = "";
    return true;
}
 
// email validation
function validateEmail() {
    email = document.getElementById("email").value;
    var emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
    if (email == "") {
        document.getElementById("err-email").innerHTML = "Email cannot be empty";
        return false;
    } else if (!email.match(emailR)) {
        document.getElementById("err-email").innerHTML = "Please enter a valid email address";
        return false;
    } else {
        document.getElementById("err-email").innerHTML = "";
        return true;
    }
}
 
// comments validation
function validateComments() {
    var val = document.getElementById("comments").value;
    if (val.length > 500) {
        document.getElementById("err-comments").innerHTML = "Max 500 characters";
        return false;
    }
    document.getElementById("err-comments").innerHTML = "";
    return true;
}
 
// symptoms checkboxes
function validateSymptoms() {
    var checked = document.querySelectorAll("input[name='symptom']:checked");
    if (checked.length == 0) {
        document.getElementById("err-symptoms").innerHTML = "Please check at least one";
        return false;
    }
    document.getElementById("err-symptoms").innerHTML = "";
    return true;
}
 
// vaccinated radio
function validateVaccinated() {
    var selected = document.querySelector("input[name='vaccinated']:checked");
    if (!selected) {
        document.getElementById("err-vaccinated").innerHTML = "Please select one";
        return false;
    }
    document.getElementById("err-vaccinated").innerHTML = "";
    return true;
}
 
// user id validation
function validateUserId() {
    uid = document.getElementById("userId").value;
    document.getElementById("userId").value = uid;
 
    if (uid.length == 0) {
        document.getElementById("err-userId").innerHTML = "User ID can't be blank";
        return false;
    }
    if (!isNaN(uid.charAt(0))) {
        document.getElementById("err-userId").innerHTML = "User ID can't start with a number";
        return false;
    }
    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(uid)) {
        document.getElementById("err-userId").innerHTML = "Only letters, numbers, underscores, and dashes";
        return false;
    } else if (uid.length < 5) {
        document.getElementById("err-userId").innerHTML = "User ID must be at least 5 characters";
        return false;
    } else if (uid.length > 20) {
        document.getElementById("err-userId").innerHTML = "User ID can't exceed 20 characters";
        return false;
    } else {
        document.getElementById("err-userId").innerHTML = "";
        return true;
    }
}
 
// password validation
function validatePassword() {
    const pword = document.getElementById("password").value;
    const uname = document.getElementById("userId").value || "";
 
    const errorMessages = [];
 
    if (!/[a-z]/.test(pword)) {
        errorMessages.push("Enter at least one lowercase letter");
    }
    if (!/[A-Z]/.test(pword)) {
        errorMessages.push("Enter at least one uppercase letter");
    }
    if (!/[0-9]/.test(pword)) {
        errorMessages.push("Enter at least one number");
    }
    if (pword.length < 8) {
        errorMessages.push("Password must be at least 8 characters");
    }
    if (uname && pword.toLowerCase().includes(uname.toLowerCase())) {
        errorMessages.push("Password can't contain your user ID");
    }
 
    if (errorMessages.length === 0) {
        document.getElementById("err-password").innerHTML = "";
        return true;
    } else {
        document.getElementById("err-password").innerHTML = errorMessages.join("<br>");
        return false;
    }
}
 
// confirm password
function validateConfirmPassword() {
    pword1 = document.getElementById("password").value;
    pword2 = document.getElementById("confirmPassword").value;
 
    if (pword1 !== pword2) {
        document.getElementById("err-confirmPassword").innerHTML = "Passwords don't match";
        return false;
    } else {
        document.getElementById("err-confirmPassword").innerHTML = "Passwords match";
        return true;
    }
}
 
// validate everything when validate button is clicked
function validateEverything() {
    let valid = true;
 
    if (!validateFirstName()) valid = false;
    if (!validateMiddleInitial()) valid = false;
    if (!validateLastName()) valid = false;
    if (!validateDOB()) valid = false;
    if (!validateSSN()) valid = false;
    if (!validateAddr1()) valid = false;
    if (!validateCity()) valid = false;
    if (!validateState()) valid = false;
    if (!validateZip()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validateComments()) valid = false;
    if (!validateSymptoms()) valid = false;
    if (!validateVaccinated()) valid = false;
    if (!validateUserId()) valid = false;
    if (!validatePassword()) valid = false;
    if (!validateConfirmPassword()) valid = false;
 
    if (valid) {
        document.getElementById("submitBtn").disabled = false;
    }
}
 
// cookie functions
function setCookie(name, cvalue, expiryDays) {
    var day = new Date();
    day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}
 
function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');
 
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}
 
function deleteAllCookies() {
    document.cookie.split(";").forEach(function(cookie) {
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
}
 
// fields to save in cookies
var inputs = [
    { id: "firstName", cookieName: "firstName" },
    { id: "middleInitial", cookieName: "middleInitial" },
    { id: "lastName", cookieName: "lastName" },
    { id: "dobMonth", cookieName: "dobMonth" },
    { id: "dobDay", cookieName: "dobDay" },
    { id: "dobYear", cookieName: "dobYear" },
    { id: "addr1", cookieName: "addr1" },
    { id: "addr2", cookieName: "addr2" },
    { id: "city", cookieName: "city" },
    { id: "zip", cookieName: "zip" },
    { id: "email", cookieName: "email" },
    { id: "userId", cookieName: "userId" },
];
 
inputs.forEach(function(input) {
    var inputElement = document.getElementById(input.id);
    if (!inputElement) return;
 
    // prefill from cookie
    var cookieValue = getCookie(input.cookieName);
    if (cookieValue !== "") {
        inputElement.value = cookieValue;
    }
 
    // save cookie when typing
    inputElement.addEventListener("input", function() {
        setCookie(input.cookieName, inputElement.value, 30);
    });
});
 
// welcome message for returning users
var w1 = document.getElementById('welcome1');
var w2 = document.getElementById('welcome2');
 
var firstName = getCookie("firstName");
if (firstName && firstName.trim() !== "") {
    if (w1) w1.innerHTML = "Welcome back, " + firstName + "!";
    if (w2) w2.innerHTML = "<a href='#' id='new-user'>Not " + firstName + "? Click here to start a new form.</a>";
 
    var newUser = document.getElementById('new-user');
    if (newUser) {
        newUser.addEventListener('click', function() {
            deleteAllCookies();
            localStorage.clear();
            location.reload();
        });
    }
} else {
    if (w1) w1.innerHTML = "Welcome to The Family Clinic!";
    if (w2) w2.innerHTML = "Please fill out the form to register.";
}
 
// remember me checkbox
document.getElementById("remember-me").addEventListener("change", function() {
    const rememberMe = this.checked;
 
    if (!rememberMe) {
        deleteAllCookies();
        localStorage.clear();
        console.log("Cookies and storage cleared because Remember Me is unchecked.");
    } else {
        inputs.forEach(function(input) {
            const inputElement = document.getElementById(input.id);
            if (inputElement && inputElement.value.trim() !== "") {
                setCookie(input.cookieName, inputElement.value, 30);
            }
        });
        console.log("Cookies saved because Remember Me is checked.");
    }
});
 
// local storage - save fields on blur
var textFields = ["firstName", "middleInitial", "lastName", "dobMonth", "dobDay",
                  "dobYear", "addr1", "addr2", "city", "zip", "email", "comments", "userId"];
 
textFields.forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("blur", function() {
        localStorage.setItem(id, el.value);
    });
});
 
// local storage - save state
var stateEl = document.getElementById("state");
if (stateEl) {
    stateEl.addEventListener("change", function() {
        localStorage.setItem("state", this.value);
    });
}
 
// local storage - save vaccinated radio
var vacRadios = document.querySelectorAll("input[name='vaccinated']");
vacRadios.forEach(function(radio) {
    radio.addEventListener("change", function() {
        localStorage.setItem("vaccinated", this.value);
    });
});
 
// local storage - save symptom checkboxes
var symptomBoxes = document.querySelectorAll("input[name='symptom']");
symptomBoxes.forEach(function(cb) {
    cb.addEventListener("change", function() {
        var checked = document.querySelectorAll("input[name='symptom']:checked");
        var values = [];
        checked.forEach(function(c) { values.push(c.value); });
        localStorage.setItem("symptoms", values.join(","));
    });
});
 
// load local storage back into form
function loadSavedForm() {
    textFields.forEach(function(id) {
        var saved = localStorage.getItem(id);
        var el = document.getElementById(id);
        if (saved != null && el != null) {
            el.value = saved;
        }
    });
 
    var savedState = localStorage.getItem("state");
    if (savedState && stateEl) {
        stateEl.value = savedState;
    }
 
    var savedVax = localStorage.getItem("vaccinated");
    if (savedVax) {
        var radios = document.querySelectorAll("input[name='vaccinated']");
        radios.forEach(function(r) {
            if (r.value == savedVax) r.checked = true;
        });
    }
 
    var savedSymptoms = localStorage.getItem("symptoms");
    if (savedSymptoms) {
        var symptomList = savedSymptoms.split(",");
        document.querySelectorAll("input[name='symptom']").forEach(function(cb) {
            if (symptomList.includes(cb.value)) cb.checked = true;
        });
    }
}
 
// only load saved form if remember me is checked
document.addEventListener("DOMContentLoaded", function() {
    var rememberMe = document.getElementById("remember-me").checked;
    if (rememberMe) {
        loadSavedForm();
    }
});
 
// fetch api - load state options from json file
function loadStatesFromFile() {
    fetch("state-content.json")
        .then(function(res) {
            if (!res.ok) {
                throw new Error("could not load file");
            }
            return res.json();
        })
        .then(function(data) {
            fillStateDropdown(data.states);
        })
        .catch(function(err) {
            console.log("fetch didn't work, using default states");
        });
}
 
function fillStateDropdown(stateList) {
    var dropdown = document.getElementById("state");
    if (!dropdown) return;
    dropdown.innerHTML = '<option value="">-- Select state --</option>';
    for (var i = 0; i < stateList.length; i++) {
        var opt = document.createElement("option");
        opt.value = stateList[i];
        opt.textContent = stateList[i];
        dropdown.appendChild(opt);
    }
    var saved = localStorage.getItem("state");
    if (saved) dropdown.value = saved;
}
 
loadStatesFromFile();
 
// validate and submit buttons
var validateBtn = document.getElementById("validateBtn");
if (validateBtn) {
    validateBtn.addEventListener("click", function() {
        validateEverything();
    });
}
 
var patientForm = document.getElementById("patientForm");
if (patientForm) {
    patientForm.addEventListener("submit", function(e) {
        e.preventDefault();
        validateEverything();
    });
}
 
// reset button clears storage too
var resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
    resetBtn.addEventListener("click", function() {
        localStorage.clear();
        deleteAllCookies();
    });
}
 
console.log('Homework 4 JS loaded');
