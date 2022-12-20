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
				async	function( ){
							var selectInputFileComponent = (
								$( "select#fli_files_multiple_select" )
							);

							var accountNameLabelComponent = (
								$( "" )
							);

							var accountName = (
								accountNameLabelComponent.text( ).trim( )
							);

							var fileKeyVoucher = (
								accountName.replace( /\W+/g, "_" ) + "_VOUCHER"
							);

							var fileKeyAPD = (
								accountName.replace( /\W+/g, "_" ) + "_APD"
							);

							var voucherFileName = (
								await	(
											await	fetch(
														"https://kvdb.io/${ targetKVDBBucket }/" + fileKeyVoucher,
														{
															"headers": (
																{
																	Authorization: "Basic ${ accessToken }",
																}
															),
														}
													)
										).text( )
							);

							var APDFileName = (
								await	(
											await	fetch(
														"https://kvdb.io/${ targetKVDBBucket }/" + fileKeyAPD,
														{
															"headers": (
																{
																	Authorization: "Basic ${ accessToken }",
																}
															),
														}
													)
										).text( )
							);

							selectInputFileComponent.append(
								$( "<option value='" + voucherFileName + "' selected='selected'>" + voucherFileName + "</option>" )
							);

							selectInputFileComponent.append(
								$( "<option value='" + APDFileName + "' selected='selected'>" + APDFileName + "</option>" )
							);
						}
			);
			`
		);

		document.documentElement.setAttribute( "onsearch", actualCode );
		document.documentElement.dispatchEvent( new CustomEvent( "search" ) );
		document.documentElement.removeAttribute( "onsearch" );
	}
);
