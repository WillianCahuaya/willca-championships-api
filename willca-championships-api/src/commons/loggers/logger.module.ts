import { Module } from '@nestjs/common';
import { MyLogger } from '@commons/index';

@Module({
    providers: [MyLogger],
    exports: [MyLogger],
})
export class LoggerModule { }
