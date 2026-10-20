export function createProtocol(kind: "PED" | "CON") {
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AGN-${kind}-${time}${rand}`;
}
