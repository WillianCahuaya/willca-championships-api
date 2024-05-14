import { PartialType } from '@nestjs/mapped-types';

import { PersonDto } from '@championship/dtos/index';

export class PersonPType extends PartialType(PersonDto) { }