
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
    userId?: string;
    username?: string;
    ownsUsername?: boolean;
    file?: Express.Multer.File;
  }
  

export interface IResponse extends Response {
  //
  status: any;
  }
  
export interface INextFunction extends NextFunction {
  // 
  }
  

