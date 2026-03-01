/**
 * @description Press to buy code blocks.
 */

const id = "forest";

const cost = 16;

const phase = globalThis.phasesByIds.get(id);

if (phase) {
  if (api.hasItem(playerId, "Gold Coin")) {
    const amount = api.getInventoryItemAmount(playerId, "Gold Coin");
    if (amount >= cost) {
      api.removeItemName(playerId, "Gold Coin", cost);
      api.giveItem(playerId, "Stick", 1, {
        customDisplayName: phase.name,
        customDescription: phase.description,
      });
      m(playerId, `You received ${phase.name}.`, ms("gold"));
    } else {
      m(playerId, `You need ${cost} gold coin to buy ${phase.name}.`, ms("red"));
    }
  } else {
    m(playerId, `You need ${cost} gold coin to buy ${phase.name}.`, ms("red"));
  }
} else {
  m(playerId, `Internal error: item not found.`, ms("red"));
}