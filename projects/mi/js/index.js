//购物车

{
    let shoppingCar = $(".shoppingCar");
    let inner = $(".shoppingCar-inner");
    shoppingCar.mouseenter(function(){
        inner.slideDown(150)
    });
    shoppingCar.mouseleave(function(){
        inner.slideUp(150)
    })
}

// 隐藏导航栏    
{
    let navItem=$(".nav-wenzi.hide a");
    let container=$(".hide-nav");
    let navObj=$(".nav");
    // let containerInner=container.firstElementChild.children;
    let hideContent=$(".hide-nav .container ");
    console.log(hideContent)
    navItem.mouseenter(function(){
        container.slideDown(200)
    });
    navObj.mouseleave(function(){
        container.slideUp(200)
    });
    navItem.each(function(index,ele){
        $(ele).mouseenter(function(){
            hideContent.hide();
            $(hideContent[index]).show();
        })
    })
}
//搜索栏
{
    let inputObj = $("#chazhao input");
    let tuijianObj = $(".chazhao-tuijian");
    inputObj.focus(function(){
        tuijianObj.fadeOut(150)
        $(this).css("borderColor"," #ff6700").next().css("borderColor"," #ff6700")
        $(".chazhao-list").show()
    });
    inputObj.blur(function(){
        tuijianObj.fadeIn(150);
        $(this).css("borderColor","  #e0e0e0").next().css("borderColor","  #e0e0e0")
        $(".chazhao-list").hide()
    })

}
// 商品分类选项卡
{
    let fenlei = document.querySelectorAll(".fenlei");

    function xuanxiangka(val) {
        let fenleiTop = val.querySelectorAll(".fenlei-top-fenlei a");
        let fenleiBot = val.querySelectorAll(".fenlei-bottom .bottom-right");
        fenleiTop.forEach(function (ele, index) {
            ele.onmouseover = function () {
                for (let i = 0; i < fenleiTop.length; i++) {
                    fenleiTop[i].classList.remove("active");
                    fenleiBot[i].style.display = "none";
                }
                ele.classList.add("active");
                fenleiBot[index].style.display = "block";
            }
        });
    }

    for (let i = 0; i < fenlei.length; i++) {
        xuanxiangka(fenlei[i]);
    }
}
// banner
{
    let now = 0;
    let bannerObj = document.querySelector("#banner");
    let bannerDots = document.querySelectorAll(".banner-dot a");
    let bannerImgs = document.querySelectorAll(".banner-inner");
    let prevObj = document.querySelector(".zuojiantou");
    let nextObj = document.querySelector(".youjiantou");
    let f = setInterval(fn, 2000);

    function fn(dir = "r") {
        if (dir === "r") {
            now++;
            if (now === bannerDots.length) {
                now = 0;
            }
        } else if (dir === "l") {
            now--;
            if (now === -1) {
                now = bannerDots.length - 1;
            }
        }
        for (let i = 0; i < bannerDots.length; i++) {
            bannerDots[i].classList.remove("dot-selected");
            bannerImgs[i].classList.remove("active");
        }
        bannerDots[now].classList.add("dot-selected");
        bannerImgs[now].classList.add("active");
    }

    bannerDots.forEach(function (ele, index) {
        ele.onclick = function () {
            for (let i = 0; i < bannerDots.length; i++) {
                bannerDots[i].classList.remove("dot-selected");
                bannerImgs[i].classList.remove("active");
            }
            ele.classList.add("dot-selected");
            bannerImgs[index].classList.add("active");
            now = index;
        }
    });
    prevObj.onclick = function () {
        fn("l")
    };
    nextObj.onclick = function () {
        fn();
    };
    bannerObj.onmouseover = function () {
        clearInterval(f);
    };
    bannerObj.onmouseout = function () {
        f = setInterval(fn, 2000);
    };
}

//明星单品滑动
{
    let num = 1;
    let dpPrevObj = document.querySelector(".danpin-anniu .prev");
    let dpNextObj = document.querySelector(".danpin-anniu .next");
    let dpContainer = document.querySelector("#danpin .container");
    let dpSt = setInterval(dpFn, 2000);

    function dpArrowOut() {
        dpSt = setInterval(dpFn, 2000);
    }

    function dpArrowIn() {
        clearInterval(dpSt);
    }

    function dpNext() {
        dpNextObj.classList.remove("selected");
        dpPrevObj.classList.add("selected");
        dpContainer.style.marginLeft = "-1226px";
        num = 0;
    }

    function dpPrev() {
        dpNextObj.classList.add("selected");
        dpPrevObj.classList.remove("selected");
        dpContainer.style.marginLeft = "0";
        num = 1;
    }

    function dpFn() {
        num++;
        if (num % 2 === 0) {
            dpNext();
        } else {
            dpPrev();
        }
    };
    dpNextObj.onclick = dpNext;
    dpNextObj.onmouseover = dpArrowIn;
    dpNextObj.onmouseout = dpArrowOut;
    dpPrevObj.onclick = dpPrev;
    dpPrevObj.onmouseover = dpArrowIn;
    dpPrevObj.onmouseout = dpArrowOut;
}

// 内容滑动
{
    let neirongs = document.querySelectorAll(".neirong-inner");

    function neirongFn(par) {
        let dots = par.querySelectorAll(".neirong-dots span");
        let container = par.querySelector("#neirong .container ");
        let nrArrowPrev = par.querySelector(".neirong-prev");
        let nrArrowNext = par.querySelector(".neirong-next");
        let num = 0;

        function nrFn(ele, index) {
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("selected");
            }
            ele.classList.add("selected");
            container.style.marginLeft = -296 * index + "px";
        }

        function nrArrow(dir = "r") {
            if (dir === "r") {
                num++;
                if (num === dots.length) {
                    num = dots.length - 1;
                }
            } else {
                num--;
                if (num === -1) {
                    num = 0;
                }
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("selected");
            }
            dots[num].classList.add("selected");
            container.style.marginLeft = -296 * num + "px";
        }

        dots.forEach(function (ele, index) {
            ele.onclick = function () {
                nrFn(ele, index);
                num = index;
            };
        });
        nrArrowNext.onclick = function () {
            nrArrow();
        };
        nrArrowPrev.onclick = function () {
            nrArrow("l");
        }


    }

    for (let i = 0; i < neirongs.length; i++) {
        neirongFn(neirongs[i]);
        // console.log(neirongs[i])
    }
}

// 推荐滑动

{
    let num = 1;
    let tjPrevObj = document.querySelector(".tuijian-anniu .prev");
    let tjNextObj = document.querySelector(".tuijian-anniu .next");
    let tjContainer = document.querySelector("#tuijian .container");
    let tjInner = document.querySelectorAll("#tuijian .container .tuijian-right");

    function tjNext() {
        if (num < tjInner.length / 5) {
            num++;
            tjPrevObj.classList.add("selected");
            if (num == tjInner.length / 5) {
                tjNextObj.classList.remove("selected");
            }
        }
        tjContainer.style.marginLeft = -1240 * (num - 1) + "px";
    }

    function tjPrev() {
        if (num > 1) {
            num--;
            tjNextObj.classList.add("selected");
            if (num == 1) {
                tjPrevObj.classList.remove("selected");
            }
        }
        tjContainer.style.marginLeft = -1240 * (num - 1) + "px";
    }

    tjNextObj.onclick = tjNext;

    tjPrevObj.onclick = tjPrev;

}