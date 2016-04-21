function ForwardWithIDAndQuery(nextUrl) {
	var generatedURLAttach = '', mode = getURLParameter('mode', 'default');
	if (nextUrl.indexOf("?") !=-1) {
		generatedURLAttach = "&screenFormat="+screenFormat + '&mode=' + mode;
	} else {
		generatedURLAttach = "?screenFormat="+screenFormat + '&mode=' + mode;
	}
	executeForward(nextUrl+generatedURLAttach);
}

function ForwardWithID(nextUrl) { 
	var settopid = getMacAddress(), generatedURLAttach = '', mode = getURLParameter('mode', 'default');
	if (nextUrl.indexOf("?") !=-1) {
		generatedURLAttach = "&screenFormat=" + screenFormat + '&settopid=' + settopid + '&mode=' + mode;
	} else {
		generatedURLAttach = "?screenFormat=" + screenFormat + '&settopid=' + settopid + '&mode=' + mode;
	}
	executeForward(nextUrl + generatedURLAttach);
}


function executeForward(nextUrl) {
	location.href=nextUrl;
}