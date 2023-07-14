import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");
  const [elementState,setElementState] = useState<ElementStates>(ElementStates.Default)

  const wordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
     setWord(e.target.value)
  }
  const reverseword = () => {
    setIsLoad(true);
    setLetters(word.split(''));
    setIsLoad(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <Input isLimitText={true} maxLength={11} onChange={wordChange}/>
        <Button
          text="Развернуть"
          extraClass={styles.button}
          isLoader={isLoad}
          onClick={reverseword}
        />
      </div>
      <div className={styles.circles}>
        {letters.map((el) => {
          return <Circle letter={el} state={elementState} extraClass={styles.circe}/>;
        })}
      </div>
    </SolutionLayout>
  );
};
