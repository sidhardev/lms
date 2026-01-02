import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('DEBUG - AdminGuard.canActivate()');
    console.log('  - req.user:', user);
    console.log('  - req.user?.role:', user?.role);

    if (!user) {
      console.log('DEBUG - AdminGuard - User not found!');
      throw new ForbiddenException('User not found in request');
    }

    if (user.role !== 'ADMIN') {
      console.log(
        `DEBUG - AdminGuard - Role mismatch! Expected ADMIN, got ${user.role}`,
      );
      throw new ForbiddenException(
        `Access denied. You are ${user.role}, only ADMIN can access this`,
      );
    }

    console.log('DEBUG - AdminGuard - Admin verified! Allowing access');
    return true;
  }
}
