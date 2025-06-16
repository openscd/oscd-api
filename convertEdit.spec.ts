/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from '@open-wc/testing';

import { Insert, Remove, Update } from './editv1.js';

import { convertEdit } from './convertEdit.js';
import { SetAttributes } from './editv2.js';

const doc = new DOMParser().parseFromString(
  '<SCL><Substation name="AA1"></Substation></SCL>',
  'application/xml',
);

const subSt = doc.querySelector('Substation')!;

const removeV1: Remove = { node: subSt };

const insertV1: Insert = {
  parent: subSt,
  node: doc.createAttribute('VoltageLevel'),
  reference: null,
};

const update: Update = {
  element: subSt,
  attributes: {
    name: 'A2',
    desc: null,
    ['__proto__']: 'a string',
    'myns:attr': {
      value: 'value1',
      namespaceURI: 'http://example.org/myns',
    },
    'myns:attr2': {
      value: 'value1',
      namespaceURI: 'http://example.org/myns',
    },
    attr: {
      value: 'value2',
      namespaceURI: 'http://example.org/myns2',
    },
    attr2: {
      value: 'value2',
      namespaceURI: 'http://example.org/myns2',
    },
    attr3: {
      value: 'value3',
      namespaceURI: null,
    },
  },
};

const setAttributes: SetAttributes = {
  element: subSt,
  attributes: {
    name: 'A2',
    desc: null,
  },
  attributesNS: {
    'http://example.org/myns': {
      'myns:attr': 'value1',
      'myns:attr2': 'value1',
    },
    'http://example.org/myns2': {
      attr: 'value2',
      attr2: 'value2',
    },
  },
};

const invalidEdit = { someWrongKey: 'someValue' } as unknown as Update;

describe('convertEditToEditV2', () => {
  it('passes through a Remove edit', () =>
    expect(convertEdit(removeV1)).to.deep.equal(removeV1));

  it('passes through a Insert edit', () =>
    expect(convertEdit(insertV1)).to.deep.equal(insertV1));

  it('converts Update to SetAttributes', () =>
    expect(convertEdit(update)).to.deep.equal(setAttributes));

  it('converts complex edits', () => {
    const editsV1 = [removeV1, insertV1, update];

    const editsV2 = convertEdit(editsV1);

    const [removeV2, insertV2, updateV2] = Array.from(
      editsV2 as Array<Remove | Insert | SetAttributes>,
    );

    expect(removeV1).to.deep.equal(removeV2);
    expect(insertV1).to.deep.equal(insertV2);
    expect(updateV2).to.deep.equal(setAttributes);
  });

  it('return empty array for invalid edit', () => {
    expect(convertEdit(invalidEdit)).to.be.an('array').that.is.empty;
  });
});
