/* ========================== */
/* ==== HELPER FUNCTIONS ==== */

function validatedata($attr, $defaultValue) {
    if ($attr !== undefined) {
        return $attr
    }
    return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
    if (str == 'true') {
        return true;
    }
    return $defaultValue;
    //return /true/i.test(str);
}

/* -------------------------------------------------------------------------
 FORM ELEMENTS
 ------------------------------------------------------------------------- */

// CHEKCBOX INPUT
$.fn.uouCheckboxInput = function(){

    var self = $(this),
        input = self.find( 'input' );



    // INITIAL STATE
    if ( input.is( ':checked' ) ) {
        self.addClass( 'active' );
    }
    else {
        self.removeClass( 'active' );
    }

    // CHANGE STATE
    input.change(function(){
        if ( input.is( ':checked' ) ) {
            self.addClass( 'active' );
        }
        else {
            self.removeClass( 'active' );
        }
    });

};

// RADIO INPUT
$.fn.uouRadioInput = function(){

    var self = $(this),
        input = self.find( 'input' ),
        group = input.attr( 'name' );

    // INITIAL STATE
    if ( input.is( ':checked' ) ) {
        self.addClass( 'active' );
    }

    // CHANGE STATE
    input.change(function(){
        if ( group ) {
            $( '.radio-input input[name="' + group + '"]' ).parent().removeClass( 'active' );
        }
        if ( input.is( ':checked' ) ) {
            self.addClass( 'active' );
        }
    });

};

// SELECT BOX
$.fn.uouSelectBox = function(){

    var self = $(this),
        select = self.find( 'select' );
    self.prepend( '<ul class="select-clone custom-list"></ul>' );

    var placeholder = select.data( 'placeholder' ) ? select.data( 'placeholder' ) : select.find( 'option:eq(0)' ).text(),
        clone = self.find( '.select-clone' );
    self.prepend( '<input class="value-holder" type="text" disabled="disabled" placeholder="' + placeholder + '"><i class="fa fa-chevron-down"></i>' );
    var value_holder = self.find( '.value-holder' );

    // INPUT PLACEHOLDER FIX FOR IE
    if ( $.fn.placeholder ) {
        self.find( 'input, textarea' ).placeholder();
    }

    // CREATE CLONE LIST
    select.find( 'option' ).each(function(){
        if ( $(this).attr( 'value' ) ){
            clone.append( '<li data-value="' + $(this).val() + '">' + $(this).text() + '</li>' );
        }
    });

    // TOGGLE LIST
    self.click(function(){
        var media_query_breakpoint = uouMediaQueryBreakpoint();
        if ( media_query_breakpoint > 991 ) {
            clone.slideDown(100);
            self.toggleClass( 'active' );
        }
    });

    // CLICK
    clone.find( 'li' ).click(function(){

        value_holder.val( $(this).text() );
		
		typeFilter = select[0]['attributes'][1]['nodeValue'];
		$("#"+typeFilter).children().removeAttr("selected");
        select.find( 'option[value="' + $(this).attr( 'data-value' ) + '"]' ).attr('selected', 'selected');
		changeFilter(select[0]['attributes'][1]['nodeValue'],$("#"+typeFilter+" :selected").val());
        // IF LIST OF LINKS
        if ( self.hasClass( 'links' ) ) {
            window.location.href = select.val();
        }

    });

    // HIDE LIST
    $(document).on('click', function(){
        clone.slideUp(100);
    });

    // LIST OF LINKS
    if ( self.hasClass( 'links' ) ) {
        select.change( function(){
            window.location.href = select.val();
        });
    }

};

/* -------------------------------------------------------------------------
 MEDIA QUERY BREAKPOINT
 ------------------------------------------------------------------------- */

var uouMediaQueryBreakpoint = function() {

    if ( $( '#media-query-breakpoint' ).length < 1 ) {
        $( 'body' ).append( '<var id="media-query-breakpoint"><span></span></var>' );
    }
    var value = $( '#media-query-breakpoint' ).css( 'content' );
    if ( typeof value !== 'undefined' ) {
        value = value.replace( "\"", "" ).replace( "\"", "" ).replace( "\'", "" ).replace( "\'", "" );
        if ( isNaN( parseInt( value, 10 ) ) ){
            $( '#media-query-breakpoint span' ).each(function(){
                value = window.getComputedStyle( this, ':before' ).content;
            });
            value = value.replace( "\"", "" ).replace( "\"", "" ).replace( "\'", "" ).replace( "\'", "" );
        }
        if(isNaN(parseInt(value,10))){
            value = 1199;
        }
    }
    else {
        value = 1199;
    }
    return value;

};

/* -------------------------------------------------------------------------
 RANGE SLIDER
 ------------------------------------------------------------------------- */

