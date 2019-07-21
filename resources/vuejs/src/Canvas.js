class Canvas {
    constructor(element) {
        this.element = element;
        this.canvas = null;
        this.ctx = null;
        this.canvasWidth = 1280;
        this.canvasHeight = 768;
        this.layers = []; // Fleet lines -> planets -> ships
        this.zoom = 0;
    }

    clear() {
        this.fillRect(0,0,this.canvas.width, this.canvas.height, 'black');
    }

    render() {
        this.canvas = document.getElementById(this.element);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.clear();
    }

    fillRect(x,y,w,h,color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,w,h);
    }

    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }
}

export { Canvas };