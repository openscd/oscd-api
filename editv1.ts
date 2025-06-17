import { isInsert, isRemove, Insert, Remove } from './editv2.js';

export type NamespacedAttributeValue = {
  value: string | null;
  namespaceURI: string | null;
};

export type AttributeValue = string | null | NamespacedAttributeValue;

export type AttributesV1 = Partial<Record<string, AttributeValue>>;

/** Intent to set or remove (if null) attributes on element */
export type Update = {
  element: Element;
  attributes: Partial<Record<string, AttributeValue>>;
};

/** Represents the user's intent to change an XMLDocument */
export type Edit = Insert | Update | Remove | Edit[];

export function isNamespaced(
  value: unknown,
): value is NamespacedAttributeValue {
  return (
    value !== null &&
    typeof value === 'object' &&
    'namespaceURI' in value &&
    typeof value.namespaceURI === 'string' &&
    'value' in value &&
    typeof value.value === 'string'
  );
}

export function isAttributesV1(
  attributes: unknown,
): attributes is AttributesV1 {
  if (attributes === null || typeof attributes !== 'object') {
    return false;
  }

  return Object.entries(attributes).every(
    ([key, value]) =>
      typeof key === 'string' &&
      (value === null || typeof value === 'string' || isNamespaced(value)),
  );
}

export function isComplexEdit(edit: unknown): edit is Edit[] {
  return edit instanceof Array && edit.every(isEdit);
}

export function isUpdate(edit: unknown): edit is Update {
  return (
    (edit as Update).element instanceof Element &&
    isAttributesV1((edit as Update).attributes)
  );
}

export function isEdit(edit: unknown): edit is Edit {
  if (isComplexEdit(edit)) {
    return true;
  }

  return isUpdate(edit) || isInsert(edit) || isRemove(edit);
}
