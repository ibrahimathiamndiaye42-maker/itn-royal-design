"""
Optimise de nouvelles photos produit pour le site.

Usage :
    pip install pillow
    python scripts/optimize_images.py <dossier_photos> <slug-du-produit>

Exemple :
    python scripts/optimize_images.py ~/Downloads/robe-bleue robe-bleue-brodee

Les photos sont triées par nom, numérotées 00, 01, 02… et écrites dans
public/images/p/<slug>/ en trois tailles WebP (400, 800 et grande taille).
Le script affiche ensuite les lignes à coller dans src/data/imageMeta.js.
Il vous reste à déclarer le produit dans src/data/products.js et son prix dans src/data/prices.js.
"""
import glob
import os
import sys

from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True  # photos WhatsApp parfois tronquées de quelques octets

if len(sys.argv) != 3:
    sys.exit(__doc__)

src, slug = sys.argv[1], sys.argv[2]
out = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'p', slug)
os.makedirs(out, exist_ok=True)

files = sorted(f for f in glob.glob(os.path.join(src, '*')) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')))
if not files:
    sys.exit('Aucune photo trouvée.')

for i, path in enumerate(files):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    for width, quality, tag in ((400, 68, '400'), (800, 70, '800'), (min(w, 1200), 68, 'full')):
        r = im if width == w else im.resize((width, round(h * width / w)), Image.LANCZOS)
        r.save(os.path.join(out, f'{i:02d}-{tag}.webp'), 'WEBP', quality=quality, method=6)
    tiny = im.resize((8, 8)).convert('RGB')
    px = list(tiny.getdata())
    r, g, b = (sum(p[c] for p in px) // len(px) for c in range(3))
    print(f'  "{slug}/{i:02d}": ["#{r:02x}{g:02x}{b:02x}", {w / h:.4f}],')
print(f'\n{len(files)} photo(s) écrite(s) dans {os.path.normpath(out)}')
