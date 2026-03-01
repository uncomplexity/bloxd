const phase = globalThis.phasesByIds.get("forest");
if (phase) {
  if (api.hasItem(playerId, "Gold Coin")) {
    const amount = api.getInventoryItemAmount(playerId, "Gold Coin");
    if (amount >= 125) {
      api.removeItemName(playerId, "Gold Coin", 125);
      api.giveItem(playerId, "Stick", 1, {
        customDisplayName: phase.name,
        customDescription: phase.description,
      });
      m(playerId, `You received ${phase.name}.`, ms("gold"));
    } else {
      m(playerId, `You need 125 gold coin to buy ${phase.name}.`, ms("red"));
    }
  } else {
    m(playerId, `You need 125 gold coin to buy ${phase.name}.`, ms("red"));
  }
}