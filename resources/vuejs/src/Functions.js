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

}

let  fn = new Functions();

export { Functions, fn };