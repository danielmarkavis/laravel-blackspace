import {Astro} from './Astro.js';
import {Functions} from './Functions.js';

class Universe {
    constructor(width, height, distanceScale) {
        this.bodies = [];
        this.maxSolarSystems = 1;
        this.minBodies = 1;
        this.maxBodies = 10;
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
        star.vector.setVector(this.center.x, this.center.y);
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