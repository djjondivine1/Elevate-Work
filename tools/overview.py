"""Rebuild output/_overview: per-lesson feed sheets, all-hooks, ivory-set and onyx-set sheets, story sheets.  python3 tools/overview.py"""
import glob, os, re
from PIL import Image
OUT = "output/_overview"
lessons = sorted(d for d in glob.glob("output/[0-9][0-9]-*") if os.path.isdir(d))
src = open("content/lessons.js").read()
ivory = set()
for m in re.finditer(r"n:\s*(\d+),[^{}]*?(?:\{[^{}]*\}[^{}]*?)*?theme:\s*\"ivory\"", src):
    pass
def theme_of(n):
    # find block for lesson n up to the next "n:" line
    blocks = re.split(r"\n\s*n:\s*", src)
    for b in blocks[1:]:
        if re.match(rf"{n}\b", b):
            return "ivory" if re.search(r'theme:\s*"ivory"', b.split("\n  },\n")[0] if False else b[:600]) else "onyx"
    return "onyx"
def slides(d, fmt): return sorted(glob.glob(os.path.join(d, fmt, "0*.png")))
def sheet(files, scale, out, cols=None, pad=10):
    ims = [Image.open(f).convert("RGB") for f in files]
    w, h = int(ims[0].width*scale), int(ims[0].height*scale)
    cols = cols or len(ims); rows = -(-len(ims)//cols)
    s = Image.new("RGB", (cols*(w+pad)+pad, rows*(h+pad)+pad), (60,60,64))
    for i, im in enumerate(ims):
        s.paste(im.resize((w,h), Image.LANCZOS), (pad+(i%cols)*(w+pad), pad+(i//cols)*(h+pad)))
    s.save(out, quality=88); print(out, s.size)
for d in lessons:
    sheet(slides(d,"feed"), 0.3, f"{OUT}/{os.path.basename(d)}.jpg")
hooks = [slides(d,"feed")[0] for d in lessons]
sheet(hooks, 0.28, f"{OUT}/all-hooks.jpg", cols=6)
iv = [d for d in lessons if theme_of(int(os.path.basename(d)[:2]))=="ivory"]
on = [d for d in lessons if d not in iv]
print("ivory", [os.path.basename(d)[:2] for d in iv]); print("onyx", [os.path.basename(d)[:2] for d in on])
for name, ds in (("set-ivory", iv), ("set-onyx", on)):
    sheet([slides(d,"feed")[0] for d in ds] + [slides(d,"feed")[1] for d in ds], 0.28, f"{OUT}/{name}-hook-pain.jpg", cols=len(ds))
sheet([slides(d,"story")[0] for d in lessons], 0.2, f"{OUT}/all-stories-hooks.jpg", cols=9)
