document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const btnOpen = document.getElementById('btn-open');
    
    const audioTrack = document.getElementById('audio-track');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');

    // 1. Lógica de apertura/Transición suave
    btnOpen.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
            
            // Intento de reproducción automática de la canción solicitada al abrir
            playAudio();
        }, 500);
    });

    // 2. Control del Reproductor de Música
    function playAudio() {
        audioTrack.play().then(() => {
            btnPlayPause.textContent = '⏸';
        }).catch(err => {
            console.log("La reproducción automática requiere interacción previa del usuario.");
        });
    }

    function togglePlay() {
        if (audioTrack.paused) {
            audioTrack.play();
            btnPlayPause.textContent = '⏸';
        } else {
            audioTrack.pause();
            btnPlayPause.textContent = '▶';
        }
    }

    btnPlayPause.addEventListener('click', togglePlay);

    // Actualización de la barra de progreso
    audioTrack.addEventListener('timeupdate', () => {
        if (audioTrack.duration) {
            const progress = (audioTrack.currentTime / audioTrack.duration) * 100;
            progressBar.value = progress;
            
            // Formatear tiempo de reproducción actual (MM:SS)
            let mins = Math.floor(audioTrack.currentTime / 60);
            let secs = Math.floor(audioTrack.currentTime % 60);
            if (secs < 10) secs = '0' + secs;
            currentTimeDisplay.textContent = `${mins}:${secs}`;
        }
    });

    // Cambiar punto de reproducción mediante la barra slider
    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audioTrack.duration;
        audioTrack.currentTime = seekTime;
    });
});
