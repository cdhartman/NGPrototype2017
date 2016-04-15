// ICTV requires using the above HEWXMLWrapper.js file when using ICTV XML commands.  
// This js file creates a single DOM Document interface for developers to use 
// in both Internet Explorer 5.0+ (Windows) and Mozilla (The Mozilla browser 
// itself, or Netscape 6.1+). This interface will use both IE's ActiveX approach 
// as well as Mozilla's standards-compliant approach. 
// Because the IE implementation uses ActiveX technology, 
// this will not work on IE for the Mac.

var MsgIdSent;

// create messaged shell strings to assemble an ICTV command message
MsgShellEndSession = "<HEW_COMMAND><COMMAND_NAME>END_HEW_SESSION</COMMAND_NAME>";
MsgShellEnd = "</HEW_COMMAND>";

function EndSession() {
  // blank out any previous result in the output fields
  //document.outputForm.ResultStatusField.value = "";
  //document.outputForm.OutFieldTextBox.value = "";
  // MsgId will be used as the message Id value for each ICTV command message
  var MsgId = new Date();
  // save the message Id (MsgId)
  MsgIdSent=MsgId.valueOf();
  // Assemble the ICTV command message
  XMLCommand = MsgShellEndSession + MsgShellEnd;
  SendHEWCommand(MsgIdSent, XMLCommand, "GenericCallBack");  
  
}

SUCCESS="SUCCESS";

function GenericCallBack (MessageId, XMLString) {
	//document.outputForm.ResultStatusField.value = XMLString;

	if (MessageId != MsgIdSent) {
		alert ("Message Id received (" + MessageId + ")  NOT EQUAL  to Message Id sent (" + MsgIdSent + ")");
		return;
	}		

	var xmlDoc = jsXML.createDOMDocument(XMLString);

	var StatusList 		= xmlDoc.getElementsByTagName("STATUS");
	var FunctionList 	= xmlDoc.getElementsByTagName("RESPONSE");

	document.outputForm.OutFieldTextBox.value = StatusList[0].firstChild.nodeValue;

	
	if ((StatusList.length != 1) || (FunctionList.length != 1)) {
		alert ("Message Id " + MsgIdSent + " received an invalid formatted response");
		return;
	}
	
	if (StatusList[0].firstChild.nodeValue != SUCCESS) {
		alert("Message Id " + MsgIdSent + " received an error <STATUS> = " + StatusList[0].firstChild.nodeValue);
		return;
	}
		
}

// message id will go here
MsgShell2 = "<HEW_COMMAND><COMMAND_NAME>GET_HEW_SETTOP_ID</COMMAND_NAME>";
MsgShell3 = "</HEW_COMMAND>";

var MySetTopID = "";

function GetHEWSettopId() {	
  // MsgId will be used as the message Id value for each ICTV command message
  // We use the Date() function to create unigue a MsgId for each message
  var MsgId = new Date();
  // save the message Id (MsgId)
  MsgIdSent=MsgId.valueOf();
  // Assemble the ICTV command message
  // Assemble the command
  XMLCommand =  MsgShell2 + MsgShell3;
  SendHEWCommand(MsgIdSent, XMLCommand, "GenericCallBack2");  
}

function GenericCallBack2 (MessageId, XMLString) {
	if (MessageId != MsgIdSent) {
		alert ("Message Id received (" + MessageId + ")  NOT EQUAL  to Message Id sent (" + MsgIdSent + ")");
		return;
	}		

	// Here we create the XML document using the HEWXMLWrapper.js class
	var xmlDoc = jsXML.createDOMDocument(XMLString);

	var StatusList 		= xmlDoc.getElementsByTagName("STATUS");
	var FunctionList 	= xmlDoc.getElementsByTagName("RESPONSE");
	var SettopId = xmlDoc.getElementsByTagName("SETTOP_ID");
	this.MySetTopID = SettopId[0].firstChild.nodeValue;		
}


// DebugCallBack is a optional function 
// It will be called when certain errors
// occur or when the Callback function name
// is not available on the HTML page
function DebugCallBack (Response) {
	//alert ("DebugCallBack: Response = " + Response);
}

