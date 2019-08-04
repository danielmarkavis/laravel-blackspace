class Canvas {
    /**
     *
     * @param element string
     * @param resolution object(width, height)
     */
    constructor(element, resolution) {
        this.element = element;
        this.canvas = null;
        this.ctx = null;
        this.width = resolution.width || 1280;
        this.height = resolution.height || 720;
        this.center = {
            x: Math.round(resolution.width / 2),
            y: Math.round(resolution.height / 2)
        };
        this.layers = []; // Fleet lines -> planets -> ships
    }

    clear() {
        this.fillRect(0,0,this.canvas.width, this.canvas.height, 'black');
    }

    render() {
        this.canvas = document.getElementById(this.element);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.clear();
    }

    fillRect(x,y,w,h,color) {
        if (!this.isReady()) {
            return false;
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,w,h);
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
        this.ctx.beginPath();
        this.ctx.moveTo(75, 50);
        this.ctx.lineTo(100, 75);
        this.ctx.lineTo(100, 25);
        this.ctx.fill();
    }

    isReady() {
        if (!this.ctx) {
            console.log('Canvas not ready');
            return false;
        }
        return true;
    }
}

export { Canvas };
