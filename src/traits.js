// A function that takes an integer seed and returns a pseudo-random number
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// A function that returns a trait based on the probabilities provided
function getValue(randomValue, traits) {
  let cumulativeProbability = 0;
  for (const trait of traits) {
    cumulativeProbability += trait.probability;
    if (randomValue < cumulativeProbability) {
      return trait.name;
    }
  }
}

// Color traits with corresponding probabilities
const colorTraits = [
  { name: "Red", probability: 0.4 },
  { name: "Blue", probability: 0.3 },
  { name: "Yellow", probability: 0.1 },
  { name: "Black", probability: 0.2 },
];

// Shape properties with corresponding probabilities
const shapeProperties = [
  { name: "Triangle", probability: 0.4 },
  { name: "Square", probability: 0.3 },
  { name: "Round", probability: 0.2 },
  { name: "Star", probability: 0.1 },
];

/*
onRun is the main function that gets invoked on every generate request
It returns the new state of a token and takes the current state as an input object

input - an object that represents the current state of a token
  - token_id - ID of the token
  - seed - a hex value, unique to every token e.g. "0x3f13cb3..."
  - traits - a key-value object of publicly available values
  - properties - a key-value object of privately available values
*/
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
export default onRun;
