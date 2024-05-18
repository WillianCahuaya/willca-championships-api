import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { TeamDto } from '@championship/dtos/index';
import { TeamPType } from '@championship/ptypes/index';
import { TeamDocument } from '@championship/schemas/index';
import { FindByEnum, CrudService, TablesEnum } from '@commons/index';

@Injectable()
export class TeamService {
    private readonly logger = new Logger(TeamService.name);
    private readonly crudService: CrudService;

    constructor (
        @InjectModel(TablesEnum.TEAM)
        private teamModel: Model<TeamDocument>
    ) {
        this.crudService = new CrudService(this.logger, this.teamModel);
    }

    async create(dto: TeamDto): Promise<TeamDocument> {
        await this.crudService.verifyDoesNotExist(FindByEnum.DESCRIPTION, dto.description);
        return await this.crudService.create(dto);
    }

    async update(id: string, partialType: TeamPType): Promise<TeamDocument> {
        return await this.crudService.update(id, partialType);
    }

    async getAll(): Promise<TeamDocument[]> {
        return await this.crudService.getAll();
    }

    async get(id: string): Promise<TeamDocument> {
        return await this.crudService.get(id);
    }

    async delete(id: string): Promise<TeamDocument> {
        return await this.crudService.delete(id);
    }

    async getBy(field: string, value: string): Promise<TeamDocument> {
        return await this.crudService.getBy(field, value);
    }

}