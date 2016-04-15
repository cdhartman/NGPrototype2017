/*jslint browser: true*/
/*global $, jQuery, alert, console, document, getPatientEdFavCategoriesError */

// Extend the autocomplete widget with a new "suggest" option.
$.widget("app.autocomplete", $.ui.autocomplete, {

	options: {suggest: false},

	// Called when the autocomplete menu is about to be displayed.
	_suggest: function (offerings) {
		// If there's a "suggest" function, use it to render the
		// offerings. Otherwise, use the default _suggest() implementation.
		if ($.isFunction(this.options.suggest)) {
			return this.options.suggest(offerings);
		}
		this._super(offerings);
	},

	// Called when the autocomplete menu is about to be hidden.
	_close: function (e) {

		// If there's a "suggest" function, call it with an
		// empty array so it can clean up. Otherwise, use the
		// default _close() implementation.
		if ($.isFunction(this.options.suggest)) {
			this.options.suggest([]);
			return this._trigger("close", e);
		}
		this._super(e);
	}
});

function getVideoList() {
	"use strict";
	var xmlURL = "../../modAssets/xml/Catalogmin.xml", count, site = getSite();
	// xmlURL = "searchSummary.html";
	xmlURL = "../../modAssets/xml/SearchPeMi.xml";
	
	$.ajax({
		url: xmlURL,
		success: function (xmlResponse) {
			/* parse response */
			var data = $("offering", xmlResponse).map(
				function () { 
					if (site === 'FL') {
						return {
								value: $("label", this).text(),
								id: $("value", this).text()
							};
					} else {
						if ($("label", this).text().indexOf(" HD") === -1 && $("label", this).text().indexOf("-HD") === -1) {
							return {
								value: $("label", this).text(),
								id: $("value", this).text()
							};
						}
					}
				}).get();

			$("input#searchBox").autocomplete({
				source: data,
				suggest:
					function (offerings) {
						var $div = $(".results").empty();
						$('#itemCount').html(offerings.length + ' videos');
						$.each(offerings, function (i,  row) {
							$("<a/>").attr("href", '../playTitle.html?offering=' + this.id)
								   .text(this.label)
								   .attr("id", "link" + i)
								   .appendTo($div);
						});
					}
					
			});

		}
	});
	$("input#searchBox").bind('focus', function () {
		$("input#searchBox:focus").autocomplete("search");
	});
	
}
			//if ($('#searchResults').not(':empty')){
			//	$( "#link0" ).focus();
			//}
$(document).ready(function () {
	getVideoList();
});