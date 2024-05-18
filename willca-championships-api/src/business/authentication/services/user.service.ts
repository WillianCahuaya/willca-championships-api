import { Logger, Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { User, UserDocument } from '@authentication/schemas/index';
import { TablesEnum } from '@app/commons';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor (
        @InjectModel(TablesEnum.USER)
        private userModel: Model<UserDocument>
    ) { }

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