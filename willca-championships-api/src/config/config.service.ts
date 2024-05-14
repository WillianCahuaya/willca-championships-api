import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
    private readonly logger = new Logger(ConfigService.name);
    private readonly envConfig: Record<string, string>;

    constructor (filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
        this.logger.debug(`ENVIRONMENT | ${JSON.stringify({ package: process.env.npm_package_name, filePath, envConfig: this.envConfig })}`);
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    getServer(keyOne: string, keyTwo: string): string {
        return `${this.envConfig[keyOne]}${this.envConfig[keyTwo]}`;
    }
}
