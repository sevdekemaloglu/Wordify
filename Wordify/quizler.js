// DOM (Document Object Model) üzerinden gerekli elementleri değişkenlere atıyoruz.
const quizButtons = document.querySelectorAll('.quiz-button'); // A1, A2, B1 gibi tüm seviye butonlarını liste olarak alır
const quizContainer = document.getElementById('quiz-container');// Quiz başladığında görünecek ana kutu
const questionText = document.getElementById('question-text'); // Soru metninin yazılacağı paragrafı seçer
const answersDiv = document.getElementById('answers'); // Cevap butonlarının ekleneceği div'i seçer

// Zamanlayıcı elementleri
const timerDiv = document.getElementById('timer');// "Kalan Süre:" yazan kutu
const timerDisplay = document.getElementById('timer-display') // Sadece sürenin (örn: 10) yazdığı sayı alanı
// Sonuç ve Soru alanları
const resultArea = document.getElementById('result-area'); // Quiz bitince sonucun görüneceği alanı seçer
const questionArea = document.getElementById('question-area'); // Soru ve cevapların bulunduğu alanı seçer
const quizTitle = document.getElementById('quiz-title'); // Quiz başlığının yazılacağı h2 etiketini seçer

//  VERİ YAPISI (DATABASE)
// Bu veri yapısı sayesinde tek bir sayfada tüm seviyelerin sınavını yapabiliyoruz.
const quizData = {//Soruları, cevapları ve doğru cevapları tutan ana nesne.
    A1: [//array
        { soru: "1) What ___ easy for them ?", cevaplar: ["is","are","aren't"], dogrucevap: "is" },//cevaplar da bir array
        { soru: "2) Why ___ these offers interesting ?", cevaplar: ["be","is","are"], dogrucevap: "are" },
        { soru: "3) ___they at the party yesterday ?", cevaplar: ["were","was","have"], dogrucevap: "were" },
        { soru: "4) I didn't ___ TV last night.", cevaplar: ["not watched","watching","watch"], dogrucevap: "watch" },
        { soru: "5) Look!The bus ___.", cevaplar: ["does leave","is leaving","leaves"], dogrucevap: "is leaving" },
        { soru: "6) I've never ___ to England", cevaplar: ["been","went","going"], dogrucevap: "been" },
        { soru: "7) -Do you know a bank near here ? -___ any bank around here.", cevaplar: ["There isn't", "There aren't","Is there"], dogrucevap: "There isn't" },
        { soru: "8) Betty ___ to school on foot.", cevaplar: ["goes always","always go","always goes"], dogrucevap: "always goes" },
        { soru: "9) I have no idea about the project because I ___ at school yesterday.", cevaplar: ["didn't","wasn't","don't"], dogrucevap: "wasn't" },
        { soru: "10) -Would you like to go to the cinema ? - ___ , but I'm busy.", cevaplar: ["That sounds great","I would love to","Why not"], dogrucevap: "I would love to" },
    ],
    A2: [
        { soru: "1) Your clothes smell,and you've got a cough.You ___ smoke.", cevaplar: ["don't have to","shouldn't","should"], dogrucevap: "shouldn't" },
        { soru: "2) Sorry,I'm late.___ for a long time ?", cevaplar: ["Did you wait","Have you waited","Have you been waiting"], dogrucevap: "Have you been waiting" },
        { soru: "3) After they ___ their work,they ___ home.", cevaplar: ["finished / went","had finished / had gone","had finished / went"], dogrucevap: "had finished / went" },
        { soru: "4) Eggs make me sick ___ I can't eat the omelette. ", cevaplar: ["but","so","because"], dogrucevap: "so" },
        { soru: "5) While I ___ this morning,I ___ my money.I don't know how.", cevaplar: ["was shopping / lost","shopped / lose","shopped / was losing"], dogrucevap: "was shopping / lost" },
        { soru: "6) -My bag is so heavy. -Give it to me. ___ for you.", cevaplar: ["I'm going to carry","I carry","I'll carry"], dogrucevap: "I'll carry" },
        { soru: "7) My school starts ____ eight o'clock ___ in the morning.", cevaplar: ["in / at","at / in","on / in"], dogrucevap: "at / in" },
        { soru: "8) My sister is ___ trained teaxher.", cevaplar: ["an","a","some","any"], dogrucevap: "a" },
        { soru: "9) ___ is playing over there ?", cevaplar: ["Which","What","Who","Why"], dogrucevap: "Who" },
        { soru: "10) I knocked the door but ____ aswered.", cevaplar: ["anybody","somebody","someone","nobody"], dogrucevap: "nobody" },
    ],
    B1: [
        { soru: "1) We often hear her ___ at concerts.", cevaplar: ["sang","singing","to sing"], dogrucevap: "singing" },
        { soru: "2) Find the opposite word:lovely-___", cevaplar: ["horrible","expensive","quick"], dogrucevap: "horrible" },
        { soru: "3) The factory ___ he works is closing down.", cevaplar: ["which","where","that"], dogrucevap: "where" },
        { soru: "4) He admitted ___ the car but denied ___ it by himself.", cevaplar: ["stealing / doing","stealing / to do","to steal / doing"], dogrucevap: "stealing / doing" },
        { soru: "5) -Don't you know I'm a football fan ? -___.I shout for Galatasaray.", cevaplar: ["Either do I","So am I","Nor did I"], dogrucevap: "So am I" },
        { soru: "6) I hope this book ___.", cevaplar: ["will be found","will find","were found"], dogrucevap: "will be found" },
        { soru: "7) A liar ___ when he speaks the truth.", cevaplar: ["doesn't believe","believed","isn't believed"], dogrucevap: "isn't believed" },
        { soru: "8) The manner of addressing people in Britain is quite different from ours,___ ?", cevaplar: ["isn't there","isn't it","is it"], dogrucevap: "isn't it" },
        { soru: "9) Which are ___ comfortable,sandals or tennis shoes ?", cevaplar: ["very","more","the most"], dogrucevap: "the most" },
        { soru: "10) Visiters ____ to India's Independence Day from all over the world.", cevaplar: ["come","goes","visit"], dogrucevap: "come" },
    ],
    B2: [
        { soru: "1) It's said that ____ people in the region have lost their home.", cevaplar: ["sevrel thousands","thousands of","almost fifty thousands "], dogrucevap: "thousands of" },
        { soru: "2) He ___ her of marrying him for his money.", cevaplar: ["blamed","warned","accused"], dogrucevap: "accused" },
        { soru: "3) The party lasted ___  all night.", cevaplar: ["-","for","through"], dogrucevap: "-" },
        { soru: "4) Watch out ! This file of books ___ !", cevaplar: ["will fall","will be falling","is going to fall"], dogrucevap: "is going to fall" },
        { soru: "5) They were made ___ it.", cevaplar: ["for doing","to do","done"], dogrucevap: "to do" },
        { soru: "6) Stop laughing ! We can't ___.", cevaplar: ["help it","hold ourselves","do anything against it"], dogrucevap: "help it" },
        { soru: "7) ___ you hurry, you won't catch the train.", cevaplar: ["If","Unless","Except"], dogrucevap: "Unless" },
        { soru: "8) What would you do if you ____ Susan ?", cevaplar: ["would meet","meet","met"], dogrucevap: "met" },
        { soru: "9) Never ___ bussiness with that company.They are unreliable. ", cevaplar: ["do","make","run"], dogrucevap: "do" },
        { soru: "10) Why didn't she let ____ ? ", cevaplar: ["them to go","to go them","them go"], dogrucevap: "them go" },
    ],
    C1: [
        { soru: "1) People were amazed that the burglary took place in ___ daylight.", cevaplar: ["wide","broad","large"], dogrucevap: "broad" },
        { soru: "2) The police claimed that they acted in self ___ .", cevaplar: ["defence","interest","discipline"], dogrucevap: "defence" },
        { soru: "3) I ___ remember putting my briefcase down on that shelf.", cevaplar: ["strongly","entirely","clearly"], dogrucevap: "clearly" },
        { soru: "4) He turned  ___ to be considerably older than I had imagined.", cevaplar: ["out","up","over"], dogrucevap: "out" },
        { soru: "5) The windows in this house are in urgent ___ of replacement.", cevaplar: ["help","need","want"], dogrucevap: "need" },
        { soru: "6) Speed cameras ____ shown to reduce accidents.", cevaplar: ["were being","have","have been"], dogrucevap: "have been" },
        { soru: "7) We may a bit late.We're ___ in traffic jam.", cevaplar: ["stuck","blocked","buried"], dogrucevap: "stuck" },
        { soru: "8) Maintaining an accurate  balance sheet is essential.___ bussiness you are.", cevaplar: ["Whenever","Whatever","Wherever"], dogrucevap: "Whatever" },
        { soru: "9) I don't think the colors in Juia's outfit ___ together.", cevaplar: ["match","fit","go"], dogrucevap: "go" },
        { soru: "10) Very rarely ___ here in July. ", cevaplar: ["is it raining","does it rain","it rains"], dogrucevap: "does it rain" },
    ]
};

