import { comparePassword, hashPassword } from "../helpers/authHelpers";
import userModel from "../models/user.model";
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // validation
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        if (!phone) {
            return res.status(400).json({ message: "Phone is required" });
        }
        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }
        // check if user exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: 'User already registered. Please log in.'
            });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        // save user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            address: address
        });
         newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while registration",
            error: error.message
        });
    }
};

// login 
export const loginController = async (req, res) => {  
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email is not registered'
            });
        }

        const match = await comparePassword(password, user.password); 
        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Password'
            });
        }
        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '4d'
        });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while login"
        });
    }
}


