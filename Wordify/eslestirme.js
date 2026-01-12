// Oyunda kullanılacak kelimelerin İngilizce ve Türkçe karşılıklarını tutan dizi.
const wordList = [
    { en: "Debate", tr: "Tartışmak" },
    { en: "Permanent", tr: "Kalıcı" },
    { en: "Engineer", tr: "Mühendis" },
    { en: "Network", tr: "Ağ" },
    { en: "Software", tr: "Yazılım" },
    { en: "Accurate", tr: "Doğru" },
    { en: "Savage", tr: "Vahşi" },
    { en: "Duty", tr: "Görev" },
    { en: "Client", tr: "Müşteri" },
    { en: "Justice", tr: "Adalet" },
    { en: "Flavor", tr: "Lezzet" },
    { en: "Verify", tr: "Onaylamak" },
    { en: "Cereal", tr: "Mısır gevreği" },
    { en: "Stingy", tr: "Cimri" }
];

//  HTML ELEMENTLERİNİN SEÇİLMESİ 
const gridContainer = document.getElementById('grid-container');//kartların basıldığı alan
const attemptsEl = document.getElementById('attempts-text');//deneme sayısı
const statusMsg = document.getElementById('status-msg');//doğru eşleşti mi bildirimi
const restartBtn = document.getElementById('restart-btn');//sıfırlama butonu

let cards = [];// Oluşturulan kartları tutacak dizi
let hasFlippedCard = false;//İlk kart açıldı mı?
let lockBoard = false;//Kartlar geçici olarak kilitli mi?
let firstCard, secondCard;// Açılan birinci ve ikinci kartı tutan değişkenler
let attempts = 0;//Kaç deneme yapıldı
let matchedCount = 0;//Kaç çift eşleşti
let totalPairs = 6; // Her oyunda kaç çift kelime olacak?(toplam 12)

// Oyunu Başlatma Fonksiyonu
function initGame() {
    // 1. Değişkenleri Sıfırla
    gridContainer.innerHTML = '';//Önceki oyundan kalan kartları temzile
    attempts = 0;
    matchedCount = 0;
    attemptsEl.innerText = `Deneme: ${attempts}`;
    statusMsg.innerText = "Kartları Eşleştir!";//başlangıç mesajı
    statusMsg.style.color = "#120707ff";
    
    // 2. Rastgele Kelime Seçimi (Havuzdan rastgele 6 tane al)
    // Listeyi karıştır ve ilk 'totalPairs' kadarını al
    let shuffledWords = wordList.sort(() => 0.5 - Math.random()).slice(0, totalPairs);// Math.random() - 0.5 yöntemi basit bir karıştırma algoritmasıdır.

    // 3. Kart Destesi Oluştur (Hem EN hem TR versiyonlarını ekle)
    let deck = [];
    shuffledWords.forEach(word => {
        // İngilizce Kartı
        deck.push({ id: word.en, text: word.en, type: 'en' });
        // Türkçe Kartı (ID aynı olmalı ki eşleşsin)
        deck.push({ id: word.en, text: word.tr, type: 'tr' }); 
    });

    // 4. Kartları Karıştır (Deck shuffle)
    deck.sort(() => 0.5 - Math.random());

    // 5. HTML'e Kartları Bas
    deck.forEach(item => {
        // Ana kart div'ini oluştur
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.framework = item.id; // Eşleşme kontrolü için ID

        // Kartın Ön Yüzü (Kelime)
        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');
        frontFace.innerText = item.text;

        // Kartın Arka Yüzü (Soru İşareti)
        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.innerHTML = '<i class="bi bi-question-lg"></i>'; // Soru işareti ikonu

        // Elementleri iç içe koy
        card.appendChild(frontFace);
        card.appendChild(backFace);
        gridContainer.appendChild(card);

        // Tıklama Olayı Ekle
        card.addEventListener('click', flipCard);//Karta tıklanınca flipCard() çalışır
    });
}

// Kart Çevirme Fonksiyonu
function flipCard() {
    // Eğer sistem kilitliyse (eşleşme kontrolü sürüyorsa) izin verme.
    if (lockBoard) return;
    if (this === firstCard) return;//aynı karta 2 kere tıklandıysa işlem yapma

    this.classList.add('flip'); //CSS ile kart döner

    if (!hasFlippedCard) {
        // Bu, açılan ilk karttır.
        hasFlippedCard = true;
        firstCard = this;// İlk kartı hafızada tut.
        return;
    }

    // Bu, açılan ikinci karttır.
    secondCard = this;// İkinci kartı hafızada tut.
    incrementAttempts(); // Deneme sayısını artır
    checkForMatch();//Eşleşmeyi kontrol et
}

// Eşleşme Kontrolü
function checkForMatch() {
    // dataset.framework değerleri aynı mı? (Elma ve Apple'ın ID'si 'Apple' idi)
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;//ID’ler aynı mı?

    isMatch ? disableCards() : unflipCards();//Eşleştiyse dondur, eşleşmediyse geri çevir.
}

// Eşleşme Başarılıysa
function disableCards() {
    // Kartların tıklama özelliğini kaldır (Artık tıklanamazlar).
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // 1 saniye sonra kartları görünmez yap 
    setTimeout(() => {
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';
        checkWinCondition();// Oyun bitti mi kontrol et.
    }, 1000); 

    statusMsg.innerText = "Doğru Eşleşme! 🎉";
    statusMsg.style.color = "green";

    resetBoard();// sistemi sıfırla (yeni hamle için)
}

// Eşleşme Başarısızsa
function unflipCards() {
    lockBoard = true; // Tahtayı kilitle(Kullanıcı diğer kartlara hemen tıklayamasın)
    statusMsg.innerText = "Eşleşmedi! ❌";
    statusMsg.style.color = "red";

    // 1.5 saniye bekle sonra geri çevir
    setTimeout(() => {
        firstCard.classList.remove('flip');// Flip sınıfını kaldır (Kart kapanır)
        secondCard.classList.remove('flip');

        resetBoard();// Kilidi aç ve değişkenleri temizle
        statusMsg.innerText = "Tekrar dene...";
        statusMsg.style.color = "#555";
    }, 1500); 
}

// Tahtayı ve değişkenleri sıfırla (Her hamle sonrası)
// Her iki kart açıldıktan sonra değişkenleri temizler.
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Deneme Sayacı
function incrementAttempts() {
    attempts++;
    attemptsEl.innerText = `Deneme: ${attempts}`;
}

// Kazanma Kontrolü
function checkWinCondition() {
    matchedCount++;// Bulunan çift sayısını artır
    if (matchedCount === totalPairs) {// Eğer bulunan çift sayısı toplam çifte eşitse oyun biter.
        statusMsg.innerHTML = `Tebrikler! ${attempts} denemede bitirdin! 🏆`;
    }
}

//  YENİDEN BAŞLAT BUTONU 
restartBtn.addEventListener('click', initGame);

// Sayfa Yüklendiğinde Oyunu Başlat
document.addEventListener('DOMContentLoaded', initGame);