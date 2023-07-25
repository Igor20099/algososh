import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./linked-list";
import { LinkedListData } from "../../types/linked-list-data";
import { ElementStates } from "../../types/element-states";
import { MAX_LENGTH } from "../../constants/lengths";
import { getRandomNumber } from "./list-page.utils";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>();
  const [linkedList] = useState(new LinkedList<LinkedListData>());
  const [head, setHead] = useState<string>("");
  const [tail, setTail] = useState<string>("");
  const [deleteHead, setDeleteHead] = useState<string>("");
  const [deleteTail, setDeleteTail] = useState<string>("");
  const [isloadAddHead, setIsLoadAddHead] = useState<boolean>(false);
  const [isloadAddTail, setIsLoadAddTail] = useState<boolean>(false);
  const [isloadDeteteHead, setIsLoadDeleteHead] = useState<boolean>(false);
  const [isloadDeleteTail, setIsLoadDeleteTail] = useState<boolean>(false);
  const [isloadAddIndex, setIsLoadAddIndex] = useState<boolean>(false);
  const [isLoadDeleteIndex, setIsLoadDeleteIndex] = useState<boolean>(false);
  const startArr = Array.from({ length: 4 }, () => ({
    value: getRandomNumber().toString(),
    state: ElementStates.Default,
  }));
  const [linkedListArr, setLinkedListArr] =
    useState<LinkedListData[]>(startArr);

  useEffect(() => {
    for (let i = 0; i < startArr.length; i++) {
      linkedList.append(startArr[i]);
    }
  }, []);

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const changeInputIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.target.value));
  };

  const handleAddHead = async () => {
    if (inputValue) {
      setIsLoadAddHead(true);
      setHead(inputValue);
      setInputValue("");
      await delay(SHORT_DELAY_IN_MS);
      linkedList.prepend({ value: inputValue, state: ElementStates.Modified });
      await delay(SHORT_DELAY_IN_MS);
      setLinkedListArr([...linkedList.toArray()]);
      setHead("");
      await delay(SHORT_DELAY_IN_MS);
      const tempArr = linkedList.toArray();
      tempArr[0].state = ElementStates.Default;
      setLinkedListArr(tempArr);
      setIsLoadAddHead(false);
    }
  };

  const handleDeleteHead = async () => {
    setIsLoadDeleteHead(true);
    const tempArr = linkedList.toArray();
    setDeleteHead(tempArr[0].value);
    tempArr[0].value = "";
    setLinkedListArr([...linkedList.toArray()]);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.deleteHead();
    setDeleteHead("");
    setLinkedListArr([...linkedList.toArray()]);
    setIsLoadDeleteHead(false);
  };

  const handleAddTail = async () => {
    if (inputValue) {
      setIsLoadAddTail(true);
      setTail(inputValue);
      setInputValue("");
      await delay(SHORT_DELAY_IN_MS);
      linkedList.append({ value: inputValue, state: ElementStates.Modified });
      await delay(SHORT_DELAY_IN_MS);
      setLinkedListArr([...linkedList.toArray()]);
      setTail("");
      await delay(SHORT_DELAY_IN_MS);
      const tempArr = linkedList.toArray();
      tempArr[tempArr.length - 1].state = ElementStates.Default;

      setLinkedListArr(tempArr);
      setIsLoadAddTail(false);
    }
  };

  const handleDeleteTail = async () => {
    setIsLoadDeleteTail(true);
    const tempArr = linkedList.toArray();
    setDeleteTail(tempArr[tempArr.length - 1].value);
    tempArr[tempArr.length - 1].value = "";
    setLinkedListArr([...linkedList.toArray()]);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.deleteTail();
    setDeleteTail("");
    setLinkedListArr([...linkedList.toArray()]);
    setIsLoadDeleteTail(false);
  };

  const handleInsertAt = async () => {
    if (inputValue && inputIndex && inputIndex <= linkedListArr.length) {
      setIsLoadAddIndex(true);
      let tempArr = linkedList.toArray();
      let count = 0;
      setInputValue("");
      setInputIndex(-1);
      while (count < inputIndex) {
        tempArr[count].head = inputValue;
        tempArr[count].state = ElementStates.Changing;
        setLinkedListArr([...linkedList.toArray()]);
        await delay(SHORT_DELAY_IN_MS);
        tempArr[count].head = "";
        count++;
        await delay(SHORT_DELAY_IN_MS);

        setLinkedListArr([...linkedList.toArray()]);
      }
      linkedList.addByIndex(
        { value: inputValue, state: ElementStates.Default },
        inputIndex
      );

      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].state = ElementStates.Default;
      }
      setLinkedListArr([...linkedList.toArray()]);
      setIsLoadAddIndex(false);
    }
  };

  const handleDeleteAt = async () => {
    if (inputIndex && inputIndex <= linkedListArr.length - 1) {
      setIsLoadDeleteIndex(true);
      let tempArr = linkedList.toArray();
      let count = 0;
      setInputIndex(-1);
      while (count < inputIndex + 1) {
        tempArr[count].state = ElementStates.Changing;
        setLinkedListArr([...linkedList.toArray()]);
        await delay(SHORT_DELAY_IN_MS);
        count++;
        await delay(SHORT_DELAY_IN_MS);

        setLinkedListArr([...linkedList.toArray()]);
      }
      tempArr[inputIndex].tail = tempArr[inputIndex].value;
      tempArr[inputIndex].value = "";
      await delay(SHORT_DELAY_IN_MS);
      tempArr[inputIndex].state = ElementStates.Default;
      setLinkedListArr([...linkedList.toArray()]);
      await delay(SHORT_DELAY_IN_MS);
      linkedList.deleteByIndex(inputIndex);
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].state = ElementStates.Default;
      }
      setLinkedListArr([...linkedList.toArray()]);
      setIsLoadDeleteIndex(false);
    }
  };

  const showHead = (i: number, length: number, inputIndex?: number) => {
    if (!head && i === 0) {
      return "head";
    } else if (i === 0 && head) {
      return (
        <Circle
          key={i}
          letter={head}
          isSmall={true}
          state={ElementStates.Changing}
        />
      );
    }

    if (tail && i === length) {
      return (
        <Circle
          key={i}
          letter={tail}
          isSmall={true}
          state={ElementStates.Changing}
        />
      );
    }
  };

  const showTail = (i: number, length: number) => {
    if (!deleteTail && i === length) {
      return "tail";
    } else if (i === length) {
      return (
        <Circle
          key={i}
          letter={deleteTail}
          isSmall={true}
          state={ElementStates.Changing}
        />
      );
    }
    if (deleteHead && i === 0) {
      return (
        <Circle
          key={i}
          letter={deleteHead}
          isSmall={true}
          state={ElementStates.Changing}
        />
      );
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          maxLength={MAX_LENGTH}
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
          disabled={!inputValue ? true : false}
          isLoader={isloadAddHead}
        />
        <Button
          text="Добавить в tail"
          extraClass={styles.button}
          onClick={handleAddTail}
          disabled={!inputValue || isloadAddHead ? true : false}
          isLoader={isloadAddTail}
        />
        <Button
          text="Удалить из head"
          extraClass={styles.button}
          onClick={handleDeleteHead}
          isLoader={isloadDeteteHead}
          disabled={
            isloadAddHead ||
            isloadAddTail ||
            isloadDeleteTail ||
            isloadAddIndex ||
            isLoadDeleteIndex
              ? true
              : false
          }
        />
        <Button
          text="Удалить из tail"
          extraClass={styles.button_tail}
          onClick={handleDeleteTail}
          isLoader={isloadDeleteTail}
          disabled={
            isloadAddHead ||
            isloadAddTail ||
            isloadDeteteHead ||
            isloadAddIndex ||
            isLoadDeleteIndex
              ? true
              : false
          }
        />
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input}
          value={inputIndex !== -1 ? inputIndex : ""}
          onChange={changeInputIndex}
        />
        <Button
          text="Добавить по индексу"
          extraClass={styles.button_index}
          onClick={handleInsertAt}
          disabled={
            (!inputIndex || !inputValue) ||
            isLoadDeleteIndex ||
             inputIndex! > linkedListArr.length - 1
              ? true
              : false
          }
          isLoader={isloadAddIndex}
        />
        <Button
          text="Удалить по индексу"
          extraClass={styles.button_index}
          onClick={handleDeleteAt}
          disabled={
            !inputIndex || isloadAddIndex || inputIndex === -1 || inputIndex! > linkedListArr.length - 1 ? true : false
          }
          isLoader={isLoadDeleteIndex}
        />
      </div>
      <div className={styles.circles}>
        {linkedListArr &&
          linkedListArr.map((el, i) => {
            return (
              <div key={i} className={styles.circle_wrapper}>
                <Circle
                  key={i}
                  index={i}
                  letter={el.value}
                  state={el.state}
                  head={
                    !el.head ? (
                      showHead(i, linkedListArr.length - 1, inputIndex)
                    ) : (
                      <Circle
                        key={i}
                        letter={el.head}
                        isSmall={true}
                        state={ElementStates.Changing}
                      />
                    )
                  }
                  tail={
                    !el.tail ? (
                      showTail(i, linkedListArr.length - 1)
                    ) : (
                      <Circle
                        key={i}
                        letter={el.tail}
                        isSmall={true}
                        state={ElementStates.Changing}
                      />
                    )
                  }
                  extraClass={styles.circle}
                />
                {i !== linkedListArr.length - 1 ? <ArrowIcon /> : null}
              </div>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
