import {Vector} from './Vector.js';
import {Canvas} from './Canvas.js';
import {fn, loadImage} from "./Functions";
import {Options} from './Options.js';

/**
 * load galaxy from jpg, return image.
 */
export class Galaxy {
    constructor() {
        this.galaxy = null;
    }

    setup(image) {
        this.galaxy = new Canvas();
        this.galaxy.setup(null, {'width': 1280, 'height': 720});
    }

    drawSpiral(){
        let radius = 350;
        this.galaxy.spiral({
            start: {//starting point of spiral
                x: (this.galaxy.center.x - 350),
                y: (this.galaxy.center.y - 225)
            },
            angle: 30 * (Math.PI / 180), //angle from starting point
            direction: true,
            radius: radius, //radius from starting point in direction of angle
            number: 2, // number of circles
            lineWidth: 80,
            lineColor: '#FF0000',
        });

        this.galaxy.spiral({
            start: {//starting point of spiral
                x: this.galaxy.center.x - 350,
                y: this.galaxy.center.y - 225
            },
            angle: 30 * (Math.PI / 180), //angle from starting point
            direction: true,
            radius: radius, //radius from starting point in direction of angle
            number: 2, // number of circles
            lineWidth: 40,
            lineColor: '#FFFFFF',
        });
    }

    drawQuadCircle() {
        let radius = 150;
        let width = Math.round(this.galaxy.width*0.25);
        let height = Math.round(this.galaxy.height*0.25);
        this.galaxy.drawCircle(this.galaxy.center.x - width, this.galaxy.center.y - height, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x - width, this.galaxy.center.y + height, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x + width, this.galaxy.center.y - height, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x + width, this.galaxy.center.y + height, radius, '#ffffff');
    }

    drawDonut() {
        let radius = 350;
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, radius-150, '#000000');
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, 50, '#ff0000');
    }

    drawLargeDonut() {
        let radius = 650;
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, radius-150, '#000000');
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, 50, '#ff0000');
    }

    selectCoords() {
        let found = false;
        let x = null;
        let y = null;
        while (!found) {
            x = fn.rand(this.galaxy.width - Options.border);
            y = fn.rand(this.galaxy.height - Options.border);
            let p = this.galaxy.getData(x, y);
            let hex = "#" + ("000000" + fn.rgbToHex(p[0], p[1], p[2])).slice(-6);
            let chance = 2;
            switch(hex) {
                case '#ffffff' :
                    chance = 90;
                    break;
                case '#ff0000' :
                    chance = 20;
                    break;
            }
            let rand = fn.rand(100)+1;
            if (rand < chance) {
                // console.log();
                found = true;
            }
        }
        if (x === null || y === null) {
            return false;
        }
        return new Vector(x, y);
    }
}
