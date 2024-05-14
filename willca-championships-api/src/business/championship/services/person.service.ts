import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { PersonDto } from '@championship/dtos/index';
import { PersonPType } from '@championship/ptypes/index';
import { Person, PersonDocument } from '@championship/schemas/index';
import { FindByEnum, CrudService } from '@commons/index';

@Injectable()
export class PersonService {
    private readonly logger = new Logger(PersonService.name);
    private readonly crudService: CrudService;

    constructor (
        @InjectModel(Person.name)
        private personModel: Model<PersonDocument>
    ) {
        this.crudService = new CrudService(this.logger, this.personModel);
    }

    async create(dto: PersonDto): Promise<PersonDocument> {
        await this.crudService.verifyDoesNotExist(FindByEnum.DNI, dto.dni);
        return await this.crudService.create(dto);
    }

    async update(id: string, partialType: PersonPType): Promise<PersonDocument> {
        return await this.crudService.update(id, partialType);
    }

    async getAll(): Promise<PersonDocument[]> {
        return await this.crudService.getAll();
    }

    async get(id: string): Promise<PersonDocument> {
        return await this.crudService.get(id);
    }

    async delete(id: string): Promise<PersonDocument> {
        return await this.crudService.delete(id);
    }

    async getBy(field: string, value: string): Promise<PersonDocument> {
        return await this.crudService.getBy(field, value);
    }

}