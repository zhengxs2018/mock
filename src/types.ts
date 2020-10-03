export interface HttpRequest {
  url: string
  path: string
  query: Record<string, string>
  params: Record<string, string | number>
}

export interface Table<T = any> {
  rows: T[]
  total: number
}

export interface Pagination {
  page: number
  pageSize: number
}
