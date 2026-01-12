// Elemanları seç
const form = document.getElementById('wordForm');// Formun kendisi
const engInput = document.getElementById('engWord');// İngilizce kelime kutusu
const trInput = document.getElementById('trWord');// Türkçe kelime kutusu

// Form gönderildiğinde çalışacak fonksiyon
form.addEventListener('submit', function(e) {
    //  Sayfanın yenilenmesini engelle
    e.preventDefault();

    //  Değerleri al
    const englishWord = engInput.value.trim();// .trim() boşlukları temizler
    const turkishWord = trInput.value.trim();

   
    if (englishWord && turkishWord) {
        
        //  LocalStorage'dan mevcut listeyi çek
        // Eğer liste yoksa boş bir dizi [] oluştur.
        let learnedList = JSON.parse(localStorage.getItem('myaddedWords')) || [];

        // Kelimeyi listeye obje olarak ekle { en: "Apple", tr: "Elma" }
        learnedList.push({
            en: englishWord,
            tr: turkishWord
        });

        // Güncellenmiş listeyi tekrar LocalStorage'a kaydet (String'e çevirerek)
        localStorage.setItem('myaddedWords', JSON.stringify(learnedList));

        //  kullanıcıya bilgi ver
        alert(`Başarılı! "${englishWord}" kelimesi listenize eklendi.`);
        console.log(`Eklendi: ${englishWord} - ${turkishWord}`);//consoleda görünür

        //  Inputları temizle ve imleci başa al
        engInput.value = '';
        trInput.value = '';
        engInput.focus();//İmleci tekrar İngilizce kelime inputuna getirir.
    }
});