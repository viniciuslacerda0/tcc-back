import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppErrors';

export class PacientController {
  async getPacients(request: Request, response: Response): Promise<Response> {
    try {
      const { doctorId } = request.query;
      const filter = request.query?.filter as { name: string };

      const pagination = request.query?.cursor
        ? {
            cursor: { id: Number(request.query.cursor) },
            skip: 1
          }
        : undefined;

      const pacients = await prismaClient.pacient.findMany({
        ...pagination,
        where: {
          doctorId: {
            equals: Number(doctorId)
          },
          AND: {
            name: {
              equals: filter?.name
            }
          }
        },
        take: request.query?.backwards === 'true' ? -5 : 5,
        orderBy: {
          id: 'asc'
        }
      });
      const totalCount = await prismaClient.pacient.count({
        where: {
          doctorId: {
            equals: Number(doctorId)
          },
          AND: {
            name: {
              contains: filter?.name
            }
          }
        }
      });
      return response.status(StatusCodes.OK).send({ pacients, totalCount });
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }
}
