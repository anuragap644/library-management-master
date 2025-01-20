const express = require('express');
const router = express.Router();

router.get('/ownerlogin',(req,res)=>{
    res.render('owner-login');
})

module.exports = router;