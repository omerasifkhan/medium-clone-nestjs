import { TagEntity } from '../../../../../tags/infrastructure/persistence/relational/entities/tag.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { Article } from '../../../../domain/article';
import { ArticleDTOWithTagDomains } from '../../../../articles.types';
import { ArticleEntity } from '../entities/article.entity';
import { TagMapper } from '../../../../../tags/infrastructure/persistence/relational/mappers/tag.mapper';
import { isArray, isEmpty, isNumber } from 'radash';

export class ArticleMapper {
  static toDomain(raw: ArticleEntity): Article {
    const domainEntity = new Article();
    domainEntity.body = raw.body;
    domainEntity.description = raw.description;
    domainEntity.title = raw.title;
    domainEntity.slug = raw.slug;
    domainEntity.id = raw.id;
    if (raw.author) {
      domainEntity.author = UserMapper.toDomain(raw.author);
    }
    if (isArray(raw.tagList) && !isEmpty(raw.tagList)) {
      domainEntity.tagList = raw.tagList.map(
        (tagEntity: TagEntity) => tagEntity.name,
      );
    }

    domainEntity.created_at = raw.created_at;
    domainEntity.updated_at = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: Article): ArticleEntity {
    const persistenceEntity = new ArticleEntity();
    persistenceEntity.body = domainEntity.body;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.slug = domainEntity.slug;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (isNumber(domainEntity.author_id)) {
      persistenceEntity.author_id = domainEntity.author_id;
    }

    persistenceEntity.created_at = domainEntity.created_at;
    persistenceEntity.updated_at = domainEntity.updated_at;

    return persistenceEntity;
  }

  static toPersistenceFromDTOWithTagDomains(
    domainEntity: ArticleDTOWithTagDomains,
  ): ArticleEntity {
    const persistenceEntity = new ArticleEntity();
    persistenceEntity.body = domainEntity.body;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.slug = domainEntity.slug;

    if (isArray(domainEntity.tagList) && !isEmpty(domainEntity.tagList)) {
      persistenceEntity.tagList = domainEntity.tagList.map((domainEntity) =>
        TagMapper.toPersistence(domainEntity),
      );
    }

    if (isNumber(domainEntity.author_id)) {
      persistenceEntity.author_id = domainEntity.author_id;
    }

    return persistenceEntity;
  }
}
