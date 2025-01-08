import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const password = createUserDto.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    createUserDto.password = hashedPassword;
    const userData = this.userRepository.create(createUserDto);
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(user_id: number): Promise<User> {
    return this.userRepository.findOne({ where: { user_id } });
  }

  async update(user_id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException(`The user id:${user.user_id} is not found`);
    }
    const password = updateUserDto.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updateUserDto.password = hashedPassword;
    const updateUserData = await this.userRepository.create({
      ...user,
      ...updateUserDto,
    });
    return this.userRepository.save(updateUserData);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });
  }
}
