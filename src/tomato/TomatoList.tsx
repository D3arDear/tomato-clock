import React, { useEffect } from "react";
import { format } from "date-fns";
import "./TomatoList.scss";

interface Props {
  finishedTomato: any;
}

const TomatoItem = (props: any) => {
  return (
    <div className="TomatoItem">
      <span className="timeRange">
        {format(Date.parse(props.started_at), "H:mm")} - {format(Date.parse(props.ended_at), "H:mm")}
      </span>
      <span className="description">{props.description}</span>
    </div>
  );
};

const TomatoList: React.FunctionComponent<Props> = (props) => {
  const { finishedTomato } = props;

  useEffect(() => {
    console.log("finishedTomato", finishedTomato);
  }, [finishedTomato]);

  const list = Object.keys(finishedTomato)
    .splice(0, 3)
    .map((date, index) => {
      const tomatoes = finishedTomato[date];
      return (
        <div key={index} className="dailyTomato">
          <div className="title">
            <span className="dateTime">{format(Date.parse(date), "M月dd日")}</span>
            <span className="finishedCount">完成了{tomatoes.length}个番茄</span>
          </div>
          {tomatoes.map((tomato: any) => (
            <TomatoItem key={tomato.id} {...tomato} />
          ))}
        </div>
      );
    });

  return <div className="TomatoList">{list}</div>;
};

export default TomatoList;
