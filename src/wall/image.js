// Screenshots are re-drawn at a sensible size before upload: smaller files, no phone metadata,
// and a copy the share card can draw on a canvas.
const MAX = 1600;

export function prepareImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => (blob ? resolve({ blob, url: URL.createObjectURL(blob), width: canvas.width, height: canvas.height }) : reject(new Error("Couldn't read that image."))),
        "image/jpeg",
        0.9
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("That file isn't an image we can read.")); };
    img.src = url;
  });
}
