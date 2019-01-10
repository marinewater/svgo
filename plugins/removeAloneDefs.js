'use strict';

exports.type = 'perItem';

exports.active = true;

exports.params = {};

exports.description = 'removes <defs>';

/**
 * Check and remove when at the <svg> there is only a <defs> by moving elements directly in the root
 *
 * @param {Object} item current iteration item
 * @return {Boolean} Always return true, to not filter the item
 *
 */
exports.fn = function(root, params) {
    if(root.isElem('svg')) {
        for (let i = 0; i < root.content.length; i++) {
            const item = root.content[i];

            // If the whole SVG consists only of defs.
            if (item.isElem('defs')) {
                let hasDefsOnly = true;
 
                for (let j = 0; j < root.content.length; j++) {
                    if (j != i && root.content[j].isElem()) {
                        hasDefsOnly = false;
                        break;
                    }
                }

                if (hasDefsOnly) {
                    root.spliceContent(i, 1, item.content);
                    return true;
                }
            }
        }
    }
};
