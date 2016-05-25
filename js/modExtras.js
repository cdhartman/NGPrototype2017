/*jslint browser: true*/
/*global $, jQuery, alert, console, document */

var weatherGlobalVariable = '', weatherGlobalVariable = '';


function debugNavBar(id) {
	alert('previousKeyPressed=' + previousKeyPressed + ', lastKeyPressed=' + lastKeyPressed + ', lastColumnSelected=' + lastColumnSelected + ', previousColumnSelected=' + previousColumnSelected + ', lastRowSelected=' +lastRowSelected + ', previousRowSelected=' + previousRowSelected  );
}

function isPhoneGap() {
    if (document.location.protocol == 'file:') { return true } else { return false };
}

function isMobileDevice() {
    if ((navigator.userAgent.search("Windows") > -1 || navigator.userAgent.search("Macintosh") > -1)) {
		return false;
	} else {
		return true;
	}
}

function processLeftNavBarFocus(url, section) {
	
	if (url !== '' && isPhoneGap() && view !== 'section' && false) {
		// alert('view: ' + view + ' | ' + 'section: ' + section);
		window.location = 'javascript:ForwardWithIDAndQuery(\'' + url + '\')';
	}
	// alert(section);
	if (section === 'Adult') {
		$("#aNavBarAdult").addClass("lineItemsNBhover");
		$("#aNavBarPediatric").removeClass("lineItemsNBhover");
		$("#aNavBarFV").removeClass("lineItemsNBhover");
		// $("#aNavBarAdult").trigger("mouseover");
	} else if (section === 'Pediatric') {
		$("#aNavBarAdult").removeClass("lineItemsNBhover");
		$("#aNavBarPediatric").addClass("lineItemsNBhover");
		$("#aNavBarFV").removeClass("lineItemsNBhover");
		// $("#aNavBarPediatric").trigger("mouseover");
	} else if (section === 'freqViewed') {
		$("#aNavBarAdult").removeClass("lineItemsNBhover");
		$("#aNavBarPediatric").removeClass("lineItemsNBhover");
		$("#aNavBarFV").addClass("lineItemsNBhover");
		// $("#aNavBarFV").trigger("mouseover");
	}
}

function leftNavBarOnBlurHandler(id) {
	// alert(lastKeyPressed);
	$('#' + id).removeClass("lineItemsNBhover");
	if (lastKeyPressed === 39) {
		navBarLeftFunction('collapse');
		$('[tabindex=1]').focus();
	}
}

function processPatEdView(view) {
	"use strict";
// alert(view);
	if (view === 'freqViewed') {
		getPatientEdCategories('../xml/993.xml', '3', start, numOfColumns, numOfRows, classFormat, 'categories', view, titleLength, site, screenFormat);
		updateVideoDetailTitleBar('Healthcare Provider', '', 'title', '', 'HD');
	} else if (view === 'GBS') {
		getPatientEdCategories('../xml/GBS.xml', '3', start, numOfColumns, numOfRows, classFormat, 'categories', view, titleLength, site, screenFormat);
		updateVideoDetailTitleBar('Healthcare Provider', '', 'title', '', 'HD');
	} else if (view === 'Pediatric') {
		getPatientEdCategories('../xml/Catalog.xml', '4711', start, numOfColumns, numOfRows, classFormat, 'categories', view, titleLength, site, screenFormat);
		updateVideoDetailTitleBar('Pediatric Education', '', 'title', '', 'HD');
	} else if (view === 'aNavBarChaplin') {
		subGenreID = '435';
		getMciSubCategory('Chaplain Services', '24', 'Chaplain%20Services', '435', start, '', screenFormat, 'mci', titleFormat, section, 'categories');
		updateVideoDetailTitleBar('Chaplain Services', '', 'title', 'mci', 'HD');
	} else if (view === 'aNavBarEntertainment') {
		subGenreID = '119';
		getMciSubCategory('Entertainment', '24', 'Entertainment', '119', start, '', screenFormat, 'mci', titleFormat, section, 'categories');
		updateVideoDetailTitleBar('Entertainment', '', 'title', 'mci', 'HD');
	} else if (view === 'aNavBarHistory') {
		subGenreID = '118';
		getMciSubCategory('History', '24', 'History', '118', start, '', screenFormat, 'mci', titleFormat, section, 'categories');
		updateVideoDetailTitleBar('History', '', 'title', 'mci', 'HD');
	} else if (view === 'aNavBarHIM') {
		getMciCategory('14031', 'Humanities%20in%20Medicine', subGenreID, subGenre, start, '', 'mci', 'categories', screenFormat);
		updateVideoDetailTitleBar('Humanities in Medicine', '', 'title', 'mci', 'HD');
	} else if (view === 'aNavBarHF') {
		getMciSubCategory('Heritage%20Films', '24', 'Heritage%20Films', '99900', start, '', screenFormat, 'mci', titleFormat, section, 'categories');
		updateVideoDetailTitleBar('Heritage Films', '', 'title', 'mci', 'HD');
		subGenreID = '99900';
	} else if (view === 'aNavBarInformation') {
		getMciSubCategory('Information', '122', 'Information', '122', start, '', screenFormat, 'mci', titleFormat, section, 'categories');
		updateVideoDetailTitleBar('Information', '', 'title', 'mci', 'HD');
	} else if (view === 'aNavBarPatientStories') {
		getMciCategory('28435', 'Patient Stories', subGenreID, subGenre, start, '', 'mci', 'categories', screenFormat);
		updateVideoDetailTitleBar('Patient Stories', '', 'title', 'mci', 'HD');
	} else {
		getPatientEdCategories('../xml/Catalog.xml', '3', start, numOfColumns, numOfRows, classFormat, 'categories', view, titleLength, site, screenFormat);
		updateVideoDetailTitleBar('Adult Education', '', 'title', '', 'HD');
	}
	processLeftNavBarFocus('', view);
}

