module.exports = {
    run: function (creep) {

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

    // Transition to 'returning' if the creep's energy is full
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
        creep.memory.building = true;
        creep.say('⚡ Transfer');
      }
    

    // Harvesting logic
    if (!creep.memory.building) {
    //   TODO: handle container logic in roomManager
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
    } else {
        // Harvest from source
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
    // Upgrading logic
    else {
      const target = creep.room.spawns['Spawn1'];

      if (creep.transfer(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {
          visualizePathStyle: { stroke: '#ffffff' },
          costMatrix: { plain: 2, swamp: 5, road: 1 }
        });
      } 
      else if (creep.store[RESOURCE_ENERGY] === 0) {
        // Only move back to the source if the creep is empty
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, costMatrix: { plain: 2, swamp: 5, road: 1 } });
      }
    }
  }
};
