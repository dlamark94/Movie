const express = require ('express');
const app = express(); 
const morgan = require('morgan');


//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
})


// Routes
app.use(require("./routes/index"));
app.use('/api/movies', require('./routes/movies'));

//Empezando el servidor 
app.listen(app.get('port'), () => { 
    console.log(`Server on port ${app.get('port')}`);
});