import { Logger, ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import { ErrorModel, ExceptionModel } from '@commons/index';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(httpException: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const exception = httpException.getResponse() as ExceptionModel;

        let statusCode = httpException.getStatus();
        let message = undefined;
        let details = undefined;

        if (exception) {
            if (exception['response']) {
                statusCode = exception['response']['statusCode'];
            }
            if (exception['message']) {
                message = exception['message'];
            }
            if (exception['error']) {
                details = exception['error'];
            }
        }
        const errorModel = new ErrorModel();
        errorModel.statusCode = statusCode;
        errorModel.message = message;
        errorModel.details = details;
        errorModel.timestamp = new Date().toISOString();
        errorModel.path = request.url;
        this.logger.error(`Error exception: ${JSON.stringify({ errorModel, httpException })}`);

        response.status(statusCode).json(errorModel);
    }

}