function processLeftNavBarOnEvent(viewVariable, functionType) {
	"use strict";
	var okToProceed = false;
	if (isPhoneGap() && functionType === 'onfocus') {
		okToProceed = true
	}
	if (!isPhoneGap() && functionType === 'onclick') {
		okToProceed = true
	}
	// alert('processLeftNavBarOnEvent: ' + id);
	if (okToProceed) {
		$('#categories').html('');
		$('#favCategoriesSpan').html('');
		view = viewVariable;
		processPatEdView(viewVariable);
	}
}
function getMovieDBVideoInfoDataSuccess (id) {

	var trailerKey = '';

	if (isPhoneGap()) {
		trailerKey = '<img src=\"../images/button_transparency.gif\" style=\"position: absolute; left: 822px; top:410px; cursor: pointer; cursor: hand;\" width=\"230\" height=\"62\" 		onclick=\"playVideo(\'http://distribution.videos.mayo.edu:1935/vod/_definst_/library/clips/' + id + '.mp4/playlist.m3u8\')\" />';
	} else if (navigator.userAgent.search("iPad") > -1 || isMobileDevice()) {
		trailerKey = '<img src=\"../images/button_transparency.gif\" style=\"position: absolute; left: 822px; top:410px; cursor: pointer; cursor: hand;\" width=\"230\" height=\"62\" tabindex=\"1\" id=\"playButton\" 	onclick=\"window.location.assign(\'http://distribution.videos.mayo.edu:1935/vod/_definst_/library/clips/' + id + '.mp4/playlist.m3u8\')\" />';
	} else {
		trailerKey = '<img src=\"../images/button_transparency.gif\" style=\"position: absolute; left: 822px; top:410px; cursor: pointer; cursor: hand;\" width=\"230\" height=\"62\" tabindex=\"1\" id=\"playButton\" onclick=\"window.location.assign(\'http://rofiwa001a.mayo.edu/library/clips/' + id + '.mp4\')\"; />';
	}
	// alert(trailerKey);
	$("#playButton").html(trailerKey);
	document.getElementById('playButton').focus();
}


function displayHtmlToolbar(id) {
	if (navigator.userAgent.indexOf('Android') > 0) { document.getElementById(id).style.display = "none"; } else {  }
}
function offSetFunction(id, section, subGenreID) {
	var offset = $('#'+ id).offset();
	var posY = offset.top - $(window).scrollTop();
	var y = $(window).scrollTop();  //your current y position on the page
	var posX = offset.left - $(window).scrollLeft();
	var yOffset = 0;
	if (subGenreID === '99900') {
		yOffset = 200
	} else {
		yOffset = 700;
	}
	// alert('subGenreID: ' + subGenreID + ', id: ' + id + ', section: ' + section + ', posX: ' + posX + ', posY: ' + posY + ', lastColumnSelected ='  + lastColumnSelected + ', previousColumnSelected=' +  previousColumnSelected + ', previousRowSelected=' + previousRowSelected + ', lastRowSelected=' + lastRowSelected)
	if( posY > yOffset) { // alert('lkj');
		// $.scrollTo('+=100px', 800, { axis:'y' });
		// $(id).scrollTop(300);
		// alert('posX: ' + posX + ', posY: ' + posY + ', lastColumnSelected ='  + lastColumnSelected + ', previousColumnSelected=' +  previousColumnSelected + ', previousRowSelected=' + previousRowSelected + ', lastRowSelected=' + lastRowSelected)
		// $('#'+ id).animate({scrollTop: '+=280px'}, 800);
		if (section ==='MCI') {
			$(window).scrollTop(y + 200);
			// $('#oneRowContentHandler').css("top", posY);
		} else {
			$(window).scrollTop(y + 270);
			// $('#oneRowContentHandler').css("top", posY);
		}
		// $(window).scrollTop(posY-200);
	}
	// alert(posX + ', y: ' + posY);
	$('#oneRowContentHandler').css("top", $(window).scrollTop() + posY);
}

function centerItFixedWidth(target, outer){
  var out = $('html, body');
  var tar = $('#' + target);
  var x = window.innerHeight
  var y = tar.outerHeight(true);
  var z = tar.index();
  out.scroll(Math.max(0, (y * z) - (x - y)/2));
  var temp = (x - y)/2; 
  // alert(temp + ' | x=' + x + ' | y=' + y + ' | z=' + z );
  $('html, body').animate({scrollTop: temp}, 800);
}




function leftNavBarCatSubCatHandler(id, tabIndexPosition) {
	if (navigator.userAgent.indexOf('Android') > 0) {
		$('[tabindex=' + tabIndexPosition + ']').focus();
		adjustLeftNavBarOpacity('navBarLeft');
		adjustLeftNavBarOpacity('navBarLeftMci');
	} else {
		if ( $('#'+ id).width() !== 45 ) {
			navBarLeftFunction();
			adjustLeftNavBarOpacity('navBarLeft');
			adjustLeftNavBarOpacity('navBarLeftMci');
		}
	}
}

