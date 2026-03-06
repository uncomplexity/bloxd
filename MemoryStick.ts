/**
 * @url https://claude.ai/share/e62d948b-cbfe-4cc3-8e1e-da890b5aef6f
 */

class MemoryStick {
	static type = "memory_stick";
	static slot = 9;

	static defaultData = {
		type: MemoryStick.type,
		exampleString: "hello",
		exampleNumber: 42,
		exampleBoolean: true,
	};

	static give(playerId: string, data?: Record<string, unknown>) {
		const attributes = data ?? MemoryStick.defaultData;
		api.setItemSlot(playerId, MemoryStick.slot, "Stick", 1, {
			customDisplayName: "Memory Stick",
			customDescription: "Your personal memory stick. Do not discard.",
			customAttributes: attributes,
		});
	}

	static read(playerId: string) {
		const item = api.getItemSlot(playerId, MemoryStick.slot);
		if (item?.attributes?.customAttributes?.type === MemoryStick.type) {
			return item.attributes.customAttributes;
		}
		return null;
	}

	static write(playerId: string, data: Record<string, unknown>) {
		const current = MemoryStick.read(playerId);
		if (current !== null) {
			MemoryStick.give(playerId, { ...current, ...data });
		} else {
			m(playerId, "MemoryStick.write: Slot missing or corrupted, reinitializing.", s("red"));
			MemoryStick.give(playerId, { ...MemoryStick.defaultData, ...data });
		}
	}

	static onPlayerJoin(playerId: string) {
		const existing = api.getItemSlot(playerId, MemoryStick.slot);
		if (existing?.attributes?.customAttributes?.type !== MemoryStick.type) {
			MemoryStick.give(playerId);
		}
		return undefined;
	}

	static onPlayerDropItem(playerId: string, _x: number, _y: number, _z: number, _itemName: string, _itemAmount: number, fromIdx: number) {
		if (fromIdx === MemoryStick.slot) {
			const item = api.getItemSlot(playerId, MemoryStick.slot);
			if (item?.attributes?.customAttributes?.type === MemoryStick.type) {
				m(playerId, "You cannot drop the Memory Stick.", s("gold"));
				return "preventDrop";
			}
		}
		return undefined;
	}

	static onPlayerMoveItemOutOfInventory(playerId: string, _itemName: string, _itemAmount: number, fromIdx: number, _movementType: string) {
		if (fromIdx === MemoryStick.slot) {
			const item = api.getItemSlot(playerId, MemoryStick.slot);
			if (item?.attributes?.customAttributes?.type === MemoryStick.type) {
				m(playerId, "You cannot move the Memory Stick.", s("gold"));
				return "preventChange";
			}
		}
		return undefined;
	}

	static onPlayerMoveInvenItem(playerId: string, fromIdx: number, toStartIdx: number, toEndIdx: number, _amt: number) {
		if (fromIdx === MemoryStick.slot || (toStartIdx <= MemoryStick.slot && MemoryStick.slot <= toEndIdx)) {
			const item = api.getItemSlot(playerId, MemoryStick.slot);
			if (item?.attributes?.customAttributes?.type === MemoryStick.type) {
				m(playerId, "You cannot move the Memory Stick.", s("gold"));
				return "preventChange";
			}
		}
		return undefined;
	}

	static onPlayerMoveItemIntoIdxs(playerId: string, start: number, end: number, _moveIdx: number, _itemAmount: number) {
		if (start <= MemoryStick.slot && MemoryStick.slot <= end) {
			const item = api.getItemSlot(playerId, MemoryStick.slot);
			if (item?.attributes?.customAttributes?.type === MemoryStick.type) {
				m(playerId, "You cannot move the Memory Stick.", s("gold"));
				return "preventChange";
			}
		}
		return undefined;
	}

	static onPlayerAltAction(playerId: string, _x: any, _y: any, _z: any, _block: any, _targetEId: any) {
		const held = api.getHeldItem(playerId);
		if (held?.attributes?.customAttributes?.type === MemoryStick.type) {
			m(playerId, JSON.stringify(held.attributes.customAttributes), s("aqua"));
			return undefined;
		}
		return undefined;
	}
}

/**
 * @description Global Event Handlers. return them, and chain them with "??".
 */

onPlayerJoin = (playerId: string) => {
	return MemoryStick.onPlayerJoin(playerId) ?? RectControl.onPlayerJoin(playerId);
};

onPlayerLeave = (playerId: string, serverIsShuttingDown: any) => {
	return RectControl.onPlayerLeave(playerId, serverIsShuttingDown);
};

onPlayerAltAction = (playerId: string, x: number, y: number, z: number, block: any, targetEId: any) => {
	return MemoryStick.onPlayerAltAction(playerId, x, y, z, block, targetEId);
}

onPlayerDropItem = (playerId: string, x: number, y: number, z: number, itemName: string, itemAmount: number, fromIdx: any) => {
	return MemoryStick.onPlayerDropItem(playerId, x, y, z, itemName, itemAmount, fromIdx);
};

onPlayerMoveItemOutOfInventory = (playerId: string, itemName: string, itemAmount: number, fromIdx: any, movementType: any) => {
	return MemoryStick.onPlayerMoveItemOutOfInventory(playerId, itemName, itemAmount, fromIdx, movementType);
};

onPlayerMoveInvenItem = (playerId: string, fromIdx: any, toStartIdx: any, toEndIdx: any, amt: any) => {
	return MemoryStick.onPlayerMoveInvenItem(playerId, fromIdx, toStartIdx, toEndIdx, amt);
};

onPlayerMoveItemIntoIdxs = (playerId: string, start: any, end: any, moveIdx: any, itemAmount: any) => {
	return MemoryStick.onPlayerMoveItemIntoIdxs(playerId, start, end, moveIdx, itemAmount);
};