
// Pootle Piglet Jr. v0.0.1

var w = 50;
var l = 60;
var h = 50;

var legR = 6;

function main() {
    return pootle();
}

function pootle() {
    return union(
        body(h/2),
        head(h/4),
        tail(h/8),
        legs(w/2, h/2, legR));
}

function body(r) {
    let outer = sphere({r: r}).scale([1.25,1,1]).translate([0,0,r]);
    let inner = outer.scale([0.9,0.9,0.9]);
    let access = cylinder({r: r/3, h: h/4, center: false});
    return difference(outer, inner, access);
}

function head(r) {
    let outer = sphere({r: r}).scale([1.2,1.25,1]);
    let inner = outer.scale([0.7,0.7,0.7]);
    // TODO: ears!!
    return union(difference(outer, inner).translate([w*0.6,0,h*0.6]),snout(r),eyes(r/4,w/2+r*1.1,r*0.6,h*0.7));
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
    // TODO: size holes for magnets
    let outer = cylinder({r: legR, h: h/4, center: false});
    let inner = outer.scale([0.6,0.6,0.6]);
    return difference(outer, inner).translate([x,y]);
}
