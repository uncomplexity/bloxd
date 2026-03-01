type GenericFunction = (...args: any[]) => any;

declare const api:{
	[key:string]: GenericFunction
}

declare let tick: GenericFunction
declare let onClose: GenericFunction
declare let onPlayerJoin: GenericFunction
declare let onPlayerLeave: GenericFunction
declare let onPlayerJump: GenericFunction
declare let onRespawnRequest: GenericFunction
declare let playerCommand: GenericFunction
declare let onPlayerChat: GenericFunction
declare let onPlayerChangeBlock: GenericFunction
declare let onPlayerDropItem: GenericFunction
declare let onPlayerPickedUpItem: GenericFunction
declare let onPlayerSelectInventorySlot: GenericFunction
declare let onBlockStand: GenericFunction
declare let onPlayerAttemptCraft: GenericFunction
declare let onPlayerCraft: GenericFunction
declare let onPlayerAttemptOpenChest: GenericFunction
declare let onPlayerOpenedChest: GenericFunction
declare let onPlayerMoveItemOutOfInventory: GenericFunction
declare let onPlayerMoveInvenItem: GenericFunction
declare let onPlayerMoveItemIntoIdxs: GenericFunction
declare let onPlayerSwapInvenSlots: GenericFunction
declare let onPlayerMoveInvenItemWithAmt: GenericFunction
declare let onPlayerAttemptAltAction: GenericFunction
declare let onPlayerAltAction: GenericFunction
declare let onPlayerClick: GenericFunction
declare let onClientOptionUpdated: GenericFunction
declare let onMobSettingUpdated: GenericFunction
declare let onInventoryUpdated: GenericFunction
declare let onChestUpdated: GenericFunction
declare let onWorldChangeBlock: GenericFunction
declare let onCreateBloxdMeshEntity: GenericFunction
declare let onEntityCollision: GenericFunction
declare let onPlayerAttemptSpawnMob: GenericFunction
declare let onWorldAttemptSpawnMob: GenericFunction
declare let onPlayerSpawnMob: GenericFunction
declare let onWorldSpawnMob: GenericFunction
declare let onWorldAttemptDespawnMob: GenericFunction
declare let onMobDespawned: GenericFunction
declare let onPlayerAttack: GenericFunction
declare let onPlayerDamagingOtherPlayer: GenericFunction
declare let onPlayerDamagingMob: GenericFunction
declare let onMobDamagingPlayer: GenericFunction
declare let onMobDamagingOtherMob: GenericFunction
declare let onAttemptKillPlayer: GenericFunction
declare let onPlayerKilledOtherPlayer: GenericFunction
declare let onMobKilledPlayer: GenericFunction
declare let onPlayerKilledMob: GenericFunction
declare let onMobKilledOtherMob: GenericFunction
declare let onPlayerPotionEffect: GenericFunction
declare let onPlayerDamagingMeshEntity: GenericFunction
declare let onPlayerBreakMeshEntity: GenericFunction
declare let onPlayerUsedThrowable: GenericFunction
declare let onPlayerThrowableHitTerrain: GenericFunction
declare let onTouchscreenActionButton: GenericFunction
declare let onTaskClaimed: GenericFunction
declare let onChunkLoaded: GenericFunction
declare let onPlayerRequestChunk: GenericFunction
declare let onItemDropCreated: GenericFunction
declare let onPlayerStartChargingItem: GenericFunction
declare let onPlayerFinishChargingItem: GenericFunction
declare let onPlayerFinishQTE: GenericFunction
declare let onPlayerBoughtShopItem: GenericFunction
declare let doPeriodicSave: GenericFunction

class Scheduler {
	tasks: any[];
	timeouts: any[];
    constructor() {
        this.tasks = [];
        this.timeouts = [];
    }
    every(ms: any, callback: any) {
        this.tasks.push([ms, Date.now(), callback]);
    }
    after(ms: number, callback: any) {
        const handle = [Date.now() + ms, callback, false];
        this.timeouts.push(handle);
        return handle;
    }
    clear(handle: boolean[]) {
        if (handle) handle[2] = true;
    }
    update() {
        const now = Date.now();
        for (const task of this.tasks) {
            if (now - task[1] >= task[0]) {
                try {
                    task[2]();
                } catch (e) {
                    api.log("Error in scheduled task: " + e);
                }
                task[1] = now;
            }
        }

        if (this.timeouts.length > 0) {
            const remaining: any[] = [];
            for (const timeout of this.timeouts) {
                if (timeout[2]) continue;
                if (now >= timeout[0]) {
                    try {
                        timeout[1]();
                    } catch (e) {
						console.error(e);
                    }
                } else {
                    remaining.push(timeout);
                }
            }
            this.timeouts = remaining;
        }
    }
}

