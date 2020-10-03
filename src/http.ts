import Mock, { MockCbOptions } from 'better-mock'

import { match } from 'path-to-regexp'

import type { HttpRequest } from './types'

/**
 *
 * 拦截 http 请求
 *
 * @param rule
 * @param type
 * @param callback
 */
export function blockHttpRequest(rule: string, type: string, callback: (req: HttpRequest) => any) {
  const parse = match(rule)

  const qs = (searchParams: URLSearchParams) => {
    const params: Record<string, string> = {}

    searchParams.forEach((value, key) => {
      params[key] = value
    })

    return params
  }

  Mock.mock(rule, type, (options: MockCbOptions) => {
    const path = options.url
    const url = new URL(path, window.location.origin)

    return callback({
      url: url.toString(),
      path: path,
      query: qs(url.searchParams),
      // @ts-ignore
      params: parse(path).params || {}
    })
  })
}
