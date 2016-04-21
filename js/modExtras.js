/*jslint browser: true*/
/*global $, jQuery, alert, console, document */

var weatherGlobalVariable = '', weatherGlobalVariable = '';

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
			$("#activeLauncherSelectionHREF").attr("href",'mci/index.html');
			launcherState = 2;
		break;
		case '3':
			$("#activeLauncherSelectionHREF").attr("href",'patientEducation/index.html');
			launcherState = 3;
		break;
		case '4':
			$("#activeLauncherSelectionHREF").attr("href",'relaxation/index.html');
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
	$('#launcherBackground').width(1900);
	// $('#launcherBackground').height(850);
	// $("#launcherBackground").html('images/screens/launcher/' + '2' + '.png').fadeIn(400);

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
	$("#" + id).width(1890);
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
	// 
	//
	// alert('navBarLeft');
	// if (adjustLeftPane !== 'expand') {
		if ( $('#navBarLeft').width() === 45 ) {
			adjustLeftPane = 'expand';
		} else {
			adjustLeftPane = 'collapse';
		}
	// }
	//}
	
	if (adjustLeftPane === 'expand') {
		$('#navBarLeft').width("542px");
		$('#navBarLeft').css('display','block');
		$('.navbarTopCategory').css('display','block');
		$('.lineColumnMainWide1').css("left", "+=505");
		$('.lineColumnMainWide2').css("left", "+=505");
		$('.lineColumnMainWide3').css("left", "+=505");
		$('.lineColumnMainWide4').css("left", "+=505");
		$('.lineColumnMainWide5').css("left", "+=505");
		$('#title').css("left", "+=505");
		$('.box1sidePE').css("left", "+=505");
		$('.searchPE').css('display','block');
		$('.peNavBarHD').css('display','block');
	}
	
	if (adjustLeftPane === 'collapse') {
		$('#navBarLeft').width("45px");
		
		$('#peNavBarHD').css('display','none');
		$('.navbarTopCategory').css('display','none');
		$('.lineColumnMainWide1').css("left", "+=-505");
		$('.lineColumnMainWide2').css("left", "+=-505");
		$('.lineColumnMainWide3').css("left", "+=-505");
		$('.lineColumnMainWide4').css("left", "+=-505");
		$('.lineColumnMainWide5').css("left", "+=-505");
		$('#title').css("left", "+=-505");
		$('.box1sidePE').css("left", "+=-505");
		$('.searchPE').css('display','none');
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

function onHoverDiv(selectedDiv, direction, videoFlag, column) {
	"use strict";
	// alert('llkj' + ' | ' + selectedDiv + ' | ' + direction + ' | ' + videoFlag);
	// column = '4';
	// alert(selectedDiv);
	selectedDiv = document.getElementById(selectedDiv);
	if ( direction === 'left' ) {

		if (column === '1') { // alert('here1');
			$(selectedDiv).css("top", "-=20");
		} else if (column === '2') {
			$(selectedDiv).css("left", "-=20");
			$(selectedDiv).css("top", "-=20");
		} else if (column === '3') {
			$(selectedDiv).css("top", "-=20");
			$(selectedDiv).css("left", "-=40");
		} else {
			$(selectedDiv).css("left", "-=20");
			$(selectedDiv).css("top", "-=20");
		}
		
			
		$(selectedDiv).css("width", "+=40"); // alert($(selectedDiv).css("height"))
		if (videoFlag === 'true') {
			$(selectedDiv).css("height", "230px");
		} else {
			$(selectedDiv).css("height", "166px");
		}
		$(selectedDiv).css('opacity', '1.0');
	} else {

		if (column === '1') {
			$(selectedDiv).css("top", "+=20");
		} else if (column === '2') {
			$(selectedDiv).css("left", "+=20");
			$(selectedDiv).css("top", "+=20");
		} else if (column === '3') {
			$(selectedDiv).css("top", "+=20");
			$(selectedDiv).css("left", "+=40");
		} else {
			$(selectedDiv).css("left", "+=20");
			$(selectedDiv).css("top", "+=20");
		}
		
		
		$(selectedDiv).css("width", "-=40");
		if (videoFlag === 'true') {
			$(selectedDiv).css("height", "200px");
		} else { 
			$(selectedDiv).css("height", "126px");
		}
		$(selectedDiv).css('opacity', '0.7');
	}
	if ( $('#navBarLeft').width() !== 45 ) {
		navBarLeftFunction();
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
	if (videoName.length > 58) {videoName = videoName.substr(0, 58) + '...'; }
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
	// if (genre !== 'Frequently Viewed') {
	// alert(genre + ' | ' + subGenre);
	if (view === 'mci') {
		titleString = 'Mayo Information<br><span style=\"font-size: 48px;\">';
		titleString += genre;
	} else if (genre === 'Mayo Information') {
		titleString = 'Mayo Information<br><span style=\"font-size: 48px;\">';
		titleString += view;
	} else if (genre !== '' && genre === 'Mayo Information') {
		titleString = 'Mayo Information<br><span style=\"font-size: 48px;\">';
		if (view !== '' && view !== genre && genre !== 'Mayo Information') {
			titleString += view + ' <span style=\"color: \#333; font-weight: normal;\">&#8226;</span> ';
			titleString += genre.replace(/\%26/g, " & ");
		}
	} else {
		titleString = 'Patient Education<br><span style=\"font-size: 48px;\">';
		
		if (view === 'freqViewed') {view = 'Health Care Provider';}
		if (genre === 'Frequently Viewed') {genre = 'Health Care Provider';}
		if (view !== '' && view !== genre && view !== 'freqViewed' && view !== 'Frequently Viewed' && genre !== 'Frequently Viewed') {
			titleString += view + ' <img src=\"../images/icons/breadcrumb-triangle.png\" style=padding:6px; > ';
		}
		titleString += genre.replace(/\%26/g, " & ");
	}
	// titleString = 'Patient Education<br><span style=\"font-size: 48px;\">';
	// alert(genre + ' | ' + subGenre + ' | ' + view);

	
	// }
	
	if (subGenre !== '' && genre !== subGenre && genre !== 'Mayo Information') {
		if (titleString !== '') {
			titleString += ' <img src=\"../images/icons/breadcrumb-triangle.png\" style=padding:6px; > ';
		}
		titleString += subGenre;
	}
	if (screenFormat === 'HD') {
		if (titleString.length > 254) {titleString = titleString.substr(0, 254) + '...'; }
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
		if (secs !== '' && showSeconds) { returnString += ' ' + secs + ' secs'; }
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

function getTime() {
	"use strict";
	return getTime();
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
	// setInterval(function(){ $('#clock').html(getTime()); },60000);
	return html;
}

function movieDBLookup(id) {
	"use strict";
	switch (id) {
	// Action
	case '3871': return '391';		// A Fistful of Dollars
	case '4415': return '100402';	// Captain America: The Winter Soldier
	case '4413': return '157350';	// Divergent
	case '4410': return '136797';	// Need for Speed
	case '4414': return '102382';	// The Amazing Spider-Man 2
	case '3892': return '70160';	// The Hunger Games
	case '4156': return '966';		// The Magnificent Seven
	case '4471': return '137113';	// Edge of Tomorrow
	case '4473': return '124905';	// Godzilla 2014
	case '4475': return '102651';	// Maleficent
	case '4490': return '118340';	// Guardians of the Galaxy
	case '4653': return '122917';	// The Hobbit: The Battle of the Five Armies
	case '4522': return '131631';	// The Hunger Games: Mockingjay - Part 1
	case '4707': return '290764';	// Tracers
	case '4706': return '76757';	// Jupiter Ascending
	case '4909': return '168259';	// Furious 7  168259 2820852
	case '4912': return '262500';	// Insurgent 262500 tt2908446
	case '5008': return '99861';	// Avengers: Age of Ultron 5008 99861 tt2395427
	case '5012': return '135397';	// Jurassic World 5012 135397 tt0369610
	case '5010': return '87101';	// Terminator Genisys 5010 87101 tt1340138
	case '5108': return '102899';	// Ant-Man 5108 102899 tt0478970

	// Animated
	case '2371': return '12230';	// 101 Dalmatians
	case '2372': return '10481';	// 102 Dalmatians
	case '2506': return '9487';		// A Bug's Life
	case '1794': return '15789';	// A Goofy Movie
	case '2495': return '4978';		// An American Tail
	case '4113': return '119321';	// Big Top Scooby Doo!
	case '3948': return '62177';	// Brave
	case '3206': return '920';		// Cars
	case '3724': return '49013';	// Cars 2 
	case '3581': return '9982';		// Chicken Little
	case '4154': return '11224';	// Cinderella
	case '4033': return '22794';	// Cloudy With a Chance of Meatballs
	case '4299': return '109451';	// Cloudy With a Chance of Meatballs 2
	case '3118': return '9975';		// Curious George
	case '4251': return '93456';	// Despicable Me 2
	case '2207': return '12';		// Finding Nemo
	case '4309': return '109445';	// Frozen
	case '4303': return '33427';	// Lego: The Adventures of Clutch Powers
	case '2613': return '15511';	// Pirates That Don't Do Anything
	case '2317': return '13682';	// Pooh's Heffalump Movie
	case '2476': return '2062';		// Ratatouille
	case '3552': return '38757';	// Tangled
	case '2145': return '230222';	// Tarzan
	case '4346': return '137106';	// The Lego Movie
	case '4046': return '8587';		// The Lion King
	case '2474': return '10144';	// The Little Mermaid
	case '4325': return '175112';	// The Pirate Fairy
	case '3210': return '10198';	// The Princess and the Frog
	case '3372': return '44683';	// Tinkerbell and the Great Fairy Rescue
	case '4116': return '134623';	// Tom and Jerry: Robin Hood and his Merry
	case '2147': return '862';		// Toy Story
	case '2151': return '863';		// Toy Story 2
	case '3377': return '10193';	// Toy Story 3
	case '2612': return '10681';	// Wall-E
	case '3735': return '51162';	// Winnie the Pooh (2011)
	case '4477': return '218836';	// Planes: Fire & Rescue
	case '4525': return '177572';	// Big Hero 6
	case '4478': return '226673';	// Pororo: The Racing Adventure
	case '4527': return '170687';	// The Boxtrolls
	case '5051': return '150540';	// Inside Out 5051 150540 tt2096673
	
	// Comedy
	case '4911': return '850';		// A Christmas Story 850 tt0085334
	case '4416': return '232672';	// Blended
	// case '3206': return '920';		// Cars
	case '2435': return '7211';		// Dan in Real Life
	case '4320': return '146239';	// Delivery Man
	case '4166': return '10719';	// Elf
	case '3512': return '43949';	// Flipped
	case '4412': return '252680';	// Mom's Night Out
	case '4417': return '5825';		// National Lampoon's Christmas Vacation
	case '2921': return '7985';		// Penelope
	case '4343': return '49524';	// R.I.P.D.
	case '2444': return '10760';	// Sydney White
	case '4347': return '260535';	// The Little Rascals - Save the Day
	case '4493': return '239678';	// This is Where I Leave You
	case '4918': return '268920';	// Hot Pursuit 268920 tt2967224 4918
	case '4951': return '256961';	// Paul Blart: Mall Cop 2 256961 tt3450650 4951

	// Drama
	case '4183': return '223944';	// Anything Is Possible
	case '2497': return '5123';		// August Rush
	case '4340': return '245175';	// Black Coffee
	case '2695': return '15568';	// Gracie
	case '4321': return '49047';	// Gravity
	case '3865': return '5693';		// Hoosiers
	case '2697': return '10950';	// I Am Sam
	case '4345': return '266353';	// In My Dreams
	case '4341': return '201550';	// Life of a King
	case '2696': return '5126';		// Martian Child
	case '4326': return '159151';	// Muscle Shoals
	case '2605': return '15727';	// My Name is Bill W
	case '4142': return '188538';	// Remember Sunday
	case '3949': return '301';		// Rio Bravo
	case '4324': return '140823';	// Saving Mr. Banks
	case '2699': return '9762';		// Step Up
	case '4034': return '5172';		// The Astronaut Farmer
	case '4049': return '22881';	// The Blind Side
	case '4035': return '14047';	// The Great Debaters
	case '2700': return '4643';		// The Guardian
	case '2702': return '13579';	// The Longshots
	case '4342': return '152760';	// The Monuments Men
	case '3693': return '56401';	// The Music Never Stopped
	case '4409': return '157353';	// Transcendence
	case '3243': return '71184';	// When Love is Not Enough: The Lois Wilson Story
	case '4472': return '250657';	// Fed Up
	case '4474': return '209451';	// Jersey Boys
	case '4476': return '198185';	// Million Dollar Arm
	case '4489': return '238603';	// Earth to Echo
	case '4491': return '227156';	// The Giver
	case '4492': return '228194';	// The Hundred-Foot Journey
	case '4494': return '232679';	// When the Game Stands Tall
	case '4532': return '211097';	// From the Rough
	case '4521': return '250538';	// The Good Lie
	case '4536': return '279914';	// The Identical
	case '4524': return '205587';	// The Judge
	case '4659': return '308715';	// Away and Back	tt4309834	308715
	case '4660': return '327411';	// Confessions of a Prodigal Son	tt2822280	327411	4660
	case '4708': return '197583';	// 50 to 1	tt1777595	197583	4708
	case '4907': return '286521';	// 5 Flights Up	tt2933544	286521	4907
	case '4917': return '222936';	// Aloha	tt1243974	222936	4917
	case '4908': return '253331';	// Black or White	tt2883434	253331	4908
	case '4910': return '228203';	// McFarland, USA	tt2097298	228203	4910
	case '4915': return '293863';	// The Age of Adaline	tt1655441	293863	4915
	case '5011': return '280996';	// Mr. Holmes	tt3168230	280996	5011
	case '5009': return '158852';	// Tomorrowland	tt1964418	158852	5009
	
	// Family
	// case '4165': return '850';		// A Christmas Story 850 850
	case '3373': return '44737';	// Babies
	case '2608': return '13655';	// Camp Rock
	// case '3724': return '49013';	// Cars 2
	case '4420': return '13673';	// Christmas With the Kranks
	// case '4154': return '11224';	// Cinderella
	// case '4166': return '10719';	// Elf
	case '4422': return '249660';	// God's Not Dead
	case '4302': return '206284';	// Grace Unplugged
	case '3236': return '28178';	// Hachi: A Dog's Tale
	case '4421': return '236751';	// Heaven is for Real
	case '4418': return '8871';		// How the Grinch Stole Christmas
	// case '4303': return '33427';	// Lego: The Adventures of Clutch Powers
	case '4304': return '61868';	// Magic Journey to Africa
	case '4411': return '145220';	// Muppets Most Wanted
	// case '4417': return '5825';		// National Lampoon's Christmas Vacation
	case '3371': return '36970';	// Oceans
	case '4328': return '215759';	// Raising Izzie
	case '4344': return '262357';	// Redwood Highway
	case '3837': return '42884';	// Rodgers and Hammerstein's Cinderella
	// case '4346': return '137106';	// The Lego Movie
	// case '4347': return '260535';	// The Little Rascals - Save the Day
	// case '3693': return '56401';	// The Music Never Stopped
	case '4172': return '2447';		// The Nativity Story
	case '4952': return '11395';	// The Santa Clause
	case '4329': return '168893';	// The Solomon Bunch
	case '4305': return '231401';	// The Sound of Music: Live
	case '4488': return '227735';	// Dolphin Tale 2
	case '4526': return '218778';	// Alexander and the Terrible, Horrible, No Good, Very Bad Day
	case '4531': return '84105';	// Frenemies
	case '4655': return '224141';	// Into the Woods	tt2180411	224141	4655
	case '4654': return '116149';	// Paddington		tt1109624	116149	4654
	case '4656': return '196867';	// Annie 2014	tt1823664	196867	4656
	case '4914': return '13673';	// Christmas with the Kranks	tt0388419	13673	4914
	case '4913': return '150689';	// Cinderella 2015	tt1661199	150689	4913
	case '5007': return '272878';	// Max	tt3369806	272878	5007
	case '5111': return '266647';	// Pan 266647 tt2120120 5111

	// Musical
	// case '2608': return '13655';	// Camp Rock
	case '2375': return '2976';		// Hairspray 2006
	case '2341': return '872';		// Singin' in the Rain

	// Spanish
	case '2404': return '585';		// Monster's Inc SP
	case '2402': return '13691';	// Piglet's Big Movie SP

	// TV Shows
	case '4528': return '267683';	// Doc McStuffins: Awesome Possum/The Bunny
	case '4529': return '267683';	// Doc McStuffins: Break Dancer/Bubble
	case '4530': return '267683';	// Doc McStuffins: Chilly Gets Chilly/Through the Reading Glasses
	case '2254': return '273143';	// Dora the Explorer - Saves the Prince
	case '4005': return '273143';	// Dora the Explorer: Beaches
	case '2271': return '1647';		// Go Diego Go-Booboo on the Pigmy
	case '2272': return '1647';		// Go Diego Go-Journey to Jaguar Mountain
	case '4404': return '1647';		// Go Diego Go: Red Eyed Tree Frogs
	case '4259': return '10219';	// Handy Manny - Happy Birthday Mr. Lopart
	case '4258': return '10219';	// Handy Manny - Learning to Fly
	case '4257': return '10219';	// Handy Manny - Lost and Found
	case '4199': return '585';		// Jake and the Neverland Pirates - Happyhook Day
	case '4200': return '585';		// Jake and the Neverland Pirates - Hats Off to Hook
	case '4201': return '585';		// Jake and the Neverland Pirates - Hide the Hideout
	case '4193': return '38867';	// Kickin It - Dojo Day Afternoon
	case '4194': return '38867';	// Kickin It - Road to Wasabi
	case '4195': return '38867';	// Kickin It - Swords and Magic
	case '4190': return '38867';	// Lab Rats - Commando App
	case '4192': return '38867';	// Lab Rats - Exoskeleton vs Grandma
	case '4191': return '38867';	// Lab Rats - Leo's Jam
	case '4196': return '652';		// Scooby Doo - A Highland Fling
	case '4197': return '652';		// Scooby Doo - A Mence in Venice
	case '4198': return '652';		// Scooby Doo - A Night of Fright in No Delight
	case '4533': return '144616';	// Sofia the First: Finding Clover
	case '4534': return '144616';	// Sofia the First: Make Way for Miss Nettle
	case '4535': return '144616';	// Sofia the First: Tea for Too Many

	default:
		return 0;
	}
}

function imDBLookup(id) {
	"use strict";
	switch (id) {
		// Action
		case '3871': return 'tt0058461';	// A Fistful of Dollars
		case '4415': return 'tt1843866';	// Captain America: The Winter Soldier
		case '4413': return 'tt1840309';	// Divergent
		case '4410': return 'tt2369135';	// Need for Speed
		case '4414': return 'tt1872181';	// The Amazing Spider-Man 2
		case '3892': return 'tt1392170';	// The Hunger Games
		case '4156': return 'tt0054047';	// The Magnificent Seven
		case '4471': return 'tt1631867';	// Edge of Tomorrow
		case '4473': return 'tt0831387';	// Godzilla 2014
		case '4475': return 'tt0831387';	// Maleficient
		case '4490': return 'tt2015381';	// Guardians of the Galaxy
		case '4653': return 'tt2310332';	// The Hobbit: The Battle of the Five Armies
		case '4522': return 'tt1951265';	// The Hunger Games: Mockingjay - Part 1
		case '4707': return 'tt2401097';	// Tracers
		case '4706': return 'tt1617661';	// Jupiter Ascending
		case '4909': return 'tt2820852';	// Furious 7  168259 2820852
		case '4912': return 'tt2908446';	// Insurgent 262500 tt2908446
		case '5008': return 'tt2395427';	// Avengers: Age of Ultron 5008 99861 tt2395427
		case '5012': return 'tt0369610';	// Jurassic World 5012 135397 tt0369610
		case '5010': return 'tt1340138';	// Terminator Genisys 5010 87101 tt1340138
		case '5108': return 'tt0478970';	// Ant-Man 5108 102899 tt0478970

		// Animated
		case '2371': return 'tt0055254';	// 101 Dalmatians
		case '2372': return 'tt0211181';	// 102 Dalmatians
		case '2506': return 'tt0120623';	// A Bug's Life
		case '1794': return 'tt0113198';	// A Goofy Movie
		case '2495': return 'tt0090633';	// An American Tail
		case '4113': return 'tt2235542';	// Big Top Scooby Doo!
		case '3948': return 'tt1217209';	// Brave
		case '3206': return 'tt0317219';	// Cars
		case '3724': return 'tt1216475';	// Cars 2
		case '3581': return 'tt0371606';	// Chicken Little
		case '4154': return 'tt0042332';	// Cinderella
		case '4033': return 'tt0844471';	// Cloudy With a Chance of Meatballs
		case '4299': return 'tt1985966';	// Cloudy With a Chance of Meatballs 2
		case '3118': return 'tt0381971';	// Curious George
		case '4251': return 'tt1690953';	// Despicable Me 2
		case '2207': return 'tt0266543';	// Finding Nemo
		case '4309': return 'tt2294629';	// Frozen
		case '4303': return 'tt1587414';	// Lego: The Adventures of Clutch Powers
		case '2613': return 'tt0475998';	// Pirates That Don't Do Anything
		case '2317': return 'tt0407121';	// Pooh's Heffalump Movie
		case '2476': return 'tt0382932';	// Ratatouille
		case '3552': return 'tt0398286';	// Tangled
		case '2145': return 'tt1705952';	// Tarzan
		case '4346': return 'tt1490017';	// The Lego Movie
		case '4046': return 'tt0110357';	// The Lion King
		case '2474': return 'tt0097757';	// The Little Mermaid
		case '4325': return 'tt2483260';	// The Pirate Fairy
		case '3210': return 'tt0780521';	// The Princess and the Frog
		case '3372': return 'tt1217213';	// Tinkerbell and the Great Fairy Rescue
		case '4116': return 'tt2423422';	// Tom and Jerry: Robin Hood and his Merry
		case '2147': return 'tt0114709';	// Toy Story
		case '2151': return 'tt0120363';	// Toy Story 2
		case '3377': return 'tt0435761';	// Toy Story 3
		case '2612': return 'tt0910970';	// Wall-E
		case '3735': return 'tt1449283';	// Winnie the Pooh (2011)
		case '4477': return 'tt2980706';	// Planes: Fire & Rescue
		case '4478': return 'tt2652476';	// Pororo: The Racing Adventure
		case '4525': return 'tt2245084';	// Big Hero 6
		case '4527': return 'tt0787474';	// The Boxtrolls
		case '5051': return 'tt2096673';	// Inside Out 5051 150540 tt2096673

		// Comedy
		case '4911': return 'tt0085334';	// A Christmas Story 850 tt0085334
		case '4416': return 'tt1086772';	// Blended
		// case '3206': return 'tt0317219';	// Cars
		case '2435': return 'tt0480242';	// Dan in Real Life
		case '4320': return 'tt2387559';	// Delivery Man
		case '4166': return 'tt0319343';	// Elf
		case '3512': return 'tt0817177';	// Flipped
		case '4412': return 'tt3014666';	// Mom's Night Out
		case '4417': return 'tt0097958';	// National Lampoon's Christmas Vacation
		case '2921': return 'tt0472160';	// Penelope
		case '4343': return 'tt0790736';	// R.I.P.D.
		case '2444': return 'tt0815244';	// Sydney White
		case '4347': return 'tt2490004';	// The Little Rascals - Save the Day
		case '4493': return 'tt1371150';	// This is Where I Leave You
		case '4918': return 'tt2967224';	// Hot Pursuit 268920 tt2967224
		case '4951': return 'tt3450650';	// Paul Blart: Mall Cop 2 256961 tt3450650 4951
		case '5109': return 'tt2120120';	// Pixels 257344 tt2120120 5109

		// Drama
		case '4183': return 'tt2042449';	// Anything Is Possible
		case '2497': return 'tt0426931';	// August Rush
		case '4340': return 'tt2994646';	// Black Coffee
		case '2695': return 'tt0441007';	// Gracie
		case '4321': return 'tt1454468';	// Gravity
		case '3865': return 'tt0091217';	// Hoosiers
		case '2697': return 'tt0277027';	// I Am Sam
		case '4345': return 'tt3347518';	// In My Dreams
		case '4341': return 'tt2708254';	// Life of a King
		case '2696': return 'tt0415965';	// Martian Child
		case '4326': return 'tt2492916';	// Muscle Shoals
		case '2605': return 'tt0097939';	// My Name is Bill W
		case '4142': return 'tt2770480';	// Remember Sunday
		case '3949': return 'tt0053221';	// Rio Bravo
		case '4324': return 'tt2140373';	// Saving Mr. Banks
		case '2699': return 'tt0462590';	// Step Up
		case '4034': return 'tt0469263';	// The Astronaut Farmer
		case '4049': return 'tt0878804';	// The Blind Side
		case '4035': return 'tt0427309';	// The Great Debaters
		case '2700': return 'tt0406816';	// The Guardian
		case '2702': return 'tt1091751';	// The Longshots
		case '4342': return 'tt2177771';	// The Monuments Men
		case '3693': return 'tt1613062';	// The Music Never Stopped
		case '4409': return 'tt2209764';	// Transcendence
		case '3243': return 'tt1547035';	// When Love is Not Enough: The Lois Wilson Story
		case '4472': return 'tt2381335';	// Fed Up
		case '4474': return 'tt1742044';	// Jersey Boys
		case '4476': return 'tt1647668';	// Million Dollar Arm
		case '4489': return 'tt2183034';	// Earth to Echo
		case '4491': return 'tt0435651';	// The Giver
		case '4492': return 'tt2980648';	// The Hundred-Foot Journey
		case '4494': return 'tt2247476';	// When the Game Stands Tall
		case '4532': return 'tt1704586';	// From the Rough
		case '4521': return 'tt2652092';	// The Good Lie
		case '4536': return 'tt2326574';	// The Identical
		case '4524': return 'tt1872194';	// The Judge
		case '4659': return 'tt4309834';	// Away and Back	tt4309834	308715
		case '4660': return 'tt2822280';	// Confessions of a Prodigal Son	tt2822280	327411	4660
		case '4708': return 'tt1777595';	// 50 to 1	tt1777595	197583	4708
		case '4907': return 'tt2933544';	// 5 Flights Up	tt2933544	286521	4907
		case '4917': return 'tt1243974';	// Aloha	tt1243974	222936	4917
		case '4908': return 'tt2883434';	// Black or White	tt2883434	253331	4908
		case '4910': return 'tt2097298';	// McFarland, USA	tt2097298	228203	4910
		case '4915': return 'tt1655441';	// The Age of Adaline	tt1655441	293863	4915
		case '5011': return 'tt3168230';	// Mr. Holmes	tt3168230	280996	5011
		case '5009': return 'tt1964418';	// Tomorrowland	tt1964418	158852	5009
	
		// Family
		// case '4911': return 'tt0085334';	// A Christmas Story 850 tt0085334
		case '3373': return 'tt1020938';	// Babies
		case '2608': return 'tt1055366';	// Camp Rock
		// case '3724': return 'tt1216475';	// Cars 2
		case '4420': return 'tt0388419';	// Christmas With the Kranks
		// case '4154': return 'tt0042332';	// Cinderella
		// case '4166': return 'tt0319343';	// Elf
		case '4422': return 'tt2528814';	// God's Not Dead
		case '4302': return 'tt2349460';	// Grace Unplugged
		case '3236': return 'tt1028532';	// Hachi: A Dog's Tale
		case '4421': return 'tt1929263';	// Heaven is for Real
		case '4418': return 'tt0170016';	// How the Grinch Stole Christmas
		// case '4303': return 'tt1587414';	// Lego: The Adventures of Clutch Powers
		case '4304': return 'tt1247681';	// Magic Journey to Africa
		case '4411': return 'tt2281587';	// Muppets Most Wanted
		// case '4417': return 'tt0097958';	// National Lampoon's Christmas Vacation
		case '3371': return 'tt0765128';	// Oceans
		case '4328': return 'tt2246941';	// Raising Izzie
		case '4344': return 'tt2515164';	// Redwood Highway
		case '3837': return 'tt1028707';	// Rodgers and Hammerstein's Cinderella
		// case '4346': return 'tt1490017';	// The Lego Movie
		// case '4347': return 'tt2490004';	// The Little Rascals - Save the Day
		// case '3693': return 'tt1613062';	// The Music Never Stopped
		case '4172': return 'tt0762121';	// The Nativity Story
		case '4952': return 'tt0111070';	// The Santa Clause
		case '4329': return 'tt2005384';	// The Solomon Bunch
		case '4305': return 'tt3141866';	// The Sound of Music: Live
		case '4488': return 'tt2978462';	// Dolphin Tale 2
		case '4526': return 'tt1698641';	// Alexander and the Terrible, Horrible, No Good, Very Bad Day
		case '4531': return 'tt1865368';	// Frenemies
		case '4655': return 'tt2180411';	// Into the Woods	tt2180411	224141	4655
		case '4654': return 'tt1109624';	// Paddington		tt1109624	116149	4654
		case '4656': return 'tt1823664';	// Annie 2014	tt1823664	196867	4656
		case '4914': return 'tt0388419';	// Christmas with the Kranks	tt0388419	13673	4914
		case '4913': return 'tt1661199';	// Cinderella 2015	tt1661199	150689	4913
		case '5007': return 'tt3369806';	// Max	tt3369806	272878	500
		case '5111': return 'tt3332064';	// Pan 266647 tt2120120 5111
		
		// Musical
		// case '2608': return 'tt1055366';	// Camp Rock
		case '2375': return 'tt0427327';	// Hairspray 2006
		case '2341': return 'tt0045152';	// Singin' in the Rain

		// Spanish
		case '2404': return 'tt0198781';	// Monster's Inc SP
		case '2402': return 'tt0323642';	// Piglet's Big Movie SP

		default:
			return '0';
	}
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