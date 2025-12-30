import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

@Post('/signup')
async createUser(@Body() createUserDto: CreateUserDto) {
  const user = await this.userService.create(createUserDto);
   return user;   
}

}
