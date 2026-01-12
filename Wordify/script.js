// HTML sayfasındaki gerekli butonları ve kutuları değişkenlere atıyoruz.
const start_button = document.querySelector(".start_button");
const quiz = document.querySelector(".quiz");// Kurallar kutusu
const exit_btn = quiz.querySelector(".second_start");// quizin içindeki second_start.document de olurdu
const continue_btn = quiz.querySelector(".second_start .started");// başla butonu (Kurallar kısmındaki)
const quiz_box = document.querySelector(".quiz_box");// Soruların olduğu ana kutu
const result_box = document.querySelector(".result_box");// Sonuç kutusu
const option_list = document.querySelector(".option_list");// Şıkların listelendiği alan
const timeCount = document.querySelector(".timer .saniye");// Süre sayacı
const next_btn = document.querySelector(".seviye-footer .next_btn"); //  "Sonraki Soru" butonu

//quize başlandığında böyle görünür
let soru_suresi = 20;// Her soru için 20 saniye
let que_count = 0;// Şu anki sorunun dizideki index numarası (0'dan başlar)
let soru_no = 1;// Ekranda görünen soru numarası (1'den başlar)
let puan = 0;// Toplam doğru sayısı
let sayac;// Geri sayım sayacı değişkeni

start_button.onclick = () => {//teste başlaya tıklandığında
    quiz.classList.add("activeInfo");//kurallar kutusunu görnğnğr yap
}
exit_btn.onclick = () => {
    quiz.classList.remove("activeInfo");// Kurallar kutusunu gizle
}

continue_btn.onclick = () => {// 3. Kuralları okuyup "Başla" butonuna tıklanınca (TEST BAŞLIYOR)
    quiz.classList.remove("activeInfo");// Kurallar kutusunu kapat
    quiz_box.classList.add("activeQuiz");// Soru kutusunu aç
    show_questions(0);// İlk soruyu ekrana getir
    soru_sayaci(1);// Alt kısımdaki soru sayacını güncelle
    start_timer(20);// 20 saniyelik süreyi başlat
}

const started_quiz = result_box.querySelector(".second_start .started");// 4. Sonuç ekranındaki "Tekrar" butonuna tıklanınca
started_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");// Quiz kutusunu tekrar aç
    result_box.classList.remove("activeResult");// Sonuç kutusunu gizle
    // Değerleri sıfırla
    soru_suresi = 20;
    que_count = 0;
    soru_no = 1;
    puan = 0;

    show_questions(que_count);// İlk soruyu yükle
    soru_sayaci(soru_no);// Sayacı sıfırla
    clearInterval(sayac);//eski sayacı temizle
    start_timer(soru_suresi);// Süreyi yeniden başlat
    next_btn.classList.remove("show");// Sonraki butonunu gizle
}

const bottom_que_sayac = document.querySelector("footer .toplam_soru");// Alt kısımdaki soru sayacı elementi

