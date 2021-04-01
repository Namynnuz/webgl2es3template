import Phaser = require('phaser');

const contextCreationConfig = {
  alpha: false,
  depth: false,
  antialias: true,
  premultipliedAlpha: true,
  stencil: true,
  preserveDrawingBuffer: false,
  failIfMajorPerformanceCaveat: false,
  powerPreference: 'default'
};

const canvas = document.createElement('canvas');
const context = canvas.getContext("webgl2", contextCreationConfig);

const vertex = `#version 300 es
precision mediump float;

uniform vec2 uResolution;
uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;

in vec2 inPosition;
out vec2 fragCoord;
out vec2 outTexCoord;

void main(void) {
  gl_Position = vec4(inPosition, 1.0, 1.0);
  gl_Position = uProjectionMatrix * uViewMatrix * vec4(inPosition, 1.0, 1.0);
  fragCoord = vec2(inPosition.x, uResolution.y - inPosition.y);
}`;

const fragment = `#version 300 es
precision mediump float;

uniform float time;
uniform vec2 resolution;

in vec2 fragCoord;
out vec4 fragColor;

void main(void)
{
    vec2 uv = fragCoord / resolution.xy;
    vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0,2,4));
    fragColor = vec4(col, 1.0);
}`;

class ShaderTest extends Phaser.Scene {
  constructor() {
    super('shadertest');
  }

  create() {
    const shader = new Phaser.Display.BaseShader('shader', fragment, vertex);
    this.add.shader(shader, this.cameras.default.width / 2, this.cameras.default.height / 2,
                            this.cameras.default.width, this.cameras.default.height);
  }
}

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'ShaderTest',
  version: '1.0',
  type: Phaser.WEBGL,
  backgroundColor: '#FFFFFF',
  canvas: canvas,
  context: <WebGL2RenderingContext>context,
  width: 800,
  height: 600,
  scene: [ShaderTest],
  scale: {
   parent: 'gamecanvas',
   autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

const game = new Phaser.Game(GameConfig);