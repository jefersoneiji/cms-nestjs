import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser, UserDocument } from '@app/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: "Success." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @UseGuards(LocalAuthGuard)
    async login(
        @CurrentUser() user: UserDocument,
        @Res({ passthrough: true }) response: Response
    ) {
        await this.authService.login(user, response);
        response.send({ response: user });
    }
}
