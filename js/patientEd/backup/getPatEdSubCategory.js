/*jslint browser: true*/
/*global $, jQuery, alert, console, parseAndDisplayPatEdSubCategory, parseAndDisplayPatEd993SubCategory, getPatEdSubCategoryVideo, convertRuntime, languageIcon, handleAjaxError, document */

function getPatientEdSubCategory(genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";
	var xmlURL = '../../modAssets/xml/Catalog.xml', dataType = 'xml', node;
		

	if (quickPlayFlag === '1') {
		getPatientEdVideoList993(genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv);
	} else {
		/* 
		$.ajax({
			type: "GET",
			url: '../../modAssets/xml/SearchPeMi.xml',
			dataType: 'xml',
			success: function (xml) {
				node2 = xml;
				// alert('success');
			},
			error: function (jqXHR, statusText, errorThrown) {
				handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdSubCategory');
			}
		});
		*/
		$.ajax({
			type: "GET",
			url: xmlURL,
			dataType: dataType,
			success: function (xml) {
				// get the requested catalogue node and call function for processing
				node = $(xml).contents().find('category[id=\"' + subGenreID + '\"]').children();
				parseAndDisplayPatEdSubCategory(xml, node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv);
			},
			error: function (jqXHR, statusText, errorThrown) {
				handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdSubCategory');
			}
		});
	}
}

function getPatientEdVideoList993(genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";
	var xmlURL = '../../modAssets/xml/993.xml', dataType = 'xml', node;

	$.ajax({
		type: "GET",
		url: xmlURL,
		dataType: dataType,
		success: function (xml) {
			// get the requested catalogue node and call function for processing
			node = $(xml).contents().find('category[id=\"' + subGenreID + '\"]').children();
			parseAndDisplayPatEd993SubCategory(node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv);
		},
		error: function (jqXHR, statusText, errorThrown) {
			handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdSubCategory993');
		}
	});
}

function parseAndDisplayPatEd993SubCategory(node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";
	var nodeList = '', divContent = '', columnNumber = 1, rowNumber = 0, count = 0, videosPerScreen = 0, numberOfRows = 0, nodeLength = 0, offeringIds = '',
		index = 0, screenCount = 0, currentScreen = 1, nextStart, nextURL, bulletContent, nextStartTemp, i, title = '', runtime = 0, summary = '', node2 = '', node3 = '';
	nodeLength = $(node).length - 1;

	if (screenFormat === 'HD') {
		videosPerScreen = 33;
		numberOfRows = 11;
	} else if (titleFormat === 'long') {
		videosPerScreen = 10;
		numberOfRows = 10;
	} else {
		videosPerScreen = 18;
		numberOfRows = 9;
	}
	screenCount = Math.round(parseFloat(((nodeLength) / videosPerScreen) + 0.49));

	if (titleFormat === 'long' && quickPlayFlag === '1') {
		$.ajax({
			async: false,
			type: "GET",
			url: '../../modAssets/xml/Catalog.xml',
			dataType: 'xml',
			'success': function (data) {
				node2 = data;
			}
		});
	}

	$(node).each(function (i,  row) {
		if ($(this).text() !== 'undefined' && $(this).text() !== '') {
			index++;
			if ($(this).text().length === 4) {
				nodeList += $(this).text() + ',';
				if (index >= start && rowNumber < videosPerScreen) {
					count++;
					rowNumber++;
					if (titleFormat === 'short') {
						title = $(this).attr('name');
						summary = $(this).attr('summary');
					} else {
						// title = $(this).attr('nameLong');
						node3 = $(node2).contents().find('offering[offeringId=\"' + $(this).text() + '\"]');
						summary = $(node3).find('metadata[name="MOD\\:\\:Summary_Short"]').attr('value');
					}

					runtime = $(this).attr('runtime');
					if (!summary) { summary = ''; }
					if (runtime && runtime !== '') { runtime = convertRuntimePE(runtime); }
					if (rowNumber > numberOfRows) { rowNumber = 1; columnNumber++; }
					divContent += getPatEdSubCategory993Video($(this).text(), title, $(this).attr('rating'), runtime, summary, genre, genreID, subGenre, subGenreID, columnNumber, rowNumber, count, quickPlayFlag, view, titleFormat, screenFormat) + '\r';
				}
				if (count >= videosPerScreen) {
					return false;
				}
			}
		}
	});
	$('#' + targetDiv).html(divContent);
	rowNumber = 0;

	currentScreen = Math.round((start / videosPerScreen) + 1);
	nodeList = nodeList.substring(0, nodeList.length - 1);
	nextStart = parseInt(start, 10) + videosPerScreen;
	// alert(count + ' | ' + nextStart + ' | ' + currentScreen + ' | ' + screenCount + ' | ' + nodeLength);
	if (currentScreen !== screenCount) {
		nextURL = 'javascript:ForwardWithID(\'patientEdGenre.html?genre=' + genre + '&genreID=' + genreID + '&subGenre=' + subGenre + '&subGenreID=' + subGenreID + '&start=' + nextStart + '&view=' + view + '&quickPlay=1\')';
		setTimeout(function () {
			document.getElementById("nextButtonHref").setAttribute('href', nextURL);
			document.getElementById("navbarNext").className = "navbar navbar2";
		}, 500);
	} else {
		$('#navbarNext').html('');
		 // setTimeout( function(){ document.getElementById("navbarNext").className = "navbar navbar2blankPE" ; }, 500);
	}
	if (screenCount > 1) {
		bulletContent = '<div class=\"screenBulletIndicatorPE\">';
		for (i = 1; i < screenCount + 1; i++) {
			nextStartTemp = (i - 1) * videosPerScreen + 1;
			// bulletContent += '<a href=\"patientEdGenre.html?genre=' + encodeURI(genre) + '&genreID=' + genreID + '&subGenre=' + encodeURI(subGenre) + '&subGenreID=' + subGenreID + '&start=' + nextStartTemp + '&quickPlay=1\">';
			if (i === currentScreen) {
				bulletContent += '<img src=\"../images/icons/bullets/bullet-selected.gif\" /> ';
			} else {
				bulletContent += '<img src=\"../images/icons/bullets/bullet.gif\" /> ';
			}
			// bulletContent += '</a>';
			bulletContent += ' &nbsp;&nbsp; ';
		}
		bulletContent += '</div>';

		setTimeout(function () {
			$('#' + targetDiv).append(bulletContent);
		}, 500);

	}

	$('#itemCount').html(nodeLength + ' videos');
}


