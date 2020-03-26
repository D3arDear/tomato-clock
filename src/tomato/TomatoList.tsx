import React, { useEffect } from "react";
import { format } from "date-fns";

interface Props {
  finishedTomato: any;
}

const TomatoItem = (props: any) => {
  return (
    <div className="TomatoItem">
      <span>
        {format(props.start_at, "H:mm")}-{format(props.ended_at, "H:mm")}
      </span>
    </div>
  );
};

const TomatoList: React.FunctionComponent<Props> = (props) => {
  const { finishedTomato } = props;

  useEffect(() => {
    console.log("finishedTomato", finishedTomato);
  }, [finishedTomato]);

  const list = Object.keys(finishedTomato).map((date, index) => {
    const tomatoes = finishedTomato[date];
    return (
      <div key={index}>
        <div className="title">
          <span>{date}</span>
          <span>完成了{tomatoes.length}个番茄</span>
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
