const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
       host: "db4free.net",
      //if mysql is installed on my computer and I work locally host:localhost
      user: "aymanyaiche",
      password: "12345678",
      database: "hsibackproject",
      connectTimeout: 60000
    },
  };
  module.exports = config;