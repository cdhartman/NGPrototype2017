/*jslint browser: true*/
/*global $, jQuery, alert, console, document, handleAjaxError, parseAndDisplayPatEdCategory, formatCategoryName, getURLParameter */

function getPatientEdCategory(genreId, genre, subGenreId, subGenre, start, quickPlayFlag, view, targetDiv, screenFormat) {
	"use strict";
	var xmlURL = '../xml/Catalog.xml', dataType = 'xml', node;
	if (quickPlayFlag === '1') { xmlURL = '../xml/993.xml'; }
	if (view === 'GBS') { xmlURL = '../xml/GBS.xml'; }
	// alert(xmlURL);
	$.ajax({
		type: "GET",
		url: xmlURL,
		dataType: dataType,
		success: function (xml) {
			// get the requested catalogue node and call function for processing
			if (genreId !== '' && genreId !== 'undefined') {
				node = $(xml).contents().find('category[id=\"' + genreId + '\"]').children();
			} else {
				node = $(xml).contents().find('category[name=\"' + genre + '\"]').children();
			}
			parseAndDisplayPatEdCategory(node, genreId, genre, subGenreId, subGenre, start, quickPlayFlag, view, targetDiv, screenFormat);
		},
		error: function (jqXHR, statusText, errorThrown) {
			handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdCategory');
		}
	});
}

