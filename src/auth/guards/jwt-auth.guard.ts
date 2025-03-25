 

import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublic) {
      return true;
    }

    let canContinue = await super.canActivate(context);

    if (!canContinue) {
      return false;
    }

    const request: Request = context.switchToHttp().getRequest();
    canContinue = this.canContinueAfterCheckApiKeyUserRestrictions(request);

    if (!canContinue) {
      return false;
    }

    canContinue = this.validateApiKeyUserPermissions(context);

    return canContinue;
  }

  private validateApiKeyUserPermissions(context: ExecutionContext): boolean {
    const hasAuthorizeDecorator = this.reflector.getAllAndOverride<string[]>('HasAuthorize', [
      context.getHandler(),
      context.getClass(),
    ]);

    return !hasAuthorizeDecorator;
  }

  private canContinueAfterCheckApiKeyUserRestrictions(request: Request) {
    const user: any = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
