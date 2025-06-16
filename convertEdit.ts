import {
  Edit,
  isComplex,
  isInsert,
  isNamespaced,
  isUpdate,
  isRemove,
  Update,
} from './editv1.js';

import { EditV2 } from './editv2.js';

function convertUpdate(edit: Update): EditV2 {
  const attributes: Partial<Record<string, string | null>> = {};
  const attributesNS: Partial<
    Record<string, Partial<Record<string, string | null>>>
  > = {};

  Object.entries(edit.attributes).forEach(([key, value]) => {
    if (isNamespaced(value!)) {
      const ns = value.namespaceURI;
      if (!ns) {
        return;
      }

      if (!attributesNS[ns]) {
        attributesNS[ns] = {};
      }
      attributesNS[ns][key] = value.value;
    } else {
      attributes[key] = value;
    }
  });

  return { element: edit.element, attributes, attributesNS };
}

export function convertEdit(edit: Edit): EditV2 {
  if (isRemove(edit)) {
    return edit as EditV2;
  }
  if (isInsert(edit)) {
    return edit as EditV2;
  }
  if (isUpdate(edit)) {
    return convertUpdate(edit);
  }
  if (isComplex(edit)) {
    return edit.map(convertEdit);
  }

  return [];
}
