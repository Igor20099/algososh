
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
