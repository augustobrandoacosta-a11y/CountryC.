let currentStage = 1;

// Drawing Setup
function setupCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    let drawing = false;

    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.beginPath();
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = canvasId === 'landCanvas' ? 'green' : 'black';

        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    });
}

// Initialize both canvases
setupCanvas('landCanvas');
setupCanvas('flagCanvas');

// Image Importer for Flag
document.getElementById('imageLoader').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('flagCanvas');
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 300, 200);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

function clearCanvas(id) {
    const canvas = document.getElementById(id);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

function nextStage(stageNum) {
    document.getElementById(`stage${currentStage}`).style.display = 'none';
    document.getElementById(`stage${stageNum}`).style.display = 'block';
    currentStage = stageNum;
}

function finishCountry() {
    const name = document.getElementById('countryName').value;
    const continent = document.getElementById('continent').value;
    
    // Convert canvases to images
    const landImg = document.getElementById('landCanvas').toDataURL();
    const flagImg = document.getElementById('flagCanvas').toDataURL();

    // Show Results
    document.getElementById('stage3').style.display = 'none';
    document.getElementById('finalResult').style.display = 'block';
    
    document.getElementById('display-name').innerText = name || "Unnamed Land";
    document.getElementById('display-continent').innerText = "Located in " + continent;
    document.getElementById('finalLand').src = landImg;
    document.getElementById('finalFlag').src = flagImg;
}
