/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
