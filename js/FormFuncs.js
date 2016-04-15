function validate() {
	bValidForm = true;
	// alert(FORM_DIGIT1.value+FORM_DIGIT2.value+FORM_DIGIT3.value+FORM_DIGIT4.value);
	checkRequired(document.frmPass.FORM_DIGIT1, "Enter 1st digit of password");
	checkRequired(document.frmPass.FORM_DIGIT2, "Enter 2nd digit of password");
	checkRequired(document.frmPass.FORM_DIGIT3, "Enter 3rd digit of password");
	checkRequired(document.frmPass.FORM_DIGIT4, "Enter 4th digit of password");
	checkNumeric(document.frmPass.FORM_DIGIT1, "1st digit of must be numeric");
	checkNumeric(document.frmPass.FORM_DIGIT2, "2nd digit of must be numeric");
	checkNumeric(document.frmPass.FORM_DIGIT3, "3rd digit of must be numeric");
	checkNumeric(document.frmPass.FORM_DIGIT4, "4th digit of must be numeric");

	if (checkPass()) {
		return true;
	} else {
		return false;
	}
}

function checkPass() {
	var f, passwd;
	f = document.frmPass;
	passwd = f.FORM_DIGIT1.value + f.FORM_DIGIT2.value + f.FORM_DIGIT3.value + f.FORM_DIGIT4.value;
	if (passwd === "2004" || passwd === "2015") {
		return true;
	} else {
		failedLogin = failedLogin + 1;
		document.frmPass['FORM_DIGIT1'].focus();
		document.frmPass['FORM_DIGIT1'].select();
		if (failedLogin > maxFailedLogin) {
			f.action = "passerror";
			f.submit();
		}
		document.getElementById("errorMsg").innerHTML = "<font class='error'>Please ask a staff member to assist you.</font>";
		return false;
	}
}

function go() {
	var doc = document.forms[0];
	if (validate()) {
		callMovie();
	}
}


function advance(c, n, p) {
	currentField = c, nextField = n, prevField = p;
	setTimeout('nexteffect()', 1);
}

function mybackspacehandler(p) {
	prevField = p;
	if (window.event && window.event.keyCode === 8) {
		document.frmPass[prevField].focus();
		document.frmPass[prevField].select();
	}
}

function backeffect() {
	document.frmPass[prevField].focus();
	document.frmPass[prevField].select();
}

function nexteffect() {
	if (currentField.value.length === 1) {
		document.frmPass[nextField].focus();
		document.frmPass[nextField].select();
	} else {
		currentField.focus();
	}
}

function callMovie() {
	location.href = "../playTitle.html?offering=" + getURLParameter('offeringId', '');
}

//******************************
function setFocus(formObj) {
//******************************
	formObj.focus();
	formObj.select();
}

//******************************
function emptyField(textObj) {
//******************************
	var i, ch;
	if (textObj.value.length === 0) return true;
	for (i = 0; i < textObj.value.length; ++i) {
		ch = textObj.value.charAt(i);
		if (ch !== ' ' && ch !== '\t') return false;
	}
	return true;
}

//******************************
function checkRequired(pElement, pMsg) {
//******************************
	if (bValidForm) {
		if (emptyField(pElement)) {
			handleFormError(pElement, pMsg);
		}
	}
}

//******************************
function checkSelectRequired(pElement, pMsg) {
//******************************
	if (bValidForm) {
		if ((pElement.selectedIndex === 0) || (pElement.options(pElement.selectedIndex).value === "")) {
			bValidForm = false;
			alert(pMsg);
			pElement.focus();
		}
	}
}

//******************************
function checkNumeric(pElement, pMsg) {
//******************************
	if (bValidForm) {
		if (isNaN(pElement.value)) {
			handleFormError(pElement, pMsg);
		}
	}
}

//******************************
function checkLength(pElement, pLength, pMsg) {
//******************************
	if (bValidForm) {
		if (pElement.value.length < pLength) {
		handleFormError(pElement, pMsg);
		}
	}
}

//******************************
function checkEmail(pElement, pMsg) {
//******************************
	if (bValidForm) {
		var strEmailAddress = pElement.value, locAt, locPeriod, okEmail;
		locAt = strEmailAddress.indexOf("@");
		okEmail = ((locAt !== -1) && (locAt !== 0) && (locAt !== (strEmailAddress.length - 1)) && (strEmailAddress.indexOf("@", locAt + 1) === -1));
		if (okEmail) {
			// so far, so good		
			locPeriod = strEmailAddress.indexOf(".", locAt);
			okEmail = ((locPeriod !== -1) && (locPeriod !== (strEmailAddress.length - 1)) && (locPeriod > locAt));
		}
		if (!okEmail) {
			handleFormError(pElement, pMsg);
		}
	}
}

//******************************
function handleFormError(pElement, pMsg) {
//******************************
	bValidForm = false;
	alert(pMsg);
	pElement.focus();
	pElement.select();
}