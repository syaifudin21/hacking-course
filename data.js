// ===== DATA PEMBELAJARAN =====
const MODULES = [
  {
    id: "etika",
    icon: "📜",
    title: "Etika & Legalitas",
    desc: "Fondasi wajib: apa yang boleh dan tidak boleh dilakukan.",
    lessons: [
      {
        id: "etika-1",
        title: "White Hat vs Black Hat vs Grey Hat",
        body: `<p><strong>White hat</strong> meretas dengan izin untuk memperkuat keamanan. <strong>Black hat</strong> meretas tanpa izin untuk keuntungan pribadi — ini kejahatan. <strong>Grey hat</strong> meretas tanpa izin tapi mengaku "berniat baik" — tetap ilegal di sebagian besar yurisdiksi.</p><p>Di Indonesia, UU ITE mengatur tindak pidana akses ilegal terhadap sistem elektronik. "Niat baik" bukan pembelaan hukum.</p><h4>Prinsip inti:</h4><ul><li>Selalu ada <strong>izin tertulis</strong> sebelum menguji sistem milik orang lain.</li><li>Patuhi <strong>scope</strong> (ruang lingkup) yang disepakati.</li><li>Lakukan <strong>responsible disclosure</strong>: laporkan temuan ke pemilik, beri waktu perbaiki sebelum publikasi.</li></ul>`
      },
      {
        id: "etika-2",
        title: "Jalur Legal untuk Berlatih & Berkarier",
        body: `<p>Kamu tidak perlu melanggar hukum untuk jadi hacker hebat:</p><ul><li><strong>Bug bounty</strong> (HackerOne, Bugcrowd): perusahaan membayar untuk temuan celah di sistem mereka.</li><li><strong>CTF & lab</strong> (TryHackMe, HackTheBox): lingkungan yang memang dibuat untuk diretas.</li><li><strong>Pentest profesional</strong>: diuji dengan kontrak resmi dari klien.</li></ul><p>Mulailah dari lab, bangun portofolio temuan, lalu ikut bug bounty.</p>`
      }
    ]
  },
  {
    id: "jaringan",
    icon: "🌐",
    title: "Dasar Jaringan",
    desc: "Memahami cara komputer berkomunikasi — fondasi semua serangan & pertahanan.",
    lessons: [
      {
        id: "jar-1",
        title: "TCP/IP, IP Address & Port",
        body: `<p>Setiap perangkat di jaringan punya <strong>IP address</strong>. Komunikasi terjadi lewat <strong>port</strong> (misal 80=HTTP, 443=HTTPS, 22=SSH).</p><p><strong>TCP</strong> = koneksi andal (web, email). <strong>UDP</strong> = cepat tanpa jaminan (streaming, DNS).</p><h4>Perintah penting:</h4><ul><li><code>ping</code> — cek konektivitas ke host</li><li><code>ip addr</code> / <code>ifconfig</code> — lihat IP lokal</li><li><code>ss -tulpn</code> — lihat port yang terbuka di mesinmu</li></ul>`
      },
      {
        id: "jar-2",
        title: "DNS & HTTP",
        body: `<p><strong>DNS</strong> menerjemahkan nama domain (google.com) menjadi IP. <strong>HTTP/HTTPS</strong> adalah protokol web: request dari browser, response dari server.</p><p>Pelajari: HTTP methods (GET, POST), status code (200, 404, 500), headers, dan cookies — ini bahasa sehari-hari web hacking.</p>`
      },
      {
        id: "jar-3",
        title: "Model OSI (Sekilas)",
        body: `<p>Tujuh lapisan: Fisik → Data Link → Jaringan → Transport → Sesi → Presentasi → Aplikasi. Serangan terjadi di tiap lapisan: sniffing (lapisan 2), IP spoofing (3), hingga SQL injection (7).</p><p>Tidak perlu hafal mati — pahami konsepnya, dalami saat praktik.</p>`
      }
    ]
  },
  {
    id: "linux",
    icon: "🐧",
    title: "Linux & Command Line",
    desc: "Senjata utama hacker: terminal.",
    lessons: [
      {
        id: "lin-1",
        title: "Perintah Dasar",
        body: `<ul><li><code>ls, cd, pwd</code> — navigasi direktori</li><li><code>cat, less, head, tail</code> — baca file</li><li><code>grep</code> — cari teks dalam file</li><li><code>find</code> — cari file</li><li><code>chmod, chown</code> — izin file</li><li><code>ps, kill, top</code> — proses</li></ul><p>Latihan: install Ubuntu di VM atau WSL, biasakan tanpa GUI selama seminggu.</p>`
      },
      {
        id: "lin-2",
        title: "Bash & Piping",
        body: `<p><code>|</code> (pipe) menyambung output ke input perintah lain. Contoh: <code>cat access.log | grep "404" | sort | uniq -c</code></p><p>Scripting bash dasar mengotomatiskan reconnaissance — skill wajib pentester.</p>`
      }
    ]
  },
  {
    id: "web",
    icon: "🕸️",
    title: "Web Security (OWASP Top 10)",
    desc: "Celah aplikasi web paling umum — teori + cara bertahan.",
    lessons: [
      {
        id: "web-1",
        title: "Injection (SQLi)",
        body: `<p>Terjadi saat input pengguna digabung langsung ke query database. Contoh rentan: <code>SELECT * FROM users WHERE name = '$input'</code> — input <code>' OR '1'='1</code> membobol logika.</p><p><strong>Pertahanan:</strong> prepared statements / parameterized queries, validasi input, least privilege untuk user DB.</p><p>⚠️ Pelajari hanya di lab (DVWA, PortSwigger).</p>`
      },
      {
        id: "web-2",
        title: "XSS (Cross-Site Scripting)",
        body: `<p>Penyerang menyisipkan JavaScript ke halaman yang dilihat korban. Tiga jenis: Stored, Reflected, DOM-based.</p><p><strong>Pertahanan:</strong> output encoding, Content Security Policy (CSP), hindari <code>innerHTML</code> dengan data pengguna.</p>`
      },
      {
        id: "web-3",
        title: "Broken Access Control & Auth",
        body: `<p>Celah #1 di OWASP Top 10 2021: pengguna bisa mengakses data/fungsi yang bukan haknya (misal ubah <code>user_id</code> di URL).</p><p><strong>Pertahanan:</strong> cek otorisasi di server untuk <em>setiap</em> request, jangan percaya client-side saja.</p>`
      }
    ]
  },
  {
    id: "tools",
    icon: "🧰",
    title: "Tools & Metodologi",
    desc: "Alat standar industri dan alur kerja pentest.",
    lessons: [
      {
        id: "tools-1",
        title: "Tahapan Pentest",
        body: `<ol><li><strong>Reconnaissance</strong> — kumpulkan info (whois, subdomain enum, dll.)</li><li><strong>Scanning</strong> — identifikasi port & layanan (Nmap, hanya ke target berizin!)</li><li><strong>Exploitation</strong> — uji celah di scope</li><li><strong>Post-exploitation</strong> — ukur dampak</li><li><strong>Reporting</strong> — dokumentasikan temuan + rekomendasi</li></ol>`
      },
      {
        id: "tools-2",
        title: "Tools Wajib Kenal",
        body: `<ul><li><strong>Nmap</strong> — network scanning</li><li><strong>Burp Suite</strong> — intercept & uji aplikasi web</li><li><strong>Wireshark</strong> — analisis paket jaringan</li><li><strong>Metasploit</strong> — framework exploitasi (lab saja)</li><li><strong>ffuf/gobuster</strong> — fuzzing direktori</li></ul>`
      }
    ]
  },
  {
    id: "kripto",
    icon: "🔐",
    title: "Kriptografi Dasar",
    desc: "Memahami enkripsi — cara data dilindungi.",
    lessons: [
      {
        id: "krip-1",
        title: "Hashing vs Enkripsi",
        body: `<p><strong>Hashing</strong> (SHA-256, bcrypt): satu arah, tidak bisa dibalik. Dipakai untuk menyimpan password — server tidak pernah menyimpan password aslimu.</p><p><strong>Enkripsi</strong> (AES, RSA): dua arah dengan kunci. Simetris (satu kunci, mis. AES) vs asimetris (kunci publik/privat, mis. RSA).</p><p>Aturan: jangan pernah bikin algoritma kripto sendiri — pakai yang standar dan teruji.</p>`
      },
      {
        id: "krip-2",
        title: "HTTPS & TLS",
        body: `<p>HTTPS = HTTP + TLS. Melindungi data antara browser dan server dari penyadapan (sniffing) dan modifikasi.</p><p>Sebagai ethical hacker: cek apakah situs memaksa HTTPS (HSTS), sertifikat valid, dan tidak ada mixed content. Tools: <code>curl -v</code>, SSL Labs.</p>`
      },
      {
        id: "krip-3",
        title: "Password Cracking (Teori)",
        body: `<p>Serangan: dictionary attack (daftar password umum), brute force (coba semua kombinasi), rainbow table (hash precomputed).</p><p><strong>Pertahanan:</strong> bcrypt/argon2 dengan salt, password panjang, MFA. Pahami ini untuk mengaudit kekuatan password — hanya di lab (Hashcat dengan hash buatan sendiri).</p><p>⚠️ Jangan pernah crack password milik orang lain.</p>`
      }
    ]
  },
  {
    id: "karier",
    icon: "🚀",
    title: "Karier & Sertifikasi",
    desc: "Dari belajar menjadi profesional dibayar.",
    lessons: [
      {
        id: "kar-1",
        title: "Bug Bounty: Mulai dari Sini",
        body: `<p>Daftar di HackerOne/Bugcrowd, baca scope program, mulai dari celah umum (XSS, IDOR, open redirect). Dokumentasikan metodologi — laporan yang rapi dibayar lebih baik.</p><p>Tips: fokus pada sedikit program, pahami aplikasinya dalam-dalam, jangan asal tembak.</p>`
      },
      {
        id: "kar-2",
        title: "Sertifikasi",
        body: `<ul><li><strong>eJPT</strong> — entry-level pentest (murah, praktik)</li><li><strong>CEH</strong> — dikenal HRD, lebih teori</li><li><strong>OSCP</strong> — standar emas pentest (24 jam lab, sulit, sangat dihargai)</li><li><strong>Security+</strong> — fondasi security umum</li></ul>`
      }
    ]
  }
];

