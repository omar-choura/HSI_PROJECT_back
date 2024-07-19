const siteService=require("../services/site.service")
const express=require("express")
const multer = require("multer");
const router=express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req ",req)
    //return cb(null, "./public/images");
    return cb(null,"c:/Users/Admin/Desktop/frontImages")
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

router.put("/updateReference",async (req,res)=>{
  try {
    const updatedReference =await siteService.updateReference(req.body);
    res.status(200).json({
      message:'Reference updated !!'
    })
  } catch (err) {
    console.log('Error updating:',err);
    res.status(500).json({
      message:'failed to update',
      data:null,
    });
  }
});

router.post("/addNewReferenceWithImage",upload.single("image"),async(req,res)=>{
  try{
  
    const image=req.file ? req.file.filename :null 
     console.log("image is ",image)
    //const {name,site}=req.body
    req.body.image="c:/Users/Admin/Desktop/frontImages/"+image
    console.log("req.body ",req.body)
    if (!req.file) {
      res.status(400).send("no file uploaded");
    }
    let newReference = siteService.addReferenceWithImage(req.body)
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



module.exports=router
