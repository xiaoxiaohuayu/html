async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 success"); // 这里为啥不打印async1 success呢？
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res, "111111"));
console.log("srcipt end");
