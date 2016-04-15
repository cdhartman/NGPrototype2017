//////////////////////////////////////////////////////////////////////////
// This js files creates single DOM Document interface for developers to use 
// in both Internet Explorer 5.0+ (Windows) and Mozilla (The Mozilla browser 
// itself, or Netscape 6.1+). This interface will use both IE's ActiveX approach 
// as well as Mozilla's standards-compliant approach. 
// Because the IE implementation uses ActiveX technology, 
// this will not work on IE for the Mac.



// Most of this code comes from an article written by Nicholas C. Zakas
// and published on:
// http://www.webreference.com/programming/javascript/domwrapper/index.html







//Possible prefixes ActiveX strings for DOM DOcument
var ARR_ACTIVEX = ["MSXML4.DOMDocument", 
				   "MSXML3.DOMDocument", 
				   "MSXML2.DOMDocument", 
				   "MSXML.DOMDocument", 
				   "Microsoft.XmlDom"];

//When the proper prefix is found, store it here
var STR_ACTIVEX = "";

//browser detection
var isIE = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
var isMoz = document.implementation && document.implementation.createDocument;

//-----------------------------------------------------------------
// IE Initialization
//-----------------------------------------------------------------

//if this is IE, determine which string to use
if (isIE) {
    //define found flag
    var bFound = false;
    
    //iterate through strings to determine which one to use 
    for (var i=0; i < ARR_ACTIVEX.length && !bFound; i++) {
    
        //set up try...catch block for trial and error of strings
        try {
        
            //try to create the object, it will cause an error if it doesn't work
            var objXML = new ActiveXObject(ARR_ACTIVEX[i]);
            
            //if it gets to this point, the string worked, so save it and return
            //the DOM Document
            STR_ACTIVEX = ARR_ACTIVEX[i];
            bFound = true                
        
        } catch (objException) { 
        } //End: try
    } //End: for

    //if we didn't find the string, send an error
    if (!bFound)
       throw "No DOM DOcument found on your computer."

} //End: if

//-----------------------------------------------------------------
// Mozilla Initialization
//-----------------------------------------------------------------
if (isMoz) {
    
    //add the loadXML() method to the Document class
    Document.prototype.loadXML = function(strXML) {
    
        //change the readystate
        changeReadyState(this, 1);

        //create a DOMParser
        var objDOMParser = new DOMParser();
        
        //create new document from string
        var objDoc = objDOMParser.parseFromString(strXML, "text/xml");
        
        //make sure to remove all nodes from the document
		while (this.hasChildNodes())
			this.removeChild(this.lastChild);
            
        //add the nodes from the new document
        for (var i=0; i < objDoc.childNodes.length; i++) {
            
            //import the node
            var objImportedNode = this.importNode(objDoc.childNodes[i], true);
            
            //append the child to the current document
            this.appendChild(objImportedNode);
        
        } //End: for
        
        //we can't fire the onload event, so we fake it
        handleOnLoad(this);
        
    } //End: function
    
    //add the getter for the .xml attribute
    Node.prototype.__defineGetter__("xml", _Node_getXML);
    
    //add the readystate attribute for a Document
    Document.prototype.readyState = "0";
    
    //save a reference to the original load() method
    Document.prototype.__load__ = Document.prototype.load;

    //create our own load() method
    Document.prototype.load = _Document_load;
    
    //add the onreadystatechange attribute
    Document.prototype.onreadystatechange = null;
    
    //add the parseError attribute
    Document.prototype.parseError = 0;
    
} //End: if


//-----------------------------------------------------------------
// Factory jsXML
//-----------------------------------------------------------------
// Description
//  This factory will serve as the entry point for other XML-related
//  implementations.
//
// Parameters
//  (none)
//-----------------------------------------------------------------
function jsXML() { }

//-----------------------------------------------------------------
// Function jsXML.createDocument()
//-----------------------------------------------------------------
//
// Description
//  This function creates a XML Document according to which browser
//  is being used.
//
// Parameters
//  strNamespaceURI (String) - the namespace for this document (optional).
//  strRootTagName (String) - the tag name for the documentElement (optional).
//
// Returns
//  The XML Document object that was created.
//-----------------------------------------------------------------
jsXML.createDOMDocument = function(strRootTagName) {

    //variable for the created DOM Document
    var objDOM = null;
    
    //determine if this is a standards-compliant browser like Mozilla
    if (isMoz) {
        //create the DOM Document the standards way
        objDOM = document.implementation.createDocument("", "", null);    
    
        //add the event listener for the load event
        objDOM.addEventListener("load", _Document_onload, false);
		objDOM.loadXML(strRootTagName); 
        
    } else if (isIE) {
		        //create the DOM Document the IE way
        objDOM = new ActiveXObject("Microsoft.XMLDOM");
		objDOM.async="false" 

        //if there is a root tag name, we need to preload the DOM
        if (strRootTagName) {
			objDOM.loadXML(strRootTagName);        
        }
    }
    
    //return the object
    return objDOM;
}

