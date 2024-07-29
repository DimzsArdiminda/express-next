
import { Sequelize } from "sequelize";

const db = new Sequelize('learn_crud', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

export default db;