// SORULARI EKRAÑA YAZDIRMA FONKSİYONU 
function show_questions(index) {
    const soru_text = document.querySelector(".soru_text");
    let photo="";//sorulara fotoğraf eklenecekse
    let soru;
    // Sorunun numarasına göre uygun resmi HTML'e ekliyoruz
    if (questions[index].soru_num == 1) {
        photo = "<img class='answer_image' src='img/fransa.jpg'>";
        // Soru metnini ve resmi birleştirip değişkene atıyoruz
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 2) {
        photo = "<img class='answer_image' src='img/football.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 3) {
        photo = "<img class='answer_image' src='img/cleaning.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 4) {
        photo = "<img class='answer_image' src='img/turistik.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 5) {
        photo = "<img class='answer_image' src='img/footballmatch.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 6) {
        photo = "<img class='answer_image' src='img/cinema.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 7) {
        photo = "<img class='answer_image' src='img/station.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 8) {
        photo = "<img class='answer_image' src='img/concert.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 9) {
        photo = "<img class='answer_image' src='img/cold.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 10) {
        photo = "<img class='answer_image' src='img/book.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 11) {
        photo = "<img class='answer_image' src='img/drive.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 12) {
        photo = "<img class='answer_image' src='img/ticket.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 13) {
        photo = "<img class='answer_image' src='img/fireworks.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 14) {
        photo = "<img class='answer_image' src='img/rainy.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 15) {
        photo = "<img class='answer_image' src='img/bus.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 16) {
        photo = "<img class='answer_image' src='img/vegetarian.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 17) {
        photo = "<img class='answer_image' src='img/car.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 18) {
        photo = "<img class='answer_image' src='img/bedroom.jpeg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 19) {
        photo = "<img class='answer_image' src='img/cake.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
    else if (questions[index].soru_num == 20) {
        photo = "<img class='answer_image' src='img/phone.jpg'>";
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '<br>' + photo + '</span>';
    }
        
    else {//soruda fotograf yoksa
        soru = '<span>' + questions[index].soru_num + "." + questions[index].question + '</span>';
    }
    soru_text.innerHTML = soru;// Soruyu HTML içine yazdırıyoruz
    // Şıkları döngüyle oluşturuyoruz
    let option_tag = '';
    for (i = 0; i < questions[index].secenekler.length; i++){
        // Her bir şık için bir div oluşturuyoruz
        option_tag+='<div class="option"><span>' + questions[index].secenekler[i] + '</span></div>';
    };
    option_list.innerHTML = option_tag;// Şıkları HTML'e ekliyoruz
    // Oluşturulan şıklara tıklama özelliği (onclick) ekliyoruz
    const option = option_list.querySelectorAll(".option");
    for (i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionselected(this)");
        // 'this' parametresi tıklanan şıkkı temsil eder
    }
}

// --- ŞIK SEÇİLDİĞİNDE ÇALIŞAN FONKSİYON ---
function optionselected(cevap) {
    clearInterval(sayac);//şıkkı seçince süre durur
    let kullanici_cvp = cevap.textContent;// Kullanıcının seçtiği metin
    let true_ans = questions[que_count].cevap;// Doğru cevap
    const alloptions = option_list.children.length;// Toplam şık sayısı

    // Doğru mu Yanlış mı kontrolü
    if (kullanici_cvp == true_ans) {
        puan += 1;// Puanı artır
        cevap.classList.add("correct");// Yeşil renk sınıfını ekle
    }
    else {
        cevap.classList.add("incorrect");// Kırmızı renk sınıfını ekle

        // Yanlış seçilirse, doğru olan şıkkı bulup onu da yeşil yap (Kullanıcı doğrusunu görsün)
        for (i = 0; i < alloptions; i++){
            if (option_list.children[i].textContent == true_ans) {
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }

    // Bir şık seçildikten sonra diğerlerine tıklanmasını engelle
    for (i = 0; i < alloptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    window.setTimeout(auto_past, 2000);//2s bekle ve otomatik olarak sonraki soruya geç
}

// OTOMATİK GEÇİŞ FONKSİYONU 
auto_past = () => {
    if (que_count < questions.length - 1) {// Eğer daha soru varsa
        que_count++;// Indexi artır
        soru_no++;// Soru numarasını artır
        show_questions(que_count);//yeni soruyu göster
        soru_sayaci(soru_no);//sayacı güncelle
        clearInterval(sayac);// Önceki sayacı temizle
        start_timer(soru_suresi);// Yeni süre başlat

        next_btn.classList.remove("show");// Butonu gizle (Otomatik geçiş olduğu için
    }
    else {// Soru kalmadıysa sonuç ekranını göster
        sonuc_ekrani();
    }
}

//  SONUÇ EKRANI FONKSİYONU 
function sonuc_ekrani(){
    quiz_box.classList.remove("activeQuiz");// Soru kutusunu gizle
    result_box.classList.add("activeResult");// Sonuç kutusunu göster

    const score_text = result_box.querySelector(".score_text");
    const level_text = result_box.querySelector(".level_text");
    let seviye = '';
    const toplam_soru = questions.length;

    // Seviye Hesaplama Mantığı
    if (puan == toplam_soru) {
        seviye = "C1";
    }
    else if (puan >= toplam_soru * 0.8) {
        seviye = "B2";
    }
    else if (puan >= toplam_soru * 0.6) {
        seviye = "B1";
    }
    else if (puan >= toplam_soru * 0.4) {
        seviye = "A2";
    }
    else {
        seviye = "A1";
    }

    // Sonuç metinlerini HTML'e yazdır
    let score_tag = '<span>Toplam Doğru Sayısı: <p>' + puan + '</p> / <p>' + toplam_soru + '</p></span>';//puan ve soru sayısının oranı yazılır
    score_text.innerHTML = score_tag;//aktarma
    let level_tag = '<span>Seviyeniz: <p class="level_badge">' + seviye + '</p></span>';//seviye sonucu göze çarpsın diye level badge kullandık
    level_text.innerHTML = level_tag;
}

// GERİ SAYIM SAYACI (TIMER) 
function start_timer(time) {
    sayac = setInterval(timer, 1000);// setInterval her 1000 milisaniyede (1 saniye) 'timer' fonksiyonunu çalıştırır

    function timer() {
        timeCount.textContent = time;// Süreyi ekrana yaz
        time--;// Süreyi azalt

        if (time < 0) {// Süre biterse
            clearInterval(sayac);// Sayacı durdur
            // Süre bitince otomatik olarak doğru cevabı göster
            const alloptions = option_list.children.length;
            let true_ans = questions[que_count].cevap;

            for (i = 0; i < alloptions; i++){
                if (option_list.children[i].textContent == true_ans) {
                    option_list.children[i].setAttribute("class", "option correct");
                }
            }
            // Şıklara tıklamayı engelle
            for (i = 0; i < alloptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            window.setTimeout(auto_past, 2000);// 2 saniye sonra diğer soruya geç
        }
    }
}

//  ALT KISIMDAKİ SORU SAYACI GÜNCELLEME
function soru_sayaci(index) {
    let totalQueCounTag = '<span>Skor: <p>' + puan + '</p> / <p>' + index + '</p> </span>';
    bottom_que_sayac.innerHTML = totalQueCounTag;
}