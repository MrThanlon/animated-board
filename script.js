const box = document.getElementById('box');
window.onmousemove = e => {
  const percentageX = e.screenX / window.innerWidth - 0.5;
  const percentageY = 0.5 - e.screenY / window.innerHeight;
  setRotate(percentageY * 20, percentageX * 20);
}
function setRotate(x, y) {
  box.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
}
function gyro(e) {
  // beta for X, gamma for Y, 0 ~ 360
  const percentageX = e.beta / 10;
  const percentageY = e.gamma / 10;
  // console.debug(percentageX * 10, percentageY * 10);
  setRotate(percentageX * 10, percentageY * 10);
}
if (typeof (DeviceMotionEvent) !== 'undefined') {
  // use gyro
  if (typeof (DeviceMotionEvent.requestPermission) === "function") {
    // add callback to document click
    document.onclick = () => {
      DeviceOrientationEvent.requestPermission().then(g => {
        if (g === 'granted') {
          // success
          window.ondeviceorientation = gyro;
        } else {
          alert('需要陀螺仪授权');
        }
      })
    }
    alert('请点击屏幕任意位置以获得陀螺仪权限');
  } else {
    // android? just use
    window.ondeviceorientation = gyro;
  }
}
setRotate(0, 0);
