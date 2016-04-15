/******************************************************************************
*  
* :FILE: HEWCommands.js
*  
*******************************************************************************
*  
*  Copyright (C) 2005 ICTV Inc. Reproduction in whole or in part
*  without written permission is prohibited.  All rights reserved
*  
*******************************************************************************
*  
* :DESCRIPTION:
*	Classes that provide access to the HEW commands.
*  
* :CLASSES:
*	HEWCommand - The XML command class.  
*	HEWCommunicator - The static class to handle communication between 
*		JavaScript, Flash and the HEW browser.
*	HEW - The static class with all the actual HEW commands.
*	HEWKeyConfiguration - Class for specifying key configurations
*	
*******************************************************************************
* :VERSION:  1.03
******************************************************************************/

/*----------------------------------------------------------------------------\
| :CLASS: HEWCommand
|------------------------------------------------------------------------------
| 
| :DESCRIPTION: 
|	The HEWCommand class provides the functionality to convert the object to
|	and from XML as well as executing a command.
|
| :ARGUMENTS:
|   xml (in) - The XML to initialize the object with.  This will parse the XML 
|		and create properties on the instance for all the elements.  An 
|		exception is thrown if there are any problems working with the XML.
|		At the minimum this should be your document root.
| 
| :METHODS:
|	getDocumentElement - Returns the document root being used for the object.
|
|	toString - Converts the object to a string.  If the object represents a
|		HEW_RESPONSE and an error occurred, it will return an error message.
|		Otherwise, it returns the object as XML by calling the toXML command.
|
|	execute - Issues the command.  If an error occurs an exception is thrown.
|
|	toXML - Converts the object to an XML string.
| 
\----------------------------------------------------------------------------*/
function HEWCommand(xml)
{
	// At minimum the document element is required
	if(arguments.length == 0)
	{
		throw "HEWCommand constructor missing argument";
	}

	// Function to unescape strings from XML
	function unescapeXML(str)
	{
		return str.replace(/&amp;/g, "&").
				replace(/&lt;/g, "<").
				replace(/&gt;/g, ">").
				replace(/&apos;/g, "'").
				replace(/&quot;/g, '"');
	}

	// Convert an XML node to an object
	function nodeToObj(obj, parent)
	{
		for(var node = parent.firstChild; node != null; node = node.nextSibling)
		{
			// Only interested in "element" nodes
			if(node.nodeType != 1) 
				continue;

			var newVal = null;
			// Does it just contain a text node?
			if(node.childNodes.length == 1 && node.firstChild.nodeType == 3)
			{
				// Yes, so use it as the value
				newVal = unescapeXML(node.firstChild.nodeValue);
			}
			else if(node.hasChildNodes())
			{
				// No, so construct a new object and recursively call this 
				// method
				newVal = new Object();
				nodeToObj(newVal, node);
			}

			// If we already have a property with the name, then we have an
			// array of elements.  Put it in an array if that is the case.
			var curVal = obj[node.nodeName];
			switch(typeof(curVal))
			{
				case "undefined":	// Property doesn't exist.
					obj[node.nodeName] = newVal;
					break;

				case "object":		// Property is already an object
					if(curVal.constructor == Array)
					{
						// It's already an array, so just add the new value
						curVal.push(newVal);
						break;
					}
					// fallthrough
				default:
					// Create a new array and add the original value and the
					// new value to the array.
					var newArray = new Array();
					newArray.push(curVal);
					newArray.push(newVal);
					obj[node.nodeName] = newArray;
					break;
			}
		}
	}

	// Create the XML document 
	var xmlDoc = null;
	try
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false" 
	}
	catch(e)
	{
		// Not in IE or HEW session (We'll catch running in IE later on)
		throw "Not in HEW session.";
	}
	// Load the xml
	if(!xmlDoc.loadXML(xml))
	{	
		// error parsing xml
		throw "Error parsing XML.  " + xmlDoc.parseError.reason;
	}
	// Convert the xml to properties
	nodeToObj(this, xmlDoc.documentElement);

	// Set the root to the document element
	this.m_root = xmlDoc.documentElement.nodeName;
}

