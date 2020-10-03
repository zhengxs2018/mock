# @zhengxs/mock

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![NPM version](https://img.shields.io/npm/v/@zhengxs/mock.svg?style=flat)
![NPM downloads](https://img.shields.io/npm/dm/@zhengxs/mock.svg?style=flat)
![License](https://img.shields.io/npm/l/@zhengxs/mock.svg?style=flat-square)

基于 [better-mock][better-mock] 开发的插件

## 📦 安装

```bash
$ npm install @zhengxs/mock --save
```

## 使用

```typescript
import { blockHttpRequest, createTable, createQueryBuilder } from '@zhengxs/mock'
import { toSafeInteger, trim } from 'lodash-es'

import type { User } from '../interfaces/user'

// 生成(假)数据表
const table = createTable<User>({
  id: '@id',
  username: '@first',
  nickname: '@cname',
})

blockHttpRequest('/api/user/list', 'GET', (ctx) => {
  // 获取查询参数
  const args = ctx.query

  // 分页数据
  const page = toSafeInteger(args.page || 1)
  const pageSize = toSafeInteger(args.pageSize || 10)

  // 创建查询构造器
  const query = createQueryBuilder(table)

  // 添加昵称过滤
  const nickname = trim(args.nickname || '')
  if (nickname) {
    // 支持多个过滤条件
    query.where((row: User) => {
      return row.nickname.indexOf(nickname as string) > -1
    })
  }

  return {
    code: 200,
    message: 'ok',
    data: query.pagination({ page, pageSize })
  }
})
```

## License

* MIT

[better-mock]: https://github.com/lavyun/better-mock
