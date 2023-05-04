const ELEMENTS_APP = {
    FORM_SELECT: {
        In: {
            id       : "form-coord-in",
            idSelect :    "select-in" ,
            title    :    "Coordinate",
        },
    },
    FORM_COORD: {
        idIn : "coord-in" ,
        idOut: "coord-out",
        defaultValues: {
            cartesian  : { x      : 0, y    : 0, z    : 0 },
            cylindrical: { radio  : 0, theta: 0, z    : 0 },
            spherical  : { rho    : 0, theta: 0, phi  : 0 }
        }
    }
}

class SelectCoord{
    constructor( objFormSelect = ELEMENTS_APP.FORM_SELECT.In ){//id = select-coord-in
        this.idContent     = document.getElementById( objFormSelect.id );
        this.idSelect      = document.createElement ( "select"  );
        this.textIndicator = document.createElement ( "label"   );

        this.idSelect.id             =    objFormSelect.idSelect;
        this.textIndicator.innerText =  objFormSelect .title+" ";
        this.idContent.className     =                "selector";

        this.appendOption();
        this.idContent.appendChild( this.textIndicator );
        this.idContent.appendChild( this.idSelect      );
    }

    appendOption(  ){
        for( let key in COORD_TYPE ){
            // console.log( `${key}: ${COORD_TYPE[key]}` );
            let option = document.createElement( "option" );
            option.value     = COORD_TYPE[key];
            option.innerText = COORD_TYPE[key];
            this.idSelect.appendChild( option )
        }
    }

}

class App{
    constructor(){
        this.selectIn  = new SelectCoord( ELEMENTS_APP.FORM_SELECT.In           );
        this.idIn      = document.getElementById( ELEMENTS_APP.FORM_COORD.idIn  );
        this.idOut     = document.getElementById( ELEMENTS_APP.FORM_COORD.idOut );
        this.selectIn.idSelect.addEventListener( "change", () => {
            this.formCoord(this.selectIn.idSelect.value);
        });
        this.init()
    }
    
    init(){
        this.formCoord();
    }

    formCoord( nameCoord=COORD_TYPE.CARTESIAN_3D ) {
        this.deleteAllResponses();
        if( nameCoord == COORD_TYPE.CARTESIAN_3D  ){ 
            this.appendCoordsInputs( ELEMENTS_APP.FORM_COORD.defaultValues.cartesian    );
            this.appendCoordsOutputs( ELEMENTS_APP.FORM_COORD.defaultValues.cylindrical, "CYLINDRICAL" );
            this.appendCoordsOutputs( ELEMENTS_APP.FORM_COORD.defaultValues.spherical  , "SPHERICAL"   );
            this.idIn.firstChild.addEventListener( "input", ()=>{ this.updateCartesian(); });
        }
        if( nameCoord == COORD_TYPE.CYLINDRICAL ){ 
            this.appendCoordsInputs( ELEMENTS_APP.FORM_COORD.defaultValues.cylindrical ); 
            this.appendCoordsOutputs( ELEMENTS_APP.FORM_COORD.defaultValues.cartesian, "CARTESIAN" );
            this.appendCoordsOutputs( ELEMENTS_APP.FORM_COORD.defaultValues.spherical, "SPHERICAL" );

            this.idIn.firstChild.addEventListener( "input", ()=>{ 
                this.updateCylindrical();
            });
        }
        if( nameCoord == COORD_TYPE.SPHERICAL ){ 
            this.appendCoordsInputs( ELEMENTS_APP.FORM_COORD.defaultValues.spherical    ); 
            this.appendCoordsOutputs( ELEMENTS_APP.FORM_COORD.defaultValues.cartesian   );
            this.appendCoordsOutputs( ELEMENTS_APP.FORM_COORD.defaultValues.cylindrical );

            this.idIn.firstChild.addEventListener( "input", ()=>{ 
                this.updateSpherical();
            });
        }
    }

    updateCartesian(){
        let x = this.idIn.firstChild.childNodes[1].value;
        let y = this.idIn.firstChild.childNodes[3].value;
        let z = this.idIn.firstChild.childNodes[5].value;

        let cylindrical = cartesian3dToCylindrical( x, y, z );
        let spherical   = cartesia3dToSpherical   ( x, y, z );
        this.deleteOutput();
        this.appendCoordsOutputs( cylindrical, "CYLINDRICAL" );
        this.appendCoordsOutputs( spherical  , "SPHERICAL" );
    }

