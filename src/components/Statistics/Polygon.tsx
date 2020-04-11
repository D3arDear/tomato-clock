import React, { useMemo } from "react";

interface PolygonProps {
  data: any;
  width: number;
}

const Polygon: React.FunctionComponent<PolygonProps> = (props) => {
  const { data, width } = props;
  console.log("data:", data);

  const point = useMemo(() => {
    const dates = Object.keys(data).sort((a, b) => {
      return Date.parse(b) - Date.parse(a);
    });

    console.log("dates:", dates);
    const verticalRange = dates.reduce((a, b) => (data[b].length > a ? data[b].length : a), 0);
    // 几个任务 个
    const horizonRange = new Date().getTime() - Date.parse(dates[dates.length - 1]);
    console.log("horizonRange:", horizonRange);
    // 时间戳 从此刻倒推最后一项
    let lastHorizonPoint = 0;
    const points = dates.reduce((a, date) => {
      const x = (new Date().getTime() - Date.parse(date)) / (horizonRange * width);
      const y = (1 - data[date].length / verticalRange) * 60;
      lastHorizonPoint = x;
      console.log("x,y", `${x},${y}`);
      return a.concat(` ${x},${y}`);
    }, "0,60");
    return points.concat(` ${lastHorizonPoint},60`);
  }, [data, width]);

  return (
    <div className="Polygon" id="Polygon">
      <svg width="100%" height="60" preserveAspectRatio="none">
        <polygon fill="rgba(255, 179, 113, 0.1)" stroke="rgba(255, 179, 113, 0.5)" strokeWidth="1" points={point} />
      </svg>
    </div>
  );
};

export default Polygon;
