import {Astro} from './Astro.js';
import {fn} from './Functions.js';
import {Options} from './Options.js';
import {Galaxy} from './Galaxy.js';
import {Vector} from "./Vector";

export class Universe {
    constructor(width, height, distanceScale) {
        this.bodies = [];
        this.stars = []; // Array index of stars
        this.width = ((width-Options.border) * distanceScale) || 1280;
        this.height = ((height-Options.border) * distanceScale) || 720;
        this.orbits = [];
        this.center = {
            'x': this.width / 2,
            'y': this.height / 2
        };

        this.galaxy = new Galaxy();
        this.galaxy.setup();
        // this.galaxy.drawSpiral();
        // this.galaxy.drawDonut();
        this.galaxy.drawQuadCircle();
    }

    /**
     *
     */
    createBodies() {
        for (let s = 1; s <= Options.maxSolarSystems; s++) {
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
        if (Options.maxBodies <= 0) {
            return;
        }
        let max = fn.rand(Options.maxBodies)+1;
        star.orbitting = max;
        for (let b = 1; b <= max; b++) {
            let planet = this.createPlanet(star, systemID, b);
            star.nodes.push(planet);
        }
    }

    createStar(systemID) {
        let star = new Astro('Star ' + systemID);
        star.setAsStar();
        let vector = this.galaxy.selectCoords()
        star.vector.setVector( vector.x * Options.distanceScale, vector.y * Options.distanceScale );
        // star.vector.setVector(fn.rand(this.width), fn.rand(this.height));
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

        // this.bodies.push(planet); // Planets
        return planet;
    }

    /**
     *
     */
    createOrbits() {
        this.orbits = [];
        for (let i = 0; i < Options.maxOrbits; i++) {
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
        this.bodies[systemID].homePlanet = false;
        if (this.bodies[systemID].nodes.length > 0) {
            this.bodies[systemID].nodes.forEach((node)=> {
                this.bodies[node.astroID].empireID = empireID;
                this.bodies[node.astroID].homePlanet = false;
            });
        }
    }

    claimHomePlanet(systemID, empireID) {
        this.bodies[systemID].empireID = empireID;
        this.bodies[systemID].homePlanet = true;
        if (this.bodies[systemID].nodes.length > 0) {
            this.bodies[systemID].nodes.forEach((node)=>{
                this.bodies[node.astroID].empireID = empireID;
                this.bodies[node.astroID].homePlanet = false;
            });
        }
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

    move(astro, time) {
        let newCoords = astro.vector;
        if (astro.parent !== null) {
            newCoords = astro.vector.pointRotate(astro.vector.x, astro.vector.y - astro.orbit.distance, (time * astro.orbit.speed) + astro.orbit.initial);
            newCoords.y = newCoords.y + astro.orbit.distance;
        }
        return newCoords;
    }


    /**
     *
     * @param canvas
     * @param camera
     * @param time
     */
    draw(canvas, camera, time) {
        this.bodies.forEach((body) => {
            // body.draw(canvas, camera, time);
            let coords = this.move(body, time);
            let color = (body.type === 'star') ? 'yellow' : 'green';

            let astroCoords = new Vector(coords.x, coords.y);
            let canvasCoords = astroCoords.fitToScreen(canvas, camera);

            if (body.type === 'star') {
                canvas.drawCircle(canvasCoords.x, canvasCoords.y, fn.max(body.radius * (camera.zoom / 10), body.radius+2), 'yellow');
                canvas.drawCircle(canvasCoords.x, canvasCoords.y, fn.max(body.radius+5 * (camera.zoom / 10), body.radius+5), 'transparent', fn.getEmpireColor(body.empireID));
            }
            // if ((camera.zoom > 1000 && body.type === 'planet')) {
            //     canvas.drawCircle(coords.x, coords.y, this.orbit.distance*(camera.zoom/10), 'transparent', 'grey' );
                // canvas.drawCircle(canvasCoords.x, canvasCoords.y, fn.max(this.radius * (camera.zoom / 10), this.radius), 'green');
            // }
        })
    }
}

