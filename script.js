var username;
var useremail;
var userbirthyear;
var currentYear;
var books;
var CDs;
var checkoutbooks = [];
var checkoutCDs = [];

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

    books = [
        "A Tale of Two Cities",
        "The Lord of the Rings",
        "The Little Prince",
        "Harry Potter and the Philosopher's Stone",
        "The Hobbit",
        "Alice's Adventures in Wonderland",
        "Dream of the Red Chamber",
        "And Then There Were None",
        "The Lion, the Witch and the Wardrobe",
        "She, A History of Adventure",
    ];
    CDs = [
        "Going Seventeen",
        "The Brown Band",
        "The Ultimate Collection",
        "Clapton Chronicles, The Best of Eric Clapton",
        "50 Number Ones",
        "19 - by Adele",
        "Now That’s What I Call Music! 92",
        "April, and a Flower",
        "Mama - by EXO",
        "21 - by Adele",
    ];
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

    //Adding cart button
    var cartButton = document.createElement("button");
    cartButton.innerHTML = '<img src="images/cart_icon.svg" alt="looking" width=20>0';
    cartButton.id = "checkoutButton";
    cartButton.onclick = function() {
        document.getElementById("checkoutPage").style.display = 'block';
    }
    displayUserDetails.appendChild(cartButton);

    userDetail.appendChild(displayUserDetails);

}

/**
 * Controls displaying the main menu
 * list of available items along with cart status
 */
function DisplayMainMenu() {
    //unhide main menu
    var displayList = document.getElementById("displayList");
    displayList.style.display = "block";

    //Add books to available item list
    for (i = 0; i < books.length; i++) {
        createContentElement(books[i], "DisplayedBooks");
    }

    //Add CDs to available item list
    for (i = 0; i < CDs.length; i++) {
        createContentElement(CDs[i], "DisplayedCDs");
    }

    //Add checkout cart details, will keep it hidden till the cart button is clicked
    CheckoutCartDetails();
}

/**
 * Toggle between the Books and CDs tab and display the corresponding content
 * @param {*} evt This would store the location
 * @param {*} tabName This store if teh button is CD or Book
 */
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/**
 * Creates and adds the card to the respective block in main menu
 * @param {*} itemName Name of the book to be added to the list
 * @param {*} blockName for CD -> DisplayedCDs, for Books -> DisplayedBooks
 */
function createContentElement(itemName, blockName) {
    var elementTitle = document.createElement("p");
    elementTitle.classList.add("title");
    elementTitle.innerHTML = itemName;

    //add and remove buttons for all cards
    var elementButton = document.createElement("button");
    elementButton.classList.add("button");
    elementButton.innerHTML = "Add";
    elementButton.onclick = function() {
        AddToCheckout(itemName, blockName);
    }

    var elementContainer = document.createElement("div");
    elementContainer.classList.add("container");
    elementContainer.appendChild(elementTitle);
    elementContainer.appendChild(elementButton);

    //add images
    var elementImage = document.createElement("img");
    elementImage.src = "images/" + itemName + ".jpg";
    elementImage.alt = itemName;
    elementImage.style = "width: 80%";

    var elementCard = document.createElement("div");
    elementCard.classList.add("card");
    elementCard.appendChild(elementImage);
    elementCard.appendChild(elementContainer);

    var elementColumn = document.createElement("div");
    elementColumn.classList.add("column");
    elementColumn.id = itemName;
    elementColumn.appendChild(elementCard);

    document.getElementById(blockName).appendChild(elementColumn);
}

/**
 * Conttrols the checkout page actions
 * Also, removes the added item from available item list
 */
function AddToCheckout(itemName, blockName) {
    console.log("This function will remove the button and add it to checkout" + itemName + blockName);

    //remove element from available item list
    var elementToRemove = document.getElementById(itemName);
    elementToRemove.remove();

    if (blockName == "DisplayedBooks") {
        checkoutbooks.push(itemName);
    } else {
        checkoutCDs.push(itemName);
    }

    //update on add to cart selection
    UpdateCheckoutIcon();
    UpdateCheckoutList(itemName, blockName);

    console.log("Checkout Items: " + checkoutCDs.length + checkoutbooks.length);
}

/**
 * Acts upon the change in number of checkout items, as per the count of the 2 variables, checkoutCDs and checkoutbooks
 */
