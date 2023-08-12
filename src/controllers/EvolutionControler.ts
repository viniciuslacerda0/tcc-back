import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../database/prismaClient';
import { IEvolution } from '../helpers/dto';
import { AppError } from '../errors/AppErrors';

export class EvolutionController {
  async createEvolution(request: Request, response: Response) {
    try {
      const evolution = await prismaClient.evolution.create({
        data: { ...(request.body as IEvolution) }
      });

      return response.status(StatusCodes.OK).send(evolution);
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }

  async getPacientEvolution(request: Request, response: Response): Promise<Response> {
    try {
      const { id, filter: { from, until, textFilter }, cursor } = request.body;
      const evolutions = await prismaClient.evolution.findMany({
        where: {
          pacientId: Number(id),
          created_at: {
            in: [from, until]
          },
          text: {
            contains: textFilter
          }
        },
        take: 10,
        cursor,
        orderBy: {
          created_at: 'desc'
        }
      });
      return response.status(StatusCodes.OK).send(evolutions);
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }
}
