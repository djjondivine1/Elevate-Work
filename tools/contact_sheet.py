"""Build a contact sheet of a lesson's slides.  python3 tools/contact_sheet.py <lesson-dir> <feed|story> <out.jpg> [scale]"""
import sys, glob, os
from PIL import Image
d, fmt, out = sys.argv[1], sys.argv[2], sys.argv[3]
scale = float(sys.argv[4]) if len(sys.argv) > 4 else 0.4
fs = sorted(glob.glob(os.path.join(d, fmt, "0*.png")))
ims = [Image.open(f).convert("RGB") for f in fs]
w, h = int(ims[0].width * scale), int(ims[0].height * scale)
sheet = Image.new("RGB", (w * len(ims) + 10 * (len(ims) + 1), h + 20), (60, 60, 64))
for i, im in enumerate(ims):
    sheet.paste(im.resize((w, h), Image.LANCZOS), (10 + i * (w + 10), 10))
sheet.save(out, quality=88)
print(out, sheet.size)
