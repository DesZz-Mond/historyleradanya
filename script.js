const startDate = new Date("2025-08-27T22:57:15");

// Таймер
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

// ХРОНОЛОГИЯ (Все файлы берутся из корня GitHub)
const timelineData = [
    {
        date: "6 сентября 2025",
        title: "Первая встреча",
        type: "mixed",
        video: "первая встреча.mp4",
        photo: "первое фото.jpg"
    },
    {
        date: "6 сентября 2025",
        title: "Первые обнимашки",
        type: "video",
        video: "Первые обнимашки.mp4"
    },
    {
        date: "8 сентября 2025",
        title: "Вторые обнимашки",
        type: "video",
        video: "вторые обнимашки.mp4"
    },
    {
        date: "12 сентября 2025, 15:10:58",
        title: "ОФИЦИАЛЬНО НАЧАЛИ ОТНОШЕНИЯ ❤️",
        type: "text",
        desc: "Этот момент изменил всё. Мы стали парой официально!"
    },
    {
        date: "16 сентября 2025",
        title: "Завариваем чайочек",
        type: "video",
        video: "завариваем чайочек 16 сентября.mp4"
    },
    {
        date: "17 сентября 2025",
        title: "Тигрица богиня",
        type: "video",
        video: "Тигрица богиня 17 сентября.mp4"
    },
    {
        date: "18 сентября 2025",
        title: "В переодевалке",
        type: "video",
        video: "в переодевалке 18 сентября.mp4"
    },
    {
        date: "19 сентября 2025",
        title: "После прогулки по Киеву",
        type: "video",
        video: "После прогулки по киеву вечером 19 сентября.mp4"
    },
    {
        date: "20 сентября 2025",
        title: "Топаем на дополнительное",
        type: "video",
        video: "топаем на дополнительное 20 сентября.mp4"
    },
    {
        date: "21 сентября 2025",
        title: "На дне рождения",
        type: "video",
        video: "на дне рождения 21 сентября.mp4"
    },
    {
        date: "24 сентября 2025",
        title: "Впервые поговорили по телефону 📞",
        type: "text"
    },
    {
        date: "25 сентября 2025",
        title: "Первый видеозвонок 📹",
        type: "text"
    },
    {
        date: "26 сентября 2025",
        title: "Милые волосы",
        type: "video",
        video: "милые волосы 26 сентября.mp4"
    }
];

const timelineContainer = document.getElementById('timeline');

function renderTimeline() {
    timelineContainer.innerHTML = '';
    timelineData.forEach(item => {
        const section = document.createElement('section');
        section.className = 'event-card';
        if(item.title.includes("ОФИЦИАЛЬНО")) section.classList.add('special-event');
        
        let contentHTML = '';
        
        if(item.video) {
            contentHTML += `
                <div class="tg-circle" onclick="togglePlay(this)">
                    <video src="${item.video}" loop playsinline></video>
                    <div class="play-hint">TAP</div>
                </div>`;
        }
        
        if(item.photo) {
            contentHTML += `<img src="${item.photo}" class="event-photo">`;
        }

        if(item.desc) {
            contentHTML += `<p class="event-desc">${item.desc}</p>`;
        }

        section.innerHTML = `
            <div class="event-date">${item.date}</div>
            <h2 class="event-title">${item.title}</h2>
            ${contentHTML}
        `;
        timelineContainer.appendChild(section);
    });
}

function togglePlay(container) {
    const video = container.querySelector('video');
    if (video.paused) {
        video.play().catch(e => console.error("Ошибка воспроизведения:", e));
        container.querySelector('.play-hint').style.opacity = '0';
    } else {
        video.pause();
        container.querySelector('.play-hint').style.opacity = '1';
    }
}

// Запуск отрисовки
renderTimeline();
