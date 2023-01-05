import { scene, sheet } from '../../canvas.js'
import { Sprite } from './Sprite.js'

class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc,
        frameRate,
        animations
    }) {
        super({ imageSrc, frameRate, animations })
        this.pos = {
            x: 200, 
            y: 200,
        }
        // this.width = 25
        // this.height = 25
        this.sides = {
            bottom: this.pos.y + this.height
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
        this.collisionBlocks = collisionBlocks
    }

    // render() {
    //     scene.fillStyle = 'red'
    //     scene.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    // }

    reform() {
        // scene.fillStyle = 'rbg(0 0 255 / 50%)'
        scene.fillRect(this.pos.x, this.pos.y, this.width, this.height)

        this.pos.x += this.velocity.x

        this.reformHitbox()

        // check for horizontal collisions
        this.checkingHorizontalCollisions()

        // apply gravity
        this.applyGravity()

        // hitbox
        this.reformHitbox()

        // check for vertical collisions
        this.checkingVerticalCollisions()
    }

    reformHitbox() {
        this.hitbox = {
            pos: {
                x: this.pos.x + 58,
                y: this.pos.y + 34
            },
            width: 50,
            height: 53
        }
    }

    checkingHorizontalCollisions() {
        for(var i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            // if collision occurs
            if  (
                    this.hitbox.pos.x <= collisionBlock.pos.x + collisionBlock.width &&
                    this.hitbox.pos.x + this.hitbox.width >= collisionBlock.pos.x &&
                    this.hitbox.pos.y + this.hitbox.height >= collisionBlock.pos.y &&
                    this.hitbox.pos.y <= collisionBlock.pos.y + collisionBlock.height
                ) {

                // collision on x axis going to the left
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.pos.x - this.pos.x
                    this.pos.x = collisionBlock.pos.x + collisionBlock.width - offset + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.pos.x - this.pos.x + this.hitbox.height
                    this.pos.x = collisionBlock.pos.x - offset - 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.pos.y += this.velocity.y
    }

    checkingVerticalCollisions() {
        for(var i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            // if collision occurs
            if  (
                    this.hitbox.pos.x <= collisionBlock.pos.x + collisionBlock.width &&
                    this.hitbox.pos.x + this.hitbox.width >= collisionBlock.pos.x &&
                    this.hitbox.pos.y + this.hitbox.height >= collisionBlock.pos.y &&
                    this.hitbox.pos.y <= collisionBlock.pos.y + collisionBlock.height
                ) {

                // collision on y axis going to the left
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.pos.y - this.pos.y
                    this.pos.y = collisionBlock.pos.y + collisionBlock.height - offset + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.pos.y - this.pos.y + this.hitbox.height
                    this.pos.y = collisionBlock.pos.y - offset - 0.01
                    break
                }
            }
        }
    }

    switchSprite(name) {
        if(this.image == this.animations[name].image) return 
        this.currentFrameRate = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
    }
}

export { Player }