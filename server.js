const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
   extended: true
}))
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.use('/public', express.static('public'))

var db;

MongoClient.connect('mongodb+srv://iim020:dlwleja0089@cluster0.msfv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (에러, client) {
   if (에러) return console.log(에러)
   db = client.db('CH_chamo');
   app.listen(8080, function () {
      console.log('listening on 8080')
   })
})
app.get('/', function (요청, 응답) {
   db.collection('admin').find().toArray(function (에러, 결과) {
      console.log(결과);
      응답.render('index.ejs',{  admins : 결과})
   })
});

app.get('/admin_list', function (요청, 응답) {
   db.collection('admin').find().toArray(function (에러, 결과) {
      console.log(결과);
      응답.render('admin_list.ejs',{  admins : 결과})
   })
});
app.get('/admin_edit/:id',function(요청,응답){
   db.collection('admin').findOne({_id: parseInt(요청.params.id)},function(에러,결과) {
      응답.render('admin_edit.ejs', {admin : 결과})

   })
})

app.put('/admin_edit', function(요청, 응답){
   db.collection('admin').updateOne({ _id : parseInt(요청.body.id)},{ $set : {url: 요청.body.url, 제목: 요청.body.title, 내용: 요청.body.text}}, function(에러, 결과){
      console.log('수정완료') 
      응답.redirect('/admin_list')
    })

});