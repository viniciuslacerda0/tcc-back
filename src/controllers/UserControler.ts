import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../database/prismaClient';
import { IUser } from '../helpers/dto';
import { AppError } from '../errors/AppErrors';

export class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const user = await prismaClient.user.create({
        data: { ...(request.body as IUser) }
      });
      const secret = process.env.SECRET ?? 'default';
      const token = jwt.sign({ id: user?.id }, secret, { expiresIn: '1d' });
      return response.status(StatusCodes.OK).send({ user: { name: user.name, type: user.type }, token });
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }

  async getUser(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(id)
        }
      });
      return response.status(StatusCodes.OK).send(user);
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }
}
