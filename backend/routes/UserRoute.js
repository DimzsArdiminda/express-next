// routes/UserRoute.js
import express from 'express';
import { getBarang } from '../controller/barangController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
        getUser,
        getUserByID,
        CreateUser,
        updateUser,
        deleteUser,
        registerUser,
        loginUser,
        logoutUser,
        getUserByEmail,
} from "../controller/userController.js";

const router = express.Router();

router.get('/users',verifyToken, getUser); // get user
router.get('/users/:id', verifyToken, getUserByID); // get user by id
router.post("/users-buat", verifyToken, CreateUser); // add user
router.patch('/users-update/:id', verifyToken, updateUser); // update user
router.get('/users-show/:email', verifyToken, getUserByEmail); // update user
router.delete('/users-delete/:id', verifyToken, deleteUser); // delete user


router.post("/register", registerUser); // register user
router.post("/login", loginUser); // login user

router.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({ msg: 'Ini adalah route yang dilindungi', user: req.user });
});
router.get('/barang', getBarang);

// routes/UserRoute.js
router.post('/logout', logoutUser);


export default router;
