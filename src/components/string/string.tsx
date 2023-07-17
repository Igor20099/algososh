import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { stringData } from "../../types/string-data";
import { delay, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [data, setData] = useState<stringData[]>([]);
  const [word, setWord] = useState<string>("");

  const wordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  
  const reverseWord = async (arr: stringData[]) => {
    setIsLoad(true);
    const mid = Math.ceil(arr.length / 2);

    for (let i = 0; i < mid; i++) {
      let j = arr.length - 1 - i;

      if (i !== j) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setData([...arr]);
        await delay(DELAY_IN_MS);
      }

      swap(arr, i, j);

      arr[i].state = ElementStates.Modified;
      arr[j].state = ElementStates.Modified;

      setData([...arr]);
    }
    setIsLoad(false);
  };

  const handleButton = () => {
    const newArr = word
      .split("")
      .map((value) => ({ value, state: ElementStates.Default }));
    reverseWord(newArr);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <Input isLimitText={true} maxLength={11} onChange={wordChange} />
        <Button
          text="Развернуть"
          extraClass={styles.button}
          isLoader={isLoad}
          onClick={handleButton}
        />
      </div>
      <div className={styles.circles}>
        {data.map((el) => {
          return (
            <Circle
              letter={el.value}
              state={el.state}
              extraClass={styles.circe}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
