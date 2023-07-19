const queryString = window.location.search;
const regex = /[?&]([^=&#]+)=([^&#]*)/g;
const paramObj = {};
let m;
while (m = regex.exec(queryString)) {
  paramObj[m[1]] = m[2];
}
