import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleDocument, ArticleSchema } from '@app/common';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: 'mongodb://localhost:27017/cms' }) }),
    MongooseModule.forFeature([
      { name: ArticleDocument.name, schema: ArticleSchema },
    ])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesRepository, ArticlesService]
})
export class ArticlesModule { }
