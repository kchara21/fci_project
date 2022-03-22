import { Request, Response } from "express";
export declare class UserController {
    static getAll: (req: Request, res: Response) => Promise<void>;
    static getById: (req: Request, res: Response) => Promise<void>;
    static newUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static editUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static deleteUser: (req: Request, res: Response) => Promise<void>;
}
export default UserController;
