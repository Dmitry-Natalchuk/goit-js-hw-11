import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImgApi } from "./js/fetchApi";
import { renderGalleru } from "./js/renderGalleru";

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
loadMore.classList.add("is-hidden");

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

form.addEventListener("submit",onSearchForm);
loadMore.addEventListener('click', onLoadMoreNextPage);


function onSearchForm (event) {
    event.preventDefault()
    page = 1
    query = event.currentTarget.searchQuery.value.trim()
    gallery.innerHTML = ""
    

    if(query === "") {
        return Notify.failure('The search string cannot be empty. Please specify your search query.')
    }

fetchImgApi(query, page, perPage).then(({data}) => {
    if(data.totalHits === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    } else {
        renderGalleru(data.hits)
        loadMore.classList.remove("is-hidden");
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
    }
  }).catch(error => console.log(error))
}

function onLoadMoreNextPage () {
  page += 1
  simpleLightBox.destroy()
fetchImgApi(query, page, perPage).then(({data}) => {
  if(data.totalHits === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  } else {
      renderGalleru(data.hits)
      simpleLightBox = new SimpleLightbox('.search__gallery a').refresh()
      Notify.success(`Hooray! Left until the end ${data.totalHits - perPage * (page - 1)} images.`)
  }
}).catch(error => console.log(error))
}