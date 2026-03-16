class TownSquare {
	static onWorldChangeBlock(
		x: number,
		y: number,
		z: number,
		_fromBlock: BlockName,
		_toBlock: BlockName,
		_initiatorDbId: string | null,
		extraInfo: WorldBlockChangedInfo,
	) {
		if (extraInfo?.["cause"] === "Explosion") {
			if (api.isInsideRect?.([x, y, z], [-64, -1024, -64], [64, 1024, 64])) {
				return "preventChange";
			}
		}
		return undefined;
	}

	static onPlayerDamagingOtherPlayer(
		attackingPlayer: string,
		damagedPlayer: string,
	) {
		if (
			api.isInsideRect?.(
				api.getPosition?.(damagedPlayer),
				[-64, -1024, -64],
				[64, 1024, 64],
			)
		) {
			api.sendMessage?.(attackingPlayer, "Can't attack inside the town square.", {
				color: "gold",
			});
			return "preventDamage";
		}
		return undefined;
	}

	static onPlayerChat(playerId: string, chatMessage: string) {
		switch (chatMessage) {
			case ".test": {
				api.sendMessage?.(playerId, "Hello world!", { color: "gold" });
				return false;
			}
			default: {
				break;
			}
		}
		if (chatMessage.startsWith(".give ")) {
			const item = chatMessage.substring(6);
			api.giveItem?.(playerId, item, 1, {});
			return false;
		}
		return undefined;
	}
}

Object.assign(globalThis, { TownSquare });
