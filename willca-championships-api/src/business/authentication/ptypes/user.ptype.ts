import { PartialType } from '@nestjs/mapped-types';

import { UserDto } from '@authentication/dtos/index';

export class UserPType extends PartialType(UserDto) { }