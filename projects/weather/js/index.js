$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
    getFullWeather(remote_ip_info.city)
});
var data;
$.ajax({
    url:"http://api.jisuapi.com/weather/city?appkey=efb1634f99c82405&city",
    dataType:"jsonp",
    success:function(r){
        data=r.result;
        var province=$.grep(data,function(val,index){
           return  val.parentid==0;
        });
        $.each($(".province ul li"),function(index,ele){
            $(ele).html(province[index].city);
            $(ele).attr("provinceid",province[index].cityid)
        });
    }
});
$(".province ul li").each(function(index,ele){
   $(ele).click(function(){
       $(".city ul").html("");
       $(".province ul li").removeClass("selected");
       $(ele).addClass("selected");
       var city=$.grep(data,function(val,index){
           return val.parentid==$(ele).attr("provinceid");
       });
       $.each(city,function(index,ele){
           $("<li>").html(city[index].city).appendTo($(".city ul"));
       });
       $(".city ul li").each(function(index,ele){
           $(ele).click(function(){
               getFullWeather($(ele).html());
           })
       });
   })
});
function getFullWeather(city){
    $(".header h1").html(city);
    $.ajax({
        url: "http://api.jisuapi.com/weather/query?appkey=efb1634f99c82405&city="+city,
        dataType: "jsonp",
        success: function (r) {
            var weatherObj = r.result;
            $(".cur-time").html(weatherObj.date);
            $(".cur-temp").html(weatherObj.temp + "°");
            $(".cur-weather").html(weatherObj.weather);
            $(".current .temp").html(weatherObj.temphigh + "°/" + weatherObj.templow + "°");
            $(".hourly ul li").each(function (index, ele) {
                $(ele).find("time").html(weatherObj.hourly[index].time);
                $(ele).find("img").attr("src", "img/" + weatherObj.hourly[index].img + ".png");
                $(ele).find("p").html(weatherObj.hourly[index].temp + "°");
            });
            $(".daily ul li").each(function (index, ele) {
                $(ele).find(".date").html(weatherObj.daily[index + 1].date + "&nbsp;" + weatherObj.daily[index + 1].week);
                $(ele).find("img").attr("src", "img/" + weatherObj.daily[index + 1].day.img + ".png");
                $(ele).find(".temp").html(weatherObj.daily[index + 1].day.temphigh + "°/" + weatherObj.daily[index + 1].night.templow + "°")
            });
        }
    });
}
$(".choose-city").click(function(){
    $(".city-cover").show(500);
});
$(".return").click(function(){
    $(".city-cover").hide(500);
});

