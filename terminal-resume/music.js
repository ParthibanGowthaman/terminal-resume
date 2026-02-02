(function() {
    const playerContainer = document.getElementById('music-player');
    const titleEl = document.getElementById('music-title');
    const playToggle = document.getElementById('music-toggle');
    const nextBtn = document.getElementById('music-next');
    const prevBtn = document.getElementById('music-prev');

    const noteFreq = {
        'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
        'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
        'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
        'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
        'C6': 1046.50
    };

    const tracks = [
        {
            title: 'Tetris Theme',
            bpm: 300,
            wave: 'square',
            notes: [
                'E5', 'B4', 'C5', 'D5', 'C5', 'B4', 'A4', 'A4', 'A4', 'C5', 'E5', 'E5', 'D5', 'C5', 'B4', 'B4',
                'B4', 'C5', 'D5', 'D5', 'E5', 'E5', 'C5', 'C5', 'A4', 'A4', 'A4', 'A4', '-', '-', '-', '-',
                'D5', 'D5', 'F5', 'A5', 'A5', 'G5', 'F5', 'E5', 'E5', 'C5', 'E5', 'E5', 'D5', 'C5', 'B4', 'B4',
                'B4', 'C5', 'D5', 'D5', 'E5', 'E5', 'C5', 'C5', 'A4', 'A4', 'A4', 'A4', '-', '-', '-', '-'
            ]
        },
        {
            title: 'Mario Theme',
            bpm: 400,
            wave: 'square',
            notes: [
                'E5', 'E5', '-', 'E5', '-', '-', 'C5', 'E5', '-', '-', 'G5', '-', '-', '-', '-', '-',
                'G4', '-', '-', '-', '-', '-', '-', '-',
                'C5', '-', '-', 'G4', '-', '-', 'E4', '-', '-', '-', 'A4', '-', '-', 'B4', '-', '-',
                'A#4', 'A4', '-', '-', 'G4', 'E5', 'G5', 'A5', '-', '-', 'F5', 'G5', '-', '-', 'E5', '-',
                '-', 'C5', 'D5', 'B4', '-', '-', '-', '-'
            ]
        },
        {
            title: 'Zelda Lullaby',
            bpm: 160,
            wave: 'triangle',
            notes: [
                'B4', '-', 'D5', 'D5', 'A4', 'A4', '-', '-', 'G4', '-', 'A4', '-', '-', '-',
                'B4', '-', 'D5', 'D5', 'A4', 'A4', '-', '-', '-', '-', '-', '-', '-', '-'
            ]
        },
        {
            title: 'Pac-Man',
            bpm: 340,
            wave: 'sine',
            notes: [
                'B4', 'B5', 'F#5', 'D#5', 'B5', 'F#5', 'D#5', '-',
                'C5', 'C6', 'G5', 'E5', 'C6', 'G5', 'E5', '-',
                'B4', 'B5', 'F#5', 'D#5', 'B5', 'F#5', 'D#5', '-',
                'D#5', 'E5', 'F5', 'F5', 'F#5', 'G5', 'G#5', 'A5'
            ]
        },
        {
            title: 'Space Invaders',
            bpm: 220,
            wave: 'sawtooth',
            notes: [
                'A2', '-', 'B2', '-', 'C3', '-', 'B2', '-',
                'A2', '-', 'B2', '-', 'C3', '-', 'B2', '-',
                'G#2', '-', 'A2', '-', 'A#2', '-', 'A2', '-',
                'G#2', '-', 'A2', '-', 'A#2', '-', 'B2', '-'
            ]
        }
    ];

    let audioContext = null;
    let currentIndex = 0;
    let isPlaying = false;
    let scheduledNotes = [];
    let nextNoteTime = 0;
    let currentNote = 0;
    let timerID = null;

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    function playNote(freq, time, duration, waveType) {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = waveType;
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, time);
        filter.Q.setValueAtTime(1, time);

        const volume = 0.08;
        const attack = 0.01;
        const decay = 0.05;
        const sustain = 0.6;
        const release = 0.1;

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(volume, time + attack);
        gain.gain.linearRampToValueAtTime(volume * sustain, time + attack + decay);
        gain.gain.setValueAtTime(volume * sustain, time + duration - release);
        gain.gain.linearRampToValueAtTime(0, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + duration + 0.1);

        scheduledNotes.push({ osc, gain });
    }

    function scheduleNote() {
        const track = tracks[currentIndex];
        const secondsPerBeat = 60.0 / track.bpm;
        const noteDuration = secondsPerBeat * 0.8;

        while (nextNoteTime < audioContext.currentTime + 0.1) {
            const note = track.notes[currentNote];
            if (note !== '-' && noteFreq[note]) {
                playNote(noteFreq[note], nextNoteTime, noteDuration, track.wave);
            }
            nextNoteTime += secondsPerBeat;
            currentNote = (currentNote + 1) % track.notes.length;
        }
    }

    function scheduler() {
        if (!isPlaying) return;
        scheduleNote();
        timerID = setTimeout(scheduler, 25);
    }

    function startPlayback() {
        if (isPlaying) return;
        initAudio();
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        isPlaying = true;
        currentNote = 0;
        nextNoteTime = audioContext.currentTime;
        scheduler();
        updateUI();
    }

    function stopPlayback() {
        isPlaying = false;
        if (timerID) {
            clearTimeout(timerID);
            timerID = null;
        }
        scheduledNotes.forEach(n => {
            try {
                n.osc.stop();
                n.osc.disconnect();
                n.gain.disconnect();
            } catch(e) {}
        });
        scheduledNotes = [];
        updateUI();
    }

    function updateUI() {
        titleEl.textContent = tracks[currentIndex].title;
        playToggle.classList.toggle('playing', isPlaying);
    }

    function nextTrack() {
        const wasPlaying = isPlaying;
        stopPlayback();
        currentIndex = (currentIndex + 1) % tracks.length;
        updateUI();
        if (wasPlaying) startPlayback();
    }

    function prevTrack() {
        const wasPlaying = isPlaying;
        stopPlayback();
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        updateUI();
        if (wasPlaying) startPlayback();
    }

    playToggle.addEventListener('click', () => {
        if (isPlaying) stopPlayback();
        else startPlayback();
    });

    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);

    updateUI();
})();
