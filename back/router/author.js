const express = require('express')

const router = express.Router()
const Author = require('../models/author')
const multer = require('multer') 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
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




router.post ('/register' , upload.any('image'), async (req , res) =>
{
     
     let data = req.body 
     data.image = 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png' ; 
     const salt = bcrypt.genSaltSync(10);
     const hashedpassword = bcrypt.hashSync(data.password, salt);
     
     data.password = hashedpassword ;  
     const author = new Author(data);
     try {
          const saved = await author.save();
          filename ='' ;
          
          res.status(200).json(saved);
        
        
     } catch (error) {
        res.status(400).send(error);
        
     }


})


router.post('/login' , async  (req, res)=>
{
    let data = req.body
    
    let user = await Author.findOne({email : data.email})
   
    if (!user)
    {
        res.status(404).send("email invalid")
    }
    else
    {
       const compare = await bcrypt.compare(data.password, user.password)
      
       if (!compare)
       {
        res.status(404).send("pass invalid")
       }
       else
       {
        let payload = {
            id : user._id ,
            email : user.email,
            fullname: user.name + ' ' + user.lastname

        }
        console.log(payload);
        let token = jwt.sign(payload,process.env.SECRET_KEY)
        res.status(200).send({mytoken : token});
       }
    }

})

router.get('/getbyid/:id' , async (req ,res) =>
{
    let id =req.params.id
    console.log(id)
    
    try {
        let auth = await Author.findById({_id : id})
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


 router.put('/updatepass/:id'  , async (req , res)=>
 {
    let newpass = req.body ;
    console.log(newpass);
    let id = req.params.id ;
    const salt = bcrypt.genSaltSync(10);
     const hashedpassword = bcrypt.hashSync(newpass.password, salt);
     newpass.password = hashedpassword;
     console.log(newpass);
     try {
        let updatepass = await Author.findByIdAndUpdate({_id : id},newpass)
        console.log(updatepass);
        res.status(200).json(updatepass)
        
     } catch (error) {
        res.status(400).send({err : error})
        
     }
    

 })   









module.exports = router
