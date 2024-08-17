
import { Sequelize } from "sequelize";

const db = new Sequelize('fullstack', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

db.authenticate().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Error: ", err);
});

export default db;
