function debugArrayInDocument( idName ="result",...values ){
    let result = document.getElementById( idName );
    values.forEach( (element) => {
        result.innerText += String(element)+"\n";
    });
}

function main(  ) {
    // let cart1 = { x:0, y:1, z:1 };
    // let cyl1  = cartesianToCylindrical( cart1.x, cart1.y, cart1.z );
    // let sph1  =   cartesianToSpherical( cart1.x, cart1.y, cart1.z );
    
    // let cart2 = cylindricalToCartesian( cyl1.radio, cyl1.theta, cyl1.z );
    // let cyl2  = cylindricalToSpherical( cyl1.radio, cyl1.theta, cyl1.z );
    
    // let cart3 = sphericalToCartesian( sph1.rho, sph1.phi, sph1.theta );
    // let cyl3  = sphericalToCylindrical( sph1.rho, sph1.phi, sph1.theta );
    
    // console.log( cart1 );
    // console.log( cyl1  );
    // console.log( sph1  );
    // console.log( "-------test 2------" );
    // console.log( cart2 );
    // console.log( cyl2  );
    // console.log( "-------test 3------" );
    // console.log( cart3 );
    // console.log( cyl3  );

    let objApp = new App();
}

main();