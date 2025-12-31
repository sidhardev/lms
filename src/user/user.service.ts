import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { MailService } from 'src/mail/mail.service';

const scrypt = promisify(_scrypt);


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly mailService: MailService){}
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
        message: 'SignUp successful, Verify your email to continue',
        user: {
          id: user.id,
          email: user.email,
        },
      };
        }
    }
    async sendOtp(email: string) {
                const user = await this.mailService.sendOtp(email);
                return {
                    status: true,
                    message: 'OTP sent successfully',
                };
    }
    async verifyOtp(email: string, otp: number) {
        const user = await this.mailService.verifyOtp(email, otp);
        return user;
    }
    
    async find(email: string) {
        return this.userRepository.find({ where: { email } });
      }

    }
    