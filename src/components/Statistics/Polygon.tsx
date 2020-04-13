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

  const point = useMemo(() => {
    const dates = Object.keys(data).sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });
    const today = new Date(new Date().toLocaleDateString()).getTime();
    const verticalRange = dates.reduce((a, b) => (data[b].length > a ? data[b].length : a), 0);
    const horizonRange = today - get0(dates[0]);
    let lastHorizonPoint = 0;
    const points = dates.reduce((a, date) => {
      const x = (1 - (today - get0(date)) / horizonRange) * width;
      const y = (1 - data[date].length / verticalRange) * 60;
      lastHorizonPoint = x;
      return a.concat(` ${x},${y}`);
    }, "0,60");
    return points.concat(` ${lastHorizonPoint},60`);
  }, [data, width]);

  return (
    <div className="Polygon" id="Polygon">
      <svg width={width} height="60" preserveAspectRatio="none">
        <polygon fill="rgba(255, 179, 113, 0.1)" stroke="rgba(255, 179, 113, 0.5)" strokeWidth="1" points={point} />
      </svg>
    </div>
  );
};

export default Polygon;
