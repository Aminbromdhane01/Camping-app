const express = require('express')

const router = express.Router()
const Commande = require('../models/commande')



router.post('/add'  , (req , res) =>
{

    let obj = req.body;
    console.log(obj);
 

  
 let article = new Commande(obj)

  
   article.save().then
   ((saved) => { 
   console.log(saved);
res.status(200).send(saved)})
.catch(
    err => res.send(err)     
)
  
   
   

   



})
module.exports = router