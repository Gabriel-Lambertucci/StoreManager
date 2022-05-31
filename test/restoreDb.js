const Importer = require("mysql2-import");
require("dotenv").config();

const restoreDb = async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

    const importer = new Importer({
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        host: MYSQL_HOST,
      });

      await importer.import("./StoreManager.sql");

      await importer.disconnect();
};

module.exports = restoreDb;

if (!module.parent) {
    restoreDb();
}