const scheduler = new Scheduler();

tick = (_ms: any) => {
  // scheduler.update();
}

class Storage_ {
	static init (playerId: any, x: any, y: any, z: any) {
		if (api.getBlock(x, y, z) === "Air") {
			api.setBlock(x, y, z, "Chest");
			api.setStandardChestItemSlot(
				[x, y, z],
				0,
				"Stick",
				1,
				playerId,
				{
					customDisplayName: "__STORAGE__",
					customDescription: api.getPlayerDbId(playerId),
				},
			);
			return true;
		}
		return false;
	}
	static isStorage (x: any, y: any, z: any) {
		if (api.getBlock(x, y, z) === "Chest") {
			const item = api.getStandardChestItemSlot(
				[x, y, z],
				0,
			);
			const customDisplayName = item?.attributes?.customDisplayName;
			if (customDisplayName === "__STORAGE__") {
				return true;
			}
		}
		return false;
	}
	static isOwnStorage (playerId: any, x: any, y: any, z: any) {
		if (api.getBlock(x, y, z) === "Chest") {
			const item = api.getStandardChestItemSlot(
				[x, y, z],
				0,
			);
			const customDisplayName = item?.attributes?.customDisplayName;
			const customDescription = item?.attributes?.customDescription;
			if (customDisplayName === "__STORAGE__") {
				if (customDescription === api.getPlayerDbId(playerId)) {
					return true;
				}
			}
		}
		return false;
	}
	static set (playerId: any, x: any, y: any, z: any, index: number, value: any) {
		if (Storage_.isStorage(x, y, z) && 0 < index && index <= 35) {
			api.setStandardChestItemSlot(
				[x, y, z],
				index,
				"Stick",
				1,
				playerId,
				{ customDescription: JSON.stringify(value) },
			);
		} else {
			api.sendMessage(
				playerId,
				"Storage.set: Invalid block or index.",
				{ color: "red" },
			);
		}
	}
	static get (playerId: any, x: any, y: any, z: any, index: number) {
		if (Storage_.isStorage(x, y, z) && 0 < index && index <= 35) {
			const item = api.getStandardChestItemSlot(
				[x, y, z],
				index,
			);
			if (item?.attributes?.customDescription) {
				return JSON.parse(item?.attributes?.customDescription);
			}
		} else {
			api.sendMessage(
				playerId,
				"Storage.set: Invalid block or index.",
				{ color: "red" },
			);
		}
		return null;
	}
	static teardown (playerId: any, x: any, y: any, z: any) {
		if (Storage_.isStorage(x, y, z)) {
			for (let index = 0; index <= 35; index += 1) {
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
	}
  static onPlayerAttemptOpenChest = (playerId: any, x: any, y: any, z: any,	_isMoonstoneChest: any, _isIronChest: any) => {
    if (Storage_.isStorage(x, y, z)) {
      api.sendMessage(playerId, "You can't open that.", { color: "gold" });
      return "preventOpen";
    }
    return undefined;
  }
}

type PhaseBlock = [string, number];

interface Phase {
	name: string;
	blocks: PhaseBlock[];
}

const plains: Phase = {
	name: "Plains",
	blocks: [
		["Grass Block", 128],
		["Messy Stone", 128],
		["Coal Ore", 64],
		["Iron Ore", 32],
		["Gold Ore", 16],
		["Diamond Ore", 8],
	],
};

class OneBlock{
	static randomInt (min: number, max: number) {
		const minc = Math.ceil(min);
		const maxf = Math.floor(max);
		return Math.floor(Math.random() * (maxf - minc + 1) + minc);
	}
	static getRandomBlock (blocks: PhaseBlock[]): PhaseBlock {
		const total = blocks.reduce((acc: any, block: any[]) => acc + block[1], 0);
		const random = OneBlock.randomInt(1, total);
		let sum = 0;
		for (const block of blocks) {
			sum += block[1];
			if (random <= sum) {
				return block;
			}
		}
    return ["Air", 0];
	}

  static onPlayerChangeBlock (playerId: any, x: any, y: number, z: any, fromBlock: string, toBlock: string, _droppedItem: any, _fromBlockInfo: any, _toBlockInfo: any) {
    if (fromBlock === "Air") {
      const held = api.getHeldItem(playerId);
      if (held?.attributes?.customDisplayName === "One Block (Plains)") {
        const above = api.getBlock(x, y + 1, z);
        if (above === "Air") {
          Storage_.init(playerId, x, y, z);
          const block = OneBlock.getRandomBlock(plains.blocks);
          api.setBlock(x, y + 1, z, block[0]);
          Storage_.set(playerId, x, y, z, 1, "one_block_plains");
        } else {
          api.sendMessage(
            playerId,
            "Invalid placement.",
            { color: "gold" },
          );
          return "preventChange";
        }
      }
    }
    if (toBlock === "Air") {
      if (Storage_.isStorage(x, y, z)) {
        if (Storage_.isOwnStorage(playerId, x, y, z)) {
          if (Storage_.get(playerId, x, y, z, 1) === "one_block_plains") {
            Storage_.teardown(playerId, x, y, z);
            api.setBlock(x, y + 1, z, "Air");
            api.giveItem(playerId, "Chest", 1, {
              customDisplayName: "One Block (Plains)",
              customDescription: "Spawns plains blocks on top of it!",
            });
            return "preventDrop";
          }
        } else {
          return "preventChange";
        }
      }
      if (Storage_.isStorage(x, y - 1, z)) {
        if (Storage_.get(playerId, x, y - 1, z, 1) === "one_block_plains") {
                const block = OneBlock.getRandomBlock(plains.blocks);
          api.setBlock(x, y, z, block[0]);
        }
      }
    }
    return undefined;
  }

  static onPlayerChat (playerId: any, chatMessage: any) {
    switch (chatMessage) {
      case ".plains": {
        api.giveItem(playerId, "Chest", 1, {
          customDisplayName: "One Block (Plains)",
          customDescription: "Spawns plains blocks on top of it!",
          customAttributes: {}
        });
        api.sendMessage(
          playerId,
          "You received One Block (Plains).",
          { color: "gold" },
        );
        return false;
      }
      default: {
        break;
      }
    }
    return undefined;
  }
}

class TownSquare {
  static onPlayerJoin (playerId: any) {
    api.setCantChangeBlockRect(playerId, [-64, -1024, -64], [64, 1024, 64]);
  }
  static onPlayerDamagingOtherPlayer (attackingPlayer: any, damagedPlayer: any) {
    if (api.isInsideRect(api.getPosition(damagedPlayer), [-64, -1024, -64], [64, 1024, 64])) {
      api.sendMessage(attackingPlayer, "Can't attack inside the town square.", { color: "gold" });
      return "preventDamage";
    }
    return undefined;
  }
  static onPlayerChat (playerId: any, chatMessage: any) {
    switch (chatMessage) {
      case ".lock": {
        api.setCantChangeBlockRect(playerId, [-64, -1024, -64], [64, 1024, 64]);
        api.sendMessage(playerId, "Locked spawn area.", { color: "gold" });
        return false;
      }
      case ".unlock": {
        api.setCanChangeBlockRect(playerId, [-64, -1024, -64], [64, 1024, 64] );
        api.sendMessage(playerId, "Unlocked spawn area.", { color: "gold" });
        return false;
      }
      default: {
        break;
      }
    }
    return undefined
  }
}

onPlayerJoin = (playerId: any) => {
  return TownSquare.onPlayerJoin(playerId);
};

onPlayerChangeBlock = (playerId: any, x: any, y: number, z: any, fromBlock: string, toBlock: string, droppedItem: any, fromBlockInfo: any, toBlockInfo: any) => {
  return OneBlock.onPlayerChangeBlock(playerId, x, y, z, fromBlock, toBlock, droppedItem, fromBlockInfo, toBlockInfo);
};

onPlayerDamagingOtherPlayer = (attackingPlayer: any, damagedPlayer: any) => {
  return TownSquare.onPlayerDamagingOtherPlayer(attackingPlayer, damagedPlayer);
};

onPlayerChat = (playerId: any, chatMessage: any) => {
	return TownSquare.onPlayerChat(playerId, chatMessage) ?? OneBlock.onPlayerChat(playerId, chatMessage);
}

onPlayerAttemptOpenChest = (playerId: any, x: any, y: any, z: any,	isMoonstoneChest: any, isIronChest: any) => {
  return Storage_.onPlayerAttemptOpenChest(playerId, x, y, z,	isMoonstoneChest, isIronChest)
};


