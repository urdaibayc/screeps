module.exports = {
    // Define possible positions around a source
    positions: [
        [-1, -1], 
        [0, -1], 
        [+1, -1], 
        [-1, 0], 
        [+1, 0], 
        [-1, +1], 
        [0, +1],
        [+1, +1]
    ],
    // Get terrain object containing tiles types
    room_terrain: new Room.Terrain(Game.spawns['Spawn1'].room.name),
    sources:  Game.spawns['Spawn1'].room.find(FIND_SOURCES),
    
    get_sources_spots: function (sources, room_terrain) {
        const available_spots = [];
        // Iterate over each source
        sources.forEach(source => {
            // Check all positions around the source
            this.positions.forEach(position => {
                const [dx, dy] = position;  // Destructuring the position array
                const x = source.pos.x + dx;
                const y = source.pos.y + dy;
    
                // Ensure the coordinates are within the valid room range
                if (x >= 0 && x <= 49 && y >= 0 && y <= 49) {
                    const terrainType = room_terrain.get(x, y); // Get terrain type
    
                    // Check if the spot is plain or swamp (available for building or movement)
                    if (terrainType === TERRAIN_MASK_WALL) {
                        return;  // Skip this spot if it's a wall
                    }
    
                    // Add the coordinates to the available spots
                    available_spots.push({ x, y });
                }
            });
        });
        return available_spots;
    },

    run: function () {
        const spots = this.get_sources_spots(this.sources, this.room_terrain);
        console.log(spots.length);
    }
};