const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
       host: "localhost",
      //if mysql is installed on my computer and I work locally host:localhost
      user: "root",
      password: "",
      database: "hsibackproject",
      connectTimeout: 60000
    },
  };
  module.exports = config;