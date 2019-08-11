class Functions {
    constructor() {
    }

    rand(max) {
        return Math.floor(Math.random() * max)
    }

    min(value, defaultValue) {
        if (value < defaultValue ) {
            return defaultValue;
        }
        return value;
    }
    max(value, defaultValue) {
        if (value > defaultValue ) {
            return defaultValue;
        }
        return value;
    }

    getEmpireColor(empireID){
        let color = ['green','orange','red','blue','purple','cyan','teal'];
        if (empireID < 0) {
            return "transparent";
        }
        if (empireID >= color.length) {
            console.log('EmpireID out of range');
            return "transparent";
        }
        return color[empireID];
    }

    rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }
}

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    }).catch((err) => console.log(err));
}

let fn = new Functions();

export { Functions, fn, loadImage };
