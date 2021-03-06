//User inputs
var username;
var useremail;
var userbirthyear;
var currentYear;

//Item lists
var books;
var CDs;
var availableBooks = [];
var availableCDs = [];
var checkoutbooks = [];
var checkoutCDs = [];

//Due dates
var bookDueIn = 30;
var cdDueIn = 10;

//Flags used
var isAdmin = false;
var isReload = false;
var isEnglish = true;

/**
 * Master function which does the below actions
 * 1. Read the inputs
 * 2. Check if the inputs are valid
 * 3. Confirm with user if details are correct
 */
function UserInformation() {
    if (currentYear != undefined) {
        isReload = true;
    }

    console.log("Available list on loaded is: " + availableBooks);
    initialize();

    var valid = false;
    if (username.value == "admin" && userbirthyear.value == 1867) {
        isAdmin = true;
        valid = true;
    } else {
        isAdmin = false;
        valid = CheckIfValid();
    }

    if (valid) {
        console.log("Validation completed!");
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

    if (isReload) {
        return;
    }

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
    for (var i = 0; i < books.length; i++)
        availableBooks.push(books[i]);
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
    for (var i = 0; i < CDs.length; i++)
        availableCDs.push(CDs[i]);
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
    var isValidEmail = useremail.checkValidity();
    var isValidName = username.checkValidity();
    var alertMessage = "";

    if (!isValidName) {
        console.log("Invalid Name");
        alertMessage = alertMessage + "Only characters are allowed in name, found " + username.value + ".\n";
    }

    if (!isValidEmail) {
        console.log("Invalid Email");
        alertMessage = alertMessage + "Expecting email, found " + useremail.value + ".\n";
    }

    if (userbirthyear.value < 1900 || userbirthyear.value > currentYear) {
        console.log("Invalid Year");
        alertMessage = alertMessage + "Expecting year to lie in the range of 1900 to " + currentYear + ".\n";
    }

    if (alertMessage.length != 0) {
        alert("Invalid inputs please check:\n" + alertMessage);
        return false;
    }
    return true;
}

/**
 * Prints the user details in the format below, to confirm if correct.
 * Format: Jane Doe (jdoe@ example.com) [ Group]
 * where Group is “Adult” if the age is above 18 and “Child’ if not.
 */
function AddUserDetails() {
    var userDetails = document.getElementById("UserDetails");
    userDetails.style.display = 'none';

    document.getElementById("header").style.display = 'block';

    var heading = document.getElementById("heading");
    heading.innerHTML = "The &#127809; Shelf";

    //confirming age group and formatting user details
    var ageGroup = (currentYear - userbirthyear.value) > 18 ? "Adult" : "Child";
    console.log("Age Group recognized as " + ageGroup);

    var userDetailFormat = "";
    if (isAdmin) {
        userDetailFormat = "Librarian";
    } else {
        userDetailFormat = username.value + " (" + useremail.value + ") [" + ageGroup + "]";
    }

    console.log("User Details: " + userDetailFormat);

    var userDetail = document.getElementById("userDetail");
    var displayUserDetails = document.createElement("P");
    displayUserDetails.innerHTML = userDetailFormat;
    displayUserDetails.id = "displayUserDetails";
    displayUserDetails.style.color = 'white';

    //Adding cart button if not admin
    if (!isAdmin) {
        var spanNotif = document.createElement("span");
        spanNotif.innerHTML = '0';
        spanNotif.id = 'checkoutCountNotif';
        spanNotif.style.display = 'none';
        spanNotif.classList.add("notif");
        var cartButton = document.createElement("button");
        cartButton.innerHTML = '&#128722; Cart';
        cartButton.id = "checkoutButton";
        cartButton.classList.add("notifButton");
        cartButton.onclick = function() {
            document.getElementById("checkoutPage").style.display = 'block';
        };
        cartButton.appendChild(spanNotif);
        displayUserDetails.appendChild(cartButton);
    }

    //add logout button
    var logoutButton = document.createElement("button");
    logoutButton.innerHTML = 'Logout';
    logoutButton.id = "checkoutButton";
    logoutButton.classList.add("notifButton");
    logoutButton.onclick = function() {
        LogoutBackToLogin();
    };
    displayUserDetails.appendChild(logoutButton);

    if (!isAdmin) {
        //Add language change button
        var languageOptionButton = document.createElement("button");
        languageOptionButton.innerHTML = 'Language &#9660;';
        languageOptionButton.classList.add("notifButton");

        var dropDown = document.createElement("div");
        var englishLanguage = document.createElement("button");
        englishLanguage.innerHTML = 'English';
        englishLanguage.classList.add('notifButton');
        englishLanguage.style.position = 'unset';
        englishLanguage.onclick = ChangeToEnglish;
        dropDown.appendChild(englishLanguage);

        var frenchLanguage = document.createElement("button");
        frenchLanguage.innerHTML = 'French';
        frenchLanguage.classList.add('notifButton');
        frenchLanguage.style.position = 'unset';
        frenchLanguage.onclick = ChangeToFrench;

        dropDown.appendChild(frenchLanguage);
        dropDown.classList.add('dropdown-content');
        languageOptionButton.appendChild(dropDown);

        var languageOptionBlock = document.createElement("div");
        languageOptionBlock.classList.add('dropdown');
        languageOptionBlock.appendChild(languageOptionButton);

        displayUserDetails.appendChild(languageOptionBlock);
    }

    userDetail.appendChild(displayUserDetails);
}

/**
 * Changes the language of the available list titles to english
 */
function ChangeToEnglish() {
    //no changes if already in english
    if (isEnglish)
        return;

    var titles = document.getElementsByClassName("title");
    for (var i = 0; i < titles.length; i++) {
        titles[i].innerHTML = titles[i].parentNode.parentNode.parentNode.id;
    }
    isEnglish = true;
}

/**
 * Changes the language of the available list titles to french
 */
function ChangeToFrench() {
    //no changes if already in french
    if (!isEnglish)
        return;

    var titles = document.getElementsByClassName("title");
    for (var i = 0; i < titles.length; i++) {
        var itemID = titles[i].parentNode.parentNode.parentNode.id;
        titles[i].innerHTML = GetFrenchName(itemID);
    }
    isEnglish = false;
}

/**
 * Returns the french translation of english item titles, if know.
 * Else, adds and (*) mark at the end of the name
 * @param {*} itemName Title of the item in english
 */
function GetFrenchName(itemName) {

    switch (itemName) {
        //Books
        case "A Tale of Two Cities":
            return "Un conte de deux villes";
        case "The Lord of the Rings":
            return "Le Seigneur des Anneaux";
        case "The Little Prince":
            return "Le petit Prince";
        case "Harry Potter and the Philosopher's Stone":
            return "Harry Potter et la pierre philosophale";
        case "The Hobbit":
            return "Le Hobbit";
        case "Alice's Adventures in Wonderland":
            return "Les aventures d'Alice au Pays des Merveilles";
        case "Dream of the Red Chamber":
            return "Rêve de la chambre rouge";
        case "And Then There Were None":
            return "Et puis il n'y en avait pas";
        case "The Lion, the Witch and the Wardrobe":
            return "Le Lion, la Sorcière et l'Armoire";
        case "She, A History of Adventure":
            return "Elle, une histoire d'aventure";

            //CDs
        case "Going Seventeen":
            return "En allant dix-sept";
        case "The Brown Band":
            return "La bande brune";
        case "The Ultimate Collection":
            return "La collection ultime";
        case "Clapton Chronicles, The Best of Eric Clapton":
            return "Clapton Chronicles, le meilleur d'Eric Clapton";
        case "50 Number Ones":
            return "50 Nombre";
        case "19 - by Adele":
            return "19 - de Adele";
        case "Now That’s What I Call Music! 92":
            return "C’est ce que j’appelle la musique! 92";
        case "April, and a Flower":
            return "Avril et une fleur";
        case "Mama - by EXO":
            return "Mama - par EXO";
        case "21 - by Adele":
            return "21 - de Adele";

            //If not add (*) that french version not available
        default:
            return itemName + "*";
    }
}

/**
 * Changes required to logout
 * Shifting from the available list + checkout page to login page
 */
function LogoutBackToLogin() {
    //For new user start fresh checkout
    checkoutbooks = [];
    checkoutCDs = [];
    UpdateCheckoutIcon();
    document.getElementById("checkoutDisplay").innerHTML = '';
    document.getElementById("displayUserDetails").remove();

    //remove admin specific changes
    if (isAdmin) {
        console.log("Removing admin specific items");
        document.getElementById("add_new_DisplayedBooks").remove();
        document.getElementById("add_new_DisplayedCDs").remove();
        document.getElementById("containerBookDueBlock").remove();
        document.getElementById("containerCDDueBlock").remove();
    }

    //shift to login page
    document.getElementById("header").style.display = 'none';
    document.getElementById("displayList").style.display = 'none';
    document.getElementById("userDetailForm").reset();
    document.getElementById("UserDetails").style.display = 'block';
    document.getElementById("checkoutPage").innerHTML = '';

    //remove all book and CD cards
    for (var i = 0; i < availableBooks.length; i++)
        document.getElementById(availableBooks[i]).remove();
    for (var i = 0; i < availableCDs.length; i++)
        document.getElementById(availableCDs[i]).remove();
}

/**
 * Controls displaying the main menu
 * list of available items along with cart status
 */
function DisplayMainMenu() {
    //unhide main menu
    var displayList = document.getElementById("displayList");
    displayList.style.display = "block";

    if (isAdmin) {
        createAddNewContentElement("DisplayedBooks");
        createAddNewContentElement("DisplayedCDs");
        AddUpdateDueDateOption("BookDueBlock");
        AddUpdateDueDateOption("CDDueBlock");
    }

    var i;
    //Add books to available item list
    for (i = 0; i < availableBooks.length; i++) {
        createContentElement(availableBooks[i], "DisplayedBooks");
    }

    //Add CDs to available item list
    for (i = 0; i < availableCDs.length; i++) {
        createContentElement(availableCDs[i], "DisplayedCDs");
    }

    //Add checkout cart details, will keep it hidden till the cart button is clicked
    CheckoutCartDetails();
}

function AddUpdateDueDateOption(itemDueDate) {
    var dueDateChangeContainer = document.createElement("div");

    var dueDateChangeInput = document.createElement("input");
    dueDateChangeInput.placeholder = "Add new due date in days";
    dueDateChangeContainer.appendChild(dueDateChangeInput);

    var updateDueDateButton = document.createElement("button");
    updateDueDateButton.classList.add("button");
    updateDueDateButton.style.width = "auto";
    updateDueDateButton.innerHTML = "Update";
    updateDueDateButton.onclick = function() {
        console.log("Update due date to: " + dueDateChangeInput.value);

        if (itemDueDate == "BookDueBlock") {
            bookDueIn = dueDateChangeInput.value;
            document.getElementById('BookDueDate').innerHTML = "Books are due in " + bookDueIn + "days";
            console.log("Update Book due date to: " + dueDateChangeInput.value);
        } else {
            cdDueIn = dueDateChangeInput.value;
            document.getElementById('CDDueDate').innerHTML = "CDs are due in " + bookDueIn + "days";
            console.log("Update CD due date to: " + dueDateChangeInput.value);
        }
    };
    dueDateChangeContainer.appendChild(updateDueDateButton);
    dueDateChangeContainer.id = "container" + itemDueDate;
    document.getElementById(itemDueDate).appendChild(dueDateChangeContainer);
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
 * Creates and adds the new add card to the respective block in main menu
 * @param {*} blockName for CD -> DisplayedCDs, for Books -> DisplayedBooks
 */
function createAddNewContentElement(blockName) {
    var elementTitle = document.createElement("p");
    elementTitle.classList.add("title");
    elementTitle.innerHTML = "Use button below to add";

    var elementContainer = document.createElement("div");
    elementContainer.classList.add("container");
    elementContainer.appendChild(elementTitle);

    var elementButton = document.createElement("button");
    elementButton.classList.add("button");
    elementButton.innerHTML = "Add New";
    elementButton.onclick = function() {
        AddNewAvailableItem(blockName);
    };
    elementContainer.appendChild(elementButton);

    //add images
    var elementImage = document.createElement("img");
    elementImage.src = "images/add_new.jpg";
    elementImage.alt = "add_new";
    elementImage.style = "width: 80%";

    var elementCard = document.createElement("div");
    elementCard.classList.add("card");
    elementCard.appendChild(elementImage);
    elementCard.appendChild(elementContainer);

    var elementColumn = document.createElement("div");
    elementColumn.classList.add("column");
    elementColumn.id = "add_new_" + blockName;
    elementColumn.appendChild(elementCard);

    document.getElementById(blockName).appendChild(elementColumn);
}

/**
 * DIalog box to get the input on the item name to be added
 * @param {*} blockName for CD -> DisplayedCDs, for Books -> DisplayedBooks
 */
function AddNewAvailableItem(blockName) {
    var addNewScreen = document.getElementById("confirmation");
    addNewScreen.style.display = "block";

    //create content block to make stying the block easier
    var addNewDialogBox = document.createElement("div");
    addNewDialogBox.classList.add("dialogBox-content");
    addNewDialogBox.id = "addNewDialogBox";
    addNewScreen.appendChild(addNewDialogBox);

    //get addNew header
    var addNewHeader = GetaddNewHeader();

    //get addNew body
    var addNewBody = GetaddNewBody(blockName);

    addNewDialogBox.appendChild(addNewHeader);
    addNewDialogBox.appendChild(addNewBody);
}

/**
 * Return the addNew header object that contains
 * 1. Heading of the addNew block
 * 2. Close button whose function is controlled by addNewCloseAction()
 */
function GetaddNewHeader() {
    var addNewHeader = document.createElement("div");
    addNewHeader.classList.add("confirmation-header");

    //addNew block close button
    var closeaddNew = document.createElement("span");
    closeaddNew.classList.add("closeConfirmation");
    closeaddNew.innerHTML = "&times;";
    closeaddNew.onclick = addNewCloseAction;
    addNewHeader.appendChild(closeaddNew);

    //Heading of the addNew pop up
    var addNewHeading = document.createElement("h2");
    addNewHeading.innerHTML = "Add new item";
    addNewHeader.appendChild(addNewHeading);

    return addNewHeader;
}

/**
 * Returns the addNew body object that contains
 * 1. Gets the item name from admin
 * 2. add item name to the available item list with default image
 * @param {*} blockName for CD -> DisplayedCDs, for Books -> DisplayedBooks
 */
function GetaddNewBody(blockName) {
    var addNewBody = document.createElement("div");
    addNewBody.classList.add("confirmation-body");

    var addNewMessage = document.createElement("p");
    addNewMessage.innerHTML = "Please enter the item name you want to add and press enter key";
    addNewBody.appendChild(addNewMessage);

    var addNewInput = document.createElement("input");
    addNewInput.id = "addNewItemName";
    addNewBody.appendChild(addNewInput);

    //Add Yes and No buttons
    var enterButton = document.createElement("button");
    enterButton.classList.add("confirmation-button");
    enterButton.innerHTML = "Enter";
    enterButton.onclick = function() {
        addNewYesAction(blockName);
    };
    addNewBody.appendChild(enterButton);

    return addNewBody;
}

/**
 * Closes the dialog box and enables the background
 */
function addNewCloseAction() {
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("addNewDialogBox").remove();
}

/**
 * defines the add button action items in New Item block
 * @param {*} blockName for CD -> DisplayedCDs, for Books -> DisplayedBooks
 */
function addNewYesAction(blockName) {
    var itemName = document.getElementById("addNewItemName").value;

    AvailableListAdd(itemName, blockName);
    createContentElement(itemName, blockName);
    addNewCloseAction();
}

/**
 * Creates and adds the card to the respective block in main menu
 * @param {*} itemName Name of the book to be added to the list
 * @param {*} blockName for CD -> DisplayedCDs, for Books -> DisplayedBooks
 */
function createContentElement(itemName, blockName) {
    var elementTitle = document.createElement("p");
    elementTitle.classList.add("title");
    if (isEnglish)
        elementTitle.innerHTML = itemName;
    else
        elementTitle.innerHTML = GetFrenchName(itemName);

    var elementContainer = document.createElement("div");
    elementContainer.classList.add("container");
    elementContainer.appendChild(elementTitle);

    //add and remove buttons for all cards
    var elementButton = document.createElement("button");
    elementButton.classList.add("button");
    if (isAdmin) {
        elementButton.innerHTML = "Remove";
        elementButton.onclick = function() {
            RemoveFromAvailable(itemName, blockName);
        };
    } else {
        elementButton.innerHTML = "Add";
        elementButton.onclick = function() {
            AddToCheckout(itemName, blockName);
        };
    }
    elementContainer.appendChild(elementButton);

    //add images
    var elementImage = document.createElement("img");
    if (books.includes(itemName) || CDs.includes(itemName)) {
        elementImage.src = "images/" + itemName + ".jpg";
    } else {
        elementImage.src = "images/default.jpg";
    }
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
    console.log("This function will remove the '" + itemName + "' button from '" + blockName + "' and add it to checkout");

    //remove element from available display list
    var elementToRemove = document.getElementById(itemName);
    elementToRemove.remove();

    //add item to checkout list
    if (blockName == "DisplayedBooks") {
        checkoutbooks.push(itemName);
    } else {
        checkoutCDs.push(itemName);
    }

    AvailableListRemove(itemName, blockName);
    //update on add to cart selection
    UpdateCheckoutIcon();
    UpdateCheckoutList(itemName, blockName);

    console.log("Checkout Items: " + checkoutCDs.length + checkoutbooks.length);
}

/**
 * Removes the added item from available item list
 */
function RemoveFromAvailable(itemName, blockName) {
    console.log("This function will remove the item from available " + itemName + blockName);

    //remove item from available list array
    AvailableListRemove(itemName, blockName);

    //remove element from available display list
    var elementToRemove = document.getElementById(itemName);
    elementToRemove.remove();
}

/**
 * Acts upon the change in number of checkout items, as per the count of the 2 variables, checkoutCDs and checkoutbooks
 */
function UpdateCheckoutIcon() {
    var totalCheckoutItems = checkoutCDs.length + checkoutbooks.length;

    //update the checkout notification count
    var cartButton = document.getElementById("checkoutCountNotif");
    if (cartButton != null) {
        cartButton.innerHTML = totalCheckoutItems;
        if (totalCheckoutItems > 0)
            cartButton.style.display = 'block';
        else
            cartButton.style.display = 'none';
    }

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
    checkoutDisplayElement.style.fontSize = "medium";
    var checkoutItemName = document.createTextNode(itemName);
    checkoutDisplayElement.appendChild(checkoutItemName);

    var itemDetails = document.createElement("p");
    if (blockName == "DisplayedBooks") {
        var due_in = "due in " + bookDueIn + " days";
        itemDetails.innerHTML = due_in.italics();
    } else {
        due_in = "due in " + cdDueIn + " days";
        itemDetails.innerHTML = due_in.italics();
    }
    checkoutDisplayElement.appendChild(itemDetails);

    var removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = function() {
        /**
         * Actions:
         * 1. remove item from checkout list on checkout page and the checkout variables
         * 2. Since the count of checkout items changed, update the corresponding places
         */
        this.parentElement.style.display = 'none';
        createContentElement(itemName, blockName);
        AvailableListAdd(itemName, blockName);
        RemoveItemFromCheckoutListArray(itemName, blockName);
        UpdateCheckoutIcon();
    };
    removeButton.classList.add("close");
    checkoutDisplayElement.appendChild(removeButton);

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
        index = checkoutCDs.indexOf(itemName);
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

    var checkoutButton = document.createElement("button");
    checkoutButton.innerHTML = "Checkout";
    checkoutButton.id = "checkoutCartButton";
    checkoutButton.disabled = true;

    checkoutButton.style.cssFloat = 'right';
    checkoutButton.classList.add("notifButton");
    checkoutButton.style.backgroundColor = 'green';
    checkoutButton.onclick = function() {
        DisplayDialog();
    };
    checkoutPage.appendChild(checkoutButton);

    var checkoutWindowCloseButton = document.createElement("button");
    checkoutWindowCloseButton.innerHTML = "Close";
    checkoutWindowCloseButton.style.cssFloat = 'right';
    checkoutWindowCloseButton.classList.add("notifButton");
    checkoutWindowCloseButton.onclick = function() {
        checkoutPage.style.display = "none";
    };
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
    confirmationDialogBox.classList.add("dialogBox-content");
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
    var totalCheckoutItems = checkoutCDs.length + checkoutbooks.length;
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
        AvailableListAdd(checkoutCDs[i], "DisplayedCDs");
        console.log("Added back: ", checkoutCDs[i]);
    }
    checkoutCDs = [];
    for (var i = 0; i < checkoutbooks.length; i++) {
        createContentElement(checkoutbooks[i], "DisplayedBooks");
        AvailableListAdd(checkoutbooks[i], "DisplayedBooks");
        console.log("Added back: ", checkoutbooks[i]);
    }
    checkoutbooks = [];
    UpdateCheckoutIcon();
    document.getElementById("checkoutDisplay").innerHTML = '';
}

/**
 * Add item to respective available list
 * @param {*} itemName Name of the book to be added to the list
 * @param {*} blockName for CD -> DisplayedCDs, for Books -> DisplayedBooks
 */
function AvailableListAdd(itemName, blockName) {
    if (blockName == "DisplayedBooks") {
        availableBooks.push(itemName);
    } else {
        availableCDs.push(itemName);
    }
}

/**
 * Remove item from respective available list
 * @param {*} itemName Name of the book to be added to the list
 * @param {*} blockName for CD -> DisplayedCDs, for Books -> DisplayedBooks
 */
function AvailableListRemove(itemName, blockName) {
    if (blockName == "DisplayedBooks") {
        var index = availableBooks.indexOf(itemName);
        if (index > -1) {
            availableBooks.splice(index, 1);
        }
    } else if (blockName == "DisplayedCDs") {
        index = availableCDs.indexOf(itemName);
        if (index > -1) {
            availableCDs.splice(index, 1);
        }
    }
}