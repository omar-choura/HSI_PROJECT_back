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

const deleteReference=async(name)=>{
  const sql =`DELETE FROM reference
  WHERE name = '${name}';`
  return await db(sql);
}

const addReferenceWithImage = async (newReference) => {
  console.log("hello service")
  const name = newReference.name;
  const site = newReference.site;
  const image=newReference.image
  const sql = `INSERT INTO reference (name,site,image) 
VALUES ('${name}','${site}','${image}');`;
  return await db(sql);
};

const updateReference = async (updatedReference) => {
  // Destructure the properties from the updatedReference object
  const { name, newName, newSite } = updatedReference;
  
  // Build the SQL query dynamically based on which fields are provided
  let sql = `UPDATE reference SET `;
  let updates = [];
  
  // Add fields to be updated to the SQL query if they exist
  if (newName) updates.push(`name = '${newName}'`);
  if (newSite) updates.push(`site = '${newSite}'`);
  
  // Check if there are any updates to be made
  if (updates.length === 0) {
    throw new Error("No fields to update");
  }
  
  // Combine the updates into the SQL query
  sql += updates.join(", ");
  sql += ` WHERE name = '${name}';`;
  
  return await db(sql);
};



module.exports = {
  getAll,addReference,addReferenceWithImage,deleteReference ,updateReference
};
