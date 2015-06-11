function RPUItriggers ( type, action, id ) {
	switch( type ) {
		case "multi-select":
			if( action == "open" ) {
				console.log( "Open " + id );
			} else if( action == "close" ) {
				console.log( "Close " + id );
			
			}
			break;
		default:
			console.log( "No case found for " + type + ", " + "action" + " on id." );
	}
}

function RPUI ( type, data, label ) {
	console.log( "Creating a " + type + " RPUI, out of:" );
	console.log( data );
	console.log( data.attr( "id" ) );
	var returnable = {
		"type":type,
		"options": new Array(),
	}
	console.log( data[0].length );
	for( var x = 0; x < data[0].length; x++ ) {
		returnable.options.push( new KeyVals( jQuery(data[0][x]).val(), jQuery(data[0][x]).text()) );
	}
	console.log( data[0].length );
	
	var wrapper = jQuery( "<div>" ).attr( 'id', data.attr( "id" ) );
	wrapper.append(
		jQuery( "<label>" ).text( label )
	);
	var trigger = jQuery( "<span>" ).addClass( "RPUI-trigger" ).text( "test" ).
		bind( "click", function() {
			RPUItriggers( type, 'open', data.attr( "id" ) )
		});
	var closer = jQuery( "<span>" ).addClass( "closer" ).text( "x" ).
		bind( "click", function() {
			RPUItriggers( type, 'close', data.attr( "id" ) )
		});
	
	wrapper.append( trigger );
	trigger.append( closer );
	
	var container = jQuery( data ).replaceWith( wrapper );
	console.log( wrapper );
	
	return returnable;
}

function KeyVals ( k, v ) {
	return {
		"key": k,
		"val": v
	};
}