import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Barang = db.define("Barang", {
    NamaBarang: {
        type: DataTypes.STRING,
    },
    JumlahBarang: {
        type: DataTypes.STRING,
    },
    HargaBarang: {
        type: DataTypes.INTEGER,
    }
}, {
    freezeTableName: true,
});

export default Barang;

(async () => {
    await db.sync();
})();