jQuery(function() {
    jQuery( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500000,
        values: [ 90000, 400000 ],
        slide: function( event, ui ) {
            jQuery( "#amount-min" ).val( "$ " + ui.values[ 0 ]);
            jQuery( "#amount-max" ).val( "$ " + ui.values[ 1 ]);
        }
    });
    jQuery( "#amount-min" ).val( "$ " + jQuery( "#slider-range" ).slider( "values", 0 ) );
    jQuery( "#amount-max" ).val( "$ " + jQuery( "#slider-range" ).slider( "values", 1 ) );
});

jQuery(function() {
    jQuery( "#slider-range-map" ).slider({
        range: true,
        min: 0,
        max: 500000,
        values: [ 90000, 400000 ],
        slide: function( event, ui ) {
            jQuery( "#amount-min-map" ).val( "$ " + ui.values[ 0 ]);
            jQuery( "#amount-max-map" ).val( "$ " + ui.values[ 1 ]);
        }
    });
    jQuery( "#amount-min-map" ).val( "$ " + jQuery( "#slider-range-map" ).slider( "values", 0 ) );
    jQuery( "#amount-max-map" ).val( "$ " + jQuery( "#slider-range-map" ).slider( "values", 1 ) );
});


/* ============================================= */
/* ==== GOOGLE MAP - Asynchronous Loading  ==== */

