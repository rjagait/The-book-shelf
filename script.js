var username;
var useremail;
var userbirthyear;
var currentYear;

/**
 * Master function which does the below actions
 * 1. Read the inputs
 * 2. Check if the inputs are valid
 * 3. Confirm with user if details are correct
 */
function UserInformation() {
    console.log("Validation completed, confirming details with user");
    initialize();

    valid = CheckIfValid();
    if (valid) {
        console.log("Validation completed, confirming details with user");
        AddUserDetails();
        DisplayMainMenu();
    }

}

/**
 * Initialises the input user details, and gets current year.
 */
function initialize() {
    console.log("Reading inputs...");
    username = document.getElementById('name');
    useremail = document.getElementById('email');
    userbirthyear = document.getElementById('birthyear');
    console.log("Inputs Read.", username.value, useremail.value, userbirthyear.value);

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
function AddUserDetails() {
    var userDetails = document.getElementById("UserDetails");
    userDetails.remove();

    var heading = document.getElementById("heading");
    heading.innerHTML = "Main Menu"

    //confirming age group and formatting user details
    ageGroup = (currentYear - userbirthyear.value) > 18 ? "Adult" : "Child";
    console.log("Age Group recognized as " + ageGroup);
    userDetailFormat = username.value + "(" + useremail.value + ") [" + ageGroup + "]";
    console.log("User Details: " + userDetailFormat);

    var userDetail = document.getElementById("userDetail");
    var displayUserDetails = document.createElement("P");
    displayUserDetails.innerHTML = userDetailFormat;

    userDetail.appendChild(displayUserDetails);
}

/**
 * Controls displaying the main menu
 */
function DisplayMainMenu() {
    var mainMenu = document.getElementById("mainmenu");
    mainMenu.style.display = "block";


}

/**
 * Toggle between the Books and CDs tab and display the corresponding content
 * @param {*} evt This would store the location
 * @param {*} cityName This store if teh button is CD or Book
 */
function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}