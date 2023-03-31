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

					/*
					var targetActorLastNameComponent = (
						$( "table.groceryCrudTable > tbody > tr > td:nth-child( 1 )" )
					);

					var targetActorFirstNameComponent = (
						$( "table.groceryCrudTable > tbody > tr > td:nth-child( 2 )" )
					);

					var targetActorMiddleNameComponent = (
						$( "table.groceryCrudTable > tbody > tr > td:nth-child( 3 )" )
					);
					*/

					var deductionListTitleComponent = (
						$( "h4.panel-title > a:contains('Deduction List')" )
					);

					var addDeductionControlComponent = (
						$( "div.col-sm-12 > div.col-sm-1 > a.btn.btn-default[href*='pensions/fli']" )
					);

					var actorNameLabelComponent = (
						$( ".form-container.table-container > .row.bor-bot:nth-child(2) .readonly_label" )
					);

					var actorName = (
						actorNameLabelComponent.text( ).trim( )
					);

					if(
						/*
							(
									targetActorLastNameComponent
									.length
								>	0
							)
						&&
							(
									targetActorFirstNameComponent
									.length
								>	0
							)
						&&
							(
									targetActorMiddleNameComponent
									.length
								>	0
							)
						*/

							(
									actorNameLabelComponent
									.length
								>	0
							)
						&&
							(
									deductionListTitleComponent
									.length
								>	0
							)
					){
						var accountName = (
							/*
							[
								targetActorLastNameComponent.text( ).trim( ),
								targetActorFirstNameComponent.text( ).trim( ),
								targetActorMiddleNameComponent.text( ).trim( ),
							]
							.join( "," )
							*/

							actorName
						);

						var fileKeyVoucher = (
							accountName.replace( /[^A-Z]+/g, "_" ) + "_VOUCHER"
						);

						var fileKeyAPD = (
							accountName.replace( /[^A-Z]+/g, "_" ) + "_APD"
						);

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
										"file cache duration"
									),

									(
											(
												Date.now( ) - startDateTime
											)
										/	1000
									) + "seconds"
								);

								if(
										(
												window.localStorage.getItem( "target-actor" )
											!==	actorName
										)
									&&
										(
												addDeductionControlComponent
												.length
											>	0
										)
								){
									addDeductionControlComponent[ 0 ].click( );

									window.localStorage.setItem( "target-actor", actorName );
								}
							}
						);

						return;
					}

					/*
					var actorNameLabelComponent = (
						$( ".form-container.table-container > .row.bor-bot:nth-child(2) .readonly_label" )
					);

					var addDeductionControlComponent = (
						$( "div.col-sm-12 > div.col-sm-1 > a.btn.btn-default[href*='pensions/fli']" )
					);

					var actorName = (
						actorNameLabelComponent.text( ).trim( )
					);

					if(
							(
									actorNameLabelComponent
									.length
								>	0
							)
						&&
							(
									addDeductionControlComponent
									.length
								>	0
							)
					){
						if(
								window.localStorage.getItem( "target-actor" )
							!==	actorName
						){
							addDeductionControlComponent[ 0 ].click( );

							window.localStorage.setItem( "target-actor", actorName );
						}

						return;
					}
					*/

					var chosenSelectDeductionComponent = (
						$( "#field_deduction_code_chzn" )
					);

					var targetSelectDeductionComponent = (
						$( "select#field-deduction_code" )
					);

					var submitButtonComponent = (
						$( "button.btn.btn-default.btn-success.b10#form-button-save[type=submit]" )
					);

					if(
							(
									targetSelectDeductionComponent
									.length
								<=	0
							)
						&&
							(
									submitButtonComponent
									.length
								<=	0
							)
					){
						return;
					}

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
																								"option[value='" + fileName + "']",
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
									"form send duration"
								),

								(
										(
											Date.now( ) - startDateTime
										)
									/	1000
								) + "seconds"
							);

							submitButtonComponent.click( );
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
