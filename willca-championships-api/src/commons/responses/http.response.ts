import { Logger, HttpStatus, Res, Injectable } from '@nestjs/common';
import { maskJSONFieldsDefault } from '@commons/index';

@Injectable()
export class HttpResponse {

    success(log: Logger, method: any, @Res() response, status: HttpStatus, result: any) {
        result.message = result.message ?? `Processed successfully`;

        log.debug(`[${method.name}] success response: ${JSON.stringify({ status, result: maskJSONFieldsDefault(result) })}`);
        log.log(`[${method.name}] success response: ${JSON.stringify({ status })}`);
        return response.status(status).json(result);
    }

    errorCustomized(log: Logger, method: any, @Res() response, error: any) {
        log.error(`[${method.name}] error response: ${JSON.stringify({ response, errorMessage: error.message })}`, error);
        return response.status(error.status).json(error.response);
    }

}