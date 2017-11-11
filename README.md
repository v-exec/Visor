# Visor

_Visor_ is a minimalistic presentation tool.

[More information found here.](http://v-os.ca/visor)

It runs locally, and requires a `.txt` file with proper syntax as slides content.

The text file must contain `attributes` (information that defines the content), which can be formatted according to `rules`.

## Attributes & Formatting

### Interface Theming

`fro: #000` determines interface background color

`int: #000` determines interface text color

`hi1: #000`, `hi2: #000`, `hi3: #000` determine highlight colors

### Slides

`img: image.png` determines image for slide

`img: #000` will instead use a solid color for the background of a slide

`sec: section` determines presentation section

`col: #000` determines text color in content

`til: title` determines title of slide

`sho: false` determines the visibility of the title

`con: content` determines content of the slide

`not: notes` determines notes of the slide

`-` starting a line with `-` in `content` will make it part of an indented list

`=` an empty line starting with `=` determines the beginning

`//comment` determines a comment and will be ignored by the parser

`+` determines a line break

### Details

_Visor_'s parser is _not_ whitespace-based, meaning line breaks need to be declared manually by writing `+` at the start of a line.

When a slide doesn't have a `con` attribute, it will automatically make the title large and centered. Otherwise, it'll create a typical

If any theming `attributes` are left empty, the default theme will be used.

If `attributes` like `img`, `sec`, or `col` are left empty after they've been previously declared, future slides will retain the same `img`, `sec`, and `col`, meaning that there's no need to redundantly describe each slide's section, image, and text color, if it's the same as the previous slide.

Once a presentation file has been created, it simply needs to be dropped on the drop zone seen when opening _Visor_'s `index.html` file.

The `img` attribute automatically searches in root folder called `images`.

All `attributes` are optional, not including one (or many) in a slide definition is completely fine.

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

## Example

This repository features this same example presentation.

```
//declaring theme
fro: #222
int: #aaa
hi1: #222
hi2: #333
hi3: #aaa

//background image and text color can also be declared outside of slide definition,
//and they'll be applied to all slides until one overrwites them

//img: #111
//col: #aaa

=my first slide (any text after an '=' isn't parsed)

img: #111
col: #aaa

sec: First Section
til: First Slide

not:
Just a few notes.
+
+
Nothing special.

=second slide

til: Second Slide

con:
Here's some _[italic] and *[bold] content.
+
-List
+
-Of
+
-Points
+
+
And some more text.

not:
And some notes, along with a #[link>https://github.com/v-exec/Visor].

=============3

img: #fff
col: #000

sec: New Section
til: Third Slide

=============4

img: example image bright.jpg
til: Final Slide
```