function initmap() {
    "use strict";
    jQuery('.googleMap').each(function () {
        var atcenter = "";
        var $this = jQuery(this);
        var location = $this.data("location");

        var offset = -30;

        if (validatedata($this.data("offset"))) {
            offset = $this.data("offset");
        }

        if (validatedata(location)) {

            $this.gmap3({
                marker: {
                    //latLng: [40.616439, -74.035540],
                    address: location,
                    options: {
                        visible: false
                    },
                    callback: function (marker) {
                        atcenter = marker.getPosition();
                    }
                },
                map: {
                    options: {
                        //maxZoom:11,
                        zoom: 18,
                        mapTypeId: google.maps.MapTypeId.SATELLITE,
                        // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                        scrollwheel: false,
                        disableDoubleClickZoom: false,
                        //disableDefaultUI: true,
                        mapTypeControlOptions: {
                            //mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
                            //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            //position: google.maps.ControlPosition.RIGHT_CENTER
                            mapTypeIds: []
                        }
                    },
                    events: {
                        idle: function () {
                            if (!$this.data('idle')) {
                                $this.gmap3('get').panBy(0, offset);
                                $this.data('idle', true);
                            }
                        }
                    }
                },
                overlay: {
                    //latLng: [40.616439, -74.035540],
                    address: location,
                    options: {
                        content: '<div class="customMarker"><div class="address">' + location + '</div><div class="marker"><img src="assets/images/custom-marker.png"></div></div>',
                        offset: {
                            y: -100,
                            x: -25
                        }
                    }
                }
                //},"autofit"
            });

            // center on resize
            google.maps.event.addDomListener(window, "resize", function () {
                //var userLocation = new google.maps.LatLng(53.8018,-1.553);
                setTimeout(function () {
                    $this.gmap3('get').setCenter(atcenter);
                    $this.gmap3('get').panBy(0, offset);
                }, 400);

            });

            // set height
            $this.css("min-height", $this.data("height") + "px");
        }

    }),

    jQuery('.googleMapGroup').each(function () {
        var $this = jQuery(this);
        var $display_desc = validatedata(parseBoolean($this.attr("data-display-desc")), false);

        if($display_desc == false){
            $this.gmap3({
                map:{
                    options:{
                        center:[40.742803, -74.002424],
                        zoom: 14,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                        // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                    }
                },
                marker:{
                    values: [
                        {
                            address:"301 w 4th Street, New York",
                            options:{
                                icon: "assets/images/markerhouse.png"
                            }
                        },
                        {
                            address:"128 7th Ave S, New York",
                            options:{
                                icon: "assets/images/markerhouse.png"
                            }
                        },
                        {
                            address:"Eve 55 W 8th St, New York",
                            options:{
                                icon: "assets/images/markerflat.png"
                            }
                        },
                        {
                            address:"21 W 16th St New York",
                            options:{
                                icon: "assets/images/markerhouse.png"
                            }
                        },
                        {
                            address:"Washington Square Fountain, New York",
                            options:{
                                icon: "assets/images/markermonument.png"
                            }
                        },
                        {
                            address:"Pinkberry - Chelsea 170 8th Ave, New York",
                            options:{
                                icon: "assets/images/markerflat.png"
                            }
                        },
                        {
                            address:"8 Charles Ln New York",
                            options:{
                                icon: "assets/images/markervivenda.png"
                            }
                        },
                        {
                            address:"74 Green St Brooklyn",
                            options:{
                                icon: "assets/images/markervivenda.png"
                            }
                        },

                        {
                            address:"321 w 4th Street, New York",
                            options:{
                                icon: "assets/images/markerhouse.png"
                            }
                        }
                    ],
                    cluster:{
                        radius: 20,
                        0: {
                            content: "<div class='markerCluster'>CLUSTER_COUNT</div>",
                            width: 53,
                            height: 52
                        },
                        2: {
                            content: "<div class='markerCluster'>CLUSTER_COUNT</div>",
                            width: 56,
                            height: 55
                        },
                        50: {
                            content: "<div class='markerCluster'>CLUSTER_COUNT</div>",
                            width: 66,
                            height: 65
                        }
                    }
                }
            })
        } else{

        $this.gmap3({
            map:{
                options:{
                    center:[40.742803, -74.002424],
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                    // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                }
            },
            marker:{
                values: [
                    {
                        address:"301 w 4th Street, New York",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing2.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4>Gatineau Hills<br><small>Canada, Quebec</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markerhouse.png"
                        }
                    },
                    {
                        address:"128 7th Ave S, New York",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing8.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4>Miss Valley Residence<br><small>California, USA</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markerhouse.png"
                        }
                    },
                    {
                        address:"Eve 55 W 8th St, New York",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing10.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4>The Fabulous Bird House<br><small>Mallorca, Spain</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markerflat.png"
                        }
                    },
                    {
                        address:"21 W 16th St New York",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing11.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4 class='uppercase'>Miss Valley Residence<br><small>California, USA</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markerhouse.png"
                        }
                    },
                    {
                        address:"Washington Square Fountain, New York",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing9.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4 class='uppercase'>Villa Overby<br><small>Stockholm, Sweden</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markermonument.png"
                        }
                    },
                    {
                        address:"Pinkberry - Chelsea 170 8th Ave, New York",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing1.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4 class='uppercase'>Gatineau Hills<br><small>Canada, Quebec</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markerflat.png"
                        }
                    },
                    {
                        address:"8 Charles Ln New York",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing5.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4 class='uppercase'>Ross Residence<br><small>California, USA</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markervivenda.png"
                        }
                    },
                    {
                        address:"74 Green St Brooklyn",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing1.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4 class='uppercase'>Gatineau Hills<br><small>Canada, Quebec</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markervivenda.png"
                        }
                    },

                    {
                        address:"321 w 4th Street, New York",
                        data: "<div class='media'>" +
                            "<a class='pull-left' href='#'>" +
                            "<img width='60' height='60' class='media-object' src='assets/images/demo-content/listing6.jpg' alt=''>" +
                            "</a>" +
                            "<div class='media-body'>" +
                            "<h4 class='uppercase'>Castlecrag Residence<br><small>Castlecrag, Australia</small></h4>" +
                            "</div>" +
                            "</div>" +
                            "<hr>" +
                            "<ul class='property-tags'>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><strong>Type:</strong> Villa</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='fa fa-home'></i> 546 sqm</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-shower'></i> 5</span></li>" +
                            "<li><span data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip'><i class='icon-bed'></i> 3</span></li>" +
                            "</ul>" +
                            "<hr>" +
                            "<div class='table'><div class='table-cell'><span class='price-tag inline important'><strong>$1.450.000</strong></span></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Show Details</a></div>" +
                            "<div class='table-cell'><a href='#' class='btn btn-link inline' role='button'>+ Contact Agent</a></div></div>",
                        options:{
                            icon: "assets/images/markerhouse.png"
                        }
                    }
                ],
                cluster:{
                    radius: 20,
                    0: {
                        content: "<div class='markerCluster'>CLUSTER_COUNT</div>",
                        width: 53,
                        height: 52
                    },
                    2: {
                        content: "<div class='markerCluster'>CLUSTER_COUNT</div>",
                        width: 56,
                        height: 55
                    },
                    50: {
                        content: "<div class='markerCluster'>CLUSTER_COUNT</div>",
                        width: 66,
                        height: 65
                    }
                },
                options:{
                    draggable: false
                },
                events:{
                    mouseover: function(marker, event, context){
                        var map = $(this).gmap3("get"),
                            infowindow = $(this).gmap3({get:{name:"infowindow"}});
                        if (infowindow){
                            infowindow.open(map, marker);
                            infowindow.setContent(context.data);
                        } else {
                            $(this).gmap3({
                                infowindow:{
                                    anchor:marker,
                                    options:{content: context.data}
                                }
                            });
                        }
                    }
                }
            }
        })};
        // set height
        $this.css("min-height", $this.data("height") + "px");
    })
}

