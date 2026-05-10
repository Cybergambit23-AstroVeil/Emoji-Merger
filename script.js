function getEmojiList() {
    // These are the emojis most likely to have "Kitchen" merges
    const emojiRanges = [[0x1F600, 0x1F64F], [0x1F900, 0x1F9FF]];
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
const resultImg = document.getElementById('merged-img');
const placeholder = document.getElementById('result-placeholder');

// Create Keyboard
emojis.forEach(emoji => {
    const btn = document.createElement('div');
    btn.className = 'key';
    btn.innerText = emoji;
    btn.onclick = () => selectEmoji(emoji);
    keyboard.appendChild(btn);
});

function selectEmoji(emoji) {
    if (selection[0] === null) {
        selection[0] = emoji;
        slot1.innerText = emoji;
    } else {
        selection[1] = emoji;
        slot2.innerText = emoji;
        mergeEmojis(selection[0], selection[1]);
    }
}

async function mergeEmojis(e1, e2) {
    const code1 = e1.codePointAt(0).toString(16).toLowerCase();
    const code2 = e2.codePointAt(0).toString(16).toLowerCase();
    
    // Google's Emoji Kitchen URL format
    const url = `https://gstatic.com{code1}/u${code1}_u${code2}.png`;

    placeholder.innerText = "⏳"; 
    
    let img = new Image();
    img.src = url;
    img.onload = () => {
        placeholder.style.display = "none";
        resultImg.src = url;
        resultImg.style.display = "block";
    };
    img.onerror = () => {
        // Try swapping them if the first way didn't work
        const altUrl = `https://gstatic.com{code2}/u${code2}_u${code1}.png`;
        img.src = altUrl;
        img.onerror = () => {
            placeholder.innerText = "❌"; 
            placeholder.style.display = "block";
            resultImg.style.display = "none";
        };
    };
}

// Reset and Save Logic
document.getElementById('save-btn').onclick = () => {
    if (resultImg.style.display === "block") {
        const newKey = document.createElement('img');
        newKey.src = resultImg.src;
        newKey.className = 'key';
        newKey.style.width = "50px";
        document.getElementById('saved-keyboard').appendChild(newKey);
        
        // Reset for next merge
        selection = [null, null];
        slot1.innerText = "➕";
        slot2.innerText = "➕";
        resultImg.style.display = "none";
        placeholder.style.display = "block";
        placeholder.innerText = "?";
    }
};

document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
};
