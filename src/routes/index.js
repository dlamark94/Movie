const {Router} = require('express');
const router = Router();


router.get('/test', (req,res)=> {
    const data = {
        "name": "Aramis", 
        "website": "aramis.com"
    }
    res.json(data);
});

module.exports = router; 
