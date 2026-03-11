type Nullable<T> = T | null;

type Point = [number, number, number];

type Rect = [Point, Point];

type BlockName = string;

type WorldBlockChangedInfo = Record<string, unknown>;

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