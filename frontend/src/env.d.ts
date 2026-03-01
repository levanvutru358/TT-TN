/// <reference types="vite/client" />

// Allow .vue files to be imported in TypeScript. This shim is required when
// "include" patterns in tsconfig.json match .vue files but we don't have a
// transformer for them in the plain TypeScript server. Without it the server
// attempts to read the raw file and reports "File ... not found".

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
