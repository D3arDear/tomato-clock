import React from "react";
import { observer } from "mobx-react";
import "./statisticsDetail.scss";

const TomatoStatisticsDetail = () => {
  return (
    <div className="TomatoStatisticsDetail">
      <header className="TomatoStatisticsDetail-header">
        <div>总数</div>
        <div>日平均数</div>
        <div>月增长数</div>
      </header>
      <main>这里是中间图表</main>
      <footer>这里是最佳工作日</footer>
    </div>
  );
};

export default observer(TomatoStatisticsDetail);
