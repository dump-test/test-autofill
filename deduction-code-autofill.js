injectJquery( )
.then(
	function( ){
		const targetOption = (
			"29"
		);

		const actualCode = (
			`
			$(
				function( ){
					var chosenSelectComponent = (
						$( "#field_deduction_code_chzn" )
					);

					var targetSelectComponent = (
						$( "select#field-deduction_code" )
					);

					if(
							(
									chosenSelectComponent
									.length
								>	0
							)
						&&
							(
									targetSelectComponent
									.length
								>	0
							)
					){
						$( "option[value='${ targetOption }']", targetSelectComponent )
						.attr( "selected", "selected" );

						targetSelectComponent.trigger( "liszt:updated" );
					}
				}
			);
			`
		);

		document.documentElement.setAttribute( "onreset", actualCode );
		document.documentElement.dispatchEvent( new CustomEvent( "reset" ) );
		document.documentElement.removeAttribute( "onreset" );
	}
);
