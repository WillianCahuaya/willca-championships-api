import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from '@authentication/services/index';
import { UserSchema } from '@authentication/schemas/index';
import { JwtStrategy } from '@authentication/strategy/index';

import { PersonController } from '@access-control/controllers/index';
import { PersonSchema } from '@access-control/schemas/index';
import { PersonService } from '@access-control/services/index';

import { HttpResponse, TimeResponse, CrudService } from '@commons/index';
import { ConfigModule, ConfigService, ConfigKey } from '@config/index';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Person', schema: PersonSchema }
        ]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get(ConfigKey.JWT_ACCESS_SECRET),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [
        PersonController
    ],
    providers: [
        HttpResponse,
        TimeResponse,
        UserService,
        PersonService,
        JwtStrategy,
        {
            useFactory: (logger: Logger, model: any) => { return new CrudService(logger, model); },
            provide: CrudService
        },
    ],
    exports: [
        HttpResponse,
        TimeResponse,
        UserService,
    ],
})
export class BusinessModule { }
