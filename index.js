"use strict";

const main = (
	async	function main( ){
				const util = require( "util" );

				const express = require( "express" );

				const PORT = process.env.PORT;

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

				return	(
							process.pid
						);
			}
);

(
	(
		async	function( ){
					const fs = require( "fs" );
					const fsAsync = fs.promises;

					await fsAsync.writeFile( "./node.pid", `${ await main( ) }` );
				}
	)( )
);
