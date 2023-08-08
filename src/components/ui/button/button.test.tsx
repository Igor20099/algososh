import { Button } from "./button";

import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("Button", () => {
  it("Корректно отображается текст на кнопку", () => {
    const tree = renderer.create(<Button text="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Корректно не отображается текст на кнопке", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест заблокированной кнопки", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест кнопки с индикацией загрузки", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Проверка вызова колбека при клике на кнопку", () => {
    const callBack = jest.fn();
    render(<Button onClick={callBack} />);
    fireEvent.click(screen.getByRole("button"));
    expect(callBack).toHaveBeenCalled();
  });
});
