import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@config/index';
import { BusinessModule } from '@app/business/business.module';

import { ConfigKey, ConfigService } from '@config/index';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRoot('mongodb://wcahuaya:wcahuaya@ac-hjgjoqq-shard-00-00.ffiqsdq.mongodb.net:27017,ac-hjgjoqq-shard-00-01.ffiqsdq.mongodb.net:27017,ac-hjgjoqq-shard-00-02.ffiqsdq.mongodb.net:27017/access_control?ssl=true&replicaSet=atlas-6wcdao-shard-0&authSource=admin&retryWrites=true&w=majority'),
        BusinessModule,
    ]
})
export class AppModule { }
