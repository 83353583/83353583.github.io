var pen1 = document.querySelector("#c1").getContext('2d');
var pen2 = document.querySelector("#c2").getContext('2d');
var pen3 = document.querySelector("#c3").getContext('2d');
var pen4 = document.querySelector("#c4").getContext('2d');
var t;
var now = 0;
var flag = true;
var prev = $(".prev");
var next = $(".next");
var btn = $(".btn");
var dir;
// 全屏滚动
$(".container").fullpage({
    anchors: ["p1", "p2", "p3", "p4", "p5"],
    // navigation:true,
    // navigationColor:"#00fff5",
    // navigationTooltips:["首页","个人简介","个人能力","个人项目","联系方式"],
    slidesNavigation: true,
    controlArrowColor: "#0070e8",
    loopHorizontal: true,
    menu: "#nav",
    fixedElements: "#nav .stars",
    onLeave: function (index, nextIndex) {
        if (index === 1) {
            $("#nav").fadeIn(500).css("display", "flex")
        }
        if (index === 3) {
            pen1.clearRect(0, 0, 200, 200);
            pen2.clearRect(0, 0, 200, 200);
            pen3.clearRect(0, 0, 200, 200);
            pen4.clearRect(0, 0, 200, 200);
        }
        if (index === 2) {
            $(".p-warp").fadeOut(300);
            $(".photo").fadeOut(300);
        }
        if (nextIndex === 1) {
            $("#nav").fadeOut(500)
        }
    },
    afterLoad: function (anchorLink, index) {
        if (index === 3) {
            draw(pen1, "#00fff5", 80);
            draw(pen2, "#00fff5", 80);
            draw(pen3, "#00fff5", 80);
            draw(pen4, "#00fff5", 80);
        }
        if (index === 2) {
            $(".p-warp").fadeIn(300);
            $(".photo").fadeIn(300);
        }
    }
});
// 星空背景
$(document).ready(function () {
    var stars = 800;
    var $stars = $('.stars');
    var r = 800;
    for (var i = 0; i < stars; i++) {
        if (window.CP.shouldStopExecution(1)) {
            break;
        }
        var $star = $('<div/>').addClass('star');
        $stars.append($star);
    }
    window.CP.exitedLoop(1);
    $('.star').each(function () {
        var cur = $(this);
        var s = 0.2 + Math.random() * 1;
        var curR = r + Math.random() * 300;
        cur.css({
            transformOrigin: '0 0 ' + curR + 'px',
            transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
        });
    });
});

// 个人能力进度条
function draw(pen, color, max) {
    pen.strokeStyle = color;
    pen.lineCap = "round";
    pen.lineWidth = "10";
    pen.textAlign = "center";
    pen.textBaseline = "middle";
    pen.font = "30px 微软雅黑";
    pen.fillStyle = color;
    let num = 0;

    function procession() {
        num++;
        let angle = num * Math.PI / 50;
        pen.save();
        pen.translate(100, 100);
        pen.save();
        pen.rotate(-Math.PI / 2);
        pen.clearRect(-100, -100, 200, 200);
        pen.beginPath();
        pen.arc(0, 0, 70, 0, angle);
        pen.shadowColor = color;
        pen.shadowBlur = 10;
        pen.stroke();
        pen.restore();
        pen.fillText(num + "%", 0, 0);
        pen.restore();
        if (num < max) {
            requestAnimationFrame(procession);
        }
    }

    procession();
}
// 访客
$(document).ready(function () {
    if (localStorage.visit) {
        $("#main").find("h1").html("欢迎回来")
    } else {
        $("#main").find("h1").html("欢迎你，陌生人")
    }
    saveData();
});
function saveData() {
    localStorage.visit = true;
}
// localStorage.clear();
// 个人图片轮播
$(".photo").mouseenter(function () {
    $(this).find(".active").fadeOut(500);
});
$(".photo").mouseleave(function () {
    $(this).find(".active").fadeIn(500);
});
// 个人能力展示
$(".skill").each(function (index, ele) {
    $(this).mouseover(function () {
        $(this).find(".detail");
    });
    $(this).mouseout(function () {
        $(this).find(".detail");
    })
});
//个人项目
t = setInterval(rotate, 4000);
function rotate() {
    if (dir === "l") {
        now--;
    } else if (dir === "r" || !dir) {
        now++;
    }
    $(".profile-box").css("transform", "rotateY(" + (-now * 45) + "deg)");
}
$(".profile-box").mouseenter(function () {
    clearInterval(t);
});
$(".profile-box").mouseleave(function () {
    t = setInterval(rotate, 4000);
});
$(window).blur(function () {
    clearInterval(t);
});
$(window).focus(function () {
    t = setInterval(rotate, 4000);
});
next.click(function () {
    dir="r";
    rotate();
});
prev.click(function () {
    dir="l";
    rotate();
});
btn.mouseenter(function(){
    clearInterval(t)
});
btn.mouseleave(function(){
    t = setInterval(rotate, 4000);
});