function adjustLeftNavBarOpacity(id) {
	if ( $('#'+ id).width() !== 45 ) {
		if ($('#'+ id).css("opacity") !== '1') {
			$('#'+ id).fadeTo( "fast" , 1.0);
		}
	} else {
		$('#'+ id).fadeTo( "fast" , 0.7);
	}
}
function launcherHandler(param1) {
	"use strict";
	var offset = 3 - launcherState;
	// alert('images/screens/launcher/' + param1 + '.png');
	// document.getElementById("launcherBackground").src = 'images/screens/launcher/' + '2' + '.png';
	param1 = param1 - offset;
	param1 = String(param1);
	if (param1 === '0') {
		param1 = '5';
	} else if (param1 === '-1') {
		param1 = '4';
	} else if (param1 === '6') {
		param1 = '1';
	} else if (param1 === '7') {
		param1 = '2';
	}
	
	switch(param1) {
		case '1':
			$("#activeLauncherSelectionHREF").attr("href",'movies/index.html');
			launcherState = 1;
		break;
		case '2':
			$("#activeLauncherSelectionHREF").attr("href",'relaxation/index.html');
			launcherState = 2;
		break;
		case '3':
			$("#activeLauncherSelectionHREF").attr("href",'patientEducation/index.html');
			launcherState = 3;
		break;
		case '4':
			$("#activeLauncherSelectionHREF").attr("href",'mci/index.html');
			launcherState = 4;
		break;
		case '5':
			$("#activeLauncherSelectionHREF").attr("href",'tv/index.html');
			launcherState = 5;
		break;
		default:
			$("#activeLauncherSelectionHREF").attr("href",'patientEducation/index.html');
			launcherState = 3;
	}
	
	
	launcherState = param1;
	
	//$("#launcherBackground").hide();
	$("#launcherBackground").attr("src",'images/screens/launcher/' + param1 + '.png').fadeIn(400);
	// $('#launcherBackground').width(1900);
	// $('#launcherBackground').height(850);
	// $("#launcherBackground").html('images/screens/launcher/' + '2' + '.png').fadeIn(400);
	setCookie('launcherState',launcherState,'360')
}

function sectionNextStaticScreen(id, param1) {
	if (param1 === '+') {
		screenNumber = screenNumber + 1;
	} else {
		screenNumber = screenNumber - 1;
	}
	// alert(screenNumber)
	if (screenNumber > numberOfScreens) {
		screenNumber = 1;
	} else if (screenNumber === 0) {
		screenNumber = numberOfScreens;
	}
	$( "#currentScreenIndicator" ).html(screenNumber);
	
	$("#" + id).attr("src",'images/' + screenNumber + '.png').fadeIn(400);
	// $("#" + id).attr('height','1063');
	// $("#" + id).attr('width','1890');
}

function goFullscreen(id) {
    // Get the element that we want to take into fullscreen mode
    var element = document.getElementById(id);

    // These function will not exist in the browsers that don't support fullscreen mode yet,
    // so we'll have to check to see if they're available before calling them.

    if (element.mozRequestFullScreen) {
      // This is how to go into fullscren mode in Firefox
      // Note the "moz" prefix, which is short for Mozilla.
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      // This is how to go into fullscreen mode in Chrome and Safari
      // Both of those browsers are based on the Webkit project, hence the same prefix.
      element.webkitRequestFullScreen();
   }
   // Hooray, now we're in fullscreen mode!
  }
  
function navBarLeftFunction(adjustLeftPane) {
	"use strict";
	// alert('navBarLeftFunction');
	if (adjustLeftPane == '') {
		if ( $('#navBarLeft').width() === 45 ) {
			adjustLeftPane = 'expand';
		} else {
			adjustLeftPane = 'collapse';
		}
	 }
	
	// alert('navBarLeft: ' + adjustLeftPane);
	if (adjustLeftPane === 'expand') {
		// alert('expand branch');
		$('#navBarLeft').width("542px");
		$('#navBarLeft').css('display','block');
		$('.navbarTopCategory').css('display','block');
		$('.navBarLeftMciTrigger').css("left", "+=505");
		$('.lineColumnMainWide1').css("left", "+=505");
		$('.lineColumnMainWide2').css("left", "+=505");
		$('.lineColumnMainWide3').css("left", "+=505");
		$('.lineColumnMainWide4').css("left", "+=505");
		$('.lineColumnMainWide5').css("left", "+=505");
		// $('#title').css("left", "+=505");
		// $('.box1sidePE').css("left", "+=505");
		// $('.box1sideMci').css("left", "+=505");
		$('.searchPE').css('display','block');
		$('#peNavBarHD').css('display','block');
		$('#mciNavBarHD').css('display','block');
	}
	
	if (adjustLeftPane === 'collapse') { 
		// alert($("#divLink1").css("left") );
		if ( $('#navBarLeft').width() !== 45 ) {
			$('#navBarLeft').width("45px");
			// alert('collapse branch' + $('#navBarLeft').width());
			$('#peNavBarHD').css('display','none');
			$('#mciNavBarHD').css('display','none');
			$('.navbarTopCategory').css('display','none');
			$('.navBarLeftMciTrigger').css("left", "+=-505");
			$('.lineColumnMainWide1').css("left", "+=-505");
			$('.lineColumnMainWide2').css("left", "+=-505");
			$('.lineColumnMainWide3').css("left", "+=-505");
			$('.lineColumnMainWide4').css("left", "+=-505");
			$('.lineColumnMainWide5').css("left", "+=-505");
			// $('#title').css("left", "+=-505");
			// $('.box1sidePE').css("left", "+=-505");
			// $('.box1sideMci').css("left", "+=-505");
			$('.searchPE').css('display','none');
		}
	}
	// alert($(document).height());
	adjustScreenHeightWidth();
	
	// alert($(document).height());
	// $('#container').css({paddingBottom: '45px'});;
}

function adjustScreenHeightWidth() {
	"use strict";
	// alert($(document).height());
	if ( $(document).height() > 1280) {
		$('#navBarLeft').height($(document).height() + 45);
	} else if ( $(document).height() > 1080) {
		$('#navBarLeft').height($(document).height());
	} else {
		$('#navBarLeft').height($(document).height());
	}
}

