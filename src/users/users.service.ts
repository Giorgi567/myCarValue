import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async find(email: string) {
    return await this.repo.find({ where: { email: email } });
  }

  async findAllUsers() {
    return this.repo.find();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    return await this.repo.findOne({ where: { id: +id } });
  }

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }
  async update(id: number, Body: Partial<UserEntity>) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not Found');
    }
    Object.assign(user, Body);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return this.repo.remove(user);
  }
}
