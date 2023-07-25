import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { delay, generateRandomArray, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { NumberData } from "../../types/number-data";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<NumberData[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [sortName, setSortName] = useState<string>("выбор");
  const [direction, setDirection] = useState<Direction>();
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setArr(generateRandomArray());
    return () => {
      setArr([]);
    };
  }, []);

  const generateArray = () => {
    setArr(generateRandomArray());
  };

  const selectionSort = async (arr: NumberData[], direction: Direction) => {
    setIsLoad(true);
    if (arr.length > 1) {
      if (direction === Direction.Ascending) {
        for (let i = 0; i < arr.length - 1; i++) {
          let minInd = i;
          for (let j = i + 1; j < arr.length; j++) {
            arr[i].state = ElementStates.Changing;
            arr[j].state = ElementStates.Changing;
            setArr([...arr]);
            await delay(DELAY_IN_MS);
            if (arr[j].value < arr[minInd].value) {
              minInd = j;
            }
            arr[j].state = ElementStates.Default;
            setArr([...arr]);
          }
          swap(arr, i, minInd);
          arr[i].state = ElementStates.Modified;
        }
        arr[arr.length - 1].state = ElementStates.Modified;
        setArr([...arr]);
      } else {
        for (let i = 0; i < arr.length - 1; i++) {
          let maxInd = i;
          for (let j = i + 1; j < arr.length; j++) {
            arr[i].state = ElementStates.Changing;
            arr[j].state = ElementStates.Changing;
            setArr([...arr]);
            await delay(DELAY_IN_MS);
            if (arr[j].value > arr[maxInd].value) {
              maxInd = j;
            }
            arr[j].state = ElementStates.Default;
            setArr([...arr]);
          }

          swap(arr, i, maxInd);
          arr[i].state = ElementStates.Modified;
        }
        arr[arr.length - 1].state = ElementStates.Modified;
        setArr([...arr]);
      }
    }
    setIsLoad(false);
    setDisabled(false);
  };

  const bubbleSort = async (arr: NumberData[], direction: Direction) => {
    setIsLoad(true);
    if (arr.length > 1) {
      if (direction === Direction.Ascending) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            setArr([...arr]);
            await delay(DELAY_IN_MS);
            if (arr[j].value > arr[j + 1].value) {
              swap(arr, j, j + 1);
            }
            arr[j].state = ElementStates.Default;
          }
          arr[arr.length - i - 1].state = ElementStates.Modified;
          setArr([...arr]);
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            setArr([...arr]);
            await delay(DELAY_IN_MS);
            if (arr[j].value < arr[j + 1].value) {
              swap(arr, j, j + 1);
            }
            arr[j].state = ElementStates.Default;
          }
          arr[arr.length - i - 1].state = ElementStates.Modified;
          setArr([...arr]);
        }
      }
    }
    setIsLoad(false);
    setDisabled(false);
  };

  const selectBubbleSort = () => {
    setSortName("пузырек");
  };

  const selectSelectionSort = () => {
    setSortName("выбор");
  };

  const handleAscendingSort = () => {
    setDirection(Direction.Ascending);
    setDisabled(true);
    if (sortName === "выбор") {
      selectionSort(arr, Direction.Ascending);
    } else {
      bubbleSort(arr, Direction.Ascending);
    }
  };

  const handleDescendingSort = () => {
    setDisabled(true);
    setDirection(Direction.Descending);
    if (sortName === "выбор") {
      selectionSort(arr, Direction.Descending);
    } else {
      bubbleSort(arr, Direction.Descending);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sort}>
        <RadioInput
          label="Выбор"
          value="выбор"
          checked={sortName === "выбор" ? true : false}
          onChange={selectSelectionSort}
        />
        <RadioInput
          label="Пузырек"
          extraClass={styles.radio}
          value="пузырек"
          checked={sortName === "пузырек" ? true : false}
          onChange={selectBubbleSort}
        />
        <Button
          sorting={Direction.Ascending}
          text="По возрастанию"
          onClick={handleAscendingSort}
          isLoader={direction === Direction.Ascending && isLoad ? true : false}
          disabled={disabled}
        />
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          extraClass={styles.button}
          onClick={handleDescendingSort}
          isLoader={direction === Direction.Descending && isLoad ? true : false}
          disabled={disabled}
        />
        <Button
          text="Новый массив"
          onClick={generateArray}
          disabled={disabled}
        />
      </div>
      <div className={styles.columns}>
        {arr &&
          arr.map((el, i) => {
            return (
              <Column
                key={i}
                index={el.value}
                extraClass={styles.column}
                state={el.state}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
