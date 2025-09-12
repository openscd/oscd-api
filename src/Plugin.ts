import { EditV2 } from './editv2.js';
import { Transactor } from './Transactor.js';

/**
 * OpenSCD core communicates the data necessary for editing SCL documents by setting the
 * following [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) on
 * the plugin's [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
 *
 * @property docs - A map of document names to their loaded XMLDocument instances.
 * @property doc - The XMLDocument currently being edited, if any.
 * @property docName - The name of the currently edited document, if any.
 * @property docVersion - changes value when the document is modified.
 * @property locale - The end user's selected locale.
 */
export interface Plugin {
  editor: Transactor<EditV2>;
  docs: Record<string, XMLDocument>;
  doc?: XMLDocument; // the document currently being edited
  docName?: string; // the current doc's name
  docVersion: unknown; // changes when the document is modified
  locale: string; // the end user's chosen locale
}
