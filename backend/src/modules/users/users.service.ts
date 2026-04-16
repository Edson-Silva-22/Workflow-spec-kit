import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-passwordHash').exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-passwordHash').exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user || user.status !== 'ACTIVE') {
      return null;
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    return isValid ? user : null;
  }

  async create(data: Partial<User>): Promise<User> {
    const passwordHash = await bcrypt.hash(data.passwordHash || 'default', 10);
    const user = new this.userModel({
      ...data,
      passwordHash,
    });
    return user.save();
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .select('-passwordHash')
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, { status: 'INACTIVE' }, { new: true })
      .select('-passwordHash')
      .exec();
  }
}