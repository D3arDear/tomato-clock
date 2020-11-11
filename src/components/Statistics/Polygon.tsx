import React, { useMemo } from "react";

interface PolygonProps {
  data: any;
  width: number;
}

const Polygon: React.FunctionComponent<PolygonProps> = (props) => {
  const { data, width } = props;
  const get0 = (time: string) => {
    return new Date(new Date(time).toLocaleDateString()).getTime();
  };
  const spacePercentage = 0.3;

  const polygonWidth = useMemo(() => width * (1 - spacePercentage), [width]);

  const spaceWidth = useMemo(() => width * spacePercentage, [width]);

  const point = useMemo(() => {
    const dates = Object.keys(data).sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });
    const today = new Date(new Date().toLocaleDateString()).getTime();
    const verticalRange = dates.reduce(
      (a, b) => (data[b].length > a ? data[b].length : a),
      0
    );
    const horizonRange = today - get0(dates[0]);
    let lastHorizonPoint = 0;
    const points = dates.reduce((a, date) => {
      const x =
        horizonRange === 0
          ? polygonWidth + spaceWidth
          : (1 - (today - get0(date)) / horizonRange) * polygonWidth +
            spaceWidth;
      const y = (1 - data[date].length / verticalRange) * 57;
      lastHorizonPoint = x;
      return a.concat(` ${x},${y}`);
    }, `0,60 0,57 ${width * 0.3},57`);
    return lastHorizonPoint === width
      ? points.concat(` ${lastHorizonPoint},57 ${lastHorizonPoint},60`)
      : points.concat(` ${width},57 ${width},60`);
  }, [data, polygonWidth, spaceWidth, width]);

  return (
    <div className="Polygon" id="Polygon">
      <svg width={width} height="60" preserveAspectRatio="none">
        <defs>
          <linearGradient id="polygonFill" gradientTransform="rotate(90)">
            <stop offset="30%" stopColor="rgba(255, 124, 54, 0.5)" />
            <stop offset="90%" stopColor="rgba(255, 179, 113, 0.5)" />
          </linearGradient>
        </defs>
        <polygon
          stroke="rgba(255, 124, 54, 1)"
          fill="url('#polygonFill')"
          strokeWidth="1"
          points={point}
        />
      </svg>
    </div>
  );
};

export default Polygon;
