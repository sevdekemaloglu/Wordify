// Kelime Listesi
const wordList = [
    { en: "Beautiful", tr: "Güzel" },
    { en: "Computer", tr: "Bilgisayar" },
    { en: "Tomorrow", tr: "Yarın" },
    { en: "Adventure", tr: "Macera" },
    { en: "Library", tr: "Kütüphane" },
    { en: "Question", tr: "Soru" },
    { en: "Remember", tr: "Hatırlamak" },
    { en: "Together", tr: "Birlikte" },
    { en: "Language", tr: "Dil" },
    { en: "Elephant", tr: "Fil" },
    { en: "Kitchen", tr: "Mutfak" },
    { en: "Success", tr: "Başarı" }
];

// Oyun Durum Değişkenleri
let currentWord = {};// Şu an sorulan kelime
let score = 0;// Toplam puan

// HTML Elemanlarını Seç
const speakBtn = document.getElementById("speak-btn");// Hoparlör butonu
const userInput = document.getElementById("user-input");// Kullanıcının yazdığı kutu
const checkBtn = document.getElementById("check-btn");// Kontrol et butonu
const nextBtn = document.getElementById("next-btn");// Sıradaki butonu
const messageEl = document.getElementById("message");// "Doğru/Yanlış" mesajı
const scoreEl = document.getElementById("score");// Puan göstergesi
const resultArea = document.getElementById("result-area");// Sonuç alanı (Gizli)
const correctAnswerEl = document.getElementById("correct-answer");// Doğru cevabı gösteren alan
const wordRevealEl = document.getElementById("word-reveal");// Doğru kelimenin yazılacağı yer
const translationRevealEl = document.getElementById("translation-reveal");// Türkçe anlamı

// --- OYUNU BAŞLATMA FONKSİYONU
function initGame() {
    score = 0;// Puanı sıfırla
    updateScore();// Ekrana yaz
    loadNewWord();// İlk kelimeyi yükle
}

function loadNewWord() {
    // 1. Rastgele Kelime Seç
    const randomIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[randomIndex];

    // 2. Ekranı Temizle ve Hazırla
    userInput.value = "";// Inputu boşalt
    resultArea.classList.add("hidden-btn");// Sonuç alanını gizle
    nextBtn.classList.add("hidden-btn");// "Sıradaki" butonunu gizle
    correctAnswerEl.classList.add("hidden-btn");// Doğru cevabı gizle
    checkBtn.disabled = false;// "Kontrol et" butonunu aktif yap
    
    userInput.focus();// 3. İmleci kutuya odakla (Kullanıcı hemen yazabilsin)
}

//  METNİ SESE ÇEVİRME 
// Web Speech API kullanarak tarayıcının kelimeyi okumasını sağlar.
function speakWord(text) {
    // Tarayıcı destekliyor mu kontrol et
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();// Varsa önceki konuşmayı durdur

        const utterance = new SpeechSynthesisUtterance(text);// Konuşma objesi oluştur
        utterance.lang = 'en-US'; // Amerikan İngilizcesi aksanı
        utterance.rate = 0.8; // Hız (1 normal, 0.8 biraz yavaş ve anlaşılır)

        window.speechSynthesis.speak(utterance);// Konuş!
    } else {
        alert("Tarayıcınız ses özelliğini desteklemiyor.");
    }
}

// CEVAP KONTROLÜ
function checkAnswer() {
    // Kullanıcının girdisini al, boşlukları temizle ve küçük harfe çevir
    const userText = userInput.value.trim().toLowerCase();
    const correctText = currentWord.en.toLowerCase();// Doğru cevabı da küçük harfe çevir

    if (userText === "") return;// Boşsa işlem yapma

    resultArea.classList.remove("hidden-btn");// Sonuç alanını görünür yap

    if (userText === correctText) {// DOĞRU CEVAPSA
        messageEl.textContent = "Harika! Doğru duydun. 🎉";
        messageEl.className = "correct";// Yeşil renk sınıfı
        translationRevealEl.textContent = `Anlamı: ${currentWord.tr}`;// Türkçesini göster
        score += 10;// Puanı artır
        endTurn();// Turu bitir
    }
    else {// YANLIŞ CEVAPSA
        messageEl.textContent = "Maalesef yanlış. 😔";
        messageEl.className = "wrong";// Kırmızı renk sınıfı
        
        // Doğrusunu Göster
        correctAnswerEl.classList.remove("hidden-btn");
        wordRevealEl.textContent = currentWord.en;// Kelimenin kendisi
        translationRevealEl.textContent = `Anlamı: ${currentWord.tr}`;// Türkçesi
        
        endTurn();// Turu bitir
    }
    updateScore();// Puanı güncelle
}

//  TURU BİTİRME (BUTONLARI AYARLAMA)
function endTurn() {
    checkBtn.disabled = true;// "Kontrol et" butonunu kilitle (Tekrar basılamasın)
    nextBtn.classList.remove("hidden-btn");// "Sıradaki Kelime" butonunu göster
    nextBtn.focus();// Enter'a basınca direkt geçebilsin diye odakla
}

// SKOR GÜNCELLEME
function updateScore() {
    scoreEl.textContent = score;
}

//  OLAY DİNLEYİCİLERİ
speakBtn.addEventListener("click", () => speakWord(currentWord.en));// Hoparlöre basınca oku
checkBtn.addEventListener("click", checkAnswer);// Kontrol et butonuna basınca chechkanswer fonksiyonunu çağır
nextBtn.addEventListener("click", loadNewWord);// Sıradaki butonuna basınca loadnewword fonksiyonunu çağır

// Enter tuşuna basınca cevap verme kolaylığı
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && !checkBtn.disabled) {
        checkAnswer();
    }
});

// Oyunu Başlat
initGame();