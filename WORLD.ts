/**
 * @todo performance fixes https://claude.ai/share/78e81612-ad37-4bbd-babe-cb323d1a9af0
 * 
 * @todo fix rotatation https://notebooklm.google.com/notebook/2da5b619-828d-4dec-b061-5fa59de95a1f
 */

const flowers_ = [
	"Dandelion",
	"Poppy",
	"Red Tulip",
	"Pink Tulip",
	"White Tulip",
	"Orange Tulip",
	"Daisy",
	"Bluebell",
	"Forget-me-not",
	"Allium",
	"Azure Bluet",
	"Lily of the Valley",
	"Shadow Rose",
	"Red Mushroom",
	"Brown Mushroom",
	"Fallen Pine Cone",
];

const trees_ = [
	"Maple",
	"Pine",
	"Plum",
	"Cedar",
	"Aspen",
	"Jungle",
	"Palm",
	"Pear",
	"Cherry",
	"Spectral",
	"Mango",
];

const soils_ = [
	"Gravel",
	"Rocky Dirt",
	"Messy Dirt",
	"Grass Block",
	"Dirt",
	"Stone",
	"Messy Stone",
	"Diorite",
	"Granite",
	"Andesite",
	"Sand",
	"Red Sand",
	"Snow",
	"Ice",
	"Clay",
	"Chalk",
	"Mossy Messy Stone",
	"Dark Red Stone",
	"Sandstone",
	"Red Sandstone",
	"Green Stone",
];

const bricks_ = [
	"Bricks",
	"Stone Bricks",
	"Mossy Stone Bricks",
	"Cracked Stone Bricks",
	"Andesite Bricks",
	"Granite Bricks",
	"Diorite Bricks",
	"Sandstone Bricks",
	"Red Sandstone Bricks",
	"Green Bricks",
	"Dark Green Bricks",
	"Dark Red Brick",
	"Ice Bricks",
];

const polished_ = [
	"Smooth Stone",
	"Smooth Andesite",
	"Smooth Granite",
	"Smooth Diorite",
	"Smooth Sandstone",
	"Smooth Red Sandstone",
	"Block of Quartz",
];

const engraved_ = [
	"Engraved Stone",
	"Engraved Andesite",
	"Engraved Granite",
	"Engraved Diorite",
	"Engraved Sandstone",
	"Engraved Red Sandstone",
	"Marked Sandstone",
	"Marked Red Sandstone",
	"Chiseled Block of Quartz",
];

const fruits_ =  [
	"Apple Block",
	"Cherry Block",
	"Coconut Block",
	"Corn Block",
	"Pear Block",
	"Plum Block",
	"Mango Block",
	"Carrot Block",
	"Potato Block",
	"Beetroot Block",
	"Chili Pepper Block",
	"Banana Block",
	"Watermelon",
	"Melon",
	"Pumpkin",
];

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
 * @description broadcast message
 */
const b = (message: string, style: MessageStyle) => api.broadcastMessage(message, style);

