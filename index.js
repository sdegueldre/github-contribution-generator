const group = (arr, groupSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += groupSize) {
        res.push(arr.slice(i, i+groupSize));
    }
    return res;
}
const toHexByte = byte => byte.toString(16).padStart(2, "0");
const toHex = color => [...color].map(toHexByte).join('');
const daysAgo = (x, y) => (51 - x) * 7 + 6 - y + DAY_OFFSET;
const colorDistance = ([r1, g1, b1], [r2, g2, b2]) => {
    return Math.sqrt(((r2-r1)*0.3)**2 + ((g2-g1)*0.59)**2 + ((b2-b1)*0.11)**2);
}

const DARK_MODE_COLORS = [
    [22, 27, 34],
    [14, 68, 41],
    [0, 109, 50],
    [38, 166, 65],
    [57, 211, 83],
]
const LIGHT_MODE_COLORS = [
    [235, 237, 240],
    [155, 233, 168],
    [64, 196, 99],
    [48, 161, 78],
    [33, 110, 57],
]

const chosenPalette = DARK_MODE_COLORS;

const DAY_OFFSET = new Date().getDay() + 1;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const textarea = document.querySelector("textarea");
const input = document.querySelector("input");
input.addEventListener("change", generateRepo);
generateRepo();

async function generateRepo() {
    const file = input.files[0];
    if (!file) {
        return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    if (!img.complete) {
        await new Promise(r => img.addEventListener("load", r));
    }
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, 52, 7);
    const daysList = group(data, 4).map((px, i) => {
        let nbCommits, closestColor, minDist = Number.POSITIVE_INFINITY;
        chosenPalette.forEach((color, i) => {
            const distance = colorDistance(px, color);
            if (distance < minDist) {
                minDist = distance;
                nbCommits = i;
                closestColor = color;
            }
        });
        const [x, y] = [i%52, Math.floor(i/52)];
        const [r, g, b] = closestColor
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, 1, 1);
        if (nbCommits > 0) {
            return `"${nbCommits};${daysAgo(x, y)}"`;
        }
    }).filter(Boolean).sort((a, b) => b - a).join(" ");
    textarea.value =
`days_ago=(${daysList})

git init
for day in \${days_ago[@]}; do
    IFS=";" read -r -a arr <<< "\${day}"
    for i in $(seq \${arr[0]}); do
        git commit --allow-empty -m "✨" --date "\${arr[1]}.days.ago"
    done
done
`;
}