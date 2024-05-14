import { Logger, Injectable, NotFoundException, ConflictException } from '@nestjs/common';

@Injectable()
export class CrudService {

    constructor (
        private readonly logger: Logger,
        private readonly documentModel: any) {
    }

    async create(dto: any,): Promise<any> {
        this.logger.log(`[create] create a new document`);
        const objectModel = await new this.documentModel(dto);
        objectModel.creationUser = 'admin';
        this.logger.debug(`[create] document model to save [${JSON.stringify(objectModel)}]`);
        const response = objectModel.save();
        this.logger.log(`[create] success`);
        return response;
    }

    async update(id: string, partialType: any): Promise<any> {
        this.logger.log(`[update] update by id [${id}]`);
        const response = await this.documentModel.findByIdAndUpdate(id, partialType, { new: true });
        if (!response) {
            throw new NotFoundException(`document by id [${id}] not found`);
        }
        this.logger.log(`[update] success`);
        return response;
    }

    async getAll(): Promise<any[]> {
        this.logger.log(`[getAll] get all`);
        const response = await this.documentModel.find();
        this.logger.log(`[getAll] success, length: ${response.length}`);
        return response;
    }

    async getAllPopulate(populate: string): Promise<any[]> {
        this.logger.log(`[getAll] get all populate`);
        const response = await this.documentModel.find().populate(populate);
        this.logger.log(`[getAll] success, length: ${response.length}`);
        return response;
    }

    async get(id: string): Promise<any> {
        this.logger.log(`[get] get by id [${JSON.stringify(id)}]`);
        const response = await this.documentModel.findById(id).exec();
        if (!response) {
            throw new NotFoundException(`Document id [${id}] not found`);
        }
        this.logger.log(`[get] success`);
        return response;
    }

    async delete(id: string): Promise<any> {
        this.logger.log(`[delete] delete by id [${id}]`);
        const response = await this.documentModel.findByIdAndDelete(id);
        if (!response) {
            throw new NotFoundException(`Document id [${id}] not found`);
        }
        this.logger.log(`[delete] success`);
        return response;
    }

    async getBy(field: string, value: string): Promise<any> {
        this.logger.log(`[getBy] find by field [${field}] with value [${value}]`);
        let response = await this.documentModel.findOne({ [field]: value }).exec();
        if (!response) {
            throw new NotFoundException(`Document by field [${field}] with value [${value}] not found`);
        }
        this.logger.log(`[delete] success`);
        return response;
    }

    async verifyDoesNotExist(field: string, value: string) {
        this.logger.log(`[verifyDoesNotExist] verify does not exist by field [${field}] with value [${value}]`);
        let response = await this.documentModel.exists({ [field]: value }).exec();
        if (response) {
            throw new ConflictException(`Document by field [${field}] with value [${value}] already exist`);
        }
        this.logger.log(`[verifyDoesNotExist] success`);
    }
}