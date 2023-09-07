场景：在一次业务中之前的文件上传都是通过指定的文件接口然后返回文件id，但是出于公司业务的特殊性，现在需要直接上传问题，但是因为项目设计到之前老旧的设备需要
通过IE浏览器去连接高拍仪拍照，返回的是base64编码。这时候需要将base64转file对象。
刚开始是用的字节数组ArrayBuffer,转二进制，再通过Blob或者File实例下载。但是突然想起之前有个atob的api，使用之后发现文件下载之后 但是文件是损坏的。就想研究下
大概的解释就是：“atob方法返回的是ASCII编码的原始二进制字符串（注意是字符串）并不是原始的二进制类型，我理解的是不是01这些的，所以下载以后文件会变大并且打不开”
```
当我们使用atob()函数解码Base64数据时，得到的是一个包含原始二进制数据的字符串。每个字符在字符串中都代表一个字节的数据。然而，将这些字符的ASCII码值存储在普通的JavaScript数组中，并不会重新构造原始的二进制数据。

为了正确地重新构造二进制数据，我们需要使用TypedArray对象，如Uint8Array，来存储解码后的数据。Uint8Array是一个特定类型的数组，它可以存储8位无符号整数值。我们可以使用Uint8Array的构造函数创建一个具有正确长度的数组，然后使用循环将每个字符的编码值存储在数组中。

通过将Uint8Array数组传递给Blob构造函数，可以创建一个包含解码后的二进制数据的Blob对象。Blob对象代表了不可变的、原始数据的片段，可以用于创建可供下载的文件。

通过创建一个包含正确的Blob对象的下载链接，我们可以模拟点击该链接以触发文件的下载。

因此，修改后的代码将解码后的数据正确地存储在Uint8Array数组中，并使用该数组创建了Blob对象，从而确保下载的文件可以正确地打开和使用。



====
当我们使用atob()函数解码Base64数据时，得到的是一个字符串。这个字符串是使用Base64编码的方式表示的二进制数据。

在Base64编码中，一个字符对应于6个比特（bit）的数据。原始的二进制数据是以8位（一个字节）为单位的，但在base64编码中，每个字符只能表示6个比特。

在JavaScript中，字符串是由16位的Unicode字符组成的。每个字符占用2个字节（16位），并且可以使用charCodeAt()函数获取到它的ASCII码（也可以说是Unicode码）值。

当我们将Base64解码后的数据存储在一个普通的JavaScript数组中时，实际上存储的是每个字符的ASCII码值，而不是对应的原始二进制数据。

这意味着如果我们仅仅将这些ASCII码值存储在数组中，并不会恢复出原始的二进制数据。要想正确地重新构造原始二进制数据，我们需要将这些ASCII码值按照正确的字节顺序组合起来，并以字节为单位存储在数组中。

为了解决这个问题，我们可以使用TypedArray对象，如Uint8Array，来存储解码后的数据。Uint8Array是一个特定类型的数组，它可以存储8位无符号整数值。我们可以使用Uint8Array的构造函数创建一个具有正确长度的数组，并通过循环将每个字符的ASCII码值存储在数组中。

通过这种方式，我们可以将解码后的Base64数据正确地存储在Uint8Array数组中，并且每个元素代表一个字节的二进制数据。这样就可以将解码后的数据作为原始的二进制数据来使用了
====
```

###示例 正常的
```js
const base64Data = '这里是base64不带data:image/jpeg;base64'
// 解码Base64数据
const binaryData = window.atob(base64Data);

// 创建一个Uint8Array数组
const dataArray = new Uint8Array(binaryData.length);
// 将每个字符的编码值存储在数组中
for (let i = 0; i < binaryData.length; i++) {
  dataArray[i] = binaryData.charCodeAt(i);
}
const blob = new Blob([dataArray]);

// 创建一个下载链接
const downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(blob);
downloadLink.download = 'file.jpg'; // 下载文件的文件名

// 模拟点击下载链接
downloadLink.click();
```
### 示例错误的
```js
// 假设有一个Base64编码的文件内容
const base64Data = '这里是base64不带data:image/jpeg;base64'
// 解码Base64数据
const binaryData = window.atob(base64Data);

// 创建一个普通的JavaScript数组
const dataArray = [];
// 将每个字符的ASCII码值存储在数组中
for (let i = 0; i < binaryData.length; i++) {
  dataArray.push(binaryData.charCodeAt(i));
}
const blob = new Blob([dataArray]);

// 创建一个下载链接
const downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(blob);
downloadLink.download = 'file.jpg'; // 下载文件的文件名

// 模拟点击下载链接
downloadLink.click();
console.log(dataArray); // 打印数组
```
