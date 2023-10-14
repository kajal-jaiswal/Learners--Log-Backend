import 'dotenv/config';
import  express  from "express";
import mongoose from "mongoose";
import cors from "cors";


const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DATABASE_URL+"/crudDB")
.then(()=>console.log('connected to mongo'))
.catch((err)=> console.error(`could not connect ${err}`));

const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    course:String,
    age: Number
})


const UserModel =mongoose.model("users",UsersSchema);
app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users=> res.json(users))
    .catch(err => res.json(err))
})

app.get("/getUser/:id",(req,res)=>{
    const id =req.params.id;
    UserModel.findById({_id:id})
    .then(users=> res.json(users))
    .catch(err => res.json(err))

})

app.put("/updateUser/:id", (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id},{
       name: req.body.name,
       email:req.body.email, 
       phone:req.body.phone, 
       course:req.body.course, 
       age:req.body.age})
    .then(users=> res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({ _id : id })
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})

 app.post("/createUser",(req,res)=>{
    UserModel.create(req.body)
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
    
}
)

app.listen(process.env.PORT || 3001,()=>{
    console.log("Server is running on port 3001");
})

