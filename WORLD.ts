type GenericFunction = (...args: any[]) => any;

declare const api: {
	[key: string]: GenericFunction;
}

declare let tick: GenericFunction;
declare let onClose: GenericFunction;
declare let onPlayerJoin: GenericFunction;
declare let onPlayerLeave: GenericFunction;
declare let onPlayerJump: GenericFunction;
declare let onRespawnRequest: GenericFunction;
declare let playerCommand: GenericFunction;
declare let onPlayerChat: GenericFunction;
declare let onPlayerChangeBlock: GenericFunction;
declare let onPlayerDropItem: GenericFunction;
declare let onPlayerPickedUpItem: GenericFunction;
declare let onPlayerSelectInventorySlot: GenericFunction;
declare let onBlockStand: GenericFunction;
declare let onPlayerAttemptCraft: GenericFunction;
declare let onPlayerCraft: GenericFunction;
declare let onPlayerAttemptOpenChest: GenericFunction;
declare let onPlayerOpenedChest: GenericFunction;
declare let onPlayerMoveItemOutOfInventory: GenericFunction;
declare let onPlayerMoveInvenItem: GenericFunction;
declare let onPlayerMoveItemIntoIdxs: GenericFunction;
declare let onPlayerSwapInvenSlots: GenericFunction;
declare let onPlayerMoveInvenItemWithAmt: GenericFunction;
declare let onPlayerAttemptAltAction: GenericFunction;
declare let onPlayerAltAction: GenericFunction;
declare let onPlayerClick: GenericFunction;
declare let onClientOptionUpdated: GenericFunction;
declare let onMobSettingUpdated: GenericFunction;
declare let onInventoryUpdated: GenericFunction;
declare let onChestUpdated: GenericFunction;
declare let onWorldChangeBlock: GenericFunction;
declare let onCreateBloxdMeshEntity: GenericFunction;
declare let onEntityCollision: GenericFunction;
declare let onPlayerAttemptSpawnMob: GenericFunction;
declare let onWorldAttemptSpawnMob: GenericFunction;
declare let onPlayerSpawnMob: GenericFunction;
declare let onWorldSpawnMob: GenericFunction;
declare let onWorldAttemptDespawnMob: GenericFunction;
declare let onMobDespawned: GenericFunction;
declare let onPlayerAttack: GenericFunction;
declare let onPlayerDamagingOtherPlayer: GenericFunction;
declare let onPlayerDamagingMob: GenericFunction;
declare let onMobDamagingPlayer: GenericFunction;
declare let onMobDamagingOtherMob: GenericFunction;
declare let onAttemptKillPlayer: GenericFunction;
declare let onPlayerKilledOtherPlayer: GenericFunction;
declare let onMobKilledPlayer: GenericFunction;
declare let onPlayerKilledMob: GenericFunction;
declare let onMobKilledOtherMob: GenericFunction;
declare let onPlayerPotionEffect: GenericFunction;
declare let onPlayerDamagingMeshEntity: GenericFunction;
declare let onPlayerBreakMeshEntity: GenericFunction;
declare let onPlayerUsedThrowable: GenericFunction;
declare let onPlayerThrowableHitTerrain: GenericFunction;
declare let onTouchscreenActionButton: GenericFunction;
declare let onTaskClaimed: GenericFunction;
declare let onChunkLoaded: GenericFunction;
declare let onPlayerRequestChunk: GenericFunction;
declare let onItemDropCreated: GenericFunction;
declare let onPlayerStartChargingItem: GenericFunction;
declare let onPlayerFinishChargingItem: GenericFunction;
declare let onPlayerFinishQTE: GenericFunction;
declare let onPlayerBoughtShopItem: GenericFunction;
declare let doPeriodicSave: GenericFunction;

interface MessageStyle {
	color?: string;
	fontWeight?: number;
}

/**
 * @description message
 */
const m = (playerId: string, message: string, style: MessageStyle) => api.sendMessage(playerId, message, style);

/**
 * @description style
 */
const s = (color: string, fontWeight?: number) => ({ color, fontWeight });

interface ProtectedRect {
	from: [number, number, number];
	to: [number, number, number];
}

const protectedTownSquare: ProtectedRect = { from: [-64, -1024, -64], to: [64, 1024, 64] };

const protectedAyuuJagannath: ProtectedRect = { from: [-11, -10, 65], to: [-21, -4, 82] };

const protectedRects: ProtectedRect[] = [
	protectedTownSquare,
	protectedAyuuJagannath,
];

// @ts-ignore
globalThis.m = m;
// @ts-ignore
globalThis.ms = s;

