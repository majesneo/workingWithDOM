const images = () => {
    const popup = document.createElement('div'),
        popupImage = document.createElement('img'),
        worksPlace = document.querySelector('.works');

    popup.classList.add('popup');
    worksPlace.appendChild(popup);
    popup.appendChild(popupImage);

    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';

    worksPlace.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;
        if (target && target.classList.contains('preview')) {
            popup.style.display = 'flex';
            popupImage.style.width = '40%';
            document.body.style.overflow = 'hidden'
            let path = target.parentNode.getAttribute('href');
            popupImage.setAttribute('src', path);
        }

        if (target && target.matches('div.popup')) {
            popup.style.display = 'none';
            document.body.style.overflow = ''
        }
    });
}
export default images