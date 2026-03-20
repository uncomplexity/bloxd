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

const fruits_ = [
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

/**
 * @description Weight, BlockName, ItemName = BlockName, ItemMin = 1, ItemMax = null
 */
type PhaseBlock = [
	number,
	string,
	Nullable<string>?,
	Nullable<number>?,
	Nullable<number>?,
];

type Metadata = [string, string, number, number, number, number, ...PhaseBlock];

interface Phase {
	id: string;
	name: string;
	description: string;
	blocks: PhaseBlock[];
}

const phasesByIds = new Map<string, Phase>();

const usage =
	"Right click on the ground to place it. Destroy it to pick it up.";

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
	blocks: [[1, "Chest", "Gold Coin", 1]],
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
	"Planks",
	"Wool",
	"Baked Clay",
	"Chalk",
	"Chalk Bricks",
	"Concrete",
	"Ceramic",
	"Glass",
	"Patterned Glass",
	"Banner",
	"Carpet",
	"Paintball Explosive",
	"Quick Paintball Explosive",
	"Seeking Paintball Explosive",
	"Sticky Paintball Explosive",
	"Portal",
];

for (const suffix of suffixes) {
	const lcase = suffix.split(" ").join("").toLowerCase();
	const blocks: PhaseBlock[] = [
		...colors.map((color) => {
			const blockName =
				suffix === "Patterned Glass"
					? `Patterned ${color} Glass`
					: `${color} ${suffix}`;
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

class OneBlock {
	static type = "one_block";
	static cache = new Map<string, Metadata[]>();
	static totals = new Map<unknown[], number>();

	static isInsideTownSquare(point: Point) {
		return api.isInsideRect(point, [-64, -1024, -64], [64, 1024, 64]);
	}

	static randomInt(min: number, max: number) {
		const minc = Math.ceil(min);
		const maxf = Math.floor(max);
		return Math.floor(Math.random() * (maxf - minc + 1) + minc);
	}

	static getRandomBlock(blocks: PhaseBlock[]): PhaseBlock {
		if (!OneBlock.totals.has(blocks)) {
			const total = blocks.reduce(
				(acc: number, block: PhaseBlock) => acc + block[0],
				0,
			);
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

	static onPlayerAltAction(
		playerId: string,
		x: number,
		y: number,
		z: number,
		_block: any,
		_targetEId: any,
	) {
		/**
		 * @description One Block Placement
		 */
		if (
			typeof x === "number" &&
			typeof y === "number" &&
			typeof z === "number"
		) {
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
						const placement: Point = [
							x + normal[0],
							y + normal[1],
							z + normal[2],
						];
						const above: Point = [placement[0], placement[1] + 1, placement[2]];
						if (api.getBlock(above[0], above[1], above[2]) === "Air") {
							if (
								RectControl.isProtected(placement, playerId) ||
								RectControl.isProtected(above, playerId)
							) {
								api.sendMessage(
									playerId,
									"Invalid placement, protected area.",
									{ color: "gold" },
								);
								return undefined;
							}
							api.setItemSlot(
								playerId,
								api.getSelectedInventorySlotI(playerId),
								"Air",
							);
							ChestStorage.init(playerId, placement);
							const block = OneBlock.getRandomBlock(phase.blocks);
							api.setBlock(above[0], above[1], above[2], block[1]);
							const rl_limit = OneBlock.isInsideTownSquare(placement) ? 16 : 0;
							const rl_counter = Math.floor(api.now() / 60000);
							const rl_count = 0;
							const metadata = [
								type,
								subtype,
								count,
								rl_limit,
								rl_counter,
								rl_count,
								...block,
							];
							ChestStorage.set(
								playerId,
								placement[0],
								placement[1],
								placement[2],
								1,
								metadata,
							);
							const key = `${placement[0]}|${placement[1]}|${placement[2]}`;
							OneBlock.cache.set(key, metadata);
							return undefined;
						} else {
							api.sendMessage(
								playerId,
								"Invalid placement, not enough space.",
								{ color: "gold" },
							);
							return undefined;
						}
					}
				}
			}
		}
	}

	static onPlayerChangeBlock(
		playerId: string,
		x: number,
		y: number,
		z: number,
		_fromBlock: string,
		toBlock: string,
		_droppedItem: any,
		_fromBlockInfo: any,
		_toBlockInfo: any,
	) {
		/**
		 * @description Displacement
		 */
		if (toBlock === "Air") {
			/**
			 * @description One Block Displacement
			 */
			switch (ChestStorage.isStorage(x, y, z, playerId)) {
				case 1: {
					api.sendMessage(playerId, "That one block is not yours.", {
						color: "gold",
					});
					return "preventChange";
				}
				case 2: {
					const key = `${x}|${y}|${z}`;
					const metadata = OneBlock.cache.has(key)
						? OneBlock.cache.get(key)
						: ChestStorage.get(playerId, x, y, z, 1);
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
								ChestStorage.teardown(playerId, x, y, z, 1);
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
						let metadata = OneBlock.cache.has(key)
							? OneBlock.cache.get(key)
							: ChestStorage.get(playerId, x, y - 1, z, 1);
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
									const rl_limit =
										metadata[3] ??
										(OneBlock.isInsideTownSquare([x, y - 1, z]) ? 16 : 0);
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
											const timeToReset = Math.floor(
												(60000 - (api.now() % 60000)) / 1000,
											);
											api.sendMessage(
												playerId,
												`This one block preview has limit of ${rl_limit} blocks per minute, it will reset in ${timeToReset} seconds. Buy it for no limits.`,
												{ color: "gold" },
											);
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
									api.createItemDrop(
										x + 0.5,
										y + 0.5 + Math.random(),
										z + 0.5,
										itemName,
										amount,
										false,
										{},
										16000,
										null,
										{},
									);

									// block replacement
									block = OneBlock.getRandomBlock(phase.blocks);
									api.setBlock(x, y, z, block[1]);

									// data persistence
									metadata = [
										type,
										subtype,
										count,
										rl_limit,
										rl_counter,
										rl_count,
										...block,
									];
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
					const commands = Array.from(phasesByIds.values())
						.map((phase) => `.${phase.id}`)
						.join(", ");
					api.sendMessage(playerId, `OneBlock test commands: ${commands}`, {
						color: "gold",
					});
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
								api.sendMessage(playerId, `You received ${phase.name}.`, {
									color: "gold",
								});
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

Object.assign(globalThis, { OneBlock, phasesByIds });
