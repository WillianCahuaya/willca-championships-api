import { PartialType } from '@nestjs/mapped-types';

import { PersonDto } from '@access-control/dtos/index';

export class PersonPType extends PartialType(PersonDto) { }