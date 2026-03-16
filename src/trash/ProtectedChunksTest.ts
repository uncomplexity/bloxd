/**
 * @description non-working draft, do not use.
 */

			case ".test": {
				const chestId = api.blockNameToBlockId("Loot Chest");
				const position = api.getPosition(playerId);
				const chunkId = api.blockCoordToChunkId(position);
				const chunkPosition = api.chunkIdToBotLeftCoord(chunkId);
				const chunkData = api.getChunk(chunkPosition);
				if (chunkData) {
					for (let x = 0; x < 32; x++) {
						for (let y = 0; y < 32; y++) {
							for (let z = 0; z < 32; z++) {
								const id = chunkData.blockData.get(x, y, z);
								if (targetIds.has(id)) {
									const worldX = chunkPosition[0] + x;
									const worldY = chunkPosition[1] + y;
									const worldZ = chunkPosition[2] + z;
									if (ChestStorage.isStorage(worldX, worldY, worldZ)) {
										b(`2 Chest Storage found at ${worldX}, ${worldY}, ${worldZ}.`, s("gold"));
									}
								}
							}
						}
					}
				}
				return false;
			}