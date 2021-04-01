Phaser 3.5 WebGL2 ES 3.0 Template (for VS Code)
====

Original js example doesn't actually provide you information about using ES 3.0 shaders with WebGL2 canvas. This repo will do. It also provides you the way to debug ts-code properly.

After cloning this repo, install dependencies, then open it via VS Code:

```
git clone https://github.com/Namynnuz/webgl2es3template.git && cd webgl2es3template
npm install
code .
```

To successfully debug you would have to run your browser first via `F5`, and only then run npm script `dev`. If you try to add `--open` command to `parcel` script, it will cause an `Unbound breakpoint`.

Also, to successfully compile, you would have to update your `phaser.d.ts` copy like so (just add `| WebGL2RenderingContext;` at the end of the line):

```ts
/**
 * Provide your own Canvas Context for Phaser to use, instead of creating one.
 */
context?: CanvasRenderingContext2D | WebGL2RenderingContext;
```