// Global Değişkenler: Quiz'in durumu hakkında bilgi tutar.
let currentQuestions = []; // Seçilen seviyeye ait soruların listesi (Örn: Sadece A1 soruları)
let currentQuestionIndex = 0; // Hangi soruda olduğumuzu gösteren sayaç (0'dan başlar)
let correctAnswersCount = 0; // Doğru cevap sayısını tutar
let timerInterval; // Zamanlayıcıyı kontrol eden ve durdurmamızı sağlayan değişken
const TIME_PER_QUESTION = 10; // Her soru için verilen süreyi saniye(10 sn) cinsinden tutar

//BUTONLARA TIKLAMA OLAYI
// Sayfadaki tüm quiz butonlarına (A1, A2 vb.) tıklama özelliği ekliyoruz.
quizButtons.forEach(button => { 
    button.addEventListener('click', function () { 
        const level = this.getAttribute('data-level'); // Tıklanan butonun "data-level" özelliğini (A1, B1 vb.) alır
        startQuiz(level); // Quiz'i bu seviye ile başlatır
        
        quizButtons.forEach(btn => btn.style.display = 'none'); // Seviye seçimi yapıldığı için butonları ekrandan gizle

        // Quiz kutusunu görünür yap
        if (quizContainer) {
            quizContainer.style.display = 'flex'; 
        }
        // Başlığı güncelle (Örn: "A1 Atlama Quizi")
        if (quizTitle) {
            quizTitle.textContent = `${level} Atlama Quizi`; // textcontent değişimi sağlar
        }
    });
});