function onHoverDiv(javaScriptAction, selectedDiv, direction, videoFlag, row, column) {
	// "use strict";
	// alert('llkj' + ' | ' + selectedDiv + ' | ' + direction + ' | ' + videoFlag);
	// column = '4';
	// alert(selectedDiv);
	
	
	selectedDiv = document.getElementById(selectedDiv);
	if ( direction === 'left' ) {

		if (column === 1) { // alert('here1');
			$(selectedDiv).css("top", "-=30");
		} else if (column === 2) {
			$(selectedDiv).css("left", "-=30");
			$(selectedDiv).css("top", "-=30");
		} else if (column === 3) {
			$(selectedDiv).css("top", "-=30");
			$(selectedDiv).css("left", "-=60");
		} else {
			$(selectedDiv).css("left", "-=30");
			$(selectedDiv).css("top", "-=30");
		}

		if (subGenreID === '99900') {
			$('#videoListImage' + row + column).width(635);
		}
		$(selectedDiv).css("width", "+=60"); // alert($(selectedDiv).css("height"))
		
		if (videoFlag === 'true') {
			if (subGenreID === '99900') {
				$(selectedDiv).css("height", "544px");
			} else {
				$(selectedDiv).css("height", "260px");
			}
		} else { 
			$(selectedDiv).css("height", "186px");
		}
		$(selectedDiv).css('opacity', '1.0');
		$(selectedDiv).css( "zIndex", 100 );
		
	} else {
		if (column !== lastColumnSelected || previousColumnSelected === 0) {
			previousColumnSelected = lastColumnSelected;
			lastColumnSelected = column;
		}
		if (row !== lastRowSelected || previousRowSelected === 0) {
			previousRowSelected = lastRowSelected;
			lastRowSelected = row;
		}
		if (column === 1) {
			$(selectedDiv).css("top", "+=30");
		} else if (column === 2) {
			$(selectedDiv).css("left", "+=30");
			$(selectedDiv).css("top", "+=30");
		} else if (column === 3) {
			$(selectedDiv).css("top", "+=30");
			$(selectedDiv).css("left", "+=60");
		} else {
			$(selectedDiv).css("left", "+=30");
			$(selectedDiv).css("top", "+=30");
		}
		if (subGenreID === '99900') {
			$('.videoListImage').width(575);
		}
		
		$(selectedDiv).css( "zIndex", 1);
		$(selectedDiv).css("width", "-=60");
		if (videoFlag === 'true') {
			$(selectedDiv).css("height", "190px");
		} else { 
			$(selectedDiv).css("height", "126px");
		}
		$(selectedDiv).css('opacity', '0.7');
	}
	if ( $('#navBarLeft').width() !== 45) { // alert($('#navBarLeft').width());
		navBarLeftFunction('collapse');
		// $('#navBarLeft').fadeTo( "fast" , 0.7)
	}
	
	// if (column === 1) {alert('column=1')}
	if (column === 1 && lastKeyPressed === 37 && javaScriptAction === 'onBlur') {
		// alert('previousKeyPressed=' + previousKeyPressed + ', lastKeyPressed=' + lastKeyPressed + ', ' + 'column=' + column + ', javaScriptAction=' + javaScriptAction +
		// ', previousColumnSelected=' + previousColumnSelected + ', lastColumnSelected=' + lastColumnSelected + ', leftNavBarWidth=' + $('#navBarLeft').width());
		if ( $('#navBarLeft').width() === 45) {
			navBarLeftFunction('expand');
			$("html, body").animate({ scrollTop: 0 }, "fast");
			// $('#title').trigger('click');
			// alert(view);
			if (view === 'Adult') {
				$('[tabindex=97]').focus();
			} else if (view === 'Pediatric'){
				$('[tabindex=98]').focus();
			} else if (view === 'freqViewed' || view === 'Healthcare Provider') {
				$('[tabindex=99]').focus();
			} else if (view === 'mci') {
				if (genre === 'Chaplain Services') {
					$('[tabindex=93]').focus();
				} else if (genre === 'Entertainment') {
					$('[tabindex=94]').focus();
				} else if (genre === 'History') {
					$('[tabindex=95]').focus();
				} else if (genre === 'Heritage Films') {
					$('[tabindex=96]').focus();
				} else if (genre === 'Humanities in Medicine') {
					$('[tabindex=97]').focus();
				} else if (genre === 'Information') {
					$('[tabindex=98]').focus();
				} else if (genre === 'Patient Stories') {
					$('[tabindex=99]').focus();
				}
			}
		}
	}

}

function searchPE(sParam) {
	"use strict";
	alert('Search function under construction.')
}

function getURLParameter(sParam, defaultValue) {
	"use strict";
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), i, sParameterName;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1].replace('%20', ' ');
        }
    }
	return defaultValue;
}

function getURLParameterNoDefault(sParam) {
	"use strict";
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), i, sParameterName;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1].replace('%20', ' ');
        }
    }
}