class ChestStorage {
	static init(playerId: any, x: any, y: any, z: any) {
		if (api.getBlock(x, y, z) === "Air") {
			api.setBlock(x, y, z, "Loot Chest");
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
	static isStorage(x: any, y: any, z: any) {
		if (api.getBlock(x, y, z) === "Loot Chest") {
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
	static isOwnStorage(playerId: any, x: any, y: any, z: any) {
		if (api.getBlock(x, y, z) === "Loot Chest") {
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
	static set(playerId: any, x: any, y: any, z: any, index: number, value: any) {
		if (ChestStorage.isStorage(x, y, z)) {
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
				m(playerId, "Storage.set: Invalid index.", s("red"));
			}
		} else {
			m(playerId, "Storage.set: Invalid block.", s("red"));
		}
	}
	static get(playerId: any, x: any, y: any, z: any, index: number) {
		if (ChestStorage.isStorage(x, y, z)) {
			if (0 < index && index <= 35) {
				const item = api.getStandardChestItemSlot(
					[x, y, z],
					index,
				);
				if (item?.attributes?.customDescription) {
					return JSON.parse(item?.attributes?.customDescription);
				}
			} else {
				m(playerId, "Storage.set: Invalid index.", s("red"));
			}
		} else {
				m(playerId, "Storage.set: Invalid block.", s("red"));
		}
		return null;
	}
	static teardown(playerId: any, x: any, y: any, z: any) {
		if (ChestStorage.isStorage(x, y, z)) {
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
	static onPlayerAttemptOpenChest = (playerId: any, x: any, y: any, z: any, _isMoonstoneChest: any, _isIronChest: any) => {
		if (ChestStorage.isStorage(x, y, z)) {
			m(playerId, "You can't open that.", s("gold"));
			return "preventOpen";
		}
		return undefined;
	}
}

type PhaseBlock = [string, number, string?];

interface Phase {
	id: string;
	name: string;
	description: string;
	blocks: PhaseBlock[];
}

/**
 * @url https://bloxd-io.fandom.com/wiki/One_Block
 */
const phasesByIds = new Map<string, Phase>();
const phasesByNames = new Map<string, Phase>();

// @ts-ignore
globalThis.phasesByIds = phasesByIds;
// @ts-ignore
globalThis.phasesByNames = phasesByNames;

const forest: Phase = {
	id: "forest",
	name: "One Block (Forest)",
	description: "Creates a one block for forest phase. Dirt, Grass Block, Maple Log, Stone, Maple Leaves, Fruity Maple Leaves, and Chest.",
	blocks: [
		["Dirt", 1],
		["Grass Block", 1],
		["Maple Log", 1],
		["Stone", 1],
		["Maple Leaves", 1],
		["Fruity Maple Leaves", 1],
		["Chest", 1],
	],
};
phasesByIds.set(forest.id, forest);
phasesByNames.set(forest.name, forest);

const plains: Phase = {
	id: "plains",
	name: "One Block (Plains)",
	description: "Creates a one block for plains phase. Clay, Sand, Gravel, Dirt, Grass Block, Plum Log, Stone, Plum Leaves, Fruity Plum Leaves, and Chest.",
	blocks: [
		["Clay", 1],
		["Sand", 1],
		["Gravel", 1],
		["Dirt", 1],
		["Grass Block", 1],
		["Plum Log", 1],
		["Stone", 1],
		["Plum Leaves", 1],
		["Fruity Plum Leaves", 1],
		["Chest", 1],
	],
};
phasesByIds.set(plains.id, plains);
phasesByNames.set(plains.name, plains);


const hills: Phase = {
	id: "hills",
	name: "One Block (Hills)",
	description: "Creates a one block for hills phase. Cedar Log, Cedar Leaves, Granite, Coal Ore, Iron Ore, Grass Block, Rocky Dirt, Stone, Pear Log, Fruity Pear Leaves, Pear Leaves, and Chest.",
	blocks: [
		["Cedar Log", 1],
		["Cedar Leaves", 1],
		["Granite", 1],
		["Coal Ore", 1],
		["Iron Ore", 1],
		["Grass Block", 1],
		["Rocky Dirt", 1],
		["Stone", 1],
		["Pear Log", 1],
		["Fruity Pear Leaves", 1],
		["Pear Leaves", 1],
		["Chest", 1],
	],
};
phasesByIds.set(hills.id, hills);
phasesByNames.set(hills.name, hills);

const flowers: Phase = {
	id: "flowers",
	name: "One Block (Flowers)",
	description: "Creates a one block for flowers. Dandelion, Poppy, Red Tulip, Pink Tulip, White Tulip, Orange Tulip, Daisy, Bluebell, Forget-me-not, Allium, Azure Bluet, Lily of the Valley, and Shadow Rose.",
	blocks: [
		["Dandelion", 1],
		["Poppy", 1],
		["Red Tulip", 1],
		["Pink Tulip", 1],
		["White Tulip", 1],
		["Orange Tulip", 1],
		["Daisy", 1],
		["Bluebell", 1],
		["Forget-me-not", 1],
		["Allium", 1],
		["Azure Bluet", 1],
		["Lily of the Valley", 1],
		["Shadow Rose", 1],
		["Red Mushroom", 1],
		["Brown Mushroom", 1],
	],
};
phasesByIds.set(flowers.id, flowers);
phasesByNames.set(flowers.name, flowers);

const logs: Phase = {
	id: "logs",
	name: "One Block (Logs)",
	description: "Creates a one block for logs. Maple, Pine, Plum, Cedar, Aspen, Jungle, Palm, Pear, Cherry, Spectral, and Mango.",
	blocks: [
		["Maple Log", 1],
		["Pine Log", 1],
		["Plum Log", 1],
		["Cedar Log", 1],
		["Aspen Log", 1],
		["Jungle Log", 1],
		["Palm Log", 1],
		["Pear Log", 1],
		["Cherry Log", 1],
		["Spectral Log", 1],
		["Mango Log", 1],
	],
};
phasesByIds.set(logs.id, logs);
phasesByNames.set(logs.name, logs);

const saplings: Phase = {
	id: "saplings",
	name: "One Block (Saplings)",
	description: "Creates a one block for saplings. Maple, Pine, Plum, Cedar, Aspen, Jungle, Palm, Pear, Cherry, Spectral, and Mango.",
	blocks: [
		["Maple Sapling", 1],
		["Pine Sapling", 1],
		["Plum Sapling", 1],
		["Cedar Sapling", 1],
		["Aspen Sapling", 1],
		["Jungle Sapling", 1],
		["Palm Sapling", 1],
		["Pear Sapling", 1],
		["Cherry Sapling", 1],
		["Spectral Sapling", 1],
		["Mango Sapling", 1],
	],
};
phasesByIds.set(saplings.id, saplings);
phasesByNames.set(saplings.name, saplings);

class OneBlock {
	static randomInt(min: number, max: number) {
		const minc = Math.ceil(min);
		const maxf = Math.floor(max);
		return Math.floor(Math.random() * (maxf - minc + 1) + minc);
	}
	static getRandomBlock(blocks: PhaseBlock[]): PhaseBlock {
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

	static onPlayerAltAction (playerId: any, x: any, y: any, z: any, _block: any, _targetEId: any) {
		const held = api.getHeldItem(playerId);
		const customDisplayName = held?.attributes?.customDisplayName;
		if (phasesByNames.has(customDisplayName)) {
			const phase = phasesByNames.get(customDisplayName);
			if (phase) {
				for (const protectedRect of protectedRects) {
					if (api.isInsideRect(api.getPosition([x, y, z]), protectedRect.from, protectedRect.to)) {
						m(playerId, "Invalid placement, protected area.", s("gold"));
						return undefined;
					}
				}
				const above = api.getBlock(x, y + 1, z);
				const above2 = api.getBlock(x, y + 2, z);
				if (above === "Air" && above2 === "Air") {
					api.setItemSlot(playerId, api.getSelectedInventorySlotI(playerId), "Air");
					ChestStorage.init(playerId, x, y + 1, z);
					ChestStorage.set(playerId, x, y + 1, z, 1, "one_block"); // type
					ChestStorage.set(playerId, x, y + 1, z, 2, phase.id); // subtype
					const block = OneBlock.getRandomBlock(phase.blocks);
					api.setBlock(x, y + 2, z, block[0]);
				} else {
					m(playerId, "Invalid placement, not enough space.", s("gold"));
				}
			}
		}
	}

	static onPlayerChangeBlock(playerId: any, x: any, y: number, z: any, _fromBlock: string, toBlock: string, _droppedItem: any, _fromBlockInfo: any, _toBlockInfo: any) {
		/**
		 * @description Displacement
		 */
		if (toBlock === "Air") {
			/**
			 * @description One Block Displacement
			 */
			if (ChestStorage.isStorage(x, y, z)) {
				if (ChestStorage.isOwnStorage(playerId, x, y, z)) {
					const type = ChestStorage.get(playerId, x, y, z, 1);
					if (type === "one_block") {
						const subtype = ChestStorage.get(playerId, x, y, z, 2);
						if (phasesByIds.has(subtype)) {
							const phase = phasesByIds.get(subtype);
							if (phase) {
								ChestStorage.teardown(playerId, x, y, z);
								api.setBlock(x, y + 1, z, "Air");
								api.giveItem(playerId, "Stick", 1, {
									customDisplayName: phase.name,
									customDescription: phase.description,
								});
								return "preventDrop";
							}
						}
					}
				} else {
					m(playerId, "That's not yours.", s("gold"));
					return "preventChange";
				}
			}
			/**
			 * @description Block Displacement
			 */
			if (ChestStorage.isStorage(x, y - 1, z)) {
				const type = ChestStorage.get(playerId, x, y - 1, z, 1);
				if (type === "one_block") {
					const subtype = ChestStorage.get(playerId, x, y - 1, z, 2);
					if (phasesByIds.has(subtype)) {
						const phase = phasesByIds.get(subtype);
						if (phase) {
							const block = OneBlock.getRandomBlock(phase.blocks);
							api.setBlock(x, y, z, block[0]);
						}
					}
				}
			}
		}
		return undefined;
	}

	static onPlayerChat(playerId: any, chatMessage: any) {
		for (const key of phasesByIds.keys()) {
			if (chatMessage === `.${key}`) {
				const phase = phasesByIds.get(key);
				if (phase) {
					api.giveItem(playerId, "Stick", 1, {
						customDisplayName: phase.name,
						customDescription: phase.description,
					});
					m(playerId, `You received ${phase.name}.`, s("gold"));
					return false;
				}
			}
		}
		switch (chatMessage) {
			case ".oneblock": {
				const commands = Array.from(phasesByIds.values()).map((phase) => `.${phase.id}`).join(', ');
				m(playerId, `OneBlock test commands: ${commands}`, s("gold"));
				return false;
			}
			default: {
				break;
			}
		}
		return undefined;
	}
}

const playersIds = new Set();

class TownSquare {
	static onPlayerJoin(playerId: any) {
		for (const protectedRect of protectedRects) {
			api.setCantChangeBlockRect(playerId, protectedRect.from, protectedRect.to);
		}
		playersIds.add(playerId);
	}
	static onPlayerLeave(playerId: any, _serverIsShuttingDown: any) {
		playersIds.delete(playerId);
	}
	static onPlayerDamagingOtherPlayer(attackingPlayer: any, damagedPlayer: any) {
		if (api.isInsideRect(api.getPosition(damagedPlayer), [-64, -1024, -64], [64, 1024, 64])) {
			api.sendMessage(attackingPlayer, "Can't attack inside the town square.", s("gold"));
			return "preventDamage";
		}
		return undefined;
	}
	static onPlayerChat(playerId: any, chatMessage: any) {
		switch (chatMessage) {
			case ".lock": {
				api.setCantChangeBlockRect(playerId, [-64, -1024, -64], [64, 1024, 64]);
				m(playerId, "Locked spawn area.", s("gold"));
				return false;
			}
			case ".unlock": {
				api.setCanChangeBlockRect(playerId, [-64, -1024, -64], [64, 1024, 64]);
				m(playerId, "Unlocked spawn area.", s("gold"));
				return false;
			}
			default: {
				break;
			}
		}
		return undefined
	}
}

/**
 * @description Global Event Handlers. return them, and chain them with "??".
 */

onPlayerJoin = (playerId: any) => {
	return TownSquare.onPlayerJoin(playerId);
};

onPlayerLeave = (playerId: any, serverIsShuttingDown: any) => {
	return TownSquare.onPlayerLeave(playerId, serverIsShuttingDown);
};

onPlayerAltAction = (playerId: any, x: any, y: any, z: any, block: any, targetEId: any) => {
	return OneBlock.onPlayerAltAction(playerId, x, y, z, block, targetEId);
}

onPlayerChangeBlock = (playerId: any, x: any, y: number, z: any, fromBlock: string, toBlock: string, droppedItem: any, fromBlockInfo: any, toBlockInfo: any) => {
	return OneBlock.onPlayerChangeBlock(playerId, x, y, z, fromBlock, toBlock, droppedItem, fromBlockInfo, toBlockInfo);
};

onPlayerDamagingOtherPlayer = (attackingPlayer: any, damagedPlayer: any) => {
	return TownSquare.onPlayerDamagingOtherPlayer(attackingPlayer, damagedPlayer);
};

onPlayerChat = (playerId: any, chatMessage: any) => {
	return TownSquare.onPlayerChat(playerId, chatMessage) ?? OneBlock.onPlayerChat(playerId, chatMessage);
}

onPlayerAttemptOpenChest = (playerId: any, x: any, y: any, z: any, isMoonstoneChest: any, isIronChest: any) => {
	return ChestStorage.onPlayerAttemptOpenChest(playerId, x, y, z, isMoonstoneChest, isIronChest)
};


