import { Request, Response, NextFunction } from 'express';
export declare const checkRole: (roles: Array<string>) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
