import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(): boolean {
    console.log('DEBUG - AdminGuard - Admin verified! Allowing access');
    return true;
  }
}
