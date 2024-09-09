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
    room_terrain: new Room.Terrain("E2S7"),
    sources:  Game.spawns['Spawn1'].room.find(FIND_SOURCES),
    
    // Function to find available spots around sources
    get_sources_spots: function (sources, room_terrain){

        const available_spots = [];

        // Iterate over each source
        sources.forEach(source => {
            // Iterate over possible positions
            for (let i = 0; i < this.positions.length; i++) { 
                this.positions[i].forEach(function(value, idx){ 
                    let coords = [value + source.pos.x, source.pos.y]; // Calculate the actual position
                    let terrain = room_terrain.get(coords[0], coords[1]); // Get terrain at the calculated position
                    // Check if the terrain is plain or swamp, then add to available spots
                    if (terrain === 0 || terrain === 2) {
                        available_spots.push(coords);
                    }
                });
            } 
        });
        console.log(available_spots.length);
        return available_spots
    },

    run: function () {
        const spots = this.get_sources_spots(this.sources, this.room_terrain);
    }
};