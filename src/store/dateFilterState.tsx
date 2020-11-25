import { action, computed, observable } from "mobx";
import { DateRange as DateRangeType } from "@material-ui/pickers";

// const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

// const lastDay = new Date(
//   new Date().getFullYear(),
//   new Date().getMonth() + 1,
//   0
// );
export class dateFilterState {
  @observable
  dateRange: DateRangeType<Date | null> = [null, null];

  @observable
  pickersDateRange: DateRangeType<Date | null> = [null, null];

  @action
  updatedDate(dateRange: DateRangeType<Date | null>) {
    this.dateRange = dateRange;
  }

  @action
  updatePickersDateRange(dateRange: DateRangeType<Date | null>) {
    this.pickersDateRange = dateRange;
  }

  @computed
  get currentDateRange() {
    return this.dateRange;
  }
}
