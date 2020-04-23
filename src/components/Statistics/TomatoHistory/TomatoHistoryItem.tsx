import React from "react";

interface TomatoHistoryItemInterface {
  tomato: Tomato;
  itemType: "finished" | "aborted";
}

interface Tomato {
  id: number;
  user_id: number;
  started_at: string;
  ended_at: string;
  description: string;
  aborted: boolean;
  manually_created: string;
  duration: number;
  extra: any;
  created_at: string;
  updated_at: string;
}

const TomatoHistoryItem: React.FC<TomatoHistoryItemInterface> = () => {
  return <div></div>;
};

export default TomatoHistoryItem;
