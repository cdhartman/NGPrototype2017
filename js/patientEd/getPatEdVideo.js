/*jslint browser: true*/
/*global $, jQuery, alert, console, parseAndDisplayPatEdVideo, convertRuntimePE, handleAjaxError, document */

function getPatientVideo(offeringId, genre, subGenre, targetDiv) {
	"use strict";
	var xmlURL = '../../modAssets/xml/Catalog.xml', dataType = 'xml', a, node;

	a = $.ajax({
		type: "GET",
		url: xmlURL,
		dataType: dataType,
		success: function (xml) {
			// get the requested catalogue node and call function for processing
			node = $(xml).find('offering[offeringId=\"' + offeringId + '\"]');
			parseAndDisplayPatEdVideo(node, offeringId, genre, subGenre, targetDiv);
		},
		error: function (jqXHR, statusText, errorThrown) {
			handleAjaxError(jqXHR, statusText, errorThrown, 'getPatientEdSubVideo');
		}
	});
}

function parseAndDisplayPatEdVideo(node, offeringId, genre, subGenre, targetDiv) {
	"use strict";
	var divContent = '', divMetaDataContent = '', videoTitle = '', runTime = '', videoDescription = '', creationDate = '', categories = '';

	//get video meta data
	videoTitle = languageIcon(node.find('description:eq(0)').text(), 'long');

	runTime = convertRuntimePE(node.find('metadata[name="MOD\\:\\:Run_Time"]').attr('value'));
	creationDate = node.find('metadata[name="AMS\\:\\:Creation_Date"]').attr('value');
	node.children().each(function (i,  row) {
		if ($(row).find('description:eq(0)').text() !== '') { videoDescription = $(row).find('description:eq(0)').text(); }
	});
	node.find('metadata[name="MOD\\:\\:Category"]').each(function (i,  row) {
		if ($(this).attr('value').indexOf("MOD/Patient Education") !== -1) {
			categories += '<li><span>' + $(this).attr('value').replace('MOD/Patient Education/', '').replace('/', ' > ') + '</span></li>';
		}
	});
	divContent += '<span class=\"detailVideoTitle\">' + videoTitle + '</span><br /><br /><br /><br /><br /><br />';
	divContent += '<span class="peDescription">' + videoDescription + '</span><br /><br />';
	divMetaDataContent = runTime;
	if (genre === 'Frequently Viewed') {genre = 'Health Care Provider';}
	$('#title').html('Patient Education<br /><span style=\"font-size: 44px;\">' + decodeURIComponent(genre) + ' <img src=\"../images/icons/breadcrumb-triangle.png\" style=padding:6px; > ' + decodeURIComponent(subGenre)) + '</span>';
	// divContent += '<a href=\"../playTitle.html?offering=' + offeringId + '\" id=\"playBtn\"><img src=\"../images/misc/play.gif\" /></a>';
	$('#' + targetDiv).html(divContent);
	$('#videoMetaData').html(divMetaDataContent);
}