import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt, createHash } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class authService {
  constructor(private userService: UsersService) {}
  async signUp(email: string, password: string) {
    const emailCheck = await this.userService.find(email);
    if (emailCheck.length) {
      throw new BadRequestException('Email Alredy In Use');
    }
    const salt = randomBytes(10).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.userService.create(email, result);

    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException(
        `User with this email ${email} was not found`,
      );
    }

    const [salt, storedHash] = user[0].password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    console.log(hash.toString('hex'), 'AND', storedHash);
    if (hash.toString('hex') === storedHash) {
      return user;
    } else {
      return new NotFoundException('Wrong Emasil or Password');
    }
  }
}
