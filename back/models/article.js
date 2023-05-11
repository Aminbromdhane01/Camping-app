const mongoose = require('mongoose') ; 
const Article = mongoose.model('Article',



    { 
        title: {
            type : String 
        } ,
        idAuth: {
            type : String 
        },
        description: {
            type : String 
        } ,
        date: {
            type : String 
        }, 
        content: {
            type : String 
        } ,
        image: {
            type : String 
        } ,
        tags: {
            type : Array 
        },
        
        idAuthor : {
            type : String},
        AuName: {
            type : String
        }    





    }
)

module.exports = Article