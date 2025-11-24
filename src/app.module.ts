import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { exec } from 'child_process';

@Module({
  imports: [UserModule, AuthModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    if(process.env.NODE_ENV !== "production"){
      exec('bun seeder/seed.ts');
    }
  }
}
