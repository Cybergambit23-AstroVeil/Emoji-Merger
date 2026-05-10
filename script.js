const emojis = getEmojiList(); // Uses your existing function
let leftEmoji = null;
let rightEmoji = null;

const leftDiv = document.getElementById('left-keyboard');
const rightDiv = document.getElementById('right-keyboard');

function setupKeyboards() {
    emojis.forEach(emoji => {
        // Create left key
        const lKey = document.createElement('div');
        lKey.className = 'key';
        lKey.innerText = emoji;
        lKey.onclick = () => {
            document.querySelectorAll('#left-keyboard .key').forEach(k => k.classList.remove('selected'));
            lKey.classList.add('selected');
            leftEmoji = emoji;
            tryMerge();
        };
        leftDiv.appendChild(lKey);

        // Create right key
        const rKey = document.createElement('div');
        rKey.className = 'key';
        rKey.innerText = emoji;
        rKey.onclick = () => {
            document.querySelectorAll('#right-keyboard .key').forEach(k => k.classList.remove('selected'));
            rKey.classList.add('selected');
            rightEmoji = emoji;
            tryMerge();
        };
        rightDiv.appendChild(rKey);
    });
}

function tryMerge() {
    if (leftEmoji && rightEmoji) {
        mergeEmojis(leftEmoji, rightEmoji); // Uses your existing fetch logic
    }
}

setupKeyboards();
