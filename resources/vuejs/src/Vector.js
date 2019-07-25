class Vector {
    /**
     *
     * @param x
     * @param y
     */
    constructor(x, y) {
        this.setVector(x, y);
    }

    setVector(x, y) {
        this.x = x || 0;
        this.y = y || 0;
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

    /**
     * Convert Universe vector to Canvas vector.
     *
     * Offset Canvas by Camera vector.
     * Increase distances of Body, based on zoom (x*zoom)
     *
     * @param canvas
     * @param camera
     * @returns {{x: number, y: number}}
     */
    fitToScreen(canvas, camera) {
        let center = canvas.center;
        let zoom = camera.zoom;
        let distanceScale = camera.distanceScale;
        let vector = camera.vector;

        let l = (((this.x * zoom) - (vector.x * zoom)) / distanceScale) + center.x;
        let t = (((this.y * zoom) - (vector.y * zoom)) / distanceScale) + center.y;

        return {'x': l, 'y': t}
    }

    moveLeft(value) {
        this.x -= value;
    }
    moveRight(value) {
        this.x += value;
    }
    moveUp(value) {
        this.y -= value;
    }
    moveDown(value) {
        this.y += value;
    }
}

export {Vector};