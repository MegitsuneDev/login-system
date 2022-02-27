import { checkAuth, redirectAuth } from "../utils";
import express from "express";
const router = express.Router();

router.get('/home', redirectAuth, (req, res) => res.render('dashboard/home', { user: req.session.username }));

export default router;