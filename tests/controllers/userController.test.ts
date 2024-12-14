import { UserController } from '../../src/controllers/userController';
import { UserService } from '../../src/services/userService';
import { Request, Response } from 'express';

jest.mock('@services/userService');

describe('UserController', () => {
  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      UserService.createUser = jest.fn().mockResolvedValue(mockUser);

      const req = {
        body: { name: 'John Doe', email: 'john@example.com' },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await UserController.createUser(req, res);

      expect(UserService.createUser).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });
});
