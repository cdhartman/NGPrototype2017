/*jslint browser: true*/
/*global $, jQuery, alert, console, getMAC, setCookie, processTier, getSTBTierError, document */

function getSTBTier(macAddress, pathPrefix) {
	"use strict";
	// get settopbox xml file
	var xmlURL = pathPrefix + '../DC_mayo_vod/STB_Locations.xml';
	if (macAddress === '') { getMAC(); }
	setCookie('macAddress', macAddress, 365);
	if (macAddress === 'Guest') {
		$("#location").html('Guest');
		return macAddress;
	} else {
		$.ajax({
			type: "GET",
			url: xmlURL,
			dataType: "xml",
			success: function (xml) { processTier(xml, macAddress); },
			error: getSTBTierError
		});
	}
}

function processTier(result, macAddress) {
	"use strict";
	var tempString = '', tier, node, preferenceString = '', preferenceString2 = '', Preference_One = '', Preference_Two = '', Preference_Three = '', locationString = '', Campus = '', Building = '', Room = '', Medical_Unit = '';
	// alert('processingTier');
	node = $(result).contents().find('Locations MACAddress:contains(\'' + macAddress + '\')').parent();
	tier = $(node).find('Tier').text();
	Preference_One = $(node).find('Preference_One').text().replace('Default', '');
	Preference_Two = $(node).find('Preference_Two').text().replace('Default', '');
	Preference_Three = $(node).find('Preference_Three').text().replace('Default', '');
	Campus = $(node).find('Campus').text();
	Building = $(node).find('Building').text();
	Room = $(node).find('Room').text();
	Medical_Unit = $(node).find('Medical_Unit').text();

	locationString = Medical_Unit + ' &#149; ' + Campus + ' &#149; ' + Building + ' &#149; ' + Room + ' &#149; ' + macAddress + ' &#149; ' + tier;
	if (Preference_One + Preference_One + Preference_One !== '') {
		preferenceString = Preference_One + ' &#149; ' + Preference_Two + ' &#149; ' + Preference_Three;
		preferenceString2 = Preference_One + ',' + Preference_Two + ',' + Preference_Three;
	} else if (tier !== null && tier.match(/^DEV$/i)) {
		// preferenceString2 = 'Trauma-General Surgery' + ',' + 'Surgery Adult' + ',' + 'Wellness';
	}
	tempString = tier + ' &#149; ' + Preference_One + ' &#149; ' + Preference_Two + ' &#149; ' + Preference_Three + ' &#149; ' + Campus + ' &#149; ' + Building + ' &#149; ' + Room + ' &#149; ' + macAddress + ' &#149; ' + Medical_Unit;
	$("#location").html(locationString);
	$("#preferences").html(preferenceString);
	// if (preferenceString2 === '' && tier === 'DEV') { preferenceString2 = 'Allergic Diseases,Cardiovascular,Center for Sleep Medicine'}
	setCookie('pePreferences', preferenceString2, 365);
	setCookie('location', Campus + ' ' + Building + ' ' + Room + ' | ' + Medical_Unit, 365);
	setCookie('room', Building + ' ' + Room, 365);

	if (tier !== null && tier.match(/^DEV$|^PE$|^IP$|^OP$|^IPAP$|^IPPEDM$|^OPPEDM$|^RESLOUNGE$/i)) {
		// settopbox has full access 
	} else {
		// settopbox can not view complimentary movies of patient services
		// $('#moviesDiv').html("<img class=\"transparentBtn\" src=\"images/button_transparency.gif\" /></a>");
		// $('#psDiv').html("<img class=\"transparentBtn\" src=\"images/button_transparency.gif\" /></a>");
		// document.getElementById("moviesDiv").className = "boxBlank box5";
		// document.getElementById("psDiv").className = "boxBlank box2";
	}
}

function getPePreferences(result, macAddress) {
	"use strict";
	var node;

	$(result).contents().find("Locations MACAddress").each(function (i,  row) {
		if ($(this).text() === macAddress) {
			// build string of stb metadata fields for display
			node = $(this).parent();
			$(node).children().each(function (i,  row) {
				if ($(this).attr("Preference_One")) { alert($(this).text()); }
			});
		}
	});
}

function getSTBTierError(XMLHttpRequest, textStatus, errorThrown) {
	"use strict";
	// display error message regarding request results
	console.log('getSTBTierError failover failure');
    alert('getSTBTierError failure');
}