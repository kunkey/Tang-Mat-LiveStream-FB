var delay_time = 7; // delay time loop (milisecond)
var delay_loop = delay_time * 1000; // delay time loop (milisecond)
let port = process.env.PORT || 3000;
let express = require('express');
var bodyParser = require('body-parser');
var app = express();
let request = require('request');


app.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());


// Trang chủ
app.get('/', function(req, res){
  res.sendFile('access_denied.html', {root : __dirname});
});


app.post('/exec', function(req, res){

if(req.body.id_video != '' && req.body.time != '' && req.body.cookie != '') {


   var id_video = req.body.id_video; // Nhận param id_video
   var time_ended = req.body.time; // Nhận param time (dừng tăng mắt)
   var data_cookie = req.body.cookie; // Nhận param cookie

    console.log('Dang tang mat cho ID: '+id_video+'  ket thuc trong '+time_ended+' phut!');

//Vòng lặp
var exec = setInterval(function () {
  for(let cookiex of data_cookie) {

  var x_cookie = cookiex.cookie;
  var x_fb_dtsg = cookiex.fb_dtsg;

  //console.log(cookie+'  :  '+fb_dtsg);
  exec_view(id_video, x_fb_dtsg, x_cookie);


  }
}, delay_loop);


// Dừng vòng lặp khi hết giờ
setTimeout(function () {
  clearInterval(exec);
    console.log('Da het thoi gian tang mat ID: '+id_video); 
}, time_convert(time_ended)); 

res.status(200).send('{"status":"true", "code":"200", "message":"success"}'); // trả lại status code cho header request



}else {
console.log('Yeu cau bi tu choi vi Thieu Field!');
res.status(400).send('{"status":"false", "code":"400", "message":"Missing Fields List"}'); // trả lại status code cho header request
res.send('');
}

}); // End app Post to exec




function exec_view(id_video, fb_dtsg, cookiee) {

request({
    url: 'https://www.facebook.com/video/cvc/?',
    method: "POST",
    body: 'd={"vi":"'+id_video+'","si":"f3998c0a206c92","so":"tahoe","ps":{"s":"playing","sa":52920,"pf":3199,"m":false}}&__user=&__a=1&__dyn=7AgNe-4amaAxd2u6aJGeFxqeCwDKEyGgS8zQC-C267Uqzob4q2i5UK3u2C3Cdxtu9xK5WwADKaxeUW2y4GDwUyKdwJKqq4e2p1rDAzUO5UlwQxS58iwBx61zwzUqwgaxW5u2i1iDBg5u68y6ECXx6WxS68nxKq9x1eE4amfxKUKaxi68iyGUcUaK5aGfKEgy9E5mcG8AhUix62HQ7EylxfwzAg-cGcBKm4U-4K2iazUlVE9F8yGxiErxCcAh9ogVFXAy8aElxeaCzU4ucKqdG5Ey6Ue8Wrz8mgK7o88O4EsyUy2e2m68cEqyEb8bGwCxe&__req=2j&__be=1&__pc=PHASED:ufi_home_page_pkg&dpr=1&__rev=1000806230&__s=:vxolgr:4gvtga&fb_dtsg='+fb_dtsg,
    headers: {
      "accept": "*/*",
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
      "cookie": cookiee
    },    
}, function(error, response, body) {
    //console.log(body);
});

}



function time_convert(time) {
  var time_end = time * 60000;
  return time_end;
}


app.listen(port); // mở port
console.log('Server Start Listen: ' + port);

