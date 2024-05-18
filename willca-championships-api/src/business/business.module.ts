import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from '@authentication/services/index';
import { UserSchema } from '@authentication/schemas/index';
import { JwtStrategy } from '@authentication/strategy/index';

import { PersonController, TeamController } from '@championship/controllers/index';
import { PersonSchema, TeamSchema } from '@championship/schemas/index';
import { PersonService, TeamService } from '@championship/services/index';

import { HttpResponse, TimeResponse, CrudService, TablesEnum } from '@commons/index';
import { ConfigModule, ConfigService, ConfigKey } from '@config/index';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TablesEnum.USER, schema: UserSchema },
            { name: TablesEnum.PERSON, schema: PersonSchema },
            { name: TablesEnum.TEAM, schema: TeamSchema },
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
        PersonController,
        TeamController,
    ],
    providers: [
        HttpResponse,
        TimeResponse,
        UserService,
        PersonService,
        TeamService,
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
