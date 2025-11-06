import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
    constructor(private readonly articlesRepository: ArticlesRepository) { }

    async create(createArticleDto: CreateArticleDto) {
        return await this.articlesRepository.create(createArticleDto);
    }
}
