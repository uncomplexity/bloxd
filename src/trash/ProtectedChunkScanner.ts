/**
 * @description working draft, but incomplete.
 * @todo
 * - [ ] use static class
 * - [ ] block changes on not-yet-scanned blocks / rects
 * - [ ] scan the current chunk first
 * - [ ] scan the surrounding chunks next (at least the surrounding 8)
 * - [ ] balance the tick rate and blocks per tick
 */

// 1. GLOBAL SETTINGS & STATE
let activeScan = null;

const BLOCKS_PER_TICK = 125;

const TARGET_CHEST_NAMES = new Set([
    "Loot Chest",
    "Loot Chest|meta|rot1",
    "Loot Chest|meta|rot2",
    "Loot Chest|meta|rot3",
    "Loot Chest|meta|rot4",
]);

// 2. TRIGGER THE SCAN
onPlayerChat = (playerId, chatMessage, channelName) => {
    if (chatMessage === ".tick") {
        if (activeScan) {
            api.sendMessage(playerId, "Scan already in progress.");
            return false;
        }

        const position = api.getPosition(playerId);
        const chunkId = api.blockCoordToChunkId(position);
        const [baseX, baseY, baseZ] = api.chunkIdToBotLeftCoord(chunkId);

        activeScan = {
            baseX, baseY, baseZ,
            chunkSize: 32,
            currentIndex: 0,
            foundCount: 0,
            playerId
        };

        api.sendMessage(playerId, `Scanning chunk at ${baseX}, ${baseY}, ${baseZ}...`);
        return false;
    }

    return true;
}

// 3. THE INCREMENTAL WORKER
tick = (ms) => {
    if (!activeScan) return;

    const { baseX, baseY, baseZ, chunkSize } = activeScan;
    const total = chunkSize * chunkSize * chunkSize;
    const start = activeScan.currentIndex;
    const limit = Math.min(start + BLOCKS_PER_TICK, total);

    for (let i = start; i < limit; i++) {
        const x = i % chunkSize;
        const y = Math.floor(i / chunkSize) % chunkSize;
        const z = Math.floor(i / (chunkSize * chunkSize));

        const worldX = baseX + x;
        const worldY = baseY + y;
        const worldZ = baseZ + z;

        const blockName = api.getBlock(worldX, worldY, worldZ);
        if (TARGET_CHEST_NAMES.has(blockName)) {
            activeScan.foundCount++;
            api.log(`Found chest at ${worldX}, ${worldY}, ${worldZ}`);
        }
    }

    activeScan.currentIndex = limit;

    if (activeScan.currentIndex >= total) {
        const { foundCount } = activeScan;
        activeScan = null;
        api.broadcastMessage(`Scan complete. Found ${foundCount} target chests.`);
    }
}