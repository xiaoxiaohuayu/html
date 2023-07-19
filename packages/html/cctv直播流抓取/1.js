// https://api.cntv.cn/newList/getCboxLiveListByRegion?id=CHAL1399961767604362&r=山东&p=1&n=4&serviceId=livechina&cb=loadDataallzb
const axios = require("axios");
const setH5Str = require("./jiami.js");
var vdn_tsp = new Date().getTime().toString().slice(0, 10);
var vdn_vnFlash = "1537"; //澶缃戦〉FlashV1.0--No1
var staticCheck_Flash = "B4B51E8523157ED8D17ADB76041BCD09";
var vdn_vnHtml5 = "2049"; //澶缃戦〉Html5V1.0--No1
var staticCheck_Html5 = "47899B86370B879139C08EA3B5E88267";
var vdn_vc = "";
var vdn_uid = "BF484950DA560FA0EC6D4F59317FEB26";
var vdn_wlan = "";
var Fingerprint = ""; //定义设备指纹信息的key值

// console.log(
//   "jiami",
//   setH5Str,
//   setH5Str
//     .setH5Str(vdn_tsp + vdn_vnFlash + staticCheck_Flash + vdn_uid)
//     .toLocaleUpperCase()
// );
const fs = require("fs");
const prettier = require("prettier");
console.log("Hello World!");
const isUnicode = /^[\u0000-\u10FFFF]*$/; // 更广泛的 Unicode 范围

const globalEval = eval;

const unicodeToString = (str) => {
  return globalEval("'" + str + "'"); // 使用eval()函数将字符串转换为对应的Unicode字符
};

const loadDataallzb = (data) => {
  const { data: result } = data;
  console.log("gogogogo", result);
  const { total, list } = result;
  const program_id = [];
  const listData = list.map((item) => {
    const { interaction_id, cover_title } = item;
    program_id.push({ interaction_id, cover_title });
  });

  // program_id.map((item) => {
  //   axios
  //     .get(
  //       `https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid=${item.interaction_id}`
  //     )
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log("res", res.data);
  //         fs.writeFile(
  //           "./2.json",
  //           prettier.format(JSON.stringify(data), { parser: "json" }),
  //           (err) => {
  //             if (err) {
  //               console.log(err);
  //             }
  //           }
  //         );
  //       }
  //     });
  // });
};
axios
  .get(
    "https://api.cntv.cn/newList/getCboxLiveListByRegion?id=CHAL1399961767604362&r=陕西&p=1&n=4&serviceId=livechina&cb=loadDataallzb"
  )
  .then((res) => {
    if (res.status === 200) {
      eval(res.data);
      // 写入json文件里 utf-8格式
      // fs.writeFile(
      //   "./1.json",
      //   res.data.replace("loadDataallzb(", "").replace(")", ""),
      //   { encoding: "utf-8" }, // 指定编码格式
      //   (err) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //   }
      // );
    } else {
      console.log("error");
    }
  });
