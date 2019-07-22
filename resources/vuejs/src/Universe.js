import {Astro} from './Astro.js';
import {Functions} from './Functions.js';

class Universe {
    constructor(width, height, distanceScale) {
        this.bodies = [];
        this.maxSolarSystems = 200;
        this.minBodies = 1;
        this.maxBodies = 3;
        this.maxOrbits = 20;
        this.width = (width * distanceScale) || 1280;
        this.height = (height * distanceScale) || 720;
        this.orbits = [];
        this.center = {
            'x': this.width / 2,
            'y': this.height / 2
        };
        console.log(this.width);
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
        this.bodies.push(star); // Star
        this.createOrbits();
        for (let b = 1; b <= this.maxBodies; b++) {
            this.createPlanet(star, systemID);
        }
    }

    /**
     *
     * @param star
     * @param systemID
     */
    createPlanet(star, systemID) {
        let rand = new Functions().rand(this.orbits.length);
        let orbit = this.orbits[rand];
        this.removeOrbit(rand);

        let planet = new Astro('Planet ' + (new Functions().rand(10000) + 1), orbit);
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