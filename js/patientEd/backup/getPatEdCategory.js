/*jslint browser: true*/
/*global $, jQuery, alert, console, document, handleAjaxError, parseAndDisplayPatEdCategory, formatCategoryName, getURLParameter */

function getPatientEdCategory(genreId, genre, subGenreId, subGenre, start, quickPlayFlag, view, targetDiv, screenFormat) {
	"use strict";
	var xmlURL = '../../modAssets/xml/Catalog.xml', dataType = 'xml', node;
	if (quickPlayFlag === '1') { xmlURL = '../../modAssets/xml/993.xml'; }
	$.ajax({
		type: "GET",
		url: xmlURL,
		dataType: dataType,
		success: function (xml) {
			// get the requested catalogue node and call function for processing
			if (genreId !== '') {
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
	var divContent = '', rowNumber = 0, columnNumber = 1, screenCount = 1, categoriesPerScreen = 13, categoryName = '', constructURL = '', nextURL,
		nodeLength = $(node).length - 1, i = 0, nextStartTemp = 0, currentScreen = 0, title = '', endCount = 0, navigationLegend = '', videosInCategory = 0;
	if (screenFormat === 'SD') {
		categoriesPerScreen = 10;
	}
	screenCount = Math.round(parseFloat(((nodeLength - 1) / categoriesPerScreen) + 0.5));
	currentScreen = Math.round((start / categoriesPerScreen) + 1);

	// genre = decodeURI(genre);
	if (genre === 'Frequently Viewed') {
		title = getURLParameter('subGenre', '').replace(/\%20/g, ' ');
		genre = subGenre;
		genreId = subGenreId;
	} else {
		title = genre;
	}

	// $('#title').html(title);
	$(node).each(function (i,  row) {

		if ($(this).attr('name') !== undefined  && i >= start && rowNumber < categoriesPerScreen) {
			rowNumber++;
			videosInCategory = $(this).children().length - 1;
			categoryName = formatCategoryName($(this).attr('name'), 40);
			subGenre = $(this).attr('name');
			constructURL = 'patientEdGenre.html?genre=' + encodeURI(genre) + '&subGenre=' + encodeURI(subGenre) + '&genreID=' + genreId + '&subGenreID=' + $(this).attr('id') + '&view=' + view;
			if (quickPlayFlag === '1') { constructURL += '&quickPlay=' + quickPlayFlag; }
			constructURL = 'ForwardWithIDAndQuery(\'' + constructURL + '\')';

			divContent += '<div class=\"lineColumn lineColumnWide' + columnNumber + ' linePE' + rowNumber + '\" id=\"lineColumn' + rowNumber + '\">';
			divContent += '<a tabindex=\"' + rowNumber + '\" id=\"link' + rowNumber + '\" href=\"javascript:' + constructURL  + ';\" class=\"lineItems\"';
			divContent += '>';
			divContent += categoryName;
			divContent += '</a>' + '<span class=videoCount>(' + videosInCategory + ')</span></div>';

			if (rowNumber === categoriesPerScreen) {
				return false;
			}
			divContent += '\n\r';
		}
	});

	if (rowNumber === categoriesPerScreen) {
		$('#boxbottom1280-2').css("display", "block");
		nextURL = 'javascript:ForwardWithIDAndQuery(\'patientEdSubCat.html?genre=' + genre + '&genreID=' + genreId + '&start=' + (rowNumber + 1) + '\')';
		setTimeout(function () {
			document.getElementById("nextButtonHref").setAttribute('href', nextURL);
			document.getElementById("navbarNext").className = "navbar navbar2";
		}, 900);

		if (screenCount > 1) {
			divContent += '<div class=\"screenBulletIndicatorPE\">';
			for (i = 1; i < screenCount + 1; i++) {
				nextStartTemp = (i - 1) * categoriesPerScreen + 1;
				if (i === currentScreen) {
					divContent += '<img src=\"../images/icons/bullets/bullet-selected.gif\" /> ';
				} else {
					divContent += '<img src=\"../images/icons/bullets/bullet.gif\" /> ';
				}
				divContent += ' &nbsp;&nbsp; ';
			}
			divContent += '</div>';
		}

	} else {
		$('#navbarNext').html('');
	}


	$('#' + targetDiv).html(divContent);

	endCount = rowNumber + parseInt(start, 10) - 1;
	navigationLegend = start + ' - ' + endCount + ' of ' + nodeLength + ' subcategories';
	$('#itemCount').html(navigationLegend);
}