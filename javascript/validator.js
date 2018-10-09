"use strict";


/* we use sandbox, so all funcitons are here as local */
this.IV_Init = function (settings) {

    var Responses = [];
    /* our dependecies */
    var depScripts = [
        /* condidtion and url */

        /* jQuery */
        ['jQuery', 'https://code.jquery.com/jquery-3.2.1.min.js'],
        /* popper */
        ['Popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js'],
        /* bootstrap */
        ['$.fn.popover', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'],
        /* arrive */
        ['$.fn.arrive', 'https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js'],
        /* ripple */
        ['$.fn.ripples', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.9/js/ripples.js'],
        /* bootstrapMaterialDesign */
        ['$.fn.material', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.9/js/material.min.js'],
        /* snackbar */
        ['$.fn.snackbar', 'https://cdnjs.cloudflare.com/ajax/libs/snackbarjs/1.1.0/snackbar.min.js'],
        /* Clipboard */
        ['Clipboard', 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js'],
        /* moment */
        ['moment', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js'],
        /* History */
        ['ax5', 'https://cdn.rawgit.com/ax5ui/ax5core/master/dist/ax5core.min.js'],
        /* <!-- History --> */
        ['$.fn.datetimepicker', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js'],
        /* semantify api */
        ["SemantifyIt", "https://rawgit.com/semantifyit/semantify-api-js/master/semantify.js"]
        //["SemantifyIt", "http://sti.dev/semantify-api-js/semantify.js"]
    ];

    /* well we have to use globaliterator (but only in this scope limited in self call function)
     * because callback function has only name without args. If I put args there function will automatically
     * execute and we dont need it.
     */
    var global_i = 0;

    /* displaying how many scripts are loaded */
    var loaderId = "IV_instant_annotation_loader_for_loading_scripts_47";


    /* initialize all dependant scripts */
    loaderShowHide(true);
    loadDependantScripts();


    function loadDependantScripts() {

        /* exit recursion when all scripts are loaded */
        if (depScripts.length <= global_i) {

            /* boot instant anotations */

            loaderShowHide(false);
            boot_instant_validator_enviroment();
            return true;
        }

        updateCount(global_i, depScripts.length);
        /* script properities */
        var scriptName = depScripts[global_i][0];
        var scriptUrl = depScripts[global_i][1];

        /* increment global iterator */
        global_i = global_i + 1;

        /* check if function is initialized */
        console.log("" + scriptName + " loaded before this script = " + isLoaded(scriptName));
        if (!isLoaded(scriptName)) {

            /* create tag */
            var script_tag = document.createElement('script');
            script_tag.type = 'text/javascript';
            script_tag.src = scriptUrl;

            /* on load next dependant script */
            script_tag.onload = loadDependantScripts;

            /* support for ie */
            script_tag.onreadystatechange = function () { //Same thing but for IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    loadDependantScripts();
                }
            }

            /* add script to header */
            document.getElementsByTagName("head")[0].appendChild(script_tag);
        } else {

            /* if script is loaded by user, check next script */
            loadDependantScripts();
        }
    }


    /* functionn which check if function is defined by its name */
    function isLoaded(func) {

        /* for resolving nested functions */
        Object.resolve = function (path, obj) {
            return path.split('.').reduce(function (prev, curr) {
                return prev ? prev[curr] : undefined
            }, obj || self)
        }

        /* returns true if functions exists */
        if (typeof window[func] !== 'undefined') {
            return true;
        } else {
            /* returns true if nested functions exists */
            if (Object.resolve(func) !== undefined) {
                return true;
            }
            return false;
        }
        ;
    }


    function loaderShowHide(showing) {

        var html =
            '<div id="' + loaderId + '" class="" style="text-align: center; ">' +
            '<div style="display: inline-block;"><img src="https://semantify.it/images/loading.gif"><div style="font-family: Roboto, Helvetica, Arial, sans-serif; color:#474747;font-weight: 300;">Checking scripts <span id="' + loaderId + '_count">...</span></div></div>' +
            '</div>';

        if (showing) {
            var node = document.getElementsByClassName("IV_Box")[0];

            if ((node !== null) && (node !== undefined)) {
                //console.log(node);
                node.insertAdjacentHTML('afterend', html);
            }
        } else {
            var node = document.getElementById(loaderId);
            if (node !== null) {
                node.remove();
            }
        }
    }

    function updateCount(loaded, from) {
        var node = document.getElementById(loaderId + '_count');
        if (node !== null) {
            node.innerHTML = loaded + "/" + from;
        }
    }

    /* enviroment is in function wrapper */
    function boot_instant_validator_enviroment() {
        /* jquery support*/
        var $ = jQuery;

        /* wordpress */
        if (settings.wp === undefined) {
            settings.wp = false;
        }

        /* special for wordpress */
        if (settings.wp && settings.colClass === undefined) {
            settings.colClass = "col-lg-4 col-md-6 col-sm-6 col-xs-12";
        }

        /* if you havent defined a class */
        if (settings.colClass === undefined) {
            settings.colClass = "col-lg-3 col-md-4 col-sm-6 col-xs-12";
        }

        /* if you havent defined a class */
        if (settings.panelId === undefined) {
            settings.panelId = "IVPanel0";
        }

        /* loading semantify api */
        var Semantify = new SemantifyIt("Hkqtxgmkz", "ef0a64008d0490fc4764c2431ca4797b");

        var sdoProperties;
        var sdoPropertiesReady = false;
        var sdoClasses;
        var sdoClassesReady = false;
        var panelCount = 0;


        var panelRoots = [];
        var typeList = [];
        var inputFields = [];

        var semantifyUrl = "https://semantify.it";
        //semantifyUrl = "http://localhost:8081";

        var semantifyShortUrl = "https://smtfy.it/";
        //semantifyShortUrl = "https://staging.semantify.it/api/annotation/short/";

        var defaultSemantifyApiKey = "Hkqtxgmkz";
        var saveApiKey = defaultSemantifyApiKey;
        var semantifyToken;

        var validateAnnotation = function (toSend) {
            Semantify.validateAnnotation(toSend, function (saveRes) {
                validationCallback(saveRes)
            });
        };


        var validateBtn = {
            "name": "Validate",
            "id": "validateb",
            "icon": "check", //backup
            "onlyIcon": false,
            "createJsonLD": true,
            "onclick": function (resp) {
                if (!resp.textareaId)
                    return;
                var bulk = [];


                var thisButton = $("#panel-footer-btn-validateb");

                console.log(thisButton.data("disable"));

                var urlVal = $(resp.urlId).val();
                var textareaVal = $(resp.textareaId).val();


                var processingtype = "url";

                if (thisButton.data("disable") === false) {

                    buttonStatus(thisButton, true);

                    if ($("#url-input").is(":hidden")) {
                        processingtype = "snippet";
                    }

                    var snackBarOptions = {
                        htmlAllowed: true,
                        style: 'toast',
                        timeout: 3000
                    };

                    //if we are going to process by snippet
                    if (processingtype === "snippet") {
                        if (textareaVal === "") {
                            send_snackbarMSG("Please fill in all required fields", 3000);
                            buttonStatus(thisButton, false);
                            return false;
                        }

                        var toSend = {};

                        try {
                            toSend["annotation"] = JSON.parse(textareaVal);

                            if ($.isEmptyObject(toSend["annotation"])) {
                                send_snackbarMSG("JSON is empty", 3000);
                                buttonStatus(thisButton, false);
                                return false;
                            }

                        } catch (e) {
                            send_snackbarMSG("There was an error during JSON parsing. Please check if JSON is properly formated.", 3000);
                            buttonStatus(thisButton, false);
                            return false;
                        }

                        validateAnnotation(toSend);


                    } else {
                        if (urlVal === "") {
                            send_snackbarMSG("Please fill in all required fields", 3000);
                            buttonStatus(thisButton, false);

                            return false;
                        }

                        if (!ValidURL(urlVal)) {
                            send_snackbarMSG("URL address in not valid", 3000);
                            buttonStatus(thisButton, false);

                            return false;
                        }

                        var loaderid = "urlloader";
                        //show loader
                        $('#url-input').append(getLoader(loaderid, "1 / 3 Retrieving webpage ..."));


                        var toSend = {};
                        toSend["url"] = urlVal;

                        Semantify.retrieveHtml(toSend, function (response) {

                            console.log(response);

                            if ((response !== undefined) && (response.source !== undefined)) {

                                updateLoaderStatus(loaderid, "2 / 3 Extracting annotations ...");

                                var toSend = {};
                                toSend["html"] = response.source;

                                Semantify.extractJsonld(toSend, function (response) {

                                    if( $.isEmptyObject(response.annotation.jsonld)
                                        && $.isEmptyObject(response.annotation.rdfa)
                                        && $.isEmptyObject(response.annotation.microdata)
                                    ){
                                        send_snackbarMSG("No annotation found on the website", 3000);
                                        buttonStatus(thisButton, false);
                                        $("#" + loaderid).remove();
                                    }

                                    updateLoaderStatus(loaderid, "3 / 3 Validating annotations ...");


                                    var types = Object.keys(response.annotation.jsonld);

                                    var jobs = [];

                                    types.forEach(function (type) {

                                        var toSend = {};
                                        toSend["annotation"] = response.annotation.jsonld[type][0];
                                        jobs.push(
                                            Semantify.validateAnnotation(toSend, function (saveRes) {
                                                Responses.push(saveRes);
                                                console.log(types.length, Responses.length);
                                                if (types.length == Responses.length) {
                                                    validationCallback(Responses);
                                                }
                                            })
                                        );
                                    });

                                    $.when.apply(null, jobs).done(function () {
                                        //var Res = Responses;
                                        console.log("all done", Responses);
                                        //console.log(Res);
                                        //;
                                    });

                                });

                            } else {
                                $("#" + loaderid).remove();
                                send_snackbarMSG("There was a problem retrieving a webpage. Took so long. ", 3000);
                                buttonStatus(thisButton, false);
                            }

                        });


                    }
                }
            }
        }
        var switchBtn = {
            "name": "Switch to webpage validation",
            "id": "switchb",
            "icon": "compare_arrows",
            "onlyIcon": false,
            "additionalStyles": "float:right",
            "onclick": function () {
                $("#text-input").toggleClass("hidden");
                $("#url-input").toggleClass("hidden");

                var fullid = "#panel-footer-btn-switchb";

                var html = $(fullid).html();

                if (html.indexOf("webpage") !== -1) {
                    html = html.replace("webpage", "snippet");
                } else {
                    html = html.replace("snippet", "webpage");
                    $("#" + "urlloader").remove();
                    buttonStatus($("#panel-footer-btn-validateb"), false);
                }

                $(fullid).html(html);
            }
        };


        //var wpDefaultBtns = [previewBtn, wordPressSaveBtn, wordPressDeleteBtn];

        /* start instant validator */
        IV_Init();

        function IV_Init() {
            $('.IV_Box').each(function () {
                if ($(this).data('init') === "true")
                    return;
                $(this).data('init', "true");
                var buttonsChoice = $(this).data("btns");
                var sub = $(this).data("sub");
                var title = $(this).data("title");
                var buttons = getButtons("validate+switch");

                /*loaded append */
                $(this).append(
                    '<div id="loading' + settings.panelId + '" class="' + settings.colClass + ' text-center" style="margin: 10px; padding: 10px; background: white; border-radius: 10px;">' +
                    '<img src="' + semantifyUrl + '/images/loading.gif">' +
                    '</div>'
                );

                addBox($(this), settings.panelId, undefined, buttons, sub, title, null);


                panelCount++;
                settings.panelId = +panelCount;

            });
        }


        function getButtons(btnString) {
            var buttons = [];
            switch (btnString) {
                case "no" :
                    buttons = [];
                    break;
                case "default":
                case undefined:
                case null:
                    buttons = defaultBtns.slice(); //to pass by value and not reference
                    break;
                case "wp_default":
                    buttons = wpDefaultBtns.slice(); //to pass by value and not reference
                    break;
                default:
                    var buttonsArray = btnString.split("+");
                    buttonsArray.forEach(function (b) {
                        switch (b) {
                            case "validate":
                                buttons.push(validateBtn);
                                break;
                            case "switch":
                                buttons.push(switchBtn);
                                break;
                        }
                    });
            }
            return buttons;
        }


        function addBox($jqueryElement, myPanelId, ds, buttons, sub, title, cb) {

            $('#loading' + myPanelId).hide();
            if(title===""){
                title = "Instant Validation";
            }
            var dsName = title;


            var footer = (buttons && buttons.length > 0 ? '<div class="panel-footer text-center" id="panel-footer-' + myPanelId + '">' + '</div>' : '');      //only display footer if there are some buttons


            $jqueryElement.append(
                '<div class="' + settings.colClass + '" id="panel-' + myPanelId + '">' +
                '<div class="panel panel-info ">' +
                '<div class="panel-heading sti-red"> ' +
                '<h3>' + dsName + '</h3>' +
                '</div>' +
                '<div class="panel-body" id="panel-body-' + myPanelId + '">' +
                '<div id="text-input">' +
                '<h4>Validate your annotation</h4><br/>' +
                '<textarea class="form-control input-myBackground" id="IV_' + myPanelId + '_textarea" placeholder="Your annotation here" title="Your annotation should be placed here"></textarea> ' +
                '</div>' +
                '<div id="url-input" class="hidden">' +
                '<h4>Validate your webpage</h4><br/>' +
                '<input type="url" class="form-control input-myBackground" name="url" id="IV_' + myPanelId + '_url" placeholder="Your webpage here">' +
                '</div>' +
                '</div>' +
                footer +
                '</div>' +
                '</div>');

            for (var j in buttons) {
                if (buttons.hasOwnProperty(j)) {
                    (function (thisPanelId) {    // because the onclick changes with each loop all buttons would call the same function
                        var name = buttons[j]["name"];
                        var id = buttons[j]["id"];
                        var onclick = buttons[j]["onclick"];
                        var additionalClasses = buttons[j]["additionalClasses"];
                        var additionalStyles = buttons[j]["additionalStyles"];
                        var icon = buttons[j].hasOwnProperty("icon") ? buttons[j]["icon"] : null;
                        var createJsonLD = !!buttons[j]["createJsonLD"];    // default is false
                        var onlyIcon = buttons[j]["onlyIcon"] !== false;    //default is true

                        $('#panel-footer-' + thisPanelId).append(
                            generateButton(name, id, thisPanelId, additionalClasses, additionalStyles, icon, onlyIcon)
                        );

                        $('#panel-footer-btn-' + id)
                            .click(function (e) {
                                e.preventDefault();
                                if (id === "validateb") {
                                    onclick({
                                        "textareaId": "#IV_" + myPanelId + "_textarea",
                                        "urlId": "#IV_" + myPanelId + "_url",
                                        "panelId": thisPanelId
                                    });
                                } else {
                                    onclick();
                                }

                            });

                    })(myPanelId);
                }
            }


        }

        function generateButton(name, id, thisPanelId, additionalClasses, additionalStyles, icon, onlyIcon) {
            var but = '<button class="btn button-sti-red" data-disable="false" id="panel-footer-btn-' + id + '" style="margin: 5px 5px; padding: 10px 10px; ' + (additionalStyles ? additionalStyles : "") + '" ' + (additionalClasses ? additionalClasses : "") + ' title="' + name + '" >' +
                (icon ? '<i class="material-icons">' + icon + '</i>' : name) +
                (onlyIcon ? '' : ' ' + name) +
                '</button>';

            return but;
        }


        function syntaxHighlight(json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }

        function getSubClasses(type) {
            var subClasses = [];
            if (sdoClasses.hasOwnProperty(type))
                if (sdoClasses[type].hasOwnProperty("subClasses")) {
                    subClasses = subClasses.concat(sdoClasses[type]["subClasses"]);
                    subClasses.forEach(function (subclass) {
                        subClasses = subClasses.concat(getSubClasses(subclass));
                    });
                }
            return subClasses;
        }

        function unique(list) {
            var result = [];
            $.each(list, function (i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
            });
            return result;
        }

        function htmlList(list) {
            var result = [];
            $.each(list, function (i, e) {
                result.push("<li>" + e + "</li> \n");
            });
            return result;
        }

        function send_snackbarMSG(message, duration) {
            var options = {
                content: '<table class="snackbar-table"><td><i class="material-icons snackbar-icon">info</i><span>  ' + message + '</span></td></table>', // text of the snackbar
                style: "toast",
                timeout: duration,
                htmlAllowed: true,
                onClose: function () {
                }
            };
            $.snackbar(options);
        }

        function set(obj, path, value) {
            var schema = obj;
            var pList = path.split('-');
            var len = pList.length;
            for (var i = 0; i < len - 1; i++) {
                var elem = pList[i];
                if (!schema[elem]) schema[elem] = {};
                schema = schema[elem];
            }
            schema[pList[len - 1]] = value;
            return obj;
        }

        function ValidURL(value) {
            return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
        }

        function getLoader(loaderId, message) {
            var html =
                '<div id="' + loaderId + '" class="" style="text-align: center; ">' +
                '<div style="display: inline-block;"><img src="https://semantify.it/images/loading.gif"><div style="font-family: Roboto, Helvetica, Arial, sans-serif; color:#474747;font-weight: 300;"><span id="' + loaderId + '_message">' + message + '</span></div></div>' +
                '</div>';
            return html;
        }

        function updateLoaderStatus(loaderId, message) {
            $("#" + loaderId + "_message").html(message);
        }

        function buttonStatus(buttonSelector, disable) {
            buttonSelector.attr("disabled", disable);
            buttonSelector.data("disable", disable);
        }

        function validationCallback(saveRes) {

            Responses = [];

            console.log("saveRes");
            console.log(saveRes);

            var loaderSelector = $("#urlloader");

            if (loaderSelector.length !== 0) {
                loaderSelector.remove();
            }

            var thisButton = $("#panel-footer-btn-validateb");
            buttonStatus(thisButton, false);

            if (typeof saveRes !== "undefined") {

                //if it is only one result
                if (typeof saveRes.validationResult !== "undefined") {
                    var saveResTemp = saveRes;
                    saveRes = [];
                    saveRes.push(saveResTemp);
                }

                var report = "";

                //loop for annotation
                saveRes.forEach(function (saveResAnno) {

                    //saveResAnno = saveResAnno.validationResult;

                    //information about annotation
                    var msg = "";
                    if (!saveResAnno.validationResult.isValid) {

                        saveResAnno.validationResult.payload.errorReport.forEach(function (errorm) {
                            msg = msg + "<div class='alert alert-danger'>" + errorm.message + "</div>";
                        });

                    } else {
                        msg = "<div class='alert alert-success'>" + saveResAnno.validationResult.message + "</div>";
                    }

                    //var types = Object.keys(saveResAnno.validationResult.payload.annotation);

                    //$.each( types, function( key, type ) {
                    var i = 0;

                    //saveResAnno.validationResult.payload.annotation[type].forEach(function (annotation) {
                    var annotation = saveResAnno.validationResult.payload.annotation;
                    var anno = JSON.stringify(annotation);
                    var annohtml = "<div class='annotation'>" +
                        msg +
                        "<pre>" + syntaxHighlight(anno) + "</pre>" +
                        "</div>";

                    report = report + annohtml;
                });


                var dummy = document.createElement("div");
                document.body.appendChild(dummy);
                dummy.setAttribute("id", "IA_preview_id");

                /*
                var color = "rgb(217, 83, 79)";
                var text = "Failed";
                if (saveResAnno.validationResult.isValid) {
                    color = "rgb(92, 184, 92)";
                    text = "Correct";
                }
                */


                $('#IA_preview_id').append(
                    '<div class="bootstrap semantify semantify-instant-annotations">' +
                    '<div class="modal fade" id="IA_saveModal" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h3 class="modal-title">Validation result</h3>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<br/>' +
                    report +
                    '<br/>' +
                    'Would you like to see more results? Check out our <a href="https://semantify.it/validator/?mode=basic&url=' + $("#url-input input").val() + '" target="_blank">semantify.it validator</a>.' +
                    '<br/><br/><br/>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );


                $('#IA_saveModal')
                    .modal()
                    .on('hidden.bs.modal', function () {
                        $(this).remove();
                    });

            }

            else {
                snackBarOptions["content"] = "There was an error validating annotation to semantify.it";
                $.snackbar(snackBarOptions);
            }
        }

    }


}
;
