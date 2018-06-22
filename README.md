# Visor

_Visor_ is a minimalistic presentation tool.

[More information found here.](http://v-os.ca/visor)

It runs locally, and requires a `.txt` file with proper syntax as slides content.

The text file must contain `attributes` (information that defines the content), which can be formatted according to `rules` (simple inline formatting syntax).

To those who wish to use _Visor_ in the web, without having to download the source and run it locally, [it is hosted here.](https://v-exec.github.io/Visor/) No custom images can be used if _Visor_ is not hosted locally.

## Attributes & Formatting

### Interface Theming

`fro: #000` determines interface background color

`int: #000` determines interface text color

`hil: #000` determines highlight color

### Slides

`img: image.png` determines image for slide

`img: #000` determines a solid color for the background of a slide

`sec: section` determines presentation section

`col: #000` determines text color in content

`til: title` determines title of slide

`sho: false` determines the visibility of the title

`con: content` determines content of the slide

`not: notes` determines notes of the slide

`- text` determines indented list item

`=` determines the beginning of a slide

`//comment` determines a comment and will be ignored by the parser

`+` determines a line break

## Rules

`#[text>link]` creates link

`_[text]` makes text italic

`*[text]` makes text bold

Content and notes are the only `attributes` that can be formatted with `rules`.

`rules` can be nested.

## Controls

`,` goes back 1 slide

`.` goes forward 1 slide

`n` turns notes on/off on the given slide, if any are present

`s` hides and unhides sidebar

### Details

_Visor_'s parser is _not_ whitespace-based, meaning line breaks need to be declared manually by writing `+` at the start of a line.

When a slide doesn't have a `con` attribute, it will automatically make the title large and centered. Otherwise, it'll create a typical slide.

If any theming `attributes` are left empty, the default theme will be used for that `attribute`.

If `attributes` like `img`, `sec`, or `col` are left empty after they've been previously declared, future slides will retain the same `img`, `sec`, and `col`, meaning that there's no need to redundantly describe each slide's section, image, and text color, if it's the same as the previous slide.

Once a presentation file has been created, it simply needs to be dropped on the drop zone seen when opening _Visor_'s `index.html` file.

The `img` attribute automatically searches in root folder called `images`.

All `attributes` are optional, not including one (or many) in a slide definition is completely fine.

## Example

This repository features an example presentation in `presentations/example.txt`.