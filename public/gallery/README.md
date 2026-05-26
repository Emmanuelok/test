# Gallery photos

Drop real shop photos here. They're served from `/gallery/<filename>` at runtime
via Next.js `Image`. The gallery code (`components/home/Gallery.tsx`,
`components/gallery/GalleryGrid.tsx`) references files by exact path —
the `SafeImage` wrapper falls back to a branded medallion card when a file
is missing, so it's safe to add files incrementally.

## Expected filenames (currently referenced)

| Path                            | Caption                  | Status |
| ------------------------------- | ------------------------ | ------ |
| `yaw-signature-fade.jpg`        | Signature Fade · Yaw     | ⏳     |
| `mandip-kids-cut.jpg`           | Kids' Cut · Mandip       | ⏳     |

Recommended: JPG or WebP, ≥1200 px wide on the long side, sRGB.
