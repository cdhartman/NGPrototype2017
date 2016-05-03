/*jslint browser: true*/
/*global $, jQuery, alert, console, parseAndDisplayMciSubCategory, parseAndDisplayPatEd993SubCategory, getMciSubCategoryVideo, convertRuntime, languageIcon, handleAjaxError, document */

function getMciSubCategory(genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";
	var xmlURL = '../xml/Catalog.xml', dataType = 'xml', node;

	// alert(view + '|' + quickPlayFlag);
	if (view === 'GBS') {
		getMciVideoList993(genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv);
	} else if (quickPlayFlag === '1') {
		getMciVideoList993(genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv);
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
				parseAndDisplayMciSubCategory(xml, node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv);
			},
			error: function (jqXHR, statusText, errorThrown) {
				handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdSubCategory');
			}
		});
	}
}

function getMciVideoList993(genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";
	var xmlURL = '../../modAssets/xml/993.xml', dataType = 'xml', node;

	if (view === 'GBS') {
		xmlURL = '../../modAssets/xml/GBS.xml'
	}
	$.ajax({
		type: "GET",
		url: xmlURL,
		dataType: dataType,
		success: function (xml) {
			// get the requested catalogue node and call function for processing
			if (subGenreID !== '' && subGenreID !== 'undefined') {
				node = $(xml).contents().find('category[id=\"' + subGenreID + '\"]').children();
			} else {
				node = $(xml).contents().find('category[name=\"' + subGenre + '\"]').children();
			}
			parseAndDisplayPatEd993SubCategory(node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv);
		},
		error: function (jqXHR, statusText, errorThrown) {
			handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdSubCategory993');
		}
	});
}

function parseAndDisplayPatEd993SubCategory(node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";
	var nodeList = '', divContent = '', columnNumber = 0, rowNumber = 1, count = 0, videosPerScreen = 0, numberOfRows = 0, nodeLength = 0, offeringIds = '',
		index = 0, screenCount = 0, currentScreen = 1, nextStart, nextURL, bulletContent, nextStartTemp, i, title = '', runtime = 0, summary = '', node2 = '', node3 = '', numberOfColumns = 3;
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
					// rowNumber++;
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
					
					if (columnNumber >= numberOfColumns) {
						// if column is full, move to next column
						columnNumber = 1;
						rowNumber++;
					} else {
						columnNumber++;
					}
					
					divContent += getMciSubCategory993Video($(this).text(), title, $(this).attr('rating'), runtime, summary, genre, genreID, subGenre, subGenreID, rowNumber, columnNumber, count, quickPlayFlag, view, titleFormat, screenFormat) + '\r';
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
		nextURL = 'javascript:ForwardWithID(\'mciGenre.html?genre=' + genre + '&genreID=' + genreID + '&subGenre=' + subGenre + '&subGenreID=' + subGenreID + '&start=' + nextStart + '&view=' + view + '&quickPlay=1\')';
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
			// bulletContent += '<a href=\"mciGenre.html?genre=' + encodeURI(genre) + '&genreID=' + genreID + '&subGenre=' + encodeURI(subGenre) + '&subGenreID=' + subGenreID + '&start=' + nextStartTemp + '&quickPlay=1\">';
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


function parseAndDisplayMciSubCategory(result, node, genre, genreID, subGenre, subGenreID, start, quickPlayFlag, screenFormat, view, titleFormat, section, targetDiv) {
	"use strict";

	var divContent = '', videosPerScreen = 9, offeringIds = '', videoNode = '', videoTitle = '', rating = '', offeringid = '',
		rowNumber = 1, columnNumber = 1, nodeLength = $(node).length - 1, endCount = 0, navigationLegend = '',
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
			// rowNumber++;
			offeringid = $(this).text();
			// alert($(this).text());
			videoNode = $(result).contents().find('offering[offeringId=\"' + offeringid + '\"]');
			videoTitle = $(videoNode).find('description:eq(0)').text();
			rating = $(videoNode).find('metadata[name="MOD\\:\\:Rating"]').attr('value');
			// videoTitle = $(node2).find("offerings offering").has('value:contains(\"' + offeringid + '\")').find('label').text();
			// alert(videoTitle);
			divContent += getMciSubCategoryVideo(offeringid, videoTitle, rating, genre, genreID, subGenre, subGenreID, rowNumber, columnNumber, i, section, screenFormat) + '\n\r';
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

	/*
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
	*/

	$('#' + targetDiv).html(divContent);

	if (nodeLength >= nextStart && currentScreen !== screenCount) {
		nextURL = 'javascript:ForwardWithIDAndQuery(\'mciGenre.html?genre=' + genre + '&genreID=' + genreID + '&subGenre=' + subGenre + '&subGenreID=' + subGenreID + '&start=' + nextStart;
		if (section === 'mci') { nextURL += '&section=mci'; }
		nextURL += '\')';
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

function getMciSubCategoryVideo(offeringid, title, rating, genre, genreID, subGenre, subGenreID, columnNumber, rowNumber, count, section, screenFormat) {
	"use strict";
	var divContent = '', constructURL = '', className = 'lineItems', rowNumberPE = rowNumber;
	// alert(screenFormat);
	count++;
	if (section === 'mci') { rowNumberPE = rowNumber - 1; }
	if (rating === 'TV-MA') {
		constructURL = 'mciPassword.html?genre=' + encodeURIComponent(genre) + '&genreID=' + genreID + '&subGenre=' + encodeURIComponent(subGenre) + '&subGenreID=' + subGenreID + '&offeringId=' + offeringid;
	} else {
		constructURL = 'mciTitle.html?genre=' + encodeURIComponent(genre) + '&genreID=' + genreID + '&subGenre=' + encodeURIComponent(subGenre) + '&subGenreID=' + subGenreID + '&offeringId=' + offeringid;
	}
	if (screenFormat === 'HD') {
		divContent = '<div class=\"lineColumnMainWideMci lineColumnMainWide' + rowNumber + ' lineLargePE' + columnNumber + '\" id=\"divLink' + count + '\" onclick=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')\"';
		className = 'lineItemsMainWide';
	} else {
		divContent = '<div class=\"line lineWide linePE' + rowNumberPE + '\" id=\"divLink' + count + '\" onclick=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')\"';
	}
	divContent += ' onmouseover=\"onHoverDiv(\'onmouseover\', \'divLink' + count + '\',\'left\',\'true\',' + columnNumber + ',' + rowNumberPE + ');\"';
	divContent += ' onmouseout=\"onHoverDiv(\'onmouseout\', \'divLink' + count + '\',\'right\',\'true\',' + columnNumber + ',' + rowNumberPE + ');\">';
				
	divContent += '<a tabIndex=\"' + count + '\" class=\"' + className + '\" id=\"link' + rowNumber + '\" href=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')\"';
	divContent += ' onFocus=\"onHoverDiv(\'onFocus\', \'divLink' + count + '\' ,\'left\',\'true\',' + columnNumber + ',' + rowNumberPE + '); offSetFunction(\'divLink' + count + '\');\"';
	divContent += ' onBlur=\"onHoverDiv(\'onBlur\', \'divLink' + count + '\' ,\'right\',\'true\',' + columnNumber + ',' + rowNumberPE + ');\"';
	divContent += '>' + languageIcon(title, 'short', screenFormat) + '</a>';
	// if (screenFormat === 'HD') {
		// divContent += ' <img src=\"../images/icons/videoIcon' + screenFormat + '.gif\" />';
	// }
	divContent += '</div>';
	return divContent;
}

