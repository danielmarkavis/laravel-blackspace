class Vector {
    constructor(x, y) {
        this.setVectorCoords(x, y);
    }

    setVectorCoords(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    setVector(coords) {
        this.x = coords.x || 0;
        this.y = coords.y || 0;
    }

    getDistance(destX, destY) {
        let a = this.x - destX;
        let b = this.y - destY;
        return Math.hypot(a, b);
        // return Math.sqrt( a*a + b*b );
    }

    pointRotate(cX, cY, angle) {
        let radians = (Math.PI / 180) * angle;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let nX = (cos * (this.x - cX)) + (sin * (this.y - cY)) + cX;
        let nY = (cos * (this.y - cY)) - (sin * (this.x - cX)) + cY;

        return {'x': nX, 'y': nY};
    }
}

export {Vector};