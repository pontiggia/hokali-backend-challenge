import { Request, Response } from 'express';
import { UserService } from '@services/userService';

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await UserService.createUser({ name, email });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
