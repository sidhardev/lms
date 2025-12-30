import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
          return {
            status: false,
            message: 'User already exists',
          };
        }
else {
        const user = this.userRepository.create(createUserDto);
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
        user.password = salt + '.' + hash.toString('hex');  

        this.userRepository.save(user);
        return {
        status: true,
        message: 'Signin successful',
        user: {
          id: user.id,
          email: user.email,
        },
      };
        }
    }
    
    async find(email: string) {
        return this.userRepository.find({ where: { email } });
      }

    }
    