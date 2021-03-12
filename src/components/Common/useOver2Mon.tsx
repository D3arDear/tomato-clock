import { Tomato } from "src/store/tomatoState";
import { Todo } from "src/store/todoState";

export const dateOfTwoMonthBefore = new Date().getTime() - 3600 * 24 * 1000 * 30;

const useOver2Month = (sourceData: Tomato[] | Todo[]) => {
  const lastDate = () => {
    return sourceData.sort((a: Tomato | Todo, b: Tomato | Todo) => {
      return Date.parse(a.updated_at) - Date.parse(b.updated_at);
    })[0].updated_at;
  };
  return dateOfTwoMonthBefore > Date.parse(lastDate());
};

export default useOver2Month;
