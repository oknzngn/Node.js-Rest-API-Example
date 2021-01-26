// require ile express kütüphanesini import ediyoruz.
// express() ile de kütüphaneyi projemize dahil ettik.
const express = require("express");
const app = express();
const arabalarRoute = require('./routes/arabalar');
const port = process.env.PORT || 5000;
// Environment env Projenin çalışacağı andaki sunucunun portu, ||'dan sonraki local'de çalıştırdığımız port içindir.
const bodyParser = require("body-parser");

//middleware
// bu sayede middleware gidilmek istenen url den önce isteği karşılar. Loglaması yada başka bir şey yapması gerekiyorsa yaptırabiliriz.
// next() ile de gitmesi gereken yere işlemlerden sonra gidebilmesini sağlarız.
// POST, PUT gibi http isteklerinde kullanıcıdan bilgileri genelde bodyden alırız. 
//body-parser bu body isteklerini json halde almamızı sağlayan yardımcı bir kütüphanedir.
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    console.log(`${req.path} urline ${req.method} istek atılıyor...`);
    next();
});

//app.use ile /arabalar isteği geldiği zaman arabalarRoute'un bu isteğe yanıt vermesini söyledik.
app.use('/arabalar', arabalarRoute);
 //sadece string dönmek istersek.
app.get("/api/status", (req, res, next) => {
    res.send("active");
});
// eğer URL'den parametre almak istersek
// name adında bir parametrenin gelebileceğini tanımladık. ? ise bu parametrenin boş geçebileceğini bildiriyor.
app.get("/api/test/:name?", (req, res, next) => {
    res.send({
        message: `Welcome ${req.params.name || "" }`
    });
});
//post isteği yapmak istersek.
app.post("/api/test", (req, res, next) => {
    res.send({
      message: `Welcome ${req.body.name || ""}`
    });
  });
// Sayfa bulunamadı uyarısı
app.get('*',(req,res) => {
    res.status(400).send("Not Found !");
}); 
  
app.listen(port, () => {
    console.log(`localhost:${port} -> üzerinden apiye ulaşabilirisiniz...`);
});









