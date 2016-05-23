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

	case '1000': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/427/705/0_u4d08joi_0_obn7q8ac_2.mp4';
	case '1001': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/355/176/0_dnpmki0a_0_dbhv5dtm_2.mp4';
	case '1002': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1003': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/512/981/0_ykbyocje_0_eft69dqv_2.mp4';
	case '1004': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1005': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1006': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	
	
	
	
	case '1011': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/349/664/0_t5ygtmwm_0_fukckww9_2.mp4';
	case '1012': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/369/694/0_mngeq7e4_0_rd6r21px_2.mp4';
	case '1013': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/522/909/0_mv85rttb_0_831867no_2.mp4';
	case '1015': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/477/514/0_114y9m8i_0_c3jf6mr6_2.mp4';
	case '1016': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/477/514/0_114y9m8i_0_c3jf6mr6_2.mp4';
	case '1017': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/355/591/0_19erjhfu_0_zy8jcrzq_2.mp4';
	
		default:
			return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/561/245/0_1jpv6e0i_0_95qjmzw3_2.mp4';
	}
}