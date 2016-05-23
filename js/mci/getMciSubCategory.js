/*jslint browser: true*/
/*global $, jQuery, alert, console, parseAndDisplayMciSubCategory, parseAndDisplayPatEd993SubCategory, getMciSubCategoryVideo, convertRuntime, languageIcon, handleAjaxError, document */

function getMciSubCategory(genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";
	var xmlURL = '../xml/Catalog.xml', dataType = 'xml', node;
	// alert(subGenreID);
	if (subGenreID === '99900') {
		xmlURL = '../xml/99900.xml';
	}
	
	$.ajax({
		type: "GET",
		url: xmlURL,
		dataType: dataType,
		success: function (xml) {
			// get the requested catalogue node and call function for processing
			node = $(xml).contents().find('category[id=\"' + subGenreID + '\"]').children();
			parseAndDisplayMciSubCategory(xml, node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv);
		},
		error: function (jqXHR, statusText, errorThrown) {
			handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdSubCategory');
		}
	});
}

function parseAndDisplayMciSubCategory(result, node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";

	var divContent = '', videosPerScreen = 9, offeringIds = '', videoNode = '', videoTitle = '', rating = '', offeringid = '',
		rowNumber = 1, columnNumber = 1, nodeLength = $(node).length - 1, endCount = 0, navigationLegend = '', count = 0,
		nextStart = parseInt(start, 10) + videosPerScreen, currentScreen = 1, nextURL = '', screenCount, nextStartTemp, i, numberOfColumns = 3;
	
	// var startTime = new Date().getTime();
	
	if (screenFormat === 'HD') {
		videosPerScreen = 21;
	}
	if (section === 'mci') { 
		videosPerScreen = videosPerScreen + 1;
	}
	nextStart = parseInt(start, 10) + videosPerScreen;
	screenCount = Math.round(parseFloat(((nodeLength - 1) / videosPerScreen) + 0.5));
	currentScreen = Math.round((start / videosPerScreen) + 1);

	$.fn.filterNode = function(name) {
      return this.find('*').filter(function() {
        return this.nodeName === name;
      });
    };

	$(node).slice(start).each(function (i,  row) {
		if ($(this).text() !== 'undefined' && $(this).text() !== '') {
			count++;
			offeringid = $(this).text();
			// alert($(this).text());
			videoNode = $(result).contents().find('offering[offeringId=\"' + offeringid + '\"]');
			videoTitle = $(videoNode).find('description:eq(0)').text();
			rating = $(videoNode).find('metadata[name="MOD\\:\\:Rating"]').attr('value');
			// videoTitle = $(node2).find("offerings offering").has('value:contains(\"' + offeringid + '\")').find('label').text();
			// alert(videoTitle);
			divContent += getMciSubCategoryVideo(offeringid, videoTitle, rating, genre, genreID, subGenre, subGenreID, rowNumber, columnNumber, count, section, screenFormat) + '\n\r';
			if (columnNumber >= numberOfColumns) {
				// if column is full, move to next column
				columnNumber = 1;
				rowNumber++;
			} else {
				columnNumber++;
			}
		}
		if (rowNumber >= videosPerScreen) {
			return false;
		}
	});

	$('#' + targetDiv).html(divContent);

	endCount = rowNumber + parseInt(start, 10) - 1;
	navigationLegend = start + ' - ' + endCount + ' of ' + nodeLength + ' videos';
	$('#itemCount').html(navigationLegend);
}

function getMciSubCategoryVideo(offeringid, title, rating, genre, genreID, subGenre, subGenreID, columnNumber, rowNumber, count, section, screenFormat) {
	"use strict";
	var divContent = '', constructURL = '', className = 'lineItems', rowNumberPE = rowNumber;
	// alert(screenFormat + genreID + subGenreID);

	if (section === 'mci') { rowNumberPE = rowNumber - 1; }
	if (rating === 'TV-MA') {
		constructURL = 'mciPassword.html?genre=' + encodeURIComponent(genre) + '&genreID=' + genreID + '&subGenre=' + encodeURIComponent(subGenre) + '&subGenreID=' + subGenreID + '&offeringId=' + offeringid;
	} else {
		constructURL = 'mciTitle.html?genre=' + encodeURIComponent(genre) + '&genreID=' + genreID + '&subGenre=' + encodeURIComponent(subGenre) + '&subGenreID=' + subGenreID + '&offeringId=' + offeringid;
	}
	if (screenFormat === 'HD') {
		if (subGenreID === '99900') {
			divContent = '<div class=\"lineColumnMainWideMciImage lineColumnMainWide' + rowNumber + ' lineLargeMCI' + columnNumber + '\" id=\"divLink' + count + '\" onclick=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')\"';
		} else {
			divContent = '<div class=\"lineColumnMainWideMci lineColumnMainWide' + rowNumber + ' lineLargePE' + columnNumber + '\" id=\"divLink' + count + '\" onclick=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')\"';
		}
		
		className = 'lineItemsMainWide';
	} else {
		divContent = '<div class=\"line lineWide linePE' + rowNumberPE + '\" id=\"divLink' + count + '\" onclick=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')\"';
	}
	divContent += ' onmouseover=\"onHoverDiv(\'onmouseover\', \'divLink' + count + '\',\'left\',\'true\',' + columnNumber + ',' + rowNumberPE + ');\"';
	divContent += ' onmouseout=\"onHoverDiv(\'onmouseout\', \'divLink' + count + '\',\'right\',\'true\',' + columnNumber + ',' + rowNumberPE + ');\">\n';
	if (subGenreID === '99900') {
		divContent += '<img src=\"../images/screens/mci/videoBackdropImages/' + offeringid + '.jpg\" id=\"videoListImage' + columnNumber + rowNumber + '\" class=\"videoListImage\" style=\"position: relative; left: -22px; top: -20px;\"/>';
	}	
	divContent += '<a tabIndex=\"' + count + '\" class=\"' + className + '\" id=\"link' + rowNumber + '\" href=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')\"';
	divContent += ' onFocus=\"onHoverDiv(\'onFocus\', \'divLink' + count + '\' ,\'left\',\'true\',' + columnNumber + ',' + rowNumberPE + '); offSetFunction(\'divLink' + count + '\');\"';
	divContent += ' onBlur=\"onHoverDiv(\'onBlur\', \'divLink' + count + '\' ,\'right\',\'true\',' + columnNumber + ',' + rowNumberPE + ');\"';
	divContent += '>' + languageIcon(title, 'short', screenFormat) + '</a>\n';
	divContent += '</div>';
	return divContent;
}