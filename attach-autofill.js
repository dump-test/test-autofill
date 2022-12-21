injectJquery( )
.then(
	function( ){
		const targetKVDBBucket = (
			"AKqecytVsXASjZrSyXK6G5"
		);

		const accessToken = (
			btoa( `${ targetKVDBBucket }:` )
		);

		const actualCode = (
			`
			$(
				function( ){
					(
						async	function( ){
									var selectInputFileComponent = (
										$( "select#fli_files_multiple_select" )
									);

									var accountNameLabelComponent = (
										$( ".form-container.table-container > .row.bor-bot:nth-child(2) .readonly_label" )
									);

									var accountName = (
										accountNameLabelComponent.text( ).trim( )
									);

									var fileKeyVoucher = (
										accountName.replace( /[^A-Z]+/g, "_" ) + "_VOUCHER"
									);

									var fileKeyAPD = (
										accountName.replace( /[^A-Z]+/g, "_" ) + "_APD"
									);

									var voucherFileName = (
											(
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
											)
										||
											(
												""
											)
									);

									var APDFileName = (
											(
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
											)
										||
											(
												""
											)
									);

									if(
											(
													voucherFileName
													.length
												>	0
											)
									){
										selectInputFileComponent.append(
											$( "<option value='" + voucherFileName + "' selected='selected'>" + voucherFileName + "</option>" )
										);
									}

									if(
											(
													APDFileName
													.length
												>	0
											)
									){
										selectInputFileComponent.append(
											$( "<option value='" + APDFileName + "' selected='selected'>" + APDFileName + "</option>" )
										);
									}

									return	(
												{
													"voucherFileName": voucherFileName,
													"APDFileName": APDFileName
												}
											);
								}
					)( )
					.then(
						function( attachData ){
							console.log(
								(
									attachData.voucherFileName
								),

								(
									attachData.APDFileName
								),

								(
									"done"
								)
							);
						}
					);
				}
			);
			`
		);

		document.documentElement.setAttribute( "oninvalid", actualCode );
		document.documentElement.dispatchEvent( new CustomEvent( "invalid" ) );
		document.documentElement.removeAttribute( "oninvalid" );
	}
);
