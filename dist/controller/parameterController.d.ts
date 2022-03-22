import { Request, Response } from 'express';
export declare class ParamController {
    static censusParameter: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getAll: (req: Request, res: Response) => Promise<void>;
    static getByPool: (req: Request, res: Response) => Promise<void>;
    static newParam: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static editParam: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static deleteParam: (req: Request, res: Response) => Promise<void>;
}
