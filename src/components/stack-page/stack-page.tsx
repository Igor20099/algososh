import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";
import { StackData } from "../../types/stack-data";
import { ElementStates } from "../../types/element-states";
import { MAX_LENGTH } from "../../constants/lengths";

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<StackData>());
  const [stackArr, setStackArr] = useState<StackData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoadAdd, setIsLoadAdd] = useState<boolean>(false);
  const [isLoadDelete, setIsLoadDelete] = useState<boolean>(false);
  const [isLoadClear, setIsLoadClear] = useState<boolean>(false);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAdd = async () => {
    if (inputValue) {
      setIsLoadAdd(true);
      stack.push({ value: inputValue, state: ElementStates.Changing });
      setInputValue("");
      setStackArr([...stack.getElements()]);
      await delay(SHORT_DELAY_IN_MS);
      stack.peek.state = ElementStates.Default;
      setStackArr([...stack.getElements()]);
      setIsLoadAdd(false);
    }
  };

  const handleDelete = async () => {
    setIsLoadDelete(true);
    stack.peek.state = ElementStates.Changing;
    setStackArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr([...stack.getElements()]);
    setIsLoadDelete(false);
  };

  const handleClear = () => {
    setIsLoadClear(true);
    stack.clear();
    setStackArr([...stack.getElements()]);
    setIsLoadClear(false);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack}>
        <Input
          data-testid="input"
          maxLength={MAX_LENGTH}
          isLimitText={true}
          type="text"
          extraClass={styles.input}
          onChange={changeValue}
          value={inputValue}
        />
        <Button
          data-testid="addButton"
          text="Добавить"
          extraClass={styles.add_button}
          onClick={handleAdd}
          disabled={
            inputValue === "" || isLoadClear || isLoadDelete ? true : false
          }
          isLoader={isLoadAdd}
        />
        <Button
          data-testid="removeButton"
          text="Удалить"
          extraClass={styles.remove_button}
          onClick={handleDelete}
          disabled={!stackArr.length || isLoadAdd || isLoadClear ? true : false}
          isLoader={isLoadDelete}
        />
        <Button
          data-testid="clearButton"
          text="Очистить"
          onClick={handleClear}
          disabled={
            !stackArr.length || isLoadAdd || isLoadDelete ? true : false
          }
          isLoader={isLoadClear}
        />
      </div>

      <div className={styles.circles}>
        {stackArr &&
          stackArr.map((el, i) => {
            return (
              <Circle
                key={i}
                index={i}
                state={el.state}
                letter={el.value}
                head={i === stackArr.length - 1 ? "top" : ""}
                extraClass={styles.circle}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
