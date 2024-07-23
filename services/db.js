const mysql = require('mysql2/promise');
const config = require('../config');

async function sql() {
  const connection = await mysql.createConnection(config.db);
  //onst [results, ] = await connection.execute(sql, params);
  console.log("You are now connected to db ")
  return connection}

  const connection=async(sql)=>{
    
     const connection = await mysql.createConnection(config.db);
     console.log("sql ",sql)
     const [results, ] = await connection.execute(sql);
      console.log("results ",results) 
        return results;
      
  }

module.exports = {
  sql,connection
}