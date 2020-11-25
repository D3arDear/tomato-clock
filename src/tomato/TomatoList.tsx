import React from "react";
import { format } from "date-fns";
import "./TomatoList.scss";

interface Props {
  finishedTomato: any;
}

const TomatoItem = (props: any) => {
  return (
    <div className="TomatoItem">
      <span className="timeRange">
        {format(Date.parse(props.started_at), "H:mm")} -{" "}
        {format(Date.parse(props.ended_at), "H:mm")}
      </span>
      <span className="description">{props.description}</span>
    </div>
  );
};

const TomatoList: React.FunctionComponent<Props> = (props) => {
  const { finishedTomato } = props;
  const list = Object.keys(finishedTomato).splice(0, 3);

  const tomatoList = list.map((date, index) => {
    const tomatoes = finishedTomato[date];
    return (
      <div key={index} className="dailyTomato">
        <div className="title">
          <div className="title-date">
            <span className="dateItem">
              {format(Date.parse(date), "M月dd日")}
            </span>
            <span className="dateItem-daily">
              {format(Date.parse(date), "eee")}
            </span>
          </div>
          <span className="finishedCount">
            完成了 {tomatoes.length} 个番茄时间
          </span>
        </div>
        {tomatoes.map((tomato: any) => (
          <TomatoItem key={tomato.id} {...tomato} />
        ))}
      </div>
    );
  });

  return (
    <div className="TomatoList">
      {list.length > 0 ? (
        tomatoList
      ) : (
        <div className="TomatoList-empty">您还没有完成过番茄时间</div>
      )}
    </div>
  );
};

export default TomatoList;
