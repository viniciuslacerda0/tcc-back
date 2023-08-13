import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppErrors';
import { randomUUID } from 'crypto';

export class ReportController {
  async createReport(request: Request, response: Response): Promise<Response> {
    try {
      const { doctorId, pacientData, clinicalData, clinicalPhysicalExamData, avaliationData, treatmentData } = request.body;
      const pacient = await prismaClient.pacient.create({
        data: {
          doctorId: Number(doctorId),
          name: String(pacientData.name)
        }
      });

      const report = await prismaClient.report.create({
        data: {
          doctorId: Number(doctorId),
          pacientId: pacient.id,
          avaliationData: {
            create: avaliationData
          },
          clinicalData: {
            create: clinicalData
          },
          clinicalPhysicalExamData: {
            create: clinicalPhysicalExamData
          },
          pacientData: {
            create: pacientData
          },
          treatmentData: {
            create: treatmentData
          }
        }
      });

      const user = await prismaClient.user.create({
        data: {
          email: String(pacientData.name),
          name: String(pacientData.name),
          password: randomUUID(),
          type: 'PACIENT'
        }
      });

      return response.status(StatusCodes.OK).send({ report, user });
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }

  async getReport(request: Request, response: Response): Promise<Response> {
    try {
      const { pacientId } = request.query;
      const report = await prismaClient.report.findFirst({
        where: {
          pacientId: {
            equals: Number(pacientId)
          }
        },
        include: {
          pacientData: true,
          clinicalData: true,
          clinicalPhysicalExamData: true,
          avaliationData: true,
          treatmentData: true
        }
      });

      return response.status(StatusCodes.OK).send(report);
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }

  async updateReport(request: Request, response: Response): Promise<Response> {
    try {
      const { reportId, pacientData, clinicalData, clinicalPhysicalExamData, avaliationData, treatmentData } = request.body;
      const report = await prismaClient.report.update({
        where: {
          id: Number(reportId)
        },
        data: {
          avaliationData: {
            update: avaliationData
          },
          clinicalData: {
            update: clinicalData
          },
          clinicalPhysicalExamData: {
            update: clinicalPhysicalExamData
          },
          pacientData: {
            update: pacientData
          },
          treatmentData: {
            update: treatmentData
          }
        },
        include: {
          pacientData: true,
          clinicalData: true,
          clinicalPhysicalExamData: true,
          avaliationData: true,
          treatmentData: true
        }
      });

      return response.status(StatusCodes.OK).send(report);
    } catch (err) {
      if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
    }
  }
}
