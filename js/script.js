function calculateBMI() {
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = parseFloat(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!gender) {
        alert('Masukkan jenis kelamin terlebih dahulu.');
        return;
    }

    if (isNaN(age) || age <= 0) {
        alert('Masukkan usia yang valid.');
        return;
    }

    if (isNaN(height) || height <= 0) {
        alert('Masukkan tinggi badan yang valid.');
        return;
    }

    if (isNaN(weight) || weight <= 0) {
        alert('Masukkan berat badan yang valid.');
        return;
    }

    const bmi = weight / ((height / 100) ** 2);
    const bmiRounded = bmi.toFixed(2);

    let category = '';
    let message = '';
    if (bmi < 18.5) {
        category = 'Kekurangan berat badan';
        message = 'Anda memiliki berat badan kurang.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal (Ideal)';
        message = 'Anda memiliki berat badan ideal.';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = 'Kelebihan berat badan';
        message = 'Anda memiliki berat badan lebih.';
    } else if (bmi >= 30.0) {
        category = 'Kegemukan (Obesitas)';
        message = 'Anda memiliki berat badan sangat berlebih.';
    }

    document.getElementById('bmiCategory').innerText = category;
    document.getElementById('bmiValue').innerText = `${bmiRounded} kg/m²`;
    document.getElementById('bmiMessage').innerText = message;

    const modal = document.getElementById('bmiModal');
    modal.style.display = 'block';

    const span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('bmiCategory').innerText = '';
    document.getElementById('bmiValue').innerText = '';
    document.getElementById('bmiMessage').innerText = '';
});

function downloadResult() {
    const category = document.getElementById('bmiCategory').innerText;
    const value = document.getElementById('bmiValue').innerText;
    const message = document.getElementById('bmiMessage').innerText;

    const resultText = `Hasil BMI\n\nKategori: ${category}\nBMI: ${value}\nPesan: ${message}`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hasil_bmi.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
