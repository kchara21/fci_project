"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = res.locals.jwtPayload;
        const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
        let user;
        try {
            user = yield userRepository.findOneOrFail(userId);
        }
        catch (e) {
            return res.status(401).json({ message: 'Not Autorized' });
        }
        //Check
        const { rol } = user;
        if (roles.includes(rol)) {
            next();
        }
        else {
            res.status(401).json({ message: 'Not Autorized for Readers' });
        }
    });
};
exports.checkRole = checkRole;
