import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions, RequiredPermissions, RequiredPermissionsGuard } from '@app/common';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    @ApiOperation({ summary: 'Create article.' })
    @ApiResponse({ status: 201, description: "Success." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.create_article)
    async create(@Body() createArticleDto: CreateArticleDto) {
        return await this.articlesService.create(createArticleDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update article.' })
    @ApiResponse({ status: 200, description: "Success." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', description: 'Article id.', type: String })
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.edit_article)
    async update(@Param('id') _id: string, @Body() updateArticleDto: UpdateArticleDto) {
        return await this.articlesService.update(_id, updateArticleDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single article' })
    @ApiResponse({ status: 200, description: "Success." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', description: 'Article id.', type: String })
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.read_article)
    async read(@Param('id') _id: string) {
        return await this.articlesService.read(_id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a single article.' })
    @ApiResponse({ status: 200, description: "Success." })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'id', description: 'Article id.', type: String })
    @UseGuards(JwtAuthGuard, RequiredPermissionsGuard)
    @RequiredPermissions(Permissions.delete_article)
    async delete(@Param('id') _id: string) {
        return await this.articlesService.delete(_id);
    }
}
