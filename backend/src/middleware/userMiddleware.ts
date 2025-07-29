import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthenticatedRequest } from "../types/express";
const JWT_USER_PASSWORD:any = process.env.JWT_USER_PASSWORD


export function userMiddleware(req:AuthenticatedRequest,res:Response,next:NextFunction){


    const auth = req.headers.authorization;
    if (!auth ||!auth.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized: Token missing or malformed"
        });
    }

    const token = auth.split(" ")[1];
     try {
        const decode = jwt.verify(token,JWT_USER_PASSWORD)
        req.userId = (decode as JwtPayload).userId;
        
        next();
    } catch (err) {
        return res.status(403).json({
            
        });
    }

}
