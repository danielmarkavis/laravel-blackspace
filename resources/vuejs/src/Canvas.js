export class Canvas {

    constructor() {
        this.element = null;
        this.canvas = null;
        this.buffer = null;
        this.width = 1280;
        this.height = 720;
        this.ctx = null;
        this.ctb = null;
        this.center = this.getCanvasCenter();
        this.layers = []; // Fleet lines -> planets -> ships
        this.drawTick = 10;
    }

    clear() {
        this.ctb.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setup(element, resolution) {
        this.width = resolution.width || 1280;
        this.height = resolution.height || 720;
        if (element !== null) {
            this.canvas = document.getElementById(element);
            this.buffer = new OffscreenCanvas(this.width, this.height);
        } else {
            this.canvas = new OffscreenCanvas(this.width, this.height);
            this.buffer = new OffscreenCanvas(this.width, this.height);
        }
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.center = this.getCanvasCenter();

        this.ctx = this.canvas.getContext("2d");
        this.ctb = this.buffer.getContext("2d");
        this.clear();
    }

    getCanvasCenter() {
        return {
            x: Math.round(this.width / 2),
            y: Math.round(this.height / 2)
        };
    }

    flip() {
        this.ctx.putImageData(this.ctb.getImageData(0,0,this.width,this.height), 0, 0);
    }

    fillRect(x, y, w, h, color) {
        if (!this.isReady()) {
            return false;
        }
        this.ctb.fillStyle = color;
        this.ctb.fillRect(x, y, w, h);
    }

    drawCircle(x, y, radius, fill, stroke) {
        if (!this.isReady()) {
            return false;
        }
        this.ctb.fillStyle = fill;
        this.ctb.strokeStyle = stroke;
        this.ctb.beginPath();
        this.ctb.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctb.fill();
        if (stroke) {
            this.ctb.lineWidth = 1;
            this.ctb.strokeStyle = stroke;
            this.ctb.stroke();
        }
    }

    drawLine(sx, sy, ex, ey, color) {
        if (!this.isReady()) {
            return false;
        }
        this.ctb.strokeStyle = color;
        this.ctb.beginPath();
        this.ctb.moveTo(sx, sy);
        this.ctb.lineTo(ex, ey);
        this.ctb.stroke();
    }

    drawTriangle(x, y, color) {
        if (!this.isReady()) {
            return false;
        }
        this.ctb.strokeStyle = color;
        this.ctb.fillStyle = color;
        this.ctb.beginPath();
        this.ctb.moveTo(x + 2, y - 2);
        this.ctb.lineTo(x - 2, y + 4);
        this.ctb.lineTo(x + 6, y + 4);
        this.ctb.closePath();
        this.ctb.fill();
        this.ctb.stroke();
    }

    drawText(x, y, str, color) {
        this.ctb.font = "12px Arial";
        // this.ctx.strokeStyle = color;
        this.ctb.fillStyle = color;

        this.ctb.fillText(str, x, y);
    }

    drawImage(x, y, image) {
        this.ctb.drawImage(image, x, y);
    }

    getData(x, y) {
        return this.ctb.getImageData(x, y, 1, 1).data;
    }

    isReady() {
        if (!this.ctb) {
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
        this.ctb.beginPath();
        this.ctb.moveTo(center.x, center.y);
        while (theta <= eAngle + increment) {
            progress = (theta - sAngle) / (eAngle - sAngle);
            tempTheta = options.direction ? theta : -1 * (theta - 2 * options.angle);
            newX = options.radius * Math.cos(tempTheta) * progress;
            newY = options.radius * Math.sin(tempTheta) * progress;
            theta += increment;
            this.ctb.lineTo(center.x + newX, center.y + newY);
        }
        this.ctb.strokeStyle = options.lineColor || '#FFFFFF';
        this.ctb.lineWidth = options.lineWidth || 30;
        this.ctb.stroke();
    };

}