function loadScript() {
    "use strict";
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initmap';
    document.body.appendChild(script);
}


if ($(".googleMap").length > 0) {
    window.onload = loadScript;
}

jQuery(document).ready(function() {

    transition_timeout = 40;

    $('.title_items').click(function() {

        current = $(this).next().find('li');

        $(this).toggleClass('active');
        current.toggleClass('visible');

        if ($(this).hasClass('active')) {
            for( i = 0; i <= current.length; i++ ) {
                $(current[i]).css('transition-delay', transition_timeout * i + 'ms');
            }
        }
        else {
            for( i = current.length, j = -1; i >= 0; i--, j++) {
                $(current[i]).css('transition-delay', transition_timeout * j + 'ms');
            }
        }

    });

    /* ===================== */
    /* ==== TIMELINE JS ==== */

    if ($("#timeline-embed").length > 0) {

        createStoryJS({
            width: '100%',
            height: '600',
            source: 'assets/js/timeline/source/timeline.json',
            embed_id: 'timeline-embed',               //OPTIONAL USE A DIFFERENT DIV ID FOR EMBED
            start_at_end: false,                          //OPTIONAL START AT LATEST DATE
            start_at_slide: '2',                            //OPTIONAL START AT SPECIFIC SLIDE
            start_zoom_adjust: '2',                            //OPTIONAL TWEAK THE DEFAULT ZOOM LEVEL
            hash_bookmark: false,                           //OPTIONAL LOCATION BAR HASHES
            debug: false,                           //OPTIONAL DEBUG TO CONSOLE
            lang: 'en',                           //OPTIONAL LANGUAGE
            maptype: 'HYBRID',                   //OPTIONAL MAP STYLE
            css: 'assets/js/timeline/css/timeline.css',     //OPTIONAL PATH TO CSS
            js: 'assets/js/timeline/js/timeline-min.js'    //OPTIONAL PATH TO JS
        });
    }

    /* =================== */
    /* ==== LOGO LOAD ==== */

    jQuery(".navbar-logo .logo").each(function (){
        var $this = jQuery(this);
        $this.css({
            "height": $this.data("height")+"px",
            "background-color": "#ffffff",
            "background-position": "center center",
            "background-repeat": "no-repeat",
            "background-image": 'url(' + $this.data("bg") + ')'
        });
    })

    // Javascript to enable link to tab
    var url = document.location.toString();
    if (url.match('06-shortcodes.html#')) {
        jQuery('.nav-faq a[href=#'+url.split('06-shortcodes.html#')[1]+']').tab('show') ;
    }

// Change hash for page-reload
    $('.nav-faq a').on('shown', function (e) {
        window.location.hash = e.target.hash;
    })

    /* ======================== */
    /* ==== SIDEBAR TOGGLE ==== */

    if(!jQuery(".sidebar").length > 0){
        jQuery(".toggle-sidebar").addClass("hidden");
    }

    jQuery(".toggle-sidebar").click(function (){
        jQuery(".sidebar").toggleClass("show-sidebar");
        jQuery(".sidebar-top-small").toggleClass("show-sidebar");
    })

    /* ======================================= */
    /* === CLICKABLE MAIN PARENT ITEM MENU === */
    jQuery(".navbar li.dropdown > .dropdown-toggle").removeAttr("data-toggle data-target");

    /* ================== */
    /* ==== TOOLTIPS ==== */

    jQuery("[data-toggle='tooltip']").tooltip();

    /* ======================= */
    /* ==== FORM ELEMENTS ==== */
    $( '.checkbox-input' ).each(function(){
        $(this).uouCheckboxInput();
    });
    $( '.radio-input' ).each(function(){
        $(this).uouRadioInput();
    });


    $('.select-box').click(function(event){
        var clone = $('.select-box').find( '.select-clone' );
        if (!$(this).hasClass('active')) {
            event.stopPropagation();
            clone.slideUp(100);
        }
    });
    $( '.select-box' ).each(function(){
        $(this).uouSelectBox({
            mobile: true
        });
    });

    /* ======================== */
    /* ==== ANIMATION INIT ==== */

    if ($().appear) {

        if ($.browser.mobile) {
            // disable animation on mobile
            $("body").removeClass("withAnimation");
        } else {

            $('.withAnimation .animated').appear(function () {
                var $this = $(this);
                $this.each(function () {
                    $this.addClass('activate');
                    $this.addClass($this.data('fx'));
                });
            }, {accX: 50, accY: -150});
        }
    }

    /* =================================== */
    /* ==== BUTTON SCROLL INSIDE PAGE ==== */


    $('.btn-scroll[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash, $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top -100
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });


    /* ======================= */
    /* ==== TO TOP BUTTON ==== */


    $('#toTop').click(function () {
        $("body,html").animate({scrollTop: 0}, 600);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $("#toTop").fadeIn(300);
        } else {
            $("#toTop").fadeOut(250);
        }
    });

    /* ====================================== */
    /* ==== FORCE PAGE TO TOP ON REFRESH ==== */

    jQuery(this).scrollTop(0);

    /* ============================ */
    /* ==== LOGO MENU BEHAVIOR ==== */

    if(!jQuery(".navbar").hasClass("no-animation")){
        var $body = jQuery('body');
        var $scroll_hide = jQuery('.scroll-hide');
        var $scroll_move = jQuery('.scroll-move');
        var $logo_small = jQuery('.logo-small');
        var $nav_brick = jQuery('.navbar-brick');
        var $logo = jQuery('.navbar-logo .logo');

        if($body.hasClass('withNavTop')){
            var $navtop = jQuery('.nav-top');
        }

        jQuery(window).scroll(function() {
            var height = jQuery(window).scrollTop();

            if(height  > 100) {
                $logo.css('height', '0px');
                $scroll_hide.addClass("invisible");
                $scroll_move.addClass("moved");
                $logo_small.removeClass("invisible");
                $nav_brick.addClass("small");

                if($body.hasClass('withNavTop')){
                    $navtop.addClass('applyscroll');
                    $nav_brick.addClass('applyscroll');
                }
            } else{
                $logo.css('height', '150px');
                $logo_small.addClass("invisible");
                $scroll_move.removeClass("moved");
                $scroll_hide.removeClass("invisible");
                $nav_brick.removeClass("small");

                if($body.hasClass('withNavTop')){
                    $navtop.removeClass('applyscroll');
                    $nav_brick.removeClass('applyscroll');
                }
            }
        });
    }

    /* ================================== */
    /* ==== SHOW AND HIDE CALCULATOR ==== */

    $content = jQuery("#slider1");
    $content.slideToggle();
    jQuery("#slider1-btn").click(function () {

        $btn= jQuery(this);
        //getting the next element
        $content = jQuery("#slider1");
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(500, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
                //change text based on condition
            if($content.is(":visible")){
                $btn.html("<i class='fa fa-th'></i> Collapse Calculator");
            } else{
                $btn.html("<i class='fa fa-th'></i> Loan Calculator");
            }
        });

    });

    /* ================== */
    /* ==== PARALLAX ==== */

    if(jQuery().parallax){
        if (!device.mobile() && !device.tablet()) {
            jQuery(".parallax").each(function () {
                jQuery(this).parallax("50%", 0.2);
            })
        }
    }
    jQuery(window).resize(function () {
        if (!device.mobile()) {
            setTimeout(function () {
                if(jQuery().parallax){
                    jQuery("#MainHeader").parallax("20%", 0.4, true);
                }
            }, 500);
        }
    });

    // add background position for parallax. fix for ipad and iphone
    if(!device.mobile() && !device.tablet()){
        jQuery('.parallax').css('background-attachment' , 'fixed');
    } else{
        jQuery('.parallax').css('background-attachment' , 'scroll');
    }

    /* ==================== */
    /* ==== PIE CHARTS ==== */
    var doughnutOneData = [
        {
            value: 40,
            color:"#7fbec7"
        },
        {
            value : 60,
            color : "#cce5e9"
        }
    ];

    var doughnutTwoData = [
        {
            value: 30,
            color:"#ed5c28"
        },
        {
            value : 70,
            color : "#f9bfaa"
        }
    ];

    var doughnutThreeData = [
        {
            value: 70,
            color:"#a8b913"
        },
        {
            value : 30,
            color : "#e1e7a5"
        }
    ];

    var doughnutFourData = [
        {
            value: 60,
            color:"#ffda00"
        },
        {
            value : 40,
            color : "#fff099"
        }
    ];

    if(jQuery().appear) {
        jQuery('.chart').appear(function () {
            respChart(jQuery("#doughnutOne"),doughnutOneData, null, "doughnut");
            respChart(jQuery("#doughnutTwo"),doughnutTwoData, null, "doughnut");
            respChart(jQuery("#doughnutThree"),doughnutThreeData, null, "doughnut");
            respChart(jQuery("#doughnutFour"),doughnutFourData, null, "doughnut");
        })
    } else{
        respChart(jQuery("#doughnutOne"),doughnutOneData, null, "doughnut");
        respChart(jQuery("#doughnutTwo"),doughnutTwoData, null, "doughnut");
        respChart(jQuery("#doughnutThree"),doughnutThreeData, null, "doughnut");
        respChart(jQuery("#doughnutFour"),doughnutFourData, null, "doughnut");
    }

    /* ====================== */
    /* ==== OTHER GRAPHS ==== */

    //Check documentation here: http://www.chartjs.org/

    var lineChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "rgba(25,66,83,0.7)",
                strokeColor : "rgba(25,66,83,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data : [65,59,90,81,56,55,40]
            },
            {
                fillColor : "rgba(232,78,27,0.7)",
                strokeColor : "rgba(232,78,27,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : [28,48,40,19,96,27,100]
            }
        ]
    }

    var barChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "rgba(25,66,83,0.7)",
                strokeColor : "rgba(25,66,83,1)",
                data : [65,59,90,81,56,55,40]
            },
            {
                fillColor : "rgba(232,78,27,0.7)",
                strokeColor : "rgba(232,78,27,1)",
                data : [28,48,40,19,96,27,100]
            }
        ]
    }

    var pieData = [
        {
            value: 30,
            color:"#F38630"
        },
        {
            value : 50,
            color : "#E0E4CC"
        },
        {
            value : 100,
            color : "#69D2E7"
        }
    ];

    var polarData = [
        {
            value : Math.random(),
            color: "#D97041"
        },
        {
            value : Math.random(),
            color: "#C7604C"
        },
        {
            value : Math.random(),
            color: "#21323D"
        },
        {
            value : Math.random(),
            color: "#9D9B7F"
        },
        {
            value : Math.random(),
            color: "#7D4F6D"
        },
        {
            value : Math.random(),
            color: "#584A5E"
        }
    ];

    var radarChartData = {
        labels : ["Eating","Drinking","Sleeping","Designing","Coding","Partying","Running"],
        datasets : [
            {
                fillColor : "rgba(25,66,83,0.7)",
                strokeColor : "rgba(25,66,83,1)",
                pointColor : "rgba(25,66,83,1)",
                pointStrokeColor : "#fff",
                data : [65,59,90,81,56,55,40]
            },
            {
                fillColor : "rgba(232,78,27,0.7)",
                strokeColor : "rgba(232,78,27,1)",
                pointColor : "rgba(232,78,27,1)",
                pointStrokeColor : "#fff",
                data : [28,48,40,19,96,27,100]
            }
        ]
    }

    if(jQuery().appear) {
        jQuery('.chart').appear(function () {
            respChart(jQuery("#lineChart"),lineChartData, null, "line");
            respChart(jQuery("#barChart"),barChartData, null, "bar");
            respChart(jQuery("#pieChart"),pieData, null, "pie");
            respChart(jQuery("#polarChart"),polarData, null, "polar");
            respChart(jQuery("#radarChart"),radarChartData, {scaleShowLabels : false, pointLabelFontSize : 10}, "radar");
        })
    } else{
        respChart(jQuery("#lineChart"),lineChartData, null, "line");
        respChart(jQuery("#barChart"),barChartData, null, "bar");
        respChart(jQuery("#pieChart"),pieData, null, "pie");
        respChart(jQuery("#polarChart"),polarData, null, "polar");
        respChart(jQuery("#radarChart"),radarChartData, {scaleShowLabels : false, pointLabelFontSize : 10}, "radar");
    }

    /* ====================== */
    /* ==== PROGRESS BAR ==== */

    if(jQuery().appear) {
        jQuery('.progress').appear(function () {
            var $this = jQuery(this);
            $this.each(function () {
                var $innerbar = $this.find(".progress-bar");
                var percentage = $innerbar.attr("data-percentage");
                $innerbar.addClass("animating").css("width", percentage + "%");

                $innerbar.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                    $innerbar.find(".pull-right").fadeIn(900);
                });

            });
        }, {accY: -100});
    }

    /* ==================== */
    /* ==== FIT VIDEOS ==== */

    if(jQuery().fitVids){
        jQuery('.fit-video').fitVids();
    }
});

