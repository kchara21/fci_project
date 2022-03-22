import { Request, Response } from 'express';
export declare class TemplateController {
    static getAll: (req: Request, res: Response) => Promise<void>;
    static getById: (req: Request, res: Response) => Promise<void>;
    static getTemplateByPool: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getByParam: (req: Request, res: Response) => Promise<void>;
    static newParam: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static editParam: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static deleteParam: (req: Request, res: Response) => Promise<void>;
}
