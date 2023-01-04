import { scene } from "../../canvas.js"

class Sprite {
    constructor({ pos, imageSrc }) {
        this.pos = pos
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
        }
        this.image.src = imageSrc
        this.loaded = false
    }

    render() {
        if(!this.loaded) return
        scene.drawImage(this.image, this.pos.x, this.pos.y)
    }
}

export { Sprite }