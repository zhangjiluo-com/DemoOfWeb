export function getQueryOrder<T extends Record<string, unknown>>(
  sortKeys: (keyof T)[],
  asc: string[] = [],
  desc: string[] = [],
) {
  return sortKeys.reduce(
    (prev, cur) => {
      if (asc.includes(cur as string)) {
        prev[cur] = 'ASC'
      } else if (desc.includes(cur as string)) {
        prev[cur] = 'DESC'
      }
      return prev
    },
    {} as Partial<Record<keyof T, 'ASC' | 'DESC'>>,
  )
}
