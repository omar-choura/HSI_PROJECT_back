const siteService=require("../services/site.service")
const express=require("express")
const multer = require("multer");
const router=express.Router()
const db=require("../services/db").connection
const path=require("path")
const fs=require("fs")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req ",req.file)
    //return cb(null, "./public/images");
    return cb(null,"c:/Users/USER/Desktop/frontImages")
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });



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

router.delete("/deleteReference/:name",async(req,res)=>{
  console.log("ee",req.params.name)
  try{
    const result=await siteService.deleteReference(req.params.name)
    res.status(200).json({
      data:result
  })
  }catch{
    console.log(err)
  }
})



router.post("/addNewReferenceWithImage",upload.single("image"),async(req,res)=>{
  try{
  
    const image=req.file ? req.file.filename :null 
     console.log("image is ",image)
 
 
    req.body.image=image;
  
    console.log("req.body ",req.body)
    if (!req.file) {
      res.status(400).send("no file uploaded");
    }
    let newReference = await siteService.addReferenceWithImage(req.body)
    console.log("new Reference is ",newReference)
    res.status(201).json({
      message:"success to add with upload",
      data:newReference
    })
  }catch(err){
    console.log("Erreur upload is ",err)
    res.status(500).json({
      message:"failure to add with image",
      data:null
    })
  }
})

router.put("/updateReference",upload.single("image"),async(req,res)=>{
  //const result=await siteService.updateReference(req.body)
 try{
    
    var valueSearch=req.body.firstName
   
   const query=`Select * from reference where name='${valueSearch}';`
   const lastSite=await db(query)
   console.log("last site is  ",lastSite)
   const lastImage=lastSite[0].image
   console.log("last image is  ",lastImage)
   if(!req.file){
    console.log("not req.file")
    req.body.image=lastImage
   }else{

    //js delete the image from folder using lastImage
    req.body.image=req.file.filename
    const filePath = path.join("C:/Users/User/Desktop/frontImages"+lastImage);
    
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting the file: ${err.message}`);
        } else {
          console.log('File successfully deleted');
        }
      });
    } else {
      console.log('File not found');
    }
   }
   console.log("new req.body is   ",req.body)
   const result=await siteService.updateReference(req.body)
   
    res.status(200).json({
      message:"Success of update",
      data:result
    })
   
  }catch(err){
    console.log("Error update api is ",err)
    res.status(500).json({
      message:"Erreur update",
    })
  } 
})



module.exports=router
