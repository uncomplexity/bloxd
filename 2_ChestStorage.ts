class ChestStorage {
	static id = "__STORAGE__";

  static get_rotation (playerId: string) {
    const { angleDir } = api.getPlayerFacingInfo(playerId);
    const yaw = (angleDir.theta + Math.PI) % (Math.PI * 2);
    const normalized = ((yaw / (Math.PI * 2)) * 4 + 0.5) % 4;
    const dirs = ["rot1", "rot2", "rot3", "rot4"];
    return dirs[Math.floor(normalized)];
  }

	static init(playerId: string, position: [number, number, number]) {
		const rotation = get_rotation(playerId);
		api.setBlock(position[0], position[1], position[2], `Iron Chest|meta|${rotation}`);
		api.setStandardChestItemSlot(
			position,
			0,
			"Stick",
			1,
			playerId,
			{
				customDisplayName: ChestStorage.id,
				customDescription: api.getPlayerDbId(playerId),
			},
		);
	}

	static isStorage(x: number, y: number, z: number, playerId?: string) {
		if (api.getBlock(x, y, z).startsWith("Iron Chest")) {
			const item = api.getStandardChestItemSlot(
				[x, y, z],
				0,
			);
			const customDisplayName = item?.attributes?.customDisplayName;
			if (customDisplayName === ChestStorage.id) {
				if (playerId) {
					const customDescription = item?.attributes?.customDescription;
					if (customDescription === api.getPlayerDbId(playerId)) {
						return 2;
					}
				}
				return 1;
			}
		}
		return 0;
	}

	static set(playerId: string, x: number, y: number, z: number, index: number, value: unknown) {
		if (0 < index && index <= 35) {
			api.setStandardChestItemSlot(
				[x, y, z],
				index,
				"Stick",
				1,
				playerId,
				{ customDescription: JSON.stringify(value) },
			);
		} else {
			api.sendMessage(playerId, "Storage.set: Invalid index.", { color: "red" });
		}
	}

	static get(playerId: string, x: number, y: number, z: number, index: number) {
		if (0 < index && index <= 35) {
			const item = api.getStandardChestItemSlot(
				[x, y, z],
				index,
			);
			if (item?.attributes?.customDescription) {
				return JSON.parse(item?.attributes?.customDescription);
			}
		} else {
			api.sendMessage(playerId, "Storage.get: Invalid index.", { color: "red" });
		}
		return null;
	}

	/**
	 * @param length 0 to 35
	 */
	static teardown(playerId: string, x: number, y: number, z: number, length: number) {
		for (let index = 0; index <= length; index += 1) {
			api.setStandardChestItemSlot(
				[x, y, z],
				index,
				"Air",
				0,
				playerId,
				{},
			);
		}
	}

	static onPlayerAttemptOpenChest = (playerId: string, x: number, y: number, z: number, _isMoonstoneChest: boolean, _isIronChest: boolean) => {
		if (api.getBlock(x, y, z) === "Chest") {
			if (ChestStorage.isStorage(x, y - 1, z)) {
				api.sendMessage(playerId, "Break it to find out what's inside!", { color: "gold" });
				return "preventOpen";
			}
		}
		if (ChestStorage.isStorage(x, y, z)) {
			api.sendMessage(playerId, "That's a one block!", { color: "gold" });
			return "preventOpen";
		}
		return undefined;
	}
}