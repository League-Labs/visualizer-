const barsContainer = document.getElementById('bars');
const startBtn = document.getElementById('startBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const sizeRange = document.getElementById('sizeRange');
const sizeValue = document.getElementById('sizeValue');
const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
const reverseBtn = document.getElementById('reverseBtn');
const almostSortedBtn = document.getElementById('almostSortedBtn');

let array = [];
let BAR_COUNT = parseInt(sizeRange.value);
let ANIMATION_SPEED = parseInt(speedRange.value);

sizeRange.oninput = function() {
    BAR_COUNT = parseInt(this.value);
    sizeValue.textContent = this.value;
    array = randomArray();
    renderBars(array);
};

speedRange.oninput = function() {
    ANIMATION_SPEED = parseInt(this.value);
    speedValue.textContent = this.value + 'ms';
};

function randomArray() {
    return Array.from({length: BAR_COUNT}, () => Math.floor(Math.random() * 200) + 20);
}

function reverseArray() {
    array = Array.from({length: BAR_COUNT}, (_, i) => 220 - i * (200 / BAR_COUNT));
    renderBars(array);
}

function almostSortedArray() {
    array = Array.from({length: BAR_COUNT}, (_, i) => 20 + i * (200 / BAR_COUNT));
    // Swap a few random elements
    for (let i = 0; i < Math.max(2, Math.floor(BAR_COUNT / 10)); i++) {
        const idx1 = Math.floor(Math.random() * BAR_COUNT);
        const idx2 = Math.floor(Math.random() * BAR_COUNT);
        [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
    }
    renderBars(array);
}

function renderBars(arr, activeIdx = -1, sortedIdx = -1, compareIdx = -1) {
    barsContainer.childNodes.forEach((bar, idx) => {
        if (arr[idx] !== undefined) {
            bar.style.height = arr[idx] + 'px';
            bar.className = 'bar';
            if (idx === activeIdx) bar.classList.add('active');
            if (idx <= sortedIdx) bar.classList.add('sorted');
            if (idx === compareIdx) bar.classList.add('compare');
        }
    });
}

function createBars(arr) {
    barsContainer.innerHTML = '';
    arr.forEach(() => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        barsContainer.appendChild(bar);
    });
}

async function insertionSortVisual(arr) {
    startBtn.disabled = true;
    shuffleBtn.disabled = true;
    reverseBtn.disabled = true;
    almostSortedBtn.disabled = true;
    sizeRange.disabled = true;
    speedRange.disabled = true;
    createBars(arr);
    renderBars(arr);
    await sleep(ANIMATION_SPEED);
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        renderBars(arr, i, i-1, j);
        await sleep(ANIMATION_SPEED);
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            renderBars(arr, i, i-1, j);
            await sleep(ANIMATION_SPEED);
            j = j - 1;
        }
        arr[j + 1] = key;
        renderBars(arr, i, i, j+1);
        await sleep(ANIMATION_SPEED);
    }
    renderBars(arr, -1, arr.length-1);
    startBtn.disabled = false;
    shuffleBtn.disabled = false;
    reverseBtn.disabled = false;
    almostSortedBtn.disabled = false;
    sizeRange.disabled = false;
    speedRange.disabled = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle() {
    array = randomArray();
    renderBars(array);
}

startBtn.onclick = () => insertionSortVisual(array.slice());
shuffleBtn.onclick = shuffle;
reverseBtn.onclick = reverseArray;
almostSortedBtn.onclick = almostSortedArray;

// Initial render
shuffle();
