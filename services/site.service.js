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

module.exports = {
  getAll,addReference
};
