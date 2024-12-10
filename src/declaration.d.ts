// src/declaration.d.ts
declare module 'auth/AuthApp' {
  const AuthApp: React.ComponentType
  export default AuthApp
}

declare module 'songLibrary/LibraryApp' {
  export function mount(el: HTMLElement): void // Declare the `mount` function
}
