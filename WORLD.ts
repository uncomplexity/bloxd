class Loader {
    static blocks: Point[] = [
        [1, 1, -63],
        [3, 1, -63],
        [5, 1, -63],
        [7, 1, -63],
    ];

    static cursor = 0;

		static completed = false;

    static tick() {
			if (Loader.completed === true) {
				return;
			}
			while (Loader.cursor < Loader.blocks.length) {
					const block = Loader.blocks[Loader.cursor];
					const [x, y, z] = block;
					if (api.getBlockId(x, y, z) === 1) {
						return;
					}
					const data = api.getBlockData(x, y, z);
					const code = data?.persisted?.shared?.text ?? null;
					if (code) {
							api.broadcastMessage(`${block.join(' ')} ${code.length}`);
							eval(code);
					}
					Loader.cursor++;
			}
			Loader.finish();
    }

    static finish() {
        api.broadcastMessage(`RectControl ${typeof RectControl}`);

        api.setCallbackValueFallback("onWorldChangeBlock", "preventChange");
        api.setCallbackValueFallback("onPlayerChangeBlock", "preventChange");
        api.setCallbackValueFallback("onPlayerDamagingOtherPlayer", "preventDamage");
        api.setCallbackValueFallback("onPlayerAttemptOpenChest", "preventOpen");

        onPlayerJoin = (playerId) => RectControl.onPlayerJoin(playerId);
				
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

        Loader.completed = true;
    }
}

tick = () => {
	Loader.tick();
}
