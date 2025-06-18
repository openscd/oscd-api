export {
  isAttributesV2,
  isAttributesNS,
  isComplexEditV2,
  isEditV2,
  isInsert,
  isRemove,
  isSetAttributes,
  isSetTextContent,
} from './editv2.js';

export {
  isAttributes,
  isComplexEdit,
  isEdit,
  isNamespaced,
  isUpdate,
} from './editv1.js';

export { convertEdit } from './convertEdit.js';

export { newEditEvent } from './edit-event.js';

export { newEditEventV2 } from './edit-event-v2.js';

export { newOpenEvent } from './open-event.js';