HEWCommand.prototype.getDocumentElement = function()
{
	return this.m_root;
}

HEWCommand.prototype.toString = function()
{
	// See if this is an error on a response.
	if(this.m_root == "HEW_RESPONSE" && this.STATUS != "SUCCESS")
	{
		// It is, so construct an error message.
		var ret =	"An error occurred when executing the command '" + 
					this.RESPONSE + "'.  STATUS: " + this.STATUS;
		if(typeof(this.ERROR_MSG) == "string")
		{
			ret += " MSG: '" + this.ERROR_MSG + "'";
		}
		return ret;
	}

	// If not an error, then just return the XML
	return this.toXML();
}

HEWCommand.prototype.execute = function()
{
	// Convert this to xml and send it
	var xml = HEWCommunicator.sendCommand(this.toXML());

	// Create the response from the resulting xml
	var response = new HEWCommand(xml);

	// Make sure the RESPONSE member is filled in
	if(typeof(response.RESPONSE) != "string")
	{
		// It it wasn't make it the same as the COMMAND_NAME
		response.RESPONSE = this.COMMAND_NAME;
	}

	// If it isn't successful, then throw an exception
	if(response.STATUS != "SUCCESS")
	{
		throw response;
	}

	return response;
}

HEWCommand.prototype.toXML = function()
{
	// Escape a string so it doesn't interfere with XML parsing
	function escapeXML(str)
	{
		return	str.replace(/&/g, "&amp;").
				replace(/</g, "&lt;").
				replace(/>/g, "&gt;").
				replace(/'/g, "&apos;").
				replace(/"/g, "&quot;");
	}

	// Convert an object to XML.
	function objToXML(obj)
	{
		var xmlStr = "";

		// Go through each property the object has
		for(var prop in obj) 
		{	
			// Ignore data members that begin with "m_"
			if(prop.indexOf("m_") == 0)
				continue;

			var val = obj[prop];
			switch(typeof(val))
			{
			case "string":
				val = escapeXML(val);
			case "number":
			case "boolean":
				xmlStr += "<" + prop + ">" + val + "</" + prop + ">";
				break;

			case "object":
				if(val.constructor == Array)
				{
					for(var i = 0; i < val.length; ++i)
					{
						xmlStr += "<" + prop + ">";
						switch(typeof(val[i]))
						{
						case "object":
							xmlStr += objToXML(val[i]);
							break;

						case "string":
							xmlStr += escapeXML(val[i]);
							break;

						default:
							xmlStr += val[i];
							break;
						}
						
						xmlStr += "</" + prop + ">";
					}
				}
				else
				{
					xmlStr += "<" + prop + ">" + objToXML(val) + 
							  "</" + prop + ">";
				}
				break;

			default:
				// ignore
				break;
			}
		}

		return xmlStr;
	}

	return "<" + this.m_root + ">" + objToXML(this) + "</" + this.m_root + ">";
}

/*----------------------------------------------------------------------------\
| :CLASS:  HEWCommunicator
|------------------------------------------------------------------------------
| 
| :DESCRIPTION: 
|	A static class that handles sending XML to WebUI and returning the response
|	to either JavaScript or Flash.
|
| :METHODS:
|	sendCommand(xml) - Sends an XML command to WebUI and returns the response.
|	commandCallback(id, response) - Catches the response from sent command.
|	attachToFlash(name) - Attaches the communicator to a flash instance.
|	handleFSCommand(command, args) - Handles the fscommand from Flash.
|
\----------------------------------------------------------------------------*/
function HEWCommunicator() {}

// class data
HEWCommunicator.s_lastCommandId = Math.round(Math.random()*10000);
HEWCommunicator.s_response = null;
HEWCommunicator.s_flashName = null;

HEWCommunicator.sendCommand = function(xml)
{
	var cmdId = ++HEWCommunicator.s_lastCommandId;
	if(cmdId == 0)
	{
		// To avoid a problem when passing a 0 as the command id.
		cmdId = ++HEWCommunicator.s_lastCommandId;
	}

	// Intiialize the response to handle not getting one.  If not running in 
	// the CDK or a session, this will not change after we issue the command.  
	HEWCommunicator.s_response = "<HEW_RESPONSE><STATUS>SYSTEM_ERROR</STATUS>" +
		"<ERROR_MSG>Not in a HEW Session.</ERROR_MSG></HEW_RESPONSE>";

	//Send the command via the window status
	window.status = "ictvcmd(" + cmdId + "):SendCommand(" + xml + 
		",HEWCommunicator__commandCallback)";
	// Clear the window status
	window.status = "";

	// If the response is identical to the request, then it is not a recognized
	// command.
	if(HEWCommunicator.s_response == xml)
	{
		HEWCommunicator.s_response = 
			"<HEW_RESPONSE><STATUS>SYSTEM_ERROR</STATUS>" +
			"<ERROR_MSG>Command unrecognized.</ERROR_MSG></HEW_RESPONSE>";
	}
	return HEWCommunicator.s_response;
}

function HEWCommunicator__commandCallback(id, response) 
{
	if(id != HEWCommunicator.s_lastCommandId)
	{
		// Id doesn't match.  Create the error XML string.
		HEWCommunicator.s_response = 
			"<HEW_RESPONSE><STATUS>SYSTEM_ERROR</STATUS>" +
			"<ERROR_MSG>Response id doesn't match command id.</ERROR_MSG>" +
			"<ID>" + id + "</ID><RESPONSE_XML>" + response + 
			"</RESPONSE_XML></HEW_RESPONSE>";
	}
	else
	{
		HEWCommunicator.s_response = response;
	}
}

HEWCommunicator.attachToFlash = function(name, genFSHandler)
{
	if(HEWCommunicator.s_flashName != null)
		throw "Can only attach to one flash object";
	
	// Handle default value of true for genFSHandler argument
	if(arguments.length < 2)
		genFSHandler = true;

	HEWCommunicator.s_flashName = name;

	// Write the fscommand handler if it hasn't already been done
	if(genFSHandler)
	{
		// Write out the vb script to handle the FSCommand.
		document.write("<script language='VBScript'>\n");
		document.write("On Error Resume Next\n");
		document.write("Sub "+name+"_FSCommand(ByVal command, ByVal args)\n");
		document.write("Call HEWCommunicator.handleFSCommand(command, args)\n");
		document.write("End Sub\n");
		document.write("</script>\n");
	}
}

HEWCommunicator.handleFSCommand = function(command, args)
{
	// Pass non-hew commands off to the handler.
	if(command != "hew")
	{
		// Pass the command to the handler
		HEWCommunicator.onFSCommand(command, args);
		return;
	}

	// Handle special "focus" command
	if((command == "ictvcmd" && args == "focus") || 
	   (command == "hew" && args == "focus()"))
	{
		HEW.focus();
		return;
	}

	var response = "";
	try
	{
		// Execute the function
		eval("HEW." + args);

		// Grab the s_response property.  This will contain the XML 
		// response which is what we want to return to Flash.
		response = HEWCommunicator.s_response;
	}
	catch(e)
	{
		if(e instanceof HEWCommand)
		{
			// Get the XML of the response
			//response = e.toXML();
			response = HEWCommunicator.s_response;
		}
		else 
		{
			var err = e;
			if(err == "[object Error]")
				err = "Error executing command: '" + args + "'";
			response = "<HEW_RESPONSE><STATUS>SYSTEM_ERROR</STATUS>" +
				"<ERROR_MSG>" + err + "</ERROR_MSG></HEW_RESPONSE>";
		}
	}

	// Return the response to the flash object
	var flashObj = document.all[HEWCommunicator.s_flashName];
	flashObj.SetVariable("_level0.HEW.response", response);
}

HEWCommunicator.onFSCommand = function(command, args) {}

/*----------------------------------------------------------------------------\
| :CLASS:  HEWKeyConfiguration
|------------------------------------------------------------------------------
| 
| :DESCRIPTION: 
|	Class used to specify key configurations.  
|	Used in HEW.configureFunctionKeysEx.
|
| :METHODS:
|	addKey(key, device, func, modifiers) - Adds a key to configure.
|		see content documentation for valid values of the parameters. 
|		modifiers is an optional string, if you specify multiple modifiers, 
|		separate them with the '|' character.  e.g. "ALT_KEY|SHIFT_KEY"
|
\----------------------------------------------------------------------------*/
function HEWKeyConfiguration()
{
	this.m_keys = new Array();
}

HEWKeyConfiguration.prototype.addKey = function(key, device, func, modifiers)
{
	var obj = new Object();

	obj.FUNCTION_KEY = key;
	if(arguments.length > 3)
	{
		obj.MODIFYING_KEY = modifiers.split('|');
	}
	obj.INPUT_DEVICE = device;
	obj.FUNCTION = func;

	this.m_keys.push(obj);
}


/*----------------------------------------------------------------------------\
| :CLASS:  HEWSoundEtries
|------------------------------------------------------------------------------
| 
| :DESCRIPTION: 
|	Class used to specify sound entries.  
|	Used in HEW.controlSounds.
|
| :METHODS:
|	addSoundEntry(soundId, soundState) - Adds a sound entry to contol (change).
|		see content documentation for valid values of the parameters. 
|
\----------------------------------------------------------------------------*/
function HEWSoundEtries()
{
	this.m_SoundEtries = new Array();
}

HEWSoundEtries.prototype.addSoundEntry = function(soundId, soundState)
{
	var obj = new Object();

	obj.SOUND_ID = soundId;

	obj.SOUND_STATE = soundState;

	this.m_SoundEtries.push(obj);

}
/*----------------------------------------------------------------------------\
| :CLASS:  HEW
|------------------------------------------------------------------------------
| 
| :DESCRIPTION: 
|	Static class with all the HEW methods.
|
| :METHODS:
|	See content documentation for descriptions of all the commands.
|
\----------------------------------------------------------------------------*/
function HEW() {}

HEW.addFavorite = function(UrlName, url)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "ADD_HEW_FAVORITE";
	cmd.FAVORITE_TITLE = UrlName;
	cmd.FAVORITE_URL = url;
	
	return cmd.execute().FAVORITE_ID;
}

HEW.addUser = function( userName, screenName, password, secretWord, hint, 
						urlFilterLevelName, tabIconOption, 
						tabDisplayDuration, masterSubscriberId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "ADD_HEW_USER";
	cmd.ACCOUNT_ID = userName;
	cmd.SCREEN_NAME = screenName;
	cmd.PASSWORD = password;
	cmd.SECRET_WORD = secretWord;
	cmd.USER_HINT = hint;
	cmd.URL_FILTER_LEVEL_NAME = urlFilterLevelName;
	cmd.TAB_ICON = tabIconOption;
	cmd.TAB_AUTO_TIME_OUT = tabDisplayDuration;
	cmd.MASTER_SUBSCRIBER_ID = masterSubscriberId;

	return parseInt(cmd.execute().SUBSCRIBER_ID);
}
	
HEW.boink = function(soundId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "BOINK_HEW";
	cmd.BOINK_SOUND_ID = soundId;
	
	cmd.execute();
}

HEW.clearCookies = function(indicator)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "CLEAR_HEW_COOKIES";
	cmd.CLEAR_COOKIE_INDICATOR = indicator;
	
	cmd.execute();
}