function scrollMovieDetailsSD(target, action) {
	"use strict";
    var currentPosition = $('.' + target).scrollTop(), currentHeight = $('.' + target).prop('scrollHeight'), nextPosition = 0, scrollHeight = 286, numberOfScreens = 0, currentScreen = 0,
		posterArtURL = '', backdropArtURL = '', backdropArtURL1 = '', backdropArtURL2 = '', backdropArtURL3 = '';
	// alert(currentPosition + '|' + currentHeight);

	if (currentHeight !== 0) {
		numberOfScreens = currentHeight / scrollHeight;
		numberOfScreens = Math.ceil(numberOfScreens);
	}

	if ( action === '-') {
		nextPosition = currentPosition - scrollHeight;
	} else {
		nextPosition = currentPosition + scrollHeight;
	}

	currentScreen = Math.ceil( ((nextPosition) / scrollHeight) + 1);
	if (currentScreen === 0) {currentScreen = 1;}
	if (currentScreen > numberOfScreens) {currentScreen = numberOfScreens;}
		
	if (currentScreen === 1) {
		posterArtURL = '<img src=\"../../modAssets/images/movies/posters/' + movieID + '/' + movieID + '-medium.jpg\" />'
		$('#poster').html(posterArtURL);
		$('#Tomatoes').show();
	} else {
		backdropArtURL1 = '../../modAssets/images/movies/photos/' + theMovieDBID + '/' + theMovieDBID + '-photo-1.jpg';
		backdropArtURL2 = '../../modAssets/images/movies/photos/' + theMovieDBID + '/' + theMovieDBID + '-photo-2.jpg';
		backdropArtURL3 = '../../modAssets/images/movies/photos/' + theMovieDBID + '/' + theMovieDBID + '-photo-3.jpg';
		backdropArtURL = '<img src=\"' + backdropArtURL1 + '\" onerror=\"imageError(this, \'photos\',\'\');\" />'
		backdropArtURL += '<br / ><img src=\"' + backdropArtURL2 + '\"  onerror=\"imageError(this, \'photos\',\'\');\" style=\"margin-top: 3px;\" />';
		backdropArtURL += '<br / ><img src=\"' + backdropArtURL3 + '\"  onerror=\"imageError(this, \'photos\',\'\');\" style=\"margin-top: 3px;\" />';
		$('#poster').html(backdropArtURL);
		$('#Tomatoes').hide();
	}

	// alert(movieID + '|' + theMovieDBID);
	// $('#screenPositionIndicator').html(currentScreen + '/' + numberOfScreens);
	$('.' + target).scrollTop(nextPosition);
	updateMovieDetailsScreenPositionSD(target, scrollHeight);
}

function updateMovieDetailsScreenPositionSD(target, scrollHeight) {
	"use strict";
	var currentScreen = 0, numberOfScreens = 0, currentPosition = $('.' + target).scrollTop(), currentHeight = $('.' + target).prop('scrollHeight'), scrollHeight = 286;
	
	if (currentHeight !== 0) {
		numberOfScreens = currentHeight / scrollHeight;
		numberOfScreens = Math.ceil(numberOfScreens);
	}
	currentScreen = Math.ceil( ((currentPosition) / scrollHeight) + 1);
	if (currentScreen === 0) {currentScreen = 1;}
	if (currentScreen > numberOfScreens) {currentScreen = numberOfScreens;}
	
	$('#screenPositionIndicator').html(currentScreen + '/' + numberOfScreens);
}

function swapLauncherImage(sParam, active) {
	"use strict";
    if (active) {
        $('#' + sParam).attr('src','images/launcher/' + sParam + screenFormat + 'Active.gif');
    } else {
		// $('#' + sParam).attr('src','images/launcher/' + sParam + screenFormat + '.gif');
		$('#' + sParam).attr('src','images/button_transparency.gif');
	}
	
}

function setChaserStyle(section, settopid, screenFormat) {
	"use strict";
	if (settopid && settopid !== 'Guest') {
		if (screenFormat === 'HD') {
			if (section === 'Movie') {
				HEW.setChaserColor('0x1B8117');
				HEW.setChaserWidth('6');
			} else if (section === 'PE') {
				HEW.setChaserColor('0x567dc1');
				HEW.setChaserWidth('4');
			} else if (section === 'main') {
				HEW.setChaserColor('0xBBBBBB');
				HEW.setChaserWidth('3');
			}
		} else if (screenFormat === 'SD') {
			if (section === 'Movie') {
				HEW.setChaserColor('0x1B8117');
				HEW.setChaserWidth('4');
			} else if (section === 'PE') {
				HEW.setChaserColor('0x567dc1');
				HEW.setChaserWidth('3');
			} else if (section === 'main') {
				HEW.setChaserColor('0xBBBBBB');
				HEW.setChaserWidth('3');
			}
		}
	}
}

function getNextPreviousOfferingID(offeringID, offeringIDs, flag) {
	"use strict";
    var currentPosition = offeringIDs.indexOf(offeringID), offeringIDsLength = offeringIDs.length, previous = '', next = '';
	// alert(offeringID + ' | ' + currentPosition + ' | ' + offeringIDs);
    if (flag === 'next') {
		if ( currentPosition+4 === offeringIDsLength ) {
			return '';
		} else {
			next = offeringIDs.substring(currentPosition+4, currentPosition+8);
			alert(next);
		}
	} else {
		if (currentPosition === 0) {
			return '';
		} else {
			previous = offeringIDs.substring(currentPosition-4, currentPosition);
			alert(previous);
		}
	}
}

function navigationKeys(e, section, screenFormat, settopid) {
	"use strict";
	// alert(e.keyCode);
    if (e.keyCode == '66') {
		history.back(1);
		if (typeof $('#prevButtonHref').attr('href') !== 'undefined') {
			history.back(1);
		}
	} else if (e.keyCode == '67') {
		if (typeof $('#nextButtonHref').attr('href') !== 'undefined') {
			location.href = $('#nextButtonHref').attr('href');
		}
	} else if (e.keyCode == '119' && section === 'pe') {
		location.href = '../patientEducation/index.html?view=freqViewed&screenFormat=' + screenFormat + '&settopid=' + settopid;
		
	}
}

function loadCSSSplashScreen(screenFormat, settopid, splashSuffix, section) {
	"use strict";
	$("head").append('<link rel=\"stylesheet\" href=\"../styles/splash' + screenFormat + '.css\">');
	$("head").append('<link rel=\"stylesheet\" href=\"../styles/splash' + section + '.css\">');
}

