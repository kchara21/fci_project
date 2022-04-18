import { Request, Response } from "express";
export declare class ValueController {
    static getByDate: (req: Request, res: Response) => Promise<void>;
    static reportByPool: (req: Request, res: Response) => Promise<void>;
}
export default ValueController;