function UpdateCheckoutIcon() {
    var totalCheckoutItems = checkoutCDs.length + checkoutbooks.length;

    //update the checkout notification count
    var cartButton = document.getElementById("checkoutButton");
    cartButton.innerHTML = '<img src="images/cart_icon.svg" alt="looking" width=20>' + totalCheckoutItems;

    //update the count in checout cart
    var cartHeading = document.getElementById("checkoutCartHeading");
    cartHeading.innerHTML = 'Cart <span class="price" style="color:black"><img src="images/cart_icon.svg" alt="looking" width=20><b>' + totalCheckoutItems + '</b></span>';

    //Enable the 'checkout' button on checkout cart only if count is non-zero.
    if (totalCheckoutItems > 0) {
        document.getElementById("checkoutCartButton").disabled = false;
    } else {
        document.getElementById("checkoutCartButton").disabled = true;
    }
}

/**
 * Updated the list shown in checkout cart as for any newly 'add to cart' item
 * @param {*} itemName corresponds to the name of the book/CD
 * @param {*} blockName 
 */
function UpdateCheckoutList(itemName, blockName) {
    var checkoutDisplayElement = document.createElement("li");
    var checkoutItemName = document.createTextNode(itemName);
    checkoutDisplayElement.appendChild(checkoutItemName);
    var closeButton = document.createElement("button");
    closeButton.innerHTML = "Remove";
    closeButton.onclick = function() {
        /**
         * Actions:
         * 1. remove item from checkout list on checkout page and the checkout variables
         * 2. Since the count of checkout items changed, update the corresponding places
         */
        this.parentElement.style.display = 'none';
        createContentElement(itemName, blockName);
        RemoveItemFromCheckoutListArray(itemName, blockName);
        UpdateCheckoutIcon();
    }
    closeButton.classList.add("close");
    checkoutDisplayElement.appendChild(closeButton);

    document.getElementById("checkoutDisplay").appendChild(checkoutDisplayElement);
}

/**
 * Removes the list of item from the checkout list.
 * @param {*} itemName Expects name of the item
 * @param {*} blockName 
 */
function RemoveItemFromCheckoutListArray(itemName, blockName) {
    console.log("Remove from checkout list: " + itemName + " with block as " + blockName);

    if (blockName == "DisplayedBooks") {
        var index = checkoutbooks.indexOf(itemName);
        if (index > -1) {
            checkoutbooks.splice(index, 1);
        }
    } else if (blockName == "DisplayedCDs") {
        var index = checkoutCDs.indexOf(itemName);
        if (index > -1) {
            checkoutCDs.splice(index, 1);
        }
    }
}

/**
 * Creating blocks in the checkout page (hidden by default). This is the initial picture of what the page would look like.
 * for all the 'add to cart' items, they will be updated when they are selected.
 */
function CheckoutCartDetails() {

    var checkoutPage = document.getElementById("checkoutPage");

    var checkoutWindowCloseButton = document.createElement("button");
    checkoutWindowCloseButton.innerHTML = "Close";
    checkoutWindowCloseButton.onclick = function() {
        checkoutPage.style.display = "none";
    }
    checkoutPage.appendChild(checkoutWindowCloseButton);

    //Heading cotains the count of the number of items, which is changed realtime.
    var cartHeading = document.createElement("h4");
    cartHeading.id = "checkoutCartHeading";
    cartHeading.innerHTML = 'Cart <span class="price" style="color:black"><img src="images/cart_icon.svg" alt="looking" width=20><b>0</b></span>';
    checkoutPage.appendChild(cartHeading);

    //an unordered list item created which will be updated when required.
    var checkoutDisplay = document.createElement("ul");
    checkoutDisplay.id = "checkoutDisplay";
    checkoutPage.appendChild(checkoutDisplay);

    var checkoutButton = document.createElement("button");
    checkoutButton.innerHTML = "Checkout";
    checkoutButton.id = "checkoutCartButton";
    checkoutButton.disabled = true;
    checkoutButton.onclick = function() {
        DisplayDialog();
    }
    checkoutPage.appendChild(checkoutButton);
}

/**
 * Creating blocks in the confirmation page (hidden by default). 
 * This is called to confirm on the checkout of the items, and will display the count and the item names.
 */
function DisplayDialog() {

    var checkoutPage = document.getElementById("checkoutPage");
    checkoutPage.style.display = 'none';

    var confirmationScreen = document.getElementById("confirmation");
    confirmationScreen.style.display = "block";

    //create content block to make stying the block easier
    var confirmationDialogBox = document.createElement("div");
    confirmationDialogBox.classList.add("confirmation-content");
    confirmationDialogBox.id = "confirmationDialogBox";
    confirmationScreen.appendChild(confirmationDialogBox);

    //get confirmation header
    var confirmationHeader = GetConfirmationHeader();

    //get confirmation body
    var confirmationBody = GetConfirmationBody();

    confirmationDialogBox.appendChild(confirmationHeader);
    confirmationDialogBox.appendChild(confirmationBody);
}

