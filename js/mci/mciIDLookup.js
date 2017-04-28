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

	case '1000': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/427/705/0_u4d08joi_0_obn7q8ac_2.mp4';
	case '1001': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/355/176/0_dnpmki0a_0_dbhv5dtm_2.mp4';
	case '1002': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/527/822/0_4rgvlzvx_0_0d6i51gd_2.mp4';
	case '1003': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/512/981/0_ykbyocje_0_eft69dqv_2.mp4';
	case '1004': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1005': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/527/822/0_bgbc2yjq_0_2pl8gsr2_2.mp4';
	case '1006': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1007': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/528/440/0_ijvicec9_0_v2yy09i3_2.mp4';
	case '1008': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/527/828/0_0rf6f6bh_0_0l2m875p_2.mp4';
	case '1009': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/536/487/0_rb4t77s9_0_13a8uv9o_2.mp4';
	case '1010': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/527/828/0_8ok685z8_0_w83j1pzu_2.mp4';
	case '1011': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/349/664/0_t5ygtmwm_0_fukckww9_2.mp4';
	case '1012': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/369/694/0_mngeq7e4_0_rd6r21px_2.mp4';
	case '1013': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/522/909/0_mv85rttb_0_wyp0s7wq_2.mp4';
	case '1014': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/543/17/0_sbb90mjz_0_9ka2nbvq_2.mp4';
	case '1015': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/527/822/0_n9fuaem3_0_8egnd59k_2.mp4';
	case '1016': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/477/514/0_114y9m8i_0_c3jf6mr6_2.mp4';
	case '1017': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/355/591/0_19erjhfu_0_zy8jcrzq_2.mp4';
	case '1018': return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/355/591/0_19erjhfu_0_zy8jcrzq_2.mp4';
	
		default:
			return 'http://roqiww002a.mayo.edu:1935/vod/_definst_/library/content/r71v1/entry/data/561/245/0_1jpv6e0i_0_95qjmzw3_2.mp4';
	}
}