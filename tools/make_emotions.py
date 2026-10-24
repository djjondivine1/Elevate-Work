"""Cut Jon's expressions out of his published thumbnails and make sticker versions.

Usage: python3 -I tools/make_emotions.py <thumbs-dir>
The thumbnails are 1280x720 JPEGs (thumb1..thumb6). Each is upscaled 2x, cut with a human-segmentation model,
then cropped to the person. When the original transparent PNGs from the Jon Divine Emotions folder are
available, drop them in assets/jon/emotions/ with the same names and re-run make_stickers() instead.
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageFilter
import cv2

OUT = "assets/jon/emotions"
# name -> (thumbnail, crop box in 2x coords or None, edge that is cut by the frame: left|right|none)
SPEC = {
    "skeptical": ("thumb1.jpg", None, "right"),
    "sad": ("thumb2.jpg", None, "right"),
    "smirk": ("thumb4.jpg", None, "none"),
    "point": ("thumb5.jpg", None, "left"),
    "shocked": ("thumb6.jpg", (0, 0, 1360, 1440), "left"),
}

def largest_component(alpha):
    a = (np.array(alpha) > 40).astype(np.uint8)
    n, lab, stats, _ = cv2.connectedComponentsWithStats(a, 8)
    if n <= 1:
        return alpha
    k = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    keep = (lab == k).astype(np.uint8) * 255
    keep = cv2.dilate(keep, np.ones((5, 5), np.uint8))
    return Image.fromarray(np.minimum(np.array(alpha), keep))

def sticker(im, outline=18):
    alpha = im.split()[3].point(lambda v: 0 if v < 40 else (255 if v > 215 else v)).filter(ImageFilter.GaussianBlur(1.2))
    im = im.copy(); im.putalpha(alpha)
    pad = outline * 2
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad), im)
    k = outline * 2 + 1
    dil = canvas.split()[3].filter(ImageFilter.MaxFilter(k)).filter(ImageFilter.GaussianBlur(1.5))
    white = Image.new("RGBA", canvas.size, (244, 238, 226, 255)); white.putalpha(dil)
    out = Image.alpha_composite(white, canvas)
    return out.crop(out.getbbox())

def head_frac(im):
    """width of the top 28% of the cutout (head and hair) as a share of the full width"""
    a = np.array(im.split()[3]); h = a.shape[0]
    top = a[: int(h * 0.28)]
    cols = np.where((top > 60).any(axis=0))[0]
    return round((cols[-1] - cols[0]) / a.shape[1], 3) if len(cols) else 0.3

def main(thumbs):
    from rembg import remove, new_session
    sess = new_session("u2net_human_seg")
    manifest = {}
    for name, (fn, box, edge) in SPEC.items():
        im = Image.open(os.path.join(thumbs, fn)).convert("RGB").resize((2560, 1440), Image.LANCZOS)
        if box: im = im.crop(box)
        cut = remove(im, session=sess)
        cut.putalpha(largest_component(cut.split()[3]))
        if name == "shocked":  # trim a leftover bump at the shoulder edge
            a = cv2.morphologyEx(np.array(cut.split()[3]), cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (61, 61)))
            cut.putalpha(Image.fromarray(a))
        cut = cut.crop(cut.getbbox())
        cut.save(f"{OUT}/{name}.png")
        st = sticker(cut)
        st.thumbnail((1100, 1300), Image.LANCZOS)
        st.save(f"{OUT}/{name}-sticker.png", optimize=True)
        manifest[name] = {"file": f"emotions/{name}-sticker.png", "cut": edge, "headfrac": head_frac(st), "size": list(st.size)}
        print(name, st.size, manifest[name]["headfrac"])
    # the two original stickers, measured the same way
    for name, fn, edge in [("serious", "jon-serious-sticker.png", "none"), ("smile", "jon-smile-sticker.png", "none")]:
        st = Image.open(f"assets/jon/{fn}")
        manifest[name] = {"file": fn, "cut": edge, "headfrac": head_frac(st), "size": list(st.size)}
    json.dump(manifest, open("assets/jon/manifest.json", "w"), indent=2)

if __name__ == "__main__":
    main(sys.argv[1])
