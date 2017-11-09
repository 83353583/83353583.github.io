// ad滑动开始
{
    let prevObj = document.querySelector(".ad .l-arrow");
    let nextObj = document.querySelector(".ad .r-arrow");
    let adObj = document.querySelector(".ad");
    let adContainer = document.querySelector(".ad .ad-container");
    let now = 4;
    let dir = "r";
    let flag = true;
    let adT = setInterval(slide, 3000);

    function slide() {
        if (now === 4 || now === 8) {
            adContainer.style.transition = "margin-left 1s ease";
        }
        if (dir === "r") {
            now++;
        } else if (dir === "l") {
            now--
        }
        console.log(now);
        adContainer.style.marginLeft = -295 * now + "px";
    }

    adContainer.addEventListener("transitionend", function () {
        if (now === 12) {
            adContainer.style.transition = "none";
            now = 4;
            adContainer.style.marginLeft = -1180 + "px";
        }
        if (now === 0) {
            now = 8;
            adContainer.style.transition = "none";
            adContainer.style.marginLeft = -2360 + "px";
        }
        flag = true;
    });

    adObj.onmouseover =  function () {
        clearInterval(adT);
    };
    window.addEventListener("blur",function(){
        clearInterval(adT);
    });
    window.addEventListener("focus",function(){
        adT = setInterval(slide, 3000);
    });
    adObj.onmouseout = function () {
        adT = setInterval(slide, 3000);
    };
    nextObj.onclick = function () {
        dir = "r";
        if (flag) {
            slide();
            flag = false;
        }

    };
    prevObj.onclick = function () {
        dir = "l";
        if (flag) {
            slide();
            flag = false;
        }


    }
}


// 公告
{
    let nextObj = document.querySelector(".notice .r-a");
    let prevObj = document.querySelector(".notice .l-a");
    let noticeObj = document.querySelector(".notice ul");
    let notice = document.querySelector(".notice");
    let now = 0;
    nextObj.onclick = function () {
        if (now === 2) {
            now = -1;
        }
        now++;
        noticeObj.style.marginTop = -38 * now + "px";

    };
    prevObj.onclick = function () {
        if (now === 0) {
            now = 3;
        }
        now--;
        noticeObj.style.marginTop = -38 * now + "px";
    };
    let notT = setInterval(function () {
        if (now === 2) {
            now = -1;
        }
        now++;
        noticeObj.style.marginTop = -38 * now + "px";
    }, 1000);
    notice.onmouseover = function () {
        clearInterval(notT);
    };
    notice.onmouseout = function () {
        notT = setInterval(function () {
            if (now === 2) {
                now = -1;
            }
            now++;
            noticeObj.style.marginTop = -38 * now + "px";
        }, 1000)
    };
    window.addEventListener("blur",function(){
        clearInterval(notT);
    });
    window.addEventListener("focus",function(){
        notT = setInterval(notT = setInterval(function () {
            if (now === 2) {
                now = -1;
            }
            now++;
            noticeObj.style.marginTop = -38 * now + "px";
        }, 1000), 1000);
    });
}

//二维码
{
    let box = document.querySelector(".erwei");
    let bbox = document.querySelector(".top-rightbox2");
    bbox.onmouseover = function () {
        // bbox.style.backgroundColor = "white";
        box.style.display = "block";
    };
    bbox.onmouseout = function () {
        // bbox.style.backgroundColor = "#f6f6f6";
        box.style.display = "none";
    }
}
{
    let boxs = document.querySelectorAll(".czselected a");
    boxs.forEach(function (ele, index) {
        ele.onclick = function () {
            for (let i = 0; i < boxs.length; i++) {
                boxs[i].classList.remove("selected");
            }
            boxs[index].classList.add("selected");
        }
    })
}
{
    let items = document.querySelectorAll(".extend");
    let boxs = document.querySelectorAll(".kuozhan");
    console.log(boxs);
    items.forEach(function (ele, index) {
        ele.onmouseenter = function () {
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove("tounav-kuo-active");
                boxs[i].style.display = "none";
            }
            items[index].classList.add("tounav-kuo-active");
            boxs[index].style.display = "block";
        }
    });
    items.forEach(function (ele, index) {
        ele.onmouseleave = function () {
            items[index].classList.remove("tounav-kuo-active");
            boxs[index].style.display = "none";
        }
    })
}
// banner
{
    let dots = document.querySelectorAll(".dot ul li");
    let imgs = document.querySelectorAll(".img img");
    let container = document.querySelector(".banner-img");
    let prevObj = document.querySelector(".l-arrow");
    let nextObj = document.querySelector(".r-arrow");
    let now = 0;
    let z = 10;
    let flag = true;
    let banT = setInterval(move, 3000);
    container.onmouseout  = function () {
        banT = setInterval(move, 3000)
    };
    container.onmouseover = function () {
        clearInterval(banT);
    };
    window.addEventListener("blur",function(){
        clearInterval(banT);
    });
    window.addEventListener("focus",function(){
        banT = setInterval(move, 3000);
    });
    nextObj.onclick = function () {
        if (flag) {
            move();
        }
        flag = false;
    };
    prevObj.onclick = function () {
        if (flag) {
            move("l");
        }
        flag = false;
    };
    dots.forEach(function (ele, index) {
        ele.onclick = function () {
            if (flag) {
                for (let i = 0; i < dots.length; i++) {
                    dots[i].classList.remove("selected")
                }
                ele.classList.add("selected");
                if (index > now) {
                    imgs[now].classList.add("left-out");
                    imgs[index].classList.add("right-in");
                } else if (index < now) {
                    imgs[now].classList.add("right-out");
                    imgs[index].classList.add("left-in");
                }
                imgs[index].style.zIndex = z++;
                now = index;
            }
            flag = false;
        }
    });
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("animationend", function () {
            imgs[i].className = "";
            flag = true;
        })
    }
    function move(dir = "r") {
        if (dir === "r") {
            imgs[now].classList.add("left-out");
            now++;
            if (now === imgs.length) {
                now = 0;
            }
            imgs[now].classList.add("right-in");
        }
        if (dir === "l") {
            imgs[now].classList.add("right-out");
            now--;
            if (now === -1) {
                now = imgs.length - 1;
            }
            imgs[now].classList.add("left-in");
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("selected")
        }
        dots[now].classList.add("selected");
        imgs[now].style.zIndex = z++;

    }

}
