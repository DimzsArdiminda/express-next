// controller/userController.js
import { where } from "sequelize";
import UserModel from "../model/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { isBlacklisted } from '../middleware/authMiddleware.js';

// logout
// controller/userController.js
export const logoutUser = (req, res) => {
    // Tidak ada proses server-side untuk JWT, hanya menginformasikan klien
    res.status(200).json({ msg: "Anda telah logout" });
};



// LOGIN USER
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password salah" });
        }
        const token = jwt.sign({ id: user.id }, 'd1f5d8e1c5a0a6f4e3b2d9c8a7b6e5f4d3c2b1e6d5c4b3a2d1f4e3b2a1c6d5e4', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.log("login error: ",error.message);
        res.status(500).json({ error: error.message });
    }
}


// REGISTER USER
export const registerUser = async (req, res) => {
    const { name, email, password, gender, alamat } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            name,
            email,
            password: hashedPassword,
            gender,
            alamat,
        });
        res.status(201).json({ msg: "Pengguna telah terdaftar" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}


// show data user
export const getUser = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

// get user by ID
export const getUserByID = async(req, res) => {
    try {
        const respons = await UserModel.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(respons);
    } catch (error) {
        console.log(error.message);
    }
}

// CREATE USER
export const CreateUser = async (req, res) => {
    try {
        await UserModel.create(req.body);
        res.status(201).json({ msg: "Pengguna telah dibuat" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

// update
export const updateUser = async(req, res) => {
    try {
        await UserModel.update(req.body, {
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg : "user di update"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}

// delete 
export const deleteUser = async(req, res) => {
    try {
        await UserModel.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg : "user di delete"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}