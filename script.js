document.addEventListener("DOMContentLoaded", init, false);

function init() {
    var SIZEANDCOST_HAND_TOSSED_DOUGH = {
        "Small": "9.99",
        "Medium": "12.99",
        "Large": "14.99"
    };

    var SIZEANDCOST_THIN_CRUST_DOUGH = {
        "Medium": "11.99",
        "Large": "13.99"
    };

    var SIZEANDCOST_NEWYORK_DOUGH = {
        "Large": "16.99",
        "Extra Large": "19.99"
    };

    var SIZEANDCOST_GLUTEN_FREE_DOUGH = {
        "Small": "10.99"
    };

    var CustomerInfoObject = {};
    var addressType = document.getElementById("addressType");
    addressType.addEventListener("click", addRemoveOtherAddress, false);
    var billingForm = document.getElementById("userBillingInfo");
    
    var validateBillButton = document.getElementById("billSubmitPersonalInfo");
    
    // Div where error messages are displayed
    var errorMsgElement = document.getElementById("errorMessages");

    // ******* billingForm eventlistener placeholder
    //    billingForm.addEventListener("click", validateBillingForm, false);

    // Billing Match Form Checkbox listener
    var billingMatchDeliveryChkBox = document.getElementById("billingMatchDelivery");
    billingMatchDeliveryChkBox.addEventListener("click", populateDeliveryForm, false);

       var billErrorMsgElement = document.getElementById("billingErrorMsgs");

    billingForm.style.display = "none";
//    var billingInfoHeader = document.getElementById("billingInfoHeader");
//    billingInfoHeader.style.display = "none";
    var userPaymentForm = document.getElementById("userPaymentForm");
    // Hide the payment form    
    userPaymentForm.style.display = "none";
    
    
    document.getElementById("buildOrder_main").style.display = "none";
    
    var buildOrderConfirmationButton = document.getElementById("buildOrder_submitButton");
    
    
     buildOrderConfirmationButton.addEventListener("click", buildOrder_confirmation, false);



    var doughRadios = document.getElementsByName("dough");
    var i = 0;
    for (i = 0; i < doughRadios.length; i = i + 1) {
        doughRadios[i].addEventListener("click", buildOrder_selectDough, false);
    }

    document.getElementById("buildOrder_sizeMenu").addEventListener("change", buildOrder_selectSize, false);

    document.getElementById("buildOrder_cheeseMenu").addEventListener("change", buildOrder_selectCheese, false);

    document.getElementById("buildOrder_sauceMenu").addEventListener("change", buildOrder_selectSauce, false);

    var toppingCheckBoxes = document.getElementsByName("topping");
    var i = 0;
    for (i = 0; i < toppingCheckBoxes.length; i = i + 1) {
        toppingCheckBoxes[i].addEventListener("click", buildOrder_selectTopping, false);
    }

    function addRemoveOtherAddress(event) {
        var otherAddressBox;
        if (event.target.value === "other") {
            // Display a text box for person to enter the other value
            otherAddressBox = document.getElementById("hideOtherAddress");
            if (otherAddressBox !== null && otherAddressBox !== undefined) {
                otherAddressBox.id = "showOtherAddress";
            }
        } else {
            otherAddressBox = document.getElementById("showOtherAddress");
            if (otherAddressBox !== null && otherAddressBox !== undefined) {
                otherAddressBox.id = "hideOtherAddress";
            }
        }
    }
    //***************************************************
    // *            Delivery form Logic                 *
    //***************************************************

    var submitPersonalInfo = document.getElementById("submitPersonalInfo");
    submitPersonalInfo.addEventListener("click", validatePersonalInfo, false);



    function validatePersonalInfo(event) {
        event.preventDefault();
        var isValid = true;
        var errorMsgArray = [];

        // Call individual validate functions & add any error messages to list of errors to be displayed

        var errorMsgNameValidate = validateName();
        if (errorMsgNameValidate !== null) {
            errorMsgArray.push(errorMsgNameValidate);
        }

        var errorMsgOtherAddressValidate = validateOtherAddress();
        if (errorMsgOtherAddressValidate !== null) {
            errorMsgArray.push(errorMsgOtherAddressValidate);
        }
        var errorMsgAddressValidate = validateAddress();
        if (errorMsgAddressValidate !== null) {
            errorMsgArray.push(errorMsgAddressValidate);
        }

        var errorMsgCityValidate = validateCity();
        if (errorMsgCityValidate !== null) {
            errorMsgArray.push(errorMsgCityValidate);
        }

        var errorMsgStateValidate = validateState();
        if (errorMsgStateValidate !== null) {
            errorMsgArray.push(errorMsgStateValidate);
        }

        var errorMsgZipValidate = validateZip();
        if (errorMsgZipValidate !== null) {
            errorMsgArray.push(errorMsgZipValidate);
        }

        var errorMsgEmailValidate = validateEmail();
        if (errorMsgEmailValidate !== null) {
            errorMsgArray.push(errorMsgEmailValidate);
        }

        if (errorMsgArray.length > 0) {
            createAndDisplayErrorMsgs(errorMsgArray);
        } else { // All Delivery successfully validated
            
           // Clear any error message before locking form
            errorMsgElement.style.display = "none";
            
            // Create Object with validated field
            var deliveryInfoObject = {
                    name: nameInput.value,
                    address: addressInput.value,
                    city: cityInput.value,
                    state: stateInput.value,
                    zip: zipInput.value,
                    email: emailInput.value,
                    other: otherAddressInput.value
                }
                // Insert deliveryInfo into customerObject
            CustomerInfoObject["deliveryInfo"] = deliveryInfoObject;
            var deliveryForm = document.getElementById("deliveryInfo");
            
            // Get delivery Form Fieldset and Disable it 

            var deliveryFormFieldset = document.getElementById("deliveryFormFieldset");
//            document.activeElement.blur();
            deliveryFormFieldset.disabled = true;
            
            
//            // Hide deliverInfo Form
//            deliveryForm.style.display = "none";
            
            // Summary Data could be used instead of disabled form. 
//            document.getElementById("deliveryInfoSummary").innerHTML =
//                "Name: " + CustomerInfoObject.deliveryInfo.name + "<br/> Address: " +
//                CustomerInfoObject.deliveryInfo.address + "<br/> City: " + CustomerInfoObject.deliveryInfo.city + "<br/> State: " +
//                CustomerInfoObject.deliveryInfo.state + "<br/> ZipCode: " +
//                CustomerInfoObject.deliveryInfo.zip + "<br/> email: " +
//                CustomerInfoObject.deliveryInfo.email;

            document.getElementById("buildOrder_main").style.display = "block";
        }

    } // End validatePersonalInfo 

    // Validation Methods 

    function validateName() {
        var nameInput = document.getElementById("nameInput");
        if (nameInput.value == null || nameInput.value.trim() == "") {
            return "Name is empty. Please enter your name: e.g. (Fred Jones)";
        } else {
            var nameRegEx = /^[a-z ,.'-]+$/i;

            if (!nameRegEx.test(nameInput.value)) {
                return "Name is invalid. The name must only contain letters";
            }
        }
        return null;
    }

    function validateAddress() {
        var addressInput = document.getElementById("addressInput");
        if (addressInput.value == null || addressInput.value.trim() == "") {
            return "Address cannot be blank. Please enter your address";
        }
        return null;
    }

    function validateOtherAddress() {
        var otherAddressOption = document.getElementById("showOtherAddress");
        // Check to see if otherAddressInput has been selected
        if (otherAddressOption !== null && otherAddressOption !== undefined) {
            var otherAddressInput = document.getElementById("otherAddressInput");
            // Validate not blank 
            if (otherAddressInput.value == null || otherAddressInput.value.trim() == "") {
                return "'Other' Address Type cannot be blank. Please enter a value in 'Other' field or select another 'Address Type'";
            }
        }
        return null;
    }

    function validateCity() {
        var cityInput = document.getElementById("cityInput");
        if (cityInput.value == null || cityInput.value.trim() == "") {
            return "City is invalid";
        }
        return null;
    }

    function validateState() {
        var stateInput = document.getElementById("stateInput");
        if (stateInput.value == null || stateInput.value.trim() == "") {
            return "State cannot be blank. Please enter two letter state abbreviation (e.g., CA)";
        } else {
            var stateRegEx = new RegExp("^[A-Z][A-Z]", "gmi");
            if (!stateRegEx.test(stateInput.value)) {
                return "State must be two character state abbreviation (e.g., 'CA', 'AZ', etc)";
            }

        }
        return null;
    }

    function validateZip() {
        var zipInput = document.getElementById("zipInput");
        if (zipInput.value == null || zipInput.value.trim() == "") {
            return "Zip cannot be blank. Please enter valid 5 digit Zip code";
        } else {
            var zipRegEx = /^\d{5}$/gmi;
            if (!zipRegEx.test(zipInput.value)) {
                return "Invalid Zip code entered. Please enter valid 5 digit zipcode";
            }
        }
        return null;
    }

    function validateEmail() {
        var emailInput = document.getElementById("emailInput");
        if (emailInput.value == null || emailInput.value.trim() == "") {
            return "Email address cannot be empty. Please enter valid email address";
        } else {
            //Simple email expression. Doesn't allow numbers in the domain name and doesn't allow for top level domains that are less than 2 or more than 3 letters (which is fine until they allow more). Doesn't handle multiple &quot;.&quot; in the domain (joe@abc.co.uk).
            var emailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gmi;

            if (!emailRegEx.test(emailInput.value)) {

                return "Invalid email address. Please re-enter"
            }
        }
        return null;
    }



    //Create error message string and displayed on screen above form

    function createAndDisplayErrorMsgs(errorMsgArray) {

        if (errorMsgArray.length > 0) {
            var i;
            var errorMsgsStr = "";
            for (i = 0; i < errorMsgArray.length; i += 1) {
                errorMsgsStr = errorMsgsStr + errorMsgArray[i] + "<br/>";
            }
            errorMsgElement.innerHTML = errorMsgsStr;
            errorMsgElement.style.display = "block";


        } else {
            errorMsgElement.innerHTML = "";
            errorMsgElement.style.display = "none";

        }
    }

    //***************************************************
    //               Billing form Logic                 *
    //***************************************************


    function populateDeliveryForm(event) {
        if (billingMatchDeliveryChkBox.checked) {
//                       populateBillingWithDeliveryInfo ();
            window.console.log("Checkbox is now checked");

            var billingSummary = document.getElementById("billingSummary");
            billingSummary.innerHTML =
                "<br/><br/>" + 
                "BILLING SUMMARY INFORMATION: " + "<br/>" +
                "Name: " + CustomerInfoObject.deliveryInfo.name + "<br/> Address: " +
                CustomerInfoObject.deliveryInfo.address + "<br/> City: " + CustomerInfoObject.deliveryInfo.city + "<br/> State: " +
                CustomerInfoObject.deliveryInfo.state + "<br/> ZipCode: " +
                CustomerInfoObject.deliveryInfo.zip + "<br/> email: " +
                CustomerInfoObject.deliveryInfo.email;
            billingSummary.style.display = "block";
            billingForm.style.display = "none";

        } else {
            window.console.log("Checkbox is now unchecked");
                       
            // Not checked show them the billingForm
            billingForm.style.display = "block";
//            var billingSummary = document.getElementById("billingSummary");
//            billingSummary.style.display = "none";

        }
    }
    
    
    
    
    
    
    // Take Data from Deliver info and populate 
    // Deliver form
    // Decided not to do this..will just leave form empty
    function populateBillingWithDeliveryInfo() {
          
        
    }


    //***************************************************
    //               Build Order Logic                  *
    //***************************************************       



    var buildOrder = {};
    var buildOrder_totalCost = 0;
    var buildOrder_sizeCost = 0;
    var buildOrder_cheeseCost = 0;
    var buildOrder_sauceCost = 0;
    var buildOrder_toppingCost = 0;

    function buildOrder_selectDough() {
        var doughRadios = document.getElementsByName("dough");
        var i = 0;
        for (i = 0; i < doughRadios.length; i = i + 1) {
            if (doughRadios[i].checked) {
                //Add to object:
                buildOrder["dough"] = doughRadios[i].value;

                //Display select size menu:
                buildOrder_displaySize(doughRadios[i].value)
                break;
            }
        }

        //Hide and reset elements and variables to defaults:
        document.getElementById("buildOrder_cheeseAndSauce").style.display = "none";
        document.getElementById("buildOrder_cheeseMenu").options[1].selected = true;
        document.getElementById("buildOrder_sauceMenu").options[0].selected = true;

        document.getElementById("buildOrder_topping").style.display = "none";
        var toppingCheckboxes = document.getElementsByName("topping");
        var i = 0;
        for (i = 0; i < toppingCheckboxes.length; i = i + 1) {
            toppingCheckboxes[i].checked = false;
        }

//        document.getElementById("buildOrder_complete").style.display = "none";
        document.getElementById("buildOrder_summary").style.display = "none";

        buildOrder_totalCost = 0;
        buildOrder_sizeCost = 0;
        buildOrder_cheeseCost = 0;
        buildOrder_sauceCost = 0;
        buildOrder_toppingCost = 0;
        buildOrder_updateTotalCost(buildOrder_totalCost);
    }

    function buildOrder_displaySize(selectedDoughValue) {
        var sizeSection = document.getElementById("buildOrder_size");
        sizeSection.style.display = "block";

        //Determine the selected size/cost object:
        var selectedSizeObject = null;
        switch (selectedDoughValue) {
        case "handTossed":
            selectedSizeObject = SIZEANDCOST_HAND_TOSSED_DOUGH;
            break;

        case "thinCrust":
            selectedSizeObject = SIZEANDCOST_THIN_CRUST_DOUGH;
            break;

        case "newYorkStyle":
            selectedSizeObject = SIZEANDCOST_NEWYORK_DOUGH;
            break;

        default:
            //gluten free:
            selectedSizeObject = SIZEANDCOST_GLUTEN_FREE_DOUGH;
            break;
        }

        //Populate drop-down select items:
        var selectSizeDropDownMenu = document.getElementById("buildOrder_sizeMenu");
        selectSizeDropDownMenu.innerHTML = "";

        var optionBlank = document.createElement("option");
        optionBlank.disabled = true;
        optionBlank.selected = true;
        selectSizeDropDownMenu.add(optionBlank);

        for (var key in selectedSizeObject) {
            var option = document.createElement("option");
            option.text = key + " ($" + selectedSizeObject[key] + ")";
            option.value = selectedSizeObject[key];
            selectSizeDropDownMenu.add(option);
        }
    }

    function buildOrder_selectSize() {
        //Find option selected:
        var selectSizeDropDownMenu = document.getElementById("buildOrder_sizeMenu");
        var optionSelected = selectSizeDropDownMenu.options[selectSizeDropDownMenu.selectedIndex];
        var optionSelectedValue = optionSelected.value;

        //Build object:
        buildOrder["size"] = optionSelected.text;

        //Update total cost:
        var sizeCostNew = parseFloat(optionSelectedValue);
        buildOrder_totalCost = buildOrder_totalCost - buildOrder_sizeCost + sizeCostNew;
        buildOrder_updateTotalCost(buildOrder_totalCost);
        buildOrder_sizeCost = sizeCostNew;

        //Display other options and their default options:
        document.getElementById("buildOrder_cheeseAndSauce").style.display = "block";
        document.getElementById("buildOrder_topping").style.display = "block";
//        document.getElementById("buildOrder_complete").style.display = "block";
    }

    function buildOrder_selectCheese() {
        //Find option selected:
        var selectCheeseMenu = document.getElementById("buildOrder_cheeseMenu");
        var optionSelected = selectCheeseMenu.options[selectCheeseMenu.selectedIndex];
        var optionSelectedValue = optionSelected.value;

        //Build object:
        buildOrder["cheese"] = optionSelected.text;

        //Update total cost:
        var cheeseCostNew = parseFloat(optionSelectedValue);
        buildOrder_totalCost = buildOrder_totalCost - buildOrder_cheeseCost + cheeseCostNew;
        buildOrder_updateTotalCost(buildOrder_totalCost);
        buildOrder_cheeseCost = cheeseCostNew;
    }

    function buildOrder_selectSauce() {
        //Find option selected:
        var selectSauceMenu = document.getElementById("buildOrder_sauceMenu");
        var optionSelected = selectSauceMenu.options[selectSauceMenu.selectedIndex];
        var optionSelectedValue = optionSelected.value;

        //Build object:
        buildOrder["sauce"] = optionSelected.text;

        //Update total cost:
        var sauceCostNew = parseFloat(optionSelectedValue);
        buildOrder_totalCost = buildOrder_totalCost - buildOrder_sauceCost + sauceCostNew;
        buildOrder_updateTotalCost(buildOrder_totalCost);
        buildOrder_sauceCost = sauceCostNew;
    }

    function buildOrder_selectTopping() {
        var toppingCheckboxes = document.getElementsByName("topping");
        var toppingCostNew = 0;
        var toppingStringValues = "";
        var i = 0;
        for (i = 0; i < toppingCheckboxes.length; i = i + 1) {
            if (toppingCheckboxes[i].checked) {
                toppingCostNew = toppingCostNew + parseFloat(toppingCheckboxes[i].value);

                toppingStringValues = toppingStringValues + toppingCheckboxes[i].innerHTML;
            }
        }

        //Build object:
        buildOrder["topping"] = toppingStringValues;

        //Update total cost:
        buildOrder_totalCost = buildOrder_totalCost - buildOrder_toppingCost + toppingCostNew;
        buildOrder_updateTotalCost(buildOrder_totalCost);
        buildOrder_toppingCost = toppingCostNew;
    }

    function buildOrder_updateTotalCost(costValue) {
        document.getElementById("buildOrder_totalCost").innerHTML = costValue.toFixed(2);
    }

    function buildOrder_confirmation(event) {
        event.preventDefault();
        var confirmed;
        if (confirm("BUILD CONFIRMATION ORDER \n\nAre you done building your pizza order?") == true) {
//            buildOrder_completed();
 
            
            orderFormFieldset.disabled = true;
            billingForm.style.display = "block";
//            userPaymentForm.style.display = "block";
            
            // Show user Billing form

        } else {  // User canceled order
            // Re-enable UserDeliveryForm
            deliveryFormFieldset.disabled = false;
            
            // Re-endable BuildOrderForm
            orderFormFieldset.disabled = false;             
        }
    
    }

//    function buildOrder_completed() {
        //Hide the buildOrder_form section:
//        document.getElementById("buildOrder_form").style.display = "none";
       // Disable order form 
//       orderFormFieldset.disabled = true;
        
//        document.getElementById("buildOrder_complete").style.display = "none";

        //Display buildOrder_summary section:
//        var buildOrderSummary = document.getElementById("buildOrder_summary");
//        buildOrderSummary.style.display = "block";
//
//        buildOrderSummary.innerHTML = ""
//        "<b>Order Summary:</b><br/>" + "Dough: " + buildOrder.dough + "<br/>Size: " + buildOrder.size + "<br/>Cheese:: " + buildOrder.cheese + "<br/>Sauce:: " + buildOrder.sauce + "<br/>Toppings:: " + buildOrder.topping;

        //Display "Billing Info" section:
//        billingInfoHeader.style.display = "block";
//    }


    //  Payment Validation Logic

    
    var validatePaymentButton = document.getElementById("authorizePayment");
    
    validatePaymentButton.addEventListener("click", validatePaymentInfo, false);
    
    
    
    function validatePaymentInfo(event) {
        event.preventDefault();
        validateCCExpDate();
    }
    
    function validateCCExpDate() { 
    var selectedExpMonth = document.getElementById ("expireMonth"); 
    var selectedExpYear = document.getElementById ("expireMonth");
    if (selectedExpMonth.value == "" || selectedExpYear.value == "") {
        window.console.log("No Expiration Month and/or Year was selected" ); 
        return "Card Expiration Error: No Expiration Month and/or Year was selected. Please make your selection(s)";
    }    
    var selectedDate = new Date (document.getElementById("expireYear").value,document.getElementById("expireMonth").value)
    window.console.log("Selected Date: " + selectedDate);
    var nextmonth = selectedDate.setMonth(selectedDate.getMonth() + 1);
    window.console.log("Next month: " + nextmonth); 
    var last_date_of_selected_date = new Date(nextmonth -1);
    var today = new Date();
    window.console.log("Today :" + today); 
    if (today > selectedDate) {
        window.console.log("Card has expired"); 
        return "Date selected indicates card is expired. Please the date selected and correct or use another card if card has expired"
    }
    else {
        window.console.log("Congrats your card hasn't expired");
        return null;

    }
}

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// Validate Billing Info    
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
   
    validateBillButton.addEventListener("click", validateBillingInfo, false);



    function validateBillingInfo(event) {
        event.preventDefault();
        var isValid = true;
        var billErrorMsgArray = [];

        // Call individual validate functions & add any error messages to list of errors to be displayed

        var billErrorMsgNameValidate = billValidateName();
        if (billErrorMsgNameValidate !== null) {
            billErrorMsgArray.push(billErrorMsgNameValidate);
        }

        var billErrorMsgOtherAddressValidate = billValidateOtherAddress();
        if (billErrorMsgOtherAddressValidate !== null) {
            billErrorMsgArray.push(billErrorMsgOtherAddressValidate);
        }
        var billErrorMsgAddressValidate = billValidateAddress();
        if (billErrorMsgAddressValidate !== null) {
            billErrorMsgArray.push(billErrorMsgAddressValidate);
        }

        var billErrorMsgCityValidate = billValidateCity();
        if (billErrorMsgCityValidate !== null) {
            billErrorMsgArray.push(billErrorMsgCityValidate);
        }

        var billErrorMsgStateValidate = billValidateState();
        if (billErrorMsgStateValidate !== null) {
            billErrorMsgArray.push(billErrorMsgStateValidate);
        }

        var billErrorMsgZipValidate = billValidateZip();
        if (billErrorMsgZipValidate !== null) {
            billErrorMsgArray.push(billErrorMsgZipValidate);
        }

        var billErrorMsgEmailValidate = billValidateEmail();
        if (billErrorMsgEmailValidate !== null) {
            billErrorMsgArray.push(billErrorMsgEmailValidate);
        }

        if (billErrorMsgArray.length > 0) {
            createAndDisplayBillErrorMsgs(billErrorMsgArray);
        } else { // All Delivery successfully validated
            
           // Clear any error message before locking form
            billErrorMsgElement.style.display = "none";
            
            // Create Object with validated field
            var billingInfoObject = {
                    name: billNameInput.value,
                    address: billAddressInput.value,
                    city: billCityInput.value,
                    state: billStateInput.value,
                    zip: billZipInput.value,
                    email: billEmailInput.value,
                    other: billOtherAddressInput.value
                }
                // Insert deliveryInfo into customerObject
            CustomerInfoObject["userBillingInfo"] = billingInfoObject;
            var deliveryForm = document.getElementById("deliveryInfo");
            
            // Get delivery Form Fieldset and Disable it 

            var deliveryFormFieldset = document.getElementById("billingFormFieldset");
//            document.activeElement.blur();
            billingFormFieldset.disabled = true;
            
            
//            // Hide deliverInfo Form
//            deliveryForm.style.display = "none";
            
            // Summary Data could be used instead of disabled form. 
//            document.getElementById("deliveryInfoSummary").innerHTML =
//                "Name: " + CustomerInfoObject.deliveryInfo.name + "<br/> Address: " +
//                CustomerInfoObject.deliveryInfo.address + "<br/> City: " + CustomerInfoObject.deliveryInfo.city + "<br/> State: " +
//                CustomerInfoObject.deliveryInfo.state + "<br/> ZipCode: " +
//                CustomerInfoObject.deliveryInfo.zip + "<br/> email: " +
//                CustomerInfoObject.deliveryInfo.email;

            document.getElementById("buildOrder_main").style.display = "block";
        }

    } // End validatePersonalInfo 

    // Validation Methods 

    function billValidateName() {
        var billNameInput = document.getElementById("billNameInput");
        if (billNameInput.value == null || billNameInput.value.trim() == "") {
            return "Name is empty. Please enter your name: e.g. (Fred Jones)";
        } else {
            var nameRegEx = /^[a-z ,.'-]+$/i;

            if (!nameRegEx.test(billNameInput.value)) {
                return "Name is invalid. The name must only contain letters";
            }
        }
        return null;
    }

    function billValidateAddress() {
        var addressInput = document.getElementById("billAddressInput");
        if (billAddressInput.value == null || billAddressInput.value.trim() == "") {
            return "Address cannot be blank. Please enter your address";
        }
        return null;
    }

    function billValidateOtherAddress() {
        var billOtherAddressOption = document.getElementById("billShowOtherAddress");
        // Check to see if otherAddressInput has been selected
        if (billOtherAddressOption !== null && billOtherAddressOption !== undefined) {
            var billOtherAddressInput = document.getElementById("billOtherAddress");
            // Validate not blank 
            if (billOtherAddressInput.value == null || billOtherAddressInput.value.trim() == "") {
                return "'Other' Address Type cannot be blank. Please enter a value in 'Other' field or select another 'Address Type'";
            }
        }
        return null;
    }

    function billValidateCity() {
        var billCityInput = document.getElementById("billCityInput");
        if (billCityInput.value == null || billCityInput.value.trim() == "") {
            return "City is invalid";
        }
        return null;
    }

    function billValidateState() {
        var billStateInput = document.getElementById("billStateInput");
        if (stateInput.value == null || stateInput.value.trim() == "") {
            return "State cannot be blank. Please enter two letter state abbreviation (e.g., CA)";
        } else {
            var stateRegEx = new RegExp("^[A-Z][A-Z]", "gmi");
            if (!stateRegEx.test(billStateInput.value)) {
                return "State must be two character state abbreviation (e.g., 'CA', 'AZ', etc)";
            }

        }
        return null;
    }

    function billValidateZip() {
        var billZipInput = document.getElementById("zipInput");
        if (billZipInput.value == null || billZipInput.value.trim() == "") {
            return "Zip cannot be blank. Please enter valid 5 digit Zip code";
        } else {
            var zipRegEx = /^\d{5}$/gmi;
            if (!zipRegEx.test(billZipInput.value)) {
                return "Invalid Zip code entered. Please enter valid 5 digit zipcode";
            }
        }
        return null;
    }

    function billValidateEmail() {
        var billEmailInput = document.getElementById("billEmailInput");
        if (billEmailInput.value == null || billEmailInput.value.trim() == "") {
            return "Email address cannot be empty. Please enter valid email address";
        } else {
            //Simple email expression. Doesn't allow numbers in the domain name and doesn't allow for top level domains that are less than 2 or more than 3 letters (which is fine until they allow more). Doesn't handle multiple &quot;.&quot; in the domain (joe@abc.co.uk).
            var emailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gmi;

            if (!emailRegEx.test(billEmailInput.value)) {

                return "Invalid email address. Please re-enter"
            }
        }
        return null;
    }



    //Create error message string and displayed on screen above form

    function createAndDisplayBillErrorMsgs(billErrorMsgArray) {
 
        if (billErrorMsgArray.length > 0) {
            var i;
            var billErrorMsgsStr = "";
            for (i = 0; i < billErrorMsgArray.length; i += 1) {
                billErrorMsgsStr = billErrorMsgsStr + billErrorMsgArray[i] + "<br/>";
            }
            billErrorMsgElement.innerHTML = billErrorMsgsStr;
            billErrorMsgElement.style.display = "block";


        } else {
            billErrorMsgElement.innerHTML = "";
            billErrorMsgElement.style.display = "none";

        }
    }    
    
    
    
//****************************************************   

} // End init()