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

    drawSpiral() {
        let radius = 350;
        let maxArms = 3;
        let angle = 360 / maxArms;
        let rotations = 1;
        let width = 40;
        let color = '#FF0000';
        for (let arms = 0; arms < maxArms; arms++) {
            this.galaxy.spiral({
                start: {
                    x: (this.galaxy.center.x),
                    y: (this.galaxy.center.y)
                },
                angle: (angle * arms) * (Math.PI / 180), //angle from starting point
                direction: true,
                radius: radius, //radius from starting point in direction of angle
                number: rotations, // number of circles
                lineWidth: width,
                lineColor: color,
            });
        }
        width = 40;
        color = '#FFFFFF';
        for (let arms = 0; arms < maxArms; arms++) {
            this.galaxy.spiral({
                start: {
                    x: (this.galaxy.center.x),
                    y: (this.galaxy.center.y)
                },
                angle: (angle * arms) * (Math.PI / 180), //angle from starting point
                direction: true,
                radius: radius, //radius from starting point in direction of angle
                number: rotations, // number of circles
                lineWidth: width,
                lineColor: color,
            });
        }
    }

    drawClusters() {
        let clusters = 10;
        let radius = 30;

        // this.galaxy.fillRect(0, 0, this.galaxy.width, this.galaxy.height, '#000000');

        for (let cluster = 0; cluster < clusters; cluster++) {
            let pX = fn.rand(this.galaxy.width);
            let pY = fn.rand(this.galaxy.height);

                // do something with pX, pY, and pZ
            this.galaxy.drawCircle(pX, pY, radius, '#FFFFFF');
        }
    }

    drawQuadCircle() {
        let radius = 150;
        let width = Math.round(this.galaxy.width * 0.25);
        let height = Math.round(this.galaxy.height * 0.25);
        this.galaxy.drawCircle(this.galaxy.center.x - width, this.galaxy.center.y - height, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x - width, this.galaxy.center.y + height, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x + width, this.galaxy.center.y - height, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x + width, this.galaxy.center.y + height, radius, '#ffffff');
    }

    drawDonut() {
        let radius = 350;
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, radius - 150, '#000000');
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, 50, '#ff0000');
    }

    drawLargeDonut() {
        let radius = 650;
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, radius, '#ffffff');
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, radius - 150, '#000000');
        this.galaxy.drawCircle(this.galaxy.center.x, this.galaxy.center.y, 50, '#ff0000');
    }


    drawSector() {
        this.galaxy.fillRect(0, 0, this.galaxy.width, this.galaxy.height, '#ffffff');
    }

    drawCross() {
        let centerLeft = (this.galaxy.width / 2);
        let centerUp = (this.galaxy.height / 2);
        this.galaxy.fillRect(0, centerUp - 50, this.galaxy.width, 100, '#ffffff');
        this.galaxy.fillRect(centerLeft - 50, 0, 100, this.galaxy.height, '#ffffff');
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
            switch (hex) {
                case '#ffffff' :
                    chance = 90;
                    break;
                case '#ff0000' :
                    chance = 20;
                    break;
            }
            let rand = fn.rand(100) + 1;
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
