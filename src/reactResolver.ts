import express from "express";

const reactResolver = express.Router();

reactResolver.get("/test",function(req,res){
    res.send("API is working properly");
});
export default reactResolver;