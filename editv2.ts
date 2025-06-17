/** Intent to `parent.insertBefore(node, reference)` */
export type Insert = {
  parent: Node;
  node: Node;
  reference: Node | null;
};

/** Intent to remove a `node` from its `ownerDocument` */
export type Remove = {
  node: Node;
};

/** Intent to set the `textContent` of `element` */
export type SetTextContent = {
  element: Element;
  textContent: string;
};

export type Attributes = Partial<Record<string, string | null>>;

export type AttributesNS = Partial<Record<string, Attributes>>;

/** Intent to set or remove (if `null`) `attributes`(-`NS`) on `element` */
export type SetAttributes = {
  element: Element;
  attributes: Partial<Record<string, string | null>>;
  attributesNS: Partial<Record<string, Partial<Record<string, string | null>>>>;
};

/** Intent to change some XMLDocuments */
export type EditV2 =
  | Insert
  | SetAttributes
  | SetTextContent
  | Remove
  | EditV2[];

export function isAttributes(attributes: unknown): attributes is Attributes {
  if (typeof attributes !== 'object' || attributes === null) {
    return false;
  }
  return Object.entries(attributes).every(
    ([key, value]) =>
      typeof key === 'string' && (value === null || typeof value === 'string'),
  );
}

export function isAttributesNS(
  attributesNS: unknown,
): attributesNS is AttributesNS {
  if (typeof attributesNS !== 'object' || attributesNS === null) {
    return false;
  }
  return Object.entries(attributesNS).every(
    ([namespace, attributes]) =>
      typeof namespace === 'string' &&
      isAttributes(attributes as Record<string, string | null>),
  );
}

export function isComplexEditV2(edit: unknown): edit is EditV2[] {
  return edit instanceof Array && edit.every(e => isEditV2(e));
}

export function isSetTextContent(edit: unknown): edit is SetTextContent {
  return (
    (edit as SetTextContent).element instanceof Element &&
    typeof (edit as SetTextContent).textContent === 'string'
  );
}

export function isRemove(edit: unknown): edit is Remove {
  return (
    (edit as Insert).parent === undefined &&
    (edit as Remove).node instanceof Node
  );
}

export function isSetAttributes(edit: unknown): edit is SetAttributes {
  return (
    (edit as SetAttributes).element instanceof Element &&
    isAttributes((edit as SetAttributes).attributes) &&
    isAttributesNS((edit as SetAttributes).attributesNS)
  );
}

export function isInsert(edit: unknown): edit is Insert {
  return (
    ((edit as Insert).parent instanceof Element ||
      (edit as Insert).parent instanceof Document ||
      (edit as Insert).parent instanceof DocumentFragment) &&
    (edit as Insert).node instanceof Node &&
    ((edit as Insert).reference instanceof Node ||
      (edit as Insert).reference === null)
  );
}

export function isEditV2(edit: unknown): edit is EditV2 {
  if (isComplexEditV2(edit)) {
    return true;
  }

  return (
    isSetAttributes(edit) ||
    isSetTextContent(edit) ||
    isInsert(edit) ||
    isRemove(edit)
  );
}