function parseAndDisplayPatEdCategory(node, genreId, genre, subGenreId, subGenre, start, quickPlayFlag, view, targetDiv, screenFormat) {
	"use strict";
	var divContent = '', columnNumber = 0, rowNumber = 1, screenCount = 1, categoriesPerScreen = 11, categoryName = '', constructURL = '', nextURL,
		nodeLength = $(node).length - 1, i = 0, nextStartTemp = 0, currentScreen = 0, title = '', endCount = 0, navigationLegend = '', videosInCategory = 0, classFormat = '', actualcolumnNumber = 0,
		numberOfColumns = 3, lineColumnMainWideFolderClass = '', count = 0;
	if (screenFormat === 'SD') {
		categoriesPerScreen = 9;
		classFormat = 'Wide';
	} else {
		classFormat = 'MainWide';
	}
	if (section === 'mci') { 
		categoriesPerScreen = categoriesPerScreen + 1;
	}
	screenCount = Math.round(parseFloat(((nodeLength - 1) / categoriesPerScreen) + 0.5));
	currentScreen = Math.round((start / categoriesPerScreen) + 1);

	// genre = decodeURI(genre);
	if (genre === 'Frequently Viewed') {
		title = getURLParameter('subGenre', '').replace(/\%20/g, ' ');
		// genre = subGenre;
		// genreId = subGenreId;
	} else {
		title = genre;
	}

	// $('#title').html(title);
	$(node).each(function (i,  row) {
		// alert('loi1' + ' | ' + $(this).attr('name') + ' | ' + $(this).attr('id') + ' | ' + $(this).attr('hasCategories') + ' | ' + start + ' | ' + i + ' | ' + columnNumber + ' | ' + categoriesPerScreen);
		if ($(this).attr('name') !== undefined  && i >= start && columnNumber < categoriesPerScreen) {
			// alert('loi2');
			columnNumber++;
			count++;
			if (section === 'mci') { actualcolumnNumber = columnNumber - 1 } else { actualcolumnNumber = columnNumber }
			videosInCategory = $(this).children().length - 1;
			categoryName = formatCategoryName($(this).attr('name'), 40);
			categoryName = languageIcon(categoryName, '', 'HD')
			
			subGenre = $(this).attr('name');

			if (view === 'Adult' || view === 'Pediatric') {
				constructURL = 'patientEdGenre.html?genre=' + encodeURI(genre) + '&subGenre=' + encodeURI(subGenre) + '&genreID=' + genreId + '&subGenreID=' + $(this).attr('id') + '&view=' + view;
				lineColumnMainWideFolderClass = 'lineColumnMainWideFolder';
			} else if ($(this).attr('exitAndTune') === 'false') {
				// constructURL = 'patientEdSubCat.html?genre=' + encodeURI(subGenre) + '&genreID=' + $(this).attr('id') + '&view=' + view;
				constructURL = 'patientEdSubCat.html?genre=' + encodeURI(genre) + '&subGenre=' + encodeURI(subGenre) + '&genreID=' + $(this).attr('id') + '&view=' + view;
				lineColumnMainWideFolderClass = 'lineColumnMainWideFolder';
			} else if ($(this).attr('hasCategories') === 'false') {
				constructURL = 'patientEdGenre.html?genre=' + encodeURI(genre) + '&subGenre=' + encodeURI(subGenre) + '&genreID=' + genreId + '&subGenreID=' + $(this).attr('id') + '&view=' + view;
				lineColumnMainWideFolderClass = 'lineColumnMainWide';
			} else { 
				constructURL = 'patientEdTitle.html?genre=' + encodeURI(genre) + '&genreID=' + encodeURI(genreId) + '&subGenre=' + encodeURI(subGenre) + '&subGenreID=' + encodeURI(subGenreId) + '&view=' + view + '&offeringId=' + $(this).text();
				lineColumnMainWideFolderClass = 'lineColumnMainWide';
			}

			if (section === 'mci') { constructURL += '&section=mci'; }
			if (quickPlayFlag === '1') { constructURL += '&quickPlay=' + quickPlayFlag; }
			constructURL = 'ForwardWithIDAndQuery(\'' + constructURL + '\')';

			divContent += '<div class=\"' + lineColumnMainWideFolderClass + ' lineColumnMainWide' + ' lineColumn' + classFormat + actualcolumnNumber;

			

			if (screenFormat === 'SD') {
				divContent += rowNumber + ' linePE';
			} else {
				divContent += ' lineLarge';
			}
			divContent += rowNumber + '\" id=\"divLink' + count + '\" onclick=\javascript:' + constructURL + ' \"';
			// alert($(this).attr('exitAndTune'));
			divContent += ' onmouseover=\"onHoverDiv(\'onmouseover\', \'divLink' + count + '\' ,\'left\',\'false\',' + rowNumber + ',' + actualcolumnNumber + ');\"';
			divContent += ' onmouseout=\"onHoverDiv(\'onmouseout\', \'divLink' + count + '\' ,\'right\',\'false\',' + rowNumber + ',' + actualcolumnNumber + ');\"';
			divContent += ' \">\n';

			divContent += '<a tabindex=\"' + count + '\" id=\"link' + columnNumber + '\" href=\"javascript:' + constructURL  + ';\"';
			if (screenFormat === 'SD') {
				divContent += '  class=\"lineItems\"';
			} else {
				divContent += '  class=\"lineItemsMainWide\"';
			}
			divContent += ' onFocus=\"onHoverDiv(\'onFocus\', \'divLink' + count + '\' ,\'left\',\'false\',' + rowNumber + ',' + actualcolumnNumber + '); offSetFunction(\'divLink' + count + '\');\"';
			divContent += ' onBlur=\"onHoverDiv(\'onBlur\', \'divLink' + count + '\' ,\'right\',\'false\',' + rowNumber + ',' + actualcolumnNumber + ');\"';
			divContent += '>';
			divContent += categoryName;
			divContent += '</a>';
			//divContent += '<span class=videoCount>(' + videosInCategory + ')</span>';
			divContent += '</div>';

			if (columnNumber === categoriesPerScreen) {
				return false;
			}

			if (columnNumber >= numberOfColumns) {
				// if column is full, move to next column
				columnNumber = 0;
				rowNumber++;
			}

			divContent += '\n\r';
		}
	});

	$('#' + targetDiv).html(divContent);

	endCount = columnNumber + parseInt(start, 10) - 1;
	navigationLegend = start + ' - ' + endCount + ' of ' + nodeLength + ' subcategories';
	$('#itemCount').html(navigationLegend);
}