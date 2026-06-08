# How OpenSCD Theming Works

When a distro is created, the developer will most likely want to brand their distro with the appropriate corporate theming. If plugins ignore theming, those plugins may appear badly in some distros.
In general, a distro will define the oscd-theme colour palette and fonts, which are then used by plugins to style themselves. Plugins should not hardcode any colours or fonts, but instead reference the `--oscd-theme-*` variables. This allows the distro to override the default values and apply their own branding.
Plugin developers conventionally define their own internal `--oscd-*` variables and initialize them from the distro-provided theme variables, with safe defaults. This lets plugin code use a stable internal palette while still allowing the distro to override it.

For example, a distro might define a theme variable:

```css
:root {
  --oscd-theme-primary: #005f73;
}
```

The plugin can then consume it through an internal variable with a fallback:

```css
* {
  --oscd-primary: var(--oscd-theme-primary, #2aa198);
}
```

# Palette Model

OpenSCD's default theme is based on [Solarized](https://ethanschoonover.com/solarized/), a sixteen-colour palette made from eight monotone base colours and eight accent colours. OpenSCD exposes the monotone scale as `base03` through `base3`, and uses selected accent colours for semantic theme variables such as `primary`, `secondary`, and `error`.

The base colour names come from Solarized. In general, the negative-numbered base colours are darker and the positive-numbered base colours are lighter. Their exact foreground and background roles can change between light and dark themes, so use the table below as typical guidance rather than strict rules.

| Variable | Typical use |
| -------- | ----------- |
| `--oscd-primary` | Primary actions, selected states, and key interactive emphasis |
| `--oscd-secondary` | Secondary emphasis, supporting actions, and less prominent highlights |
| `--oscd-error` | Errors, destructive actions, and invalid states |
| `--oscd-base03` | Darkest background or strongest dark surface |
| `--oscd-base02` | Dark elevated or highlighted surface |
| `--oscd-base01` | Muted dark text, borders, or subdued icons |
| `--oscd-base00` | Secondary text or medium-dark foreground |
| `--oscd-base0` | Primary body text in dark themes, or muted text in light themes |
| `--oscd-base1` | Emphasized foreground in dark themes, or subtle foreground in light themes |
| `--oscd-base2` | Light surface or subtle background |
| `--oscd-base3` | Lightest background or strongest light surface |

For more detail on the palette design and contrast relationships, see the [Solarized documentation](https://ethanschoonover.com/solarized/).

# Dos and Don'ts

## Do

- Set default values for the Material (oscd-ui) components used in the plugin.
- Initialize "internal" theme colours (`--oscd-*`) by referencing the theme variable (if set), falling back to the reasonable default.
  E.g. `* { --oscd-primary: var(--oscd-theme-primary, #0b335b); }`
  Then, in sub-components, just reference the internal palette (`--oscd-*`). You could reference `--oscd-theme-*` but then you need to repeatedly set the same defaults everywhere too.
- Conventionally, the root component of the plugin would be the single place where variables are set, such that sub-components inherit these values. E.g.:

```css
* {
  --oscd-primary: var(--oscd-theme-primary, #0b335b);
  --oscd-base2: var(--oscd-theme-base2, #f3f5f6);
  --oscd-text-font: var(--oscd-theme-text-font, 'Roboto');
}

/* component specific styling example... */
* {
  --md-sys-color-primary: var(--oscd-primary);
  --md-sys-color-on-primary: var(--oscd-base2);
  font-family: var(--oscd-text-font);
}
```

## Don't

- Don't hardcode values, for example: `* { --md-sys-color-primary: #33FFFF; }`. Hardcoded values make your plugin unthemable.
- Don't set `--oscd-theme-*` variables inside your plugin - this has the same effect as hardcoding your own values.
- Don't rely on `--oscd-theme-*` being set for you. The distro will likely set these, but it isn't required, so always provide a fallback default value.

# Supported OpenSCD Variables

The following can be dropped into the top of your plugin's root component, removing what isn't needed.

```css
* {
  --oscd-primary: var(--oscd-theme-primary, #2aa198);
  --oscd-secondary: var(--oscd-theme-secondary, #6c71c4);
  --oscd-error: var(--oscd-theme-error, #dc322f);

  --oscd-base03: var(--oscd-theme-base03, #002b36);
  --oscd-base02: var(--oscd-theme-base02, #073642);
  --oscd-base01: var(--oscd-theme-base01, #586e75);
  --oscd-base00: var(--oscd-theme-base00, #657b83);
  --oscd-base0: var(--oscd-theme-base0, #839496);
  --oscd-base1: var(--oscd-theme-base1, #93a1a1);
  --oscd-base2: var(--oscd-theme-base2, #eee8d5);
  --oscd-base3: var(--oscd-theme-base3, #fdf6e3);

  --oscd-shape: var(--oscd-theme-shape, 8px);

  --oscd-text-font: var(--oscd-theme-text-font, 'Roboto');
  --oscd-text-font-mono: var(--oscd-theme-text-font-mono, 'Roboto Mono');
  --oscd-icon-font: var(--oscd-theme-icon-font, 'Material Icons');
}
```

## Shape

The `--oscd-shape` variable controls the corner radius used throughout the application.

OpenSCD derives the Material Design shape scale from this value and maps it to the following Material shape tokens:

```css
--md-sys-shape-corner-none;
--md-sys-shape-corner-extra-small;
--md-sys-shape-corner-small;
--md-sys-shape-corner-medium;
--md-sys-shape-corner-large;
```

The shape scale is derived from `--oscd-shape`, which represents the Material `small` corner size.

| Token         | Value                |
| ------------- | -------------------- |
| `none`        | `0`                  |
| `extra-small` | `0.5 × --oscd-shape` |
| `small`       | `1 × --oscd-shape`   |
| `medium`      | `1.5 × --oscd-shape` |
| `large`       | `2 × --oscd-shape`   |

For example:

```css
:root {
  --oscd-shape: 8px;
}
```

Results in:

```css
--md-sys-shape-corner-none: 0;
--md-sys-shape-corner-extra-small: 4px;
--md-sys-shape-corner-small: 8px;
--md-sys-shape-corner-medium: 12px;
--md-sys-shape-corner-large: 16px;
```
