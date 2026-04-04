import { DEFAULT_SETTINGS, SETTING_KEYS } from "@/types/settings";

/**
 * Ganti semua link favicon di document agar mengikuti URL dari settings (cache-bust).
 */
export function applyFaviconToDocument(href: string | null | undefined) {
  if (typeof document === "undefined") return;

  const base =
    href?.trim() || DEFAULT_SETTINGS[SETTING_KEYS.APP_FAVICON];
  const sep = base.includes("?") ? "&" : "?";
  const cacheBusted = `${base}${sep}v=${Date.now()}`;

  document.querySelectorAll("link[rel*='icon']").forEach((el) => {
    el.parentNode?.removeChild(el);
  });

  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.href = cacheBusted;
  const ext = base.split(".").pop()?.toLowerCase().split("?")[0];
  if (ext === "svg") icon.type = "image/svg+xml";
  else if (ext === "ico") icon.type = "image/x-icon";
  else if (ext === "jpg" || ext === "jpeg") icon.type = "image/jpeg";
  else icon.type = "image/png";
  document.head.appendChild(icon);

  const shortcut = document.createElement("link");
  shortcut.rel = "shortcut icon";
  shortcut.href = cacheBusted;
  document.head.appendChild(shortcut);
}
