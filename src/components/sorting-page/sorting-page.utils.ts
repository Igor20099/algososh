import { NumberData } from "../../types/number-data";
import { ElementStates } from "../../types/element-states";

export function generateRandomArray(minValue: number = 0, maxValue: number = 99): NumberData[] {
    const arr: NumberData[] = [];
    const randomNum = Math.floor(Math.random() * 15) + 3;
    for (let i = 0; i < randomNum; i++) {
      const randomNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      arr.push({ value: randomNum, state: ElementStates.Default });
    }
    
    return arr;
  }