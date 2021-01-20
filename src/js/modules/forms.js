import checkNumInputs from "./checkNumInputs";
import clearInputs from "./clearInputs";

const forms = (modalState = null) => {
    const form = document.querySelectorAll('form');


    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Успешно,мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: data
        });

        return await res.text()
    };


    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            let result = {};
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            formData.forEach((value, key) => {
                result[key] = value;
            })

            Object.assign(result, modalState)
            result = JSON.stringify(result)
            console.log(result)

            postData('assets/server.php', result)
                .then(res => {
                    statusMessage.textContent = message.success
                    console.log(res)
                })
                .catch(() => {
                    statusMessage.textContent = message.failure
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};
export default forms;