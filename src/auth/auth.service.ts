import { UserDocument } from '@app/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async login(user: UserDocument, response: Response) {
        const payload: JwtPayload = {
            userId: user._id.toHexString(),
            role: user.role
        };

        const expires = new Date();
        expires.setSeconds(
            expires.getSeconds() + 20000
        );

        const token = this.jwtService.sign(payload);
        response.cookie('Authentication', token, { httpOnly: true, expires });
    }
}