const QUIZZES = [
  {
    id: "q-linux",
    title: "Kuis: Linux",
    questions: [
      { q: "Perintah untuk mencari teks dalam file:", opts: ["find", "grep", "locate", "ps"], a: 1 },
      { q: "Apa fungsi pipe (|)?", opts: ["Menghapus file", "Menyambung output ke input perintah lain", "Membuat direktori", "Mematikan proses"], a: 1 },
      { q: "Perintah melihat proses berjalan:", opts: ["ls", "ps", "cd", "cat"], a: 1 },
      { q: "chmod 755 artinya:", opts: ["Semua bisa tulis", "Owner full, lainnya baca+eksekusi", "Hanya owner bisa baca", "File terhapus"], a: 1 }
    ]
  },
  {
    id: "q-kripto",
    title: "Kuis: Kriptografi",
    questions: [
      { q: "Perbedaan hashing dan enkripsi:", opts: ["Sama saja", "Hash satu arah, enkripsi dua arah dengan kunci", "Hash lebih lambat", "Enkripsi tidak aman"], a: 1 },
      { q: "Algoritma yang tepat untuk menyimpan password:", opts: ["MD5", "SHA-1", "bcrypt/argon2", "Base64"], a: 2 },
      { q: "HTTPS melindungi dari:", opts: ["Virus", "Penyadapan data di jaringan", "Spam", "Iklan"], a: 1 }
    ]
  },
  {
    id: "q-tools",
    title: "Kuis: Tools & Metodologi",
    questions: [
      { q: "Tahap pertama dalam pentest:", opts: ["Exploitation", "Reconnaissance", "Reporting", "Scanning"], a: 1 },
      { q: "Burp Suite digunakan untuk:", opts: ["Scan jaringan", "Intercept & uji aplikasi web", "Crack password", "Analisis malware"], a: 1 },
      { q: "Nmap berfungsi untuk:", opts: ["Edit foto", "Network scanning", "Menulis laporan", "Chat"], a: 1 }
    ]
  },
  {
    id: "q-etika",
    title: "Kuis: Etika & Legalitas",
    questions: [
      { q: "Apa syarat utama sebelum menguji keamanan sistem milik orang lain?", opts: ["Niat baik", "Izin tertulis dari pemilik", "Skill yang cukup", "Tools yang lengkap"], a: 1 },
      { q: "Apa itu responsible disclosure?", opts: ["Menyebar temuan ke publik segera", "Melaporkan temuan ke pemilik dan memberi waktu perbaiki", "Merahasiakan temuan selamanya", "Menjual temuan ke pihak ketiga"], a: 1 },
      { q: "Grey hat hacking itu…", opts: ["Selalu legal", "Meretas tanpa izin dengan klaim niat baik — tetap berisiko hukum", "Jenis sertifikasi", "Tools hacking"], a: 1 }
    ]
  },
  {
    id: "q-jaringan",
    title: "Kuis: Dasar Jaringan",
    questions: [
      { q: "Port default untuk HTTPS adalah…", opts: ["80", "21", "443", "22"], a: 2 },
      { q: "Fungsi DNS adalah…", opts: ["Mengenkripsi data", "Menerjemahkan domain menjadi IP", "Memblokir serangan", "Mempercepat CPU"], a: 1 },
      { q: "Perintah untuk melihat port terbuka di Linux:", opts: ["ls -la", "ss -tulpn", "cat /etc/passwd", "ping"], a: 1 }
    ]
  },
  {
    id: "q-web",
    title: "Kuis: Web Security",
    questions: [
      { q: "Pertahanan utama terhadap SQL Injection:", opts: ["Sembunyikan URL", "Prepared statements", "Ganti nama tabel", "Blokir browser"], a: 1 },
      { q: "XSS memungkinkan penyerang…", opts: ["Mematikan server", "Menjalankan JavaScript di browser korban", "Mencuri kabel", "Menghapus DNS"], a: 1 },
      { q: "Celah #1 OWASP Top 10 (2021):", opts: ["XSS", "Broken Access Control", "SQL Injection", "CSRF"], a: 1 }
    ]
  }
];