HEW.closeThisView = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "CLOSE_HEW_THIS_VIEW";
	
	cmd.execute();
}

HEW.configureFunctionKey = function(key, device, func, modifiers)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "CONFIGURE_HEW_FUNCTION_KEYS_EX";

	var obj = new Object();

	obj.FUNCTION_KEY = key;
	if(arguments.length > 3)
	{
		obj.MODIFYING_KEY = modifiers.split('|');
	}
	obj.INPUT_DEVICE = device;
	obj.FUNCTION = func;

	cmd.KEY_CONFIGURATION = obj;

	cmd.execute();
}

HEW.configureFunctionKeysEx = function(keyConfigs)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "CONFIGURE_HEW_FUNCTION_KEYS_EX";
	cmd.KEY_CONFIGURATION = new Array();

	for(var i = 0; i < keyConfigs.m_keys.length; ++i)
	{
		cmd.KEY_CONFIGURATION.push(keyConfigs.m_keys[i]);
	}

	cmd.execute();
}

HEW.deleteFavorite = function(favoriteId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DELETE_HEW_FAVORITE";
	cmd.FAVORITE_ID = favoriteId;
	
	cmd.execute();
}

HEW.deleteAllFavorites  = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DELETE_HEW_ALL_FAVORITES";
	
	cmd.execute();
}

