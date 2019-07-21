import { Astro } from './Astro.js';
import { Functions } from './Functions.js';

class Universe {
    constructor(width, height) {
        this.bodies = [];
        this.maxSolarSystems = 1;
        this.minBodies = 1;
        this.maxBodies = 10;
        this.maxOrbits = 20;
        this.universeWidth = width || 1400;
        this.universeHeight = height || 1000;
        this.orbits = [];
        this.center = {
            'x':this.universeWidth / 2,
            'y':this.universeHeight / 2
        };
    }
    createBodies() {
        for(let s = 1; s <= this.maxSolarSystems; s++) {
            this.createSolarSystem(s);
        }
    }
    createSolarSystem(systemID) {
        let star = new Astro('Star '+systemID );
        star.setAsStar();
        star.vector.setVector(this.center);
        this.bodies.push(star); // Star
        this.createOrbits();
        for (let b = 1; b <= this.maxBodies; b++) {
            this.createPlanet(star, systemID);
        }
    }
    createPlanet(star, systemID) {
        let orbit = new Functions().rand(this.orbits.length);
        this.removeOrbit(orbit);

        let planet = new Astro('Planet '+Math.floor(Math.random() * 10000) + 1, orbit);
        planet.setAsPlanet();
        planet.setParent(systemID);
        planet.vector.setVectorCoords(star.vector.x, star.vector.y);

        this.bodies.push(planet); // Planets
    }
    createOrbits() {
        for(let i=0;i< this.maxOrbits;i++) {
            this.orbits[i] = i+1;
        }
        console.log(this.orbits);
    }

    removeOrbit(id) {
        this.orbits.splice(id,1);
    }

    draw(canvas, time) {
        this.bodies.forEach((body)=> {
            body.draw(canvas, time);
        })
    }
}

export { Universe };