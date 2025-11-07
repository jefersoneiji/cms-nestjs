import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PermissionSchema, PermissionsDocument, RoleDocument, RoleSchema, UserDocument, UserSchema } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:
    [
      MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({ uri: configService.get<string>('MONGO_URL') }),
        inject: [ConfigService]
      }),
      MongooseModule.forFeature([
        { name: UserDocument.name, schema: UserSchema },
        { name: RoleDocument.name, schema: RoleSchema },
        { name: PermissionsDocument.name, schema: PermissionSchema }
      ]),
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ['.env', '.env.development']
      })
    ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule { }
