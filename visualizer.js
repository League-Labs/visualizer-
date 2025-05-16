const barsContainer = document.getElementById('bars');
const startBtn = document.getElementById('startBtn');
const shuffleBtn = document.getElementById('shuffleBtn');

let array = [];
const BAR_COUNT = 30;

function randomArray() {
    return Array.from({length: BAR_COUNT}, () => Math.floor(Math.random() * 200) + 20);
}

function renderBars(arr, activeIdx = -1, sortedIdx = -1) {
    barsContainer.innerHTML = '';
    arr.forEach((value, idx) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = value + 'px';
        if (idx === activeIdx) bar.classList.add('active');
        if (idx <= sortedIdx) bar.classList.add('sorted');
        barsContainer.appendChild(bar);
    });
}

async function insertionSortVisual(arr) {
    startBtn.disabled = true;
    shuffleBtn.disabled = true;
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        renderBars(arr, i, i-1);
        await sleep(300);
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            renderBars(arr, j+1, i-1);
            await sleep(300);
        }
        arr[j + 1] = key;
        renderBars(arr, j+1, i);
        await sleep(300);
    }
    renderBars(arr, -1, arr.length-1);
    startBtn.disabled = false;
    shuffleBtn.disabled = false;
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

// Initial render
shuffle();
