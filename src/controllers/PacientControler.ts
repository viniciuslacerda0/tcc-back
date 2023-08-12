import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppErrors';

export class PacientController {
  async getPacients(request: Request, response: Response): Promise<Response> {
    try {
      const { id, filter: { name }, cursor } = request.body;
      const pacients = await prismaClient.pacient.findMany({
        where: {
          doctorId: Number(id),
          name: {
            contains: name
          }
        },
        take: 10,
        cursor,
        orderBy: {
          name: 'desc'
        }
      });
      return response.status(StatusCodes.OK).send(pacients);
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }
}
