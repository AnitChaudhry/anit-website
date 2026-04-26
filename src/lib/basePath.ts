export const basePath = ""

export const asset = (path: string) =>
  path.startsWith("/") ? path : `/${path}`
