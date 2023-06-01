const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

 const collection = mongoose.model('userauthentication', userAuthSchema);
module.exports = collection;





// const userAuth = new mongoose.Schema({
//     email:{
//         email: String
        
//     },

//     password:{
//         password: String
        
//     }
// })

// const collection = new mongoose.model("userauthentication" , userAuth) 
// module.exports=collection;