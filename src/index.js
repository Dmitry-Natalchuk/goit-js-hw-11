import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImgApi } from "./js/fetchApi";
import { renderGalleru } from "./js/renderGalleru";

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;
loadMore.classList.add("is-hidden");

form.addEventListener("submit",onSearchForm);
loadMore.addEventListener('click', onLoadMoreNextPage);


function onSearchForm (event) {
    event.preventDefault();
    page = 1;
    query = event.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = "";
    
    if(query === "") {
        loadMore.classList.add("is-hidden");
        return Notify.failure('The search string cannot be empty. Please specify your search query.')
    }

fetchImgApi(query, page, perPage).then(({data}) => {
    if(data.totalHits === 0 ) {
        loadMore.classList.add("is-hidden");
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
     } else {
        renderGalleru(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
        if (data.totalHits < perPage && data.totalHits === "") {
            loadMore.classList.add("is-hidden");
            return
          }
          return loadMore.classList.remove("is-hidden");
    }
  }).catch(error => console.log(error))
    .finally(() => {
        form.reset()
    });
}

function onLoadMoreNextPage () {
  page += 1
  
  simpleLightBox.destroy()
fetchImgApi(query, page, perPage).then(({data}) => {
  if(data.totalHits === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  } else {
      renderGalleru(data.hits)
      simpleLightBox = new SimpleLightbox('.gallery a').refresh()
      Notify.success(`Hooray! Left until the end ${data.totalHits - perPage * (page - 1)} images.`)
      const totalPages = Math.ceil(data.totalHits / perPage);
      if(page > totalPages) {
        loadMore.classList.add("is-hidden");
        Notify.failure("We're sorry, but you've reached the end of search results.")
        return
      }
      return loadMore.classList.remove("is-hidden")
  }
}).catch(error => console.log(error))
}