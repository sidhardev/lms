import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import {scrypt as _scrypt, randomBytes} from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email);
        if (!user) {
          return {
            status: false,
            message: 'User not found',
          };
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
          return {
            status: false,
            message: 'Invalid password',
          };
        }
        const payload = {sub: user.id, 
  email: user.email, otpVerified: true };
        const token = await this.jwtService.signAsync(payload);
        return {
          status: true,
          message: 'Signin successful',
          token,
        };



    }
    
    resetPassword() {
        
    }
}
