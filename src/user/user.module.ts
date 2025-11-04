import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserDocument, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: 'mongodb://localhost:27017/cms' }) }),
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule { }
