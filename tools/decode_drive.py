"""Decode a saved Drive download_file_content result (JSON with base64 `content`) to a file."""
import base64, json, sys
src, dst = sys.argv[1], sys.argv[2]
with open(src) as f:
    data = json.load(f)
raw = base64.b64decode(data["content"])
with open(dst, "wb") as f:
    f.write(raw)
print(dst, len(raw), raw[:4])
