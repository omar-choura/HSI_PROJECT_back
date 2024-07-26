const db = require("./db").connection;

// Get all references
const getAll = async () => {
  return await db(`SELECT * FROM reference`);
};

// Add new reference
const addReference = async (newReference) => {
  const { name, site } = newReference;
  const sql = `INSERT INTO reference (name, site) VALUES ('${name}', '${site}');`;
  return await db(sql);
};

// Add new reference with image
const addReferenceWithImage = async (newReference) => {
  const { name, site, image } = newReference;
  const sql = `INSERT INTO reference (name, site, image) VALUES ('${name}', '${site}', '${image}');`;
  return await db(sql);
};

// Update reference
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

// Delete reference
const deleteReference = async (name) => {
  const sql = `DELETE FROM reference WHERE name = '${name}';`;
  return await db(sql);
};


// Get reference by name
const getReferenceByName = async (name) => {
  const sql = `SELECT * FROM reference WHERE name = '${name}';`;
  console.log(`Executing query: ${sql}`);
  const result = await db(sql);
  console.log(`Query result: ${JSON.stringify(result)}`);
  return result;
};



module.exports = {
  getAll,
  addReference,
  addReferenceWithImage,
  updateReference,
  deleteReference,
  getReferenceByName
};
