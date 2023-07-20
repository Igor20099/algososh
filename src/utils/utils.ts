import { NumberData } from "../types/number-data";
import { ElementStates } from "../types/element-states";

export function swap<T>(arr: T[], firstIndex: number, secondIndex: number) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
}

export async function delay(milliseconds:number) {
    return new Promise((resolve) => {
        setTimeout(resolve,milliseconds)
    })
}

export const getFibArray = (n: number) : number[] => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  export function generateRandomArray(minValue: number = 0, maxValue: number = 100): NumberData[] {
    const arr: NumberData[] = [];
    const randomNum = Math.floor(Math.random() * 15) + 3;
    for (let i = 0; i < randomNum; i++) {
      const randomNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      arr.push({ value: randomNum, state: ElementStates.Default });
    }
    
    return arr;
  }

  
  
