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
        let color = ['green','orange','red','blue','purple','yellow','white'];
        if (empireID < 0) {
            return "transparent";
        }
        if (empireID >= color.length) {
            console.log('EmpireID out of range');
            return "transparent";
        }
        return color[empireID];
    }
}

let fn = new Functions();

export { Functions, fn };
