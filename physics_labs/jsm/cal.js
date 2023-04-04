let g = 9.8;

function degToRad(d) {
  
  return d * (Math.PI/180);

}

function vxSpeed(v, d) {
    
    return Number((v*Math.cos(degToRad(d))).toFixed(2))
}

function vySpeed(v, d) {
   
    return Number((v*Math.sin(degToRad(d))).toFixed(2))

}


function timeFlight(v,d,h) {
    let A = vySpeed(v, d);
    let B = Math.pow(A*A+2*g*h, 0.5)
   
    return Number(((A + B)/g).toFixed(2))
   

}

function maxHeight(v,d,h) {

    return Number(Math.pow( vySpeed(v,d) ,2)/(2*g) + h).toFixed(2)

}

function maxRange(v,d,h) {

    return (vxSpeed(v, d)*timeFlight(v,d,h)).toFixed(2)

}

export {vxSpeed, vySpeed, timeFlight, maxHeight, maxRange}