import { Request, Response, NextFunction } from 'express';

import { Usuario } from '../entity/User';
import { getRepository } from 'typeorm';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals.jwtPayload;
    const userRepository = getRepository(Usuario);
    let user: Usuario;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      return res.status(401).json({ message: 'Not Autorized' });
    }

    //Check
    const { rol } = user;
    if (roles.includes(rol)) {
      next();
    } else {
      res.status(401).json({ message: 'Not Autorized for Readers' });
    }
  };
};
