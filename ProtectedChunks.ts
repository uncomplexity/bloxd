/**
 * @description non-working draft, do not use.
 */

class ProtectedChunks {
	static onChunkLoaded (chunkId: string, _chunk: unknown, _wasPersistedChunk: boolean) {
		const chestId = api.blockNameToBlockId("Loot Chest");
		const chunkPosition = api.chunkIdToBotLeftCoord(chunkId);
		const chunkData = api.getChunk(chunkPosition);
		if (chunkData) {
			for (let x = 0; x < 32; x++) {
				for (let y = 0; y < 32; y++) {
					for (let z = 0; z < 32; z++) {
						const id = chunkData.blockData.get(x, y, z);
						const name = api.blockIdToBlockName(id);
						if (name.includes("Loot Chest")) {
							const worldX = chunkPosition[0] + x;
							const worldY = chunkPosition[1] + y;
							const worldZ = chunkPosition[2] + z;
							if (ChestStorage.isStorage(worldX, worldY, worldZ)) {
								b(`3 Chest Storage found at ${worldX}, ${worldY}, ${worldZ}.`, s("gold"));
							}
						}
						if (id === chestId) {
							const worldX = chunkPosition[0] + x;
							const worldY = chunkPosition[1] + y;
							const worldZ = chunkPosition[2] + z;
							if (ChestStorage.isStorage(worldX, worldY, worldZ)) {
								b(`4 Chest Storage found at ${worldX}, ${worldY}, ${worldZ}.`, s("gold"));
							}
						}
					}
				}
			}
		}
	}
}