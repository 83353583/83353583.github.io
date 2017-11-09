var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
// 如果需要前进后退按钮
    autoplay : 2000,
    autoplayDisableOnInteraction : false,
});
ContentScroll = new IScroll('.content', {
    scrollbars: true,
    mouseWheel: true,
    interactiveScrollbars: true,
    shrinkScrollbars: 'clip',
    fadeScrollbars: true,
    click:true,
});
var status="undo";
var btn = $(".btnbox div").click(function () {
    btn.removeClass("active");
    $(this).addClass("active");
    if($(".undo").hasClass("active")){
        status="undo";
        $(".clear").fadeToggle(300)
    }else {
        status="done";
        $(".clear").fadeToggle(300)
    }
    console.log(status);
    reWrite();
    ContentScroll.scrollTo(0,0,0)
});
function getData() {
    return localStorage.todo ? JSON.parse(localStorage.todo) : []
}
function saveData(data) {
    localStorage.todo = JSON.stringify(data);
}
var add = $(".add").click(function () {
    $("main")
        .css("filter", "blur(2px)")
        .next()
        .show()
        .find(".editor")
        .delay(200)
        .queue(function () {
            $(this).addClass("show").dequeue();
            $("#text")[0].focus();
        });
});
var clear=$(".clear").click(function(){
    var data=getData();
    var newData=[];
    $.each(data,function(index,ele){
        if(!ele.isDone){
            newData.push(ele);
        }
    });
    // newData.reverse();
    saveData(newData);
    reWrite();
});
var submit=$(".submit").click(function(){
    if($("#text").val()===""){
        return;
    }
    var text=$("#text").val();
    $("#text").val("");
    var date=new Date().getTime();
    var data=getData();
    data.push({con:text,date,isStar:0,isDone:0});
    saveData(data);
    $(".editor")
        .removeClass("show")
        .hide()
        .parent()
        .hide()
        .prev()
        .css("filter","")
    reWrite();
});
var close=$(".close").each(function(index,ele){
   $(ele).click(function(){
        $(ele)
            .parent()
            .removeClass("show")
            .hide()
            .parent()
            .hide()
            .prev()
            .css("filter","")
})
});
$(".content").on("click",".complete",function(){
    var data=getData();
    var index=$(this).parent().attr("id");
    data.reverse();
    data[index].isDone=1;
    data.reverse();
    saveData(data);
    reWrite();
});
$(".content").on("click",".delete",function(){
    var data=getData();
    var index=$(this).parent().attr("id");
    data.reverse();
    data.splice(index,1);
    data.reverse();
    saveData(data);
    reWrite();
});
$(".content").on("click","p",function(){
    var inner=$(this).html();
    $("main")
        .css("filter", "blur(2px)")
        .next()
        .show()
        .find(".all")
        .delay(200)
        .queue(function () {
            $(this).addClass("show").dequeue();
            $(this).find("p").html(inner);
        });
});
$(".content").on("click",".star",function(){
    var data=getData();
    var index=$(this).parent().attr("id");
    data.reverse();
    data[index].isStar=data[index].isStar?0:1;
    data.reverse();
    saveData(data);
    reWrite();
})
function reWrite(){
    var str="";
    var data=getData();
    data.reverse();
    if(status==="undo"){
        data.forEach(function(ele,index){
            if(!ele.isDone){
                if(ele.isStar){
                    str+="<li id='"+index+"'><time><span>"+getDate(ele.date)+"</span> <span>"+getTime(ele.date)+"</span></time><p>"+ele.con+"</p><div class='star'><span class='active'>★</span></div><div class='complete'>完成</div></li>"
                }else{
                    str+="<li id='"+index+"'><time><span>"+getDate(ele.date)+"</span> <span>"+getTime(ele.date)+"</span></time><p>"+ele.con+"</p><div class='star'><span>★</span></div><div class='complete'>完成</div></li>"
                }
            }
        })
    }
    if(status==="done"){
        data.forEach(function(ele,index){
            if(ele.isDone){
                str+="<li id='"+index+"'><time><span>"+getDate(ele.date)+"</span> <span>"+getTime(ele.date)+"</span></time><p>"+ele.con+"</p><div class='delete'>删除</div></li>"
            }
        })
    }
    $(".content ul").html(str);
    var contentLi=document.querySelectorAll(".content li");
    $.each(contentLi,function (index,ele) {
        var hammer=new Hammer(ele);
        var status="start";
        var dis;
        var max=$(".complete").width()||$(".delete").width();
        hammer.on("panstart",function(e){
            $(ele).css("transition","none");
        });
        hammer.on("pan",function(e){
            dis=e.deltaX;
            if(status==="start"){
                if(dis>0){
                    return;
                }
                if(Math.abs(dis)>max){
                    return;
                }
            }
            if(status==="end"){
                if(dis<0){
                    return;
                }
                if(Math.abs(dis)>max){
                    return;
                }
                dis=-max+dis;
            }
            $(ele).css("transform","translate3d("+dis+"px,0,0)")
        });
        hammer.on("panend",function(){
            $(ele).css("transition","all .5s");
            if(dis<-max/2){
                $(ele).css("transform","translate3d("+(-max)+"px,0,0)")
                status="end";
            }else {
                $(ele).css("transform","translate3d(0,0,0)")
                status="start";
            }
        })
    });
    ContentScroll.refresh();
}
function getDate(ms){
    var date=new Date();
    date.setTime(ms);
    var year=date.getFullYear();
    var month=formTime(date.getMonth()+1);
    var day=formTime(date.getDate());
    return year+"-"+month+"-"+day;
}
function getTime(ms){
    var date=new Date();
    date.setTime(ms);
    var hour=formTime(date.getHours());
    var minute=formTime(date.getMinutes());
    var second=formTime(date.getSeconds());
    return hour+":"+minute+":"+second;
}
function formTime(time){
    return time<10?"0"+time:time;
}
reWrite();

// localStorage.clear();