HEW.deleteUser = function(subscriberId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DELETE_HEW_USER";
	cmd.SUBSCRIBER_ID = subscriberId;
	
	cmd.execute();
}

HEW.disableColorSubstitution = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DISABLE_HEW_COLOR_SUBSTITUTION";
	
	cmd.execute();
}

HEW.disableSettopEncryption = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DISABLE_HEW_SETTOP_ENCRYPTION";
	
	cmd.execute();
}

HEW.enableSettopEncryption = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "ENABLE_HEW_SETTOP_ENCRYPTION";
	
	cmd.execute();
}

HEW.disableFontAdjustment = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DISABLE_HEW_FONT_ADJUSTMENT";
	
	cmd.execute();
}

HEW.disablePluginChaserControl = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DISABLE_HEW_PLUGIN_CHASER_CONTROL";
	
	cmd.execute();
}

HEW.displayDialog = function(dialogType)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DISPLAY_HEW_DIALOG";
	cmd.DIALOG_TYPE = dialogType;
	
	cmd.execute();
}

HEW.displayMessage = function(msgId, msg)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "DISPLAY_HEW_MESSAGE";
	cmd.DISPLAY_MESSAGE_ID = msgId;
	cmd.DISPLAY_MESSAGE = msg;
	
	cmd.execute();
}


