// model/UserModel.js
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define("User", {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    alamat : {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
});

export default User;

(async () => {
    await db.sync();
    // await db.sync({ alter: true });
})();
