# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "fonttools[woff]==4.61.1",
#   "Pillow==12.3.0",
#   "resvg-py==0.5.0",
# ]
# ///
"""Export FLOW's branded SVG sources and crawler-friendly PNG banners."""

from base64 import b64encode
from html import escape
from io import BytesIO
from pathlib import Path
from xml.etree import ElementTree

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image
import resvg_py


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "site/flow/public/social"
TITLE = "FLOW — Turn a Skill into a method your app can call."
DESCRIPTION = "A proposed successor to SKILL.md, on a soft periwinkle cloudscape."
INK = "#181925"
LAVENDER = "#7063C8"


class Artwork:
    """Outline the repository's exact fonts so exports need no installed fonts."""

    def __init__(self):
        fonts = ROOT / "site/theme/fonts"
        self.fonts = {
            "regular": TTFont(fonts / "OpenRunde-Regular.woff2"),
            "semibold": TTFont(fonts / "OpenRunde-Semibold.woff2"),
            "wordmark": TTFont(fonts / "quicksand-bold.ttf"),
        }
        self.definitions = {}

    def text(self, value, x, y, size, fill=INK, face="regular", tracking=0):
        font = self.fonts[face]
        glyphs = font.getGlyphSet()
        cmap = font.getBestCmap()
        units = font["head"].unitsPerEm
        scale = size / units
        cursor = 0
        paths = []
        for char in value:
            name = cmap[ord(char)]
            key = f"{face}-{ord(char):x}"
            if key not in self.definitions:
                pen = SVGPathPen(glyphs)
                glyphs[name].draw(pen)
                self.definitions[key] = f'<path id="{key}" d="{pen.getCommands()}"/>'
            paths.append(
                f'<use href="#{key}" transform="translate({cursor:.3f} 0)"/>'
            )
            cursor += font["hmtx"][name][0] + tracking / scale
        label = escape(value, quote=True)
        markup = (
            f'<g aria-label="{label}" fill="{fill}" '
            f'transform="translate({x} {y}) scale({scale:.8f} {-scale:.8f})">'
            + "".join(paths)
            + "</g>"
        )
        return markup, cursor * scale

    def logo(self, x, y, width):
        # Preserve the official lockup's geometry, text face, and proportions.
        tree = ElementTree.parse(ROOT / "site/flow/public/logo.svg")
        ns = {"svg": "http://www.w3.org/2000/svg"}
        mark = tree.getroot().find("svg:svg", ns)
        ElementTree.register_namespace("", ns["svg"])
        geometry = ElementTree.tostring(mark, encoding="unicode")
        scale = width / 427.712
        wordmark, _ = self.text("FLOW", 147.712, 89, 100, "#20242C", "wordmark")
        return (
            f'<g transform="translate({x} {y}) scale({scale:.8f})">'
            + geometry
            + wordmark
            + "</g>"
        )

    def export(self, name, width, height, body):
        # This photographic texture already belongs to the website.
        sky = Image.open(ROOT / "site/flow/public/home/assets/flow-sky.webp").convert("RGB")
        buffer = BytesIO()
        sky.save(buffer, "JPEG", quality=90, optimize=True)
        image = b64encode(buffer.getvalue()).decode("ascii")
        background = (
            f'<rect width="{width}" height="{height}" fill="#F4F1FD"/>'
            f'<image href="data:image/jpeg;base64,{image}" width="{width}" '
            f'height="{height}" preserveAspectRatio="xMidYMid slice"/>'
            f'<rect width="{width}" height="{height}" fill="url(#wash)"/>'
        )
        gradient = (
            '<linearGradient id="wash" x1="0" x2="1" y1="0" y2="0">'
            '<stop offset="0" stop-color="#FFFFFF" stop-opacity=".98"/>'
            '<stop offset=".48" stop-color="#FFFFFF" stop-opacity=".91"/>'
            '<stop offset="1" stop-color="#EEE9FF" stop-opacity=".12"/>'
            "</linearGradient>"
        )
        source = (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}" role="img" aria-labelledby="title description">'
            f'<title id="title">{escape(TITLE)}</title>'
            f'<desc id="description">{escape(DESCRIPTION)}</desc>'
            "<defs>" + gradient + "".join(self.definitions.values()) + "</defs>"
            + background + body + "</svg>\n"
        )
        OUTPUT.mkdir(parents=True, exist_ok=True)
        (OUTPUT / f"{name}.svg").write_text(source, encoding="utf-8")
        png = resvg_py.svg_to_bytes(svg_string=source, skip_system_fonts=True)
        # Keep the public PNG opaque, compact, and free of machine-specific metadata.
        image = Image.open(BytesIO(png)).convert("RGB")
        buffer = BytesIO()
        image.save(buffer, "PNG", optimize=True)
        (OUTPUT / f"{name}.png").write_bytes(buffer.getvalue())
        print(f"{name}: {width}×{height}")


def banner(name, width, height):
    art = Artwork()
    wide = width > 1200
    left = 80
    body = art.logo(left, 62, 220 if not wide else 245)
    label, label_width = art.text(
        "A proposed successor to SKILL.md", left + 15, 188 if not wide else 186,
        18, "#656371", "regular",
    )
    body += (
        f'<rect x="{left}" y="{162 if not wide else 160}" '
        f'width="{label_width + 30:.2f}" height="38" rx="19" '
        'fill="#FFFFFF" fill-opacity=".76" stroke="#E8E4F4"/>' + label
    )
    if wide:
        first, _ = art.text("Turn a Skill into a method", left, 308, 88, face="semibold", tracking=-3.6)
        second, _ = art.text("your app can call.", left, 410, 88, LAVENDER, "semibold", -3.6)
        body += first + second
        subtitle_y = 493
    else:
        for line, baseline, colour in [
            ("Turn a Skill", 294, INK),
            ("into a method", 383, INK),
            ("your app can call.", 472, LAVENDER),
        ]:
            line_svg, _ = art.text(line, left, baseline, 80, colour, "semibold", -3.1)
            body += line_svg
        subtitle_y = 551
    subtitle, _ = art.text(
        "Code, agents, prompts — one interface.", left, subtitle_y, 23,
        "#666773", tracking=-0.4,
    )
    address, address_width = art.text("flow.jig.md", 0, 0, 21, "#5F567A")
    body += subtitle
    body += f'<g transform="translate({width - address_width - 72:.2f} {height - 48})">{address}</g>'
    art.export(name, width, height, body)


if __name__ == "__main__":
    banner("flow-social", 1200, 630)
    banner("flow-readme", 1600, 600)
