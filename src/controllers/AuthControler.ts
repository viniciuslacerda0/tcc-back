import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppErrors';

export class AuthController {
  async authenticate(request: Request, response: Response) {
    try {
      const { username, password } = request.body;
      const secret = process.env.SECRET ?? 'default';
      const user = await prismaClient.user.findFirst({
        where: {
          email: username
        }
      });

      if (!user) {
        return response.sendStatus(StatusCodes.NOT_FOUND);
      }

      if (password !== user?.password) {
        return response.sendStatus(StatusCodes.NOT_FOUND);
      }

      const token = jwt.sign({ id: user?.id }, secret, { expiresIn: '1d' });

      // @ts-expect-error
      delete user.password;
      return response.json({
        user,
        token
      });
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }
}
