import type { Table, Pagination } from '../types'

export class QueryBuilder {
  // 查询条件
  #where: Array<(row: any) => Boolean> = []

  // 偏移量
  #offset = 0

  // 条数
  #limit = -1

  #table: Table

  constructor(table: Table) {
    this.#table = table
  }

  where(cb: (row: any) => Boolean) {
    this.#where.push(cb)
    return this
  }

  offset(offset: number) {
    this.#offset = offset
    return this
  }

  limit(limit: number) {
    this.#limit = limit
    return this
  }

  count() {
    return this.query().length
  }

  query() {
    const rows = this.#table.rows
    return this.#where.reduce((items, cb) => items.filter(cb), rows)
  }

  execute() {
    const offset = this.#offset
    const limit = this.#limit
    return limit > -1 ? this.query().slice(offset, offset + limit) : this.query()
  }

  pagination(options?: Pagination) {
    const limit = this.#limit
    const offset = options?.pageSize || this.#offset
    const page = options?.page || offset / limit + 1
    const items = this.execute()
    const total = this.count()
    return { items, page, pageSize: limit, total, offset, limit, paginationFlag: Date.now() }
  }
}

export function createQueryBuilder(table: Table) {
  return new QueryBuilder(table)
}
