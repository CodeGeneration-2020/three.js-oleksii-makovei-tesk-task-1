import { TZoneBoundaries } from "../components/space/types";

export const fieldOfView = 75 as const;
export const nearPlane = 0.1 as const;
export const farPlane = 2000 as const;

export const lightPositionX = 0;
export const lightPositionY = 0;
export const lightPositionZ = 0;

export const skyboxSize = 1000;
export const anisotropy = 16;

export const zoneBoundaries: TZoneBoundaries = {
  red: { xMin: -1000, xMax: 0, yMin: 0, yMax: 1000 },
  green: { xMin: 0, xMax: 1000, yMin: 0, yMax: 1000 },
  orange: { xMin: -1000, xMax: 0, yMin: -1000, yMax: 0 },
  blue: { xMin: 0, xMax: 1000, yMin: -1000, yMax: 0 },
};

export const STARS_AMOUNT = 500;
export const STAR_RADIUS = 1;
