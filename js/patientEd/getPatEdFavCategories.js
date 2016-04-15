/*jslint browser: true*/
/*global $, jQuery, alert, console, document, getCookie, getSite, formatCategoryName */

function getPatientEdFavCategories(start, pePreferences, targetRegion, targetDiv, site, screenFormat) {
	"use strict";
	var divContent = '', columnNumber = 2, lineNumber = 6, composeURL = 'javascript:ForwardWithIDAndQuery(\'patientEdSubCat.html', siteArray, i = 0, linkID = 0;

	if (site === 'RO') {
		if (screenFormat === 'HD') {
			columnNumber = 2;
			lineNumber = 7;
			linkID = 35;
			targetRegion = targetRegion + 'Wide';
		} else {
			linkID = 14;
		}

		siteArray = pePreferences.split(',');

		if (siteArray.length !== 1) {
			for (i = 0; i < siteArray.length; i++) {
				lineNumber++;
				composeURL = 'javascript:ForwardWithIDAndQuery(\'patientEdSubCat.html';
				composeURL += '?genre=' + encodeURI(siteArray[i])  + '&amp;view=All';
				composeURL += '\');';
				divContent += '<div class=\"lineColumnMainPreferred lineColumn' + targetRegion + columnNumber + ' linePatEdFV' + lineNumber + ' preferredCategory\" >';
				divContent += '<a id=\"link' + linkID + '\" href=\"' + composeURL + '\" class=\"lineItems' + targetRegion + '\" tabIndex=\"' + start + '\"' + '>';
				divContent += formatCategoryName(siteArray[i], 28);
				divContent += ' <img src=\"../images/icons/star_blue.gif\" id=\"FavIcon\" align=\"middle\" />';
				divContent += '</a>';
				divContent += '</div>\n';
				linkID++;
			}
			if (siteArray.length !== 0) {
				if (screenFormat === 'SD') {
					divContent = '<div class=\"lineColumnMain lineColumnMain2 lineCategoriesMain6 preferredCategoriesLabel\" id=\"preferredCategoriesLabel\">Channel 999 Preferred Categories</div>' + divContent;
				} else {
					divContent = '<span class=\"ch999preferences\"><div class=\"lineColumnMain lineColumnMainWide2 lineCategoriesMain7 preferredCategoriesLabel\">Channel 999 Preferred Categories <img src=\"../images/icons/star_blue.gif\" /></div></span>' + divContent;
				}
				$('#' + targetDiv).append(divContent);
			}
		}
	}
}

function getPatientEdFavCategoriesMain(start, pePreferences, targetRegion, targetDiv, site, screenFormat) {
	"use strict";
	var divContent = '', columnNumber = 1, lineNumber = 0, composeURL = 'javascript:ForwardWithIDAndQuery(\'patientEdSubCat.html', siteArray, i = 0, linkID = 0, targetRegion2 = 'linePE';

	if (site === 'RO') {
		if (screenFormat === 'HD') {
			linkID = 35;
			targetRegion = targetRegion + 'Wide';
			targetRegion2 = 'lineLarge';
		} else {
			linkID = 14;
		}

		siteArray = pePreferences.split(',');

		if (siteArray.length !== 1) {
			for (i = 0; i < siteArray.length; i++) {
				lineNumber++;
				composeURL = 'javascript:ForwardWithIDAndQuery(\'patientEdSubCat.html';
				composeURL += '?genre=' + encodeURI(siteArray[i])  + '&amp;view=All';
				composeURL += '\');';
				divContent += '<div class=\"lineColumnMain lineColumn' + targetRegion + columnNumber + ' ' + targetRegion2 + lineNumber + '\" >';
				divContent += '<a id=\"link' + lineNumber + '\" href=\"' + composeURL + '\" class=\"lineItems' + targetRegion + '\" tabIndex=\"' + lineNumber + '\"' + '>';
				divContent += formatCategoryName(siteArray[i], 28);
				divContent += '</a>';
				if (navigator.userAgent.indexOf("MSIE") != -1) {
					divContent += ' <img src=\"../images/icons/star_blue.gif\" align=\"middle\" />';
				} else {
					divContent += ' <img src=\"../images/icons/star_blue.gif\" />';
				}
				divContent += '</div>\n';
				linkID++;
			} // alert(divContent);
		return divContent;
		}
	}
}