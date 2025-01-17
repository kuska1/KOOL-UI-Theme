const imgElement = document.querySelector('._24_AuLm54JVe1Zc0AApCDR._3d_bT685lnWotXxgzKW6am.yDr03475kalWBTwAE-Rnw');

// Получить значение атрибута src
if (imgElement) {
    const imgSrc = imgElement.getAttribute('src');

    // Применить стиль через CSS
    const targetElement = document.querySelector('._1pwP4eeP1zQD7PEgmsep0W._54PuCatl_tYG836TOs4Mv._3SNGKeQeenu7zQZ85Ug8aj._2wgFGloLUdbOVEeIYkuqTp');
    if (targetElement && imgSrc) {
        targetElement.style.setProperty('--custom-img-src', `url("${imgSrc}")`);
    }

    // Если вы хотите использовать чистый CSS, создайте правило стилей:
    const style = document.createElement('style');
    style.textContent = `
        ._1pwP4eeP1zQD7PEgmsep0W._54PuCatl_tYG836TOs4Mv._3SNGKeQeenu7zQZ85Ug8aj._2wgFGloLUdbOVEeIYkuqTp::before {
            content: url("${imgSrc}");
        }
    `;
    document.head.appendChild(style);
}