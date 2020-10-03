import { ok } from 'power-assert'

import { createTable } from './table'

describe('createTable', () => {
  it('total', () => {
    ok(createTable({ id: '@id' }).total === 83, '数据总量生成错误')
    ok(createTable({ id: '@id' }, 11).total === 11, '数据总量生成错误')
  })
})
