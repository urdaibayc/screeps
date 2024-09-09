const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');
const roleRepairer = require('role.repairer');
require('prototype.tower');

module.exports = {
  run: function () {
    const spawn = Game.spawns['Spawn1'];


    // Count creeps by role
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    const repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    
    // Send spawning message to game_screen
    if(spawn.spawning) {
      var spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawn.pos.x + 1,
        spawn.pos.y,
        {align: 'left', opacity: 0.8});
    }


    let desiredHarvesters = 3
    let desiredUpgraders = 1
    let desiredBuilders = 3
    let desiredRepairers = 0



    // Source Management
    const sources = spawn.room.find(FIND_SOURCES);
    const sourceAssignments = {}; // Track assigned sources

    // Assign sources to existing harvesters
    for (const creepName in Game.creeps) {
      const creep = Game.creeps[creepName];
      if (creep.memory.role === 'harvester' && creep.memory.sourceId) {
        sourceAssignments[creep.memory.sourceId] = (sourceAssignments[creep.memory.sourceId] || 0) + 1;
      }
    }

    if (harvesters.length < desiredHarvesters) {
      let leastAssignedSource = null;
      let leastAssignedCount = Infinity;

      // Find the source with the fewest assigned harvesters
      for (const source of sources) {
        const assignedCount = sourceAssignments[source.id] || 0;
        if (assignedCount < leastAssignedCount) {
          leastAssignedSource = source;
          leastAssignedCount = assignedCount;
        }
      }
      spawn.spawnCreep(
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        'Harvester' + Game.time,
          {
            memory: {
              role: 'harvester',
              sourceId: leastAssignedSource.id, // Assign the least used source
              harvesting: false,
              building: false,
              }
          });

    } else if (upgraders.length < desiredUpgraders) {
      let leastAssignedSource = null;
      let leastAssignedCount = Infinity;

      // Find the source with the fewest assigned harvesters
      for (const source of sources) {
        const assignedCount = sourceAssignments[source.id] || 0;
        if (assignedCount < leastAssignedCount) {
          leastAssignedSource = source;
          leastAssignedCount = assignedCount;
        }
      }
        spawn.spawnCreep(
          [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],'Upgrader' + Game.time,
          { memory: {
            role: 'upgrader',
            sourceId: leastAssignedSource.id, // Assign the least used source
            harvesting: false,
            building: false,
            }
          });
    } else if (builders.length < desiredBuilders) {
      let leastAssignedSource = null;
      let leastAssignedCount = Infinity;

      // Find the source with the fewest assigned
      for (const source of sources) {
        const assignedCount = sourceAssignments[source.id] || 0;
        if (assignedCount < leastAssignedCount) {
          leastAssignedSource = source;
          leastAssignedCount = assignedCount;
        }
      }
      spawn.spawnCreep(
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        'Builder' + Game.time,
        { memory: {
          role: 'builder',
          sourceId: leastAssignedSource.id, // Assign the least used source
          harvesting: false,
          building: false,
          }
        });
    } else if (repairers.length < desiredRepairers) {
      let leastAssignedSource = null;
      let leastAssignedCount = Infinity;

      // Find the source with the fewest assigned
      for (const source of sources) {
        const assignedCount = sourceAssignments[source.id] || 0;
        if (assignedCount < leastAssignedCount) {
          leastAssignedSource = source;
          leastAssignedCount = assignedCount;
        }
      }
      spawn.spawnCreep(
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        'Repairer' + Game.time,
        { memory: {
          role: 'repairer',
          sourceId: leastAssignedSource.id, // Assign the least used source
          harvesting: false,
          building: false,
          }
        });
    }
    // Assign roles to creeps
    for (let name in Game.creeps) {
      const creep = Game.creeps[name];
      if (creep.memory.role === 'harvester') {
        roleHarvester.run(creep);
      } else if (creep.memory.role === 'upgrader') {
        roleUpgrader.run(creep);
      } else if (creep.memory.role === 'builder') {
        roleBuilder.run(creep);
      } else if (creep.memory.role === 'repairer') {
        roleBuilder.run(creep);
      }
    }

    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        var executed = false;
        if(!tower.defend()){
            if(!tower.healCreeps()){
                tower.repairP();
            }    
        }
    }


  }
};
