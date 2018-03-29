import React from "react";
import { render, Simulate, wait } from "react-testing-library";
import Rehover from "../lib/index";

let testingUtilities;

describe("Testing the normal working", () => {
  beforeAll(() => {
    testingUtilities = render(
      <Rehover delay={150}>
        <p source="true">Source React element</p>
        <div destination="true">Destination React element</div>
      </Rehover>
    );
  });

  test("Check Source react element presence and check destination is not present", done => {
    expect(
      testingUtilities.getByText("Source React element").textContent
    ).toEqual("Source React element");
    expect(
      testingUtilities.queryByText("Destination React element")
    ).toBeNull();
    done();
  });

  test("Check presence of destination when MouseEntering", done => {
    Simulate.mouseEnter(testingUtilities.getByText("Source React element"));
    expect(
      testingUtilities.getByText("Destination React element").textContent
    ).toEqual("Destination React element");
    done();
  });

  test("SnapShot", async done => {
    Simulate.mouseLeave(testingUtilities.getByText("Source React element"));
    expect(testingUtilities.container).toMatchSnapshot();
    done();
  });
});

//Check the presence of element on entering the source point
