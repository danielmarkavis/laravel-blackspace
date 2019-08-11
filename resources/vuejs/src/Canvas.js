export class Canvas {

    constructor() {
        this.element = null;
        this.canvas = null;
        this.width = 1280;
        this.height = 720;
        this.ctx = null;
        this.center = this.getCanvasCenter();
        this.layers = []; // Fleet lines -> planets -> ships
        this.drawTick = 10;
    }

    clear() {
        this.fillRect(0, 0, this.canvas.width, this.canvas.height, 'black');
    }

    setup(element, resolution) {
        this.width = resolution.width || 1280;
        this.height = resolution.height || 720;
        if (element !== null) {
            this.canvas = document.getElementById(element);
        } else {
            this.canvas = new OffscreenCanvas(this.width, this.height);
        }
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.center = this.getCanvasCenter();

        this.ctx = this.canvas.getContext("2d");
        this.clear();
    }

    getCanvasCenter() {
        return {
            x: Math.round(this.width / 2),
            y: Math.round(this.height / 2)
        };
    }

    flip() {
        this.canvas.draw();
    }

    fillRect(x, y, w, h, color) {
        if (!this.isReady()) {
            return false;
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    drawCircle(x, y, radius, fill, stroke) {
        if (!this.isReady()) {
            return false;
        }
        this.ctx.fillStyle = fill;
        this.ctx.strokeStyle = stroke;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
        if (stroke) {
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = stroke;
            this.ctx.stroke();
        }
    }

    drawLine(sx, sy, ex, ey, color) {
        if (!this.isReady()) {
            return false;
        }
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(ex, ey);
        this.ctx.stroke();
    }

    drawTriangle(x, y, color) {
        if (!this.isReady()) {
            return false;
        }
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x+2, y-2);
        this.ctx.lineTo(x-2, y+4);
        this.ctx.lineTo(x+6, y+4);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawText(x, y, str, color) {
        this.ctx.font = "12px Arial";
        // this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;

        this.ctx.fillText(str, x, y);
    }

    drawImage(x, y, image) {
        this.ctx.drawImage(image, x, y);
    }

    getData(x, y) {
        return this.ctx.getImageData(x, y, 1, 1).data;
    }

    isReady() {
        if (!this.ctx) {
            console.log('Canvas not ready');
            return false;
        }
        return true;
    }

    canRender(time) {
        return (time % this.drawTick) === 0;
    }

    spiral(options) {
        let center, eAngle, increment, newX, newY, progress, sAngle, tempTheta, theta;
        sAngle = Math.PI + options.angle;
        eAngle = sAngle + Math.PI * 2 * options.number;
        center = {
            x: (options.start.x) + Math.cos(options.angle) * options.radius,
            y: (options.start.y) + Math.sin(options.angle) * options.radius
        };
        increment = 2 * Math.PI / 60/*steps per rotation*/;
        theta = sAngle;
        this.ctx.beginPath();
        this.ctx.moveTo(center.x, center.y);
        while (theta <= eAngle + increment) {
            progress = (theta - sAngle) / (eAngle - sAngle);
            tempTheta = options.direction ? theta : -1 * (theta - 2 * options.angle);
            newX = options.radius * Math.cos(tempTheta) * progress;
            newY = options.radius * Math.sin(tempTheta) * progress;
            theta += increment;
            this.ctx.lineTo(center.x + newX, center.y + newY);
        }
        this.ctx.strokeStyle = options.lineColor || '#FFFFFF';
        this.ctx.lineWidth = options.lineWidth || 30;
        this.ctx.stroke();
    };

}
