const db = require("./db").connection;
//const db=require("../config")

const getAll = async () => {
  return await db(`Select * FROM reference`);
};

const addReference = async (newReference) => {
  const name = newReference.name;
  const site = newReference.site;
  const sql = `INSERT INTO reference (name,site) 
VALUES ('${name}','${site}');`;
  return await db(sql);
};


const addReferenceWithImage = async (newReference) => {
  console.log("hello service")
  const name = newReference.name;
  const site = newReference.site;
  const image=newReference.image
  const sql = `INSERT INTO reference (name,site,image) 
VALUES ('${name}','${site}','${image}');`;
  return await db(sql);
};

module.exports = {
  getAll,addReference,addReferenceWithImage 
};
