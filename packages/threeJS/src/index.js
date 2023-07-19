
import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
// 纹理加载器
const texture = new THREE.TextureLoader()
const img = texture.load('./textrues/e.jpg')
// 获取元素 
const canvas = document.querySelector('canvas.webgl')
// 创建场地
const scene = new THREE.Scene()
// 创建物体 BoxGeometry  立方体
// const geometry = new THREE.BoxGeometry();
const geometry = new THREE.SphereBufferGeometry( .7, 64,64 );

// 网格基础材料 
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
const material = new THREE.MeshStandardMaterial( { metalness:0.7,roughness:0.4} );
material.map = img

// 创建灯光
const pointLight = new THREE.PointLight(0xffffff,0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
// scene.add(pointLight)


const pointLight2 = new THREE.PointLight(0xffffff,0.1)
pointLight2.position.set(3.8,7.34,3)
pointLight2.intensity = 1
// scene.add(pointLight2)

// gui.add(pointLight2.position,'y').min(3).step(0.01)
// gui.add(pointLight2.position,'x').min(3).step(0.1)
// gui.add(pointLight2.position,'z').min(3).step(0.1)

//给场景增加环境光
let Ambient = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(Ambient);


const cube = new THREE.Mesh( geometry, material );


// 创建相机机位 PerspectiveCamera（透视摄像机）
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,4)
gui.add(camera.position,'y')
gui.add(camera.position,'x')
gui.add(camera.position,'z').max(4)
// camera.position.z = 5;
// camera.position.x = -5;
// camera.position.y = 5;
// 相机辅助函数
// var helper = new THREE.CameraHelper( camera );
// scene.add(helper)
scene.add(cube)



// 进行编译
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // alpha:true
})
/**
 * 循环渲染 也就是动画
 */

 function animate() {
	requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();
// let arr1 = [{'a':'a'},{'a':'b'},{'a':'c'},{'a':'d'},{'a':'a'}];
// var hash = {};
// let a = arr1.reduce(function(item, next) { hash[next.a] ? '' : hash[next.a] = true && item.push(next); return item }, [])
// console.log(a,hash)
let arry = [{'a':'a'},{'a':'b'},{'a':'c'},{'a':'d'},{'a':'a'}]
let info = []
// console.log(arry[0]['a'])
// info = arry.map(n=>n.a)
arry.map((e,i)=>{
  console.log(arry[i]['a'],info.includes(arry[i]['a']))
  if(!info.includes(arry[i]['a'])){
    info.push(e.a)
  }else{
  }
})
console.log(info,arr)
// arry.forEach((item, index) => {
//   if (item.a == 'a') {
//     arry.splice(index, 1);
//   }
// })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor(0xA9A9A9,1);
renderer.render(scene, camera)