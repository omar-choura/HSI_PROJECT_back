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

const deleteReference = async (name) => {
  const sql = `DELETE FROM reference
  WHERE name = '${name}';`;
  return await db(sql);
};

const addReferenceWithImage = async (newReference) => {
  const name = newReference.name;
  const site = newReference.site;
  const image = newReference.image;
  const sql = `INSERT INTO reference (name,site,image) 
VALUES ('${name}','${site}','${image}');`;
  return await db(sql);
};

const updateReference = async (newReference) => {
  const firstName=newReference.firstName
  const name = newReference.name;
  const site = newReference.site;
  const image = newReference.image;
 
  const sql = `UPDATE reference
SET name='${name}', site= '${site}' ,image='${image}'
WHERE name='${firstName}';`;
return await db(sql);
};

module.exports = {
  getAll,
  addReference,
  addReferenceWithImage,
  deleteReference,
  updateReference
};
