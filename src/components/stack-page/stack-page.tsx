import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "../../utils/stack";
import { StackData } from "../../types/stack-data";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<StackData>());
  const [stackArr, setStackArr] = useState<StackData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAdd = async () => {
    if (inputValue) {
      stack.push({ value: inputValue, state: ElementStates.Changing });
      setInputValue("");
      setStackArr([...stack.getElements()]);
      await delay(SHORT_DELAY_IN_MS);
      stack.peek.state = ElementStates.Default;
      setStackArr([...stack.getElements()]);
    }
  };

  const handleDelete = async () => {
    stack.peek.state = ElementStates.Changing;
    setStackArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr([...stack.getElements()]);
  };

  const handleClear = () => {
    stack.clear();
    setStackArr([...stack.getElements()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack}>
        <Input
          maxLength={4}
          isLimitText={true}
          type="text"
          extraClass={styles.input}
          onChange={changeValue}
          value={inputValue}
        />
        <Button
          text="Добавить"
          extraClass={styles.add_button}
          onClick={handleAdd}
          disabled={inputValue === ""}
        />
        <Button
          text="Удалить"
          extraClass={styles.remove_button}
          onClick={handleDelete}
          disabled={!stackArr.length}
        />
        <Button
          text="Очистить"
          onClick={handleClear}
          disabled={!stackArr.length}
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