HEW.enableColorSubstitution = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "ENABLE_HEW_COLOR_SUBSTITUTION";
	
	cmd.execute();
}

HEW.enableFontAdjustment = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "ENABLE_HEW_FONT_ADJUSTMENT";
	
	cmd.execute();
}

HEW.enablePluginChaserControl = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "ENABLE_HEW_PLUGIN_CHASER_CONTROL";
	
	cmd.execute();
}

HEW.endSession = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "END_HEW_SESSION";
	
	cmd.execute();
}

HEW.getCurrentUserData = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_CURRENT_HEW_USER_DATA";
	
	return cmd.execute();
}

HEW.getUserContentData = function(userContentId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_USER_CONTENT_DATA";

	cmd.USER_CONTENT_DATA_ID = userContentId;
	
	return cmd.execute().USER_CONTENT_DATA;
}

HEW.setUserContentData = function(userContentId, userContentData)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SET_HEW_USER_CONTENT_DATA";

	cmd.USER_CONTENT_DATA_ID = userContentId;

	cmd.USER_CONTENT_DATA = userContentData;

	return cmd.execute();
}
HEW.controlSounds = function (soundEntries)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "CONTROL_HEW_SOUNDS";

	cmd.SOUND_ENTRY = new Array();

	for(var i = 0; i < soundEntries.m_SoundEtries.length; ++i)
	{
		cmd.SOUND_ENTRY.push(soundEntries.m_SoundEtries[i]);
	}

	cmd.execute();
}

HEW.getAssociatedUsers = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_ASSOCIATED_USERS";
	
	return cmd.execute();
}

HEW.getCurrentUserName = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_CURRENT_USER_NAME";
	
	return cmd.execute().USER_NAME;
}

HEW.getFavorites = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_FAVORITES";
	
	return cmd.execute();
}

HEW.getFilterLevels = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_FILTER_LEVELS";
	
	return cmd.execute();
}