function languageIcon(videoName, format, screenFormat) {
	"use strict";
	if (videoName.length > 60) {videoName = videoName.substr(0, 60) + '...'; }
	if (screenFormat === 'SD') {
		videoName = videoName.replace(' (AR)', ' <span class=\"languageIcon\">AR</span>')
		videoName = videoName.replace(' SP', ' <span class=\"languageIcon\">SP</span>');
		videoName = videoName.replace(' (SP)', ' <span class=\"languageIcon\">SP</span>');
		videoName = videoName.replace(' (Sp)', ' <span class=\"languageIcon\">SP</span>');
		videoName = videoName.replace(' (Spanish)', ' <span class=\"languageIconLarge\">SP</span>');
		videoName = videoName.replace(' SO', ' <span class=\"languageIcon\">SO</span>');
		videoName = videoName.replace(' (SO)', ' <span class=\"languageIcon\">SO</span>');
		videoName = videoName.replace(' HM', ' <span class=\"languageIcon\">HM</span>');
		videoName = videoName.replace(' (HM)', ' <span class=\"languageIcon\">HM</span>');
		videoName = videoName.replace(' (SO)', ' <img src=\"../images/icons/language/somalian.gif\" />');
		videoName = videoName.replace(' SO', ' <img src=\"../images/icons/language/somalian.gif\" />');
		videoName = videoName.replace(' (SP)', ' <span class=\"languageIcon\">SO</span>');
		videoName = videoName.replace(' - Vietnamese', ' <span class=\"languageIcon\">VN</span>');
	} else {
		videoName = videoName.replace(' (AR)', ' <span class=\"languageIconLarge\">Arabic</span>');
		videoName = videoName.replace(' (Arabic)', ' <span class=\"languageIconLarge\">Arabic</span>');
		videoName = videoName.replace(' SP', ' <span class=\"languageIconLarge\">Spanish</span>');
		videoName = videoName.replace(' (SP)', ' <span class=\"languageIconLarge\">Spanish</span>');
		videoName = videoName.replace(' (Spanish)', ' <span class=\"languageIconLarge\">Spanish</span>');
		videoName = videoName.replace(' Spanish', ' <span class=\"languageIconLarge\">Spanish</span>');
		videoName = videoName.replace(' (Sp)', ' <span class=\"languageIconLarge\">Spanish</span>');
		videoName = videoName.replace(' SO', ' <span class=\"languageIconLarge\">Somalian</span>');
		videoName = videoName.replace(' (SO)', ' <span class=\"languageIconLarge\">Somalian</span>');
		videoName = videoName.replace(' HM', ' <span class=\"languageIconLarge\">Hmong</span>');
		videoName = videoName.replace(' (HM)', ' <span class=\"languageIconLarge\">Hmoung</span>');
		videoName = videoName.replace(' (Hmong)', ' <span class=\"languageIconLarge\">Hmong</span>');
		videoName = videoName.replace(' (SP)', ' <span class=\"languageIconLarge\">Spanish</span>');
		videoName = videoName.replace(' - Vietnamese', ' <span class=\"languageIconLarge\">Vietnamese</span>');
		videoName = videoName.replace(' (Somali)', ' <span class=\"languageIconLarge\">Somalian</span>');
		videoName = videoName.replace(':', ': ');
		videoName = videoName.replace(':  ', ': ');
	}
	return videoName;
}
function handleAjaxError(jqXHR, statusText, errorThrown, functionName) {
	"use strict";
	// display error message regarding request results
	var errorMessage = '<span class=\"errorMsgHeader\"><img src=\"../images/icons/message.gif\" /> We\'re sorry.</span><br /><br /><span class=\"errorMsgText\">An error retrieving data has occurred.<br />Please try again later.</span><br /><br />';
	errorMessage += '<a href=\"javascript: location.reload(true)\" id=\"refreshButton\" class=\"lineItemsNB\">Try Again</a><br /><br />';
	errorMessage += '<div id=\"errorMsg\">';
	errorMessage += functionName + ' error: ' + jqXHR.status + ' | ' + statusText + ' | ' + errorThrown;
	errorMessage += '</div>';
	// console.log('getPatientEdCategoriesError failover failure: ' + jqXHR.status + ' | ' + statusText + ' | ' + errorThrown);
	$('#ajaxLoader').html(errorMessage);
	setTimeout(function(){ $('#refreshButton').focus(); }, 1400);
    // alert('getPatientEdCategoriesError failure:' + jqXHR.responseText + jqXHR.status + ' | ' + statusText + ' | ' + errorThrown);
}

