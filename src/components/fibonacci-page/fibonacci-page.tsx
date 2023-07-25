import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { getFibonacciNumbers } from "./utils";
import { MIN_LENGTH,MAX } from "../../constants/lengths";

export const FibonacciPage: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);
  const [circleNumArray, setCircleNumArray] = useState<Array<number>>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const numberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === "" ||
      Number(e.target.value) > MAX ||
      Number(e.target.value) <= MIN_LENGTH
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    setNum(Number(e.target.value));
  };

  const handleButton = async () => {
    setIsLoad(true);
    const arr = getFibonacciNumbers(num);
    for (let i = 0; i < arr.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setCircleNumArray(arr.slice(0, i + 1));
    }
    setIsLoad(false);
  };

  const justifyStyle =
    circleNumArray && circleNumArray.length < 10
      ? { justifyContent: "center" }
      : { justifyContent: "flex-start" };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <Input
          isLimitText={true}
          max={MAX}
          type="number"
          onChange={numberChange}
        />
        <Button
          text="Рассчитать"
          extraClass={styles.button}
          onClick={handleButton}
          isLoader={isLoad}
          disabled={buttonDisabled}
        />
      </div>
      <div className={styles.circles} style={justifyStyle}>
        {circleNumArray &&
          circleNumArray.map((el, i) => {
            return (
              <Circle
                key={i}
                letter={el.toString()}
                state={ElementStates.Default}
                index={i}
                extraClass={styles.circe}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
