/*jslint browser: true*/
/*global $, jQuery, alert, console, parseAndDisplayPatEdVideo, convertRuntimePE, handleAjaxError, document */

function getPatientVideo(offeringId, genre, subGenre, view, targetDiv) {
	"use strict";
	var xmlURL = '../xml/Catalog.xml', dataType = 'xml', a, node;

	a = $.ajax({
		type: "GET",
		url: xmlURL,
		dataType: dataType,
		success: function (xml) {
			// get the requested catalogue node and call function for processing
			node = $(xml).find('offering[offeringId=\"' + offeringId + '\"]');
			parseAndDisplayPatEdVideo(node, offeringId, genre, subGenre, view, targetDiv);
		},
		error: function (jqXHR, statusText, errorThrown) {
			handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdSubVideo');
		}
	});
}

function parseAndDisplayPatEdVideo(node, offeringId, genre, subGenre, view, targetDiv) {
	"use strict";
	var divContent = '', divMetaDataContent = '', videoTitle = '', runTime = '', videoDescription = '', creationDate = '', categories = '', titlePath1 = '', titlePath2 = '';

	//get video meta data
	videoTitle = languageIcon(node.find('description:eq(0)').text(), 'long');

	runTime = convertRuntimePE(node.find('metadata[name="MOD\\:\\:Run_Time"]').attr('value'), true);
	// creationDate = node.find('metadata[name="AMS\\:\\:Creation_Date"]').attr('value');
	node.children().each(function (i,  row) {
		if ($(row).find('description:eq(0)').text() !== '') { videoDescription = $(row).find('description:eq(0)').text(); }
	});
	divContent += '<span class=\"detailVideoTitle\">' + videoTitle + '</span><br />';
	divContent += '<span class=\"videoMetaDataNG\">' + runTime + '</span> &nbsp;&nbsp; <img src=\"../images/icons/ccPE.gif\" ><br /><br />';
	
	divContent += '<span class="peDescription">' + videoDescription + '</span>';
	// divMetaDataContent = runTime;
	if (genre === 'Frequently Viewed') {genre = 'Healthcare Provider';}
	if (view === 'freqViewed') {view = 'Healthcare Provider';}
	titlePath1 = 'Patient Education<br />';
	if (view !== '') {
		titlePath2 += decodeURIComponent(view);
	}
	if (view !== genre) {
		if (titlePath2 !== '') {titlePath2 += ' <img src=\"../images/icons/breadcrumb-triangle.png\" style=padding:6px; >' }
		titlePath2 += decodeURIComponent(genre);
	}
	if (subGenre !== genre) {
		titlePath2 +=  ' <img src=\"../images/icons/breadcrumb-triangle.png\" style=padding:6px; > ' + decodeURIComponent(subGenre);
	}
	titlePath2 = '<span style=\"font-size: 38px;\">' + titlePath2 + '</span>';
	$('#title').html(titlePath1 + titlePath2);
	// divContent += '<a href=\"../playTitle.html?offering=' + offeringId + '\" id=\"playBtn\"><img src=\"../images/misc/play.gif\" /></a>';
	$('#' + targetDiv).html(divContent);
	// $('#videoMetaData').html(divMetaDataContent);
}