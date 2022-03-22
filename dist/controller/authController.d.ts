import { Request, Response } from 'express';
declare class AuthController {
    static login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static changePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
export default AuthController;
