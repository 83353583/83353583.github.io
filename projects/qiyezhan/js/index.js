// // banner
// {
//     let dots=document.querySelectorAll(".banner ul li a");
//     let container = document.querySelector(".banner .container");
//     let banner = document.querySelector(".banner");
//     let now = 0;
//     let t = setInterval(st, 2000);
//
//     function st() {
//         now++;
//         container.style.transition = "all .5s";
//         container.style.marginLeft = -1349 * now + "px";
//         for(let i=0;i<dots.length;i++){
//             dots[i].classList.remove("selected");
//         }
//         dots[now].classList.add("selected");
//
//     }
//     dots.forEach(function(ele,index){
//         ele.onclick=function(){
//             for(let i=0;i<dots.length;i++){
//                 dots[i].classList.remove("selected");
//             }
//             dots[index].classList.add("selected");
//             now=index;
//             container.style.transition = "all .5s";
//             container.style.marginLeft = -1349 * now + "px";
//
//         }
//     });
//     container.addEventListener("transitionend", function () {
//         if (now === 6) {
//             container.style.transition = "none";
//             container.style.marginLeft = "0";
//             now = 0;
//             dots[now].classList.add("selected");
//         }
//     });
//     window.onblur = banner.onmouseover = function () {
//         clearInterval(t);
//     };
//     window.onfocus = banner.onmouseout = function () {
//         t = setInterval(st, 2000);
//     }
// }
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
// 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay : 2000,
    autoplayDisableOnInteraction : false,
});