function parseAndDisplayPatEdSubCategory(result, node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";

	var divContent = '', videosPerScreen = 9, offeringIds = '', videoNode = '', videoTitle = '', rating = '', offeringid = '',
		rowNumber = 0, columnNumber = 1, nodeLength = $(node).length - 1, endCount = 0, navigationLegend = '',
		nextStart = parseInt(start, 10) + videosPerScreen, currentScreen = 1, nextURL = '', screenCount, nextStartTemp, i;
	
	// var startTime = new Date().getTime();
	
	if (screenFormat === 'HD') {
		videosPerScreen = 11;
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
			rowNumber++;
			offeringid = $(this).text();
			// alert($(this).text());
			videoNode = $(result).contents().find('offering[offeringId=\"' + offeringid + '\"]');
			videoTitle = $(videoNode).find('description:eq(0)').text();
			rating = $(videoNode).find('metadata[name="MOD\\:\\:Rating"]').attr('value');
			// videoTitle = $(node2).find("offerings offering").has('value:contains(\"' + offeringid + '\")').find('label').text();
			// alert(videoTitle);
			divContent += getPatEdSubCategoryVideo(offeringid, videoTitle, rating, genre, genreID, subGenre, subGenreID, columnNumber, rowNumber, section, screenFormat) + '\n\r';
		}
		if (rowNumber >= videosPerScreen) {
			return false;
		}
	});

	if (screenCount > 1) {
		divContent += '<div class=\"screenBulletIndicatorPE\">';
		for (i = 1; i < screenCount + 1; i++) {
			nextStartTemp = (i - 1) * videosPerScreen + 1;
			if (i === currentScreen) {
				divContent += '<img src=\"../images/icons/bullets/bullet-selected.gif\" /> ';
			} else {
				divContent += '<img src=\"../images/icons/bullets/bullet.gif\" /> ';
			}
			divContent += ' &nbsp;&nbsp; ';
		}
		divContent += '</div>';
	}

	$('#' + targetDiv).html(divContent);

	if (nodeLength >= nextStart && currentScreen !== screenCount) {
		nextURL = 'javascript:ForwardWithIDAndQuery(\'patientEdGenre.html?genre=' + genre + '&genreID=' + genreID + '&subGenre=' + subGenre + '&subGenreID=' + subGenreID + '&start=' + nextStart;
		if (section === 'mci') { nextURL += '&section=mci'; }
		nextURL += '\')';
		setTimeout(function () {
			document.getElementById("nextButtonHref").setAttribute('href', nextURL);
			document.getElementById("navbarNext").className = "navbar navbar2";
		}, 500);
	} else {
		$('#navbarNext').html('');
	}

	endCount = rowNumber + parseInt(start, 10) - 1;
	navigationLegend = start + ' - ' + endCount + ' of ' + nodeLength + ' videos';
	$('#itemCount').html(navigationLegend);
	// var end = new Date().getTime();
	// var time = end - startTime;
	// alert('Execution time: ' + time);
}

