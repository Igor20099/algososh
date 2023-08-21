import { ElementStates } from '../../types/element-states';

import { reverseWord } from './string';

const setData = jest.fn();
const setIsLoad = jest.fn();

describe('String', () => {
    it("Корректно разворачивает строку с чётным количеством символов", async () => {
        const string = 'word';
        const reverseString = 'drow';
        await reverseWord(string.split('').map((value => ({ value, state: ElementStates.Default }))), setData, setIsLoad );
        expect(setData).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, state: ElementStates.Modified }))));
    });

    it("Корректно разворачивает строку с нечетным количеством символов", async () => {
        const string = 'world';
        const reverseString = 'dlrow';
        await reverseWord(string.split('').map((value => ({ value, state: ElementStates.Default }))), setData, setIsLoad);
        expect(setData).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, state: ElementStates.Modified }))));
    });

    it("Корректно разворачивает строку с одним символом", async () => {
        const string = 'a';
        const reverseString = 'a';
        await reverseWord(string.split('').map((value => ({ value, state: ElementStates.Default }))), setData, setIsLoad);
        expect(setData).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, state: ElementStates.Modified }))));
    });

    it("Проверка на пустую строку", async () => {
        const string = '';
        await reverseWord(string.split('').map((value => ({ value, state: ElementStates.Default }))), setData, setIsLoad);
        expect(setData).toHaveBeenCalledTimes(0);
    });
});