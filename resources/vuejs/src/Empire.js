import {Vector} from './Vector.js';

class Empire {

    constructor(empireID) {
        this.owner = empireID;
        this.speed = 0;
        this.xp = 0;
    }

    // draw(canvas) {
    //     canvas.drawLine(canvas.center.x, 0, canvas.center.x, canvas.center.y-20, 'grey');
    //     canvas.drawLine(canvas.center.x, canvas.center.y+20, canvas.center.x, canvas.height, 'grey');
    //     canvas.drawCircle(canvas.center.x, canvas.center.y, 2, this.color);
    // }
}

export {Empire};