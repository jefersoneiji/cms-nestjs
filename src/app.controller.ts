import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { RequiredPermissions, RequiredPermissionsGuard, Permissions } from '@app/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
  @RequiredPermissions(Permissions.read_article)
  getHello(): string {
    return this.appService.getHello();
  }
}
