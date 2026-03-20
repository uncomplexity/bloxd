class RectControl {
	static playerIds = new Set<string>();
	static unlockedPlayerIds = new Set<string>();
	static blacklist = new Set<Rect>([
		[
			[-64, -1024, -64],
			[64, 1024, 64],
		],
	]);
	static whitelist = new Set<Rect>([
		// [[2, 0, 18], [50, 1, 18]],
	]);

	static unlock(playerId: string) {
		RectControl.unlockedPlayerIds.add(playerId);
		api.sendMessage(playerId, "Rects unlocked.", { color: "gold" });
	}

	static lock(playerId: string) {
		RectControl.unlockedPlayerIds.delete(playerId);
		api.sendMessage(playerId, "Rects locked.", { color: "gold" });
	}

	static isProtected(point: Point, playerId?: string) {
		if (typeof playerId === "string") {
			if (RectControl.unlockedPlayerIds.has(playerId)) {
				return false;
			}
		}
		for (const rect of RectControl.whitelist.values()) {
			if (api.isInsideRect(point, rect[0], rect[1])) {
				return false;
			}
		}
		for (const rect of RectControl.blacklist.values()) {
			if (api.isInsideRect(point, rect[0], rect[1])) {
				return true;
			}
		}
		return false;
	}

	static onPlayerJoin(playerId: string) {
		RectControl.lock(playerId);
		RectControl.playerIds.add(playerId);
	}

	static onPlayerLeave(playerId: string, _serverIsShuttingDown: boolean) {
		RectControl.playerIds.delete(playerId);
		RectControl.unlockedPlayerIds.delete(playerId);
	}

	static onPlayerChangeBlock(
		playerId: string,
		x: number,
		y: number,
		z: number,
		_fromBlock: string,
		_toBlock: string,
		_droppedItem: string | null,
		_fromBlockInfo: unknown,
		_toBlockInfo: unknown,
	) {
		if (RectControl.isProtected([x, y, z], playerId)) {
			api.sendMessage(playerId, "That area is protected.", { color: "gold" });
			return "preventChange";
		}
		return undefined;
	}

	static onPlayerChat(playerId: string, chatMessage: string) {
		switch (chatMessage) {
			case ".unlock": {
				RectControl.unlock(playerId);
				return false;
			}
			case ".lock": {
				RectControl.lock(playerId);
				return false;
			}
			default: {
				break;
			}
		}
		return undefined;
	}
}

Object.assign(globalThis, { RectControl });

export type { RectControl };
