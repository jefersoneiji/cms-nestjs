import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { EditDto } from './dto/edit.dto';
import { CurrentUser, Permissions, RequiredPermissions, RequiredPermissionsGuard, UserDocument } from '@app/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('signup')
    @ApiOperation({ summary: 'Signs up a new user.' })
    @ApiResponse({ status: 201, description: "User signed up." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async signup(@Body() signupDto: SignUpDto) {
        return this.userService.signup(signupDto);
    }

    @Put()
    @ApiOperation({ summary: 'Edit user' })
    @ApiResponse({ status: 200, description: "User edited." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.edit_user)
    async edit(
        @CurrentUser() user: UserDocument,
        @Body() editDto: EditDto
    ) {
        return this.userService.edit(user._id.toHexString(), editDto);
    }

    @Delete()
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 200, description: "User deleted." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.delete_user)
    async delete(
        @CurrentUser() user: UserDocument,
    ) {
        return this.userService.delete(user._id.toHexString());
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single user' })
    @ApiResponse({ status: 200, description: "Success." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', description: 'The ID of the user', type: String })
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.read_user)
    async user(
        @Param('id') id: string,
    ) {
        return this.userService.findOne(id);
    }
}
