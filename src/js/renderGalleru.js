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
        <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
         <div class="info">
            <p class="info-item"><b class = "info-item-list">Likes</b>${likes}</p>
            <p class="info-item"><b class = "info-item-list">Views</b>${views}</p>
            <p class="info-item"><b class = "info-item-list">Comments</b>${comments}</p>
            <p class="info-item"><b class = "info-item-list">Downloads</b>${downloads}</p>
         </div>
      </div>
    </a>`;
}).join('');

gallery.insertAdjacentHTML('beforeend', renderImg);
}
export {renderGalleru}


