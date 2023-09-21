const slider = document.querySelector('.section-welcome_slider');
const slides = slider.querySelectorAll('.welcome_slider-card');
const sliderButtonNext = document.querySelector('.slider-arrows_next');
const sliderButtonPrev = document.querySelector('.slider-arrows_previous');
const dots = document.querySelectorAll('.pagination-dots-items');
const paginationNumber = document.querySelector('.pagination-number');

let currentSlideIndex = 0;

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index); // Вызываем функцию showSlide с индексом точки
    });
});


function showSlide(slideIndex) {
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });

    // Обновляем активную точку
    dots.forEach((dot, index) => {
        if (index === slideIndex) {
            dot.classList.add('dots-active');
        } else {
            dot.classList.remove('dots-active');
        }
        
    
    });

    
    // Обновляем номер текущего слайда
    const slideNumber = slideIndex + 1;
    paginationNumber.textContent = `${slideNumber < 10 ? '0' : ''}${slideNumber} | 05`;

    currentSlideIndex = slideIndex;
}

sliderButtonPrev.addEventListener('click', () => {
    showSlide(currentSlideIndex - 1);
});

sliderButtonNext.addEventListener('click', () => {
    showSlide(currentSlideIndex + 1);
});

// Показываем первый слайд при загрузке страницы
showSlide(currentSlideIndex);

// _______________________Parallax_____________________________________

const wrapper = document.querySelector('.parallax_wrapper');
const frontImage = document.querySelector('.parallax_front-image');

const line = document.querySelector('.parallax_line');
let isDragging = false;
let initialMouseX = 0;
let initialLineX = 0;
let initialFrontImageX = 0;

// Получаем начальное положение frontImage и line
initialFrontImageX = parseFloat(getComputedStyle(frontImage).left);
initialLineX = parseFloat(getComputedStyle(line).left);

line.addEventListener('mousedown', (event) => {
    if (event.target === line) {
        isDragging = true;
        initialMouseX = event.clientX;

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
        });
    }
});

function drag(event) {
    if (!isDragging) return;

    const mouseX = event.clientX;
    const offsetX = mouseX - initialMouseX;

    // Ограничение движения линии

    const maxOffsetLeft = -initialFrontImageX;
const maxOffsetRight = wrapper.clientWidth - initialFrontImageX - line.clientWidth;
const newLineX = initialLineX + offsetX;

if (newLineX < maxOffsetLeft) {
    newLineX = maxOffsetLeft;
} else if (newLineX > maxOffsetRight) {
    newLineX = maxOffsetRight;
}

frontImage.style.left = (initialFrontImageX + (newLineX - initialLineX)) + 'px';
  
}


// ___________________video controls__________________________________


const video = document.querySelector('.section-video_video');
const controls = document.querySelector('.section-video_controls');
const playButton = controls.querySelector('.button-play');
const volumeButton = controls.querySelector('.button-volume');
const fullscreenButton = controls.querySelector('.button-fullscreen');
const videoRange = controls.querySelector('.video-range');
const volumeRange = controls.querySelector('.volume-range');
const bigPlayButton = document.querySelector('.big-button-play');

bigPlayButton.addEventListener('click', () => {
    video.play();
    bigPlayButton.classList.add('hidden');
})

// Обработчик для кнопки Play/Pause
playButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playButton.classList.add('paused');
    
  } else {
    video.pause();
    playButton.classList.remove('paused');
    // bigPlayButton.classList.remove('hidden');
  }
});

// Обработчик для кнопки громкости
volumeButton.addEventListener('click', () => {
  if (video.muted) {
    video.muted = false;
    volumeButton.classList.remove('muted');
  } else {
    video.muted = true;
    volumeButton.classList.add('muted');
  }
});

// Обработчик для кнопки полноэкранного режима
fullscreenButton.addEventListener('click', () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
});



// Дождитесь, когда видео будет готово к воспроизведению
video.addEventListener('loadedmetadata', function() {
  // Получите длительность видео
  const videoDuration = video.duration;
  
  // Установите максимальное значение для input
  videoRange.max = videoDuration;
});

// Обработчик для ползунка времени
video.addEventListener('timeupdate', () => {
  // Получите текущее время видео и обновите положение ползунка
  const currentTime = video.currentTime;
  const duration = video.duration;
  
  // Обновление значения ползунка в процентах от общей длительности
  const value = (currentTime / duration) * 100;
  videoRange.value = value;
});

// Обработчик для окончания воспроизведения видео
video.addEventListener('ended', () => {
  // Воспроизведение видео завершено, установите значение ползунка в начало
  videoRange.value = 0;
});


  

const progress = document.querySelector('.progress');

videoRange.oninput = function(){
  progress.style.width = `${this.value}%`;
};




// Обработчик для ползунка громкости
volumeRange.addEventListener('input', () => {
  video.volume = volumeRange.value / 100;
});

// Обработчик для события изменения состояния видео (play, pause)
video.addEventListener('play', () => {
  playButton.classList.add('paused');
});

video.addEventListener('pause', () => {
  playButton.classList.remove('paused');
});



// ____________________video slider play functions____________________________


const buttonsYouTube = document.querySelectorAll('.button-youtube');
const sliderVideos = document.querySelectorAll('.video-cards-item');

