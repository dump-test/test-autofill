"use strict";

const main = (
	async	function main( ){
				const util = require( "util" );

				const express = require( "express" );

				const PORT = 3030;

				const SERVICE = (
					express( )
				);

				SERVICE.use(
					(
						express.static( "./" )
					)
				);

				SERVICE.listen(
					(
						PORT
					),

					(
						( ) => {
							console.log(
								`test-autofill running at ${ PORT }`
							);
						}
					)
				);
			}
);

(
	await	(
				(
					async	function( ){
								await	main( );
							}
				)( )
			)
);
