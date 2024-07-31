const db = require("./db").connection;

// Get all references
const getAll = async () => {
  return await db(`SELECT * FROM reference`);
};

// Add new reference
const addReference = async (newReference) => {
  const { name, site, description } = newReference;
  const sql = `INSERT INTO reference (name, site, description) VALUES ('${name}', '${site}', '${description}');`;
  return await db(sql);
};

// Add new reference with image
const addReferenceWithImage = async (newReference) => {
  const { name, site, image, description } = newReference;
  const sql = `INSERT INTO reference (name, site, image, description) VALUES ('${name}', '${site}', '${image}', '${description}');`;
  return await db(sql);
};

// Update reference
const updateReference = async (newReference) => {
  const { firstName, name, site, image, description } = newReference;
  const sql = `UPDATE reference
               SET name='${name}', site='${site}', image='${image}', description='${description}'
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
