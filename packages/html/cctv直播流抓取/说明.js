// https://api.cntv.cn/newList/getCboxLiveListByRegion?id=CHAL1399961767604362&r=陕西&p=1&n=4&serviceId=livechina&cb=loadDataallzb
// https://api.cntv.cn/newList/getCboxLiveInfoMessage?id=INTEWXIBMj6J226Jk8OVVWhg230609&serviceId=livechina&callback=cb11
// https://vdn.live.cntv.cn/api2/liveHtml5.do?channel=pc://cctv_p2p_hdhsxkscj&channel_id=hsxkscj&video_player=1&im=0&client=flash&tsp=1687332124&vn=1537&vc=980C15760928DAC99FB66C3B18780D49&uid=BF484950DA560FA0EC6D4F59317FEB26&wlan=
/**
 * url: https://api.cntv.cn/newList/getCboxLiveListByRegion
 * id: CHAL1399961767604362
 * r :陕西  省份
 * p :1 页数
 * n :4 每页条数
 * serviceId:livechina 直播频道
 * cb :loadDataallzb  回调函数
 *
 * 接口请求完之后 返回是一个回调函数 loadDataallzb，里面的参数是一个对象，每个对象里面有一个signalList的属性，这里面的
 * interaction_id、play_flag  是关键参数
 *
 * 之后请求
 * url :https://api.cntv.cn/newList/getCboxLiveInfoMessage
 * id :是上面请求回来的interaction_id
 * serviceId:livechina 直播频道
 * callback: cb11 回调函数
 *  返回结果是一个回调函数 cb11，里面的参数是一个对象，每个对象里面有一个signalList的属性，这里面的 interaction_id、play_flag  是关键参数
 *
 * 之后请求
 * url :https://vdn.live.cntv.cn/api2/liveHtml5.do
 * channel: pc://cctv_p2p_xxx  这里的xxx是上面请求回来的play_flag。
 * video_player: 1
 * im :0
 * client: flash
 * tsp :1687332124  这里的值是一个时间戳 new Date().getTime().toString().slice(0, 10);
 * vn :1537
 * vc :980C15760928DAC99FB66C3B18780D49 这里的vc 是加密的，需要通过一个加密函数得到
 * uid: 浏览器指纹，可以是空
 * wlan: 网络环境，可以是空
 * 请求结果应该是
 *  var html5VideoData = '{"ack":"yes","lc":{"isp_code":"1","city_code":"XA","provice_code":"SN","country_code":"CN","ip":"xxx.xxx.xxx.xxx"},"client_sid":"38rjvm7bMeW7coeV+CiMg9gwQnXSrHJ11I9OSug6U3Q=","flv_cdn_info":{"cdn_code":"LIVE-FLV-CDN-KS","cdn_name":"3rdFLV金山云"},"flv_url":{"flv1":"","flv2":"https://gccncc.v.wscdns.com/gc/hsxkscj_1.flv","flv3":"gc?group&drm=0","flv4":"","flv5":"https://gccncc.v.wscdns.com/gc/hsxkscj_1/index.m3u8?adapt=0&BR=pub","flv6":""},"hls_cdn_info":{"cdn_code":"LIVE-HLS-CDN-BD","cdn_name":"3rdHLS百度"},"hls_url":{"hls1":"https://gcbdc.a.bdydns.com/gc/hsxkscj_1/index.m3u8?contentid=2820180516001","hls2":"https://gcbdc.a.bdydns.com/gc/hsxkscj_1/index.m3u8?contentid=2820180516001","hls3":"gc?group&drm=0","hls4":"","hls5":"","hls6":"https://gcbdc.a.bdydns.com/gc/hsxkscj_1/index.m3u8?adapt=0&BR=audio"},"hds_cdn_info":{"cdn_code":"LIVE-HDS-CDN-TXY","cdn_name":"3rdHDS腾讯云TXY"},"hds_url":{"hds1":"","hds2":"","hds3":"gc?group&drm=0","hds4":"","hds5":"","hds6":""},"public":"1","status":"1","video_protect":"3","audio_protect":"3","play":"1","tip_num":"","tip_msg":""}';
 * 类似这样的获取里面的 视频流地址
 */
