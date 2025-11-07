import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleDocument, ArticleSchema } from '@app/common';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({ uri: configService.get<string>('MONGO_URL') }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      { name: ArticleDocument.name, schema: ArticleSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required()
      }),
      envFilePath: ['.env', '.env.development']
    })
  ],
  controllers: [ArticlesController],
  providers: [ArticlesRepository, ArticlesService]
})
export class ArticlesModule { }