// fonksiyonlar 
// QUIZ BAŞLATMA FONKSİYONU 
function startQuiz(level) {
    // Görünürlük ayarlarını sıfırla (quiz'e baştan başlamak için)
    if (resultArea) resultArea.style.display = 'none';// Önceki quizden kalan sonuç ekranını gizle
    // Soru alanını ve zamanlayıcıyı görünür yap
    if (questionArea) questionArea.style.display = 'block';
    timerDiv.style.display = 'block';


    currentQuestions = quizData[level];// Seçilen seviyenin sorularını global değişkene yükle
    currentQuestionIndex = 0;//soru sayacını sıfırla
    correctAnswersCount = 0;//doğru cevap sayacını sıfırla

    // Eğer soru varsa yüklemeye başla
    if (currentQuestions && currentQuestions.length > 0) {
        loadQuestion(); 
    } else if (questionText) {
        questionText.textContent = `${level} seviyesi için soru bulunamadı!`; // Soru yoksa hata mesajı gösterir
    }
}

//  SORU YÜKLEME FONKSİYONU
function loadQuestion(){
    clearInterval(timerInterval);// Yeni soruya geçerken eski sayacı durdur
    answersDiv.innerHTML = '';// Önceki sorunun şıklarını temizle
    const q = currentQuestions[currentQuestionIndex]; // Sıradaki soruyu al
    questionText.textContent = q.soru; // Soru metnini ekrana yaz

    // Şıkları buton olarak oluştur ve ekrana ekle
    q.cevaplar.forEach(answer => { 
        const button = document.createElement('button'); // Yeni bir buton elementi oluştur
        button.textContent = answer; // Butonun metnini cevap şıkkı olarak ayarla
        button.className = 'answer-button'; // CSS  için sınıf 
        button.onclick = () => checkAnswer(button,answer, q.dogrucevap); // Tıklanınca cevabı kontrol etme fonksiyonunu çağır
        answersDiv.appendChild(button); // Butonu ekrana ekle
    });

    startTimer(); // Zamanlayıcıyı başlat
}

