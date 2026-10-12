import { useEffect } from "react";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function PageMeta({ title, description }) {
  useEffect(() => {
    const full = title ? `${title} | SV Developers` : "SV Developers | Building Your Future — Real Estate in Hyderabad";
    document.title = full;
    setMeta("name", "description", description || "SV Developers — Building Your Future. A buyer-first real estate company in Hyderabad.");
    setMeta("property", "og:title", full);
    if (description) setMeta("property", "og:description", description);
  }, [title, description]);
  return null;
}
