// Hands a finished card to the phone's own share sheet (the picture plus a caption that contains the link),
// which is how it reaches WhatsApp Status, Instagram Stories, Snapchat and the rest.
// Returns "shared", "cancelled" or "unsupported" (laptops, older browsers) so callers can fall back.
export async function shareImage({ blob, text, name = "asha-wall.png" }) {
  const file = new File([blob], name, { type: blob.type || "image/png" });
  if (!navigator.canShare?.({ files: [file] })) return "unsupported";
  try {
    await navigator.share({ files: [file], text });
    return "shared";
  } catch (e) {
    return e?.name === "AbortError" ? "cancelled" : "unsupported";
  }
}

export function saveImage(blob, name = "asha-wall.png") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
