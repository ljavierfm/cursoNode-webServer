//Configuracion del server
const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

//Obtenemos todas las variables de entorno en pares->valor
const port=process.env.PORT || 3000;

var app=express();

app.set('view engine','hbs');

//Permite usar trozos de plantillas dentro de otras
hbs.registerPartials(__dirname+'/views/partials')

//Permite ejecutar codigo dentro de plantillas
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.use((req,res,next)=>{
    var now =new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        console.log('Error al añadir linea al log:',err);
    });
    next();
})

/* app.use((req,res,next)=>{
    res.render('maintenance.hbs',{
          randomText:'This web site is under maintenance'
        }
    );
}) */


app.get('/',(req,res)=>{
    console.log()
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    pageTitle:'Welcome to my home',
      randomText:'This its the first page server by node.js'
    }
)
});

app.get('/about',(req,res)=>{
    //render a template with your current view
    res.render('about.hbs',{
        pageTitle:'About page'
    });
})

app.get('/bad',(req,rest)=>{
    rest.send(
        {
            error:'Este es un mensaje de error'
        }
    )
})

//static takes the absolute path to the folder you want to serve up
//dirname store the path to node werb server
app.use(express.static(__dirname+'/public'));

//2º parametro un callback para cuando el server empiece a funcionar
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
