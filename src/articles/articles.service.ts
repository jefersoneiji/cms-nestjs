import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(private readonly articlesRepository: ArticlesRepository) { }

    async create(createArticleDto: CreateArticleDto) {
        return await this.articlesRepository.create(createArticleDto);
    }

    async update(_id: string, updateArticleDto: UpdateArticleDto) {
        return await this.articlesRepository.findOneAndUpdate({ _id }, { ...updateArticleDto });
    }

    async read(_id: string) {
        return await this.articlesRepository.findOne({ _id });
    }

    async delete(_id: string) {
        return await this.articlesRepository.findOneAndDelete({ _id });
    }
}
