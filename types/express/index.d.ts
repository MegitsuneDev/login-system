namespace Express {
    interface Request {
        session: Session & Partial<SessionData> & {
            username: string;
        };
    };
};