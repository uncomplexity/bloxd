/**
 * @url https://discord.com/channels/804347688946237472/1407380132628402187
 */

despawnQueue = [] 
pendingDespawn = 1e6 

function createExplosion(pos, size) {

  m = api.attemptSpawnMob('Draugr Zombie',...pos)
  api.setMobSetting(m, 'attackItemName', size==1? "RPG": "Super RPG")
  api.setMobSetting(m, 'attackRadius', 1e6)
  api.setMobSetting(m, 'attackInterval', 1e6)
  api.setMobSetting(m, 'baseWalkingSpeed', 0)
  api.setMobSetting(m, 'baseRunningSpeed', 0)
  api.setMobSetting(m, 'attackImpulse', 0)
  api.setTargetedPlayerSettingForEveryone(m, 'canSee', false)

  p = api.attemptSpawnMob('Pig',pos[0], pos[1]-2, pos[2])
  api.setMobSetting(p, 'baseWalkingSpeed', 0)
  api.setMobSetting(p, 'baseRunningSpeed', 0)
  api.setMobSetting(p, 'initialHealth', 1e6)
  api.setTargetedPlayerSettingForEveryone(p, 'canSee', false)

  api.applyMeleeHit(p,m,[0,0,0])

  despawnQueue.push(m,p)
  pendingDespawn = 0
}

tick = () => {
  pendingDespawn++
  if(despawnQueue.length!=0 && pendingDespawn == 3){
    for (mob of despawnQueue) {
      api.despawnMob(mob)
      despawnQueue = despawnQueue.filter(m => m!= mob)
    }
  }
}

onPlayerThrowableHitTerrain = (id, name, EId) => {
  if (name == "Arrow") {
    createExplosion(api.getPosition(EId), 2) // or 1 for smaller explosion
  }
}