"""Regenerate bundled fonts with fonttools[woff] installed.

Keep the display axes used by the design, subset to Latin and punctuation,
and retain variable weights. Sources are versioned Google Fonts files.
"""
from io import BytesIO
from pathlib import Path
from urllib.request import urlopen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

destination = Path(__file__).resolve().parents[1] / 'public/fonts'
destination.mkdir(parents=True, exist_ok=True)
fonts = [
    ('fraunces-normal', 'fraunces/v38/6NUV8FyLNQOQZAnv9ZwIlOkuy91B.woff2', {'opsz': 144, 'SOFT': 50, 'WONK': 0, 'wght': (400, 500)}),
    ('fraunces-italic', 'fraunces/v38/6NUT8FyLNQOQZAnv9ZwNpOskzP9Ddt0.woff2', {'opsz': 144, 'SOFT': 100, 'WONK': 1, 'wght': (400, 500)}),
    ('inter', 'inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2', {'wght': (400, 700)}),
    ('jetbrains-mono', 'jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwgknk-4.woff2', {'wght': (400, 500)}),
]
for name, source, axes in fonts:
    font = TTFont(BytesIO(urlopen('https://fonts.gstatic.com/s/' + source).read()))
    available = {axis.axisTag for axis in font['fvar'].axes} if 'fvar' in font else set()
    options = subset.Options()
    options.flavor = 'woff2'
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=list(range(0x20, 0x100)) + list(range(0x2000, 0x2070)) + [0x20ac, 0x2122, 0x2197, 0x2212])
    subsetter.subset(font)
    if axes:
        font = instantiateVariableFont(font, {key: value for key, value in axes.items() if key in available})
    font.flavor = 'woff2'
    target = destination / (name + '-latin.woff2')
    font.save(target)
    print(target.name, target.stat().st_size)

for family in ['fraunces', 'inter', 'jetbrainsmono']:
    license_text = urlopen(f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt').read().decode('utf-8')
    (destination / (family + '-OFL.txt')).write_text('\n'.join(line.rstrip() for line in license_text.splitlines()) + '\n')
