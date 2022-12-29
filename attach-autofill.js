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

									var uploadFileListComponent = (
										$( "div#fli_files_list_svc" )
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

									if(
											(
													selectInputFileComponent
													.children( ).length
												>	0
											)
									){
										selectInputFileComponent.empty( );
									}

									if(
											(
													uploadFileListComponent
													.children( ).length
												>	0
											)
									){
										uploadFileListComponent.empty( );
									}

									return	(
												Promise.all(
													[
														(
															fetch(
																(
																	"https://kvdb.io/${ targetKVDBBucket }/" + fileKeyVoucher
																),

																(
																	{
																		"headers": (
																			{
																				Authorization: "Basic ${ accessToken }",
																			}
																		),
																	}
																)
															)
														),

														(
															fetch(
																(
																	"https://kvdb.io/${ targetKVDBBucket }/" + fileKeyAPD
																),

																(
																	{
																		"headers": (
																			{
																				Authorization: "Basic ${ accessToken }",
																			}
																		),
																	}
																)
															)
														)
													]
												)
												.then(
													function( responseList ){
														return	(
																	Promise.all(
																		(
																			responseList.map(
																				(
																					( response ) => (
																						response.text( )
																					)
																				)
																			)
																		)
																	)
																);
													}
												)
												.then(
													function( fileList ){
														return	(
																	fileList
																	.filter(
																		function( fileName ){
																			return	(
																							(
																									( /not[ ]*found/i )
																									.test( fileName )
																								!==	true
																							)
																					);
																		}
																	)
																	.map(
																		function( fileName ){
																			selectInputFileComponent.append(
																				$(
																						"<option value='"
																					+	fileName
																					+	"' selected='selected'>"
																					+	fileName
																					+	"</option>"
																				)
																			);

																			/*
																			uploadFileListComponent.append(
																				$( "<div>" + fileName + "</div>" )
																			);
																			*/

																			return	(
																						fileName
																					);
																		}
																	)
																);

													}
												)
											);
								}
					)( )
					.then(
						function( fileList ){
							fileList.forEach(
								function( fileName ){
									console.log(
										(
											fileName
										),

										(
											"done"
										)
									);
								}
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