function ForwardWithIDAndQuery(nextUrl) {
	var settopid = getMacAddress(), generatedURLAttach = '', mode = getURLParameter('mode', 'default');
	if (nextUrl.indexOf("?") !=-1) {
		generatedURLAttach = "&screenFormat="+screenFormat + '&settopid=' + settopid + '&mode=' + mode;
	} else {
		generatedURLAttach = "?screenFormat="+screenFormat + '&settopid=' + settopid + '&mode=' + mode;
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

function ForwardWithGameID(nextUrl) {
	GetHEWSettopId();
	var generatedURLAttach = "&settopid="+MySetTopID;
	executeForward(nextUrl+generatedURLAttach);
}

function executeForward(nextUrl) {
	location.href=nextUrl;
}

function genMAC() {
	GetHEWSettopId();
}
var xmlDoc;
/******************************************************************************/
function loadXML(loc, func) // XML Loading Function
{
// code for IE
if (window.ActiveXObject)
  {
	//CHANGED : 12/17/2013 Nik Coates- added try/catch block and logging	
	try {
	  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  xmlDoc.async=false;
	  xmlDoc.load(loc);
	  func();
  	} catch (e) {
	  HEW.log(e.message);
  	}
	//END CHANGED  	
  }
// code for Mozilla, Firefox, Opera, etc.
else if (document.implementation &&
document.implementation.createDocument)
  {
  xmlDoc=document.implementation.createDocument("","",null);
  xmlDoc.load(loc);
  xmlDoc.onload=func;
  }
else
  {
  alert('Your browser cannot handle this script');
  }
}

var defaultVal = "Default"; //the value that will be used if an element is empty

/******************************************************************************/

function parseIt() //Parsing Function added 12/05/07
{
	
	var loc= xpathFindLocationByMac(getMAC());		
		//alert(loc); // OBJECT or NULL 
		if(loc == null)
			{
			//GenPatientLinks();
			alert("Not In DB or DB not found! Phone 507 538 4525"); 
			//window.open('http://www.google.com');
			//break; 
			}
      
		else
			{
				var kids = loc.childNodes; //create a shorthand for locations[i].childNodes
				for(var i=0; i<kids.length; i++) //loop through the childnodes of this location
				
				
				if(kids[i].nodeType == 1) //is this a 'tag' element
				{	
				var val = kids[i].childNodes[0].nodeValue; //get the text value contained within the element
				//alert(val);  
				var innards = document.createElement('font');
				innards.className = 'items';
				//alert(kids[i].tagName);
				if(!isTier(kids[i].tagName)) //are we processing "preference" nodes?
                      
				{		
					//not a Tier node Put some code here
					//appendSimpleDiv(j+1, innards.appendChild(document.createTextNode(val)));
				}
				
				else  //this is a Tier node
					{
					//alert("Tag= " + kids[i].tagName); // Should be Tier
					//alert("Tier= " + val); //Tier value
					if(testTier(val))
		
						{
							GenPatientLinks();
							//document.write("This Works");
						}
										
					if(activityTier(val))
						{
							//alert("This Works");
							GenActivityLinks();
							
						}
                  
						break; //remove this if the XML can contian the same mac address more than once
					//if(val != null && val.length > 0 && val != defaultVal) //if no value use default

					}
				}		
			}
}

/******************************************************************************/
/*
Dynamic Client Tiering Legend	
IP		Inpatient
OP		Outpatient
IPPEDM	Inpatient Pediatrics with Movies
OPPEDM	Outpatient Pediatrics with Movies
IPPED		Inpatient Pediatrics without Movies
OPPED	Outpatient Pediatrics without Movies
PE		Patient Education
IPAP		Inpatient Activities Pilot
INST		Institutional Meeting Room
DEPT		Departmental Meeting Room
DEV		Developmental

*/

function isTier(tagname)
{
    var isTier;
    if(tagname.match(/^Tier/))
    {
          isTier = true;
    }
    else
    {
          isTier = false;
    }
   //alert("Is Tier= " + isTier); 
    return isTier;
}

function testTier(tier)
{
      var rval = false;
      
           //alert(tier); 
	    
	if(tier != null && tier.match(/^DEV$|^PE$|^IP$|^OP$|^IPAP$|^IPPEDM$|^OPPEDM$|^RESLOUNGE$/i)) // Verify Logic (/^Developmental$|^PatientEd$|^Inpatient$|^Outpatient$/i)
	
	{   	
                  rval = true
	}
      
           //alert("Generate Patient Links = " + rval) 
      return rval;
}


function activityTier(tier)
{
      var rval = false;
      
           //alert(tier); 
		//alert(rval);
	if(tier != null && tier.match(/^DEV$|^IPAP$/i)) // Verify Logic For Activities Pilot Links	
	{   	
                  rval = true
	}
      
           //alert("Generate Activity Links = " + rval);
      return rval;
}


/******************************************************************************/

function getMAC()
{
	//return "0011E603D552"; // Staff Clinic SS 2-524 Departmental
	//return "001947D2D5F0"; // Staff Clinic MA 16-10 Departmental
	//return "001947F851F8"; // Staff Clinic Hub RMH CO 5-11 1 Developmental
	//return "001947F8556C"; // Staff SMH Hub RMH CO 5-11 3 Developmental
	//return "0014F86DE460"; // Rehabilitation SMH MB 3-610 A Inpatient
	//return "0014F86DE522"; // PCIM/Hospice SMH JO 3-200 B Inpatient
	//return "000A733497A4"; // Staff SMH DO M-127 Institutional
	//return "000A7334985C"; // Staff Clinic BA 1-507 Institutional
	//return "000A7334919A"; // Cancer Center Clinic GO 10-406 E Outpatient
	//return "000A73348BB4"; // Dialysis Clinic NE  LL-130-20 Outpatient
	//return "001947D2D400"; // Lobby Clinic GO 15-007-2   PatientEd
	//return "0014F86DF704"; // Lobby RMH CN L-82 PatientEd
	//return "001947F9113E"; // 58" Plasma
	//return "00407BE52BD8"; // Crash Cart
	//return "0011E6170FFE"; // RMH Dermatology Activities Pilot
	
	//CHANGED - 3/13/2014 - Nik Coates - commented out the call to 
	//getSettopId() and hardcoded the MAC address of the settop box in OE 5-20
	//TODO: remove debug values
	// stbID="001947D1158C"
    var stbID=HEW.getSettopId();

    //END CHANGE
    var stbmac = (stbID != null)?stbID.replace(/^0x/i,''):stbID;
	// alert(stbmac);
    return stbmac;
}

/******************************************************************************/
/*
 * create a div with the supplied arguments
 * and append it to the html document body
 */
function xpathFindLocationByMac(macAddress)
{
      var xPath = "/STBs/Locations[MACAddress='" + macAddress + "']";     
      return xmlDoc.selectSingleNode(xPath);
}


/******************************************************************************/

      function makeDiv(index, hrf, txt)
      {
            var box = document.createElement('div');
            var itm = document.createElement('font');
            var lnk = document.createElement('a');
            var tn = document.createTextNode(txt);
            var cls = 'box' + index;
            var ident = 'Button' + index;
            box.appendChild(itm);
            itm.appendChild(lnk);
            lnk.appendChild(tn);
            box.className = cls;
            itm.className = 'items';
            lnk.className = 'items'
            lnk.href=hrf;      
            lnk.id = ident;
            return box;
      }
/******************************************************************************/



      function GenPatientLinks()
      {
            var div1 = makeDiv(3, "javascript:ForwardWithID('movies');","Complimentary Movies");
		appendToContainer(div1);
            var div2 = makeDiv(4,"javascript:executeForward('PatientServices/index.html');", "Patient Services"); 
	        appendToContainer(div2); 

	}


	function GenActivityLinks()

	{
		//alert("Entry to GenActivityLinks Works");
		var div3 = makeDiv(5,"javascript:ForwardWithGameID('http://mayo1.net4tv.com/mayo.php?R=1');", "Activities");
		appendToContainer(div3);
		//alert("Exit to GenActivityLinks Works");
	}

/******************************************************************************/
    function appendToContainer(el)
	{

		var container = document.getElementById('container');
		//alert("Container= " +container); // For Debugging
		if(container != null)
		
		
		
		{
			var last;
			if(container.lastChild.nodeType == 1)
			{
				last = container.lastChild;
			}
			else
			{
				var kids = container.childNodes;
				if(kids.length > 0)
				{
					for(var i=(kids.length -1); i>=0; i--)
					{
						if(kids[i].nodeType == 1)
						{
							last = kids[i];
							break;
						}
					}
				}
			}
			if(last != null)
				container.insertBefore(el, last);
		}
	} 
/******************************************************************************/