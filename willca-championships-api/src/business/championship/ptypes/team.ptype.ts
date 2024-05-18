import { PartialType } from '@nestjs/mapped-types';

import { TeamDto } from '@championship/dtos/index';

export class TeamPType extends PartialType(TeamDto) { }