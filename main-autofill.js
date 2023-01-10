injectJquery( )
.then(
	function( ){
		const targetDeductionOption = (
			"29"
		);

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
					var startDateTime = (
						Date.now( )
					);

					var chosenSelectDeductionComponent = (
						$( "#field_deduction_code_chzn" )
					);

					var targetSelectDeductionComponent = (
						$( "select#field-deduction_code" )
					);

					if(
							(
									chosenSelectDeductionComponent
									.length
								>	0
							)
						&&
							(
									targetSelectDeductionComponent
									.length
								>	0
							)
					){
						$( "option[value='${ targetDeductionOption }']", targetSelectDeductionComponent )
						.attr( "selected", "selected" );

						targetSelectDeductionComponent.trigger( "liszt:updated" );
					}

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

					(
						async	function( ){
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
																			if(
																					(
																							$(
																								"option[value=" + fileName + "]",
																								selectInputFileComponent
																							)
																							.length
																						===	0
																					)
																			){
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
																			}

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

							console.log(
								(
									"duration"
								),

								(
										(
											Date.now( ) - startDateTime
										)
									/	1000
								) + "seconds"
							);

							var submitButtonComponent = (
								$( "button.btn.btn-default.btn-success.b10#form-submit" )
							);

							var yesButtonComponent = (
								$( "a.btn.btn-xs.btn-primary[data-apply=confirmation]" )
							);

							submitButtonComponent
							.click(
								function( ){
									yesButtonComponent.click( );
								}
							);

							submitButtonComponent.click( );

							/*;
							var submitButtonComponent = (
								$( "button.btn.btn-default.btn-success.b10#form-button-save[type=submit]" )
							);

							submitButtonComponent.click( );
							*/
						}
					);
				}
			);
			`
		);

		document.documentElement.setAttribute( "onreset", actualCode );
		document.documentElement.dispatchEvent( new CustomEvent( "reset" ) );
		document.documentElement.removeAttribute( "onreset" );
	}
);
