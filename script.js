const startDate = new Date("2025-08-27T22:57:15");

// УЛУЧШЕННАЯ функция для Google Drive
function getDirectLink(url) {
    if (url && url.includes('drive.google.com')) {
        const id = url.split('/d/')[1].split('/')[0];
        // Используем формат uc для прямого отображения
        return `https://drive.google.com/uc?export=view&id=${id}`;
    }
    return url;
}

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
setInterval(updateTimer, 1000);
updateTimer();

// ХРОНОЛОГИЯ (Добавили 8 и 12 сентября)
const timelineData = [
    {
        date: "6 сентября 2025",
        title: "Первая встреча",
        type: "video",
        src: "вторая встреча.mp4", // Если файл лежит рядом с index.html на GitHub
        photo: "https://drive.google.com/file/d/1LKlLc95WqJg7xeKoWoJMZlDOmWtBA_ph/view?usp=drivesdk"
    },
    {
        date: "6 сентября 2025",
        title: "Первые обнимашки",
        type: "video",
        src: "Первые обнимашки.mp4"
    },
    {
        date: "8 сентября 2025",
        title: "Вторые обнимашки",
        type: "video",
        src: "вторые обнимашки.mp4"
    },
    {
        date: "12 сентября 2025, 15:10:58",
        title: "ОФИЦИАЛЬНО НАЧАЛИ ОТНОШЕНИЯ ❤️",
        type: "text",
        desc: "Этот момент изменил всё. Мы стали парой официально!"
    }
];

const timelineContainer = document.getElementById('timeline');

timelineData.forEach(item => {
    const section = document.createElement('section');
    section.className = 'event-card';
    if(item.title.includes("ОФИЦИАЛЬНО")) section.classList.add('special-event');
    
    let mediaHTML = '';
    
    if(item.type === 'video') {
        mediaHTML = `
            <div class="tg-circle" onclick="togglePlay(this)">
                <video src="${item.src}" loop playsinline></video>
                <div class="play-hint">TAP</div>
            </div>`;
    }
    
    if(item.photo) {
        mediaHTML += `<img src="${getDirectLink(item.photo)}" class="event-photo" onerror="this.src='https://via.placeholder.com/400?text=Ошибка+загрузки+фото'">`;
    }

    if(item.desc) {
        mediaHTML += `<p class="event-desc">${item.desc}</p>`;
    }

    section.innerHTML = `
        <div class="event-date">${item.date}</div>
        <h2 class="event-title">${item.title}</h2>
        ${mediaHTML}
    `;
    timelineContainer.appendChild(section);
});

function togglePlay(container) {
    const video = container.querySelector('video');
    if (video.paused) {
        // Чтобы видео загрузилось, принудительно вызываем load если оно не пошло
        if (video.readyState === 0) video.load(); 
        video.play().catch(e => console.log("Ошибка видео:", e));
        container.querySelector('.play-hint').style.opacity = '0';
    } else {
        video.pause();
        container.querySelector('.play-hint').style.opacity = '1';
    }
}
