var canv;
var c;
var mapImg = new Image();
$( document ).ready(function() {
	canv = document.getElementById( "canv" );
	c    = canv.getContext( "2d" );
	mapImg.src = 'mockup_HF_map_statelines-cropped_v3.png';
	//c.font = "18px milobold";
	c.textAlign = 'center';
	
	mapImg.onload = function() {
		baseTime = new Date().getTime();
		
		automation.toolTip = document.getElementById( 'canvasTooltip' );
		automation.updateNextChange();
		
		automation.displayNumber( 0, testimonials[ 0 ] ); // start first
		
		animate();
	};
	/*
	// old method of calculating mouse position
	canv.addEventListener( 'mousemove', function( e ) {
		var offSize = 1;
		offSize = canv.width / parseFloat( jQuery( canv ).css( 'width' ) );
		automation.defaultSize.offSize = offSize;
		automation.mouse.x = offSize * (e.x - jQuery( canv ).offset().left); // update mouse location
		automation.mouse.y = offSize * (e.y - jQuery( canv ).offset().top); // respects resize value
		
	}, false);
	*/
	canv.addEventListener( 'mousemove', function( e ) {
		// info: http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
		var mousePos = getMousePos( canv, e );
		console.log( mousePos );
		automation.mouse = mousePos;
	}, false);
});

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}
	  
function Testimonial( n, x, y, t, newImage, options ) {
	var und;
	var displayAbove = false;
	var displayRight = true;
	if( options.screenHeight != und && x >= ( options.screenHeight * 0.5 ) ) {
		displayAbove = true;
	}
	
	return {
		'name': n,
		'text': t,
		'x': x,
		'y': y,
		'mouseDistance': 0,
		'inactiveDisplay': 10,
		'activeDisplay': 25,
		'strength': 25,
		'circleDiff': 0.8,
		'displayAbove':displayAbove,
		'displayRight':displayRight,
		'img':newImage,
		active: false,
		draw: function( context ) {
			var grd;
			
			var dotSize = canv.width / this.mouseDistance * 2.1;
			if( dotSize < this.inactiveDisplay ) {
				dotSize = this.inactiveDisplay;
			} else if ( dotSize > this.activeDisplay ) {
				dotSize = this.activeDisplay;
			}
			
			context.beginPath();
			if( this.active ) {
				context.arc( this.x, this.y, dotSize, 0, 2 * Math.PI, false );
				grd = context.createRadialGradient( this.x, this.y, 0.000, 
					this.x, this.y, dotSize );
				
				// Add colors
				grd.addColorStop( 0.000, 'rgba( 241, 62, 12, 0.8 )' );
				grd.addColorStop( 1.000, 'rgba( 241, 62, 12, 0.8 )' );
			} else {
				context.arc( this.x, this.y, dotSize, 0, 2 * Math.PI, false );
				grd = context.createRadialGradient( this.x, this.y, 0.000, 
					this.x, this.y, dotSize );
				
				// Add colors
				grd.addColorStop( 0.000, 'rgba( 126, 170, 0, 0.8 )' );
				grd.addColorStop( 1.000, 'rgba( 126, 170, 0, 0.8 )' );
			}
			
			context.closePath();
			context.fillStyle = grd;	// Fill with gradient

			context.fill();
			
			/*
			// debug size
			context.lineWidth = 0;
			context.fillStyle = "#990000";
			context.fillText( dotSize, this.x, this.y );
			*/
		}
	}
}

var automation = {
	changeFrequency: 3000, //ms
	nextChange: 0,
	currentNumber: 0,
	updateNextChange: function () {
		this.nextChange = new Date().getTime() + this.changeFrequency;
	},
	defaultSize: {
		x:1200,
		y:600,
	},
	margins: 20,
	tailSize: {
		x: 40,
		y: 40,
	},
	imageSize: 100,
	mouse: {
		x:0,
		y:0,
	},
	displayNumber: function ( num, t ) {
		this.currentNumber = num;
		this.updateNextChange();
		
		var writeText  = "<img src='" + t.img + "' class='map-testimonial-image' />";
			writeText += '<div class="map-text"><p><i>"' + t.text + '"</i></p>';
			writeText += "<p><strong>" + t.name + "</strong></p></div>";
		this.toolTip.innerHTML = writeText;
	},
	update: function ( t ) {
		
		if( this.nextChange == 0 ) {
			this.updateNextChange();
		}
		
		var currentTime = new Date().getTime();
		if( currentTime >= this.nextChange ) {
			this.currentNumber++;
			this.updateNextChange();
			if( this.currentNumber >= t.length ) {
				this.currentNumber = 0;
			}
			
			this.displayNumber( this.currentNumber, t[ this.currentNumber ] );
		}
		
		if( !t[ this.currentNumber ].active ) {
			for( x = 0; x < t.length; x++ ) {
				t[ x ].active = false;
			}
			t[ this.currentNumber ].active = true;
		}
		
	},
};

