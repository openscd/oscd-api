import { expect } from "@open-wc/testing";

import { isEdit, Update } from "./editv1.js";
import { Insert, Remove, SetAttributes, SetTextContent } from "./editv2.js";

const element = new DOMParser().parseFromString(
  "<SCL />",
  "application/xml",
)!.documentElement;

const update: Update = { element, attributes: {} };
const insert: Insert = { parent: element, node: element, reference: null };
const remove: Remove = { node: element };
const setAttributes: SetAttributes = {
  element,
  attributes: {},
  attributesNS: {},
};
const setTextContent: SetTextContent = { element, textContent: "" };

describe("type guard functions for editv1", () => {
  it("returns false on invalid Edit type", () =>
    expect("invalid edit").to.not.satisfy(isEdit));

  it("returns false on Update", () => expect(update).to.satisfy(isEdit));

  it("returns true for Insert", () => expect(insert).to.satisfy(isEdit));

  it("returns true for Remove", () => expect(remove).to.satisfy(isEdit));

  it("returns false for SetAttributes", () =>
    expect(setAttributes).to.not.satisfy(isEdit));

  it("returns true for SetTextContent", () =>
    expect(setTextContent).to.not.satisfy(isEdit));

  it("returns false on mixed edit and editV2 array", () =>
    expect([update, setAttributes]).to.not.satisfy(isEdit));

  it("returns true on edit array", () =>
    expect([update, remove, insert]).to.satisfy(isEdit));

  it("returns false on editV2 array", () =>
    expect([setAttributes, remove, insert, setTextContent]).to.not.satisfy(
      isEdit,
    ));
});
