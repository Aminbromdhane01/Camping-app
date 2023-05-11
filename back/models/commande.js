const mongoose = require('mongoose') ; 
const Commande = mongoose.model('Commande',



    { 
        title : {
            type : String 
        } ,
        product : {
            type : String 
        },
        client : {
            type : String
            
        } ,
        price : {
            type : Number
        }
      




    }
)

module.exports = Commande