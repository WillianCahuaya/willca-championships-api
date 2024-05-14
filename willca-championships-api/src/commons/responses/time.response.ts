import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class TimeResponse {

    loadMethod(log: Logger, methodName: string) {
        log.log(`[${methodName}] initializing`);
        return { initTime: Date.now(), name: methodName };
    }

    totalTime(log: Logger, method: any) {
        const totalTimeMs = Date.now() - method.initTime;
        log.log(`[${method.name}] finished: ${JSON.stringify({ totalTimeMs })}`);
    }

}