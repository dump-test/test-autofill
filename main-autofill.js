var mainAutofill = function mainAutofill() {
    const targetDeductionOption = "29";
    const actualCode = `
$(function() {
    var startDateTime = Date.now();

    var deductionListTitleComponent = $("h4.panel-title > a:contains('Deduction List')");

    var addDeductionControlComponent = $("div.col-sm-12 > div.col-sm-1 > a.btn.btn-default[href*='pensions/fli']");

    var actorNameLabelComponent = $(".form-container.table-container > .row.bor-bot:nth-child(2) .readonly_label");

    var actorName = actorNameLabelComponent.text().trim();

    if (actorNameLabelComponent.length > 0 && deductionListTitleComponent.length > 0) {
        var accountName = actorName;

        var fileKeyVoucher = accountName.replace(/[^A-Z]+/g, "_") + "_VOUCHER";

        var fileKeyAPD = accountName.replace(/[^A-Z]+/g, "_") + "_APD";

        Promise.all([
            fetch("http://localhost:7375/service/data/keys/pkbmpc/" + fileKeyVoucher),
            fetch("http://localhost:7375/service/data/keys/pkbmpc/" + fileKeyAPD),
        ])
        .then(function(responseList) {
            return Promise.all(responseList.map(async (response) => (await response.json())?.value ?? ""));
        })
        .then(function(fileList) {
            fileList.forEach(function(fileName) {
                console.log(fileName, "done");
            });

            console.log("file cache duration", ((Date.now() - startDateTime) / 1000) + "seconds");

            if (window.localStorage.getItem("target-actor") !== actorName && addDeductionControlComponent.length > 0) {
                addDeductionControlComponent[0].click();
                window.localStorage.setItem("target-actor", actorName);

            } else if (window.localStorage.getItem("target-actor") !== actorName) {
                console.log("localstorage actor", window.localStorage.getItem("target-actor"));
                console.log("actor", actorName);
                console.log("addDeductionControlComponent", addDeductionControlComponent);

                setTimeout(function() {
                    location.reload();
                });
            }
        });

        return;
    }

    var chosenSelectDeductionComponent = $("#field_deduction_code_chzn");

    var targetSelectDeductionComponent = $("select#field-deduction_code");

    var submitButtonComponent = $("button.btn.btn-default.btn-success.b10 #form-button-save[type=submit]");

    if (targetSelectDeductionComponent.length <= 0 && submitButtonComponent.length <= 0) return;

    if (chosenSelectDeductionComponent.length > 0 && targetSelectDeductionComponent.length > 0) {
        $("option[value='${targetDeductionOption}']", targetSelectDeductionComponent).attr("selected", "selected");

        targetSelectDeductionComponent.trigger("liszt:updated");
    }

    var selectInputFileComponent = $("select#fli_files_multiple_select");

    var accountNameLabelComponent = $(".form-container.table-container > .row.bor-bot:nth-child(2) .readonly_label");

    var uploadFileListComponent = $("div#fli_files_list_svc");

    var accountName = accountNameLabelComponent.text().trim();

    var fileKeyVoucher = accountName.replace(/[^A-Z]+/g, "_") + "_VOUCHER";

    var fileKeyAPD = accountName.replace(/[^A-Z]+/g, "_") + "_APD";

    if (selectInputFileComponent.children().length > 0) selectInputFileComponent.empty();

    if (uploadFileListComponent.children().length > 0) uploadFileListComponent.empty();

    (async function() {
        return Promise.all([
            fetch("http://localhost:7375/service/data/keys/pkbmpc/" + fileKeyVoucher),
            fetch("http://localhost:7375/service/data/keys/pkbmpc/" + fileKeyAPD),
        ])
        .then(function(responseList) {
            return Promise.all(responseList.map(async (response) => (await response.json())?.value ?? ""));
        })
        .then(function(fileList) {
            return fileList
                .filter(function(fileName) {
                    return ((/not[ ]*found/i).test(fileName) !== true);
                })
                .map(function(fileName) {
                    if ($("option[value='" + fileName + "']", selectInputFileComponent).length === 0) {
                        selectInputFileComponent.append($("<option value='" + fileName + "' selected='selected'>" + fileName + "</option>"));
                    }

                    return fileName;
                });
        });
    })()
    .then(function(fileList) {
        fileList.forEach(function(fileName) {
            console.log(fileName, "done");
        });

        console.log("form send duration", ((Date.now() - startDateTime) / 1000) + "seconds");

        submitButtonComponent.click();
    });
});
`;

    var script = document.createElement("script");
    script.textContent = actualCode;
    document.documentElement.appendChild(script);
    script.remove();
};

mainAutofill();
