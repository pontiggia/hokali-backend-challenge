import { prisma } from './prismaClient';

export class User {
  static async create(data: { name: string; email: string }) {
    const user = await prisma.user.create({ data });
    return user;
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }
}
