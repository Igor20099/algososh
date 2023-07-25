import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "../../utils/queue";
import { QueueData } from "../../types/queue-data";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queue, setQueue] = useState(new Queue<QueueData>(7));
  const [queueArr, setQueueArr] = useState<QueueData[]>([]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setQueueArr(
      Array.from({ length: 7 }, () => ({
        value: "",
        state: ElementStates.Default,
      }))
    );
  }, []);

  const handleAdd = async () => {
    if (inputValue) {
      setInputValue("");
      queue.enqueue({ value: inputValue, state: ElementStates.Default });
      setQueue(queue);
      queueArr[queue.getTail() - 1] = {
        value: "",
        state: ElementStates.Changing,
      };
      setQueueArr([...queueArr]);
      await delay(SHORT_DELAY_IN_MS);
      queueArr[queue.getTail() - 1] = {
        value: inputValue,
        state: ElementStates.Changing,
      };
      setQueueArr([...queueArr]);
      queueArr[queue.getTail() - 1] = {
        value: inputValue,
        state: ElementStates.Default,
      };
      setQueueArr([...queueArr]);
    }
  };

  const handleDelete = async () => {
    queue.dequeue();
    setQueue(queue);
    queueArr[queue.getHead() - 1] = {
      value: queueArr[queue.getHead() - 1].value,
      state: ElementStates.Changing,
    };
    setQueueArr([...queueArr]);
    await delay(SHORT_DELAY_IN_MS);
    queueArr[queue.getHead() - 1] = { value: "", state: ElementStates.Default };
    setQueueArr([...queueArr]);
    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      queueArr[queue.getHead() - 1] = {
        value: "",
        state: ElementStates.Default,
      };
      setQueueArr([...queueArr]);
    }
  };

  const handleClear = () => {
    queue.clear();
    setQueue(queue);
    setQueueArr(
      Array.from({ length: 7 }, () => ({
        value: "",
        state: ElementStates.Default,
      }))
    );
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queue}>
        <Input
          maxLength={4}
          isLimitText={true}
          type="text"
          extraClass={styles.input}
          value={inputValue}
          onChange={changeValue}
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
          disabled={queue.isEmpty()}
        />
        <Button
          text="Очистить"
          onClick={handleClear}
          disabled={queue.isEmpty()}
        />
      </div>
      <div className={styles.circles}>
        {queueArr &&
          queueArr.map((el, i) => {
            return (
              <Circle
                key={i}
                index={i}
                letter={el.value}
                state={el.state}
                extraClass={styles.circle}
                head={!queue.isEmpty() && i === queue.getHead() ? "head" : ""}
                tail={
                  !queue.isEmpty() && i === queue.getTail() - 1 ? "tail" : ""
                }
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
