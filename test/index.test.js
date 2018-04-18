import React from "react";
import { render, Simulate, wait } from "react-testing-library";
import { Rehover } from "../lib/main";
import ReactTestRenderer from "react-test-renderer";

let testingUtilities;
let Source;
let ShotRenderer;

describe("Testing Rehover with Children Compound", () => {
  describe("Testing the normal working", () => {
    beforeAll(() => {
      testingUtilities = render(
        <Rehover delay={150}>
          <p source="true">Source React element</p>
          <div destination="true">Destination React element</div>
        </Rehover>
      );
      Source = testingUtilities.getByText("Source React element");
    });

    test("Check Source react element presence and check destination is not present", () => {
      expect(Source.textContent).toEqual("Source React element");
      expect(
        testingUtilities.queryByText("Destination React element")
      ).toBeNull();
    });

    test("Check presence of destination when MouseEntering", () => {
      Simulate.mouseEnter(Source);
      expect(
        testingUtilities.getByText("Destination React element").textContent
      ).toEqual("Destination React element");
    });

    test("Check when MouseEntering the destination", () => {
      //Simulate.mouseLeave(Source);
      Simulate.mouseEnter(
        testingUtilities.getByText("Destination React element")
      );
      expect(
        testingUtilities.getByText("Destination React element").textContent
      ).toEqual("Destination React element");
    });

    test("Aria Compatibility, close with Arrow Up", () => {
      Simulate.keyDown(Source, { keyCode: 38 });
      expect(
        testingUtilities.queryByText("Destination React element")
      ).toBeNull();
    });

    test("Aria Compatibility, Open with Arrow Down", () => {
      Simulate.keyDown(Source, { keyCode: 40 });
      expect(
        testingUtilities.getByText("Destination React element").textContent
      ).toEqual("Destination React element");
    });

    describe("Snapshot testing...", () => {
      beforeAll(() => {
        ShotRenderer = ReactTestRenderer.create(
          <Rehover delay={150}>
            <p source="true">Source React element</p>
            <div destination="true">Destination React element</div>
          </Rehover>
        );
      });

      test("Shot both children nodes, when mouseEntering", () => {
        ShotRenderer.root.findByType("p").props.onMouseEnter();
        expect(ShotRenderer.toJSON()).toMatchSnapshot();
      });

      test("Shot Only Source, when MouseLeaving", () => {
        ShotRenderer.root.instance.setState({ isOnSource: false });
        expect(ShotRenderer.toJSON()).toMatchSnapshot();
      });

      test("Shot Props passed", () => {
        expect(ShotRenderer.root.instance.props).toMatchSnapshot();
      });
    });
  });
});

describe("Testing Rehover with Context compound", () => {});
