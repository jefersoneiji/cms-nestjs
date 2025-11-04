import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async signup(signupDto: SignUpDto) {

    }
}
