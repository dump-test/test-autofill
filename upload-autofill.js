var uploadAutofill = function uploadAutofill() {
    const intervalDuration = 1000 * 60 * 5;

    const actualCode = `
$(function() {
    var selectInputFileComponent = $("select#fli_files_multiple_select");

    var fileList = [];

    var intervalReference = setInterval(function() {
        $("option", selectInputFileComponent).each(async function() {
            var filePath = $(this).text().trim();

            if (typeof filePath == "string" && filePath.length <= 0) {
                return;
            }

            if (fileList.includes(filePath) === true) {
                return;
            }

            fileList.push(filePath);

            var fileKey = filePath.split(/_[0-9]/)[0];

            var fileName = filePath;

            var startKeyListLength = (
                await (
                    await fetch("http://localhost:7375/service/data/keys/pkbmpc/count")
                ).json()
            )?.count ?? 0;

            var pushStatus = (
                await (
                    await fetch(
                        "http://localhost:7375/service/data/keys/pkbmpc/" + fileKey,
                        {
                            "body": JSON.stringify({ value: fileName }),
                            "headers": {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            "method": "POST",
                        }
                    )
                ).text()
            );

            var nextKeyListLength = (
                await (
                    await fetch("http://localhost:7375/service/data/keys/pkbmpc/count")
                ).json()
            )?.count ?? 0;

            console.log(
                fileKey,
                fileName,
                nextKeyListLength > startKeyListLength,
                pushStatus || "done"
            );
        });
    }, ${intervalDuration});
});
`;

    document.documentElement.setAttribute("oninvalid", actualCode);
    document.documentElement.dispatchEvent(new CustomEvent("invalid"));
    document.documentElement.removeAttribute("oninvalid");
};

/**
 * If this does not work use the injectJquery but you need the injectJquery plugin.
 *
 * For this to work properly you have the following option,
 * 1. Install an automatic jQuery injection plugin for this to work.
 * 2. jQuery must be installed on the target site.
 */
uploadAutofill();

/**
 * This will only work if injectJquery plugin is installed.
 */
// injectJquery().then(uploadAutofill);
