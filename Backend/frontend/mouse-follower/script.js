const main = document.querySelector('main');
const mouseFollower = document.querySelector('.mouse-follower');
const insideFollower = document.querySelector('.inside');

main.addEventListener("mousemove", (event) => {
    let { clientX, clientY } = event;
    mouseFollower.style.left = clientX + "px";
    mouseFollower.style.top = clientY + "px";
});