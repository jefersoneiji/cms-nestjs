import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async signup(signupDto: SignUpDto) {
        await this.check_user_exists(signupDto);

        return this.userRepository.create({
            ...signupDto,
            password: await bcrypt.hash(signupDto.password, 10)
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
}
