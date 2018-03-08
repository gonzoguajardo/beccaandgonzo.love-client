const fs = require('fs-extra')
fs.remove('./node_modules/cuppa-ng2-slidemenu/slideMenu.js')
    .then(() => {
        fs.copy('./src/assets/cuppa-ng2-slidemenu.override.files/slideMenu.js', './node_modules/cuppa-ng2-slidemenu/slideMenu.js')
            .catch((err) => {
                console.error(err);
            })
    }).catch((err) => {
        console.error(err);
    })
fs.remove('./node_modules/cuppa-ng2-slidemenu/slideMenu.metadata.json')
    .then(() => {
        fs.copy('./src/assets/cuppa-ng2-slidemenu.override.files/slideMenu.metadata.json', './node_modules/cuppa-ng2-slidemenu/slideMenu.metadata.json')
            .catch((err) => {
                console.error(err);
            })
    }).catch((err) => {
        console.error(err);
    })
