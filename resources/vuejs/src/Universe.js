import {Astro} from './Astro.js';
import {fn} from './Functions.js';

class Universe {
    constructor(width, height, distanceScale) {
        this.bodies = [];
        this.stars = []; // Array index of stars
        this.maxSolarSystems = 2000;
        this.minBodies = 1;
        this.maxBodies = 5;
        this.maxOrbits = 20;
        this.width = (width * distanceScale) || 1280;
        this.height = (height * distanceScale) || 720;
        this.orbits = [];
        this.center = {
            'x': this.width / 2,
            'y': this.height / 2
        };
    }

    /**
     *
     */
    createBodies() {
        for (let s = 1; s <= this.maxSolarSystems; s++) {
            this.createSolarSystem(s);
        }
        // console.log(this.stars);
    }

    /**
     *
     * @param systemID
     */
    createSolarSystem(systemID) {
        let star = this.createStar(systemID);
        let max = fn.rand(this.maxBodies)+1;
        for (let b = 1; b <= max; b++) {
            this.createPlanet(star, systemID, b);
        }
    }

    createStar(systemID) {
        let star = new Astro('Star ' + systemID);
        star.setAsStar();
        star.vector.setVector(fn.rand(this.width), fn.rand(this.height));
        star.name = this.systemNameGenerator();
        star.astroID = this.bodies.length;
        this.bodies.push(star); // Star
        this.stars.push(this.bodies.length - 1);
        this.createOrbits();
        return star;
    }

    /**
     *
     * @param star
     * @param systemID
     * @param planetIndex
     */
    createPlanet(star, systemID, planetIndex) {
        let rand = fn.rand(this.orbits.length);
        let orbit = this.orbits[rand];
        this.removeOrbit(rand);

        let planet = new Astro(star.name + '-' + planetIndex, orbit);
        planet.setAsPlanet();
        planet.setParent(systemID);
        planet.vector.setVector(star.vector.x, star.vector.y);
        planet.astroID = this.bodies.length - 1;

        this.bodies.push(planet); // Planets
    }

    /**
     *
     */
    createOrbits() {
        this.orbits = [];
        for (let i = 0; i < this.maxOrbits; i++) {
            this.orbits[i] = i + 1;
        }
    }

    /**
     *
     * @param id
     */
    removeOrbit(id) {
        this.orbits.splice(id, 1);
    }

    getAstro(id) {
        if (id > this.bodies.length) {
            console.log('ERROR: getAstro(), index out of range!');
            return false;
        }
        return this.bodies[id];
    }

    getStar(id) {
        if (id > this.stars.length) {
            console.log('ERROR: getStar(), index out of range!');
            return false;
        }
        return this.getAstro( this.stars[id]);
    }

    captureSystem(systemID, empireID) {
        this.bodies[systemID].empireID = empireID;
    }

    systemNameGenerator() {
        // XX-XXX such as F7-XZH (Base this some how on coords)
        // Uses hex values 0-9 a-z but letters are first.
        // [Quaduant][Sector]-[System]
        //NOTE: Not using numbers yet and no double name check either.
        let nStr = '';
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        for (let i = 0; i <= 4; i++) {
            if (i === 2) {
                nStr += '-';
            }
            let rand = fn.rand(letters.length);
            nStr += letters[rand];
        }
        return nStr;
    }

    /**
     *
     * @param canvas
     * @param camera
     * @param time
     */
    draw(canvas, camera, time) {
        this.bodies.forEach((body) => {
            body.draw(canvas, camera, time);
        })
    }
}

export {Universe};
