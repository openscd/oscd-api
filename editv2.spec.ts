import { expect } from '@open-wc/testing';

import { Update } from './editv1.js';
import {
  Insert,
  isEditV2,
  Remove,
  SetAttributes,
  SetTextContent,
} from './editv2.js';

const element = new DOMParser().parseFromString(
  '<SCL />',
  'application/xml',
)!.documentElement;

const update: Update = {
  element,
  attributes: {
    attr1: { namespaceURI: 'http://myns.com', value: 'new value' },
  },
};
const insert: Insert = { parent: element, node: element, reference: null };
const remove: Remove = { node: element };
const setAttributes: SetAttributes = {
  element,
  attributes: { name: 'value' },
  attributesNS: { namespaceURI: { name: 'value' } },
};
const setTextContent: SetTextContent = { element, textContent: '' };

describe('isEditV2', () => {
  it('returns false for invalid Edit type', () =>
    expect('invalid edit').to.not.satisfy(isEditV2));

  it('returns false for Update', () => expect(update).to.not.satisfy(isEditV2));

  it('returns true for Insert', () => expect(insert).to.satisfy(isEditV2));

  it('returns true for Remove', () => expect(remove).to.satisfy(isEditV2));

  it('returns true for SetAttributes', () =>
    expect(setAttributes).to.satisfy(isEditV2));

  it('returns true for SetTextContent', () =>
    expect(setTextContent).to.satisfy(isEditV2));

  it('returns false for a mixed edit and editV2 array', () =>
    expect([update, setAttributes]).to.not.satisfy(isEditV2));

  it('returns false for edit array', () =>
    expect([update, update]).to.not.satisfy(isEditV2));

  it('returns true for editV2 array', () =>
    expect([setAttributes, remove, insert, setTextContent]).to.satisfy(
      isEditV2,
    ));
});
