function mciVideoLookup(id) {
	"use strict";
	
	var constructURL = '',suffixURL = '';
	
	if (isPhoneGap()) {
		suffixURL = 'playlist.m3u8';
		constructURL = 'playVideo(\'' + mciVideoURLLookup(id) + '/' + suffixURL + ')\'';
	} else {
		// suffixURL = 'manifest.f4m';
		constructURL = 'window.location.href=\'' + mciVideoURLLookup(id) + '\'';
	}
	
	suffixURL = 'playlist.m3u8';
		constructURL = 'playVideo(\'' + mciVideoURLLookup(id) + '/' + suffixURL + '\')';
	
	return constructURL;
}

function mciVideoURLLookup(id) {
	"use strict";
	switch (id) {

	case '1000': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/561/245/0_1jpv6e0i_0_95qjmzw3_2.mp4';
	case '1001': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1002': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1003': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1004': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1005': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1006': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	
	
		default:
			return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/561/245/0_1jpv6e0i_0_95qjmzw3_2.mp4';
	}
}