function getMciSubCategory993Video(offeringid, title, rating, runtime, summary, genre, genreID, subGenre, subGenreID, columnNumber, rowNumber, count, quickPlayFlag, view, titleFormat, screenFormat) {
	"use strict";
	var divContent = '', constructURL = '', className = 'lineItems', onFocusContent = '';

	if (screenFormat === 'SD') {
		divContent = '<div class=\"lineColumnMain lineColumnMain' + columnNumber + ' linePE' + rowNumber + '\" id=\"line' + rowNumber + '\">';
		if (summary.length > 60) {summary = summary.substr(0, 60) + '...'; }
	} else {
		divContent = '<div class=\"lineColumnMainWidePE lineColumnMainWide' + rowNumber + ' lineLargePE' + columnNumber + '\" id=\"line' + rowNumber + '\">';
		className = 'lineItemsMainWide';
		if (summary.length > 90) {summary = summary.substr(0, 90) + '...'; }
	}

	constructURL = 'patientEdTitle.html?offeringId=' + offeringid + '&genre=' + genre + '&subGenre=' + subGenre;
	if (runtime) { onFocusContent = ' onfocus=\"(displayDescriptionLegend(\'' + summary + ' (' + runtime + ')\'))\"'; }
	divContent += '<a tabIndex=\"' + count + '\" href=\"javascript:ForwardWithIDAndQuery(\'' + constructURL + '\')' + '\" class=\"' + className + '\" id=\"link' + rowNumber + '\"';
	divContent += 'class=\"' + className + '\"';
	if (onFocusContent !== '') { divContent += onFocusContent + ' onblur=\"displayDescriptionLegend(\'\');\"'; }

	divContent += '>' + languageIcon(title, 'short', screenFormat);
	divContent += '</a>';

	if (screenFormat === 'HD') {
		// divContent += ' <img src=\"../images/icons/videoIcon' + screenFormat + '.gif\" />';
	}

	if (rating === 'TV-MA') {
		divContent += " <img src=\"../images/icons/password.gif\" />";
	}
	divContent += '</div>';

	return divContent;
}