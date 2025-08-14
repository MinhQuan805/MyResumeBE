import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPasswordHelper } from '../../utils/password';
import { findAll } from '../../utils/findAll';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
const dayjs = require('dayjs');

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async index(keyword: string, status: string, page: number, sortKey: string, sortValue: string) {
        return findAll(this.userModel, {
            keyword,
            page,
            sortKey,
            sortValue,
            deleted: false,
            status: status
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<{ success: boolean, message: string }> {
        const updatedUser = await this.userModel.updateOne({ _id: id }, {...updateUserDto, $push: { updatedAt: new Date()}});
        if (!updatedUser) {
            return { success: false, message: "Cập nhật thất bại"};
        }
        return { success: true, message: "Cập nhật thành công" };
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({email});
    }
    async findById(userId: string) {
        return this.userModel.findById(userId);
    }
    
    async detail(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async deleteHard(id: string): Promise<{ success: boolean, message: string }> {
        const result = await this.userModel.deleteOne({ _id: id });
        if (result) {
            return { success: true, message: "Xóa thành công" };
        }
        return { success: false, message: "Xóa thất bại"};                            
    }

    async handleRegister(createUserDto: CreateAuthDto): Promise<User> {
        const { title, password, email } = createUserDto;
        const isExist = await this.userModel.findOne({ email });
        if (isExist) {
            throw new BadRequestException('Email đã tồn tại. Vui lòng sử dụng email khác');
        }
        const hashPassword = await hashPasswordHelper(password);
        const user = await this.userModel.create({
            title,
            password: hashPassword,
            email,
            status: "active",
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            code_id: uuidv4(),
            code_expired: dayjs().add(1, 'year').toDate(),
        });

        return user;
    }
    async updateRefreshToken(userId: string, refreshToken: string) {
        await this.userModel.updateOne(
          { _id: userId },
          { $set: { refreshToken, updatedAt: new Date() } }
        );
    }
}