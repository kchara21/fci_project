"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
const checkRole = (roles) => {
    return async (req, res, next) => {
        const { userId } = res.locals.jwtPayload;
        const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
        let user;
        try {
            user = await userRepository.findOneOrFail(userId);
        }
        catch (e) {
            return res.status(401).json({ message: 'Not Autorized' });
        }
        const { rol } = user;
        if (roles.includes(rol)) {
            next();
        }
        else {
            res.status(401).json({ message: 'Not Autorized for Readers' });
        }
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=role.js.map