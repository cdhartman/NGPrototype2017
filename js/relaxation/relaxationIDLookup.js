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

// 2062
// 5004 http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/488/568/0_n412z4xo_0_lfx21obx_2.mp4/manifest.f4m
// 5004 http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/488/568/0_n412z4xo_0_vh3mmels_2.mp4/manifest.f4m

// 2943
// 2942

// A Conversation With Dr. Hugh Butt
// 2955 http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/452/159/0_pl8cdorx_0_hand7e0o_2.mp4/manifest.f4m
// 2955 http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/452/159/0_pl8cdorx_0_kxaxrjzd_2.mp4/manifest.f4m


function mciVideoURLLookup(id) {
	"use strict";
	switch (id) {

	case '1000': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/574/712/0_gcy13a2z_0_y6rn2ks8_1.mp4';
	case '1001': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/574/712/0_gcy13a2z_0_y6rn2ks8_1.mp4';
	case '1002': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/574/712/0_gcy13a2z_0_y6rn2ks8_1.mp4';
	case '1003': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/574/712/0_gcy13a2z_0_y6rn2ks8_1.mp4';
	case '1004': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/574/712/0_gcy13a2z_0_y6rn2ks8_1.mp4';
	case '1005': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/574/712/0_gcy13a2z_0_y6rn2ks8_1.mp4';
	
		default:
			return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/561/245/0_1jpv6e0i_0_95qjmzw3_2.mp4';
	}
}