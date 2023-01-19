const userModels = require("../models/user.models");
const { generateToken } = require("../utils/token");
let bcrypt = require("bcryptjs");
 


//  response  
const createUsers = async (req, res ) => {  
    try { 
      const newUser = req.body   
      const ExistingUser = await userModels.findOne({
      email: req.body.email
      }); 
 
    if (ExistingUser) {
      return res.json({ message:`${req.body.email} Users(email) already exists` });
    }
 
     const user = await userModels.create(newUser)
     console.log(user);
     
     return res.status(200).json({
      user,
      status: "success",
      message:'User register success'});
   } catch (error) {
     return res.status(500).json({message: error})
   }
}


 

 const getUsers = async (req, res) => { 
 
      try {

        const { email, password } = req.body;
    
        
        if(!email ||!password) {
          return res.status(401).json({ 
            status: "error", 
            message: "Email and password are required" }); 
        }
       
        const user = await userModels.findOne({email}) 
        if(!user) {
          return res.status(401).json({
            status: "error", 
            message: "User not found" 
          }); 
        }
 
   
        const isMatchPassword = await bcrypt.compareSync(password, user.password);
        if(!isMatchPassword) {
          return res.status(401).json({
            status: "error", 
            message: "Password not match"
          })
        }

        if(user.status != "active") {
          return res.status(401).json({
            status: "error", 
            message: "User is not active"
          })
        }

        const token = generateToken(user)

        // IGNORE PASSWORD 
        const {password: pwd, ...others} = user.toObject();

        return res.status(200).send({
          status:"success",
          user: others,
          token,
          message:"User Login Successful"
      }) 
      } catch (error) {
        return res.status(401).json({massages: error.massages})
      }
  }




  const getAllUsers = async (req, res) => { 
    console.log('user', req.user)
    try { 
     const user = await  userModels.find({})  

      return res.status(201).send(user) 
     } catch (error) {
      return res.status(401).json({massages: error.massages})
    }
}
 

//   const updateUsers= async (req , res) => {
    
//   try {
//        await userModel.updateOne({
//          email: req.params.email
//         },
//           req.body
//       );
//       res.status(201).json({massages:'Card Updated Successfully'});
//   } catch (error) {
//       return res
//           .status(500).json({massages: error.massages}) 
//   }
// };


 
 
  module.exports={  createUsers, getUsers, getAllUsers }