"use strict";



class UX {


    static elem(options) {
        let defaults = {
            root: document.body,
            selector: "",
            value: undefined,
            clone: true
        };

        let query = {...defaults, ...options};


        if (query.selector) {
            let elems = query.root
                             .querySelectorAll(query.selector);

            if (query.value) {
                let i = 0;

                elems.forEach((elem) => {
                    if (query.clone) {
                        elem.replaceWith(query.value.cloneNode(true));
                    }

                    else {
                        elem.replaceWith(query.value);
                    }
                });
            }


            return elems.length > 1 ? elems : elems[0];
        }
    }


    static ins(options) {
        let defaults = {
            root: document.body,
            insert: this.INS.AS.CHILD,
            place: this.INS.AT.AFTER,
            node: undefined,
            basis: ""
        };

        let insertion = {...defaults, ...options};
        let basis = insertion.root
                             .querySelector(insertion.basis);


        switch (insertion.insert) {

            case this.INS.AS.PARENT:
                this.insertParent(insertion.root, insertion.node);
                break;

            case this.INS.AS.SIBLING:
                this.insertSibling(insertion.root,
                                   insertion.place,
                                   insertion.node);
                break;

            case this.INS.AS.CHILD:
                this.insertChild(
                    insertion.root,
                    insertion.place,
                    insertion.node,
                    basis);
                break;
        }

        return insertion.root;
    }


    static insertParent(root, node) {
        let ancestor = root.parentElement;
        let place = undefined;
        let basis = undefined;

        if (ancestor.firstElementChild === root) {
            place = this.INS.AT.FIRST;
        }

        else if (ancestor.firstElementChild !== root &&
                 ancestor.lastElementChild !== root) {
            place = this.INS.AT.BEFORE;
            basis = root.nextSibling;
        }

        else {
            place = this.INS.AT.LAST;
        }
        
        node.append(root);
        this.insertChild(ancestor, place, node, basis);
    }


    static insertSibling(root, place, node) {
        let position = "afterend";

        if (place === this.INS.AT.FIRST ||
            place === this.INS.AT.BEFORE) {
            position = "beforebegin";
        }

        root.insertAdjacentElement(position, node);
    }
 

    static insertChild(root, place, node, basis) {
        switch (place) {

            case this.INS.AT.FIRST:
                root.prepend(node);
                break;

            case this.INS.AT.BEFORE:
                root.insertBefore(node, basis);
                break;

            case this.INS.AT.AFTER:
                root.insertBefore(node, basis.nextSibling);
                break;

            case this.INS.AT.LAST:
                root.append(node);
                break;
        }
    }


    static del(options) {
        let defaults = {
            root: document.body,
            selector: undefined,
            subtree: true
        };

        let deletion = {...defaults, ...options};

        if (!deletion.selector) {
            return deletion.root.remove();
        }

        
        let elems = deletion.root
                            .querySelectorAll(deletion.selector);

        if (deletion.subtree) {
            elems.forEach((elem) => {
                elem.remove();
            });
        }
    }


    static make(options) {
        let defaults = {
            root: document.body,
            type: this.ELEM.CONTAINER.DIV,
            attributes: {},
            text: ""
        }

        let elemObj = {...defaults, ...options};


        let element = elemObj.root
                             .createElement(elemObj.type);

        for (let property in elemObj.attributes) {
            element.setAttribute(property, value);
        }

        element.textContent = elemObj.text;

        return element;
    }


    static get INS() {
        return {
            AS: {
                PARENT: "parent",
                SIBLING: "sibling",
                CHILD: "child"
            },

            AT: {
                FIRST: "first",
                BEFORE: "before",
                AFTER: "after",
                LAST: "last"
            }
        };
    }


    static get ELEM() {
        return {
            HTML: "html",

            APPLICATION: {
                DATA: "data",
                EMBED: "embed",
                OBJECT: "object",
                PARAM: "param",
                VAR: "var"
            },

            CONTAINER: {
                BODY: "body",
                CANVAS: "canvas",
                DIALOG: "dialog",
                DIV: "div",
                FOOTER: "footer",
                HEADER: "header",
                I_FRAME: "iframe",
                SECTION: "section",
                SPAN: "span",
                SVG: "svg",
                TEMPLATE: "template"
            },

            CONTENT: {
                ABBR: "abbr",
                ADDRESS: "address",
                ARTICLE: "article",
                ASIDE: "aside",
                B: "b",
                BDI: "bdi",
                BDO: "bdo",
                BLOCKQUOTE: "blockquote",
                BR: "br",
                CITE: "cite",
                CODE: "code",
                DD: "dd",
                DEL: "del",
                DETAILS: "details",
                DFN: "dfn",
                DL: "dl",
                DT: "dt",
                EM: "em",
                FIG_CAPTION: "figcaption",
                FIGURE: "figure",
                H1: "h1",
                H2: "h2",
                H3: "h3",
                H4: "h4",
                H5: "h5",
                H6: "h6",
                HR: "hr",
                I: "i",
                INS: "ins",
                KBD: "kbd",
                MAIN: "main",
                MARK: "mark",
                OL: "ol",
                P: "p",
                PRE: "pre",
                Q: "q",

                RUBY: {
                    RP: "rp",
                    RT: "rt",
                    RUBY: "ruby"
                },

                S: "s",
                SAMP: "samp",
                SMALL: "small",
                STRONG: "strong",
                SUB: "sub",
                SUMMARY: "summary",
                SUP: "sup",
                TEMPLATE: "template",
                U: "u",
                UL: "ul",
                VAR: "var",
                WBR: "wbr"
            },

            CSS: {
                LINK: "link",
                STYLE: "style"
            },

            FORM: {
                BUTTON: "button",
                DATA_LIST: "datalist",
                FIELD_SET: "fieldset",
                INPUT: "input",
                LABEL: "label",
                LEGEND: "legend",
                LI: "li",
                OPT_GROUP: "optgroup",
                OPTION: "option",
                SELECT: "select",
                TEXT_AREA: "textarea",

                toString: () => {
                    return "form"
                }
            },

            IMAGE: {
                AREA: "image",
                IMG: "img",
                MAP: "map",
                PICTURE: "picture",
                SOURCE: "source"
            },

            LINK: {
                A: "a",
                BASE: "base",
                NAV: "nav",

                toString: () => {
                    return "link";
                }
            },

            MEDIA: {
                AUDIO: "audio",
                SOURCE: "source",
                TRACK: "track",
                VIDEO: "video"
            },

            META: {
                HEAD: "head",
                TITLE: "title",

                toString: () => {
                    return "meta";
                }
            },

            SCRIPT: {
                NO_SCRIPT: "noscript",
                
                toString: () => {
                    return "script";
                }
            },

            TABLE: {
                CAPTION: "caption",
                COL: "col",
                COL_GROUP: "colgroup",
                T_BODY: "tbody",
                TD: "td",
                T_FOOT: "tfoot",
                TH: "th",
                T_HEAD: "thead",
                TR: "tr",

                toString: () => {
                    return "table";
                }
            },

            UNIT: {
                METER: "meter",
                OUTPUT: "output",
                PROGRESS: "progress",
                TIME: "time"
            }
        };
    }

}