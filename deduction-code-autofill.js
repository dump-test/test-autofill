var deductionAutofill = function deductionAutofill() {
	const targetOption = "29";

	const actualCode = `
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
						$( "option[value='${targetOption}']", targetSelectComponent )
						.attr( "selected", "selected" );

						targetSelectComponent.trigger( "liszt:updated" );
					}
				}
			);
			`;

	document.documentElement.setAttribute("onreset", actualCode);
	document.documentElement.dispatchEvent(new CustomEvent("reset"));
	document.documentElement.removeAttribute("onreset");
};

/**
 * If this does not work use the injectJquery but you need the injectJquery plugin.
 *
 * For this to work properly you have the following option,
 * 1. Install an automatic jQuery injection plugin for this to work.
 * 2. jQuery must be installed on the target site.
 */
deductionAutofill();

/**
 * This will only work if injectJquery plugin is installed.
 */
// injectJquery().then(deductionAutofill);
