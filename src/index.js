import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImg } from "./fetch";
import { renderGalleru } from "./render";

const gallery = document.querySelector('.gallery')
const form = document.querySelector('.form')
console.log(form);