import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "../../utils/linked-list";
import { LinkedListData } from "../../types/linked-list-data";
import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>();
  const [linkedList] = useState(new LinkedList<LinkedListData>());
  const startArr = [
    { value: "0", state: ElementStates.Default, head: null, tail: null },
    { value: "34", state: ElementStates.Default, head: null, tail: null },
    { value: "8", state: ElementStates.Default, head: null, tail: null },
    { value: "1", state: ElementStates.Default, head: null, tail: null },
  ];
  const [linkedListArr, setLinkedListArr] = useState<LinkedListData[]>([]);

  useEffect(() => {
    for (let i = 0; i < startArr.length; i++) {
      linkedList.append(startArr[i]);
    }
    setLinkedListArr([...linkedList.toArray()]);
  }, []);

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const changeInputIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.target.value));
  };

  const handleAddHead = async () => {
    if (inputValue) {
      linkedList.prepend({ value: inputValue, state: ElementStates.Default });
      setLinkedListArr([...linkedList.toArray()]);
    }
  };

  const handleDeleteHead = () => {
    linkedList.deleteHead();
    setLinkedListArr([...linkedList.toArray()]);
  };

  const handleAddTail = () => {
    if (inputValue) {
      linkedList.append({ value: inputValue, state: ElementStates.Default });
      setLinkedListArr([...linkedList.toArray()]);
    }
  };

  const handleDeleteTail = () => {
    linkedList.deleteTail();
    setLinkedListArr([...linkedList.toArray()]);
  };

  const handleInsertAt = () => {
    if (inputValue && inputIndex) {
      linkedList.insertAt(
        { value: inputValue, state: ElementStates.Default },
        inputIndex
      );
      setLinkedListArr([...linkedList.toArray()]);
    }
  };

  const handleDeleteAt = () => {
    if (inputIndex) {
      linkedList.deleteAt(inputIndex);
      setLinkedListArr([...linkedList.toArray()]);
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          maxLength={4}
          placeholder="Введите значение"
          extraClass={styles.input}
          isLimitText={true}
          value={inputValue}
          onChange={changeInputValue}
        />
        <Button
          text="Добавить в head"
          extraClass={styles.button}
          onClick={handleAddHead}
        />
        <Button
          text="Добавить в tail"
          extraClass={styles.button}
          onClick={handleAddTail}
        />
        <Button
          text="Удалить из head"
          extraClass={styles.button}
          onClick={handleDeleteHead}
        />
        <Button
          text="Удалить из tail"
          extraClass={styles.button_tail}
          onClick={handleDeleteTail}
        />
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input}
          value={inputIndex}
          onChange={changeInputIndex}
        />
        <Button
          text="Добавить по индексу"
          extraClass={styles.button_index}
          onClick={handleInsertAt}
        />
        <Button
          text="Удалить по индексу"
          extraClass={styles.button_index}
          onClick={handleDeleteAt}
        />
      </div>
      <div className={styles.circles}>
        {linkedListArr &&
          linkedListArr.map((el, i) => {
            return (
              <>
                <Circle
                  index={i}
                  letter={el.value}
                  state={el.state}
                  head={i === 0 ? "head" : el.head}
                  tail={i === linkedListArr.length - 1 ? "tail" : ""}
                  extraClass={styles.circle}
                />
                {i !== linkedListArr.length - 1 ? <ArrowIcon /> : null}
              </>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
