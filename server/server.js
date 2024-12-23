import express from "express";
import pg from "pg";
import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
import _ from "lodash";

import User from "./model/mongoUser.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL= process.env.MONGO_URL

const db= new pg.Client(
    {
      user:"postgres",
      host:"localhost",
      database:"prepare",
      password:"amplify4411",
      port:5432
    }
);

app.listen(PORT, () => console.log(`Connected to port ${PORT}`));

app.get('/mongo-post', async (req, res) => {
    await db.connect()
    await mongoose.connect(MONGO_URL)
    const allUsers = await User.find();

    //Code with Lodash
    _.forEach(allUsers, (user) =>{
        user.name=_.upperFirst(user.name)
        user.contact=_.upperFirst(user.contact)
        console.log(user.name);
        console.log(user.contact);
    })
   {/*  Code without Lodash
        for(let i=0;i<allUsers.length;i++){
        allUsers[i].name=allUsers[i].name[0].toUpperCase()+allUsers[i].name.slice(1);
        allUsers[i].contact=allUsers[i].contact[0].toUpperCase()+allUsers[i].contact.slice(1);
        }
        */} 
        await mongoose.disconnect();
    
    //Code with Lodash
    _.forEach(allUsers,async(user)=>{
        await db.query("INSERT INTO postgresuser (name,age,contact) VALUES ($1,$2,$3)",[user.name,user.age,user.contact])
    })
    await db.end();
    res.json({allUsers})
});
