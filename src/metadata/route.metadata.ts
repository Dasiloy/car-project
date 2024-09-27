import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IS_PUBLIC';
export const Public = (isPublic = true) => SetMetadata(IS_PUBLIC, isPublic);
