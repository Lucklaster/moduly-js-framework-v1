"use strict";



class UX {


    static elem(root, selector, value) {
        if (!root) {
            root = document.body;
        }

        if (selector) {
            let selected = document.querySelector(selector);

            if (value) {
                let parent = selected.parentNode;
                parent.replaceChild(value, selected);
            }

            return selected;
        }
    }

}