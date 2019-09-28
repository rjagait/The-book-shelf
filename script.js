var username;
var useremail;
var userbirthyear;
var currentYear;

/**
 * Master function which does the below actions
 * 1. Read the inputs
 * 2. Check if the inputs are valid
 * 3. COnfirm with user if details are correct
 */
function UserInformation() {
    initialize();

    valid = CheckIfValid();
    if (valid) {
        console.log("Validation completed, confirming details with user");
        ConfirmDetailsAndAct();
    }
}

/**
 * Initialises the input user details, and gets current year.
 */
function initialize() {
    console.log("Reading inputs...");
    username = document.getElementById('name');
    useremail = document.getElementById('email');
    userbirthyear = document.getElementById('birth-year');
    console.log("Inputs Read.");

    currentYear = new Date().getFullYear();
    console.log("Current working year is " + currentYear);
}

/**
 * checks if the inputs are valid
 * 1. name check exists in html file to limit the characters to 100
 * 2. email, default javascipt checkValidity on email type input.
 * 3. Year, min value defined in html, max value used as current year.
 * 
 * If the values are incorrect it pops up an alert, if not, returns true.
 */
function CheckIfValid() {
    console.log("Checking if email and year are valid");
    isValidEmail = useremail.checkValidity();
    isValidYear = userbirthyear.checkValidity();

    if (!isValidEmail) {
        console.log("Invalid Email");
        alert("Incorrect Email!\n\
            Please check your email before retrying.");
        return false;
    } else if (!isValidYear || userbirthyear.value > currentYear) {
        console.log("Invalid Year");
        alert("Invalid birth year!\n\
            Please check your birth-year before retrying.");
        return false;
    };
    return true;
}

/**
 * Prints the user details in the format below, to confirm if correct.
 * Format: Jane Doe (jdoe@ example.com) [ Group]
 * where Group is “Adult” if the age is above 18 and “Child’ if not.
 */
function ConfirmDetailsAndAct() {
    var userDetails = document.getElementById("UserDetails");
    userDetails.remove();

    //confirming age group and formatting user details
    ageGroup = (currentYear - userbirthyear.value) > 18 ? "Adult" : "Child";
    console.log("Age Group recognized as " + ageGroup);
    userDetailFormat = username.value + "(" + useremail.value + ") [" + ageGroup + "]";
    console.log("User Details: " + userDetailFormat);
    confirmationMsg = "Please check the details above and click OK to proceed.";

    //adding elements on webpage to display details and confirm
    var displayUserDetails = document.createElement("P");
    displayUserDetails.innerHTML = userDetailFormat;

    var displayConfirmationMsg = document.createElement("P");
    displayConfirmationMsg.innerHTML = confirmationMsg.italics();

    var confirmationButton = document.createElement("BUTTON");
    confirmationButton.innerHTML = "OK";

    displayUserDetails.appendChild(displayConfirmationMsg);
    displayUserDetails.appendChild(confirmationButton);
    document.body.appendChild(displayUserDetails);

    OnConfirming(confirmationButton);
}

/**
 * When the user confirms the details, 
 * this function redirects to next page
 * @param {element of type button} confirmationButton to monitor click on button and act
 */
function OnConfirming(confirmationButton) {
    confirmationButton.addEventListener("click", function () {
        console.log("Confirmed by user, redirecting to next page");
        alert("Did something");

    });
}