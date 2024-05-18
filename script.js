let reminders = [];

function startRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Seu navegador não suporta reconhecimento de voz. Por favor, use o Google Chrome.');
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';

    recognition.onstart = function() {
        console.log('Reconhecimento de voz iniciado. Fale seu lembrete.');
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log('Você disse: ', transcript);
        processReminder(transcript);
    };

    speak('Pronto para te lembrar');
    recognition.start();
}

function processReminder(transcript) {
    const currentDateTime = new Date();
    const reminder = {
        text: transcript.trim(),
        date: currentDateTime.toLocaleString()
    };

    reminders.push(reminder);
    updateRemindersList();
    respond('Ok, lembrete guardado!');
}

function updateRemindersList() {
    const remindersList = document.getElementById('reminders-list');
    remindersList.innerHTML = '';

    reminders.forEach((reminder) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Lembrete: ${reminder.text} (Adicionado em: ${reminder.date})`;
        remindersList.appendChild(listItem);
    });
}

function respond(message) {
    speak(message);
}

function speak(message) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'pt-BR';
    speechSynthesis.speak(utterance);
}
