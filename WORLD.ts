class Loader{
	static blocks: Point[] = [
		[-2, 1, -63],
		[-1, 1, -63],
		[0, 1, -63],
		[1, 1, -63],
	];
	static load() {
		for (const block of Loader.blocks) {
			const data = api.getBlockData(block[0], block[1], block[2]);
			const code = data?.persisted?.shared?.text ?? null;
			api.broadcastMessage(JSON.stringify({ block, code }));
			if (code) {
				eval(code);
			}	
		}
	}
}

Loader.load();

api.broadcastMessage(`RectControl ${typeof RectControl}`);
api.broadcastMessage(`ChestStorage ${typeof ChestStorage}`);
api.broadcastMessage(`OneBlock ${typeof OneBlock}`);
api.broadcastMessage(`TownSquare ${typeof TownSquare}`);

api.setCallbackValueFallback("onWorldChangeBlock", "preventChange");
api.setCallbackValueFallback("onPlayerChangeBlock", "preventChange");
api.setCallbackValueFallback("onPlayerDamagingOtherPlayer", "preventDamage");
api.setCallbackValueFallback("onPlayerAttemptOpenChest", "preventOpen");

onPlayerJoin = (playerId: string) => {
	return RectControl.onPlayerJoin(playerId);
};

onPlayerLeave = (playerId: string, serverIsShuttingDown: any) => {
	return RectControl.onPlayerLeave(playerId, serverIsShuttingDown);
};

onPlayerAltAction = (playerId: string, x: number, y: number, z: number, block: any, targetEId: any) => {
	return OneBlock.onPlayerAltAction(playerId, x, y, z, block, targetEId);
}

onPlayerChangeBlock = (playerId: string, x: number, y: number, z: number, fromBlock: string, toBlock: string, droppedItem: any, fromBlockInfo: any, toBlockInfo: any) => {
	return OneBlock.onPlayerChangeBlock(playerId, x, y, z, fromBlock, toBlock, droppedItem, fromBlockInfo, toBlockInfo)
		?? RectControl.onPlayerChangeBlock(playerId, x, y, z, fromBlock, toBlock, droppedItem, fromBlockInfo, toBlockInfo);
};

onWorldChangeBlock = (x: number, y: number, z: number, fromBlock: BlockName, toBlock: BlockName, initiatorDbId: string | null, extraInfo: WorldBlockChangedInfo) => {
	return TownSquare.onWorldChangeBlock(x, y, z, fromBlock, toBlock, initiatorDbId, extraInfo);
}

onPlayerDamagingOtherPlayer = (attackingPlayer: string, damagedPlayer: string) => {
	return TownSquare.onPlayerDamagingOtherPlayer(attackingPlayer, damagedPlayer);
};

playerCommand = (playerId: string, command: string) => {
	api.sendMessage(playerId, JSON.stringify({ command }), { color: "gold" });
	return undefined;
}

onPlayerChat = (playerId: string, chatMessage: string) => {
	return TownSquare.onPlayerChat(playerId, chatMessage)
		?? RectControl.onPlayerChat(playerId, chatMessage)
		?? OneBlock.onPlayerChat(playerId, chatMessage);
}

onPlayerAttemptOpenChest = (playerId: string, x: number, y: number, z: number, isMoonstoneChest: boolean, isIronChest: boolean) => {
	return ChestStorage.onPlayerAttemptOpenChest(playerId, x, y, z, isMoonstoneChest, isIronChest)
};