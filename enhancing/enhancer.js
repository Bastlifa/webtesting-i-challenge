module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  return { ...item, enhancement: Math.min(item.enhancement + 1, 20) };
}

function fail(item) {
  let finalDur = item.durability
  let finalEnh = item.enhancement
  if (item.enhancement < 15) finalDur -= 5
  else {
    if (item.enhancement > 16) finalEnh--
    finalDur -= 10
  }
  finalDur = Math.max(finalDur, 0)
  finalEnh = Math.max(finalEnh, 0)
  return { ...item, durability: finalDur, enhancement: finalEnh };
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item, name: item.enhancement > 0 ? `[+${item.enhancement}] ${item.name}` : item.name };
}
