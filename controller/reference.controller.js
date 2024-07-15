const siteService=require("../services/site.service")
const express=require("express")

const router=express.Router()

router.get("/getAllReferences",async(req,res)=>{
  const result=await siteService.getAll()
  res.json({
    data:result
  })
})


module.exports=router
