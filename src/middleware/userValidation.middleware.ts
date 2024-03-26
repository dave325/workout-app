import { BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function IsValidUser(req: Request, res: Response, next: NextFunction) {
  if (req.params.userId) {
    if (!isNaN(parseInt(req.params.userId))) {
      res.locals.userId = parseInt(req.params.userId);
    } else {
      throw new BadRequestException('userId is not a number')
    }
  }

  if (req.params.workoutId) {
    if(!isNaN(parseInt(req.params.workoutId))) {
      res.locals.workoutId = parseInt(req.params.workoutId);
    } else {
      throw new BadRequestException('workoutId is not a number')
    }
  }

  next();
};