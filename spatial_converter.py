from math import sin, cos, atan, radians, degrees

def getAngle( opposite, adjacent ) -> float:
    angle = 0.0

    if adjacent == 0:
        if opposite != 0: angle = 270.0
        else: angle = 90
    else:
        angle = degrees( atan( opposite / adjacent ) ) 
        if opposite < 0:
            if adjacent < 0:angle = 270 - angle
            else: angle = 360 + angle
        else: 
            if adjacent < 0: angle = 180 + angle
            else: angle = angle

    return angle
            
def cartesian3dToCylindrical( x, y, z ) -> dict:
    radio = ( x**2 + y**2 + z**2 )**(1/2);
    theta = getAngle( y, x )

    return {
        "radio":radio,
        "theta":theta,
        "z"    : z
    }

def cartesian3dToSpherical( x, y, z ) -> dict:
    cylindrical = cartesian3dToCylindrical( x, y, z )
    rho         =       ( x**2 + y**2 + z**2 )**(1/2)
    phi         = getAngle( cylindrical["radio"], z )
    theta       =                cylindrical["theta"]

    return {
        "rho"  :   rho,
        "theta": theta,
        "phi"  :   phi,
    }

def cylindricalToCartesian3d( radio, theta, z ) -> dict:
    theta_radians = radians( theta )
    x = radio * cos( theta_radians )
    y = radio * sin( theta_radians )

    return {
        "x": x,
        "y": y,
        "z": z,
    }

def cylindricalToSpherical( radio, theta, z ) -> dict:
    cartesian = cylindricalToCartesian3d( radio, theta, z )
    spherical = cartesian3dToSpherical( 
        cartesian["x"], 
        cartesian["y"],
        cartesian["z"],
    )

    return {
        "rho"  : spherical["rho"  ],
        "theta": spherical["theta"],
        "phi"  : spherical["phi"  ],
    }

def sphericalToCylindrical( rho, theta, phi ) -> dict:
    if rho < 0:
        rho = rho * (-1)
    radio = 0
    z     = 0

    if rho != 0:
        phi_radians = radians( phi )
        z     = rho * cos( phi_radians )
        radio = rho * sin( phi_radians )

    return {
        "radio": radio,
        "theta": theta,
        "z"    :     z,
    }

def sphericalToCartesian3d( rho, theta, phi ) -> dict:
    cylindrical = sphericalToCylindrical( rho, theta, phi )
    cartesian   = cylindricalToCartesian3d(  
        cylindrical["radio"],
        cylindrical["theta"],
        cylindrical["z"    ],
    )
    return {
        "x": cartesian["x"],
        "y": cartesian["y"],
        "z": cartesian["z"],
    }