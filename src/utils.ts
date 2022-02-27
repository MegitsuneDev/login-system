import { Request, Response, NextFunction } from "express";

export function redirectAuth(req: Request, res: Response, next: NextFunction) {
    if(req.session.username) return next();
    res.redirect("/");
};

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    if(!req.session.username) return next();
    res.redirect("/dashboard/home");
};