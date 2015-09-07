"use strict";

var STATE_VALID = 0,
    STATE_HTML = 1,
    STATE_ENTITY = 2,
    VALID_CHAR = /[A-z]/;


/**
 *
 * @param {string} html
 */
function htmlUpperCase(html) {
    var state = STATE_VALID,
        htmlLen = html.length,
        char = '',
        candidate = '';

    for (var x = 0; x < htmlLen; x++) {
        char = html[x];

        switch (char) {
            case '<' : {
                // Opening tag followed by a space is not a tag
                if (html[x + 1] !== ' ') {
                    state = STATE_HTML;
                }
                break;
            }
            case '>': {
                if (state === STATE_HTML) {
                    state = STATE_VALID;
                }
                break;
            }
            case '&': {
                if (html[x + 1] !== ' ') {
                    state = STATE_ENTITY;
                }
                candidate = char;
                break;
            }
            case ';': {
                if (state === STATE_ENTITY) {
                    state = STATE_VALID;
                }
                candidate = char;
                break;
            }
            default: {
                if (state !== STATE_ENTITY &&
                    state !== STATE_HTML &&
                    char.search(VALID_CHAR) !== -1
                ) {
                    // We have successful match
                    html = html.substr(0, x) +  char.toUpperCase() + html.substr(x + 1);

                    //Let's leave this function
                    return html;
                }
            }
        }
    }

    //No character required upper-casing
    return html;
}

module.exports =  htmlUpperCase;