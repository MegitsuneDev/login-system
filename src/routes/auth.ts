import { checkAuth, redirectAuth } from "../utils";
import User from "../models/User";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.get('/register', checkAuth, (req, res) => res.render('auth/register', { created: null, error: [] }));

router.post('/register', async (req, res, next) => {

    const findUser = await User.findOne({ username: req.body.username });

    if(findUser) return res.render('auth/register', { created: null, error: [ "username" ] });

    if(req.body.password !== req.body.confirmPassword) return res.render('auth/register', { created: null, error: [ "notSimilar" ] });

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        username: req.body.username,
        password: hashPassword
    });

    await newUser.save();

    res.render('auth/register', { created: req.body.username, error: [] });
});

router.get('/login', checkAuth, (req, res) => res.render('auth/login', { error: [] }));

router.post('/login', async (req, res) => {

    const findUser = await User.findOne({ username: req.body.username });

    if(!findUser) return res.render('auth/login', { error: [ "username" ] });

    bcrypt.compare(req.body.password, findUser.password, (err, same) => {

        if(err) return res.render('error', { error : err });

        if(findUser && !same) return res.render('auth/login', { error: [ "password" ] });

        req.session.username = req.body.username;
        res.redirect('/dashboard/home');
    });
});

router.get("/logout", redirectAuth, (req, res) => {

    req.session.destroy((err: any) => err && console.log(err));
    res.redirect('/');
});

export default router;