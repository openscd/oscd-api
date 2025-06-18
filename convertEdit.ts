import {
  Edit,
  isComplexEdit,
  isNamespaced,
  isUpdate,
  Update,
} from './editv1.js';

import {
  AttributesV2,
  AttributesNS,
  EditV2,
  isInsert,
  isRemove,
} from './editv2.js';

function convertUpdate(edit: Update): EditV2 {
  const attributes: AttributesV2 = {};
  const attributesNS: AttributesNS = {};

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
  if (isComplexEdit(edit)) {
    return edit.map(convertEdit);
  }

  return [];
}
