import { Query } from '@nestjs/common'

export function StringArrayQuery(key: string) {
  return Query(key, {
    transform: value => {
      // 处理重复键名格式：NestJS 会将重复键名转为数组，直接返回
      if (Array.isArray(value)) {
        return value.filter(item => typeof item === 'string')
      }
      // 处理逗号分隔格式：字符串按逗号分割为数组
      if (typeof value === 'string') {
        return value
          .split(',')
          .map(item => item.trim())
          .filter(Boolean)
      }
      // 处理空值：返回空数组
      return []
    },
  })
}
