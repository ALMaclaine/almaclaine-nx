type Seed = number;

type RandomGen<T> = (seed: number) => T;
type SeedPair<T> = [Seed, T];

const RANDOM_MAX = 8239451023;

function random(seed: number): number {
  const nextSeed = (1839567234 * seed + 972348567) % RANDOM_MAX;
  return nextSeed;
}

function randomSeedGen<T>(seed: number, randGen: RandomGen<T>): SeedPair<T> {
  const nextSeed = random(seed);
  return [nextSeed, randGen(nextSeed)];
}

function randomSeed(seed: number): SeedPair<number> {
  return randomSeedGen<number>(seed, (val: number) => val);
}

function randomUnit(seed: number): number {
  const nextSeed = random(seed);
  return nextSeed / RANDOM_MAX;
}

function randomUnitSeed(seed: number): SeedPair<number> {
  return randomSeedGen(seed, randomUnit);
}

function randomInRange(seed: number, min: number, max: number) {
  const unit = randomUnit(seed);
  return min + Math.floor(unit * (max - min));
}

function randomInRangeSeed(seed: number, min: number, max: number) {
  return randomSeedGen<number>(seed, (val: number) =>
    randomInRange(val, min, max)
  );
}

export {
  random,
  randomSeed,
  randomUnit,
  randomUnitSeed,
  randomInRange,
  randomInRangeSeed,
};
