import { EditV2 } from './editv2.js';
import { Transactor } from './Transactor.js';

/**
 * A [BCP 47](https://www.rfc-editor.org/info/bcp47) language tag, for example `en` or `de-AT`.
 *
 * TypeScript cannot validate that grammar, so this remains a string. A more
 * specific tag wins over a broader one: `de-AT`, then `de`, then the US
 * English `name` and `description` on the {@link PluginDescriptor}.
 */
export type Bcp47Tag = string;

/**
 * A translation string, or a named group of translation strings.
 * Groups may contain further groups, to any depth.
 */
export type TranslationTree = {
  [key: string]: string | TranslationTree;
};

/**
 * The strings for one {@link Bcp47Tag}.
 *
 * `name` and `description` override the US English fields of the
 * {@link PluginDescriptor}. Every other key is a plugin-defined string or a
 * nested group, for example `myPlugin.title`. An i18n library that reads
 * nested catalogs can load this object as-is.
 */
export interface PluginLocale {
  /** Localized plugin name. Overrides {@link PluginDescriptor.name}. */
  name?: string;

  /** Localized description. Overrides {@link PluginDescriptor.description}. */
  description?: string;

  /** Further strings or nested groups for this locale. */
  [message: string]: string | TranslationTree | undefined;
}

/**
 * Kept so descriptions written before `validator` was retired still type-check.
 *
 * @deprecated Do not use `validator` for a new plugin. It remains only for
 * backward compatibility.
 */
export type ValidatorPluginKind = 'validator';

/**
 * How the host presents a plugin.
 *
 * `menu` is an action in a menu. `editor` is an editor surface.
 * `background` is loaded without its own visible surface. `validator` is
 * {@link ValidatorPluginKind} and is deprecated.
 */
export type PluginKind = 'menu' | 'editor' | 'background' | ValidatorPluginKind;

/**
 * One plugin, as passed to a plugin that reads {@link Plugin.plugins}.
 *
 * The map key is the tag name and is not repeated here. That key is the
 * plugin's identity. `src` only says where the host loads it from, so the
 * same URL may appear on more than one entry.
 */
export interface PluginDescriptor {
  /** US English display name. */
  name: string;

  /**
   * URL the host loads this plugin from.
   *
   * A relative {@link PluginDescriptor.icon} is resolved against this URL.
   */
  src: string;

  /** US English description of what the plugin does. */
  description?: string;

  /**
   * Icon shown for the plugin.
   *
   * A Material Symbols identifier, an absolute URL, or a path relative to
   * {@link PluginDescriptor.src}.
   */
  icon?: string;

  /**
   * How the host presents the plugin.
   *
   * The value `validator` is deprecated and is accepted only so older
   * descriptions still type-check.
   */
  kind?: PluginKind;

  /**
   * Localized strings for this plugin, keyed by {@link Bcp47Tag}.
   *
   * A more specific tag overrides a broader one, and both override the US
   * English `name` and `description` on this descriptor.
   */
  translations?: Record<Bcp47Tag, PluginLocale>;

  /**
   * Values outside the shared plugin API.
   *
   * The key names the owner, for example `CoMPAS`. Only that owner reads the
   * value. The shared API does not interpret it, so concerns such as
   * `origin` stay here instead of becoming fields of their own.
   */
  extensions?: Record<string, unknown>;
}

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
 * @property plugins - The plugins passed in by the host. Most plugins never read this.
 */
export interface Plugin {
  editor: Transactor<EditV2>;
  docs: Record<string, XMLDocument>;
  doc?: XMLDocument; // the document currently being edited
  docName?: string; // the current doc's name
  docVersion: unknown; // changes when the document is modified
  locale: string; // the end user's chosen locale

  /**
   * The plugins the host passes in. Only a plugin that must know the whole
   * set reads this. The host may omit it.
   *
   * Each key is the plugin's tag name and is its identity. Write keys as
   * slugs: lowercase letters, digits, and `-` only, for example `oscd-ied`.
   *
   * This is the runtime value. It is not the distribution's plugin list,
   * which may describe a different set.
   */
  plugins?: Record<string, PluginDescriptor>;
}
