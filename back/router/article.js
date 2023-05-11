const express = require('express')

const router = express.Router()
const Article = require('../models/article')
const multer = require('multer') 
filename = '' ;


const Mystorage = multer.diskStorage(
{
    destination : './uploads' ,
    filename : (req , file , redirect) =>
    {
        let date = Date.now() ;
       let f1 = date + "." + file.mimetype.split("/")[1];
       redirect(null , f1)
       filename = f1

    } 
    

    
}

)
const upload = multer({storage : Mystorage})

router.post('/ajout' ,upload.any('image') , (req , res) =>
{

    let obj = req.body;
    console.log(obj);
 

  
 let article = new Article(obj)
 article.image = filename
 article.tags = obj.tags.split(',')
 
   
   article.date = new Date()
   console.log(article);
  
   article.save().then
   ((saved) => { 
   console.log(saved);
res.status(200).send(saved)})
.catch(
    err => res.send(err)     
)
  
   
   

   



})



router.get('/getall' , async (req , res) => 
{
  
    try {
       const  article = await Article.find();
        
        res.status(200).json(article)
    } catch (error) {
       res.status(404).send(err) 
    }
    


}
)
router.get('/getbyid/:id' , async (req ,res) =>
{
    let id =req.params.id
    console.log(id)
    
    try {
        let auth = await Article.find({idAuthor : id})
        if (!auth)
        {
            res.status(404).send("usernotfound")
        }
        else
        {
            res.status(200).json(auth)
        }
        
        
    } catch (error) {
        res.sendStatus(400).send({errorIs : error})
        
    }})
router.delete('/delete/:id' , async (req , res) =>
{
    let id = req.params.id ;
    try {
        const deleted = await Article.findByIdAndDelete({_id : id})
        res.send(deleted)
        
    } catch (error) {
        res.send(error)
        
    }
})

router.put('/update/:id' , upload.any('image') , async (req , res) =>


{
    let data = req.body ;
    let id = req.params.id ;
    data.date = new Date() ;
    data.image = filename
    data.tags = data.tags.split(',')
    console.log(data);

   
    

    try {
        const article = await  Article.findByIdAndUpdate({_id : id} , data)
        
        res.status(200).json(article)
        
    } catch (error) {
        res.status(400).send(error)
        
    }



})





module.exports = router