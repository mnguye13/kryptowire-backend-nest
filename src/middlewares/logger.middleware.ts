import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export function logger(req, res, next) {
  console.log(`Request...`);
  next();
}
