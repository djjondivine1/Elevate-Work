"""Gold-outline versions of every Jon sticker, for the ivory theme (an ivory outline would vanish on ivory).
Uses the plain cutouts in assets/jon/emotions/ and re-cuts the two original headshots."""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from PIL import Image, ImageFilter
import numpy as np

GOLD = (201, 149, 75, 255)

def sticker(im, outline=16, color=GOLD):
    alpha = im.split()[3].point(lambda v: 0 if v < 40 else (255 if v > 215 else v)).filter(ImageFilter.GaussianBlur(1.2))
    im = im.copy(); im.putalpha(alpha)
    pad = outline * 2
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad), im)
    dil = canvas.split()[3].filter(ImageFilter.MaxFilter(outline * 2 + 1)).filter(ImageFilter.GaussianBlur(1.5))
    ring = Image.new("RGBA", canvas.size, color); ring.putalpha(dil)
    out = Image.alpha_composite(ring, canvas)
    return out.crop(out.getbbox())

def main():
    from rembg import remove, new_session
    sess = new_session("u2net_human_seg")
    man = json.load(open("assets/jon/manifest.json"))
    # plain cutouts for the two original headshots
    for name, jpg, box in [("serious", "jon-serious.jpg", (170, 500, 1020, 1540)), ("smile", "jon-smile.jpg", (230, 490, 1020, 1540))]:
        cut = remove(Image.open(f"assets/jon/{jpg}").convert("RGB"), session=sess).crop(box)
        cut.save(f"assets/jon/jon-{name}-cutout.png")
    for name in man:
        src = f"assets/jon/jon-{name}-cutout.png" if name in ("serious", "smile") else f"assets/jon/emotions/{name}.png"
        st = sticker(Image.open(src).convert("RGBA"))
        st.thumbnail((1100, 1300), Image.LANCZOS)
        dst = f"assets/jon/emotions/{name}-sticker-gold.png" if name not in ("serious", "smile") else f"assets/jon/jon-{name}-sticker-gold.png"
        st.save(dst, optimize=True)
        man[name]["file_gold"] = os.path.relpath(dst, "assets/jon")
        print(name, st.size)
    json.dump(man, open("assets/jon/manifest.json", "w"), indent=2)

if __name__ == "__main__":
    main()