jQuery(window).resize(function () {
    if(jQuery().parallax){
        if (!device.mobile() && !device.tablet()) {
            jQuery(".parallax").each(function () {
                setTimeout(function () {
                    jQuery(this).parallax("20%", 0.2);
                }, 500);
            })
        }
    }
});

jQuery(window).load(function () {

    if ((jQuery().flexslider())){
        /* ============================ */
        /* ==== FLEXSLIDER CONTENT ==== */

        jQuery(".flexslider .object").each(function (){
            var $this = jQuery(this);
            if($this.hasClass("absolute")){
                $this.css({
                    "top": $this.data("top"),
                    "bottom": $this.data("bottom"),
                    "left": $this.data("left"),
                    "right": $this.data("right")
                });
            } else {
                $this.css({
                    "margin-top": $this.data("top"),
                    "margin-bottom": $this.data("bottom"),
                    "margin-left": $this.data("left"),
                    "margin-right": $this.data("right")
                });
            }
        })

        /* ==================================== */
        /* ==== FLEXSLIDER SMALL BLOG POST ==== */

        if (jQuery(".flexslider.blog-small-slider").length > 0) {
            jQuery('.flexslider.blog-small-slider').each(function () {
                var $this = $(this);

                $this.flexslider({
                    animation: "slide",              //String: Select your animation type, "fade" or "slide"
                    animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                    easing: "swing",
                    smoothHeight: true,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                    touch: false,

                    // Primary Controls
                    controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)

                    pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                    prevText: " ",           //String: Set the text for the "previous" directionNav item
                    nextText: " ",
                    useCSS: false
                })
            });
        }

        /* ========================= */
        /* ==== FLEXSLIDER TEXT ==== */

        if (jQuery(".text-slider").length > 0) {
            jQuery('.text-slider').each(function () {
                var $this = $(this);
                $this.flexslider({
                    animation: "slide",              //String: Select your animation type, "fade" or "slide"
                    animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                    smoothHeight: true,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                    slideshow: true,                //Boolean: Animate slider automatically
                    touch: false,

                    // Primary Controls
                    controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)

                    pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                    prevText: " ",           //String: Set the text for the "previous" directionNav item
                    nextText: " ",
                    useCSS: true
                });
            })
        }

        /* ============================= */
        /* ==== FLEXSLIDER PARTNERS ==== */

        if (jQuery(".flexslider.partners").length > 0) {
            jQuery('.partners.flexslider').each(function () {
                var $this = $(this);
                var items = validatedata($this.attr('data-items'), 4);

                $this.flexslider({
                    animation: "slide",              //String: Select your animation type, "fade" or "slide"
                    animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                    controlNav: false,
                    animationLoop: true,
                    slideshow: true,
                    itemWidth: 138,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
                    itemMargin: 20,                  //{NEW} Integer: Margin between carousel items.
                    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
                    maxItems: items,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
                    move: 1,
                    // Primary Controls
                    controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
                    touch: false,

                    pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                    prevText: " ",           //String: Set the text for the "previous" directionNav item
                    nextText: " ",
                    useCSS: true
                });
            })
        }

        /* =============================== */
        /* ==== FLEXSLIDER WITH TITLE ==== */

        if (jQuery(".flexslider.title-slider").length > 0) {
            jQuery('.flexslider.title-slider').each(function () {
                var $this = $(this);

                var direction = validatedata($this.attr('data-direction'), "horizontal");
                var animation = validatedata($this.attr('data-animation'), "slide");
                var speed = validatedata($this.attr('data-speed'), 7000);
                var loop = validatedata(parseBoolean($this.attr("data-loop")), false);
                var smooth = validatedata(parseBoolean($this.attr("data-smooth")), false);
                var slideshow = validatedata(parseBoolean($this.attr("data-slideshow")), false);

                if($this.hasClass("circle-arrows")){
                    var container = "";
                }else{
                    var container = $this.children(".title");
                }

                $this.flexslider({
                    direction: direction,        //String: Select the sliding direction, "horizontal" or "vertical"
                    animation: animation,              //String: Select your animation type, "fade" or "slide"
                    animationLoop: loop,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                    smoothHeight: smooth,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                    slideshow: slideshow,                //Boolean: Animate slider automatically
                    slideshowSpeed: speed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
                    touch: false,

                    // Primary Controls
                    controlsContainer: container,          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
                    controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)

                    pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                    prevText: " ",           //String: Set the text for the "previous" directionNav item
                    nextText: " ",
                    useCSS: false
                })
            })
        }

        /* ================================ */
        /* ==== FLEXSLIDER WITH THUMBS ==== */


        if (jQuery(".flexslider.with-thumbs").length > 0) {
            jQuery('#thumbs-slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                touch: false,
                itemWidth: 80,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
                itemMargin: 45,                  //{NEW} Integer: Margin between carousel items.
                minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
                maxItems: 4,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
                prevText: " ",           //String: Set the text for the "previous" directionNav item
                nextText: " ",

                asNavFor: '#slider'
            });
            jQuery('#slider').flexslider({
                animation: "slide",              //String: Select your animation type, "fade" or "slide"
                animationLoop: false,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                smoothHeight: true,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                slideshow: false,                //Boolean: Animate slider automatically
                touch: false,
                // Primary Controls
                controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)

                pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                prevText: " ",           //String: Set the text for the "previous" directionNav item
                nextText: " ",
                useCSS: true,
                sync: "#thumbs-slider"
            });
        }

        /* ============================================================= */
        /* ==== FLEXSLIDER IN PROPERTY AND/OR INSIDE ANOTHER SLIDER ==== */

        if (jQuery(".flexslider.inner-slider").length > 0) {
            jQuery('.inner-slider.flexslider').flexslider({
                animation: "slide",              //String: Select your animation type, "fade" or "slide"
                animationLoop: false,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                smoothHeight: true,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                slideshow: true,                //Boolean: Animate slider automatically
                selector: ".slides-inner > li",
                // Primary Controls
                controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
                touch: false,

                pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                prevText: " ",           //String: Set the text for the "previous" directionNav item
                nextText: " ",
                useCSS: true,
            });
        }

        /* ==================================== */
        /* ==== FLEXSLIDER WITH ANIMATIONS ==== */



        if (jQuery(".flexslider.std-slider").length > 0) {

            jQuery('.flexslider.std-slider').each(function () {
                var $this = jQuery(this);

                var $slides = $this.find(".slides > li > *");
                var $map_element = null;
                var $map_search = $this.find(".search-block");
                $slides.each(function(i, $element){
                    //console.log($element.attr("class"));
                    if(jQuery(this).hasClass("property-map")){
                        $map_element = i;
                    }
                })

                $this.find(".slides > li .inner").each(function () {
                    var $container = jQuery(this);
                    $container.css('min-height', $this.attr('data-height') + "px");
                })
                // initialize
                $this.find(".slides > li").each(function () {
                    var $slide_item = $(this);
                    var bg = validatedata($slide_item.data('bg'), false);
                    if (bg) {
                        $slide_item.css('background-image', 'url("' + bg + '")');
                    }
                    $slide_item.css('min-height', $this.attr('data-height') + "px");

                    // hide slider content due to fade animation
                    //$slide_item.find(".inner").hide();
                    /*
                     $slide_item.find(".inner [data-fx]").each(function () {
                     $(this).removeClass("animated");
                     })
                     */
                    $slide_item.find('.inner').fadeOut("slow");
                })

                var direction = validatedata($this.attr('data-direction'), "horizontal");
                var animation = validatedata($this.attr('data-animation'), "fade");
                var loop = validatedata(parseBoolean($this.attr("data-loop")), false);
                var smooth = validatedata(parseBoolean($this.attr("data-smooth")), false);
                var slideshow = validatedata(parseBoolean($this.attr("data-slideshow")), false);
                var speed = validatedata(parseInt($this.attr('data-speed')), 7000);
                var animspeed = validatedata(parseInt($this.attr("data-animspeed")), 600);
                var controls = validatedata(parseBoolean($this.attr('data-controls')), false);
                var dircontrols = validatedata(parseBoolean($this.attr('data-dircontrols')), false);

                $this.flexslider({
                    direction: direction,        //String: Select the sliding direction, "horizontal" or "vertical"
                    animation: animation,              //String: Select your animation type, "fade" or "slide"
                    animationLoop: loop,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                    smoothHeight: smooth,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                    slideshow: slideshow,                //Boolean: Animate slider automatically
                    slideshowSpeed: speed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
                    animationSpeed: animspeed,            //Integer: Set the speed of animations, in milliseconds
                    touch: false,

                    // Primary Controls
                    controlNav: controls,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                    directionNav: dircontrols,             //Boolean: Create navigation for previous/next navigation? (true/false)
                    manualControls: ".flex-control-nav li",

                    pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                    prevText: " ",           //String: Set the text for the "previous" directionNav item
                    nextText: " ",
                    useCSS: false,

                    // Callback API
                    start: function (slider) {
                        $this.removeClass("loading-slider");

                        if($map_element != null){
                            if(slider.currentSlide != $map_element){
                                $map_search.addClass("hidden");
                            }
                        }

                        setTimeout(function () {
                            $this.find(".slides > li.flex-active-slide .inner").fadeIn("slow");
                        }, 650);
                    },
                    before: function () {
                        if($map_element != null){
                            $map_search.addClass("hidden");
                        }
                        $this.find(".slides > li .inner").fadeOut("slow");
                    },           //Callback: function(slider) - Fires asynchronously with each slider animation
                    after: function (slider) {
                        if($map_element != null){
                            if(slider.currentSlide == $map_element){
                                $map_search.removeClass("hidden");
                            }
                        }
                        setTimeout(function () {
                            $this.find(".slides > li.flex-active-slide .inner").fadeIn("slow");
                        }, 150);
                    },            //Callback: function(slider) - Fires after each slider animation completes
                    end: function () {
                    },              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
                    added: function () {
                    },            //{NEW} Callback: function(slider) - Fires after a slide is added
                    removed: function () {
                    }           //{NEW} Callback: function(slider) - Fires after a slide is removed
                });
            });
        }
    }
});
/* / window load */


