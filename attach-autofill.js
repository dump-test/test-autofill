injectJquery( )
.then(
	function( ){
		const targetKVDBBucket = (
			"3AHWrTzx5SmanAw1CvJc5y"
		);

		const accessToken = (
			btoa( `${ targetKVDBBucket }:` )
		);

		const actualCode = (
			`
			$(
				function( ){

				}
			);
			`
		);

		document.documentElement.setAttribute( "oninvalid", actualCode );
		document.documentElement.dispatchEvent( new CustomEvent( "invalid" ) );
		document.documentElement.removeAttribute( "oninvalid" );
	}
);
