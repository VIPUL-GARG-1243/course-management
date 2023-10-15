const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");
const authMiddleware = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/register", async (req, res) => {
    try {
        const studentExists = await Student.findOne({email: req.body.email});
        if(studentExists) {
            return res.send({
                success: false,
                message: "Student already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.spass = req.body.password;
        req.body.password = hashedPassword;

        const student = new Student(req.body);
        await student.save();

        return res.send({
            success: true,
            message: "Student registered Successfully"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

route.post("/register-course", async (req, res) => {
    try {
        const courseExists = await Course.findOne({cname: req.body.cname});
        if(courseExists) {
            return res.send({
                success: false,
                message: "Course already exists"
            })
        }

        const course = new Course(req.body);
        await course.save();

        return res.send({
            success: true,
            message: "Course registered Successfully"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

route.post("/login", async (req, res) => {
    try {
        const student = await Student.findOne({email: req.body.email});
        if(!student) {
            return res.send({
                success: false,
                message: "Student not found!"
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, student.password);

        if(!validPassword) {
            return res.send({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({userId: student._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
        
        return res.send({
            success: true,
            message: "User logged successfully",
            data: token
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

route.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await Student.findOne({_id: req.body.userId });
        user.password = undefined;
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})

route.get("/get-course", async (req, res) => {
    try {
        const course = await Course.find();
        return res.send({
            success: true,
            message: "Courses fetched successfully",
            data: course
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
})






module.exports = route;