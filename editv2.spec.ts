import { expect } from "@open-wc/testing";

import { Update } from "./editv1.js";
import {
  Insert,
  isEditV2,
  Remove,
  SetAttributes,
  SetTextContent,
} from "./editv2.js";

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

describe("type guard functions for editv2", () => {
  it("returns false on invalid Edit type", () =>
    expect("invalid edit").to.not.satisfy(isEditV2));

  it("returns false on Update", () => expect(update).to.not.satisfy(isEditV2));

  it("returns true for Insert", () => expect(insert).to.satisfy(isEditV2));

  it("returns true for Remove", () => expect(remove).to.satisfy(isEditV2));

  it("returns true for SetAttributes", () =>
    expect(setAttributes).to.satisfy(isEditV2));

  it("returns true for SetTextContent", () =>
    expect(setTextContent).to.satisfy(isEditV2));

  it("returns false on mixed edit and editV2 array", () =>
    expect([update, setAttributes]).to.not.satisfy(isEditV2));

  it("returns false on edit array", () =>
    expect([update, update]).to.not.satisfy(isEditV2));

  it("returns true on editV2 array", () =>
    expect([setAttributes, remove, insert, setTextContent]).to.satisfy(
      isEditV2,
    ));
});
