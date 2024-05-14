import { Logger, Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { UserDto } from '@authentication/dtos/index';
import { User, UserDocument } from '@authentication/schemas/index';
import { UserPType } from '@authentication/ptypes/index';
import { FindByEnum, CrudService } from '@commons/index';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    private readonly crudService: CrudService;

    constructor (
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) {
        this.crudService = new CrudService(this.logger, this.userModel);
    }

    async validateIfExistTokens(username: string): Promise<UserDocument> {
        this.logger.debug(`[validateIfExistTokens] validate if exist tokens: ${JSON.stringify({ username })}`);
        const userResult = await this.userModel.findOne({ username }).exec();
        if (!userResult || !userResult.accessToken || !userResult.refreshToken) {
            throw new ForbiddenException(`Access denied - Do not exist any tokens: ${JSON.stringify({ username })}`);
        }
        this.logger.debug(`[validateIfExistTokens] exist tokens`);
        return userResult;
    }

}