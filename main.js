const creepManager = require('creepManager');
const roomManager = require('roomManager');

module.exports.loop = function () {
    // 1. Clean up memory
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log('Clearing non-existing creep memory:', name);
            delete Memory.creeps[name];
        }
    }
 

  // Set some room info
  for(var name in Game.rooms) {
    console.log(name+' --> '+Game.rooms[name].controller.level+' --> ' + Game.rooms[name].energyAvailable+' --> '+Game.rooms[name].energyCapacityAvailable+'\n');
    // console.log('Creeps in room: --> '+Game.rooms[name].creeps.length+' --> ' +'\n');
    // console.log(name+' --> '+Game.rooms[name].creeps.length+' --> ' +'\n');



    // Printing stuff on the screen
    // Game.rooms[name].visual.text(name+' --> lvl '+Game.rooms[name].controller.level, 1, 1, {align: 'center'});
    // Game.rooms[name].visual.text('| Energy | Max | Ctrl |', 1, 2, {align: 'center'});
    // Game.rooms[name].visual.text('| '+Game.rooms[name].energyAvailable+' | '+Game.rooms[name].energyCapacityAvailable+' | '+Game.rooms[name].controller.progress+' |', 1, 3, {align: 'center'});
  }


  // 2. Manage Creeps
  creepManager.run();

  // 3. Manage Rooms
  roomManager.run();
}
