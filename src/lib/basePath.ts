export const basePath =
  process.env.NODE_ENV === "production" ? "/anit-website" : ""

export const asset = (path: string) =>
  `${basePath}${path.startsWith("/") ? path : `/${path}`}`