/**
 * Return the confirmation header object that contains
 * 1. Heading of the confirmation block
 * 2. Close button whose function is controlled by ConfirmationCloseAction()
 */
function GetConfirmationHeader() {
    var confirmationHeader = document.createElement("div");
    confirmationHeader.classList.add("confirmation-header");

    //confirmation block close button
    var closeConfirmation = document.createElement("span");
    closeConfirmation.classList.add("closeConfirmation");
    closeConfirmation.innerHTML = "&times;";
    closeConfirmation.onclick = ConfirmationCloseAction;
    confirmationHeader.appendChild(closeConfirmation);

    //Heading of the confirmation pop up
    var confirmationHeading = document.createElement("h2");
    confirmationHeading.innerHTML = "Please Confirm";
    confirmationHeader.appendChild(confirmationHeading);

    return confirmationHeader;
}

/**
 * Returns the confirmation body object that contains
 * 1. List of selected items
 * 2. Action buttons
 */
function GetConfirmationBody() {
    var confirmationBody = document.createElement("div");
    confirmationBody.classList.add("confirmation-body");

    var confirmationMessage = document.createElement("p");
    totalCheckoutItems = checkoutCDs.length + checkoutbooks.length;
    confirmationMessage.innerHTML = "You are about to checkout the below " + totalCheckoutItems + " item(s).";
    confirmationBody.appendChild(confirmationMessage);

    //add the items selected as an ordered list
    var confirmationItemList = document.createElement("ol");

    for (var i = 0; i < checkoutbooks.length; i++) {
        var confirmBookLi = document.createElement("li");
        var confirmBook = document.createTextNode(checkoutbooks[i]);
        confirmBookLi.appendChild(confirmBook);
        confirmationItemList.appendChild(confirmBookLi);
    }

    for (var i = 0; i < checkoutCDs.length; i++) {
        var confirmCDLi = document.createElement("li");
        var confirmCD = document.createTextNode(checkoutCDs[i]);
        confirmCDLi.appendChild(confirmCD);
        confirmationItemList.appendChild(confirmCDLi);
    }
    confirmationBody.appendChild(confirmationItemList);

    //Add Yes and No buttons
    var yesButton = document.createElement("button");
    yesButton.classList.add("confirmation-button");
    yesButton.innerHTML = "Yes";
    yesButton.onclick = ConfirmationYesAction;
    confirmationBody.appendChild(yesButton);

    var noButton = document.createElement("button");
    noButton.classList.add("confirmation-button");
    noButton.innerHTML = "No";
    noButton.onclick = ConfirmationNoAction;
    confirmationBody.appendChild(noButton);

    return confirmationBody;
}

/**
 * Stores the actions required on closing the confirmation window. This includes
 * 1. unhiding the checkout page, since the person may want to remove or add more items to cart
 * 2. hide the confirmation block.
 * 3. Remove content of confirmation block.
 */
function ConfirmationCloseAction() {
    document.getElementById("checkoutPage").style.display = 'block';
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("confirmationDialogBox").remove();

}

/**
 * Stores the action items of Yes button on confirmation window. This includes
 * 1. Hiding confirmation window and removing its contents to be reloaded later.
 * 2. Deleting all the selected items from checkout lists.
 * 3. Updating the effects of count change.
 * 4. Updating the effects of checkout list change.
 */
function ConfirmationYesAction() {
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("confirmationDialogBox").remove();
    checkoutbooks = [];
    checkoutCDs = [];
    UpdateCheckoutIcon();
    document.getElementById("checkoutDisplay").innerHTML = '';
}

/**
 * Stores the action items of No nutton on confirmation window. This includes
 * 1. Hiding confirmation window and removing its contents to be reloaded later.
 * 2. Move back all the selected items from checkout list to available list
 * 3. Updating the effects of count change.
 * 4. Updating the effects of checkout list change.
 */
function ConfirmationNoAction() {
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("confirmationDialogBox").remove();
    for (var i = 0; i < checkoutCDs.length; i++) {
        createContentElement(checkoutCDs[i], "DisplayedCDs");
        console.log("Added back: ", checkoutCDs[i]);
    }
    checkoutCDs = [];
    for (var i = 0; i < checkoutbooks.length; i++) {
        createContentElement(checkoutbooks[i], "DisplayedBooks");
        console.log("Added back: ", checkoutbooks[i]);
    }
    checkoutbooks = [];
    UpdateCheckoutIcon();
    document.getElementById("checkoutDisplay").innerHTML = '';
}