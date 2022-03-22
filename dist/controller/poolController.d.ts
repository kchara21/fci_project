import { Request, Response } from 'express';
export declare class PoolController {
    static getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static newPool: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static editPool: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static deletePool: (req: Request, res: Response) => Promise<void>;
}
