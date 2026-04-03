const EARTH_YEAR_IN_SECONDS = 31_557_600;
const PLANET_ORBITAL_PERIODS: Record<string, number> = {
    mercury: 0.2408467,
    venus: 0.61519726,
    earth: 1.0,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132,
  } as const;

export function age(planet: string, seconds: number): number {
  const keyPlanet = planet.toLowerCase();
  if (!PLANET_ORBITAL_PERIODS[keyPlanet]) throw new Error(`not a planet`);
  const planetAge = seconds / (EARTH_YEAR_IN_SECONDS * PLANET_ORBITAL_PERIODS[keyPlanet]);
  return Number(planetAge.toFixed(2));
}
