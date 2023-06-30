// A function that takes an integer seed and returns a pseudo-random number
function seededRandom(seed) {
  const x = Math.sin(Number(seed)) * 10000;
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

// Size traits with corresponding probabilities
const sizeTraits = [
  { name: "Small", probability: 0.2 },
  { name: "Medium", probability: 0.6 },
  { name: "Big", probability: 0.2 },
];

/*
onRun is the main function that gets invoked on every generate request
It returns the new state of a token and takes the current state as an input object
Be careful with returning big integer values they may be stored incorrectly, better use strings

input - an object that represents the current state of a token
  - token_id - ID of the token
  - generation - integer value, increases after every render request. 0 - just minted token
  - seed - a hex value, unique to every token e.g. "0x3f13cb3..."
  - traits - a key-value object of publicly available values
  - properties - a key-value object of privately available values
*/
function onRun(input) {
  let seed = BigInt(input.seed);
  const colorRandom = seededRandom(seed);
  seed++
  const shapeRandom = seededRandom(seed * 2n);
  seed++
  const sizeRandom = seededRandom(seed * 3n);

  const color = getValue(colorRandom, colorTraits);
  const shape = getValue(shapeRandom, shapeProperties);
  const size = getValue(sizeRandom, sizeTraits);

  let newState = {
    traits: {
      color: color,
      size: size,
    },
    properties: {
      generation: input.generation,
      seed: input.seed,
      shape: shape,
    },
  };

  return newState;
}
export default onRun;