/**
 * @description unicast message
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
		[[2, 0, 18], [50, 1, 18]],
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

	static onPlayerLeave(playerId: string, _serverIsShuttingDown: any) {
		RectControl.playerIds.delete(playerId);
    RectControl.unlockedPlayerIds.delete(playerId);
	}

	static onPlayerChangeBlock(
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
		return undefined
	}
}

// @ts-ignore
globalThis.b = b;
// @ts-ignore
globalThis.m = m;
// @ts-ignore
globalThis.s = s;

const getFacingMeta = (playerId: string) => {
	const { angleDir } = api.getPlayerFacingInfo(playerId);
	const yaw = (angleDir.theta + Math.PI) % (Math.PI * 2);
	const normalized = ((yaw / (Math.PI * 2)) * 4 + 0.5) % 4;
	const dirs = ["rot1", "rot2", "rot3", "rot4"];
	return dirs[Math.floor(normalized)];
}

class ChestStorage {
	static id = "__STORAGE__";

	static init(playerId: string, position: [number, number, number]) {
		const facing = getFacingMeta(playerId);
		api.setBlock(position[0], position[1], position[2], `Iron Chest|meta|${facing}`);
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

	static set(playerId: string, x: number, y: number, z: number, index: number, value: any) {
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
			m(playerId, "Storage.get: Invalid index.", s("red"));
		}
		return null;
	}

	static teardown(playerId: string, x: number, y: number, z: number) {
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

	static onPlayerAttemptOpenChest = (playerId: string, x: number, y: number, z: number, _isMoonstoneChest: any, _isIronChest: any) => {
		if (api.getBlock(x, y, z) === "Chest") {
			if (ChestStorage.isStorage(x, y - 1, z)) {
				m(playerId, "Break it to find out what's inside!", s("gold"));
				return "preventOpen";
			}
		}
		if (ChestStorage.isStorage(x, y, z)) {
			m(playerId, "That's a one block!", s("gold"));
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

type Metadata = [string, string, number, number, number, number, ...PhaseBlock]

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

// @ts-ignore
globalThis.phasesByIds = phasesByIds;

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

const flowers: Phase = {
	id: "flowers",
	name: "One Block (Flowers)",
	description: `Creates a one block for flowers. ${usage}`,
	blocks: flowers_.map((block) => [1, block]),
};
phasesByIds.set(flowers.id, flowers);

const logs: Phase = {
	id: "logs",
	name: "One Block (Logs)",
	description: `Creates a one block for logs. ${usage}`,
	blocks: trees_.map((tree) => [1, `${tree} Log`]),
};
phasesByIds.set(logs.id, logs);

const leaves: Phase = {
	id: "leaves",
	name: "One Block (Leaves)",
	description: `Creates a one block for leaves. ${usage}`,
	blocks: trees_.map((tree) => [1, `${tree} Leaves`]),
};
phasesByIds.set(leaves.id, leaves);

const saplings: Phase = {
	id: "saplings",
	name: "One Block (Saplings)",
	description: `Creates a one block for saplings. ${usage}`,
	blocks: trees_.map((tree) => [1, `${tree} Sapling`]),
};
phasesByIds.set(saplings.id, saplings);

const soils: Phase = {
	id: "soils",
	name: "One Block (Soils)",
	description: `Creates a one block for natural soils. ${usage}`,
	blocks: soils_.map((block) => [1, block]),
};
phasesByIds.set(soils.id, soils);

const bricks: Phase = {
	id: "bricks",
	name: "One Block (Bricks)",
	description: `Creates a one block for bricks. ${usage}`,
	blocks: bricks_.map((block) => [1, block]),
};
phasesByIds.set(bricks.id, bricks);

const polished: Phase = {
	id: "polished",
	name: "One Block (Polished)",
	description: `Creates a one block for polished stones. ${usage}`,
	blocks: polished_.map((block) => [1, block]),
};
phasesByIds.set(polished.id, polished);


const engraved: Phase = {
	id: "engraved",
	name: "One Block (Engraved)",
	description: `Creates a one block for engraved stones. ${usage}`,
	blocks: engraved_.map((block) => [1, block]),
};
phasesByIds.set(engraved.id, engraved);

const coins: Phase = {
	id: "coins",
	name: "One Block (Coins)",
	description: `Creates a one block for gold coins. ${usage}`,
	blocks: [
		[1, "Chest", "Gold Coin", 1],
	],
};
phasesByIds.set(coins.id, coins);


const fruits: Phase = {
	id: "fruits",
	name: "One Block (Fruits)",
	description: `Creates a one block for fruits. ${usage}`,
	blocks: fruits_.map((block) => [1, block]),
};
phasesByIds.set(fruits.id, fruits);

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
	const lcase = suffix.replaceAll(' ', '').toLocaleLowerCase();
	const blocks: PhaseBlock[] = [
		...colors.map((color) => {
			const blockName = suffix === "Patterned Glass" ? `Patterned ${color} Glass` : `${color} ${suffix}`;
			const block: PhaseBlock = [1, blockName];
			return block;
		}),
	];
	if (suffix === "Banner") {
		blocks.push([1, "Skull Banner"]);
		blocks.push([1, "Rainbow Banner"]);
	}
	const phase: Phase = {
		id: lcase,
		name: `One Block (${suffix})`,
		description: `Creates a one block for Colored ${suffix}. ${usage}`,
		blocks,
	};
	phasesByIds.set(phase.id, phase);
}

const isInsideTownSquare = (point: Point) => {
	return api.isInsideRect(point, [-64, -1024, -64], [64, 1024, 64]);
};

class OneBlock {
	static type = "one_block";
	static cache = new Map<string, Metadata[]>();

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

	static onPlayerAltAction (playerId: string, x: number, y: number, z: number, _block: any, _targetEId: any) {
		/**
		 * @description One Block Placement
		 */
		if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
			const held = api.getHeldItem(playerId);
			const type = held?.attributes?.customAttributes?.type;
			const subtype = held?.attributes?.customAttributes?.subtype;
			const count = held?.attributes?.customAttributes?.count;
			if (type === OneBlock.type) {
				if (phasesByIds.has(subtype)) {
					const phase = phasesByIds.get(subtype);
					if (phase) {
						const target = api.getPlayerTargetInfo(playerId);
						const normal: Point = target.normal;
						const placement: Point = [x + normal[0], y + normal[1], z + normal[2]];
						const above: Point = [placement[0], placement[1] + 1, placement[2]];
						if (api.getBlock(above[0], above[1], above[2]) === "Air") {
							if (RectControl.isProtected(placement, playerId) || RectControl.isProtected(above, playerId)) {
								m(playerId, "Invalid placement, protected area.", s("gold"));
								return undefined;
							}
							api.setItemSlot(playerId, api.getSelectedInventorySlotI(playerId), "Air");
							ChestStorage.init(playerId, placement);
							const block = OneBlock.getRandomBlock(phase.blocks);
							api.setBlock(above[0], above[1], above[2], block[1]);
							const rl_limit = isInsideTownSquare(placement) ? 16 : 0;
							const rl_counter = Math.floor(api.now() / 60000);
							const rl_count = 0;
							const metadata = [type, subtype, count, rl_limit, rl_counter, rl_count, ...block];
							ChestStorage.set(playerId, placement[0], placement[1], placement[2], 1, metadata);
							const key = `${placement[0]}|${placement[1]}|${placement[2]}`;
							OneBlock.cache.set(key, metadata);
							return undefined;
						} else {
							m(playerId, "Invalid placement, not enough space.", s("gold"));
							return undefined;
						}
					}
				}
			}
		}
	}

	static onPlayerChangeBlock(playerId: string, x: number, y: number, z: number, _fromBlock: string, toBlock: string, _droppedItem: any, _fromBlockInfo: any, _toBlockInfo: any) {
		/**
		 * @description Displacement
		 */
		if (toBlock === "Air") {
			/**
			 * @description One Block Displacement
			 */
			switch (ChestStorage.isStorage(x, y, z, playerId)) {
				case 1: {
					m(playerId, "That one block is not yours.", s("gold"));
					return "preventChange";
				}
				case 2: {
					const key = `${x}|${y}|${z}`;
					const metadata = OneBlock.cache.has(key) ? OneBlock.cache.get(key) : ChestStorage.get(playerId, x, y, z, 1);
					const type = metadata[0] ?? null;
					const subtype = metadata[1] ?? null;
					if (type === OneBlock.type) {
						if (phasesByIds.has(subtype)) {
							const phase = phasesByIds.get(subtype);
							if (phase) {
								const count = metadata[2] ?? 0;
								api.giveItem(playerId, "Stick", 1, {
									customDisplayName: phase.name,
									customDescription: phase.description,
									customAttributes: {
										type,
										subtype,
										count,
									},
								});
								ChestStorage.teardown(playerId, x, y, z);
								OneBlock.cache.delete(key);
								api.setBlock(x, y + 1, z, "Air");
								return "preventDrop";
							}
						}
					}
					break;
				}
				default: {
					/**
					 * @description Block Displacement
					 */
					if (ChestStorage.isStorage(x, y - 1, z)) {
						const key = `${x}|${y - 1}|${z}`;
						let metadata = OneBlock.cache.has(key) ? OneBlock.cache.get(key) : ChestStorage.get(playerId, x, y - 1, z, 1);
						const type = metadata[0] ?? null;
						const subtype = metadata[1] ?? null;
						if (type === OneBlock.type) {
							if (phasesByIds.has(subtype)) {
								const phase = phasesByIds.get(subtype);
								if (phase) {
									// count increment
									let count = metadata[2];
									count += 1;

									// rate limits
									const rl_limit = metadata[3] ?? (isInsideTownSquare([x, y - 1, z]) ? 16 : 0);
									let rl_counter = metadata[4] ?? Math.floor(api.now() / 60000);
									let rl_count = metadata[5] ?? 0;
									if (rl_limit > 0) {
										const rl_counter_current = Math.floor(api.now() / 60000);
										if (rl_counter < rl_counter_current) {
											rl_counter = rl_counter_current;
											rl_count = 0;
										}
										rl_count += 1;
										if (rl_count > rl_limit) {
											const timeToReset = Math.floor((60000 - (api.now() % 60000)) / 1000);
											m(playerId, `This one block preview has limit of ${rl_limit} blocks per minute, it will reset in ${timeToReset} seconds. Buy it for no limits.`, s("gold"));
											return "preventChange";
										}
									}

									// preferred item drops
									let block = metadata.slice(6);
									const itemName = block[2] ?? block[1];
									let amount = block[3] ?? 1;
									if (block[4]) {
										amount = OneBlock.randomInt(amount, block[4]);
									}
									api.createItemDrop(x + 0.50, y + 0.50 + Math.random(), z + 0.50, itemName, amount, false, {}, 16000, null, {});

									// block replacement
									block = OneBlock.getRandomBlock(phase.blocks);
									api.setBlock(x, y, z, block[1]);

									// data persistence
									metadata = [type, subtype, count, rl_limit, rl_counter, rl_count, ...block];
									ChestStorage.set(playerId, x, y - 1, z, 1, metadata);
									OneBlock.cache.set(key, metadata);

									// visual feedback
									api.sendFlyingMiddleMessage(playerId, `${count}!`, 20, 1000);

									// prevent default item drops
									return "preventDrop";
								}
							}
						}
					}
					break;
				}
			}
		}
		return undefined;
	}

	static onPlayerChat(playerId: string, chatMessage: string) {
		if (api.getPlayerDbId(playerId) === api.ownerDbId) {
			switch (chatMessage) {
				case ".oneblock": {
					const commands = Array.from(phasesByIds.values()).map((phase) => `.${phase.id}`).join(', ');
					m(playerId, `OneBlock test commands: ${commands}`, s("gold"));
					return false;
				}
				default: {
					if (chatMessage.startsWith(".")) {
						const key = chatMessage.slice(1);
						if (phasesByIds.has(key)) {
							const phase = phasesByIds.get(key);
							if (phase) {
								api.giveItem(playerId, "Stick", 1, {
									customDisplayName: phase.name,
									customDescription: phase.description,
									customAttributes: {
										type: "one_block",
										subtype: phase.id,
										count: 0,
									},
								});
								m(playerId, `You received ${phase.name}.`, s("gold"));
								return false;
							}
						}
					}
					break;
				}
			}
		}
		return undefined;
	}
}

