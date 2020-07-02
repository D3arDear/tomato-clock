import React from "react";
import { Todo } from "src/store/todoState";
import { Tomato } from "src/store/tomatoState";

interface BestMomentProps {
  data: Todo[] | Tomato[];
}

const BestMoment: React.FC<BestMomentProps> = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <div className="BestMoment">
      <div className="BestMoment-bestDay">最佳工作日</div>
      <div className="BestMoment-bestTime">最佳工作时间</div>
    </div>
  );
};

export default BestMoment;
