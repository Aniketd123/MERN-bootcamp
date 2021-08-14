
require("dotenv").config();

const express=require("express");


const connectTODB=require("./connection");

const usermodel=require("./user");   
const app=express();
app.use(express.json());




app.get("/", async (req,res)=>{


    try {
    const user=await usermodel.find();

    return res.json({user});
    }catch(error){
        return res.status(500).json({error:error.message})
    }
});



app.get("/user/type/:type",async(req,res)=>
{
const{type}=req.params;
const user=await usermodel.find({usertype:type});

if(!user)
{

    return res.json({message:"no such user found"});
}

return res.json({user});

}
);



app.get("/user/:_id",async(req,res)=>{

const {_id}=req.params;
const user= await usermodel.findById(_id)

if(!user)
{

    return res.json({message:"no such user found"});
}

return res.json({user});



});





app.post("/user/new",async(req,res)=>
{
 const {newUser}=req.body;

 await usermodel.create(newUser);

 return res.json({message:"user has been created"});


});

app.put("/user/update/:_id", async(req,res)=>
{
    const{_id}=req.params;
    const{userdata}=req.body;


    const updateUser= await usermodel.findByIdAndUpdate(_id,{$set:userdata},{new:true});

return res.json({user:updateUser});

});

app.delete("/user/delete/:_id",async(req,res)=>
{

    

    const {_id}=req.params;
    await usermodel.findByIdAndDelete(_id);
    return res.json({message:"user deletted"});
}
);

app.delete("/user/delete/type/:usertype",async(req,res)=>
{
    const {usertype}=req.params;
    await usermodel.findOneAndDelete({usertype});
    return res.json({message:"user deletted by type"});
}
);









app.listen(4000,() => connectTODB().then((data)=>  console.log("yes the server is now running alright")).catch((error)=>console.log(error))
);





