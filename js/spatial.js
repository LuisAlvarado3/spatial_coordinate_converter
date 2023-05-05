const COORD_TYPE = {
    // CARTESIAN_2D: "CARTESIAN 2D",
    // POLAR       : "POLAR"       ,
    CARTESIAN_3D: "CARTESIAN 3D",
    CYLINDRICAL : "CYLINDRICAL" ,
    SPHERICAL   : "SPHERICAL"   ,
}

function validateNumbers(a,b,c){
    a = parseFloat( a );
    b = parseFloat( b );
    c = parseFloat( c );
    if( isNaN( a ) ){ a=0; }
    if( isNaN( b ) ){ b=0; }
    if( isNaN( c ) ){ c=0; }

    return { a, b, c };
}

function radiansToAngle( radians=0 ){
    return radians * ( 180 / Math.PI );
}

function angleToRadians( angle=0 ){
    return angle * Math.PI / 180;
}

function getAngle( opposite=0, adjacent=0 ){
    let angle = 0;
    if( adjacent == 0 ){
        if( opposite != 0 ){
            if( opposite < 0 ){ angle = 270 }
            else{ angle = 90; }
        }
    }else{
        angle = radiansToAngle( Math.atan( opposite/adjacent ) );
        if(opposite < 0 ){
            if( adjacent < 0 ){ angle = 270 - angle;}
            else{ angle = 360+angle; }
        }else{
            if( adjacent < 0 ){ angle = 180 + angle;}
            else{ angle = angle; }
        }
    }

    return angle;
}

function cartesian3dToCylindrical( x=0, y=0, z=0 ){
    let numbers = validateNumbers( x, y, z );
    x = numbers.a; 
    y = numbers.b; 
    z = numbers.c;

    let radio = ( x**2 + y**2 )**(1/2);
    let theta = getAngle( y, x );
    return { radio: radio, theta: theta, z: z };
}

function cartesia3dToSpherical( x=0, y=0, z=0 ){
    let cylindrical = cartesian3dToCylindrical(x, y, z );
    let rho   = (x**2 + y**2 + z**2)**(1/2);
    let phi   = getAngle( cylindrical.radio, z );
    // console.log( "phi"+phi );
    let theta = cylindrical.theta;
    
    return { rho, theta, phi };
}

function cylindricalToCartesian3d( radio, theta, z ){
    let numbers = validateNumbers( radio, theta, z );
    radio = numbers.a;
    theta = numbers.b;
    z     = numbers.c;

    let theta_rad = angleToRadians( theta ); 
    let x = radio * Math.cos( theta_rad );
    let y = radio * Math.sin( theta_rad );

    return { x, y, z };
}

function cylindricalToSpherical( radio, theta, z ){
    let numbers = validateNumbers( radio, theta, z );
    radio = numbers.a;
    theta = numbers.b;
    z     = numbers.c;
    let cartesian = cylindricalToCartesian3d( radio, theta, z );
    let spherical = cartesia3dToSpherical   ( cartesian.x, cartesian.y, cartesian.z );

    return { 
        rho  : spherical.rho  ,
        theta: spherical.theta,
        phi  : spherical.phi  ,
    }
}

function sphericalToCylindrical( rho=0, theta=0, phi=0 ){
    let numbers = validateNumbers(rho, theta, phi);
    rho   = numbers.a;
    theta = numbers.b;
    phi   = numbers.c;
    if( rho < 0 ){ rho = rho*(-1); }


    // console.log( {rho, phi, theta} );
    let radio = 0;
    let z     = 0;
    if(  rho != 0  ){
        let phiRad = angleToRadians( phi );
        z     = rho * Math.cos( phiRad );
        radio = rho * Math.sin( phiRad );
        console.log( `${z}* tan(${phi})` );
    }

    return { radio, theta, z  };
}

function sphericalToCartesian3d( rho=0, theta=0, phi=0 ){
    let cylindrical = sphericalToCylindrical( rho, theta, phi );
    let cartesian   = cylindricalToCartesian3d( cylindrical.radio, cylindrical.theta, cylindrical.z );
    return { x: cartesian.x, y: cartesian.y, z: cartesian.z };
}

/*
rho: 1.732
theta: 45.000
phi: 54.736

*/