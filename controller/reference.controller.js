const siteService=require("../services/site.service")
const express=require("express")

const router=express.Router()

router.get("/getAllReferences",async(req,res)=>{
  const result=await siteService.getAll()
  res.json({
    data:result
  })
})

router.post("/addNewReference",async(req,res)=>{
    try{
        const  result=await siteService.addReference(req.body)
        res.status(200).json({
            data:result
        })
    }catch(err){
        console.log("err",err)
    }
   
})


module.exports=router
