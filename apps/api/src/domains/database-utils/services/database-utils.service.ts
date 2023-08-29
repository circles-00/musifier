import { FindManyOptions, ObjectLiteral } from '@loopback/typeorm'
import { serializeNestedObjectValues } from '../../../utils'
import { IFindOneWithRelationsArgs, IPaginateAndSortArgs } from './types'

export class DatabaseUtilsService {
  async paginateAndSort<T extends ObjectLiteral>({
    repository,
    page = 1,
    pageSize = 10,
    order,
    orderBy,
    where,
    relations,
  }: IPaginateAndSortArgs<T>) {
    const mutatedRelations = serializeNestedObjectValues(relations)

    const [data, count] = await repository.findAndCount({
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
      ...(order &&
        orderBy && {
          order: { [orderBy]: order } as FindManyOptions<T>['order'],
        }),
      where,
      relations: mutatedRelations,
    })

    const numberOfPages = Math.ceil(count / pageSize)

    return {
      data,
      metaData: {
        previousPage: page === 1 ? null : page - 1,
        currentPage: page,
        nextPage: page !== numberOfPages ? page + 1 : null,
        pages: numberOfPages,
        records: count,
      },
    }
  }

  async findOneWithRelations<T extends ObjectLiteral>({
    repository,
    where,
    relations,
  }: IFindOneWithRelationsArgs<T>) {
    const mutatedRelations = serializeNestedObjectValues(relations)

    return repository.findOne({
      where,
      relations: mutatedRelations,
    })
  }
}
