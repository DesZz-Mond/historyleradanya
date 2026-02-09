const startDate = new Date("2025-08-27T22:57:15");

// Таймер (проверенная версия)
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const timerElement = document.getElementById("love-timer");
    if (timerElement) {
        timerElement.innerHTML = `Мы вместе уже: <br> <span>${days}д. ${hours}ч. ${minutes}м. ${seconds}с.</span>`;
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// Массив данных с ПРОВЕРЕННЫМИ названиями из твоего списка
const timelineData = [
    {
        date: "6 сентября 2025",
        title: "Первая встреча",
        video: "первая встреча.mp4", 
        photo: "первое фото.jpg" 
    },
    {
        date: "6 сентября 2025",
        title: "Первые обнимашки",
        video: "Первые обнимашки.mp4"
    },
    {
        date: "8 сентября 2025",
        title: "Вторые обнимашки",
        video: "вторые обнимашки.mp4"
    },
    {
        date: "12 сентября 2025, 15:10:58",
        title: "ОФИЦИАЛЬНО НАЧАЛИ ОТНОШЕНИЯ ❤️",
        type: "special",
        desc: "Этот момент изменил всё. Мы стали парой официально!"
    }
];

const timelineContainer = document.getElementById('timeline');

function renderTimeline() {
    if (!timelineContainer) return;
    timelineContainer.innerHTML = '';

    timelineData.forEach(item => {
        const section = document.createElement('section');
        section.className = 'event-card';
        if (item.type === 'special') section.classList.add('special-event');
        
        let mediaHTML = '';

        // Обработка видео (Кружочки)
        if (item.video) {
            mediaHTML += `
                <div class="tg-circle" onclick="togglePlay(this)">
                    <video preload="metadata" loop playsinline onerror="console.error('Ошибка видео:', '${item.video}')">
                        <source src="${encodeURIComponent(item.video)}" type="video/mp4">
                        Ваш браузер не поддерживает видео.
                    </video>
                    <div class="play-hint">TAP</div>
                </div>`;
        }

        // Обработка фото
        if (item.photo) {
            mediaHTML += `
                <div class="photo-container">
                    <img src="${encodeURIComponent(item.photo)}" 
                         alt="${item.title}" 
                         class="event-photo" 
                         onerror="this.parentElement.innerHTML='<p class=\"error-msg\">Фото не найдено: ${item.photo}</p>'">
                </div>`;
        }

        if (item.desc) {
            mediaHTML += `<p class="event-desc">${item.desc}</p>`;
        }

        section.innerHTML = `
            <div class="event-date">${item.date}</div>
            <h2 class="event-title">${item.title}</h2>
            ${mediaHTML}
        `;
        timelineContainer.appendChild(section);
    });
}

function togglePlay(container) {
    const video = container.querySelector('video');
    if (!video) return;

    if (video.paused) {
        video.play().catch(error => {
            console.error("Автовоспроизведение заблокировано или файл не найден:", error);
        });
        container.querySelector('.play-hint').style.opacity = '0';
    } else {
        video.pause();
        container.querySelector('.play-hint').style.opacity = '1';
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', renderTimeline);
