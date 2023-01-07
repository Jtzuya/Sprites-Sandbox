import { scene } from "../../canvas.js"

class Sprite {
    constructor({ pos, imageSrc, frameRate = 1, animations, frameBuffer = 2, loop = true, autoplay = true }) {
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
        this.frameBuffer = frameBuffer
        this.animations = animations
        this.loop = loop
        this.autoplay = autoplay
        this.currentAnimation

        if (this.animations) {
            for(var key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }

            // console.log(this.animations)
        }
    }

    play() {
        this.autoplay = true
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
        if(!this.autoplay) return
        this.ellapsedFrame++

        if(this.ellapsedFrame % this.frameBuffer === 0) {
            if(this.currentFrameRate < this.frameRate - 1) {
                this.currentFrameRate++
            } else if (this.loop) {
                this.currentFrameRate = 0
            }
        }

        if(this.currentAnimation?.onComplete) {
            if(this.currentFrameRate === this.frameRate - 1 && !this.currentAnimation.isActive) {
                this.currentAnimation.onComplete()
                this.currentAnimation.isActive = true
            }
        }

    }
}

export { Sprite }