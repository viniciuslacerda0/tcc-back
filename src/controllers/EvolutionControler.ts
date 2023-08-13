import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppErrors';

export class EvolutionController {
  async createEvolution(request: Request, response: Response) {
    try {
      const evolution = await prismaClient.evolution.create({
        data: {
          name: request.body.name,
          text: request.body.text,
          created_at: new Date(request.body.created_at),
          pacient: {
            connect: {
              id: Number(request.body.pacientId)
            }
          },
          pictures: request.body.pictures
        }
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
      const filter = request.query?.filter as { from: string, until: string, textFilter: string };
      let filterDate = {};
      if (filter?.from && filter?.until) {
        filterDate = {
          created_at: {
            in: [filter?.from, filter?.until]
          }
        };
      } else if (filter?.from && !filter?.until) {
        filterDate = {
          created_at: {
            gte: filter?.from
          }
        };
      } else if (filter?.until && !filter?.from) {
        filterDate = {
          created_at: {
            lte: filter?.until
          }
        };
      }
      let filterText = {};
      if (filter?.textFilter) {
        filterText = {
          text: {
            contains: (filter?.textFilter)
          }
        };
      }
      const evolutions = await prismaClient.evolution.findMany({
        where: {
          pacientId: {
            equals: Number(request.query?.pacientId)
          },
          AND: {
            ...filterDate,
            ...filterText
          }
        },
        take: 10,
        cursor: request.query?.cursor ? { id: Number(request.query?.cursor) } : undefined,
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