HEW.getHistoryEntries = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_HISTORY_ENTRIES";
	
	return cmd.execute();
}

HEW.getLaunchChannel = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_LAUNCH_CHANNEL";
	
	return parseInt(cmd.execute().LAUNCH_CHANNEL);
}

HEW.getNewFavorite = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_NEW_FAVORITE";
	
	return cmd.execute();
}

HEW.getRegionId = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_REGION_ID";
	
	return cmd.execute().REGION_ID;
}

HEW.getSessionId = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_SESSION_ID";
	
	return cmd.execute().SESSION_ID;
}

HEW.getSettopId = function() {
	try {
		var cmd = new HEWCommand("<HEW_COMMAND/>");
		cmd.COMMAND_NAME = "GET_HEW_SETTOP_ID";
		return cmd.execute().SETTOP_ID;
	}
	catch(err) {
		return 'Guest';
	}
}

HEW.getAUXSettopData = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_AUX_SETTOP_DATA";

	return cmd.execute().AUX_SETTOP_DATA;
}

HEW.getSettopLanguageSetting = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_SETTOP_LANGUAGE_SETTING";

	return cmd.execute().LANGUAGE_SETTING;
}

HEW.getSettopParentalRating = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_SETTOP_PARENTAL_RATING";

	return cmd.execute().PARENTAL_RATING;
}

HEW.getSettopStatus = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_SETTOP_STATUS";

	return cmd.execute().MASTER_SUBSCRIBER_ID;
}

HEW.getUrls = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_URLS";

	return cmd.execute();
}

HEW.getUserData = function(subscriberId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_USER_DATA";
	cmd.SUBSCRIBER_ID = subscriberId;

	return cmd.execute();
}

HEW.getUserHint = function(userName)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_USER_HINT";
	cmd.ACCOUNT_ID = userName;

	return cmd.execute();
}

HEW.getWindowDimensions = function(settopID)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_WINDOW_DIMENSIONS";
	cmd.SETTOP_ID = settopID;
	
	return cmd.execute().WINDOW_DIMS;
}

HEW.pageReadyForChaser = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "HEW_PAGE_READY_FOR_CHASER";
	
	cmd.execute();
}

HEW.startTokenUsageEvaluation = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "HEW_START_TOKEN_USAGE_EVALUATION";
	
	cmd.execute();
}

HEW.stopTokenUsageEvaluation = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "HEW_STOP_TOKEN_USAGE_EVALUATION";
	
	return cmd.execute();
}

HEW.hideMouse = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "HIDE_HEW_MOUSE";
	
	cmd.execute();
}

HEW.hideProgressBar = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "HIDE_HEW_PROGRESS_BAR";
	
	cmd.execute();
}

HEW.isContentSubscribed = function(contentId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "IS_HEW_CONTENT_SUBSCRIBED";
	cmd.CONTENT_ID = contentId;
	
	try
	{
		cmd.execute();
		return true;
	}
	catch(e)
	{
		if(e instanceof HEWCommand)
		{
			if(e.STATUS == "CONTENT_NOT_SUBSCRIBED" &&
			   (typeof(e.ERROR_MSG) != "string" || e.ERROR_MSG == ""))
			{
				// This means the content has not been subscribed to
				return false;
			}
		}
		throw e;
	}
}

HEW.isSubscriberMaster = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "IS_HEW_SUBSCRIBER_MASTER";
	
	return cmd.execute();
}

HEW.loginUser = function(userName, password, associateToSettop)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "LOGIN_HEW_USER";
	cmd.USER_NAME = userName;
	cmd.PASSWORD = password;
	cmd.ASSOCIATE_USER_TO_SETTOP = associateToSettop;
	
	return cmd.execute().HOME_PAGE_URL;
}

HEW.purchaseContent = function(contentId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "PURCHASE_HEW_CONTENT";
	cmd.CONTENT_ID = contentId;

	cmd.execute();
}