function formatCategoryName(categoryName, length) {
	"use strict";
	categoryName = categoryName.replace(' and ', ' & ');
	categoryName = categoryName.replace(' Education Center', ' Education Ctr ');
	// categoryName = categoryName.replace('Gastroenterology ', 'Gastro ');
	categoryName = categoryName.replace(' & Reconstructive ', ' ');
	categoryName = categoryName.replace('Maxillofacial', 'MF');
	// categoryName = categoryName.replace('Center ', 'Ctr ');
	// categoryName = categoryName.replace(' Internal Medicine', ' Internal Med');
	if (categoryName.length > length) {categoryName = categoryName.substr(0, length) + '...'; }
	categoryName = categoryName.replace(/\//g, '&#8226;');
	return categoryName;
}

function getMacAddress() {
	var settopid = getURLParameter('settopid', '');
	// alert(settopid);
	if (settopid === 'Guest') {
		settopid = 'Guest';
	} else if (typeof settopid === 'undefined' || settopid === '') {
		settopid = getMAC();
	} else if (getURLParameter(settopid, '') !== '') {
		settopid = getURLParameter(settopid, '');
	}
	return settopid;
}

function createNextScreenButton(nextURL, screenFormat) {
	"use strict";
	var buttonHTML = ''; // alert(screenFormat);
	if (screenFormat === 'HD') {
		buttonHTML = '<a id=\"nextButtonHref\" class=\"buttons\" href=\"' + nextURL + '\" tabIndex=\"51\"><img src=\"../images/button_transparency.gif\" width=\"140\" height=\"36\" /></a>';
	} else {
		buttonHTML = '<a id=\"nextButtonHref\" class=\"buttons\" href=\"' + nextURL + '\" tabIndex=\"51\"><img src=\"../images/button_transparency.gif\" width=\"80\" height=\"21\" /></a>';
	}
	// $('#navbarNext').html(buttonHTML);
	$('#nextButtonHref').attr('href', nextURL);
	$('#navbarNext').css("display", "block");
	document.getElementById("navbarNext").className = "navbar navbar2";
}

function updateVideoDetailTitleBar(genre, subGenre, targetDiv, view, screenFormat) {
    "use strict";
	var titleString = '';
	if (view === 'freqViewed') { view = 'Healthcare Provider'}
	// alert(view);
	if (view === 'mci') {
		titleString = 'Mayo Information<br><span style=\"font-size: 38px;\">';
		titleString += genre;
	} else if (genre === 'Mayo Information') {
		titleString = 'Mayo Information<br><span style=\"font-size: 38px;\">';
		titleString += view;
	} else if (genre !== '' && genre === 'Mayo Information') {
		titleString = 'Mayo Information<br><span style=\"font-size: 38px;\">';
		if (view !== '' && view !== genre && genre !== 'Mayo Information') {
			titleString += view + ' <span style=\"color: \#333; font-weight: normal;\">&#8226;</span> ';
			titleString += genre.replace(/\%26/g, " & ");
		}
	} else {
		titleString = 'Patient Education<br><span style=\"font-size: 38px;\">';
		if (genre === 'Frequently Viewed' || genre === 'freqViewed') {genre = 'Healthcare Provider';}
		if (view !== '' && view !== genre && view !== 'freqViewed' && view !== 'Frequently Viewed' && genre !== 'Frequently Viewed') {
			titleString += view + ' <img src=\"../images/icons/breadcrumb-triangle.png\" style=padding:6px 0; > ';
		}
		titleString += genre.replace(/\%26/g, " & ");
	}
	// titleString = 'Patient Education<br><span style=\"font-size: 48px;\">';
	// alert(genre + ' | ' + subGenre + ' | ' + view);

	
	// }
	
	if (subGenre !== '' && genre !== subGenre && genre !== 'Mayo Information') {
		if (titleString !== '') {
			titleString += ' <img src=\"../images/icons/breadcrumb-triangle.png\" style=padding:6px 0; > ';
		}
		titleString += subGenre;
	}
	if (screenFormat === 'HD') {
		if (titleString.length > 280) {titleString = titleString.substr(0, 280) + '...'; }
	} else {
		if (titleString.length > 35) {titleString = titleString.substr(0, 35) + '...'; }
	}
	// titleString = titleString.replace(/\//g, '&#8226;');
	// titleString = titleString.replace('|', ' <img src=\"../images/icons/navbar/crumb.gif\" /> ');
	titleString = titleString.replace('|', ' &#8226; ');
	$('#' + targetDiv).html(titleString);
}

function convertRuntimePE(time, showSeconds) {
	"use strict";
	// alert(time);
	var res = '', hours = '', mins = '', secs = '', returnString = '';
	if (time !== null && time) {
		res = time.split(":");
		hours = res[0].replace(/^0+/, '');
		mins = res[1].replace(/^0+/, '');
		secs = res[2].replace(/^0+/, '');
		returnString = '';

		if (hours !== '') { returnString = hours + ' hour '; }
		if (mins !== '') { returnString += mins + ' mins'; }
		if (secs !== '' && showSeconds) { returnString += ' &nbsp;' + secs + ' secs'; }
		return returnString;
	} else {
		return null;
	}
}

function convertRuntime(time, showSeconds) {
	"use strict";
	var res = '', hours = '', mins = '', secs = '', returnString = '';
	if (time !== null) {
		var mins = time%60;
		var hours = (time - mins) / 60;
		returnString = hours + ' hr ' + mins + ' min';
		return returnString;
	} else {
		return null;
	}
}

function displayDescriptionLegend(runtime) {
	"use strict";
	$('#descriptionLegend').html(runtime);
}

function addClass(element, classToAdd) {
	"use strict";
    var currentElement = document.getElementById(element), currentClass = currentElement.className;

    if (currentClass.indexOf(classToAdd) === -1) {
        if ((currentClass === null) || (currentClass === "")) {
            currentElement.className = classToAdd;
        } else {
            currentElement.className += " " + classToAdd;
        }
    }
}

function removeClass(element, classToRemove) {
	"use strict";
    var currentClassValue = element.className, classValues = '', filteredList = '', i = 0;

    if (currentClassValue === classToRemove) {
        element.className = "";
        return;
    }

    classValues = currentClassValue.split(" ");
    filteredList = [];

    for (i = 0; i < classValues.length; i++) {
        if (classToRemove !== classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }

    element.className = filteredList.join(" ");
}

function imageError(id, type) {
    "use strict"; 
	if (type === 'moviePosterSmall') {
		id.src = "../../modAssets/images/movies/posters/generic-movie-poster.jpg";
	} else if (type === 'moviePosterMedium') {
		id.src = "../../modAssets/images/movies/posters/generic-movie-poster-medium.jpg";
	} else if (type === 'moviePosterLarge') {
		id.src = "../../modAssets/images/movies/posters/generic-movie-poster-large.jpg";
	} else {
		id.src = "../images/button_transparency.gif";
	}
    return true;
}

function getZipCode() {
    "use strict"; 
	var ip = location.host;
	if (ip.indexOf('241') >= 0) {
		return '55905';
	} else if (ip.indexOf('205') >= 0) {
		return '85259';
	} else if (ip.indexOf('242') >= 0) {
		return '32224';
	} else {
		return '55901';
	}
}

function getSite(section) {
    "use strict"; 
	var ip = location.host;
	
	/*if (section === 'home') {
		$('#psDiv').html("<img class=\"transparentBtn\" src=\"images/button_transparency.gif\" /></a>");
		document.getElementById("psDiv").className = "boxBlank box3";
	}
	return 'AZ';
	*/

	if (ip.indexOf('241') >= 0) {
		// $('#psDiv').html("<img class=\"transparentBtn\" src=\"images/button_transparency.gif\" />");
		// document.getElementById("psDiv").className = "boxBlank box2";
		return 'RO';
	} else if (ip.indexOf('205') >= 0) {
		if (section === 'home') {
			// $('#psDiv').html("<img class=\"transparentBtn\" src=\"images/button_transparency.gif\" /></a>");
			// $('#psDiv').html("");
			// document.getElementById("psDiv").className = "boxBlank box3";
		}
		return 'AZ';
	} else if (ip.indexOf('242') >= 0) {
		if (section === 'home') {
			// $('#psDiv').html("<img class=\"transparentBtn\" src=\"images/button_transparency.gif\" /></a>");
			// $('#psDiv').html("");
			// document.getElementById("psDiv").className = "boxBlank box3";
		}
		return 'FL';
	} else {
		return '55901';
	}

}

function roomTimeWeather(targetDiv, section, screenFormat) {
	"use strict";
	var room = getRoom(), time = getTime(), tempString = '', zipCode = '';
	zipCode = getZipCode();
	weather(zipCode, targetDiv, screenFormat);
	// alert(room+time+getCookie('location'));
	setTimeout(function(){
		if (room !== '') {
			tempString =  'Rm: ' + room + '<span class=\"timeTempSeperator\"> | </span>';
		}
		if (time !== '') {
			tempString += time;
		}
		if (window.weatherGlobalVariable !== '' && typeof window.weatherGlobalVariable !== 'undefined') {
			tempString += '<span class=\"timeTempSeperator\"> | </span>' + window.weatherGlobalVariable;
		}
		$('#' + targetDiv).html(tempString);
		}, 1100);
}

function roomTimeWeather2(targetDiv, screenFormat, option) {
	"use strict";
	var room = getRoom(), time = getTime(), tempString = '', zipCode = '';
	zipCode = getZipCode();
	weather(zipCode, targetDiv, screenFormat);
	// alert(room+time+getCookie('location'));
	setTimeout(function(){
		if (room !== '') {
			if (option === 'main') {
				tempString =  'Room: ' + getCookie('location');
			} else {
				tempString =  'Rm: ' + room;
			}
		}
		if (option !== 'main') {
			if (time !== '') {
				tempString += '<span class=\"timeTempSeperator\"> &#149; </span>' + time;
			}
			if (window.weatherGlobalVariable !== '' && typeof window.weatherGlobalVariable !== 'undefined') {
				tempString += '<span class=\"timeTempSeperator\"> &#149; </span>' + window.weatherGlobalVariable;
			}
		}
		$('#' + targetDiv).html(tempString);
		}, 1100);
}


function getRoom() {
	"use strict";
	return getCookie('room');
}

function timeAndWeather(targetDiv, zipCode, screenFormat) {
	"use strict";
	var tempString = '';
	weather(zipCode, targetDiv, screenFormat);
	setTimeout(function(){
		tempString =  getTime() + '<span class=\"timeTempSeperator\"> &#149; </span>' + window.weatherGlobalVariable;
		$('#' + targetDiv).html(tempString);
		}, 1100);
	
}

function weather(zipCode, targetDiv, screenFormat) {
	"use strict";
	// Specify the ZIP/location code and units (f or c)
    var loc = zipCode, u = 'f', iconHeight = 52, folderPrefix = '../', // or e.g. SPXX0050
		query = "SELECT item.condition FROM weather.forecast WHERE location='" + loc + "' AND u='" + u + "'",
		cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000),
		url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster,
		returnValue = '';
	if (screenFormat === 'SD') {
		iconHeight = 28;
	}
	if (targetDiv === 'timeMain') {
		folderPrefix = '';
	}

    window['wxCallback'] = function (data) {
        var info = data.query.results.channel.item.condition, html = '';
        $('#wxIcon').css({
            backgroundPosition: '-' + (61 * info.code) + 'px 0'
        }).attr({
            title: info.text
        });
        html += info.temp + '&deg;';
		if (screenFormat === 'HD') {
			html += '<span style=\"font-size: 16px;\">';
		} else {
			html += '<span style=\"font-size: 12px;\">';
		}
		html += (u.toUpperCase()) + '</span>';

		window.weatherGlobalVariable = html;
		// if (targetDiv === 'timeMain') {folderPrefix = ''}
		$('#weatherIcon').html('<img src=' + folderPrefix + 'images/icons/weather/' + info.code + '.gif height=' + iconHeight + ' class=weatherIcon>');
    };

    $.ajax({
        url: url,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'wxCallback'
    });
	return returnValue;
}

function initializeDateTime() {
	"use strict";
	var html = '';
	html = getTime();
	return '<span id=\"clock\" class=\"clock\">' + html + '</span>';
}

function getTime() {
	"use strict";
	// Create a newDate() object and extract the hours of the current time on the visitor's
	var hours = new Date().getHours(), html = '', amPM = '', minutes = new Date().getMinutes();
	// Add a leading zero to the hours value
	amPM = hours < 12 ? "a" : "p";
	if (hours > 12) { hours = hours - 12; }
	html += hours + ':' + (minutes < 10 ? "0" : "") + minutes;
	html += amPM;
	return html;
}


function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  var c_start=document.cookie.indexOf(c_name + "="), c_end;
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}


function Set_Cookie( name, value, expires, path, domain, secure )
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}


function checkCookie()
{
username=getCookie('username');
if (username!=null && username!="")
  {
  alert('Welcome again '+username+'!');
  }
else
  {
  username=prompt('Please enter your name:',"");
  if (username!=null && username!="")
    {
    setCookie('username',username,365);
    }
  }
}