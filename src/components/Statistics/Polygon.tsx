import React, { useMemo } from "react";

interface PolygonProps {
  data: any;
  totalFinishedCount: any;
}

// interface Todo {
//   description: string;
//   updated_at: string;
//   completed: boolean;
//   deleted: boolean;
//   id: number;
//   editing: boolean;
// }

const Polygon: React.FunctionComponent<PolygonProps> = (props) => {
  const { data, totalFinishedCount } = props;

  const point = useMemo(() => {
    const dates = Object.keys(data).sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });
    const firstDay = dates[0];
    if (firstDay) {
      const lastDay = dates[dates.length - 1];
      const range = Date.parse(lastDay) - Date.parse(firstDay);
      let finishedCount = 0;
      const pointArray = dates.map((date: string) => {
        const x = ((Date.parse(date) - Date.parse(firstDay)) / range) * 240;
        finishedCount += data[date].length;
        const y = (1 - finishedCount / totalFinishedCount) * 60;
        return `${x},${y}`;
      });
      return ["0,60", ...pointArray, "240,60"].join(" ");
    } else {
      return "0,60 240,60";
    }
  }, [data, totalFinishedCount]);

  return (
    <div className="Polygon" id="Polygon">
      <svg>
        <polygon fill="rgba(255, 179, 113, 0.1)" stroke="rgba(255, 179, 113, 0.5)" strokeWidth="1" points={point} />
      </svg>
    </div>
  );
};

export default Polygon;