HEW.modifyCurrentUserData = function(userName, screenName, password, 
									 secretWord, hint, urlFilterLevelName, 
									 tabIconOption, tabDisplayDuration, 
									 timestamp, verificationPassword,
									 masterSubscriberId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "MODIFY_CURRENT_HEW_USER_DATA";
	cmd.ACCOUNT_ID = userName;
	cmd.SCREEN_NAME = screenName;
	cmd.PASSWORD = password;
	cmd.SECRET_WORD = secretWord;
	cmd.USER_HINT = hint;
	cmd.URL_FILTER_LEVEL_NAME = urlFilterLevelName;
	cmd.TAB_ICON = tabIconOption;
	cmd.TAB_AUTO_TIME_OUT = tabDisplayDuration;
	cmd.TIMESTAMP = timestamp;
	cmd.VERIFICATION_PASSWORD = verificationPassword;
	cmd.MASTER_SUBSCRIBER_ID = masterSubscriberId;
	
	cmd.execute();
}

HEW.modifyFavorite = function(favoriteId, title, url, timestamp)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "MODIFY_HEW_FAVORITE";
	cmd.FAVORITE_ID = favoriteId;
	cmd.FAVORITE_TITLE = title;
	cmd.FAVORITE_URL = url;
	cmd.TIMESTAMP = timestamp;

	cmd.execute();
}

HEW.modifyUserData = function(subscriberId, userName, screenName, password, 
							  secretWord, hint, urlFilterLevelName, 
							  tabIconOption, tabDisplayDuration, timestamp, 
							  verificationPassword, masterSubscriberId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "MODIFY_HEW_USER_DATA";
	cmd.SUBSCRIBER_ID = subscriberId;
	cmd.ACCOUNT_ID = userName;
	cmd.SCREEN_NAME = screenName;
	cmd.PASSWORD = password;
	cmd.SECRET_WORD = secretWord;
	cmd.USER_HINT = hint;
	cmd.URL_FILTER_LEVEL_NAME = urlFilterLevelName;
	cmd.TAB_ICON = tabIconOption;
	cmd.TAB_AUTO_TIME_OUT = tabDisplayDuration;
	cmd.TIMESTAMP = timestamp;
	cmd.VERIFICATION_PASSWORD = verificationPassword;
	cmd.MASTER_SUBSCRIBER_ID = masterSubscriberId;

	cmd.execute();
}

HEW.repositionScreen = function(x1, y1, x2, y2)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "REPOSITION_HEW_SCREEN";
	cmd.REPOSITION_X1COORD = x1;
	cmd.REPOSITION_Y1COORD = y1;
	cmd.REPOSITION_X2COORD = x2;
	cmd.REPOSITION_Y2COORD = y2;
	
	cmd.execute();
}

HEW.resetScreenPosition = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "RESET_HEW_SCREEN_POSITION";
	
	cmd.execute();
}

HEW.restoreDefaultConfigurations = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "RESTORE_HEW_DEFAULT_CONFIGURATIONS";
	
	cmd.execute();
}

HEW.restoreDefaultFunctionKeys = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "RESTORE_HEW_DEFAULT_FUNCTION_KEYS";
	
	cmd.execute();
}

HEW.saveScreenPosition = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SAVE_HEW_SCREEN_POSITION";
	
	cmd.execute();
}

HEW.setChaserColor = function(color)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SET_HEW_CHASER_COLOR";
	cmd.CHASER_COLOR = color;
	
	cmd.execute();
}

HEW.setChaserType = function(type)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SET_HEW_CHASER_TYPE";
	cmd.CHASER_TYPE = type;
	
	cmd.execute();
}

HEW.setChaserWidth = function(width)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SET_HEW_CHASER_WIDTH";
	cmd.CHASER_WIDTH = width;
	
	cmd.execute();
}

HEW.setWindowSize = function(width, height, x, y)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SET_HEW_WINDOW_SIZE";
	cmd.WINDOW_WIDTH = width;
	cmd.WINDOW_HEIGHT = height;
	cmd.WINDOW_X_POSITION = x;
	cmd.WINDOW_Y_POSITION = y;
	
	cmd.execute();
}

