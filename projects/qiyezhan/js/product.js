let content=document.querySelectorAll(".content");
function slide(ele){
let dots=ele.querySelectorAll(".index span");
let container=ele.querySelector(".warp");
dots.forEach(function(ele,index){
    ele.onclick=function(){
        for(let i=0;i<dots.length;i++){
            dots[i].classList.remove("selected");
        }
        dots[index].classList.add("selected");
        container.style.marginLeft=-960*index+"px";
    }
});
}
content.forEach(function(ele){
    slide(ele);
});
