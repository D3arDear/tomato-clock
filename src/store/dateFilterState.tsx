import { action, computed, observable } from "mobx";
import { DateRange as DateRangeType } from "@material-ui/pickers";

export class dateFilterState {
  @observable
  dateRange: DateRangeType = [null, null];

  @observable
  pickersDateRange: DateRangeType = [null, null];

  @action
  updatedDate(dateRange: DateRangeType) {
    this.dateRange = dateRange;
  }

  @action
  updatePickersDateRange(dateRange: DateRangeType) {
    this.pickersDateRange = dateRange;
  }

  @computed
  get currentDateRange() {
    return this.dateRange;
  }
}
