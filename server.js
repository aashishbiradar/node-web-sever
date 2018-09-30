const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine','hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err) => {
        console.log(log);
    });
    next();
});
// app.use((req,res,next) => {
//     res.render('maintenance.hbs',{
//         title:"maintence",
//         pageTitle:"we will be back soon",
//         pageText:"Site is under maintenace, we'll update you soon",
//     });
// } );

app.get('/',(req,res)=>{
     res.render('home.hbs',{
         title: "Home",
         pageTitle: "Home Page",
         pageText: "Welcome to Node Home Page!"
     });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        title: "Home",
        pageTitle: "About Page"
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errMsg:"Unable to handle request"
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});