var testimonials = [
	new Testimonial( 'Lori, Host Mom from New York', 660, 140,
		"I am a truly blessed Host Mom. My au pair is had a tremendous effect in my son’s life and our home. I know when I am at work, he is safe and cared for.",
		"../images/jpeg.jpg",
		{'screenHeight': automation.defaultSize.x} ),
	new Testimonial( 'Zambruni Family – CA', 95, 220,
		"Our family feels that we hit the jackpot when our au pair Mariana arrived and can’t imagine what our home would be like without her. The best way to describe what has happened since Mariana’s arrival is to say that we, quite unexpectedly, received not just a caregiver, but a new daughter.",
		"../images/jpeg.jpg",
		{'screenHeight': automation.defaultSize.x} ),
	new Testimonial( 'The Patterson Family - MD', 690, 155,
		"Through this experience, we have gained extended family. We have built a positive relationship with our au pair who has proven to be a nurturing, loving, warm, compassionate, and understanding person.",
		"../images/jpeg.jpg",
		{'screenHeight': automation.defaultSize.x} ),
	new Testimonial( 'The Hadley Family - Virginia', 640, 230,
		"Within moments of meeting her, I have people asking me how they can get a childcare provider like her. I have had numerous conversations about the awesomeness of au pairs and the benefit they bring because of Marijana.",
		"../images/jpeg.jpg",
		{'screenHeight': automation.defaultSize.x} ),
	new Testimonial( 'The Young Family - Minnesota', 440, 140,
		"We decided to get an au pair to meet our daycare needs but soon realized it was so much more than that. My husband and I  both work full time and I have never had a doubt that they are safe, loved and cared for all of the time.",
		"../images/jpeg.jpg",
		{'screenHeight': automation.defaultSize.x} ),
	new Testimonial( 'The Kruse Family - Colorado', 320, 230,
		"The end of the work day used to feel like the beginning of an even more challenging “job.”... Now that time of day is actually fun! We have the time to talk more at the table, take a family walk after dinner, let the kids play in the bath for an extra few minutes, sing and dance while we brush teeth, tell jokes while we lay in bed with them. And we have all of this time because of our au pair Cata.",
		"../images/jpeg.jpg",
		{'screenHeight': automation.defaultSize.x} ),
	new Testimonial( 'The McAninch Family - North Carolina', 620, 280,
		"We’ve tried other au pair programs before. We chose AuPairCare because of the reliable, consistent care and the outstanding support from our local Area Director for both us and our au pair.",
		"../images/jpeg.jpg",
		{'screenHeight': automation.defaultSize.x} ),
	new Testimonial( 'The Bradenburg Family - Georgia', 585, 330,
		"We believe that a part of our family and our country will go home with our au pair Esena. We will always be bound by this shared experience and the love we all have for our kids.",
		"../images/jpeg.jpg",
		{'screenHeight': automation.defaultSize.x} ),
];

function distance( v1, v2 ) {
	return Math.sqrt( Math.pow( (v1.x - v2.x), 2) + Math.pow( (v1.y - v2.y), 2) );
}

function animate() {
	var thisTime = new Date().getTime();
	var timeDiff = thisTime - baseTime;
	
	/*
	 *	*** UPDATE ***
	 */
	c.drawImage( mapImg, 0, 0, canv.width, canv.height ); //draw map
	
	for( x = 0; x < testimonials.length; x++ ) {
		var t = testimonials[x];
	
		var dist = distance( automation.mouse, t );	// get proximity to this map point
		t.mouseDistance = dist;//console.log( x + " dist " + dist );
		if( dist <= t.strength ) {
			automation.displayNumber( x, testimonials[ x ] );
		//	console.log( "hovering over: " + t.name );
		}
	}
	
	automation.update( testimonials );
	
	/*
	 *	*** DRAW ***
	 */
	
	/**/
	// debug mouse position
	c.beginPath();
	c.arc( automation.mouse.x, automation.mouse.y, 10, 0, 2 * Math.PI, false );
	c.closePath();
	c.fillStyle = "#791234";
	c.fill();
	
	
	var activeT = 0;
	for( x = 0; x < testimonials.length; x++ ) { // draw testimonials
		var t = testimonials[ x ];
		t.draw( c );
		if( t.active ) {
			activeT = x;
		}
	}
	
	requestAnimationFrame( animate );
}