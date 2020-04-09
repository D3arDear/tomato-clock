import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import StyledInput from "src/components/Common/StyledInput";
import { useStores } from "src/hooks/use-stores";

interface Props {
  updateTomato: (params: any) => void;
  onPressClear: () => void;
}

const TomatoInput: React.FunctionComponent<Props> = (props) => {
  const { updateTomato, onPressClear } = props;
  const { justCompletedTodo } = useStores();

  const addTomato = (value: string) => {
    updateTomato({
      description: value,
      ended_at: new Date(),
    });
  };
  const inputRef = useRef<any>();
  useEffect(() => {
    if (!inputRef.current) {
      return;
    } else {
      inputRef.current.tempChange(justCompletedTodo.justCompletedTodos);
    }
  }, [justCompletedTodo.justCompletedTodos]);

  return (
    <StyledInput
      ref={inputRef}
      onSubmitValue={addTomato}
      placeholder="请输入刚才完成的任务"
      onPressClear={onPressClear}
    />
  );
};

export default observer(TomatoInput);
