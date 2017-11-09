// banner
let windowObj;
{
    let now = 0;
    let bannerDots = document.querySelectorAll(".banner-dots span");
    let bannerImgs = document.querySelectorAll(".banner-img a");
    let bannerObj = document.querySelector("#banner");
    bannerDots.forEach(function (ele, index) {
        ele.onclick = function () {
            for (let i = 0; i < bannerDots.length; i++) {
                bannerDots[i].classList.remove("selected");
                bannerImgs[i].classList.remove("active");
            }
            ele.classList.add("selected");
            bannerImgs[index].classList.add("active");
            now = index;
        }
    });
    function fn() {
        if (now === bannerDots.length - 1) {
            now = 0
        } else {
            now++;
        }
        for (let i = 0; i < bannerDots.length; i++) {
            bannerDots[i].classList.remove("selected");
            bannerImgs[i].classList.remove("active");
        }
        bannerDots[now].classList.add("selected");
        bannerImgs[now].classList.add("active");
    }

    let f = setInterval(fn, 3000);
    bannerObj.onmouseover = function () {
        clearInterval(f);
    };
    bannerObj.onmouseout = function () {
        f = setInterval(fn, 3000);
    };
}
//banner隐藏列表
{
    let lists=$(".list-inner");
    lists.each(function(index,ele){
        $(ele).mouseenter(function(){
            $(this).children().last().css("top",-index*31.25).show()
        })
        $(ele).mouseleave(function(){
            $(this).children().last().hide();
        })

    })
}
// 店铺推荐
{
    let tjTop = document.querySelectorAll(".tuijian-l-top");
    let tjCon = document.querySelector(".tuijian-l-mid .container");
    let tjInner = document.querySelectorAll(".tuijian-l-mid .mid-inner");
    let prevObj = document.querySelector(".tuijian-l-mid .jiantou-l");
    let nextObj = document.querySelector(".tuijian-l-mid .jiantou-r");
    let now = 0;
    nextObj.onclick = function () {
        console.log(now);
        if (now === 1) {
            now = 0;
        }
        now++;
        console.log(now);
        tjCon.style.marginLeft = -492 * now + "px";
    };
    prevObj.onclick = function () {
        if (now === 0) {
            now = 1;
        }
        now--;
        tjCon.style.marginLeft = -492 * now + "px";
    };
    tjInner.forEach(function (ele, index) {
        ele.onmouseover = function () {
            console.log(index);
            for (let i = 0; i < tjInner.length; i++) {
                tjTop[i].classList.remove("active");
            }
            tjTop[index].classList.add("active");
        }
    })
}

// 右侧功能
{
    windowObj = document.body.scrollTop === 0 ? document.documentElement : document.body;
    let speed = 200;
    let toTop = document.querySelector(".totop");
    let btn=document.querySelectorAll(".right-nav-inner");
    let flag=true;
    btn.forEach(function(ele,index){
        let hide=ele.querySelector(".hide");
        ele.onmouseenter=function(){
            hide.classList.remove("out");
            hide.classList.add("in");
            flag=false;
        };
        ele.onmouseleave =function(){
            hide.classList.remove("in");
            hide.classList.add("out");
            flag=true;
            ele.addEventListener("animationend",function(){
                if(flag){
                    hide.style.right="-999px";
                }
            })
        }
    });
    toTop.onclick = function () {
        let t = setInterval(function () {
            windowObj.scrollTop -= speed;
            if (windowObj.scrollTop <= 0) {
                clearInterval(t);
            }
        }, 20);
    }
}

// 浮动搜索
{

    let topBar = document.querySelector(".flo-search");
    window.addEventListener("scroll", function () {
        body = document.documentElement.scrollTop === 0 ? document.body : document.documentElement;
        if (body.scrollTop > 600) {
            topBar.style.marginTop = 0;
        } else {
            topBar.style.marginTop = -50 + "px";
        }
    })
}

// 左侧浮动导航
{
    let leftBar = document.querySelector(".left-nav");
    window.addEventListener("scroll", function () {
        if (body.scrollTop > 600) {
            leftBar.style.cssText = "width:36px;height:333px";
        } else {
            leftBar.style.cssText = "width:0;height:0;";
        }
    });
    let slides = document.querySelectorAll(".slide");
    let btns = document.querySelectorAll(".l-nav-item");
    let flag = true;
    btns.forEach(function (ele, index) {
        ele.onclick = function () {
            flag = false;
            let ot = slides[index].offsetTop;
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove("active");
            }
            ele.classList.add("active");
            animate(body, {scrollTop: ot - 100}, 200, Tween.Linear, function () {
                flag = true;
            });
        };
    });
    window.addEventListener("scroll", function () {
        for (let i = 0; i < slides.length; i++) {
            if (body.scrollTop >= slides[i].offsetTop - 100) {
                if (flag) {
                    for (let i = 0; i < btns.length; i++) {
                        btns[i].classList.remove("active");
                    }
                    btns[i].classList.add("active");
                }
            }
        }
        if (body.scrollTop < slides[0].offsetTop - 60) {
            btns[0].classList.remove("active");
        }
    });
    let speed = 200;
    let toTop = document.querySelector(".l-nav-totop");
    toTop.onclick = function () {
        let t = setInterval(function () {
            body.scrollTop -= speed;
            if (body.scrollTop <= 0) {
                clearInterval(t);
            }
        }, 20);
    }
}
// 按需加载
{
    let slides = document.querySelectorAll(".slide");
    window.addEventListener("scroll",function () {
        for(let i=0;i<slides.length;i++){
            let imgs=slides[i].querySelectorAll(".slide img");
            if(body.scrollTop>slides[i].offsetTop-innerHeight){
                for(let i=0;i<imgs.length;i++){
                    imgs[i].src=imgs[i].getAttribute("data-src");
                }
            }
        }
    })
}
//顶部隐藏
{
    $(".list").mouseenter(function () {
        $(this).children().last().show()
    })
    $(".list").mouseleave(function () {
        $(this).children().last().hide()
    })
}
