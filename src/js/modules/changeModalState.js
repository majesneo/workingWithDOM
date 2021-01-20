import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function unDisabledButton(item) {
        let result = null;
        do {
            item = item.parentNode
            result = item.parentNode.querySelector('[data-buttonBlock]');
        } while (!item.parentNode.querySelector('[data-buttonBlock]'));
        return result
    }

    function chekInputs(item) {
        let result = null
        for (let j = 0; j < item.length; j++) {
            result = item[j].validity.valid === true;
        }
        return result
    }

    function getDataWidow(data = 0, event, prop) {
        data.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':

                        state[prop] = i + 1;
                        break;

                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            data.forEach((itemCheck, j) => {
                                itemCheck.checked = false;
                                if (i === j) {
                                    itemCheck.checked = true;
                                    unDisabledButton(item).disabled = false
                                }
                            });

                            let allCheckBox = null;
                            allCheckBox = document.querySelectorAll('.checkbox-custom')
                            allCheckBox.forEach((itemCheck, k) => {
                                if (i === k) {
                                    state[prop] = itemCheck.getAttribute('id');
                                }
                            });

                        } else {
                            state[prop] = item.value;
                        }

                        let allInputs = null;
                        allInputs = item.parentNode.querySelectorAll('input')
                        if (unDisabledButton(item) && chekInputs(allInputs)) {
                            unDisabledButton(item).disabled = false
                        }
                        break;

                    case 'SELECT':
                        state[prop] = item.value;
                        break;

                }
                console.log(state);
            });
        });
    }

    getDataWidow(windowForm, 'click', 'form');
    getDataWidow(windowWidth, 'input', 'width');
    getDataWidow(windowHeight, 'input', 'height');
    getDataWidow(windowType, 'change', 'type');
    getDataWidow(windowProfile, 'change', 'profile');

    return state
};

export default changeModalState;