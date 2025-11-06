import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions, RequiredPermissions, RequiredPermissionsGuard } from '@app/common';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.create_article)
    async create(@Body() createArticleDto: CreateArticleDto) {
        return await this.articlesService.create(createArticleDto);
    }
}
