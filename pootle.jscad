
// Pootle Piglet Jr. v0.0.6

const DEBUG = true;

var w = 50;
var l = 60;
var h = 50;
var cutH = h*0.737;

var legR = 6;

function main() {
    return pootle();
}

function pootle() {
    let pig = union(body(h/2),
                    head(h/4),
                    tail(h/8),
                    legs(w/2, h/2, legR));


    // hard-coded 10mm dia magnet
    let magnet = cylinder({r: 5, h: 2, center: false});
    
    pig = difference(pig, 
                     nano(-w*0.63,-10,h*-0.7), 
                     magnet.translate([w*0.45,0,cutH-2]),
                     magnet.translate([w*-0.42,0,cutH-2]));
    
    // take the lid off for debug
    if (DEBUG) {
        let cutaway = cube({size: [w*1.5,l*0.8,h*0.3]}).translate([w*-0.55,l*-0.4,cutH]);
        pig = difference(pig, cutaway);
    }
    
    return pig;
}

function body(r) {
    let outer = sphere({r: r}).scale([1.25,1,1]).translate([0,0,r]);
    let inner = outer.scale([0.85,0.85,0.85]).translate([0,0,0.15*r]);
    
    return difference(outer, inner);
}

function nano(x,y,z) {
    // hard-coded for NANO 33 BLE Sense size
    let outer = cube({size: [64,20,15]}).translate([x,y,z]);
    let inner = cube({size: [40,10,5]}).translate([x,y+5,z]);
    
    return difference(outer, inner).rotateX(180);
}

function head(r) {
    let outer = sphere({r: r}).scale([1.2,1.25,1]);
    let inner = outer.scale([0.9,0.9,0.9]);
    let main = difference(outer, inner).translate([w*0.6,0,h*0.6]);
    main = difference(main, eyes(r/4,w/2+r*1.1,r*0.6,h*0.7));

    return union(main,
                 snout(r),
                 ears(r/4,w/2+r*0.8,r*0.6,h*0.8));
}

function snout(r) {
    // TODO: add cam hole
    return cylinder({r: r/2, h: r/4, center: false}).rotateY(90).scale([1,1,0.8]).translate([w*0.85,0,h*0.6]);
}

function eyes(r,x,y,z) {
    return union(eye(r,x,y,z),eye(r,x,-y,z));
}

function eye(r,x,y,z) {
    return sphere({r: r}).scale([1.25,1,1]).translate([x,y,z]);
}

function ears(r,x,y,z) {
    return union(ear(r,x,y,z),ear(r,x,-y,z));
}

function ear(r,x,y,z) {
    let outer = sphere({r: r}).scale([1.25,1,1]).translate([x,y*1.1,z]);
    let inner = sphere({r: r}).scale([1.4,1.2,1]).translate([x*1.1,y,z]);
    return difference(outer, inner);
}

function tail(r) {
    // TODO: curly
    return sphere({r: r}).scale([1.5,1.25,1]).translate([-w/2,0,h*0.6]);
}

function legs(x, y) {
    return union(
        leg(x/2, y/2),
        leg(x/2, -y/2),
        leg(-x/2, y/2),
        leg(-x/2, -y/2));
}

function leg(x, y) {
    let outer = cylinder({r: legR, h: h/4, center: false});
    
    // hard-coded for magnet size
    let inner = cylinder({r: 3, h: 2.5, center: false});
    
    return difference(outer, inner).translate([x,y]);
}
