// When using Array.prototype, and making the function an arrow function will make the function to not work
import { CollisionBlock } from './class/CollisionBlock.js'

Array.prototype.parse2d = function() {
    const row = []
    for(var i = 0; i < this.length; i+=16) {
        row.push(this.slice(i, i + 16))
    }

    return row
}

Array.prototype.createObjectsFrom2d = function() {
    const objects = []
    for(var i=0; i < this.length; i++) {
        let row = this[i]
        
        for(var j = 0; j < row.length; j++) {
            if(row[j] === 292) {
                objects.push(new CollisionBlock({
                    pos: { 
                        x: j * 64,
                        y: i * 64
                    }
                }))
            }
        }
    }
    return objects
}