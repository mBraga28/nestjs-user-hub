
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Conditional } from '../enums/conditional.enum';

/**
 * Indicates whether the controller or method execution should undergo permissions validation.
 * @param permissions list of permissions required to execute the controller or method.
 * @param requireAllPermissions indicates whether all the listed permissions are required or if at least one is sufficient.
 */
export const Authorize = (permissions: string[], requireAllPermissions = Conditional.OR) => {
  return applyDecorators(
    SetMetadata('HasAuthorize', true),
    SetMetadata('Authorize.permissions', permissions),
    SetMetadata('Authorize.requireAllPermissions', requireAllPermissions)
  );
};