    updateCylindrical(){
        let radio = this.idIn.firstChild.childNodes[1].value; 
        let theta = this.idIn.firstChild.childNodes[3].value;
        let z     = this.idIn.firstChild.childNodes[5].value;
        
        let cartesian = cylindricalToCartesian3d( radio, theta, z );
        let spherical = cylindricalToSpherical  ( radio, theta, z );
        this.deleteOutput();
        this.appendCoordsOutputs( cartesian, "CARTESIAN" );
        this.appendCoordsOutputs( spherical, "SPHERICAL" );
    }

    updateSpherical(){
        let rho   = this.idIn.firstChild.childNodes[1].value;
        let phi   = this.idIn.firstChild.childNodes[3].value;
        let theta = this.idIn.firstChild.childNodes[5].value;

        let cartesian   = sphericalToCartesian3d( rho, phi, theta );
        let cylindrical = sphericalToCylindrical( rho, phi, theta );

        this.deleteOutput();
        this.appendCoordsOutputs( cartesian  , "CARTESIAN"   );
        this.appendCoordsOutputs( cylindrical, "CYLINDRICAL" );
    }


    appendCoordsInputs( coord ){
        let containter = document.createElement( "div" );
        containter.className = "containter";
        for( let key in coord ){
            //let inCartesian = document.createElement( "div" );
            let caseInput = this.appendInput( key,  coord );
            // caseInput.tagInput.onchange( (  )=>{
            //     let x = parseFloat( document.getElementById( "x" ).value );
            //     let y = parseFloat( document.getElementById( "y" ).value );
            //     let z = parseFloat( document.getElementById( "z" ).value );
            //     let cylindrical = cartesian3dToCylindrical( x, y, z );
            //     let spherical   = cartesia3dToSpherical   ( x, y, z );
            // });
            containter.appendChild( caseInput.tagLabel );
            containter.appendChild( caseInput.tagInput );
        }
        this.idIn.appendChild( containter );
    }

    appendCoordsOutputs( coord, title="CARTESIAN" ){
        let containter = document.createElement( "div" );
        containter.className = "container";
        let lblTitle = document.createElement( "label" );
        lblTitle.innerText = title;
        lblTitle.className = "lbl-header";

        for( let key in coord ){
            let caseResponse = this.appendOutput( key, coord );
            containter.appendChild( caseResponse.tagName  );
            containter.appendChild( caseResponse.tagValue );
            containter.appendChild( document.createElement("br") );
        }

        this.idOut.appendChild( lblTitle   );
        this.idOut.appendChild( containter );
    }

    updateOutput( coord = ELEMENTS_APP.FORM_COORD.defaultValues.cartesian ){
        for( let key in  coord){
            let idComponent = document.getElementById( key );
            idComponent.value = coord[ key ];
        }
    }

    deleteAllResponses(){
        this.deleteInput ();
        this.deleteOutput();
    }

    deleteInput(){
        while( this.idIn.hasChildNodes() ){
            this.idIn.removeChild( this.idIn.firstChild );
        }
    }

    deleteOutput(){
        while( this.idOut.hasChildNodes() ){
            this.idOut.removeChild( this.idOut.firstChild );
        }
    }

    appendOutput( key, objCoord ){
        let tagName  = document.createElement( "label" );
        let tagValue = document.createElement( "label" );
        tagValue.id        = key;
        tagName.className  = "lbl-out";
        tagName.innerText  = key+": ";
        tagValue.innerText = (objCoord[key]).toFixed( 3 );

        return { tagName, tagValue };
    }

    appendInput( key, objCoord ){
        let tagInput = document.createElement( "input" );
        let tagLabel = document.createElement( "label" );
        tagLabel.className = "lbl-input"

        tagInput.id        = key;
        tagLabel.innerText = key+":  ";
        tagInput.type = "number"
        tagInput.value     = objCoord[key];
        
        return { tagInput, tagLabel };
    }
}