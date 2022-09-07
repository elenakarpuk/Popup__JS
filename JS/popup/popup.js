const popup = function () {
    let elems = document.querySelectorAll('[data-popup]');
    if (!elems || elems.length == 0) return;

    elems = Array.from(elems); //приводим псевдомассив к массиву (т.к. не перебирается forEach)

    const create = function (content) {
        let elem = document.querySelector('.popup');
        if (elem) elem.remove();

        const elemOverlay = document.createElement('div');
        elemOverlay.classList.add('popup');

        elem = document.createElement('div');
        elem.classList.add('popup__cover');

        const elemContent = document.createElement('div');
        elemContent.classList.add('popup__content');
        elemContent.innerHTML = content;

        const elemClose = document.createElement('div');
        elemClose.classList.add('popup__close');

        elem.append(elemContent, elemClose);
        elemOverlay.append(elem);

        elemOverlay.addEventListener('click', close);
        elemClose.addEventListener('click', close);

        return elemOverlay;
    }

    const close = function (event) {

        if (!event.target.classList.contains('popup__close') &&
            !event.target.classList.contains('popup')) return

        let elem = document.querySelector('.popup');
        if (elem) elem.remove();
    }

    const show = function (event) {
        event.preventDefault(); //отменяет действие браузера по умолчанию

        let elem = event.target;

        let dataset = elem.dataset.popup; //забираем содержимое data-popup; работает на всех, кроме картинки
        // console.log(dataset)

        if (!dataset) {
            const parent = elem.closest('[data-popup]'); //ищет наружу родителя с этим атрибутом (ищем image)

            if (!parent) return;

            elem = parent;
            dataset = parent.dataset.popup;
        }
        //console.log(dataset) //определят image

        let content = '';
        let href = '';

        switch (dataset) {
            case 'image':
                href = elem.href;
                if (!href) return;
                let altText = elem.firstChild.alt;
                content = `<img src='${href}' alt='${altText}'>`;
                break;
            case 'youtube':
                href = elem.href;
                if (!href) return;

                let id = '';

                if (href.indexOf('youtube.com') != -1) {
                    id = href.split('=');
                    //console.log(id)
                }
                if (href.indexOf('youtu.be') != -1) {
                    id = href.split('/');
                }

                if (!id) return;

                id = id[id.length - 1];

                content = `<iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                break;
            default:
                const elemContent = document.querySelector(`#${dataset}`)

                if (!elemContent) return;

                content = elemContent.innerHTML;
        }

        //console.log(content)

        if (!content) return;

        const popupElem = create(content);

        if (!popupElem) return;

        document.body.append(popupElem);
    }

    elems.forEach(function (elem) {
        elem.addEventListener('click', show);
    })
}