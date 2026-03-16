type Nullable<T> = T | null;

type Point = [number, number, number];

type Rect = [Point, Point];

type BlockName = string;

type WorldBlockChangedInfo = Record<string, unknown>;

type GenericFunction = (...args: any[]) => any;

declare const api: {
	[key: string]: GenericFunction;
}

declare let tick: GenericFunction | undefined;
declare let onClose: GenericFunction | undefined;
declare let onPlayerJoin: GenericFunction | undefined;
declare let onPlayerLeave: GenericFunction | undefined;
declare let onPlayerJump: GenericFunction | undefined;
declare let onRespawnRequest: GenericFunction | undefined;
declare let playerCommand: GenericFunction | undefined;
declare let onPlayerChat: GenericFunction | undefined;
declare let onPlayerChangeBlock: GenericFunction | undefined;
declare let onPlayerDropItem: GenericFunction | undefined;
declare let onPlayerPickedUpItem: GenericFunction | undefined;
declare let onPlayerSelectInventorySlot: GenericFunction | undefined;
declare let onBlockStand: GenericFunction | undefined;
declare let onPlayerAttemptCraft: GenericFunction | undefined;
declare let onPlayerCraft: GenericFunction | undefined;
declare let onPlayerAttemptOpenChest: GenericFunction | undefined;
declare let onPlayerOpenedChest: GenericFunction | undefined;
declare let onPlayerMoveItemOutOfInventory: GenericFunction | undefined;
declare let onPlayerMoveInvenItem: GenericFunction | undefined;
declare let onPlayerMoveItemIntoIdxs: GenericFunction | undefined;
declare let onPlayerSwapInvenSlots: GenericFunction | undefined;
declare let onPlayerMoveInvenItemWithAmt: GenericFunction | undefined;
declare let onPlayerAttemptAltAction: GenericFunction | undefined;
declare let onPlayerAltAction: GenericFunction | undefined;
declare let onPlayerClick: GenericFunction | undefined;
declare let onClientOptionUpdated: GenericFunction | undefined;
declare let onMobSettingUpdated: GenericFunction | undefined;
declare let onInventoryUpdated: GenericFunction | undefined;
declare let onChestUpdated: GenericFunction | undefined;
declare let onWorldChangeBlock: GenericFunction | undefined;
declare let onCreateBloxdMeshEntity: GenericFunction | undefined;
declare let onEntityCollision: GenericFunction | undefined;
declare let onPlayerAttemptSpawnMob: GenericFunction | undefined;
declare let onWorldAttemptSpawnMob: GenericFunction | undefined;
declare let onPlayerSpawnMob: GenericFunction | undefined;
declare let onWorldSpawnMob: GenericFunction | undefined;
declare let onWorldAttemptDespawnMob: GenericFunction | undefined;
declare let onMobDespawned: GenericFunction | undefined;
declare let onPlayerAttack: GenericFunction | undefined;
declare let onPlayerDamagingOtherPlayer: GenericFunction | undefined;
declare let onPlayerDamagingMob: GenericFunction | undefined;
declare let onMobDamagingPlayer: GenericFunction | undefined;
declare let onMobDamagingOtherMob: GenericFunction | undefined;
declare let onAttemptKillPlayer: GenericFunction | undefined;
declare let onPlayerKilledOtherPlayer: GenericFunction | undefined;
declare let onMobKilledPlayer: GenericFunction | undefined;
declare let onPlayerKilledMob: GenericFunction | undefined;
declare let onMobKilledOtherMob: GenericFunction | undefined;
declare let onPlayerPotionEffect: GenericFunction | undefined;
declare let onPlayerDamagingMeshEntity: GenericFunction | undefined;
declare let onPlayerBreakMeshEntity: GenericFunction | undefined;
declare let onPlayerUsedThrowable: GenericFunction | undefined;
declare let onPlayerThrowableHitTerrain: GenericFunction | undefined;
declare let onTouchscreenActionButton: GenericFunction | undefined;
declare let onTaskClaimed: GenericFunction | undefined;
declare let onChunkLoaded: GenericFunction | undefined;
declare let onPlayerRequestChunk: GenericFunction | undefined;
declare let onItemDropCreated: GenericFunction | undefined;
declare let onPlayerStartChargingItem: GenericFunction | undefined;
declare let onPlayerFinishChargingItem: GenericFunction | undefined;
declare let onPlayerFinishQTE: GenericFunction | undefined;
declare let onPlayerBoughtShopItem: GenericFunction | undefined;
declare let doPeriodicSave: GenericFunction | undefined;