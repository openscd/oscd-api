import { Edit } from './editv1.js';

export type EditEvent<E extends Edit = Edit> = CustomEvent<E>;

export function newEditEvent<E extends Edit>(edit: E): EditEvent<E> {
  return new CustomEvent<E>('oscd-edit-v2', {
    composed: true,
    bubbles: true,
    detail: edit,
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit']: EditEvent<Edit>;
  }
}
