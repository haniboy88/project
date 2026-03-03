function bukaUndangan() {
  const nama = document.getElementById('namaTamu').value.trim();
  const regexHurufSpasi = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  const regexDigit = /\d/;

  // 1. Cek kosong
  if (!nama) {
    alert("Masukkan namamu dulu ya 😄");
    return;
  }

  // 2. Minimal 3 huruf
  if (nama.length <= 2) {
    alert("Nama terlalu pendek, minimal 3 huruf 😉");
    return;
  }

  // 3. Tanpa angka
  if (regexDigit.test(nama)) {
    alert("Nama tidak boleh mengandung angka 😅");
    return;
  }

  // 4. Tanpa simbol atau emot
  if (!regexHurufSpasi.test(nama)) {
    alert("Nama hanya boleh huruf dan spasi—tanpa simbol atau emotikon 🚫");
    return;
  }

  // Deteksi kata tidak sopan
  const kataTerlarang = ["anjing", "babi", "bangsat", "tolol", "goblok", "kontol", "memek", "ngentot", "asu", "tai", "sinting",
    "idiot", "kampret", "jancuk", "jembut", "pepek", "pler", "ngentod", "bencong", "banci", "lonte", "pelacur", "perek", "sange",
    "bejat", "brengsek", "sialan", "keparat", "bokep", "bajingan", "setan", "iblis", "anjir", "ngaceng", "anjiong", "oyang", "omang",
    "pantek", "pantex", "panteq", "cunek", "cunex", "cuneq", "galodiu", "galodiuw","bangke", "bangsat", "bacot", "bacod", "bacok", "bacod", "brengos", "brengsek", "brengsekk", 
    "gblk", "goblog", "goblo", "goblokkk", "tololll", "tulul", 
    "asu", "asw", "anjay", "anjayyy", "anjrot", "anjret", "anjrit", "kampang", "kampret", "kampang", 
    "kehed", "keparatt", "parat", "kontl", "kntl", "memk", "mmk", "meki", "mek", 
    "ngent0t", "ngntt", "ngentt", "entot", "jancok", "jancokk", "cok", "cuk", 
    "bgsd", "bngst", "taii", "taik", "tahi", "setann", "ibliss", 
    "bajingann", "pelacurr", "lontee", "perek", "bencongg", "bancii", "sintingg", "idiott", "bejad", "bejattt"];
  const namaLower = nama.toLowerCase();

  for (let kata of kataTerlarang) {
    if (namaLower.includes(kata)) {
      alert("Ups! Nama yang kamu masukkan mengandung kata tidak pantas 😳");
      return;
    }
  }

  // Format huruf awal tiap kata jadi kapital
  const namaFormat = nama
    .toLowerCase()
    .split(' ')
    .map(kata => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(' ');

  // Semua validasi lolos → tampilkan nama dan tombol lihat undangan
  document.getElementById('formNama').style.display = 'none'; // sembunyikan form input
  document.getElementById('namaTampil').textContent = namaFormat;
  document.getElementById('namaTampil2').textContent = namaFormat;
  document.getElementById('undangan').classList.add('show');
  document.getElementById('undangan').style.display = 'block'; // pastikan undangan tampil

  // Tampilkan tombol "Lihat Undangan"
  document.getElementById('lihatundangan').style.display = 'block';

  // Simpan nama yang sudah diformat ke localStorage
  localStorage.setItem('namaTamu', namaFormat);
}

function lihatUndangan() {
  // Sembunyikan cover dan tampilkan undangan1
  document.getElementById('cover').style.display = 'none';
  document.getElementById('undangan1').style.display = 'block';

  // Memutar audio
  const musik = document.getElementById('musik');
  musik.muted = false;
  musik.play().catch(error => {
    console.log("Autoplay dicegah browser:", error);
    // Bisa tambahkan interaksi user untuk memutar musik
  });
}

// HAPUS semua event listener lama yang double

// Setup event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  // Sembunyikan undangan dan tombol lihat undangan saat awal
  document.getElementById('undangan').style.display = 'none';
  document.getElementById('lihatundangan').style.display = 'none';
  
  // Event klik tombol buka (validasi)
  document.getElementById('btnBuka').addEventListener('click', bukaUndangan);
  
  // Event klik tombol lihat undangan
  document.getElementById('lihatundangan').addEventListener('click', lihatUndangan);
  
  // Animasi observer
  const elemenAnimasi = document.querySelectorAll('.textpasangan');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aktif');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elemenAnimasi.forEach(el => {
    observer.observe(el);
  });
});

// Bisa juga tambahkan event untuk input enter
document.getElementById('namaTamu').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    bukaUndangan();
  }
});