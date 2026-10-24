"""Same slide from every lesson on one sheet.  python3 tools/slide_sheet.py <feed|story> <slide-file e.g. 03-struggles.png> <out.jpg> [scale] [cols]"""
import sys, glob, os
from PIL import Image
fmt, name, out = sys.argv[1], sys.argv[2], sys.argv[3]
scale = float(sys.argv[4]) if len(sys.argv) > 4 else 0.3
cols = int(sys.argv[5]) if len(sys.argv) > 5 else 6
fs = sorted(glob.glob(f"output/*/{fmt}/{name}"))
ims = [Image.open(f).convert("RGB") for f in fs]
w, h = int(ims[0].width * scale), int(ims[0].height * scale)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (w + 8) + 8, rows * (h + 8) + 8), (70, 70, 74))
for i, im in enumerate(ims):
    sheet.paste(im.resize((w, h), Image.LANCZOS), (8 + (i % cols) * (w + 8), 8 + (i // cols) * (h + 8)))
sheet.save(out, quality=86); print(out, sheet.size)
