import { scene } from "../../canvas.js"

class Sprite {
    constructor({ pos, imageSrc, frameRate = 1, animations }) {
        this.pos = pos
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }
        this.image.src = imageSrc
        this.loaded = false

        this.frameRate = frameRate
        this.currentFrameRate = 0
        this.ellapsedFrame = 0
        this.frameBuffer = 2
        this.animations = animations

        if (this.animations) {
            for(var key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }

            console.log(this.animations)
        }
    }

    render() {
        if(!this.loaded) return
        const cropBox = {
            pos: {
                x: this.width * this.currentFrameRate,
                y: 0
            },
            width: this.width,
            height: this.height
        }

        scene.drawImage(
            this.image, 
            cropBox.pos.x, 
            cropBox.pos.y, 
            cropBox.width, 
            cropBox.height, 
            this.pos.x, 
            this.pos.y,
            this.width,
            this.height
        )

        this.reformFrames()
    }

    reformFrames() {
        this.ellapsedFrame++

        if(this.ellapsedFrame % this.frameBuffer === 0) {
            if(this.currentFrameRate < this.frameRate - 1) {
                this.currentFrameRate++
            } else {
                this.currentFrameRate = 0
            }
        }

    }
}

export { Sprite }