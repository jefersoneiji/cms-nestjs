import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import { RoleDocument } from '@app/common/schemas/role.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetUserDto } from './dto/get-user.dto';
import { EditDto } from './dto/edit.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(RoleDocument.name) private roleModel: Model<RoleDocument>,
        private readonly userRepository: UserRepository
    ) { }

    async signup(signupDto: SignUpDto) {
        await this.check_user_exists(signupDto);

        return this.userRepository.create({
            ...signupDto,
            password: await bcrypt.hash(signupDto.password, 10)
        });
    }

    async edit(_id: string, editDto: EditDto) {
        return this.userRepository.findOneAndUpdate({ _id }, {
            ...editDto,
            ...editDto.password ? { password: await bcrypt.hash(editDto.password, 10) } : {}
        });
    }

    private async check_user_exists(signupDto: SignUpDto) {
        try {
            await this.userRepository.findOne({ email: signupDto.email });
        } catch (e) {
            return;
        }
        throw new UnprocessableEntityException('E-mail already taken.');
    }

    async verifyUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email });
        const password_is_valid = await bcrypt.compare(password, user.password);

        if (!password_is_valid) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        return user;
    }

    async check_permission(role: string, required_permission: string): Promise<boolean> {
        const is_allowed = await this.roleModel.aggregate(
            [
                { $match: { name: role } },
                {
                    $lookup: {
                        from: 'permissionsdocuments',
                        localField: 'permissions',
                        foreignField: "_id",
                        as: 'matching_permissions'
                    }
                },
                {
                    $match: {
                        "matching_permissions.name": required_permission
                    }
                },
                {
                    $project: {
                        matching_permissions: 0,
                    }
                }
            ],
            { lean: true }
        );

        return is_allowed.length > 0;
    }

    async getUser(getUserDto: GetUserDto) {
        return this.userRepository.findOne(getUserDto);
    }
}
