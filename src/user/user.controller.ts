import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { EditDto } from './dto/edit.dto';
import { CurrentUser, Permissions, RequiredPermissions, RequiredPermissionsGuard, UserDocument } from '@app/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('signup')
    async signup(@Body() signupDto: SignUpDto) {
        return this.userService.signup(signupDto);
    }

    @Post('edit')
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.edit_user)
    async edit(
        @CurrentUser() user: UserDocument,
        @Body() editDto: EditDto
    ) {
        return this.userService.edit(user._id.toHexString(), editDto);
    }

    @Delete()
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.delete_user)
    async delete(
        @CurrentUser() user: UserDocument,
    ) {
        return this.userService.delete(user._id.toHexString());
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.read_user)
    async user(
        @Param('id') id: string,
    ) {
        return this.userService.findOne(id);
    }
}
