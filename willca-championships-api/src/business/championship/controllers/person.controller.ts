import { Logger, Body, Controller, UseGuards, Delete, Get, HttpStatus, Param, Query, Post, Put, Res } from '@nestjs/common';

import { PersonDto } from '@championship/dtos/index';
import { PersonService } from '@championship/services/index';
import { PersonPType } from '@championship/ptypes/index';
import { AccessTokenGuard } from '@authentication/guards/index';
import { FindByEnum, HttpResponse, TimeResponse } from '@commons/index';

@Controller('person')
export class PersonController {
    private readonly logger = new Logger(PersonController.name);

    constructor (
        private readonly personService: PersonService,
        private readonly httpResponse: HttpResponse,
        private readonly timeResponse: TimeResponse
    ) { }

    @UseGuards(AccessTokenGuard)
    @Post()
    async create(@Res() response, @Body() personDto: PersonDto) {
        const method = this.timeResponse.loadMethod(this.logger, 'create');
        try {
            const result = await this.personService.create(personDto);
            return this.httpResponse.success(this.logger, method, response, HttpStatus.CREATED, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Put('/:id')
    async update(@Res() response, @Param('id') id: string, @Body() personPType: PersonPType) {
        const method = this.timeResponse.loadMethod(this.logger, 'update');
        try {
            const result = await this.personService.update(id, personPType);
            return this.httpResponse.success(this.logger, method, response, HttpStatus.OK, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Get()
    async getAll(@Res() response) {
        const method = this.timeResponse.loadMethod(this.logger, 'getAll');
        try {
            const result = await this.personService.getAll();
            return this.httpResponse.success(this.logger, method, response, HttpStatus.OK, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Get('/:id')
    async get(@Res() response, @Param('id') id: string) {
        const method = this.timeResponse.loadMethod(this.logger, 'get');
        try {
            const result = await this.personService.get(id);
            return this.httpResponse.success(this.logger, method, response, HttpStatus.OK, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Post('/by')
    async getBy(@Res() response, @Query('dni') dni: string, @Query('email') email: string) {
        const method = this.timeResponse.loadMethod(this.logger, 'getBy');
        try {
            const field = dni ? FindByEnum.DNI : FindByEnum.EMAIL;
            const value = dni ?? email;
            const result = await this.personService.getBy(field, value);
            return this.httpResponse.success(this.logger, method, response, HttpStatus.OK, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id: string) {
        const method = this.timeResponse.loadMethod(this.logger, 'delete');
        try {
            const result = await this.personService.delete(id);
            return this.httpResponse.success(this.logger, method, response, HttpStatus.OK, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }
}