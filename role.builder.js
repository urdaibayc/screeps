module.exports = {
  run: function(creep) {

      // Assign a source if not already assigned
      if (!creep.memory.sourceId) {
          const sources = creep.room.find(FIND_SOURCES);
          creep.memory.sourceId = sources[creep.id % sources.length].id;
      }

      // Transition to 'harvesting' if the creep is out of energy
      if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
          creep.memory.building = false;
          creep.say('🔄 harvest');
      }

      // Transition to 'building' if the creep's energy is full
      if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
          creep.memory.building = true;
          creep.say('🚧 build');
      }

      // Harvesting logic
      if (!creep.memory.building) {
      // Try to find a container near the assigned source
      const source = Game.getObjectById(creep.memory.sourceId);
      const container = source.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER &&
          structure.store[RESOURCE_ENERGY] > 0
      });
// Withdraw from container if found
if (container && container.store[RESOURCE_ENERGY] > 0) { // Check if container has energy
  if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
  }
} 
    // else {
    //     // Harvest from source
    //     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
    //       creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    //     }
    //   }
    }
      // Building or repairing logic
      else {
          const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

          if (targets.length) {

              // Move to and build the closest construction site
              if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(targets[0], {
                      visualizePathStyle: { stroke: '#ffffff' }
                  });
              }
          } else if (creep.store[RESOURCE_ENERGY] > 0) {

              // No construction sites found, repair structures instead
              const repairTargets = creep.room.find(FIND_STRUCTURES, {
                  filter: (structure) => structure.hits < structure.hitsMax
              });

              if (repairTargets.length) {

                  // Move to and repair the closest damaged structure
                  if (creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(repairTargets[0], {
                          visualizePathStyle: { stroke: '#ffffff' }
                      });
                  }
              }
          }
      }
  }
};
