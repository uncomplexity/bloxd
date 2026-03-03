/**
 * @description locking works
 * @todo currently blocked by discord issue below:
 * "Let `setCanChangeBlockRect` override `setCantChangeBlockRect`"
 * https://discord.com/channels/804347688946237472/1409474104289136713/1409826380853547140
 */

type Point = [number, number, number];

type Rect = [Point, Point];

class RectControl {
	static playerIds = new Set<string>();

	static unlockedPlayerIds = new Set<string>();

	static blacklist = new Set<Rect>([
		[[-64, -1024, -64], [64, 1024, 64]],
		[[-11, -10, 65], [-21, -4, 82]],
	]);

	static whitelist = new Set<Rect>();

	static unlock(playerId: string) {
		RectControl.unlockedPlayerIds.add(playerId);
		for (const rect of RectControl.blacklist.values()) {
    	api.setCanChangeBlockRect(playerId, rect[0], rect[1]);
		}
		for (const rect of RectControl.whitelist.values()) {
    	api.setCanChangeBlockRect(playerId, rect[0], rect[1]);
		}
		m(playerId, "Rects unlocked.", s("gold"));
	}

	static lock(playerId: string) {
		RectControl.unlockedPlayerIds.delete(playerId);
		for (const rect of RectControl.blacklist.values()) {
			api.resetCanChangeBlockRect(playerId, rect[0], rect[1]);
    	api.setCantChangeBlockRect(playerId, rect[0], rect[1]);
		}
		for (const rect of RectControl.whitelist.values()) {
			api.resetCanChangeBlockRect(playerId, rect[0], rect[1]);
    	api.setCanChangeBlockRect(playerId, rect[0], rect[1]);
		}
	}

	static sync() {
		for (const playerId of RectControl.playerIds.values()) {
			if (RectControl.unlockedPlayerIds.has(playerId)) {
				continue;
			}
			for (const rect of RectControl.blacklist.values()) {
				api.resetCanChangeBlockRect(playerId, rect[0], rect[1]);
				api.setCantChangeBlockRect(playerId, rect[0], rect[1]);
			}
			for (const rect of RectControl.whitelist.values()) {
        api.resetCanChangeBlockRect(playerId, rect[0], rect[1]);
				api.setCanChangeBlockRect(playerId, rect[0], rect[1]);
			}
		}
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

	static whitelistDelete(rect: Rect) {
		for (const rect2 of RectControl.whitelist.values()) {
			if (JSON.stringify(rect) === JSON.stringify(rect2)) {
				RectControl.whitelist.delete(rect2);
				return;
			}
		}
	}

	static onPlayerJoin(playerId: string) {
		RectControl.lock(playerId);
		RectControl.playerIds.add(playerId);
	}

	static onPlayerLeave(playerId: any, _serverIsShuttingDown: any) {
		RectControl.playerIds.delete(playerId);
	}

	static onPlayerChat(playerId: any, chatMessage: any) {
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
		return undefined
	}
}