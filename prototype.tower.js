StructureTower.prototype.defend =
    function () {
        // find closes hostile creep
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // if one is found...
        
        if (target) {
            // ...FIRE!
            
            // this.attack(target);
            return 1;
        }
        else{
            return 0;
        }
    };
    
StructureTower.prototype.repairP =
    function () {
       
            // find damaged structures
            var closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax*0.8
            });
            // if one is found, repair it
            if(closestDamagedStructure) {
                
                this.repair(closestDamagedStructure);
                return 1;
            }
            else{
                return 0;
            }
        
    };
    
StructureTower.prototype.healCreeps =
    function () {
       
            // find damaged structures
            var closestDamagedCreep = this.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (creep) => creep.hits < creep.hitsMax
            });
            // if one is found, repair it
            if(closestDamagedCreep) {
                
                this.heal(closestDamagedCreep);
                return 1;
            }
            else{
                return 0;
            }
        
    };