buttonsYouTube.forEach((button, index) => {
  button.addEventListener('click', function () {
    const video = sliderVideos[index];
    video.setAttribute('controls', '');
    button.classList.add('hidden');
    
    // Проверяем, играет ли видео
    if (video.paused) {
      // Если видео приостановлено, запускаем его
      video.play();
      
    } else {
      // Если видео играет, ставим на паузу
      video.pause();
      button.classList.remove('hidden');
    }
  });
});

// ________________________video slider______________________________________

const videoSlider = document.querySelector('.video-slider');
const sliderWrapper = document.querySelector('.video-slider_wrapper');
const videoCards = document.querySelectorAll('.video-cards');
const paginationDots = document.querySelectorAll('.video-pagination-dots');

let currentIndex = 0;

// Функция для перемещения слайдов
function moveToSlide(index) {
  currentIndex = index;
  const translateValue = -currentIndex * videoCards[0].offsetWidth;
  sliderWrapper.style.transform = `translateX(${translateValue}px)`;
  updatePagination();
}

// Функция для обновления активного элемента пагинации
function updatePagination() {
  paginationDots.forEach((dot, i) => {
    dot.classList.toggle('video-pagination-dots_active', i === currentIndex);
  });
}

// Обработчики для кнопок переключения
document.querySelector('.video-pagination-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + videoCards.length) % videoCards.length;
  moveToSlide(currentIndex);
});

document.querySelector('.video-pagination-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % videoCards.length;
  moveToSlide(currentIndex);
});

// Обработчики для пагинации
paginationDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    moveToSlide(index);
  });
});

// Изначально установим активный слайд и пагинацию
moveToSlide(currentIndex);


// _________________gallery images container________________________________________

const pictureInnerContainer = document.querySelector('.gallery-wrapper');
const galleryArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Функция для перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Перемешиваем массив картинок случайным образом
const shuffledGalleryArray = shuffleArray(galleryArray);

function getGalleryCard(index) {
  const img = document.createElement('img');
  img.classList.add('picture');
  img.src = `img/galery/galery${shuffledGalleryArray[index]}.jpg`;
  img.alt = `picture from the gallery`;
  pictureInnerContainer.append(img);
}

// Отображаем картинки в случайном порядке
for (let i = 0; i < shuffledGalleryArray.length; i++) {
  getGalleryCard(i);
}

// ______________animation on scroll___________________________________


const gallerySection = document.querySelector('.gallery');
const pictures = document.querySelectorAll('.picture');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gallerySection.classList.add('is-visible');
    } else {
      gallerySection.classList.remove('is-visible');
    }
  });
});

pictures.forEach(picture => {
  observer.observe(picture);
});


// __________________tickets counter_________________________________________

// Находим все элементы кнопок и входных полей
const plusButtons = document.querySelectorAll('.amount-btn.plus');
const minusButtons = document.querySelectorAll('.amount-btn.minus');
const inputFields = document.querySelectorAll('.input-amount');
const totalField = document.querySelector('.total');

// Обработчик события для кнопок "plus"
plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        inputFields[index].value = parseInt(inputFields[index].value) + 1;
        updateTotal();
    });
});

// Обработчик события для кнопок "minus"
minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (parseInt(inputFields[index].value) > 0) {
            inputFields[index].value = parseInt(inputFields[index].value) - 1;
            updateTotal();
        }
    });
});

// Функция для обновления общей суммы
function updateTotal() {
    const basicAmount = parseInt(inputFields[0].value);
    const seniorAmount = parseInt(inputFields[1].value);
    const totalPrice = basicAmount * /*цена за билет Basic*/ 20 + seniorAmount * 10/*цена за билет Senior*/;
    totalField.value = totalPrice;
}

// Вызываем функцию для инициализации начальной общей суммы
updateTotal();

// _______________________modal_________________________________________

// Функция для вывода данных из localStorage в модальное окно
function displayDataInModal() {
  const savedData = localStorage.getItem('ticketData');
  if (savedData) {
      const data = JSON.parse(savedData);
      // Здесь вы можете использовать полученные данные для отображения в модальном окне
      // Например:
      // data.ticketsType - тип билета
      // data.basicAmount - количество билетов Basic
      // data.seniorAmount - количество билетов Senior
  }
}

// Добавляем обработчик события к кнопке "Buy Now"
const buyNowButton = document.getElementById('buy-now-button');
buyNowButton.addEventListener('click', function () {
  displayDataInModal(); // Вызываем функцию при нажатии на кнопку "Buy Now"
  // Здесь также можно добавить код для открытия модального окна

  // Открывает модальное окно
function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// Закрывает модальное окно
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Добавляем обработчик события к кнопке "Buy Now"
const buyNowButton = document.getElementById('buy-now-button');
buyNowButton.addEventListener('click', function () {
  displayDataInModal(); // Вызываем функцию для отображения данных в модальном окне
  openModal(); // Открываем модальное окно
});

// Добавляем обработчик события для кнопки закрытия модального окна
const closeButton = document.getElementById('close-modal');
closeButton.addEventListener('click', function () {
  closeModal(); // Закрываем модальное окно
});

});


// ____________________________________________________________




const dateInput = document.getElementById('date-input');

const picker = new DatePicker(dateInput, {
  format: 'yyyy-mm-dd', // Формат даты
  minDate: new Date(), // Минимальная дата (сегодняшний день)
  maxDate: new Date(new Date().getFullYear() + 1, 11, 31), // Максимальная дата (год вперед)
  autohide: true, // Автоматически закрывать календарь после выбора даты
});

































    






