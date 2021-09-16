const {Router} = require('express'); 
const router = Router(); 
const _ =  require('underscore');
const mysql = require('mysql');


// MySQL Setting 
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'movies_db',
    user: 'root',
    password: ''
})


conexion.connect(function(err) {
    if (err) throw err;
    console.log("La base de dato esta conectada!");
});


function query(query, res) {
    conexion.query(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log(typeof result);
        
        res.send(result);
    });
}


router.get('/', (req, res) => {

    const director = req.query.director; 
    const title = req.query.title; 
    const distribution = req.query.distribution;

    console.log(director); 
    console.log(title);
    console.log(distribution);


    if(title ){
        query("select * from movie where title = '" + title + "';", res);
    }

    if(distribution){
        query("select * from movie where distribution = '" + distribution + "';", res);
    }

    if(director){
        query("select * from movie where director = '" + director + "';", res);
    }
    
    if (!title && !distribution && !director){
        query("select * from movie;", res);
    }
   
});


router.post('/', (req,res) => {
const {title, director, distribution, rating} = req.body;
if (title && director && distribution && rating){
    
     query("insert into movie (title, director, distribution, rating) VALUES ('" + title + "','" + director + "','" + distribution + "','"+ rating + "');", res);
    
}   else { 
    res.status(500).json({error: 'There was an error'});
}
});

router.put('/:id', (req,res) => {
    const {id} = req.params; 
    const {title, director, distribution, rating} = req.body;
    if(title && director && distribution && rating ) {
        
        query("UPDATE movie SET title='', director='"+director+"',  distribution='"+distribution+"', rating='"+ rating +"'where id = '"+id+"';", res);
        
    
    } else {
        res.status(500).json({error: 'There was an error.'}); 
    }

});
    router.delete('/:id', (req,res) => {
        
        const {id} = req.params; 
        query("DELETE from movie where id='"+id+"';", res);
        
    });

    module.exports = router; 







    
