import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions, RequiredPermissions, RequiredPermissionsGuard } from '@app/common';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.create_article)
    async create(@Body() createArticleDto: CreateArticleDto) {
        return await this.articlesService.create(createArticleDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.edit_article)
    async update(@Param('id') _id: string, @Body() updateArticleDto: UpdateArticleDto) {
        return await this.articlesService.update(_id, updateArticleDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.read_article)
    async read(@Param('id') _id: string) {
        return await this.articlesService.read(_id);
    }
}
