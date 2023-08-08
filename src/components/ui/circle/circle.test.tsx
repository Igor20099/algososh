import { Circle } from "./circle";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe("Circle", () => {
  it("Тест без буквы", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест c буквой", () => {
    const tree = renderer.create(<Circle letter="word" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест c head", () => {
    const tree = renderer.create(<Circle head="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест с react-элементом в head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест с tail", () => {
    const tree = renderer.create(<Circle tail="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест с react-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест с пропом isSmall ===  true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест в состоянии default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест в состоянии changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тест в состоянии modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
