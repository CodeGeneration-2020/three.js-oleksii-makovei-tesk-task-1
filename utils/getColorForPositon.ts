import { TZoneBoundaries } from "../components/space/types";
import { overallColors } from "../theme/colors";
import starColors from "./starColors";

type TZone = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

const parseZoneBoundary = (x: number, y: number, zone: TZone) => {
  return x >= zone.xMin && x < zone.xMax && y >= zone.yMin && y < zone.yMax;
};

const getColorForPosition = (
  position: { x: number; y: number },
  zoneBoundaries: TZoneBoundaries
) => {
  const { x, y } = position;

  for (const zone of Object.keys(zoneBoundaries)) {
    if (
      parseZoneBoundary(
        x,
        y,
        zoneBoundaries[zone as keyof typeof zoneBoundaries]
      )
    ) {
      return starColors[zone as keyof typeof starColors];
    }
  }
  return overallColors.white;
};
export default getColorForPosition;