// ZAMANLAYICI FONKSİYONU
function startTimer() {
    let timeLeft = TIME_PER_QUESTION;// Süreyi 10 saniye yap
    if (timerDisplay) {
        timerDisplay.textContent = timeLeft;//süreyi ekranda göster
    }

    // Her 1 saniyede bir çalışacak döngü
    timerInterval = setInterval(() => {
        if (timerDisplay) {
            timerDisplay.textContent = timeLeft; // Yeni süreyi ekranda göster
        }
        if (timeLeft <= 0) {//süre bittiyse
            clearInterval(timerInterval);//zamanlayıcıyı durdur
            checkAnswer(null,null, currentQuestions[currentQuestionIndex].dogrucevap);//boş cevap yanlış sayılır
        }
    }, 1000);
}

//  CEVAP KONTROL FONKSİYONU
function checkAnswer(clicked_button,selected_answer, correct_answer) {
    clearInterval(timerInterval);//cevap verildiği an süre durdurulur

    const allButtons = answersDiv.querySelectorAll('.answer-button');// Tüm cevap butonlarını seç

    // Kullanıcı bir şıkkı seçtikten sonra diğerlerine tıklayamasın
    allButtons.forEach(btn => {
        btn.disabled = true; // Tüm butonları pasif hale getir

        if (btn.textContent === correct_answer) {// Hangi buton doğru cevapsa onu yeşil yap
            btn.style.backgroundColor = '#4CAF50'; 
            btn.style.color = 'white';
        } else if (btn === clicked_button) {// Kullanıcının yanlış tıkladığı butonu kırmızı yap
            btn.style.backgroundColor = '#f44336'; 
            btn.style.color = 'white';
        } else {// Diğerlerini gri yap
             btn.style.backgroundColor = '#ccc';
        }
    });

    // Puan hesaplama
    if (selected_answer === correct_answer) {//seçilen cevap doğruysa doğru cevap sayısnı 1 arttır
        correctAnswersCount++;
    }

    // 1.5 saniye bekle ve sonraki soruya geç
    setTimeout(() => {
        currentQuestionIndex++;//sonraki soruya geçmek için indexi arttır
        if (currentQuestionIndex < currentQuestions.length) { // Daha yüklenecek soru varsa
        loadQuestion(); // Yeni soruyu yükle
    } else {
        showResults(); // Tüm sorular bittiyse sonuçları göster
    }
    }, 1500);  
}

// SONUÇ GÖSTERME FONKSİYONU
function showResults() {
    // Soru ve zamanlayıcı alanlarını gizle
    questionArea.style.display = 'none';
    timerDiv.style.display = 'none';

    resultArea.style.display = 'block';//// Sonuç alanını göster.önceden gizlemiştik şimdi tekrar gösterme zamanı
    
    const totalquestions = currentQuestions.length;// Toplam soru sayısını alır
    const score = correctAnswersCount;//dogru cevap sayısnı alır
    const successRate = (score / totalquestions) * 100; // Başarı yüzdesini hesaplar

    const finalScoreElement = document.getElementById('final-score'); // Skorun yazılacağı alanı seçer
    const levelStatusElement = document.getElementById('level-status'); // Seviye durumunun yazılacağı alanı seçer

    // Puanı yazdır
    if (finalScoreElement) {
        finalScoreElement.textContent = `Puanınız: ${score} / ${totalquestions} doğru.`; 
    }

    // Seviye atlama durumunu kontrol et (%70 barajı)
    if (levelStatusElement) {
        if (successRate >= 70) { 
            levelStatusElement.innerHTML = 
                'Tebrikler! Quizi başarıyla tamamladınız ve bir sonraki seviyeye geçmeye hak kazandınız.';
            levelStatusElement.style.color = 'green'; // Başarılıysa yazıyı yeşil yapar
        } else {
            levelStatusElement.innerHTML = 
                'Maalesef, seviyeyi atlamak için yeterli doğru sayısına ulaşamadınız.';
            levelStatusElement.style.color = 'red'; // Başarısızsa yazıyı kırmızı yapar
        }
    }
}
