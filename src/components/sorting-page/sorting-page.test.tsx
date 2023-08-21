import { bubbleSort, selectionSort } from "./sorting-page";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const arrayWithOneElement = [{ value: 1, state: ElementStates.Default }];

const arrayWithSomeElements = [
  { value: 0, state: ElementStates.Modified },
  { value: 10, state: ElementStates.Modified },
  { value: 4, state: ElementStates.Modified },
  { value: 5, state: ElementStates.Modified },
  { value: 8, state: ElementStates.Modified },
];

const resultArrayWithSomeElementsAscending = [
  { value: 0, state: ElementStates.Modified },
  { value: 4, state: ElementStates.Modified },
  { value: 5, state: ElementStates.Modified },
  { value: 8, state: ElementStates.Modified },
  { value: 10, state: ElementStates.Modified },
];

const resultArrayWithSomeElementsDescending = [
  { value: 10, state: ElementStates.Modified },
  { value: 8, state: ElementStates.Modified },
  { value: 5, state: ElementStates.Modified },
  { value: 4, state: ElementStates.Modified },
  { value: 0, state: ElementStates.Modified },
];

const setArr = jest.fn();
const setIsLoad = jest.fn();
const setDisabled = jest.fn();

jest.setTimeout(30000);

describe("Select sort Ascending", () => {
  it("Корректно сортирует пустой массив по возрастанию", async () => {
    await selectionSort(
      [],
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Ascending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Корректно сортирует один элемент в массиве по возрастанию", async () => {
    await selectionSort(
      arrayWithOneElement,
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Ascending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Корректно сортирует несколько элементов в массиве по возрастанию", async () => {
    await selectionSort(
      arrayWithSomeElements,
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Ascending
    );
    expect(setArr).toHaveBeenLastCalledWith(
      resultArrayWithSomeElementsAscending
    );
  });
});

describe("Select sort Descending", () => {
  it("Корректно сортирует пустой массив по убыванию", async () => {
    await selectionSort(
      [],
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Descending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Корректно сортирует один элемент в массиве по убыванию", async () => {
    await selectionSort(
      arrayWithOneElement,
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Descending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Корректно сортирует несколько элементов в массиве по убыванию", async () => {
    await selectionSort(
      arrayWithSomeElements,
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Descending
    );
    expect(setArr).toHaveBeenLastCalledWith(
      resultArrayWithSomeElementsDescending
    );
  });
});

describe("Bubble sort Ascending", () => {
  it("Корректно сортирует пустой массив по возрастанию", async () => {
    await bubbleSort([], setArr, setIsLoad, setDisabled, Direction.Ascending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Корректно сортирует один элемент в массиве по возрастанию", async () => {
    await bubbleSort(
      arrayWithOneElement,
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Ascending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Корректно сортирует несколько элементов в массиве по возрастанию", async () => {
    await bubbleSort(
      arrayWithSomeElements,
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Ascending
    );
    expect(setArr).toHaveBeenLastCalledWith(
      resultArrayWithSomeElementsAscending
    );
  });
});

describe("Buble sort Descending", () => {
  it("Корректно сортирует пустой массив по убыванию", async () => {
    await bubbleSort([], setArr, setIsLoad, setDisabled, Direction.Descending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Корректно сортирует один элемент в массиве по убыванию", async () => {
    await bubbleSort(
      arrayWithOneElement,
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Descending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("Корректно сортирует несколько элементов в массиве по убыванию", async () => {
    await bubbleSort(
      arrayWithSomeElements,
      setArr,
      setIsLoad,
      setDisabled,
      Direction.Descending
    );
    expect(setArr).toHaveBeenLastCalledWith(
      resultArrayWithSomeElementsDescending
    );
  });
});
