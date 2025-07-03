import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { logging } from 'src/log/logging';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = logging();

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;
    const memberAgent = request.get('member-agent') || '';
    const ip = request.ip;

    this.logger.log(`Request: ${method} ${originalUrl} - ${memberAgent} ${ip}`);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `Response close: ${method} ${originalUrl} ${statusCode} ${contentLength} - ${memberAgent} ${ip}`,
      );
    });

    next();
  }
}
