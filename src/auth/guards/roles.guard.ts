import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleIdMapping } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // Assume the user has the roleId property (UUID)
    if (user && user.roleId) {
      // Find the role name based on the roleId
      const roleName = Object.entries(RoleIdMapping).find(([key, value]) => value === user.roleId)?.[0];
      if (roleName && roles.includes(roleName.toLowerCase())) {
        return true;
      }
    }
    throw new ForbiddenException('Access denied. Insufficient permissions.');
  }
}