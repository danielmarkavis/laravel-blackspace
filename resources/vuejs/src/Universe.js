import {Astro} from './Astro.js';
import {Functions} from './Functions.js';

class Universe {
    constructor(width, height, distanceScale) {
        this.bodies = [];
        this.maxSolarSystems = 200;
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
    }

    /**
     *
     * @param systemID
     */
    createSolarSystem(systemID) {
        let star = new Astro('Star ' + systemID);
        star.setAsStar();
        let fn = new Functions();
        // star.vector.setVector(this.center.x, this.center.y);
        star.vector.setVector(fn.rand(this.width), fn.rand(this.height));
        star.name = this.systemNameGenerator();

        this.bodies.push(star); // Star
        this.createOrbits();
        for (let b = 1; b <= this.maxBodies; b++) {
            this.createPlanet(star, systemID, b);
        }
    }

    /**
     *
     * @param star
     * @param systemID
     * @param planetIndex
     */
    createPlanet(star, systemID, planetIndex) {
        let fn = new Functions();
        let rand = fn.rand(this.orbits.length);
        let orbit = this.orbits[rand];
        this.removeOrbit(rand);

        let planet = new Astro(star.name+'-'+planetIndex, orbit);
        planet.setAsPlanet();
        planet.setParent(systemID);
        planet.vector.setVector(star.vector.x, star.vector.y);

        this.bodies.push(planet); // Planets
    }

    /**
     *
     */
    createOrbits() {
        this.orbits = [];
        for (let i = 0; i < this.maxOrbits; i++) {
            this.orbits[i] = i+1;
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
        return this.bodies[id];
    }

    getStar(id) {
        let astro = this.getAstro(id);
        if (astro.parentId !== 0) {
            return this.getStar(astro.parentId);
        }
        return this.bodies[id];
    }

    systemNameGenerator() {
        // XX-XXX such as F7-XZH (Base this some how on coords)
        // Uses hex values 0-9 a-z but letters are first.
        // [Quaduant][Sector]-[System]
        //NOTE: Not using numbers yet and no double name check either.
        let nStr = '';
        let fn = new Functions();
        for (let i = 0; i < 4; i++) {
            if (i === 2) {
                nStr += '-';
            }
            let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];
            let rand = fn.rand(26);
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