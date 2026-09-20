var uploadAutofill = function uploadAutofill() {
    const actualCode = `
$(function() {
    var fileListCache = [];

    var intervalReference = setInterval(function() {
        var selectInputFileComponent = $("select#fli_files_multiple_select");

        if (selectInputFileComponent.length <= 0) return;
        if ($("option", selectInputFileComponent).length <= 0) return;

        const fileDataList = $("option", selectInputFileComponent).map(function() {
            var filePath = $(this).text().trim();

            if (typeof filePath == "string" && filePath.length <= 0) return;

            if (fileListCache.includes(filePath) === true) return;

            fileListCache.push(filePath);

            var fileKey = filePath.split(/_[0-9]/)[0];

            var fileName = filePath;

            return [fileKey, fileName];
        }).get().filter((fileData) => !!fileData)

        if (fileDataList.length <= 0) return;

        Promise.all(fileDataList.map(([fileKey, fileName]) => (async function() {
            var startKeyListLength = (await (await fetch("http://localhost:7375/service/data/keys/pkbmpc/count")).json())?.count ?? 0;

            var pushStatus = (await (await fetch("http://localhost:7375/service/data/keys/pkbmpc/" + fileKey, {
                    "body": JSON.stringify({ value: fileName }),
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    "method": "POST",
                }
            )).text());

            var nextKeyListLength = (await (await fetch("http://localhost:7375/service/data/keys/pkbmpc/count")).json())?.count ?? 0;

            console.log(fileKey, fileName, nextKeyListLength > startKeyListLength, pushStatus || "done");
        }));
    });
});
`;

    var script = document.createElement("script");
    script.textContent = actualCode;
    document.documentElement.appendChild(script);
    script.remove();
};

uploadAutofill();
