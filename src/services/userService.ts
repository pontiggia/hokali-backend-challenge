import { User } from '@models/userModel';
import { CreateUserDTO } from '../types/user';

export class UserService {
  static async createUser({ name, email }: CreateUserDTO) {
    const existing = await User.findByEmail(email);
    if (existing) {
      throw new Error('Email already taken');
    }

    const user = await User.create({ name, email });
    return user;
  }

  static async getUserById(id: number) {
    return User.findById(id);
  }
}
