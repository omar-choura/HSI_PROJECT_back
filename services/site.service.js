const db=require("./db").connection
//const db=require("../config")

const getAll=async()=>{
    return await db(`Select * FROM reference`)
    
}


module.exports={
    getAll
}