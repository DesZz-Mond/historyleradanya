// Дата начала отношений
const startDate = new Date("2025-08-27T22:57:15");

// Функция исправления ссылок Google Drive
function getDirectLink(url) {
    if (url.includes('drive.google.com')) {
        const id = url.split('/d/')[1].split('/')[0];
        return `https://docs.google.com/uc?export=view&id=${id}`;
    }
    return url;
}

// Функция Таймера
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("love-timer").innerHTML = 
        `Мы вместе уже: <br> <span>${days}д. ${hours}ч. ${minutes}м. ${seconds}с.</span>`;
}

// Запуск таймера каждую секунду
setInterval(updateTimer, 1000);
updateTimer();

// Массив с первыми данными (начало хронологии)
const timelineData = [
    {
        date: "6 сентября 2025",
        title: "Первая встреча",
        type: "video",
        src: "videos/первая встреча.mp4", // Файл из GitHub
        photo: "https://drive.google.com/file/d/1LKlLc95WqJg7xeKoWoJMZlDOmWtBA_ph/view?usp=drivesdk"
    },
    {
        date: "6 сентября 2025",
        title: "Первые обнимашки",
        type: "video",
        src: "videos/Первые обнимашки.mp4"
    }
];

// Функция для отрисовки хронологии
const timelineContainer = document.getElementById('timeline');

timelineData.forEach(item => {
    const section = document.createElement('section');
    section.className = 'event-card';
    
    let mediaHTML = '';
    if(item.type === 'video') {
        mediaHTML = `
            <div class="tg-circle" onclick="togglePlay(this)">
                <video src="${item.src}" loop playsinline></video>
                <div class="play-hint">TAP</div>
            </div>`;
    }
    
    if(item.photo) {
        mediaHTML += `<img src="${getDirectLink(item.photo)}" class="event-photo">`;
    }

    section.innerHTML = `
        <div class="event-date">${item.date}</div>
        <h2 class="event-title">${item.title}</h2>
        ${mediaHTML}
    `;
    timelineContainer.appendChild(section);
});

// Функция для паузы/плея кружочков
function togglePlay(container) {
    const video = container.querySelector('video');
    if (video.paused) {
        video.play();
        container.querySelector('.play-hint').style.opacity = '0';
    } else {
        video.pause();
        container.querySelector('.play-hint').style.opacity = '1';
    }
}