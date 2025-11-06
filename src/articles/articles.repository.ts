import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository, ArticleDocument } from "@app/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ArticlesRepository extends AbstractRepository<ArticleDocument> {
    protected readonly logger = new Logger(ArticlesRepository.name);

    constructor(@InjectModel(ArticleDocument.name) articleModel: Model<ArticleDocument>) {
        super(articleModel);
    }

}