HEW.setWindowSizeEx = function(width, height)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SET_HEW_WINDOW_SIZE_EX";
	cmd.WINDOW_WIDTH = width;
	cmd.WINDOW_HEIGHT = height;	
	cmd.execute();
}

HEW.showMouse = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SHOW_HEW_MOUSE";
	
	cmd.execute();
}

HEW.showProgressBar = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SHOW_HEW_PROGRESS_BAR";
	
	cmd.execute();
}

HEW.startVOD = function(id, startType, bookmark)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "START_HEW_VOD";
	cmd.IDENTIFIER = id;
	cmd.START_TYPE = startType;
	cmd.BOOKMARK = bookmark;
	
	cmd.execute();
}

HEW.subscribeContent = function(contentId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SUBSCRIBE_HEW_CONTENT";
	cmd.CONTENT_ID = contentId;
	
	cmd.execute();
}

HEW.tuneSettop = function(tuneType, tuneId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "TUNE_HEW_SETTOP";
	cmd.TUNE_TYPE = tuneType;
	cmd.TUNE_ID = tuneId;
	
	cmd.execute();
}

HEW.validateSettopPin = function(pin)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "VALIDATE_HEW_SETTOP_PIN";
	cmd.SETTOP_PIN = pin;
	
	cmd.execute();
}

HEW.focus = function()
{
	// special focus command for flash (no callback)
	window.status="ictvcmd(" + (new Date()).getTime() + "):focus(1)";
	window.status="";
}


//===================
//added
//===================
HEW.changeInputLocaleId = function(localeId)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "CHANGE_HEW_INPUT_LOCALE_ID";
	cmd.LOCALE_ID = localeId;
	
	cmd.execute();
}

HEW.getSubscriberId = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "GET_HEW_SUBSCRIBER_ID";
	
	return cmd.execute();
}


HEW.startSpecialSession = function(identifier)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "START_SPECIAL_HEW_SESSION";
	cmd.IDENTIFIER = identifier;
	
	cmd.execute();
}

HEW.modifyWindowManagementSettings = function(tabIconOption,tabDisplayDuration,databaseTimestamp)
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "MODIFY_HEW_WINDOW_MANAGEMENT_SETTINGS";
	cmd.TAB_ICON = tabIconOption;
	cmd.TAB_AUTO_TIME_OUT = tabDisplayDuration;
	cmd.TIMESTAMP = databaseTimestamp;
	
	cmd.execute();
}

HEW.setJavaAppletLoaded = function()
{
	var cmd = new HEWCommand("<HEW_COMMAND/>");

	cmd.COMMAND_NAME = "SET_HEW_JAVA_APPLET_LOADED";
	
	cmd.execute();
}


HEW.getObjLength = function(obj)
{
	var objLength = 1;
	if ("undefined" != typeof(obj.length))
	{
		objLength = obj.length;
	}	
	return objLength;
}


HEW.getObjLengthByName = function(objName)
{
	var objLength = 0;
	if ("undefined" != typeof(eval(objName)))
	{
		objLength = HEW.getObjLength(eval(objName));
	}
	return objLength;
}

HEW.getIndexObj = function(obj, index)
{
	var len = HEW.getObjLength(obj);
	var indexObject = null;
	if (len >index)
	{
		if (1 == len)
		{
			indexObject  = obj;
		}
		else
		{
			indexObject = obj[index];
		}
	}
	else
	{
		alert("function getIndexObj() gets a wrong index");
	}
	return indexObject;
}

HEW.getIndexObjByName = function(objName, index)
{
	var len = HEW.getObjLengthByName(objName);
	indexObject = null;
	if (len > 0)
	{
		indexObject = HEW.getIndexObj(eval(objName), index);
	}
	return indexObject;
}

HEW.alert = function(e)
{
	if(e instanceof HEWCommand)
	{
		//HEW.displayMessage(0, e.STATUS);
		alert(e);
	}
	else 
	{
		HEW.displayMessage(0, e);
	}
}
