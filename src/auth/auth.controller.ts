import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { UserSigninDto } from './dtos/user-signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
   
    async signin(@Body() body: UserSigninDto) {
        const user = await this.authService.signin(body.email, body.password);
        return user;
    }
    
}
