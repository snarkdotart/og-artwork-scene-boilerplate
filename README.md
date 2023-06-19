# OG Artwork Scene Boilerplate

This is a project boilerplate for OG Artwork Scene.

## Requirements

- Node.js
- npm

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/snarkdotart/og-artwork-scene-boilerplate.git
cd og-artwork-scene-boilerplate
```

Then install dependencies:

```bash
npm install
```

## Development
To start the development server, run:
```bash
npm run dev
```

## Building
To build the project, use:
```bash
npm run build
```
This will generate a dist directory with the built assets.

## Packaging
To package the built assets into a zip file, use:
```bash
npm run publish
```
This will create a package.zip file.

## Previewing
To preview the build, run:
```bash
npm run preview
```

## Trait Generation
Simple example of generation traits can be found in src/onRun.js:
```javascript
function onRun(input) {
  const seed = parseInt(input.seed, 16);
  const colorRandom = seededRandom(seed);
  const shapeRandom = seededRandom(seed * 2);

  const color = getValue(colorRandom, colorTraits);
  const shape = getValue(shapeRandom, shapeProperties);

  return {
    traits: {
      color: color,
    },
    properties: {
      shape: shape,
    },
  };
}
```
## Trait Object
output of onRun function should be a trait object with the following structure:
```json
{
    "traits": {
        "color": "Blue"
    },
    "properties": {
        "shape": "Star"
    }
}
```
This object will be passed to the renderFunction.

## Rendering
You are encouraged to create your own rendition of the renderFunction. A basic example to guide you can be found in src/renderFunction.js:
```javascript
const renderFunction = (data, canvas) => {
  const ctx = canvas.getContext("2d");
  renderGradientBackground(ctx, canvas);
  renderText(ctx, data);
  renderShape(ctx, data);

  if (typeof window.render_completed === "function") {
    window.render_completed();
  }
};
```



