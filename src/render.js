/* webformatURL - ссылка на маленькое изображение для списка карточек.
largeImageURL - ссылка на большое изображение.
tags - строка с описанием изображения. Подойдет для атрибута alt.
likes - количество лайков.
views - количество просмотров.
comments - количество комментариев.
downloads - количество загрузок. */

const gallery = document.querySelector('.gallery')

function renderGalleru (images) {
    const renderImg = images
    .map(img => {
      const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads} = img;
      return`
      <a class="gallery__link" href="${largeImageURL}">
      <div class="gallery-item" id="${id}">
        <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
         <ul class="info">
            <li class="info-item"><b>Likes</b>${likes}</li>
            <li class="info-item"><b>Views</b>${views}</li>
            <li class="info-item"><b>Comments</b>${comments}</li>
            <li lass="info-item"><b>Downloads</b>${downloads}</li>
         </ul>
      </div>
    </a>`;
}).join('');

gallery.insertAdjacentHTML('beforeend', renderImg);
}
export {renderGalleru}


