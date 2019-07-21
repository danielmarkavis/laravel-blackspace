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
        this.resolution = {
            width: resolution.width || 1280,
            height: resolution.height || 720
        };
        this.layers = []; // Fleet lines -> planets -> ships
//        this.zoom = 1;
    }

    clear() {
        this.fillRect(0,0,this.canvas.width, this.canvas.height, 'black');
    }

    render() {
        this.canvas = document.getElementById(this.element);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.resolution.width;
        this.canvas.height = this.resolution.height;
        this.clear();
    }

    fillRect(x,y,w,h,color) {
        if (!this.ctx) {
            console.log('Canvas not ready');
            return false;
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,w,h);
    }

    drawCircle(x, y, radius, color) {
        if (!this.ctx) {
            console.log('Canvas not ready');
            return false;
        }
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }
}

let screenCanvas = new Canvas("my-canvas", {width: 1280, height: 720});

export { Canvas, screenCanvas };