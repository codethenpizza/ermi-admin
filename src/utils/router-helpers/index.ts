export const wildcardRoute = (path: string): string => `${path}/*`

export const rootWildcardRoute = (path: string): string => wildcardRoute(`/${path}`)

export const composeTo = (...paths: string[]): string => paths.join('/')

export const composeRootTo = (...paths: string[]): string => `/${composeTo(...paths)}`

