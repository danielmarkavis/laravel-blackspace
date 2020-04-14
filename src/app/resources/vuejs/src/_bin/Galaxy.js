import {fn} from "../Functions";

// this.MIN_SYSTEM_SEPARATION = 35.0;                         // in universe units [0.0, s_universe_width]
// this.MIN_HOME_SYSTEM_SEPARATION = 200.0;                        // in universe units [0.0, s_universe_width]
// this.AVG_UNIVERSE_WIDTH = 1000.0 / Math.sqrt(150.0);    // so a 150 star universe is 1000 units across
// this.ADJACENCY_BOXES = 25;
// this.MAX_SYSTEM_ORBITS = 9;                            // maximum slots where planets can be
// this.g_hundred_dist = SmallIntDist(1, 100);         // a linear distribution [1, 100] used in most universe generation
// this.MAX_ATTEMPTS_PLACE_SYSTEM = 100;


function calcNewPosNearestNeighbour(position, positions) {
    if (positions.size() === 0) {
        return 0.0;
    }

    let j; // int
    let lowest_dist=  (positions[0].first  - position.first ) * (positions[0].first  - position.first ) + (positions[0].second - position.second) * (positions[0].second - position.second),
        distance = 0.0;

    for (j = 1; j < positions.size(); ++j) {
        distance =  (positions[j].first  - position.first ) * (positions[j].first  - position.first ) + (positions[j].second - position.second) * (positions[j].second - position.second);
        if(lowest_dist>distance) {
            lowest_dist = distance;
        }
    }
    return lowest_dist;
}


function spiralGalaxyCalcPositions(positions, arms, stars, width, height) {
    let arm_offset     = fn.rand();//RandDouble(0.0,2.0 * Math.PI);
    let arm_angle      = 2.0 * Math.PI / arms;
    let arm_spread     = 0.3 * Math.PI / arms;
    let arm_length     = 1.5 * Math.PI;
    let center         = 0.25;
    let x,y;
    let i, attempts;

    let random_gaussian = GaussianDist(0.0, arm_spread);
    let random_arm      = SmallIntDist(0, arms);
    let random_angle    = DoubleDist  (0.0, 2.0*Math.PI);
    let random_radius   = DoubleDist  (0.0,  1.0);

    for (i = 0, attempts = 0; i < stars && attempts < this.MAX_ATTEMPTS_PLACE_SYSTEM; ++i, ++attempts) {
        let radius = random_radius();

        if (radius < center) {
            let angle = random_angle();
            x = radius * Math.cos( arm_offset + angle );
            y = radius * Math.sin( arm_offset + angle );
        } else {
            let arm    = random_arm() * arm_angle;
            let angle  = random_gaussian();

            x = radius * Math.cos( arm_offset + arm + angle + radius * arm_length );
            y = radius * Math.sin( arm_offset + arm + angle + radius * arm_length );
        }

        x = (x + 1) * width / 2.0;
        y = (y + 1) * height / 2.0;

        if (x < 0 || width <= x || y < 0 || height <= y) {
            continue;
        }

        // See if new star is too close to any existing star.
        let lowest_dist = this.calcNewPosNearestNeighbour(x, y, positions);

        // If so, we try again.
        if (lowest_dist < this.MIN_SYSTEM_SEPARATION * this.MIN_SYSTEM_SEPARATION && attempts < this.MAX_ATTEMPTS_PLACE_SYSTEM - 1) {
            --i;
            continue;
        }

        // Add the new star location.
        positions.push(x, y);

        // Note that attempts is reset for every star.
        attempts = 0;
    }
}
