import { Logger, Body, Controller, UseGuards, Delete, Get, HttpStatus, Param, Query, Post, Put, Res } from '@nestjs/common';

import { TeamDto } from '@championship/dtos/index';
import { TeamService } from '@championship/services/index';
import { TeamPType } from '@championship/ptypes/index';
import { AccessTokenGuard } from '@authentication/guards/index';
import { FindByEnum, HttpResponse, TimeResponse } from '@commons/index';

@Controller('team')
export class TeamController {
    private readonly logger = new Logger(TeamController.name);

    constructor (
        private readonly teamService: TeamService,
        private readonly httpResponse: HttpResponse,
        private readonly timeResponse: TimeResponse
    ) { }

    @UseGuards(AccessTokenGuard)
    @Post()
    async create(@Res() response, @Body() teamDto: TeamDto) {
        const method = this.timeResponse.loadMethod(this.logger, 'create');
        try {
            const result = await this.teamService.create(teamDto);
            return this.httpResponse.success(this.logger, method, response, HttpStatus.CREATED, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Put('/:id')
    async update(@Res() response, @Param('id') id: string, @Body() teamPType: TeamPType) {
        const method = this.timeResponse.loadMethod(this.logger, 'update');
        try {
            const result = await this.teamService.update(id, teamPType);
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
            const result = await this.teamService.getAll();
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
            const result = await this.teamService.get(id);
            return this.httpResponse.success(this.logger, method, response, HttpStatus.OK, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Post('/by')
    async getBy(@Res() response, @Query('description') description: string) {
        const method = this.timeResponse.loadMethod(this.logger, 'getBy');
        try {
            const field = FindByEnum.DESCRIPTION;
            const value = description;
            const result = await this.teamService.getBy(field, value);
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
            const result = await this.teamService.delete(id);
            return this.httpResponse.success(this.logger, method, response, HttpStatus.OK, result);
        } catch (error) {
            return this.httpResponse.errorCustomized(this.logger, method, response, error);
        } finally {
            this.timeResponse.totalTime(this.logger, method);
        }
    }
}