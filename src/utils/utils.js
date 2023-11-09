export function getContrastedColor(originalColor) {
  const halfHex = "777777";
  const octetsRegex = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
  const m1 = originalColor.match(octetsRegex);
  const m2 = halfHex.match(octetsRegex);
  let result = [1, 2, 3]
    .map((i) => {
      const sum = parseInt(m1[i], 16) + parseInt(m2[i], 16);
      return sum.toString(16).padStart(2, "0");
    })
    .join("");
  return result.slice(result.length - 6, result.length);
}
