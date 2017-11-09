let btn=document.querySelectorAll(".nav a");
let contents=document.querySelectorAll(".content");
btn.forEach(function(ele,index){
    ele.onclick=function(){
        for(let i=0;i<btn.length;i++){
            btn[i].classList.remove("active");
            contents[i].classList.remove("active");
        }
        ele.classList.add("active");
        contents[index].classList.add("active");
    }
});