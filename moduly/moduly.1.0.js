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
            type: "div",
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

}