type BlockName = string;
type WorldBlockChangedInfo = Record<string, unknown>;

class TownSquare {
	static onWorldChangeBlock (x: number, y: number, z: number, _fromBlock: BlockName, _toBlock: BlockName, _initiatorDbId: string | null, extraInfo: WorldBlockChangedInfo) {
		if (extraInfo?.cause === "Explosion") {
			if (api.isInsideRect([x, y, z], [-64, -1024, -64], [64, 1024, 64])) {
				return "preventChange";
			}
		}
		return undefined;
	}

	static onPlayerDamagingOtherPlayer(attackingPlayer: string, damagedPlayer: string) {
		if (api.isInsideRect(api.getPosition(damagedPlayer), [-64, -1024, -64], [64, 1024, 64])) {
			api.sendMessage(attackingPlayer, "Can't attack inside the town square.", s("gold"));
			return "preventDamage";
		}
		return undefined;
	}

	static onPlayerChat(playerId: string, chatMessage: string) {
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
	m(playerId, JSON.stringify({ command }), s("gold"));
	return false
}

onPlayerChat = (playerId: string, chatMessage: string) => {
	return TownSquare.onPlayerChat(playerId, chatMessage)
		?? RectControl.onPlayerChat(playerId, chatMessage)
		?? OneBlock.onPlayerChat(playerId, chatMessage);
}

onPlayerAttemptOpenChest = (playerId: string, x: number, y: number, z: number, isMoonstoneChest: boolean, isIronChest: boolean) => {
	return ChestStorage.onPlayerAttemptOpenChest(playerId, x, y, z, isMoonstoneChest, isIronChest)
};

api.setCallbackValueFallback("onWorldChangeBlock", "preventChange");
api.setCallbackValueFallback("onPlayerChangeBlock", "preventChange");
api.setCallbackValueFallback("onPlayerDamagingOtherPlayer", "preventDamage");
api.setCallbackValueFallback("onPlayerAttemptOpenChest", "preventOpen");
