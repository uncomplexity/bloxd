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
const b = (message: string, style: MessageStyle) => api.broadcastMessage(message, style);

/**
 * @description message
 */
const m = (playerId: string, message: string, style: MessageStyle) => api.sendMessage(playerId, message, style);

/**
 * @description style
 */
const s = (color: string, fontWeight?: number) => ({ color, fontWeight });

type Point = [number, number, number];

type Rect = [Point, Point];


/**
 * @description
 * 
 * Be wary of Degenerate Whitelist Rects.
 * 
 * For example:
 * 
 * static whitelist = new Set<Rect>([
 * 	 [[0, 0, 18], [0, 1, 18]],   // x: 0→0, z: 18→18
 *   [[2, 0, 18], [2, 1, 18]],   // x: 2→2, z: 18→18
 * ]);
 * 
 * Both corners of each rect share the same X and Z values — they only differ in Y.
 * This makes them degenerate rects with zero width and depth (essentially a line segment, not a volume).
 * api.isInsideRect almost certainly doesn't consider a point to be "inside" a zero-area/zero-volume shape.
 * 
 * The two corner points must differ in all three axes that isInsideRect can reason about.
 * 
 */
class RectControl {
	static playerIds = new Set<string>();

	static unlockedPlayerIds = new Set<string>();

	static blacklist = new Set<Rect>([
		[[-64, -1024, -64], [64, 1024, 64]],
		[[-11, -10, 65], [-21, -4, 82]],
	]);

	static whitelist = new Set<Rect>([
		[[2, 0, 18], [18, 1, 18]],
	]);

	static unlock(playerId: string) {
		RectControl.unlockedPlayerIds.add(playerId);
		m(playerId, "Rects unlocked.", s("gold"));
	}

	static lock(playerId: string) {
		RectControl.unlockedPlayerIds.delete(playerId);
		m(playerId, "Rects locked.", s("gold"));
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
    RectControl.unlockedPlayerIds.delete(playerId);
	}