//-----------------------------------------------------------------
// Functon _Node_getXML()
//-----------------------------------------------------------------
//
// Description
//  This is the attribute getter for the .xml attribute.
//
// Parameters
//  (none)
//
// Returns
//  A string with the XML of the Node calling this function.
//-----------------------------------------------------------------
function _Node_getXML() {
    
    //create a new XMLSerializer
    var objXMLSerializer = new XMLSerializer;
    
    //get the XML string
    var strXML = objXMLSerializer.serializeToString(this);
    
    //return the XML string
    return strXML;
}


//-----------------------------------------------------------------
// Function _Document_load()
//-----------------------------------------------------------------
//
// Description
//  This function replaces the native load() method to allow for
//  readyState changes.
//
// Parameters
//  strURL (String) - The XML file to load.
//
// Returns
//  (nothing)
//-----------------------------------------------------------------
function _Document_load(strURL) {

    //set the parseError to 0
    this.parseError = 0;

    //change the readyState
    changeReadyState(this, 1);
    
    //watch for errors
    try {
        //call the original load method
        this.__load__(strURL);
        
    } catch (objException) {
    
        //set the parseError attribute
        this.parseError = -9999999;
        
        //change the readystate
        changeReadyState(this, 4);

    } // End: try...catch
}

//-----------------------------------------------------------------
// Function _Document_onload()
//-----------------------------------------------------------------
//
// Description
//  This function is the event handler for the load event.
//
// Parameters
//  (none)
//
// Returns
//  (nothing)
//-----------------------------------------------------------------
function _Document_onload() {

    //handle the onload event
    handleOnLoad(this);
}

//-----------------------------------------------------------------
// Function handleOnLoad()
//-----------------------------------------------------------------
//
// Description
//  This function handles the load event on the Document object.
//
// Parameters
//  objDOMDocument (Document) - the DOM Document object that has been loaded.
//
// Returns
//  (nothing)
//-----------------------------------------------------------------
function handleOnLoad(objDOMDocument) {
    //check for a parsing error
    if (!objDOMDocument.documentElement || objDOMDocument.documentElement.tagName == "parsererror")
        objDOMDocument.parseError = -9999999;

    //change the readyState
    changeReadyState(objDOMDocument, 4);
}

//-----------------------------------------------------------------
// Function changeReadyState()
//-----------------------------------------------------------------
//
// Description
//  This function changes the readyState of a Document to the desired
//  state and runs any event handler the user has assigned.
//
// Parameters
//  objDOMDocument (Document) - the DOM Document object that has been loaded.
//  iReadyState (int) - the readyState to set the DOM Document to.
//
// Returns
//  (nothing)
//-----------------------------------------------------------------
function changeReadyState(objDOMDocument, iReadyState) {

    //change the readyState
    objDOMDocument.readyState = iReadyState;
    
    //if there is an onreadystatechange event handler, run it
    if (objDOMDocument.onreadystatechange != null && typeof objDOMDocument.onreadystatechange == "function")
        objDOMDocument.onreadystatechange();
}
//-----------------------------------------------------------------
// Function ReplaceSpecialChars(InputString)
//-----------------------------------------------------------------
//
// Description
//  This function searches through the input string and replaces any special
//  characters (& < > ' ") with their necessary XML equivalent:
//  & (ampersand) 		becomes 	"&amp;"
//  < (less than)		becomes	        "&lt;"
//  < (greater than)	        becomes	        "&gt;"
//  ' (apostrophe)		becomes         "&apos;"
//  " (quotation)		becomes	        "&quot;"
//
// Parameters
//  InputString: ascii input
//
// Returns
//  OutputString: InputString  with any substitutions
//-----------------------------------------------------------------
function ReplaceSpecialChars (InputString) {
	var OutputString = "";

	for (i = 0; i < InputString.length; i++) {
		substr = InputString.charAt(i);
		if (substr == "&") {
			OutputString += "&amp;";
		} else if (substr == "<") {
			OutputString += "&lt;";
		} else if (substr == ">") {
			OutputString += "&gt;";
		} else if (substr == "'") {
			OutputString += "&apos;";
		} else if (substr == '"') {
			OutputString += "&quot;";
		} else { 
			OutputString += substr;
		}
	}

	return OutputString;
}
//-----------------------------------------------------------------
// Function SendHEWCommand (MessageId, XMLCommandString, CallbackName)
//-----------------------------------------------------------------
// 
// Description
//  Sends a command via the status bar to the HEW system.
//
// Parameters
//  MessageId: A unique identifier for this message. 
//	       This is a 64 bit integer as a string
//
//  XMLCommandString: The XML command string that will 
//	              be processed by the HEW system.
//
//  CallbackName: The name of the callback routine that 
//                the HEW system will call with a response to this request.
//
// Returns
//  OutputString: InputString  with any substitutions
//-----------------------------------------------------------------
function SendHEWCommand (MessageId, XMLCommandString, CallbackName) {

	var MsgShell1  = "ictvcmd(";
	// msgid will go here;
	var MsgShell2 = "):SendCommand(";
	// specific command name will go here
	var MsgShell3 = ","
	// callback will go here
	var MsgShell4 = ")";

	//Send the command via the status bar.
	window.status = MsgShell1 + MessageId + MsgShell2 + XMLCommandString + MsgShell3 + CallbackName + MsgShell4;

	//Clear the status bar
	window.status = "";
	
}
