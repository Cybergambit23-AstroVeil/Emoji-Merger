// This function generates common emoji ranges automatically
function getEmojiList() {
    const emojiRanges = [
        [0x1F600, 0x1F64F], // Smileys & Emoticons
        [0x1F300, 0x1F5FF], // Symbols & Pictographs
        [0x1F680, 0x1F6FF], // Transport & Map
        [0x1F900, 0x1F9FF], // Supplemental Symbols (Food, Animals, etc.)
        [0x2600, 0x26FF]    // Classic Symbols
    ];

    let allEmojis = [];
    for (const [start, end] of emojiRanges) {
        for (let i = start; i <= end; i++) {
            allEmojis.push(String.fromCodePoint(i));
        }
    }
    return allEmojis;
}

const emojis = getEmojiList();
let selection = [null, null];

const keyboard = document.getElementById('keyboard');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const result = document.getElementById('result');

// 1. Create the massive Keyboard
emojis.forEach(emoji => {
    const btn = document.createElement('div');
    btn.className = 'key';
    btn.innerText = emoji;
    btn.onclick = () => selectEmoji(emoji);
    keyboard.appendChild(btn);
});

// 2. Selection Logic
function selectEmoji(emoji) {
    if (selection[0] === null) {
        selection[0] = emoji;
        slot1.innerText = emoji;
    } else {
        selection[1] = emoji;
        slot2.innerText = emoji;
        mergeEmojis();
    }
}

// 3. Merging Logic
function mergeEmojis() {
    if (selection[0] && selection[1]) {
        // This combines them visually into one box
        result.innerText = selection[0] + selection[1];
    }
}

// 4. Save to My Keyboard
document.getElementById('save-btn').onclick = () => {
    const savedEmoji = result.innerText;
    if (savedEmoji !== "?") {
        const btn = document.createElement('div');
        btn.className = 'key';
        btn.innerText = savedEmoji;
        // This allows you to pick a merged emoji to merge AGAIN!
        btn.onclick = () => selectEmoji(savedEmoji);
        document.getElementById('saved-keyboard').appendChild(btn);
        
        // Reset slots for the next merge
        selection = [null, null];
        slot1.innerText = "➕";
        slot2.innerText = "➕";
        result.innerText = "?";
    }
};

// 5. Theme Toggle
document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
};