	static onPlayerChangeBlock (
		playerId: string,
		x: number, y: number, z: number,
		_fromBlock: string, _toBlock: string,
		_droppedItem: string | null,
		_fromBlockInfo: unknown, _toBlockInfo: unknown
	) {
		if (RectControl.isProtected([x, y, z], playerId)) {
			m(playerId, "That area is protected.", s("gold"));
			return "preventChange";
		}
		return undefined;
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

// @ts-ignore
globalThis.b = b;
// @ts-ignore
globalThis.m = m;
// @ts-ignore
globalThis.s = s;

class ChestStorage {
	static init(playerId: any, x: any, y: any, z: any) {
		if (api.getBlock(x, y, z) === "Air") {
			api.setBlock(x, y, z, "Iron Chest");
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
		if (api.getBlock(x, y, z) === "Iron Chest") {
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
		if (api.getBlock(x, y, z) === "Iron Chest") {
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
				m(playerId, "Storage.get: Invalid index.", s("red"));
			}
		} else {
				m(playerId, "Storage.get: Invalid block.", s("red"));
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
		if (api.getBlock(x, y, z) === "Chest") {
			if (ChestStorage.isStorage(x, y - 1, z)) {
				m(playerId, "Break it to find out what's inside!", s("gold"));
				return "preventOpen";
			}
		}
		if (ChestStorage.isStorage(x, y, z)) {
			m(playerId, "That's a one block.", s("gold"));
			return "preventOpen";
		}
		return undefined;
	}
}

type Nullable<T> = T | null;

/**
 * @description Weight, BlockName, ItemName = BlockName, ItemMin = 1, ItemMax = null
 */
type PhaseBlock = [number, string, Nullable<string>?, Nullable<number>?, Nullable<number>?];

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

const usage = "Right click on the ground to place it. Destroy it to pick it up.";

const forest: Phase = {
	id: "forest",
	name: "One Block (Forest)",
	description: `Creates a one block for forest phase. ${usage}`,
	blocks: [
		[1, "Dirt"],
		[1, "Grass Block"],
		[1, "Maple Log"],
		[1, "Stone"],
		[1, "Maple Leaves"],
		[1, "Fruity Maple Leaves"],
		[1, "Chest", "Gold Coin", 1, 2],
	],
};
phasesByIds.set(forest.id, forest);
phasesByNames.set(forest.name, forest);

const plains: Phase = {
	id: "plains",
	name: "One Block (Plains)",
	description: `Creates a one block for plains phase. ${usage}`,
	blocks: [
		[1, "Clay"],
		[1, "Sand"],
		[1, "Gravel"],
		[1, "Dirt"],
		[1, "Grass Block"],
		[1, "Plum Log"],
		[1, "Stone"],
		[1, "Plum Leaves"],
		[1, "Fruity Plum Leaves"],
		[1, "Chest", "Gold Coin", 1, 3],
	],
};
phasesByIds.set(plains.id, plains);
phasesByNames.set(plains.name, plains);

const hills: Phase = {
	id: "hills",
	name: "One Block (Hills)",
	description: `Creates a one block for hills phase. ${usage}`,
	blocks: [
		[1, "Cedar Log"],
		[1, "Cedar Leaves"],
		[1, "Granite"],
		[1, "Coal Ore"],
		[1, "Iron Ore"],
		[1, "Grass Block"],
		[1, "Rocky Dirt"],
		[1, "Stone"],
		[1, "Pear Log"],
		[1, "Fruity Pear Leaves"],
		[1, "Pear Leaves"],
		[1, "Chest", "Gold Coin", 1, 4],
	],
};
phasesByIds.set(hills.id, hills);
phasesByNames.set(hills.name, hills);

const flowers: Phase = {
	id: "flowers",
	name: "One Block (Flowers)",
	description: `Creates a one block for flowers. ${usage}`,
	blocks: [
		[1, "Dandelion"],
		[1, "Poppy"],
		[1, "Red Tulip"],
		[1, "Pink Tulip"],
		[1, "White Tulip"],
		[1, "Orange Tulip"],
		[1, "Daisy"],
		[1, "Bluebell"],
		[1, "Forget-me-not"],
		[1, "Allium"],
		[1, "Azure Bluet"],
		[1, "Lily of the Valley"],
		[1, "Shadow Rose"],
		[1, "Red Mushroom"],
		[1, "Brown Mushroom"],
		[1, "Fallen Pine Cone"],
	],
};
phasesByIds.set(flowers.id, flowers);
phasesByNames.set(flowers.name, flowers);

const logs: Phase = {
	id: "logs",
	name: "One Block (Logs)",
	description: `Creates a one block for logs. ${usage}`,
	blocks: [
		[1, "Maple Log"],
		[1, "Pine Log"],
		[1, "Plum Log"],
		[1, "Cedar Log"],
		[1, "Aspen Log"],
		[1, "Jungle Log"],
		[1, "Palm Log"],
		[1, "Pear Log"],
		[1, "Cherry Log"],
		[1, "Spectral Log"],
		[1, "Mango Log"],
	],
};
phasesByIds.set(logs.id, logs);
phasesByNames.set(logs.name, logs);

const leaves: Phase = {
	id: "leaves",
	name: "One Block (Leaves)",
	description: `Creates a one block for leaves. ${usage}`,
	blocks: [
		[1, "Maple Leaves"],
		[1, "Pine Leaves"],
		[1, "Plum Leaves"],
		[1, "Cedar Leaves"],
		[1, "Aspen Leaves"],
		[1, "Jungle Leaves"],
		[1, "Palm Leaves"],
		[1, "Pear Leaves"],
		[1, "Cherry Leaves"],
		[1, "Spectral Leaves"],
		[1, "Mango Leaves"],
	],
};
phasesByIds.set(leaves.id, leaves);
phasesByNames.set(leaves.name, leaves);

const saplings: Phase = {
	id: "saplings",
	name: "One Block (Saplings)",
	description: `Creates a one block for saplings. ${usage}`,
	blocks: [
		[1, "Maple Sapling"],
		[1, "Pine Sapling"],
		[1, "Plum Sapling"],
		[1, "Cedar Sapling"],
		[1, "Aspen Sapling"],
		[1, "Jungle Sapling"],
		[1, "Palm Sapling"],
		[1, "Pear Sapling"],
		[1, "Cherry Sapling"],
		[1, "Spectral Sapling"],
		[1, "Mango Sapling"],
	],
};
phasesByIds.set(saplings.id, saplings);
phasesByNames.set(saplings.name, saplings);

const soils: Phase = {
	id: "soils",
	name: "One Block (Soils)",
	description: `Creates a one block for natural soils. ${usage}`,
	blocks: [
		[1, "Gravel"],
		[1, "Rocky Dirt"],
		[1, "Messy Dirt"],
		[4, "Grass Block"],
		[4, "Dirt"],
		[4, "Stone"],
		[4, "Messy Stone"],
		[4, "Diorite"],
		[4, "Granite"],
		[4, "Andesite"],
		[4, "Sand"],
		[4, "Red Sand"],
		[4, "Snow"],
		[4, "Ice"],
		[2, "Clay"],
		[2, "Chalk"],
		[2, "Mossy Messy Stone"],
		[2, "Dark Red Stone"],
		[2, "Sandstone"],
		[2, "Red Sandstone"],
		[2, "Green Stone"],
	],
};
phasesByIds.set(soils.id, soils);
phasesByNames.set(soils.name, soils);

const bricks: Phase = {
	id: "bricks",
	name: "One Block (Bricks)",
	description: `Creates a one block for bricks. ${usage}`,
	blocks: [
		[1, "Bricks"],
		[1, "Stone Bricks"],
		[1, "Mossy Stone Bricks"],
		[1, "Cracked Stone Bricks"],
		[1, "Andesite Bricks"],
		[1, "Granite Bricks"],
		[1, "Diorite Bricks"],
		[1, "Sandstone Bricks"],
		[1, "Red Sandstone Bricks"],
		[1, "Green Bricks"],
		[1, "Dark Green Bricks"],
		[1, "Dark Red Brick"],
		[1, "Ice Bricks"],
	],
};
phasesByIds.set(bricks.id, bricks);
phasesByNames.set(bricks.name, bricks);

const polished: Phase = {
	id: "polished",
	name: "One Block (Polished)",
	description: `Creates a one block for polished stones. ${usage}`,
	blocks: [
		[1, "Smooth Stone"],
		[1, "Smooth Andesite"],
		[1, "Smooth Granite"],
		[1, "Smooth Diorite"],
		[1, "Smooth Sandstone"],
		[1, "Smooth Red Sandstone"],
		[1, "Block of Quartz"],
	],
};
phasesByIds.set(polished.id, polished);
phasesByNames.set(polished.name, polished);


const engraved: Phase = {
	id: "engraved",
	name: "One Block (Engraved)",
	description: `Creates a one block for engraved stones. ${usage}`,
	blocks: [
		[1, "Engraved Stone"],
		[1, "Engraved Andesite"],
		[1, "Engraved Granite"],
		[1, "Engraved Diorite"],
		[1, "Engraved Sandstone"],
		[1, "Engraved Red Sandstone"],
		[1, "Marked Sandstone"],
		[1, "Marked Red Sandstone"],
		[1, "Chiseled Block of Quartz"],
	],
};
phasesByIds.set(engraved.id, engraved);
phasesByNames.set(engraved.name, engraved);

const coins: Phase = {
	id: "coins",
	name: "One Block (Coins)",
	description: `Creates a one block for gold coins. ${usage}`,
	blocks: [
		[1, "Chest", "Gold Coin", 1],
	],
};
phasesByIds.set(coins.id, coins);
phasesByNames.set(coins.name, coins);


const fruits: Phase = {
	id: "fruits",
	name: "One Block (Fruits)",
	description: `Creates a one block for fruits. ${usage}`,
	blocks: [
	[1, "Apple Block"],
	[1, "Cherry Block"],
	[1, "Coconut Block"],
	[1, "Corn Block"],
	[1, "Pear Block"],
	[1, "Plum Block"],
	[1, "Mango Block"],
	[1, "Carrot Block"],
	[1, "Potato Block"],
	[1, "Beetroot Block"],
	[1, "Chili Pepper Block"],
	[1, "Banana Block"],
	[1, "Watermelon"],
	[1, "Melon"],
	[1, "Pumpkin"],
	],
};
phasesByIds.set(fruits.id, fruits);
phasesByNames.set(fruits.name, fruits);

const colors = [
	"White",
	"Light Gray",
	"Gray",
	"Black",
	"Brown",
	"Red",
	"Orange",
	"Yellow",
	"Lime",
	"Green",
	"Cyan",
	"Light Blue",
	"Blue",
	"Purple",
	"Magenta",
	"Pink",
];

const suffixes = [
	"Planks", "Wool", "Baked Clay", "Chalk", "Chalk Bricks", "Concrete", "Ceramic",
	"Glass", "Patterned Glass",
	"Banner", "Carpet",
	"Paintball Explosive", "Quick Paintball Explosive", "Seeking Paintball Explosive", "Sticky Paintball Explosive",
	"Portal",
];

for (const suffix of suffixes) {
	const lcase = suffix.replace(' ', '').replace(' ', '').toLocaleLowerCase();
	const blocks: PhaseBlock[] = [
		...colors.map((color) => {
			const blockName = suffix === "Patterned Glass" ? `Patterned ${color} Glass` : `${color} ${suffix}`;
			const block: PhaseBlock = [1, blockName, blockName, 1];
			return block;
		}),
	];
	if (suffix === "Banner") {
		blocks.push( [1, "Skull Banner", "Skull Banner", 1]);
		blocks.push( [1, "Rainbow Banner", "Rainbow Banner", 1]);
	}
	const phase: Phase = {
		id: lcase,
		name: `One Block (${suffix})`,
		description: `Creates a one block for Colored ${suffix}. Right click on the ground to place it. Destroy it to pick it up.`,
		blocks,
	};
	phasesByIds.set(phase.id, phase);
	phasesByNames.set(phase.name, phase);
}

for (const phase of phasesByIds.values()) {
	for (const block of phase.blocks) {
		// ItemName = BlockName
		if (!block[2]) {
			block[2] = block[1];
		}
		// ItemMin = null ?? 1
		if (!block[3]) {
			block[3] = null;
		}
		// ItemMax = null
		if (!block[4]) {
			block[4] = null;
		}
	}
}

const isInsideTownSquare = (point: Point) => {
	return api.isInsideRect(point, [-64, -1024, -64], [64, 1024, 64]);
};

class OneBlock {
	static totals = new Map<unknown[], number>();

	static randomInt(min: number, max: number) {
		const minc = Math.ceil(min);
		const maxf = Math.floor(max);
		return Math.floor(Math.random() * (maxf - minc + 1) + minc);
	}

	static getRandomBlock(blocks: PhaseBlock[]): PhaseBlock {
		if (!OneBlock.totals.has(blocks)) {
			const total = blocks.reduce((acc: number, block: PhaseBlock) => acc + block[0], 0);
			OneBlock.totals.set(blocks, total);
		}
		const total = OneBlock.totals.get(blocks);
		if (total) {
			const random = OneBlock.randomInt(1, total);
			let sum = 0;
			for (const block of blocks) {
				sum += block[0];
				if (random <= sum) {
					return block;
				}
			}
		}
		return [0, "Air"];
	}

	static onPlayerAltAction (playerId: any, x: any, y: any, z: any, _block: any, _targetEId: any) {
		/**
		 * @description One Block Placement
		 */
		if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
			const held = api.getHeldItem(playerId);
			const customDisplayName = held?.attributes?.customDisplayName;
			if (phasesByNames.has(customDisplayName)) {
				const phase = phasesByNames.get(customDisplayName);
				if (phase) {
					if (RectControl.isProtected([x, y + 1, z], playerId) || RectControl.isProtected([x, y + 2, z], playerId)) {
						m(playerId, "Invalid placement, protected area.", s("gold"));
						return undefined;
					}
					const above = api.getBlock(x, y + 1, z);
					const above2 = api.getBlock(x, y + 2, z);
					if (above === "Air" && above2 === "Air") {
						api.setItemSlot(playerId, api.getSelectedInventorySlotI(playerId), "Air");
						ChestStorage.init(playerId, x, y + 1, z);
						const block = OneBlock.getRandomBlock(phase.blocks);
						api.setBlock(x, y + 2, z, block[1]);
						const limit = isInsideTownSquare([x, y + 1, z]) ? 16 : 0;
						const counter = Math.floor(api.now() / 60000);
						const current = 0;
						ChestStorage.set(playerId, x, y + 1, z, 1, ["one_block", phase.id, ...block, limit, counter, current]);
					} else {
						m(playerId, "Invalid placement, not enough space.", s("gold"));
					}
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
					const metadata = ChestStorage.get(playerId, x, y, z, 1);
					const type = metadata[0];
					const subtype = metadata[1];
					if (type === "one_block") {
						if (phasesByIds.has(subtype)) {
							const phase = phasesByIds.get(subtype);
							if (phase) {
								ChestStorage.teardown(playerId, x, y, z);
								api.setBlock(x, y + 1, z, "Air");
								api.giveItem(playerId, "Stick", 1, {
									customDisplayName: phase.name,
									customDescription: phase.description,
								});
								RectControl.whitelistDelete([[x, y, z], [x, y + 1, z]]);
								return "preventDrop";
							}
						}
					}
				} else {
					m(playerId, "That one block is not yours.", s("gold"));
					return "preventChange";
				}
			}
			/**
			 * @description Block Displacement
			 */
			if (ChestStorage.isStorage(x, y - 1, z)) {
				const metadata = ChestStorage.get(playerId, x, y - 1, z, 1);
				const type = metadata[0];
				const subtype = metadata[1];
				if (type === "one_block") {
					if (phasesByIds.has(subtype)) {
						const phase = phasesByIds.get(subtype);
						if (phase) {
							const limit = metadata[7] ?? (isInsideTownSquare([x, y - 1, z]) ? 16 : 0);
							let counter = metadata[8] ?? api.now() / 60000;
							let current = metadata[9] ?? 0;

							if (limit > 0) {
								const counter2 = Math.floor(api.now() / 60000);
								if (counter < counter2) {
									counter = counter2;
									current = 0;
								}
								current += 1;
								if (current > limit) {
									const timeToReset = Math.floor((60000 - (api.now() % 60000)) / 1000);
									m(playerId, `This one block preview has reached its rate limit of ${limit} blocks per minute, it will reset in ${timeToReset} seconds. Buy it for no limits.`, s("gold"));
									return "preventChange";
								}
							}
							const itemName = metadata[4] ?? metadata[3];
							let amount = metadata[5] ?? 1;
							if (metadata[6]) {
								amount = OneBlock.randomInt(metadata[5], metadata[6]);
							}
							api.createItemDrop(x + 0.50, y + 0.50 + Math.random(), z + 0.50, itemName, amount, false, {}, 16000, null, {})
							const block = OneBlock.getRandomBlock(phase.blocks);
							api.setBlock(x, y, z, block[1]);
							ChestStorage.set(playerId, x, y - 1, z, 1, [type, subtype, ...block, limit, counter, current]);
							return "preventDrop";
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

type BlockName = string;
type WorldBlockChangedInfo = Record<string, unknown>;

class TownSquare {
	static onWorldChangeBlock (x: number, y: number, z: number, _fromBlock: BlockName, _toBlock: BlockName, initiatorDbId: string | null, _extraInfo: WorldBlockChangedInfo) {
		b(JSON.stringify({ _extraInfo }), s("gold"));
		if (api.isInsideRect([x, y, z], [-64, -1024, -64], [64, 1024, 64])) {
			return "preventChange";
		}
		return undefined;
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
			case ".test": {
				m(playerId, "Hello world!", s("gold"));
				return false;
			}
			default: {
				break;
			}
		}
		if (chatMessage.startsWith(".give ")) {
			const item = chatMessage.substring(6);
			api.giveItem(playerId, item, 1, {});
			return false;
		}
		return undefined
	}
}

/**
 * @description Global Event Handlers. return them, and chain them with "??".
 */

onPlayerJoin = (playerId: any) => {
	return RectControl.onPlayerJoin(playerId);
};

onPlayerLeave = (playerId: any, serverIsShuttingDown: any) => {
	return RectControl.onPlayerLeave(playerId, serverIsShuttingDown);
};

onPlayerAltAction = (playerId: any, x: any, y: any, z: any, block: any, targetEId: any) => {
	return OneBlock.onPlayerAltAction(playerId, x, y, z, block, targetEId);
}

onPlayerChangeBlock = (playerId: any, x: any, y: number, z: any, fromBlock: string, toBlock: string, droppedItem: any, fromBlockInfo: any, toBlockInfo: any) => {
	return OneBlock.onPlayerChangeBlock(playerId, x, y, z, fromBlock, toBlock, droppedItem, fromBlockInfo, toBlockInfo)
		?? RectControl.onPlayerChangeBlock(playerId, x, y, z, fromBlock, toBlock, droppedItem, fromBlockInfo, toBlockInfo);
};

onWorldChangeBlock = (x: number, y: number, z: number, fromBlock: BlockName, toBlock: BlockName, initiatorDbId: string | null, extraInfo: WorldBlockChangedInfo) => {
	return TownSquare.onWorldChangeBlock(x, y, z, fromBlock, toBlock, initiatorDbId, extraInfo);
}

onPlayerDamagingOtherPlayer = (attackingPlayer: any, damagedPlayer: any) => {
	return TownSquare.onPlayerDamagingOtherPlayer(attackingPlayer, damagedPlayer);
};

onPlayerChat = (playerId: any, chatMessage: any) => {
	return TownSquare.onPlayerChat(playerId, chatMessage)
		?? RectControl.onPlayerChat(playerId, chatMessage)
		?? OneBlock.onPlayerChat(playerId, chatMessage);
}

onPlayerAttemptOpenChest = (playerId: any, x: any, y: any, z: any, isMoonstoneChest: any, isIronChest: any) => {
	return ChestStorage.onPlayerAttemptOpenChest(playerId, x, y, z, isMoonstoneChest, isIronChest)
};