function getPatEdSubCategoryVideo(offeringid, title, rating, genre, genreID, subGenre, subGenreID, columnNumber, rowNumber, section, screenFormat) {
	"use strict";
	var divContent = '', constructURL = '', className = 'lineItems', rowNumberPE = rowNumber;
	
	if (section === 'mci') { rowNumberPE = rowNumber - 1; }
	if (screenFormat === 'HD') {
		divContent = '<div class=\"lineColumn lineColumnMainWide lineLarge' + rowNumberPE + '\" id=\"line' + rowNumber + '\">';
		className = 'lineItemsMainWide';
	} else {
		divContent = '<div class=\"line lineWide linePE' + rowNumberPE + '\" id=\"line' + rowNumber + '\">';
	}

	if (rating === 'TV-MA') {
		constructURL = 'patientEdPassword.html?genre=' + encodeURIComponent(genre) + '&genreID=' + genreID + '&subGenre=' + encodeURIComponent(subGenre) + '&subGenreID=' + subGenreID + '&offeringId=' + offeringid;
	} else {
		constructURL = 'patientEdTitle.html?genre=' + encodeURIComponent(genre) + '&genreID=' + genreID + '&subGenre=' + encodeURIComponent(subGenre) + '&subGenreID=' + subGenreID + '&offeringId=' + offeringid;
	}
	divContent += '<a tabIndex=\"' + rowNumber + '\" class=\"' + className + '\" id=\"link' + rowNumber + '\" href=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')\"';
	divContent += '>' + languageIcon(title, 'short', screenFormat) + '</a>';
	if (screenFormat === 'HD') { divContent += ' <img src=\"../images/icons/videoIcon' + screenFormat + '.gif\" />'; }
	divContent += '</div>';
	return divContent;
}

function getPatEdSubCategory993Video(offeringid, title, rating, runtime, summary, genre, genreID, subGenre, subGenreID, columnNumber, rowNumber, count, quickPlayFlag, view, titleFormat, screenFormat) {
	"use strict";
	var divContent = '', constructURL = '', className = 'lineItems', onFocusContent = '';

	if (screenFormat === 'SD') {
		divContent = '<div class=\"lineColumnMain lineColumnMain' + columnNumber + ' linePE' + rowNumber + '\" id=\"line' + rowNumber + '\">';
		if (summary.length > 60) {summary = summary.substr(0, 60) + '...'; }
	} else {
		divContent = '<div class=\"lineColumnMain lineColumnMainWide' + columnNumber + ' lineCategoriesMainWide' + rowNumber + '\" id=\"line' + rowNumber + '\">';
		className = 'lineItemsMainWide';
		if (summary.length > 90) {summary = summary.substr(0, 90) + '...'; }
	}

	constructURL = '../playTitle.html?offering=' + offeringid;
	if (runtime) { onFocusContent = ' onfocus=\"(displayDescriptionLegend(\'' + summary + ' (' + runtime + ')\'))\"'; }
	divContent += '<a tabIndex=\"' + count + '\" href=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')' + '\" class=\"' + className + '\" id=\"link' + rowNumber + '\"';
	divContent += 'class=\"' + className + '\"';
	if (onFocusContent !== '') { divContent += onFocusContent + ' onblur=\"displayDescriptionLegend(\'\');\"'; }

	divContent += '>' + languageIcon(title, 'short', screenFormat);
	divContent += '</a>';
	
	if (rating === 'TV-MA') {
		divContent += " <img src=\"../images/icons/password.gif\" />";
	}
	divContent += '</div>';

	return divContent;
}