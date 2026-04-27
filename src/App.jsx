import React, { useEffect, useMemo, useState } from "react";

const SHOPIER_FEATURED_LINK = "https://shopier.com/46018405";

const PALETTE = {
  coral: "#E45D50",
  sage: "#9BC78F",
  aqua: "#76BFBE",
  teal: "#58ADAD",
  slate: "#3C4A5F",
  bg: "#F5F7F8",
  white: "#FFFFFF",
  text: "#233044",
  softText: "#5D6B7F",
  border: "#DDE5EA",
  warm: "#FFF2EC",
};

const featuredSeed = [
  {
    id: 1,
    title: "Garson Aranıyor",
    company: "Mavi Masa Kafe",
    location: "İstanbul / Kadıköy",
    salary: "Günlük 1.200 TL + yemek",
    type: "Günlük",
    description:
      "Servis ve karşılama süreçlerinde destek olacak, güler yüzlü ekip arkadaşı aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    category: "Kafe & Restoran",
    workAddress: "İstanbul / Kadıköy",
    contactName: "Mavi Masa Yetkilisi",
    contactPhone: "0555 111 22 33",
  },
  {
    id: 2,
    title: "Etkinlik Karşılama Elemanı",
    company: "Nova Organizasyon",
    location: "Ankara / Çankaya",
    salary: "Günlük 1.500 TL",
    type: "Part Time",
    description:
      "Etkinlik giriş alanında misafir karşılama ve yönlendirme görevlerinde çalışacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    category: "Etkinlik & Organizasyon",
    workAddress: "Ankara / Çankaya",
    contactName: "Nova Organizasyon",
    contactPhone: "0555 222 33 44",
  },
  {
    id: 3,
    title: "Kurye Aranıyor",
    company: "Hızlı Paket",
    location: "İzmir / Bornova",
    salary: "Saatlik 200 TL + prim",
    type: "Saatlik",
    description:
      "Yoğun saatlerde teslimat süreçlerinde görev alacak, hızlı ve dikkatli kurye aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    category: "Kurye & Dağıtım",
    workAddress: "İzmir / Bornova",
    contactName: "Hızlı Paket",
    contactPhone: "0555 333 44 55",
  },
];

const jobsSeed = [
  {
    id: 11,
    title: "Depo Düzenleme Personeli",
    company: "Anka Lojistik",
    location: "Bursa / Nilüfer",
    salary: "Saatlik 180 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
    workAddress: "Bursa / Nilüfer",
    contactName: "Anka Lojistik",
    contactPhone: "0555 444 55 66",
    description:
      "Ürün yerleştirme, raf düzenleme ve temel depo operasyonlarında görev alacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 12,
    title: "Kasiyer Aranıyor",
    company: "Çarşı Market",
    location: "Antalya / Muratpaşa",
    salary: "Günlük 1.000 TL",
    type: "Günlük",
    category: "Satış & Mağaza",
    workAddress: "Antalya / Muratpaşa",
    contactName: "Çarşı Market",
    contactPhone: "0555 555 66 77",
    description:
      "Yoğun mağaza temposuna uyum sağlayabilecek, kasa deneyimi olan ya da öğrenmeye açık ekip arkadaşı.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 13,
    title: "Ofis Destek Elemanı",
    company: "Vera Danışmanlık",
    location: "İstanbul / Şişli",
    salary: "Part Time 12.000 TL / ay",
    type: "Part Time",
    category: "Ofis & Yardımcı İşler",
    workAddress: "İstanbul / Şişli",
    contactName: "Vera Danışmanlık",
    contactPhone: "0555 666 77 88",
    description:
      "Dosyalama, evrak takibi ve günlük ofis işlerine destek verecek ekip arkadaşı aranıyor.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 14,
    title: "Temizlik Personeli",
    company: "Temiz Nokta",
    location: "Eskişehir / Odunpazarı",
    salary: "Günlük 1.100 TL",
    type: "Günlük",
    category: "Temizlik",
    workAddress: "Eskişehir / Odunpazarı",
    contactName: "Temiz Nokta",
    contactPhone: "0555 777 88 99",
    description:
      "Ofis ve ortak kullanım alanlarının günlük temizliğinden sorumlu olacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 15,
    title: "Barista Yardımcısı",
    company: "Köpük Kahve",
    location: "İzmir / Karşıyaka",
    salary: "Part Time 11.500 TL / ay",
    type: "Part Time",
    category: "Kafe & Restoran",
    workAddress: "İstanbul / Kadıköy",
    contactName: "Mavi Masa Yetkilisi",
    contactPhone: "0555 111 22 33",
    description:
      "Kahve hazırlık süreçlerinde destek verecek, müşteri ilişkileri güçlü ekip arkadaşı aranıyor.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 16,
    title: "Paketleme Personeli",
    company: "Hızlı Koli",
    location: "Kocaeli / Gebze",
    salary: "Saatlik 175 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
    workAddress: "Bursa / Nilüfer",
    contactName: "Anka Lojistik",
    contactPhone: "0555 444 55 66",
    description:
      "Sipariş paketleme, etiketleme ve sevkiyat hazırlığında görev alacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 17,
    title: "Mağaza Destek Personeli",
    company: "Merkez AVM Stand",
    location: "Adana / Seyhan",
    salary: "Günlük 1.250 TL",
    type: "Günlük",
    category: "Satış & Mağaza",
    workAddress: "Antalya / Muratpaşa",
    contactName: "Çarşı Market",
    contactPhone: "0555 555 66 77",
    description:
      "Stand düzeni, ürün tanıtımı ve müşteri yönlendirme alanlarında görev alacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
  },
  {
    id: 18,
    title: "Sosyal Medya İçerik Yardımcısı",
    company: "Studio Mini",
    location: "Uzaktan / Türkiye",
    salary: "Part Time 13.000 TL / ay",
    type: "Part Time",
    category: "Freelance / Dijital",
    workAddress: "Uzaktan / Türkiye",
    contactName: "Studio Mini",
    contactPhone: "0555 000 11 22",
    description:
      "Temel içerik hazırlama, paylaşım planlama ve dijital destek süreçlerinde çalışacak ekip arkadaşı aranıyor.",
    createdAt: "2026-04-14T10:00:00",
  },
];

const categories = [
  "Tümü",
  "Kafe & Restoran",
  "Kurye & Dağıtım",
  "Depo & Lojistik",
  "Temizlik",
  "Etkinlik & Organizasyon",
  "Satış & Mağaza",
  "Ofis & Yardımcı İşler",
  "İnşaat & Fiziksel İş",
  "Freelance / Dijital",
];

const types = ["Tümü", "Günlük", "Saatlik", "Part Time"];

const cities = ["Tümü", "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"];

function getDaysAgoLabel(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  if (diffDays === 0) return "Bugün yayında";
  if (diffDays === 1) return "1 gündür yayında";
  return `${diffDays} gündür yayında`;
}

function inferCategory(title) {
  const lower = title.toLocaleLowerCase("tr-TR");
  if (lower.includes("garson") || lower.includes("barista") || lower.includes("kafe")) return "Kafe & Restoran";
  if (lower.includes("kurye") || lower.includes("dağıtım")) return "Kurye & Dağıtım";
  if (lower.includes("depo") || lower.includes("paketleme") || lower.includes("lojistik")) return "Depo & Lojistik";
  if (lower.includes("temizlik")) return "Temizlik";
  if (lower.includes("etkinlik") || lower.includes("organizasyon") || lower.includes("karşılama")) return "Etkinlik & Organizasyon";
  if (lower.includes("mağaza") || lower.includes("kasiyer") || lower.includes("satış") || lower.includes("stand")) return "Satış & Mağaza";
  if (lower.includes("ofis") || lower.includes("destek")) return "Ofis & Yardımcı İşler";
  if (lower.includes("içerik") || lower.includes("dijital")) return "Freelance / Dijital";
  return "Ofis & Yardımcı İşler";
}

function formatSalaryPreview(workType, salary) {
  if (!salary) return "";
  const formatted = new Intl.NumberFormat("tr-TR").format(Number(salary));
  if (workType === "Saatlik") return `Saatlik ${formatted} TL`;
  if (workType === "Part Time") return `Part Time ${formatted} TL / ay`;
  return `Günlük ${formatted} TL`;
}

function getJobVisualKey(job) {
  const text = `${job.title || ""} ${job.category || ""}`.toLocaleLowerCase("tr-TR");
  if (text.includes("kurye") || text.includes("dağıtım")) return "delivery";
  if (text.includes("etkinlik") || text.includes("organizasyon") || text.includes("karşılama")) return "people";
  if (text.includes("garson") || text.includes("barista") || text.includes("kafe") || text.includes("restoran")) return "service";
  if (text.includes("depo") || text.includes("paketleme") || text.includes("lojistik")) return "box";
  if (text.includes("mağaza") || text.includes("satış") || text.includes("kasiyer")) return "store";
  return "briefcase";
}

function CategoryIcon({ job }) {
  const key = getJobVisualKey(job);

  if (key === "delivery") {
    const footerInfoContent = {
    about: {
      title: "Hakkımızda",
      blocks: [
        {
          type: "p",
          text: "Ekiş; günlük, saatlik, part time ve ek gelir odaklı iş fırsatlarını iş arayanlarla buluşturan modern bir ilan platformudur.",
        },
        {
          type: "p",
          text: "Amacımız, klasik kariyer sitelerinden farklı olarak hızlı işe alım süreçlerini kolaylaştırmak ve kısa süreli, vardiyalı, ek iş ve dönemsel personel ihtiyaçlarını tek bir güvenilir platformda toplamaktır.",
        },
        {
          type: "p",
          text: "Ekiş üzerinde yayınlanan ilanlar; mağaza, kafe, organizasyon, kurye, depo, etkinlik, satış destek, dönemsel personel ve benzeri birçok sektörü kapsar.",
        },
        {
          type: "note",
          text: "Ekiş yalnızca ilan ve iletişim altyapısını sağlar. İşe alım süreci, görüşmeler ve çalışma koşulları işveren ile aday arasında yürütülür.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları",
      blocks: [
        {
          type: "p",
          text: "Ekiş platformunu kullanan tüm kullanıcılar aşağıdaki şartları kabul etmiş sayılır:",
        },
        {
          type: "list",
          items: [
            "Yayınlanan ilan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
            "Yanıltıcı, sahte, eksik veya hukuka aykırı ilanlar yayınlanamaz.",
            "Kullanıcılar yalnızca yasal ve etik kurallara uygun ilan yayınlayabilir.",
            "Ekiş, gerekli gördüğü durumlarda ilanı yayından kaldırma hakkını saklı tutar.",
            "Platform üzerinden gerçekleşen işe alım süreçlerinden doğabilecek anlaşmazlıklardan Ekiş doğrudan sorumlu değildir.",
            "Ücretli Ekiş Acil ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Kullanıcılar iletişim bilgilerini doğru ve ulaşılabilir şekilde paylaşmakla yükümlüdür.",
            "Sistem kötüye kullanımı, sahte ilan veya dolandırıcılık şüphesi durumunda erişim sınırlandırılabilir.",
          ],
        },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası",
      blocks: [
        {
          type: "p",
          text: "Ekiş, kullanıcı bilgilerinin gizliliğini önemser. Toplanan bilgiler yalnızca ilan yayınlama, kullanıcı iletişimi, ödeme işlemleri ve yasal yükümlülükler amacıyla kullanılır.",
        },
        {
          type: "list",
          items: [
            "Ad soyad veya firma adı",
            "Telefon numarası",
            "E-posta adresi",
            "İşveren iletişim bilgileri",
            "Ücretli ilanlarda gerekli fatura bilgileri",
          ],
        },
        {
          type: "p",
          text: "Kullanıcı verileri izinsiz şekilde üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluklar kapsamında resmi kurumlarla paylaşılabilir.",
        },
        {
          type: "note",
          text: "Ödeme işlemleri güvenli ödeme altyapıları üzerinden gerçekleştirilir. Kart bilgileri doğrudan ödeme sağlayıcısı tarafından işlenir; Ekiş bu bilgilere erişmez.",
        },
      ],
    },
    contact: {
      title: "İletişim",
      blocks: [
        {
          type: "p",
          text: "Ekiş ile iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek: destek@ekis.com",
            "İş birliği / Kurumsal: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Resmi talepler ve iş ortaklığı başvuruları için e-posta üzerinden iletişim kurulması önerilir.",
        },
      ],
    },
    cityJobs: {
      title: "Şehre Göre İşler",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te ilanları şehir filtresiyle kolayca daraltabilir, yaşadığınız yere yakın günlük, saatlik ve part time iş fırsatlarını keşfedebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Arama alanında şehir seçimi yaparak ilanları filtreleyebilirsiniz.",
            "İstanbul, Ankara, İzmir, Eskişehir, Bursa ve diğer tüm şehirlerdeki ilanları tek ekranda görebilirsiniz.",
            "Uzaktan / Türkiye seçeneğiyle dijital ve freelance işleri de inceleyebilirsiniz.",
          ],
        },
        {
          type: "note",
          text: "Şehre göre arama yapmak için üstteki filtre alanındaki “Şehir seç” bölümünü kullanabilirsiniz.",
        },
      ],
    },
    faq: {
      title: "Sık Sorulanlar",
      blocks: [
        {
          type: "p",
          text: "Ekiş hakkında en sık sorulan soruları burada özetledik.",
        },
        {
          type: "list",
          items: [
            "İlanlara başvurmak için üyelik zorunlu değildir; ilan detayındaki iletişim bilgileri üzerinden işverenle görüşebilirsiniz.",
            "İşe alım süreci ve görüşmeler işveren ile aday arasında yürütülür.",
            "Ekiş Acil, daha görünür olmak isteyen işverenlerin ilanlarını öne çıkaran özel alandır.",
            "Sahte, yanıltıcı veya hukuka aykırı ilanlar yayından kaldırılabilir.",
            "İlan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
          ],
        },
      ],
    },
    pricing: {
      title: "Fiyatlandırma",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te standart ilan yayınlama ücretsizdir. Daha görünür olmak isteyen işverenler Ekiş Acil alanını tercih edebilir.",
        },
        {
          type: "list",
          items: [
            "Standart ilan: Ücretsiz olarak yayınlanır ve tüm ilanlar listesinde görünür.",
            "Ekiş Acil ilanı: İlanınızı ana sayfadaki özel alanda daha görünür hale getirir.",
            "Ücretli ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Fiyatlar ve paket detayları sistem aktif ödeme altyapısına geçtiğinde güncellenebilir.",
          ],
        },
        {
          type: "note",
          text: "Şu an demo/MVP aşamasında olduğumuz için fiyatlandırma ve ödeme süreci final entegrasyon öncesi netleştirilecektir.",
        },
      ],
    },
    support: {
      title: "Destek Al",
      blocks: [
        {
          type: "p",
          text: "İlan verme, ilan düzenleme, Ekiş Acil kullanımı veya teknik sorunlar için destek ekibimizle iletişime geçebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek e-postası: destek@ekis.com",
            "Kurumsal iletişim: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Daha hızlı destek için mesajınızda firma adınızı, ilan başlığınızı ve yaşadığınız sorunu kısaca belirtmeniz önerilir.",
        },
      ],
    },
  };

  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M18 39h24l5-12h7l4 12h-6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 39h5l4-18h23" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="45" r="5" stroke="currentColor" strokeWidth="4" />
        <circle cx="48" cy="45" r="5" stroke="currentColor" strokeWidth="4" />
      </svg>
    );
  }

  if (key === "people") {
    const footerInfoContent = {
    about: {
      title: "Hakkımızda",
      blocks: [
        {
          type: "p",
          text: "Ekiş; günlük, saatlik, part time ve ek gelir odaklı iş fırsatlarını iş arayanlarla buluşturan modern bir ilan platformudur.",
        },
        {
          type: "p",
          text: "Amacımız, klasik kariyer sitelerinden farklı olarak hızlı işe alım süreçlerini kolaylaştırmak ve kısa süreli, vardiyalı, ek iş ve dönemsel personel ihtiyaçlarını tek bir güvenilir platformda toplamaktır.",
        },
        {
          type: "p",
          text: "Ekiş üzerinde yayınlanan ilanlar; mağaza, kafe, organizasyon, kurye, depo, etkinlik, satış destek, dönemsel personel ve benzeri birçok sektörü kapsar.",
        },
        {
          type: "note",
          text: "Ekiş yalnızca ilan ve iletişim altyapısını sağlar. İşe alım süreci, görüşmeler ve çalışma koşulları işveren ile aday arasında yürütülür.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları",
      blocks: [
        {
          type: "p",
          text: "Ekiş platformunu kullanan tüm kullanıcılar aşağıdaki şartları kabul etmiş sayılır:",
        },
        {
          type: "list",
          items: [
            "Yayınlanan ilan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
            "Yanıltıcı, sahte, eksik veya hukuka aykırı ilanlar yayınlanamaz.",
            "Kullanıcılar yalnızca yasal ve etik kurallara uygun ilan yayınlayabilir.",
            "Ekiş, gerekli gördüğü durumlarda ilanı yayından kaldırma hakkını saklı tutar.",
            "Platform üzerinden gerçekleşen işe alım süreçlerinden doğabilecek anlaşmazlıklardan Ekiş doğrudan sorumlu değildir.",
            "Ücretli Ekiş Acil ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Kullanıcılar iletişim bilgilerini doğru ve ulaşılabilir şekilde paylaşmakla yükümlüdür.",
            "Sistem kötüye kullanımı, sahte ilan veya dolandırıcılık şüphesi durumunda erişim sınırlandırılabilir.",
          ],
        },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası",
      blocks: [
        {
          type: "p",
          text: "Ekiş, kullanıcı bilgilerinin gizliliğini önemser. Toplanan bilgiler yalnızca ilan yayınlama, kullanıcı iletişimi, ödeme işlemleri ve yasal yükümlülükler amacıyla kullanılır.",
        },
        {
          type: "list",
          items: [
            "Ad soyad veya firma adı",
            "Telefon numarası",
            "E-posta adresi",
            "İşveren iletişim bilgileri",
            "Ücretli ilanlarda gerekli fatura bilgileri",
          ],
        },
        {
          type: "p",
          text: "Kullanıcı verileri izinsiz şekilde üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluklar kapsamında resmi kurumlarla paylaşılabilir.",
        },
        {
          type: "note",
          text: "Ödeme işlemleri güvenli ödeme altyapıları üzerinden gerçekleştirilir. Kart bilgileri doğrudan ödeme sağlayıcısı tarafından işlenir; Ekiş bu bilgilere erişmez.",
        },
      ],
    },
    contact: {
      title: "İletişim",
      blocks: [
        {
          type: "p",
          text: "Ekiş ile iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek: destek@ekis.com",
            "İş birliği / Kurumsal: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Resmi talepler ve iş ortaklığı başvuruları için e-posta üzerinden iletişim kurulması önerilir.",
        },
      ],
    },
    cityJobs: {
      title: "Şehre Göre İşler",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te ilanları şehir filtresiyle kolayca daraltabilir, yaşadığınız yere yakın günlük, saatlik ve part time iş fırsatlarını keşfedebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Arama alanında şehir seçimi yaparak ilanları filtreleyebilirsiniz.",
            "İstanbul, Ankara, İzmir, Eskişehir, Bursa ve diğer tüm şehirlerdeki ilanları tek ekranda görebilirsiniz.",
            "Uzaktan / Türkiye seçeneğiyle dijital ve freelance işleri de inceleyebilirsiniz.",
          ],
        },
        {
          type: "note",
          text: "Şehre göre arama yapmak için üstteki filtre alanındaki “Şehir seç” bölümünü kullanabilirsiniz.",
        },
      ],
    },
    faq: {
      title: "Sık Sorulanlar",
      blocks: [
        {
          type: "p",
          text: "Ekiş hakkında en sık sorulan soruları burada özetledik.",
        },
        {
          type: "list",
          items: [
            "İlanlara başvurmak için üyelik zorunlu değildir; ilan detayındaki iletişim bilgileri üzerinden işverenle görüşebilirsiniz.",
            "İşe alım süreci ve görüşmeler işveren ile aday arasında yürütülür.",
            "Ekiş Acil, daha görünür olmak isteyen işverenlerin ilanlarını öne çıkaran özel alandır.",
            "Sahte, yanıltıcı veya hukuka aykırı ilanlar yayından kaldırılabilir.",
            "İlan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
          ],
        },
      ],
    },
    pricing: {
      title: "Fiyatlandırma",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te standart ilan yayınlama ücretsizdir. Daha görünür olmak isteyen işverenler Ekiş Acil alanını tercih edebilir.",
        },
        {
          type: "list",
          items: [
            "Standart ilan: Ücretsiz olarak yayınlanır ve tüm ilanlar listesinde görünür.",
            "Ekiş Acil ilanı: İlanınızı ana sayfadaki özel alanda daha görünür hale getirir.",
            "Ücretli ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Fiyatlar ve paket detayları sistem aktif ödeme altyapısına geçtiğinde güncellenebilir.",
          ],
        },
        {
          type: "note",
          text: "Şu an demo/MVP aşamasında olduğumuz için fiyatlandırma ve ödeme süreci final entegrasyon öncesi netleştirilecektir.",
        },
      ],
    },
    support: {
      title: "Destek Al",
      blocks: [
        {
          type: "p",
          text: "İlan verme, ilan düzenleme, Ekiş Acil kullanımı veya teknik sorunlar için destek ekibimizle iletişime geçebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek e-postası: destek@ekis.com",
            "Kurumsal iletişim: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Daha hızlı destek için mesajınızda firma adınızı, ilan başlığınızı ve yaşadığınız sorunu kısaca belirtmeniz önerilir.",
        },
      ],
    },
  };

  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="22" r="8" stroke="currentColor" strokeWidth="4" />
        <circle cx="18" cy="28" r="6" stroke="currentColor" strokeWidth="4" />
        <circle cx="46" cy="28" r="6" stroke="currentColor" strokeWidth="4" />
        <path d="M18 48c2-8 8-12 14-12s12 4 14 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M7 49c1.5-6 6-9 11-9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M57 49c-1.5-6-6-9-11-9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "service") {
    const footerInfoContent = {
    about: {
      title: "Hakkımızda",
      blocks: [
        {
          type: "p",
          text: "Ekiş; günlük, saatlik, part time ve ek gelir odaklı iş fırsatlarını iş arayanlarla buluşturan modern bir ilan platformudur.",
        },
        {
          type: "p",
          text: "Amacımız, klasik kariyer sitelerinden farklı olarak hızlı işe alım süreçlerini kolaylaştırmak ve kısa süreli, vardiyalı, ek iş ve dönemsel personel ihtiyaçlarını tek bir güvenilir platformda toplamaktır.",
        },
        {
          type: "p",
          text: "Ekiş üzerinde yayınlanan ilanlar; mağaza, kafe, organizasyon, kurye, depo, etkinlik, satış destek, dönemsel personel ve benzeri birçok sektörü kapsar.",
        },
        {
          type: "note",
          text: "Ekiş yalnızca ilan ve iletişim altyapısını sağlar. İşe alım süreci, görüşmeler ve çalışma koşulları işveren ile aday arasında yürütülür.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları",
      blocks: [
        {
          type: "p",
          text: "Ekiş platformunu kullanan tüm kullanıcılar aşağıdaki şartları kabul etmiş sayılır:",
        },
        {
          type: "list",
          items: [
            "Yayınlanan ilan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
            "Yanıltıcı, sahte, eksik veya hukuka aykırı ilanlar yayınlanamaz.",
            "Kullanıcılar yalnızca yasal ve etik kurallara uygun ilan yayınlayabilir.",
            "Ekiş, gerekli gördüğü durumlarda ilanı yayından kaldırma hakkını saklı tutar.",
            "Platform üzerinden gerçekleşen işe alım süreçlerinden doğabilecek anlaşmazlıklardan Ekiş doğrudan sorumlu değildir.",
            "Ücretli Ekiş Acil ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Kullanıcılar iletişim bilgilerini doğru ve ulaşılabilir şekilde paylaşmakla yükümlüdür.",
            "Sistem kötüye kullanımı, sahte ilan veya dolandırıcılık şüphesi durumunda erişim sınırlandırılabilir.",
          ],
        },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası",
      blocks: [
        {
          type: "p",
          text: "Ekiş, kullanıcı bilgilerinin gizliliğini önemser. Toplanan bilgiler yalnızca ilan yayınlama, kullanıcı iletişimi, ödeme işlemleri ve yasal yükümlülükler amacıyla kullanılır.",
        },
        {
          type: "list",
          items: [
            "Ad soyad veya firma adı",
            "Telefon numarası",
            "E-posta adresi",
            "İşveren iletişim bilgileri",
            "Ücretli ilanlarda gerekli fatura bilgileri",
          ],
        },
        {
          type: "p",
          text: "Kullanıcı verileri izinsiz şekilde üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluklar kapsamında resmi kurumlarla paylaşılabilir.",
        },
        {
          type: "note",
          text: "Ödeme işlemleri güvenli ödeme altyapıları üzerinden gerçekleştirilir. Kart bilgileri doğrudan ödeme sağlayıcısı tarafından işlenir; Ekiş bu bilgilere erişmez.",
        },
      ],
    },
    contact: {
      title: "İletişim",
      blocks: [
        {
          type: "p",
          text: "Ekiş ile iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek: destek@ekis.com",
            "İş birliği / Kurumsal: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Resmi talepler ve iş ortaklığı başvuruları için e-posta üzerinden iletişim kurulması önerilir.",
        },
      ],
    },
    cityJobs: {
      title: "Şehre Göre İşler",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te ilanları şehir filtresiyle kolayca daraltabilir, yaşadığınız yere yakın günlük, saatlik ve part time iş fırsatlarını keşfedebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Arama alanında şehir seçimi yaparak ilanları filtreleyebilirsiniz.",
            "İstanbul, Ankara, İzmir, Eskişehir, Bursa ve diğer tüm şehirlerdeki ilanları tek ekranda görebilirsiniz.",
            "Uzaktan / Türkiye seçeneğiyle dijital ve freelance işleri de inceleyebilirsiniz.",
          ],
        },
        {
          type: "note",
          text: "Şehre göre arama yapmak için üstteki filtre alanındaki “Şehir seç” bölümünü kullanabilirsiniz.",
        },
      ],
    },
    faq: {
      title: "Sık Sorulanlar",
      blocks: [
        {
          type: "p",
          text: "Ekiş hakkında en sık sorulan soruları burada özetledik.",
        },
        {
          type: "list",
          items: [
            "İlanlara başvurmak için üyelik zorunlu değildir; ilan detayındaki iletişim bilgileri üzerinden işverenle görüşebilirsiniz.",
            "İşe alım süreci ve görüşmeler işveren ile aday arasında yürütülür.",
            "Ekiş Acil, daha görünür olmak isteyen işverenlerin ilanlarını öne çıkaran özel alandır.",
            "Sahte, yanıltıcı veya hukuka aykırı ilanlar yayından kaldırılabilir.",
            "İlan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
          ],
        },
      ],
    },
    pricing: {
      title: "Fiyatlandırma",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te standart ilan yayınlama ücretsizdir. Daha görünür olmak isteyen işverenler Ekiş Acil alanını tercih edebilir.",
        },
        {
          type: "list",
          items: [
            "Standart ilan: Ücretsiz olarak yayınlanır ve tüm ilanlar listesinde görünür.",
            "Ekiş Acil ilanı: İlanınızı ana sayfadaki özel alanda daha görünür hale getirir.",
            "Ücretli ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Fiyatlar ve paket detayları sistem aktif ödeme altyapısına geçtiğinde güncellenebilir.",
          ],
        },
        {
          type: "note",
          text: "Şu an demo/MVP aşamasında olduğumuz için fiyatlandırma ve ödeme süreci final entegrasyon öncesi netleştirilecektir.",
        },
      ],
    },
    support: {
      title: "Destek Al",
      blocks: [
        {
          type: "p",
          text: "İlan verme, ilan düzenleme, Ekiş Acil kullanımı veya teknik sorunlar için destek ekibimizle iletişime geçebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek e-postası: destek@ekis.com",
            "Kurumsal iletişim: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Daha hızlı destek için mesajınızda firma adınızı, ilan başlığınızı ve yaşadığınız sorunu kısaca belirtmeniz önerilir.",
        },
      ],
    },
  };

  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 39c1-12 8-21 18-21s17 9 18 21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 43h44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 14v-4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 51h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "box") {
    const footerInfoContent = {
    about: {
      title: "Hakkımızda",
      blocks: [
        {
          type: "p",
          text: "Ekiş; günlük, saatlik, part time ve ek gelir odaklı iş fırsatlarını iş arayanlarla buluşturan modern bir ilan platformudur.",
        },
        {
          type: "p",
          text: "Amacımız, klasik kariyer sitelerinden farklı olarak hızlı işe alım süreçlerini kolaylaştırmak ve kısa süreli, vardiyalı, ek iş ve dönemsel personel ihtiyaçlarını tek bir güvenilir platformda toplamaktır.",
        },
        {
          type: "p",
          text: "Ekiş üzerinde yayınlanan ilanlar; mağaza, kafe, organizasyon, kurye, depo, etkinlik, satış destek, dönemsel personel ve benzeri birçok sektörü kapsar.",
        },
        {
          type: "note",
          text: "Ekiş yalnızca ilan ve iletişim altyapısını sağlar. İşe alım süreci, görüşmeler ve çalışma koşulları işveren ile aday arasında yürütülür.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları",
      blocks: [
        {
          type: "p",
          text: "Ekiş platformunu kullanan tüm kullanıcılar aşağıdaki şartları kabul etmiş sayılır:",
        },
        {
          type: "list",
          items: [
            "Yayınlanan ilan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
            "Yanıltıcı, sahte, eksik veya hukuka aykırı ilanlar yayınlanamaz.",
            "Kullanıcılar yalnızca yasal ve etik kurallara uygun ilan yayınlayabilir.",
            "Ekiş, gerekli gördüğü durumlarda ilanı yayından kaldırma hakkını saklı tutar.",
            "Platform üzerinden gerçekleşen işe alım süreçlerinden doğabilecek anlaşmazlıklardan Ekiş doğrudan sorumlu değildir.",
            "Ücretli Ekiş Acil ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Kullanıcılar iletişim bilgilerini doğru ve ulaşılabilir şekilde paylaşmakla yükümlüdür.",
            "Sistem kötüye kullanımı, sahte ilan veya dolandırıcılık şüphesi durumunda erişim sınırlandırılabilir.",
          ],
        },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası",
      blocks: [
        {
          type: "p",
          text: "Ekiş, kullanıcı bilgilerinin gizliliğini önemser. Toplanan bilgiler yalnızca ilan yayınlama, kullanıcı iletişimi, ödeme işlemleri ve yasal yükümlülükler amacıyla kullanılır.",
        },
        {
          type: "list",
          items: [
            "Ad soyad veya firma adı",
            "Telefon numarası",
            "E-posta adresi",
            "İşveren iletişim bilgileri",
            "Ücretli ilanlarda gerekli fatura bilgileri",
          ],
        },
        {
          type: "p",
          text: "Kullanıcı verileri izinsiz şekilde üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluklar kapsamında resmi kurumlarla paylaşılabilir.",
        },
        {
          type: "note",
          text: "Ödeme işlemleri güvenli ödeme altyapıları üzerinden gerçekleştirilir. Kart bilgileri doğrudan ödeme sağlayıcısı tarafından işlenir; Ekiş bu bilgilere erişmez.",
        },
      ],
    },
    contact: {
      title: "İletişim",
      blocks: [
        {
          type: "p",
          text: "Ekiş ile iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek: destek@ekis.com",
            "İş birliği / Kurumsal: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Resmi talepler ve iş ortaklığı başvuruları için e-posta üzerinden iletişim kurulması önerilir.",
        },
      ],
    },
    cityJobs: {
      title: "Şehre Göre İşler",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te ilanları şehir filtresiyle kolayca daraltabilir, yaşadığınız yere yakın günlük, saatlik ve part time iş fırsatlarını keşfedebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Arama alanında şehir seçimi yaparak ilanları filtreleyebilirsiniz.",
            "İstanbul, Ankara, İzmir, Eskişehir, Bursa ve diğer tüm şehirlerdeki ilanları tek ekranda görebilirsiniz.",
            "Uzaktan / Türkiye seçeneğiyle dijital ve freelance işleri de inceleyebilirsiniz.",
          ],
        },
        {
          type: "note",
          text: "Şehre göre arama yapmak için üstteki filtre alanındaki “Şehir seç” bölümünü kullanabilirsiniz.",
        },
      ],
    },
    faq: {
      title: "Sık Sorulanlar",
      blocks: [
        {
          type: "p",
          text: "Ekiş hakkında en sık sorulan soruları burada özetledik.",
        },
        {
          type: "list",
          items: [
            "İlanlara başvurmak için üyelik zorunlu değildir; ilan detayındaki iletişim bilgileri üzerinden işverenle görüşebilirsiniz.",
            "İşe alım süreci ve görüşmeler işveren ile aday arasında yürütülür.",
            "Ekiş Acil, daha görünür olmak isteyen işverenlerin ilanlarını öne çıkaran özel alandır.",
            "Sahte, yanıltıcı veya hukuka aykırı ilanlar yayından kaldırılabilir.",
            "İlan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
          ],
        },
      ],
    },
    pricing: {
      title: "Fiyatlandırma",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te standart ilan yayınlama ücretsizdir. Daha görünür olmak isteyen işverenler Ekiş Acil alanını tercih edebilir.",
        },
        {
          type: "list",
          items: [
            "Standart ilan: Ücretsiz olarak yayınlanır ve tüm ilanlar listesinde görünür.",
            "Ekiş Acil ilanı: İlanınızı ana sayfadaki özel alanda daha görünür hale getirir.",
            "Ücretli ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Fiyatlar ve paket detayları sistem aktif ödeme altyapısına geçtiğinde güncellenebilir.",
          ],
        },
        {
          type: "note",
          text: "Şu an demo/MVP aşamasında olduğumuz için fiyatlandırma ve ödeme süreci final entegrasyon öncesi netleştirilecektir.",
        },
      ],
    },
    support: {
      title: "Destek Al",
      blocks: [
        {
          type: "p",
          text: "İlan verme, ilan düzenleme, Ekiş Acil kullanımı veya teknik sorunlar için destek ekibimizle iletişime geçebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek e-postası: destek@ekis.com",
            "Kurumsal iletişim: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Daha hızlı destek için mesajınızda firma adınızı, ilan başlığınızı ve yaşadığınız sorunu kısaca belirtmeniz önerilir.",
        },
      ],
    },
  };

  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 22l18-9 18 9v21l-18 9-18-9V22Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M14 22l18 9 18-9" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M32 31v21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "store") {
    const footerInfoContent = {
    about: {
      title: "Hakkımızda",
      blocks: [
        {
          type: "p",
          text: "Ekiş; günlük, saatlik, part time ve ek gelir odaklı iş fırsatlarını iş arayanlarla buluşturan modern bir ilan platformudur.",
        },
        {
          type: "p",
          text: "Amacımız, klasik kariyer sitelerinden farklı olarak hızlı işe alım süreçlerini kolaylaştırmak ve kısa süreli, vardiyalı, ek iş ve dönemsel personel ihtiyaçlarını tek bir güvenilir platformda toplamaktır.",
        },
        {
          type: "p",
          text: "Ekiş üzerinde yayınlanan ilanlar; mağaza, kafe, organizasyon, kurye, depo, etkinlik, satış destek, dönemsel personel ve benzeri birçok sektörü kapsar.",
        },
        {
          type: "note",
          text: "Ekiş yalnızca ilan ve iletişim altyapısını sağlar. İşe alım süreci, görüşmeler ve çalışma koşulları işveren ile aday arasında yürütülür.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları",
      blocks: [
        {
          type: "p",
          text: "Ekiş platformunu kullanan tüm kullanıcılar aşağıdaki şartları kabul etmiş sayılır:",
        },
        {
          type: "list",
          items: [
            "Yayınlanan ilan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
            "Yanıltıcı, sahte, eksik veya hukuka aykırı ilanlar yayınlanamaz.",
            "Kullanıcılar yalnızca yasal ve etik kurallara uygun ilan yayınlayabilir.",
            "Ekiş, gerekli gördüğü durumlarda ilanı yayından kaldırma hakkını saklı tutar.",
            "Platform üzerinden gerçekleşen işe alım süreçlerinden doğabilecek anlaşmazlıklardan Ekiş doğrudan sorumlu değildir.",
            "Ücretli Ekiş Acil ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Kullanıcılar iletişim bilgilerini doğru ve ulaşılabilir şekilde paylaşmakla yükümlüdür.",
            "Sistem kötüye kullanımı, sahte ilan veya dolandırıcılık şüphesi durumunda erişim sınırlandırılabilir.",
          ],
        },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası",
      blocks: [
        {
          type: "p",
          text: "Ekiş, kullanıcı bilgilerinin gizliliğini önemser. Toplanan bilgiler yalnızca ilan yayınlama, kullanıcı iletişimi, ödeme işlemleri ve yasal yükümlülükler amacıyla kullanılır.",
        },
        {
          type: "list",
          items: [
            "Ad soyad veya firma adı",
            "Telefon numarası",
            "E-posta adresi",
            "İşveren iletişim bilgileri",
            "Ücretli ilanlarda gerekli fatura bilgileri",
          ],
        },
        {
          type: "p",
          text: "Kullanıcı verileri izinsiz şekilde üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluklar kapsamında resmi kurumlarla paylaşılabilir.",
        },
        {
          type: "note",
          text: "Ödeme işlemleri güvenli ödeme altyapıları üzerinden gerçekleştirilir. Kart bilgileri doğrudan ödeme sağlayıcısı tarafından işlenir; Ekiş bu bilgilere erişmez.",
        },
      ],
    },
    contact: {
      title: "İletişim",
      blocks: [
        {
          type: "p",
          text: "Ekiş ile iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek: destek@ekis.com",
            "İş birliği / Kurumsal: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Resmi talepler ve iş ortaklığı başvuruları için e-posta üzerinden iletişim kurulması önerilir.",
        },
      ],
    },
    cityJobs: {
      title: "Şehre Göre İşler",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te ilanları şehir filtresiyle kolayca daraltabilir, yaşadığınız yere yakın günlük, saatlik ve part time iş fırsatlarını keşfedebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Arama alanında şehir seçimi yaparak ilanları filtreleyebilirsiniz.",
            "İstanbul, Ankara, İzmir, Eskişehir, Bursa ve diğer tüm şehirlerdeki ilanları tek ekranda görebilirsiniz.",
            "Uzaktan / Türkiye seçeneğiyle dijital ve freelance işleri de inceleyebilirsiniz.",
          ],
        },
        {
          type: "note",
          text: "Şehre göre arama yapmak için üstteki filtre alanındaki “Şehir seç” bölümünü kullanabilirsiniz.",
        },
      ],
    },
    faq: {
      title: "Sık Sorulanlar",
      blocks: [
        {
          type: "p",
          text: "Ekiş hakkında en sık sorulan soruları burada özetledik.",
        },
        {
          type: "list",
          items: [
            "İlanlara başvurmak için üyelik zorunlu değildir; ilan detayındaki iletişim bilgileri üzerinden işverenle görüşebilirsiniz.",
            "İşe alım süreci ve görüşmeler işveren ile aday arasında yürütülür.",
            "Ekiş Acil, daha görünür olmak isteyen işverenlerin ilanlarını öne çıkaran özel alandır.",
            "Sahte, yanıltıcı veya hukuka aykırı ilanlar yayından kaldırılabilir.",
            "İlan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
          ],
        },
      ],
    },
    pricing: {
      title: "Fiyatlandırma",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te standart ilan yayınlama ücretsizdir. Daha görünür olmak isteyen işverenler Ekiş Acil alanını tercih edebilir.",
        },
        {
          type: "list",
          items: [
            "Standart ilan: Ücretsiz olarak yayınlanır ve tüm ilanlar listesinde görünür.",
            "Ekiş Acil ilanı: İlanınızı ana sayfadaki özel alanda daha görünür hale getirir.",
            "Ücretli ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Fiyatlar ve paket detayları sistem aktif ödeme altyapısına geçtiğinde güncellenebilir.",
          ],
        },
        {
          type: "note",
          text: "Şu an demo/MVP aşamasında olduğumuz için fiyatlandırma ve ödeme süreci final entegrasyon öncesi netleştirilecektir.",
        },
      ],
    },
    support: {
      title: "Destek Al",
      blocks: [
        {
          type: "p",
          text: "İlan verme, ilan düzenleme, Ekiş Acil kullanımı veya teknik sorunlar için destek ekibimizle iletişime geçebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek e-postası: destek@ekis.com",
            "Kurumsal iletişim: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Daha hızlı destek için mesajınızda firma adınızı, ilan başlığınızı ve yaşadığınız sorunu kısaca belirtmeniz önerilir.",
        },
      ],
    },
  };

  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 26h36l-4-11H18l-4 11Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M18 30v20h28V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M25 50V38h14v12" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  const footerInfoContent = {
    about: {
      title: "Hakkımızda",
      blocks: [
        {
          type: "p",
          text: "Ekiş; günlük, saatlik, part time ve ek gelir odaklı iş fırsatlarını iş arayanlarla buluşturan modern bir ilan platformudur.",
        },
        {
          type: "p",
          text: "Amacımız, klasik kariyer sitelerinden farklı olarak hızlı işe alım süreçlerini kolaylaştırmak ve kısa süreli, vardiyalı, ek iş ve dönemsel personel ihtiyaçlarını tek bir güvenilir platformda toplamaktır.",
        },
        {
          type: "p",
          text: "Ekiş üzerinde yayınlanan ilanlar; mağaza, kafe, organizasyon, kurye, depo, etkinlik, satış destek, dönemsel personel ve benzeri birçok sektörü kapsar.",
        },
        {
          type: "note",
          text: "Ekiş yalnızca ilan ve iletişim altyapısını sağlar. İşe alım süreci, görüşmeler ve çalışma koşulları işveren ile aday arasında yürütülür.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları",
      blocks: [
        {
          type: "p",
          text: "Ekiş platformunu kullanan tüm kullanıcılar aşağıdaki şartları kabul etmiş sayılır:",
        },
        {
          type: "list",
          items: [
            "Yayınlanan ilan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
            "Yanıltıcı, sahte, eksik veya hukuka aykırı ilanlar yayınlanamaz.",
            "Kullanıcılar yalnızca yasal ve etik kurallara uygun ilan yayınlayabilir.",
            "Ekiş, gerekli gördüğü durumlarda ilanı yayından kaldırma hakkını saklı tutar.",
            "Platform üzerinden gerçekleşen işe alım süreçlerinden doğabilecek anlaşmazlıklardan Ekiş doğrudan sorumlu değildir.",
            "Ücretli Ekiş Acil ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Kullanıcılar iletişim bilgilerini doğru ve ulaşılabilir şekilde paylaşmakla yükümlüdür.",
            "Sistem kötüye kullanımı, sahte ilan veya dolandırıcılık şüphesi durumunda erişim sınırlandırılabilir.",
          ],
        },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası",
      blocks: [
        {
          type: "p",
          text: "Ekiş, kullanıcı bilgilerinin gizliliğini önemser. Toplanan bilgiler yalnızca ilan yayınlama, kullanıcı iletişimi, ödeme işlemleri ve yasal yükümlülükler amacıyla kullanılır.",
        },
        {
          type: "list",
          items: [
            "Ad soyad veya firma adı",
            "Telefon numarası",
            "E-posta adresi",
            "İşveren iletişim bilgileri",
            "Ücretli ilanlarda gerekli fatura bilgileri",
          ],
        },
        {
          type: "p",
          text: "Kullanıcı verileri izinsiz şekilde üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluklar kapsamında resmi kurumlarla paylaşılabilir.",
        },
        {
          type: "note",
          text: "Ödeme işlemleri güvenli ödeme altyapıları üzerinden gerçekleştirilir. Kart bilgileri doğrudan ödeme sağlayıcısı tarafından işlenir; Ekiş bu bilgilere erişmez.",
        },
      ],
    },
    contact: {
      title: "İletişim",
      blocks: [
        {
          type: "p",
          text: "Ekiş ile iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek: destek@ekis.com",
            "İş birliği / Kurumsal: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Resmi talepler ve iş ortaklığı başvuruları için e-posta üzerinden iletişim kurulması önerilir.",
        },
      ],
    },
    cityJobs: {
      title: "Şehre Göre İşler",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te ilanları şehir filtresiyle kolayca daraltabilir, yaşadığınız yere yakın günlük, saatlik ve part time iş fırsatlarını keşfedebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Arama alanında şehir seçimi yaparak ilanları filtreleyebilirsiniz.",
            "İstanbul, Ankara, İzmir, Eskişehir, Bursa ve diğer tüm şehirlerdeki ilanları tek ekranda görebilirsiniz.",
            "Uzaktan / Türkiye seçeneğiyle dijital ve freelance işleri de inceleyebilirsiniz.",
          ],
        },
        {
          type: "note",
          text: "Şehre göre arama yapmak için üstteki filtre alanındaki “Şehir seç” bölümünü kullanabilirsiniz.",
        },
      ],
    },
    faq: {
      title: "Sık Sorulanlar",
      blocks: [
        {
          type: "p",
          text: "Ekiş hakkında en sık sorulan soruları burada özetledik.",
        },
        {
          type: "list",
          items: [
            "İlanlara başvurmak için üyelik zorunlu değildir; ilan detayındaki iletişim bilgileri üzerinden işverenle görüşebilirsiniz.",
            "İşe alım süreci ve görüşmeler işveren ile aday arasında yürütülür.",
            "Ekiş Acil, daha görünür olmak isteyen işverenlerin ilanlarını öne çıkaran özel alandır.",
            "Sahte, yanıltıcı veya hukuka aykırı ilanlar yayından kaldırılabilir.",
            "İlan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
          ],
        },
      ],
    },
    pricing: {
      title: "Fiyatlandırma",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te standart ilan yayınlama ücretsizdir. Daha görünür olmak isteyen işverenler Ekiş Acil alanını tercih edebilir.",
        },
        {
          type: "list",
          items: [
            "Standart ilan: Ücretsiz olarak yayınlanır ve tüm ilanlar listesinde görünür.",
            "Ekiş Acil ilanı: İlanınızı ana sayfadaki özel alanda daha görünür hale getirir.",
            "Ücretli ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Fiyatlar ve paket detayları sistem aktif ödeme altyapısına geçtiğinde güncellenebilir.",
          ],
        },
        {
          type: "note",
          text: "Şu an demo/MVP aşamasında olduğumuz için fiyatlandırma ve ödeme süreci final entegrasyon öncesi netleştirilecektir.",
        },
      ],
    },
    support: {
      title: "Destek Al",
      blocks: [
        {
          type: "p",
          text: "İlan verme, ilan düzenleme, Ekiş Acil kullanımı veya teknik sorunlar için destek ekibimizle iletişime geçebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek e-postası: destek@ekis.com",
            "Kurumsal iletişim: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Daha hızlı destek için mesajınızda firma adınızı, ilan başlığınızı ve yaşadığınız sorunu kısaca belirtmeniz önerilir.",
        },
      ],
    },
  };

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M20 24v-5c0-3 2-5 5-5h14c3 0 5 2 5 5v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 24h40v26H12V24Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M26 34h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}


export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [jobType, setJobType] = useState("Tümü");
  const [city, setCity] = useState("Tümü");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [submittedCategory, setSubmittedCategory] = useState("Tümü");
  const [submittedJobType, setSubmittedJobType] = useState("Tümü");
  const [submittedCity, setSubmittedCity] = useState("Tümü");
  const [sortOption, setSortOption] = useState("newest");
  const [showForm, setShowForm] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showFeaturedList, setShowFeaturedList] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [pendingJob, setPendingJob] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/logo-ekis.png");
  const [headerSmall, setHeaderSmall] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [jobs, setJobs] = useState(jobsSeed);
  const [featuredJobs, setFeaturedJobs] = useState(featuredSeed);
  const [selectedJob, setSelectedJob] = useState(null);
  const [errors, setErrors] = useState({});
  const [infoModal, setInfoModal] = useState(null);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    city: "",
    workType: "Günlük",
    salary: "",
    description: "",
    workAddress: "",
    contactName: "",
    contactPhone: "",
  });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHeaderSmall(y > 60);
      const fadeDistance = 120;
      const nextOpacity = Math.max(0, 1 - y / fadeDistance);
      setHeaderOpacity(nextOpacity);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncAdminRoute = () => {
      setIsAdminRoute(window.location.hash === "#admin");
    };

    syncAdminRoute();
    window.addEventListener("hashchange", syncAdminRoute);
    return () => window.removeEventListener("hashchange", syncAdminRoute);
  }, []);

  const goHome = () => {
    setIsAdminRoute(false);
    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!showForm) {
      setShowPreview(false);
      setErrors({});
      setSelectedPlan("free");
      setPendingJob(null);
      setShowPlanModal(false);
      setFormData({
        company: "",
        title: "",
        city: "",
        workType: "Günlük",
        salary: "",
        description: "",
        workAddress: "",
        contactName: "",
        contactPhone: "",
      });
    }
  }, [showForm]);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.company.trim()) nextErrors.company = "Firma adı zorunludur.";
    if (!formData.title.trim()) nextErrors.title = "İlan başlığı zorunludur.";
    if (!formData.city.trim()) nextErrors.city = "Şehir / konum zorunludur.";
    if (!formData.workAddress.trim()) nextErrors.workAddress = "İş adresi / buluşma noktası zorunludur.";

    const phoneDigits = formData.contactPhone.replace(/\D/g, "");
    const invalidRepeatingPhone = /^(\d)\1+$/.test(phoneDigits);

    if (!formData.contactPhone.trim()) {
      nextErrors.contactPhone = "Telefon numarası zorunludur.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      nextErrors.contactPhone = "Geçerli bir telefon numarası giriniz.";
    } else if (invalidRepeatingPhone || phoneDigits === "1234567890" || phoneDigits === "12345678901") {
      nextErrors.contactPhone = "Lütfen gerçek bir telefon numarası giriniz.";
    }

    if (!formData.salary.trim()) nextErrors.salary = "Ücret bilgisi zorunludur.";
    if (!formData.description.trim()) nextErrors.description = "İş açıklaması zorunludur.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "salary") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, salary: onlyNumbers }));
      setErrors((prev) => ({ ...prev, salary: "" }));
      return;
    }

    if (name === "contactPhone") {
      const cleaned = value.replace(/[^0-9+\s()-]/g, "");
      setFormData((prev) => ({ ...prev, contactPhone: cleaned }));
      setErrors((prev) => ({ ...prev, contactPhone: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSearchSubmit = () => {
    setSubmittedSearch(search);
    setSubmittedCategory(category);
    setSubmittedJobType(jobType);
    setSubmittedCity(city);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("Tümü");
    setJobType("Tümü");
    setCity("Tümü");
    setSubmittedSearch("");
    setSubmittedCategory("Tümü");
    setSubmittedJobType("Tümü");
    setSubmittedCity("Tümü");
  };

  const buildJobFromForm = () => ({
    id: Date.now(),
    title: formData.title.trim(),
    company: formData.company.trim(),
    location: formData.city.trim(),
    salary: formatSalaryPreview(formData.workType, formData.salary),
    type: formData.workType,
    category: inferCategory(formData.title),
    description: formData.description.trim(),
    workAddress: formData.workAddress.trim(),
    contactName: formData.contactName.trim(),
    contactPhone: formData.contactPhone.trim(),
    createdAt: new Date().toISOString(),
  });

  const handlePublishClick = () => {
    if (!validateForm()) return;
    setPendingJob(buildJobFromForm());
    setSelectedPlan("free");
    setShowPlanModal(true);
  };

  const handlePlanContinue = () => {
    if (!pendingJob) return;

    if (selectedPlan === "featured") {
      const featuredJob = {
        ...pendingJob,
        plan: "featured",
        featuredStatus: "live",
        paymentStatus: "pending",
      };
      setFeaturedJobs((prev) => [featuredJob, ...prev]);
      window.open(SHOPIER_FEATURED_LINK, "_blank", "noopener,noreferrer");
    } else {
      setJobs((prev) => [{ ...pendingJob, plan: "free" }, ...prev]);
    }

    setShowPlanModal(false);
    setShowForm(false);
    setPendingJob(null);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.location} ${job.category}`.toLowerCase();
      const matchesSearch = text.includes(submittedSearch.toLowerCase());
      const matchesCategory = submittedCategory === "Tümü" ? true : job.category === submittedCategory;
      const matchesType = submittedJobType === "Tümü" ? true : job.type === submittedJobType;
      const matchesCity =
        submittedCity === "Tümü"
          ? true
          : job.location.toLocaleLowerCase("tr-TR").includes(submittedCity.toLocaleLowerCase("tr-TR"));
      return matchesSearch && matchesCategory && matchesType && matchesCity;
    });
  }, [jobs, submittedSearch, submittedCategory, submittedJobType, submittedCity]);

  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sortOption === "salaryHigh") {
      return list.sort((a, b) => {
        const aSalary = Number(String(a.salary).replace(/[^0-9]/g, "")) || 0;
        const bSalary = Number(String(b.salary).replace(/[^0-9]/g, "")) || 0;
        return bSalary - aSalary;
      });
    }
    if (sortOption === "salaryLow") {
      return list.sort((a, b) => {
        const aSalary = Number(String(a.salary).replace(/[^0-9]/g, "")) || 0;
        const bSalary = Number(String(b.salary).replace(/[^0-9]/g, "")) || 0;
        return aSalary - bSalary;
      });
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [filteredJobs, sortOption]);

  const filteredFeaturedJobs = useMemo(() => {
    const normalizedSearch = submittedSearch.toLowerCase();

    const baseFiltered = featuredJobs.filter((job) => {
      const searchable = `${job.title} ${job.company} ${job.location} ${job.category || ""}`.toLowerCase();
      const matchesSearch = searchable.includes(normalizedSearch);
      const matchesCategory =
        submittedCategory === "Tümü"
          ? true
          : (job.category || inferCategory(job.title)) === submittedCategory;
      const matchesType =
        submittedJobType === "Tümü"
          ? true
          : job.type === submittedJobType;

      return matchesSearch && matchesCategory && matchesType;
    });

    if (submittedCity === "Tümü") {
      return baseFiltered;
    }

    const selectedCity = submittedCity.toLocaleLowerCase("tr-TR");

    const cityMatched = baseFiltered.filter((job) =>
      job.location.toLocaleLowerCase("tr-TR").includes(selectedCity)
    );

    const fallbackTurkey = baseFiltered.filter(
      (job) =>
        !job.location.toLocaleLowerCase("tr-TR").includes(selectedCity) &&
        job.location.toLocaleLowerCase("tr-TR").includes("türkiye")
    );

    const remainingPool = baseFiltered.filter(
      (job) =>
        !cityMatched.includes(job) &&
        !fallbackTurkey.includes(job)
    );

    return [...cityMatched, ...fallbackTurkey, ...remainingPool];
  }, [featuredJobs, submittedSearch, submittedCategory, submittedJobType, submittedCity]);

  const visibleFeaturedJobs = filteredFeaturedJobs.slice(0, 6);
  const previewSalary = formatSalaryPreview(formData.workType, formData.salary);
  const totalCount = filteredFeaturedJobs.length + filteredJobs.length;

  const footerInfoContent = {
    about: {
      title: "Hakkımızda",
      blocks: [
        {
          type: "p",
          text: "Ekiş; günlük, saatlik, part time ve ek gelir odaklı iş fırsatlarını iş arayanlarla buluşturan modern bir ilan platformudur.",
        },
        {
          type: "p",
          text: "Amacımız, klasik kariyer sitelerinden farklı olarak hızlı işe alım süreçlerini kolaylaştırmak ve kısa süreli, vardiyalı, ek iş ve dönemsel personel ihtiyaçlarını tek bir güvenilir platformda toplamaktır.",
        },
        {
          type: "p",
          text: "Ekiş üzerinde yayınlanan ilanlar; mağaza, kafe, organizasyon, kurye, depo, etkinlik, satış destek, dönemsel personel ve benzeri birçok sektörü kapsar.",
        },
        {
          type: "note",
          text: "Ekiş yalnızca ilan ve iletişim altyapısını sağlar. İşe alım süreci, görüşmeler ve çalışma koşulları işveren ile aday arasında yürütülür.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları",
      blocks: [
        {
          type: "p",
          text: "Ekiş platformunu kullanan tüm kullanıcılar aşağıdaki şartları kabul etmiş sayılır:",
        },
        {
          type: "list",
          items: [
            "Yayınlanan ilan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
            "Yanıltıcı, sahte, eksik veya hukuka aykırı ilanlar yayınlanamaz.",
            "Kullanıcılar yalnızca yasal ve etik kurallara uygun ilan yayınlayabilir.",
            "Ekiş, gerekli gördüğü durumlarda ilanı yayından kaldırma hakkını saklı tutar.",
            "Platform üzerinden gerçekleşen işe alım süreçlerinden doğabilecek anlaşmazlıklardan Ekiş doğrudan sorumlu değildir.",
            "Ücretli Ekiş Acil ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Kullanıcılar iletişim bilgilerini doğru ve ulaşılabilir şekilde paylaşmakla yükümlüdür.",
            "Sistem kötüye kullanımı, sahte ilan veya dolandırıcılık şüphesi durumunda erişim sınırlandırılabilir.",
          ],
        },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası",
      blocks: [
        {
          type: "p",
          text: "Ekiş, kullanıcı bilgilerinin gizliliğini önemser. Toplanan bilgiler yalnızca ilan yayınlama, kullanıcı iletişimi, ödeme işlemleri ve yasal yükümlülükler amacıyla kullanılır.",
        },
        {
          type: "list",
          items: [
            "Ad soyad veya firma adı",
            "Telefon numarası",
            "E-posta adresi",
            "İşveren iletişim bilgileri",
            "Ücretli ilanlarda gerekli fatura bilgileri",
          ],
        },
        {
          type: "p",
          text: "Kullanıcı verileri izinsiz şekilde üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluklar kapsamında resmi kurumlarla paylaşılabilir.",
        },
        {
          type: "note",
          text: "Ödeme işlemleri güvenli ödeme altyapıları üzerinden gerçekleştirilir. Kart bilgileri doğrudan ödeme sağlayıcısı tarafından işlenir; Ekiş bu bilgilere erişmez.",
        },
      ],
    },
    contact: {
      title: "İletişim",
      blocks: [
        {
          type: "p",
          text: "Ekiş ile iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek: destek@ekis.com",
            "İş birliği / Kurumsal: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Resmi talepler ve iş ortaklığı başvuruları için e-posta üzerinden iletişim kurulması önerilir.",
        },
      ],
    },
    cityJobs: {
      title: "Şehre Göre İşler",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te ilanları şehir filtresiyle kolayca daraltabilir, yaşadığınız yere yakın günlük, saatlik ve part time iş fırsatlarını keşfedebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Arama alanında şehir seçimi yaparak ilanları filtreleyebilirsiniz.",
            "İstanbul, Ankara, İzmir, Eskişehir, Bursa ve diğer tüm şehirlerdeki ilanları tek ekranda görebilirsiniz.",
            "Uzaktan / Türkiye seçeneğiyle dijital ve freelance işleri de inceleyebilirsiniz.",
          ],
        },
        {
          type: "note",
          text: "Şehre göre arama yapmak için üstteki filtre alanındaki “Şehir seç” bölümünü kullanabilirsiniz.",
        },
      ],
    },
    faq: {
      title: "Sık Sorulanlar",
      blocks: [
        {
          type: "p",
          text: "Ekiş hakkında en sık sorulan soruları burada özetledik.",
        },
        {
          type: "list",
          items: [
            "İlanlara başvurmak için üyelik zorunlu değildir; ilan detayındaki iletişim bilgileri üzerinden işverenle görüşebilirsiniz.",
            "İşe alım süreci ve görüşmeler işveren ile aday arasında yürütülür.",
            "Ekiş Acil, daha görünür olmak isteyen işverenlerin ilanlarını öne çıkaran özel alandır.",
            "Sahte, yanıltıcı veya hukuka aykırı ilanlar yayından kaldırılabilir.",
            "İlan bilgilerinin doğruluğu ilan sahibi işverene aittir.",
          ],
        },
      ],
    },
    pricing: {
      title: "Fiyatlandırma",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te standart ilan yayınlama ücretsizdir. Daha görünür olmak isteyen işverenler Ekiş Acil alanını tercih edebilir.",
        },
        {
          type: "list",
          items: [
            "Standart ilan: Ücretsiz olarak yayınlanır ve tüm ilanlar listesinde görünür.",
            "Ekiş Acil ilanı: İlanınızı ana sayfadaki özel alanda daha görünür hale getirir.",
            "Ücretli ilanlarda ödeme tamamlandıktan sonra yayın süreci başlatılır.",
            "Fiyatlar ve paket detayları sistem aktif ödeme altyapısına geçtiğinde güncellenebilir.",
          ],
        },
        {
          type: "note",
          text: "Şu an demo/MVP aşamasında olduğumuz için fiyatlandırma ve ödeme süreci final entegrasyon öncesi netleştirilecektir.",
        },
      ],
    },
    support: {
      title: "Destek Al",
      blocks: [
        {
          type: "p",
          text: "İlan verme, ilan düzenleme, Ekiş Acil kullanımı veya teknik sorunlar için destek ekibimizle iletişime geçebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek e-postası: destek@ekis.com",
            "Kurumsal iletişim: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Daha hızlı destek için mesajınızda firma adınızı, ilan başlığınızı ve yaşadığınız sorunu kısaca belirtmeniz önerilir.",
        },
      ],
    },
  };

  return (
    <div className="app-shell">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: ${PALETTE.bg};
          color: ${PALETTE.text};
        }
        a { color: inherit; }
        .app-shell {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(228,93,80,0.10), transparent 26%),
            radial-gradient(circle at top right, rgba(118,191,190,0.10), transparent 24%),
            linear-gradient(180deg, #fff 0%, ${PALETTE.bg} 100%);
        }
        .container {
          width: calc(100% - 24px);
          max-width: none;
          margin: 0 auto;
        }
        .topbar {
          position: relative;
          top: 0;
          z-index: 50;
          background: transparent;
          transition: opacity 0.18s ease;
        }
        .topbar-inner {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          transition: min-height 0.22s ease;
        }
        .topbar.small .topbar-inner { min-height: 60px; }
        .brand-wrap {
          display: flex;
          align-items: center;
          min-width: 0;
        }
        .brand-logo-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          padding: 0;
          margin: 0;
        }
        .brand-logo {
          height: 108px;
          width: auto;
          display: block;
          object-fit: contain;
          transition: height 0.22s ease, opacity 0.18s ease;
        }
        .topbar.small .brand-logo { height: 102px; }
        .top-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .btn {
          border: none;
          outline: none;
          border-radius: 15px;
          padding: 13px 18px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
          color: #fff;
          background: ${PALETTE.coral};
          box-shadow: 0 12px 24px rgba(228,93,80,0.28);
        }
        .btn-secondary {
          color: ${PALETTE.slate};
          background: #fff;
          border: 1px solid rgba(60,74,95,0.12);
          box-shadow: 0 8px 18px rgba(60,74,95,0.05);
        }
        .top-search {
          padding: 2px 0 10px;
        }
        .filter-wrap {
          background: ${PALETTE.teal};
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 14px 30px rgba(60,74,95,0.05);
        }
        .filter-grid {
          display: grid;
          grid-template-columns: 1.45fr 1fr 1fr 1fr 0.9fr 0.9fr;
          gap: 12px;
          align-items: end;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .field label {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          padding-left: 2px;
        }
        .field input, .field select {
          height: 56px;
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          padding: 0 16px;
          font-size: 15px;
          color: ${PALETTE.text};
          outline: none;
        }
        .search-action {
          display: flex;
          align-items: end;
        }
        .search-btn {
          width: 100%;
          height: 56px;
          border-radius: 18px;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .search-btn:hover { transform: translateY(-1px); }
        .search-btn-primary {
          border: 1px solid rgba(255,255,255,0.35);
          background: linear-gradient(180deg, #ff6846 0%, #ff4f26 100%);
          color: #fff;
          box-shadow: 0 14px 28px rgba(255,79,38,0.24);
        }
        .search-btn-clear {
          border: 1px solid rgba(255,255,255,0.62);
          background: rgba(255,255,255,0.08);
          color: #fff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .hero {
          padding: 4px 0 6px;
        }
        .hero-card {
          background: ${PALETTE.white};
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 24px;
          box-shadow: 0 12px 24px rgba(60,74,95,0.06);
          padding: 14px 18px;
          margin-bottom: 10px;
        }
        .hero-title {
          margin: 0;
          font-size: clamp(20px, 2.5vw, 30px);
          line-height: 1.08;
          letter-spacing: -0.04em;
          font-weight: 900;
          color: ${PALETTE.slate};
          max-width: 760px;
        }
        .hero-stats-inline {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .hero-stat-bubble {
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(60,74,95,0.06);
          border: 1px solid rgba(60,74,95,0.08);
          font-size: 12px;
          font-weight: 800;
          color: ${PALETTE.slate};
        }
        .section { padding: 0 0 16px; }
        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .section-title {
          margin: 0;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .section-title-vitrin {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
        }
        .section-title-vitrin::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.92);
          box-shadow:
            0 0 0 4px rgba(255,255,255,0.18),
            0 0 18px rgba(255,255,255,0.22);
          flex-shrink: 0;
        }
        .section-sub {
          color: ${PALETTE.softText};
          font-size: 14px;
          font-weight: 800;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .featured-section {
          background: ${PALETTE.coral};
          border-radius: 28px;
          padding: 30px 22px 26px;
          margin-bottom: 28px;
        }
        .featured-section .section-title { color: #fff; }
        .featured-section .section-sub { color: rgba(255,255,255,0.88); }

        .featured-card,
        .job-card {
          position: relative;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 14px 28px rgba(60,74,95,0.05);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .featured-card:hover,
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 36px rgba(60,74,95,0.10);
        }
        .featured-card::after {
          content: "";
          position: absolute;
          right: -20px;
          bottom: -24px;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: rgba(228,93,80,0.12);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 18px;
          min-height: 42px;
        }
        .card-top-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: ${PALETTE.coral};
          color: #fff;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .type-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 10px;
          border-radius: 999px;
          background: ${PALETTE.warm};
          color: ${PALETTE.coral};
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.01em;
          border: 1px solid rgba(228,93,80,0.16);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
        }
        .job-days {
          font-size: 12px;
          color: ${PALETTE.softText};
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .job-company {
          color: ${PALETTE.slate};
          font-weight: 800;
          margin-bottom: 8px;
          font-size: 15px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .job-title {
          margin: 0 0 8px;
          font-size: 19px;
          line-height: 1.22;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .job-location {
          color: ${PALETTE.softText};
          margin-bottom: 10px;
          font-size: 15px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .job-salary {
          color: ${PALETTE.coral};
          font-size: 20px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin-top: 8px;
        }
        .mini-salary {
          margin-top: 14px;
          color: ${PALETTE.teal};
          font-size: 17px;
          font-weight: 900;
        }
        .all-jobs-panel {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 28px;
          padding: 22px;
          box-shadow: 0 18px 42px rgba(60,74,95,0.07);
          margin-top: 4px;
        }
        .all-jobs-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 18px;
        }
        .all-jobs-title-block {
          display: grid;
          gap: 6px;
        }
        .all-jobs-title {
          margin: 0;
          font-size: 28px;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.04em;
          color: ${PALETTE.slate};
        }
        .all-jobs-sub {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 800;
        }
        .sort-control {
          display: flex;
          align-items: center;
          gap: 10px;
          color: ${PALETTE.slate};
          font-size: 13px;
          font-weight: 900;
          white-space: nowrap;
        }
        .sort-control select {
          height: 44px;
          min-width: 168px;
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          color: ${PALETTE.slate};
          border-radius: 14px;
          padding: 0 14px;
          font-size: 13px;
          font-weight: 850;
          outline: none;
          box-shadow: 0 8px 18px rgba(60,74,95,0.04);
        }
        .quick-type-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .quick-type-tab {
          border: none;
          min-width: 84px;
          height: 40px;
          border-radius: 999px;
          padding: 0 18px;
          background: linear-gradient(180deg, #f5f7f9 0%, #edf1f5 100%);
          color: ${PALETTE.slate};
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 14px rgba(60,74,95,0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .quick-type-tab:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(60,74,95,0.08);
        }
        .quick-type-tab.active {
          background: ${PALETTE.teal};
          color: #fff;
          box-shadow: 0 12px 24px rgba(88,173,173,0.24);
        }
        .soft-job-card {
          position: relative;
          background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 14px 30px rgba(60,74,95,0.055), inset 0 1px 0 rgba(255,255,255,0.95);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          min-height: 230px;
          display: flex;
          flex-direction: column;
        }
        .soft-job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 42px rgba(60,74,95,0.10), inset 0 1px 0 rgba(255,255,255,0.95);
          border-color: rgba(228,93,80,0.16);
        }
        .soft-job-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(118,191,190,0.12), transparent 34%);
          opacity: 0;
          transition: opacity 0.18s ease;
          pointer-events: none;
        }
        .soft-job-card:hover::before { opacity: 1; }
        .soft-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }
        .soft-company {
          color: ${PALETTE.teal};
          font-size: 15px;
          font-weight: 950;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .soft-days {
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.01em;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .soft-days::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(88,173,173,0.42);
        }
        .soft-title {
          position: relative;
          z-index: 1;
          margin: 0 0 12px;
          font-size: 20px;
          line-height: 1.18;
          font-weight: 950;
          letter-spacing: -0.035em;
          color: ${PALETTE.slate};
        }
        .soft-details {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 9px;
          margin-top: 4px;
          margin-bottom: 16px;
        }
        .soft-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${PALETTE.softText};
          font-size: 14px;
          line-height: 1.35;
          font-weight: 750;
          letter-spacing: -0.01em;
        }
        .soft-detail svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          color: ${PALETTE.slate};
        }
        .soft-divider {
          height: 1px;
          background: rgba(228,93,80,0.14);
          margin: auto 0 14px;
          position: relative;
          z-index: 1;
        }
        .soft-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .soft-salary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ff4b2b;
          font-size: 17px;
          font-weight: 950;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .soft-salary svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          color: #ff4b2b;
        }
        .soft-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 76px;
          height: 34px;
          padding: 0 13px;
          border-radius: 999px;
          background: #fff0eb;
          color: #ff4b2b;
          border: 1px solid rgba(255,75,43,0.18);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: -0.01em;
          box-shadow: 0 6px 14px rgba(255,75,43,0.07);
        }
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        .empty-box {
          background: linear-gradient(180deg, #fff 0%, #fbfcfd 100%);
          border: 1px dashed rgba(60,74,95,0.14);
          border-radius: 24px;
          padding: 34px;
          color: ${PALETTE.softText};
          text-align: center;
          box-shadow: 0 14px 24px rgba(60,74,95,0.04);
        }

        .post-modal-backdrop,
        .detail-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(35,48,68,0.38);
          backdrop-filter: blur(6px);
          z-index: 90;
          display: grid;
          place-items: center;
          padding: 18px;
        }
        .post-modal,
        .detail-modal {
          width: min(680px, calc(100vw - 28px));
          max-height: min(88vh, 920px);
          background: linear-gradient(180deg, #fff 0%, #fcfcfd 100%);
          border-radius: 30px;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 34px 80px rgba(35,48,68,0.24);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .post-panel-inner,
        .detail-panel-inner {
          padding: 24px;
          overflow-y: auto;
        }
        .post-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 14px;
        }
        .post-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .post-field.full { grid-column: 1 / -1; }
        .post-field label {
          font-size: 13px;
          font-weight: 800;
          color: ${PALETTE.slate};
        }
        .required-star {
          color: ${PALETTE.coral};
          margin-left: 4px;
        }
        .post-field input, .post-field select, .post-field textarea {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(60,74,95,0.14);
          background: #fff;
          padding: 14px 14px;
          font-size: 14px;
          color: ${PALETTE.text};
          outline: none;
          resize: vertical;
          font-family: inherit;
        }
        .post-field textarea { min-height: 110px; }
        .field-error {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 4px rgba(220,38,38,0.08) !important;
        }
        .error-text {
          font-size: 12px;
          font-weight: 700;
          color: #dc2626;
          margin-top: -2px;
        }
        .post-title {
          margin: 0 0 8px;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .post-desc {
          margin: 0 0 18px;
          color: ${PALETTE.softText};
          font-size: 14px;
          line-height: 1.55;
        }
        .check-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          color: ${PALETTE.text};
          margin-bottom: 16px;
        }
        .check-row input { width: 18px; height: 18px; }
        .modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }
        .feature-box {
          background: ${PALETTE.warm};
          border: 1px solid rgba(228,93,80,0.14);
          border-radius: 18px;
          padding: 14px;
        }
        .feature-box-title {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 900;
          color: ${PALETTE.slate};
        }
        .feature-box-text {
          margin: 0 0 12px;
          color: ${PALETTE.slate};
          font-size: 14px;
          line-height: 1.6;
        }
        .preview-card {
          position: relative;
          margin-top: 14px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.10);
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 10px 20px rgba(60,74,95,0.05);
          overflow: hidden;
        }
        .preview-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }
        .preview-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 11px;
          border-radius: 999px;
          background: ${PALETTE.warm};
          color: ${PALETTE.coral};
          font-size: 12px;
          font-weight: 900;
          border: 1px solid rgba(228,93,80,0.16);
        }
        .preview-meta {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 700;
        }
        .preview-title {
          margin: 0 0 6px;
          font-size: 19px;
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .preview-company {
          color: ${PALETTE.text};
          font-weight: 800;
          margin-bottom: 8px;
        }
        .preview-location {
          color: ${PALETTE.softText};
          margin-bottom: 10px;
          font-size: 14px;
        }
        .preview-salary {
          color: ${PALETTE.coral};
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 10px;
        }
        .preview-desc {
          margin: 0;
          color: ${PALETTE.softText};
          line-height: 1.5;
          font-size: 13px;
          white-space: pre-wrap;
        }
        .preview-helper {
          margin-top: 14px;
          font-size: 13px;
          color: ${PALETTE.softText};
          font-weight: 700;
        }
        .feature-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background: ${PALETTE.coral};
          color: #fff;
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 14px;
          font-weight: 900;
        }
        .detail-modal {
          width: min(760px, calc(100vw - 28px));
        }
        .detail-panel-inner {
          padding: 0;
        }
        .detail-hero {
          position: relative;
          padding: 24px 26px 22px;
          background:
            radial-gradient(circle at top right, rgba(255,75,43,0.14), transparent 34%),
            linear-gradient(180deg, #fff 0%, #fff7f4 100%);
          border-bottom: 1px solid rgba(255,75,43,0.12);
        }
        .detail-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(60,74,95,0.10);
          background: #fff;
          color: ${PALETTE.slate};
          font-size: 22px;
          font-weight: 900;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(60,74,95,0.08);
        }
        .detail-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
          padding-right: 48px;
        }
        .detail-featured-badge,
        .detail-type-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: -0.01em;
        }
        .detail-featured-badge {
          color: #fff;
          background: linear-gradient(180deg, #ff6548 0%, #ff4424 100%);
          box-shadow: 0 10px 20px rgba(255,75,43,0.18);
        }
        .detail-type-badge {
          color: #ff4b2b;
          background: #fff0eb;
          border: 1px solid rgba(255,75,43,0.16);
        }
        .detail-company {
          margin: 0 0 8px;
          color: ${PALETTE.teal};
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .detail-title {
          margin: 0;
          max-width: 560px;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.08;
          font-weight: 950;
          letter-spacing: -0.045em;
          color: ${PALETTE.slate};
        }
        .detail-body {
          padding: 22px 26px 26px;
        }
        .detail-salary-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
          padding: 18px 20px;
          border-radius: 22px;
          background: linear-gradient(180deg, #fff6f2 0%, #fff 100%);
          border: 1px solid rgba(255,75,43,0.14);
          box-shadow: 0 14px 28px rgba(255,75,43,0.08);
        }
        .detail-salary-label {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 4px;
        }
        .detail-salary {
          color: #ff4b2b;
          font-size: 26px;
          font-weight: 950;
          letter-spacing: -0.035em;
        }
        .detail-salary-icon {
          width: 48px;
          height: 48px;
          border-radius: 18px;
          background: #ff4b2b;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 14px 28px rgba(255,75,43,0.20);
          flex-shrink: 0;
        }
        .detail-meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 18px;
        }
        .detail-line {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          min-height: 58px;
          padding: 13px 14px;
          border-radius: 18px;
          background: #fbfcfd;
          border: 1px solid rgba(60,74,95,0.08);
          color: ${PALETTE.softText};
          font-size: 14px;
          font-weight: 800;
        }
        .detail-line-icon {
          width: 30px;
          height: 30px;
          border-radius: 12px;
          background: #fff0eb;
          color: #ff4b2b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .detail-line strong {
          display: block;
          margin-bottom: 2px;
          color: ${PALETTE.slate};
          font-size: 13px;
          font-weight: 950;
        }
        .detail-description-box {
          padding: 18px 20px;
          border-radius: 22px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 12px 26px rgba(60,74,95,0.04);
        }
        .detail-description-title {
          margin: 0 0 10px;
          color: ${PALETTE.slate};
          font-size: 17px;
          font-weight: 950;
          letter-spacing: -0.02em;
        }
        .detail-description {
          color: ${PALETTE.text};
          font-size: 15px;
          line-height: 1.75;
          white-space: pre-wrap;
        }
        .detail-actions {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          margin-top: 18px;
        }
        .detail-apply-note {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 800;
          line-height: 1.45;
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(88,173,173,0.10);
          border: 1px solid rgba(88,173,173,0.12);
        }
        .site-footer {
          margin-top: 34px;
          border-radius: 34px 34px 0 0;
          overflow: hidden;
          background: #2F3949;
          color: rgba(255,255,255,0.92);
        }
        .site-footer-topline {
          height: 12px;
          background: linear-gradient(90deg, ${PALETTE.coral} 0%, #f25b7a 100%);
        }
        .site-footer-inner { padding: 34px 28px 20px; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
          gap: 28px;
          align-items: start;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-logo {
          width: 126px;
          height: auto;
          display: block;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.98;
        }
        .footer-brand-text {
          max-width: 290px;
          color: rgba(255,255,255,0.76);
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }
        .footer-subheading {
          font-size: 16px;
          font-weight: 900;
          color: #fff;
          margin: 0 0 12px;
        }
        .footer-links {
          display: grid;
          gap: 10px;
        }
        .footer-link {
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
        }
        .footer-link-button {
          border: none;
          background: transparent;
          padding: 0;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
        }
        .footer-socials {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
        }
        .footer-social {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          font-weight: 900;
        }
        .footer-boxes {
          display: grid;
          gap: 12px;
          margin-top: 8px;
        }
        .footer-app-box {
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 16px;
          padding: 12px 14px;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
        }
        .footer-app-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 900;
          flex-shrink: 0;
        }
        .footer-app-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .footer-app-text strong { font-size: 15px; }
        .footer-app-text span {
          font-size: 12px;
          color: rgba(255,255,255,0.72);
        }
        .footer-bottom {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.10);
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          align-items: center;
        }
        .footer-bottom-links {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }
        .footer-bottom-link,
        .footer-copy {
          color: rgba(255,255,255,0.62);
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }

        .footer-bottom-link {
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
        }
        .info-modal {
          width: min(760px, calc(100vw - 28px));
          max-height: min(86vh, 820px);
          background: linear-gradient(180deg, #fff 0%, #fcfcfd 100%);
          border-radius: 28px;
          border: 1px solid rgba(60,74,95,0.10);
          box-shadow: 0 34px 80px rgba(35,48,68,0.26);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .info-modal-head {
          position: relative;
          padding: 24px 28px 18px;
          background:
            radial-gradient(circle at top right, rgba(228,93,80,0.13), transparent 32%),
            linear-gradient(180deg, #fff 0%, #fff7f4 100%);
          border-bottom: 1px solid rgba(228,93,80,0.12);
        }
        .info-modal-title {
          margin: 0;
          color: ${PALETTE.slate};
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: -0.045em;
          padding-right: 52px;
        }
        .info-modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid rgba(60,74,95,0.10);
          background: #fff;
          color: ${PALETTE.slate};
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(60,74,95,0.08);
        }
        .info-modal-body {
          padding: 24px 28px 28px;
          overflow-y: auto;
          color: ${PALETTE.text};
          font-size: 15px;
          line-height: 1.75;
        }
        .info-modal-body p {
          margin: 0 0 14px;
          color: ${PALETTE.text};
        }
        .info-modal-body ul {
          margin: 8px 0 18px;
          padding-left: 20px;
          color: ${PALETTE.text};
        }
        .info-modal-body li {
          margin-bottom: 8px;
        }
        .info-modal-note {
          margin-top: 18px;
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(88,173,173,0.10);
          border: 1px solid rgba(88,173,173,0.14);
          color: ${PALETTE.slate};
          font-weight: 800;
        }
        .admin-page {
          position: fixed;
          inset: 0;
          z-index: 120;
          background:
            radial-gradient(circle at top left, rgba(228,93,80,0.10), transparent 28%),
            radial-gradient(circle at top right, rgba(88,173,173,0.13), transparent 24%),
            ${PALETTE.bg};
          overflow-y: auto;
          padding: 24px;
        }
        .admin-shell {
          max-width: 1280px;
          margin: 0 auto;
        }
        .admin-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }
        .admin-title-block h1 {
          margin: 0;
          color: ${PALETTE.slate};
          font-size: clamp(28px, 3vw, 44px);
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.055em;
        }
        .admin-title-block p {
          margin: 8px 0 0;
          color: ${PALETTE.softText};
          font-size: 14px;
          font-weight: 800;
        }
        .admin-logo {
          height: 74px;
          object-fit: contain;
        }
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 18px;
        }
        .admin-stat {
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 14px 30px rgba(60,74,95,0.06);
        }
        .admin-stat span {
          display: block;
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 8px;
        }
        .admin-stat strong {
          color: ${PALETTE.slate};
          font-size: 28px;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.04em;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-items: start;
        }
        .admin-panel {
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 26px;
          padding: 18px;
          box-shadow: 0 18px 42px rgba(60,74,95,0.08);
        }
        .admin-panel h2 {
          margin: 0 0 14px;
          color: ${PALETTE.slate};
          font-size: 22px;
          font-weight: 950;
          letter-spacing: -0.035em;
        }
        .admin-list {
          display: grid;
          gap: 12px;
        }
        .admin-job {
          background: linear-gradient(180deg, #fff 0%, #fbfcfd 100%);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 18px;
          padding: 14px;
        }
        .admin-job-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }
        .admin-job-company {
          color: ${PALETTE.teal};
          font-size: 13px;
          font-weight: 950;
        }
        .admin-job h3 {
          margin: 3px 0 4px;
          color: ${PALETTE.slate};
          font-size: 17px;
          line-height: 1.15;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .admin-job p {
          margin: 0;
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 750;
          line-height: 1.45;
        }
        .admin-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 7px 10px;
          background: #fff0eb;
          color: #ff4b2b;
          font-size: 11px;
          font-weight: 950;
          white-space: nowrap;
          border: 1px solid rgba(255,75,43,0.16);
        }
        .admin-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .admin-mini-btn {
          border: none;
          border-radius: 12px;
          padding: 9px 11px;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          background: ${PALETTE.slate};
          color: #fff;
        }
        .admin-mini-btn.light {
          background: #fff;
          color: ${PALETTE.slate};
          border: 1px solid rgba(60,74,95,0.12);
        }
        .admin-mini-btn.danger {
          background: #dc2626;
          color: #fff;
        }
        .admin-empty {
          background: #fff;
          border: 1px dashed rgba(60,74,95,0.18);
          color: ${PALETTE.softText};
          border-radius: 18px;
          padding: 22px;
          text-align: center;
          font-weight: 850;
        }
        @media (max-width: 900px) {
          .admin-page { padding: 14px; }
          .admin-top { align-items: flex-start; flex-direction: column; }
          .admin-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .admin-grid { grid-template-columns: 1fr; }
        }
        .featured-list-modal-grid {
          display: grid;
          gap: 12px;
        }
        .featured-list-modal-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 18px;
          border-radius: 18px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 10px 22px rgba(60,74,95,0.05);
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .featured-list-modal-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(60,74,95,0.09);
        }
        .featured-list-modal-card h4 {
          margin: 4px 0 4px;
          color: ${PALETTE.slate};
          font-size: 18px;
          line-height: 1.15;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .featured-list-modal-card p {
          margin: 0;
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 800;
        }
        .featured-list-modal-card strong {
          color: #ff4b2b;
          font-size: 15px;
          font-weight: 950;
          white-space: nowrap;
        }
        .featured-list-modal-company {
          color: ${PALETTE.teal};
          font-size: 13px;
          font-weight: 950;
        }


        /* --- Hero trust area + premium featured card revizyonu --- */
        .hero-card {
          padding: 24px 26px;
          box-shadow: 0 18px 38px rgba(60,74,95,0.08);
        }
        .hero-content {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
          gap: 30px;
        }
        .hero-title {
          font-size: clamp(28px, 3vw, 46px);
          line-height: 1.12;
          letter-spacing: -0.055em;
        }
        .hero-trust-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
          flex-wrap: nowrap;
        }
        .hero-trust-pill {
          height: 72px;
          min-width: 230px;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 13px 18px;
          border-radius: 20px;
          background: linear-gradient(180deg, #fff8f6 0%, #fff0ec 100%);
          border: 1px solid rgba(255,91,55,0.14);
          box-shadow: 0 16px 34px rgba(255,91,55,0.10);
          color: ${PALETTE.slate};
        }
        .hero-trust-icon {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ff4f26;
          flex-shrink: 0;
          filter: drop-shadow(0 10px 16px rgba(255,82,49,0.16));
        }
        .hero-trust-icon svg {
          display: block;
          width: 48px;
          height: 48px;
          overflow: visible;
        }
        .hero-trust-pill strong {
          display: block;
          color: #ff4f26;
          font-size: 16px;
          line-height: 1.08;
          font-weight: 950;
          letter-spacing: -0.035em;
          white-space: nowrap;
        }
        .hero-trust-pill small {
          display: block;
          margin-top: 6px;
          color: ${PALETTE.slate};
          font-size: 13.5px;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.025em;
          white-space: nowrap;
        }
        .hero-stats-inline,
        .hero-stat-bubble {
          display: none;
        }
        .featured-section {
          background: linear-gradient(135deg, #f35b4d 0%, #ff552b 100%);
          box-shadow: 0 22px 44px rgba(228,93,80,0.20);
          padding: 30px 22px 24px;
        }
        .featured-head {
          margin-bottom: 18px;
        }
        .featured-head-actions {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          color: rgba(255,255,255,0.96);
          font-size: 14px;
          font-weight: 900;
        }
        .featured-head-actions a {
          color: rgba(255,255,255,0.96);
          text-decoration: none;
        }
        .section-title-vitrin::before {
          content: "★";
          width: auto;
          height: auto;
          background: transparent;
          box-shadow: none;
          font-size: 17px;
          color: #fff;
        }
        .featured-card {
          min-height: 218px;
          padding: 24px 26px 26px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.76);
          box-shadow: 0 18px 38px rgba(35,48,68,0.10);
        }
        .featured-card::after {
          display: none;
        }
        .featured-card .card-top {
          margin-bottom: 26px;
          min-height: 34px;
        }
        .featured-card .pill {
          gap: 6px;
          padding: 9px 13px;
          background: ${PALETTE.coral};
          box-shadow: 0 10px 18px rgba(228,93,80,0.22);
        }
        .featured-card .type-tag {
          padding: 8px 12px;
          background: ${PALETTE.warm};
          color: ${PALETTE.coral};
          border-color: rgba(228,93,80,0.20);
        }
        .featured-company {
          color: ${PALETTE.teal};
          font-size: 16px;
          margin-bottom: 6px;
        }
        .featured-title {
          font-size: 21px;
          margin-bottom: 10px;
        }
        .featured-location {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: ${PALETTE.softText};
          font-size: 15px;
          font-weight: 600;
        }
        .featured-location svg {
          width: 17px;
          height: 17px;
          color: ${PALETTE.slate};
          flex-shrink: 0;
        }
        .featured-divider {
          width: min(76%, 360px);
          height: 1px;
          background: rgba(228,93,80,0.18);
          margin: 20px 0 16px;
        }
        .featured-salary-row {
          display: flex;
          align-items: center;
          gap: 9px;
          position: relative;
          z-index: 2;
        }
        .salary-wallet {
          width: 24px;
          height: 24px;
          color: #ff4f26;
          flex-shrink: 0;
        }
        .salary-wallet svg {
          width: 100%;
          height: 100%;
        }
        .featured-salary {
          margin: 0;
          color: #ff4f26;
          font-size: 20px;
        }
        .featured-icon-circle {
          position: absolute;
          right: 26px;
          bottom: 26px;
          width: 82px;
          height: 82px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(228,93,80,0.11);
          color: ${PALETTE.slate};
          z-index: 1;
        }
        .featured-icon-circle svg {
          width: 48px;
          height: 48px;
          opacity: 0.94;
        }


        /* --- Popup düzeltme: direkt iletişimli ferah iki kolon --- */
        .detail-modal {
          width: min(1040px, calc(100vw - 36px));
          max-height: min(88vh, 900px);
          border-radius: 28px;
          overflow: hidden;
          background: #fff;
        }
        .detail-panel-inner {
          padding: 0;
          overflow-y: auto;
        }
        .detail-shell {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.75fr);
          min-height: 610px;
        }
        .detail-left {
          padding: 34px 38px 28px;
          background: linear-gradient(180deg, #fff 0%, #fcfdfe 100%);
        }
        .detail-right {
          padding: 34px 36px 28px;
          background:
            radial-gradient(circle at top right, rgba(255,75,43,0.12), transparent 34%),
            linear-gradient(180deg, #fff8f5 0%, #fff 100%);
          border-left: 1px solid rgba(255,75,43,0.10);
        }
        .detail-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          color: #233044;
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(60,74,95,0.08);
          z-index: 2;
        }
        .detail-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 34px;
          padding-right: 52px;
        }
        .detail-featured-badge,
        .detail-type-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 36px;
          padding: 0 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .detail-featured-badge {
          color: #fff;
          background: linear-gradient(180deg, #ff6548 0%, #ff4424 100%);
          box-shadow: 0 10px 20px rgba(255,75,43,0.18);
        }
        .detail-type-badge {
          color: #ff4b2b;
          background: #fff0eb;
          border: 1px solid rgba(255,75,43,0.16);
        }
        .detail-time-badge {
          color: #0f7778;
          background: rgba(88,173,173,0.13);
          border-color: rgba(88,173,173,0.18);
        }
        .detail-company {
          margin: 0 0 10px;
          color: #58ADAD;
          font-size: 17px;
          font-weight: 950;
          letter-spacing: -0.02em;
        }
        .detail-title {
          margin: 0 0 16px;
          max-width: 620px;
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1.05;
          font-weight: 950;
          letter-spacing: -0.055em;
          color: #3C4A5F;
        }
        .detail-summary {
          max-width: 640px;
          margin: 0 0 26px;
          color: #3C4A5F;
          font-size: 17px;
          line-height: 1.65;
          font-weight: 550;
        }
        .detail-left-meta {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(60,74,95,0.10);
          margin-bottom: 28px;
        }
        .detail-left-meta span {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #3C4A5F;
          font-size: 15px;
          font-weight: 750;
        }
        .detail-left-meta svg {
          width: 18px;
          height: 18px;
          color: #233044;
        }
        .detail-address-grid {
          display: grid;
          gap: 14px;
          margin-bottom: 24px;
        }
        .detail-address-card {
          display: flex;
          align-items: center;
          gap: 14px;
          min-height: 70px;
          padding: 16px 18px;
          border-radius: 20px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.10);
          box-shadow: 0 12px 26px rgba(60,74,95,0.035);
        }
        .detail-address-icon {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          background: #fff0eb;
          color: #ff4b2b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .detail-address-card span {
          display: block;
          color: #5D6B7F;
          font-size: 13px;
          font-weight: 850;
          margin-bottom: 4px;
        }
        .detail-address-card strong {
          display: block;
          color: #233044;
          font-size: 16px;
          line-height: 1.35;
          font-weight: 950;
        }
        .detail-description-box {
          padding: 22px 24px;
          border-radius: 22px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 12px 26px rgba(60,74,95,0.04);
        }
        .detail-description-title {
          margin: 0 0 12px;
          color: #3C4A5F;
          font-size: 19px;
          font-weight: 950;
          letter-spacing: -0.025em;
        }
        .detail-description {
          color: #233044;
          font-size: 15.5px;
          line-height: 1.75;
          white-space: pre-wrap;
        }
        .detail-salary-side {
          padding-bottom: 26px;
          border-bottom: 1px solid rgba(60,74,95,0.10);
          margin-bottom: 22px;
        }
        .detail-salary-side-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .detail-salary-label {
          color: #3C4A5F;
          font-size: 15px;
          font-weight: 950;
          margin-bottom: 10px;
        }
        .detail-salary {
          color: #ff4b2b;
          font-size: clamp(30px, 3vw, 42px);
          line-height: 1.12;
          font-weight: 950;
          letter-spacing: -0.05em;
        }
        .detail-salary-icon {
          width: 72px;
          height: 72px;
          border-radius: 999px;
          background: #fff0eb;
          color: #ff4b2b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .detail-side-list {
          display: grid;
          gap: 0;
          margin-bottom: 22px;
        }
        .detail-side-row {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 12px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(60,74,95,0.10);
        }
        .detail-side-icon {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          background: #f4f6f8;
          color: #3C4A5F;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .detail-side-row span {
          display: block;
          color: #5D6B7F;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 3px;
        }
        .detail-side-row strong {
          display: block;
          color: #233044;
          font-size: 16px;
          line-height: 1.35;
          font-weight: 950;
        }
        .detail-contact-box {
          padding: 18px 18px;
          border-radius: 22px;
          background: rgba(88,173,173,0.10);
          border: 1px solid rgba(88,173,173,0.14);
          margin-bottom: 16px;
        }
        .detail-contact-title {
          color: #0f7778;
          font-size: 16px;
          font-weight: 950;
          margin: 0 0 12px;
        }
        .detail-contact-line {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 8px 0;
          color: #3C4A5F;
          font-size: 14px;
          font-weight: 800;
          border-top: 1px solid rgba(88,173,173,0.13);
        }
        .detail-contact-line:first-of-type {
          border-top: none;
        }
        .detail-contact-line strong {
          color: #233044;
          text-align: right;
          font-weight: 950;
        }
        .detail-apply-note {
          color: #5D6B7F;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.6;
          padding: 0;
          border: none;
          background: transparent;
        }


        .plan-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: 10px;
        }
        .plan-card {
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          border-radius: 20px;
          padding: 18px;
          text-align: left;
          cursor: pointer;
          display: grid;
          gap: 6px;
          box-shadow: 0 10px 22px rgba(60,74,95,0.05);
          color: ${PALETTE.slate};
        }
        .plan-card.active {
          border-color: rgba(255,75,43,0.38);
          background: linear-gradient(180deg, #fff8f5 0%, #fff 100%);
          box-shadow: 0 16px 34px rgba(255,75,43,0.13);
        }
        .plan-card strong {
          font-size: 18px;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .plan-card small {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 800;
        }
        .plan-kicker {
          color: #ff4b2b;
          font-size: 12px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .detail-shell-clean {
          grid-template-columns: 390px 1fr;
          min-height: 700px;
        }
        .detail-side-clean {
          border-right: 1px solid rgba(255,75,43,0.10);
          padding: 34px 32px;
          background: linear-gradient(180deg, #fff 0%, #fbfcfd 100%);
        }
        .detail-main-clean {
          padding: 120px 44px 40px;
          background: #fff;
          border-left: none;
          border-top: none;
        }
        .compact-salary-card {
          margin-top: 26px;
          border-radius: 22px;
          border: 1px solid rgba(255,75,43,0.14);
          background: linear-gradient(180deg, #fff8f5 0%, #fff 100%);
          padding: 22px;
        }
        .compact-salary-card .detail-salary {
          font-size: 34px;
          line-height: 1.12;
        }
        .detail-contact-box-left {
          margin-top: 18px;
          padding: 22px;
          border-radius: 22px;
          background: rgba(88,173,173,0.10);
          border: 1px solid rgba(88,173,173,0.16);
        }
        .detail-contact-box-left .detail-contact-title {
          margin-bottom: 16px;
          color: #0f766e;
        }
        .contact-item {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 12px;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid rgba(60,74,95,0.08);
        }
        .contact-item:last-of-type { border-bottom: none; }
        .contact-icon {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          color: ${PALETTE.slate};
          box-shadow: 0 8px 18px rgba(60,74,95,0.06);
        }
        .contact-item span:not(.contact-icon) {
          display: block;
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 4px;
        }
        .contact-item strong {
          display: block;
          color: ${PALETTE.slate};
          font-size: 15px;
          font-weight: 950;
          line-height: 1.25;
        }
        .clean-note {
          margin: 18px 0 0;
          padding: 0;
          background: transparent;
          border: none;
          color: ${PALETTE.softText};
          font-size: 13px;
          line-height: 1.55;
        }
        .detail-meta-clean {
          margin-top: 28px;
          padding-bottom: 26px;
          border-bottom: 1px solid rgba(60,74,95,0.10);
        }
        .detail-meta-clean span strong {
          margin-left: 4px;
          color: ${PALETTE.slate};
        }
        .detail-description-clean {
          margin-top: 28px;
          padding: 24px 26px;
        }
        @media (max-width: 1100px) {
          .filter-grid { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: 1fr; }
          .jobs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 760px) {
          .container { width: calc(100% - 16px); max-width: none; }
          .footer-grid { grid-template-columns: 1fr; gap: 22px; }
          .topbar-inner {
            min-height: auto;
            padding: 4px 0 8px;
            align-items: flex-start;
            flex-direction: column;
          }
          .brand-wrap { width: 100%; }
          .brand-logo { height: 92px; }
          .topbar.small .brand-logo { height: 92px; }
          .top-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .btn { width: 100%; padding: 12px 14px; }
          .hero-card { padding: 14px 16px; border-radius: 20px; }
          .hero-title { font-size: 24px; }
          .hero-content { grid-template-columns: 1fr; gap: 14px; }
          .hero-trust-row { justify-content: flex-start; flex-wrap: wrap; }
          .hero-trust-pill { width: 100%; min-width: 0; }
          .featured-head-actions { gap: 12px; font-size: 12px; }
          .featured-card { min-height: 220px; }
          .featured-icon-circle { width: 64px; height: 64px; right: 18px; bottom: 22px; }
          .featured-icon-circle svg { width: 38px; height: 38px; }
          .all-jobs-panel { padding: 16px; border-radius: 22px; }
          .all-jobs-top { align-items: flex-start; flex-direction: column; }
          .sort-control { width: 100%; justify-content: space-between; }
          .sort-control select { flex: 1; min-width: 0; }
          .quick-type-tabs { gap: 8px; }
          .quick-type-tab { min-width: auto; padding: 0 14px; }
          .jobs-grid { grid-template-columns: 1fr; }
          .post-form-grid { grid-template-columns: 1fr; }
          .detail-meta { grid-template-columns: 1fr; }
          .detail-actions { grid-template-columns: 1fr; }
          .detail-hero { padding: 22px 18px 20px; }
          .detail-body { padding: 18px; }

          .detail-shell { grid-template-columns: 1fr; min-height: auto; }
          .detail-left, .detail-right { padding: 22px 18px; }
          .detail-right { border-left: none; border-top: 1px solid rgba(255,75,43,0.10); }
          .detail-side-clean { border-right: none; border-bottom: 1px solid rgba(255,75,43,0.10); }
          .detail-main-clean { padding: 22px 18px; }
          .detail-title { font-size: 32px; }
          .detail-left-meta { gap: 14px; }
          .plan-grid { grid-template-columns: 1fr; }

        }
      `}</style>

      <header className={`topbar ${headerSmall ? "small" : ""}`} style={{ opacity: headerOpacity }}>
        <div className="container topbar-inner">
          <div className="brand-wrap">
            <a
              className="brand-logo-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                goHome();
              }}
            >
              <img
                className="brand-logo"
                src={logoSrc}
                alt="Ekiş logo"
                onError={() => {
                  if (logoSrc !== "/logo-ekis.png") setLogoSrc("/logo-ekis.png");
                }}
              />
            </a>
          </div>

          <div className="top-actions">
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Hemen İlan Ver
            </button>
            <a className="btn btn-secondary" href="#ilanlar">
              Hemen İş Bul
            </a>
          </div>
        </div>
      </header>

      {showForm && (
        <div className="post-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-panel-inner">
              <h3 className="post-title">İlan ver</h3>
              <p className="post-desc">Formu doldur, istersen ilanını vitrine çıkar ve ön izlemesini gör.</p>

              <div className="post-form-grid">
                <div className="post-field">
                  <label>Firma adı<span className="required-star">*</span></label>
                  <input
                    className={errors.company ? "field-error" : ""}
                    name="company"
                    type="text"
                    placeholder="Örn. Nova Organizasyon"
                    value={formData.company}
                    onChange={handleFormChange}
                  />
                  {errors.company && <div className="error-text">{errors.company}</div>}
                </div>

                <div className="post-field">
                  <label>İlan başlığı<span className="required-star">*</span></label>
                  <input
                    className={errors.title ? "field-error" : ""}
                    name="title"
                    type="text"
                    placeholder="Örn. Etkinlik Karşılama Elemanı"
                    value={formData.title}
                    onChange={handleFormChange}
                  />
                  {errors.title && <div className="error-text">{errors.title}</div>}
                </div>

                <div className="post-field">
                  <label>Şehir / Konum<span className="required-star">*</span></label>
                  <input
                    className={errors.city ? "field-error" : ""}
                    name="city"
                    type="text"
                    placeholder="Örn. İstanbul / Kadıköy"
                    value={formData.city}
                    onChange={handleFormChange}
                  />
                  {errors.city && <div className="error-text">{errors.city}</div>}
                </div>

                <div className="post-field">
                  <label>Çalışma tipi</label>
                  <select name="workType" value={formData.workType} onChange={handleFormChange}>
                    {types.filter((item) => item !== "Tümü").map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="post-field full">
                  <label>İş adresi / buluşma noktası<span className="required-star">*</span></label>
                  <input
                    className={errors.workAddress ? "field-error" : ""}
                    name="workAddress"
                    type="text"
                    placeholder="Örn. Kadıköy / Moda, AVM önü, depo giriş kapısı"
                    value={formData.workAddress}
                    onChange={handleFormChange}
                  />
                  {errors.workAddress && <div className="error-text">{errors.workAddress}</div>}
                </div>

                <div className="post-field">
                  <label>Yetkili kişi adı</label>
                  <input
                    name="contactName"
                    type="text"
                    placeholder="Örn. Ahmet Yılmaz"
                    value={formData.contactName}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="post-field">
                  <label>Telefon / WhatsApp<span className="required-star">*</span></label>
                  <input
                    className={errors.contactPhone ? "field-error" : ""}
                    name="contactPhone"
                    type="text"
                    placeholder="Örn. 0555 555 55 55"
                    value={formData.contactPhone}
                    onChange={handleFormChange}
                  />
                  {errors.contactPhone && <div className="error-text">{errors.contactPhone}</div>}
                </div>

                <div className="post-field full">
                  <label>Ücret bilgisi<span className="required-star">*</span></label>
                  <input
                    className={errors.salary ? "field-error" : ""}
                    name="salary"
                    type="text"
                    inputMode="numeric"
                    placeholder="Örn. 1500"
                    value={formData.salary}
                    onChange={handleFormChange}
                  />
                  {errors.salary && <div className="error-text">{errors.salary}</div>}
                </div>

                <div className="post-field full">
                  <label>İş açıklaması<span className="required-star">*</span></label>
                  <textarea
                    className={errors.description ? "field-error" : ""}
                    name="description"
                    placeholder="İşin detaylarını, saat bilgisini ve adaydan beklentilerini yaz..."
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                  {errors.description && <div className="error-text">{errors.description}</div>}
                </div>
              </div>

              {showPreview && (
                <div className="preview-card">
                  <div className="preview-top">
                    <div className="preview-badge">"İlan ön izlemesi"</div>
                    <div className="preview-meta">{formData.workType || "Günlük"}</div>
                  </div>

                  <h4 className="preview-title">{formData.title || "İlan başlığı burada görünecek"}</h4>
                  <div className="preview-company">{formData.company || "Firma adı burada görünecek"}</div>
                  <div className="preview-location">{formData.city || "Şehir / Konum burada görünecek"}</div>
                  <div className="preview-salary">{previewSalary || "Ücret bilgisi burada görünecek"}</div>
                  <p className="preview-desc">
                    {formData.description || "İş açıklaması burada görünecek. Kullanıcılar ilanı açtığında bu alanı okuyacak."}
                  </p>
                </div>
              )}

              <div className="modal-actions">
                <button className="btn btn-primary" type="button" onClick={() => setShowPreview((prev) => !prev)}>
                  {showPreview ? "Önizlemeyi Gizle" : "İlanı Önizle"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={handlePublishClick}>
                  İlanı Yayınla
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showPlanModal && (
        <div className="post-modal-backdrop" onClick={() => setShowPlanModal(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-panel-inner">
              <h3 className="post-title">İlanını nasıl yayınlamak istersin?</h3>
              <p className="post-desc">
                Standart ilanı ücretsiz yayınlayabilir ya da vitrinde öne çıkarabilirsin.
              </p>

              <div className="plan-grid">
                <button
                  type="button"
                  className={`plan-card ${selectedPlan === "free" ? "active" : ""}`}
                  onClick={() => setSelectedPlan("free")}
                >
                  <span className="plan-kicker">Standart</span>
                  <strong>Ücretsiz İlan</strong>
                  <small>Standart listede yayınlanır.</small>
                </button>

                <button
                  type="button"
                  className={`plan-card ${selectedPlan === "featured" ? "active" : ""}`}
                  onClick={() => setSelectedPlan("featured")}
                >
                  <span className="plan-kicker">Ekiş Acil</span>
                  <strong>Ekiş Acil İlanı</strong>
                  <small>Ekiş Acil alanında daha görünür olur.</small>
                </button>
              </div>

              <div className="modal-actions" style={{ marginTop: 18 }}>
                <button className="btn btn-primary" type="button" onClick={handlePlanContinue}>
                  {selectedPlan === "featured" ? "Ödeme Adımına Geç" : "Ücretsiz Yayınla"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowPlanModal(false)}>
                  Geri
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedJob && (
        <div className="detail-modal-backdrop" onClick={() => setSelectedJob(null)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="detail-close" type="button" onClick={() => setSelectedJob(null)}>×</button>

            <div className="detail-panel-inner">
              <div className="detail-shell detail-shell-clean">
                <aside className="detail-left detail-side-clean">
                  <div className="detail-badge-row">
                    {selectedJob.plan === "featured" || selectedJob.featuredStatus === "live" ? (
                      <span className="detail-featured-badge">★ Öne Çıkan</span>
                    ) : (
                      <span className="detail-featured-badge">Yeni İlan</span>
                    )}
                    <span className="detail-type-badge">{selectedJob.type}</span>
                    <span className="detail-type-badge detail-time-badge">{getDaysAgoLabel(selectedJob.createdAt)}</span>
                  </div>

                  <div className="detail-salary-side compact-salary-card">
                    <div className="detail-salary-side-top">
                      <div>
                        <div className="detail-salary-label">Ücret bilgisi</div>
                        <div className="detail-salary">{selectedJob.salary}</div>
                      </div>
                      <div className="detail-salary-icon" aria-hidden="true">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                          <path d="M4 7.5h16v10H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="M7 10.5h.01M17 14.5h.01M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="detail-contact-box detail-contact-box-left">
                    <h4 className="detail-contact-title">İletişim bilgileri</h4>
                    <div className="contact-item">
                      <span className="contact-icon">👤</span>
                      <div><span>Yetkili kişi</span><strong>{selectedJob.contactName || "İşveren"}</strong></div>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">☎</span>
                      <div><span>Telefon / WhatsApp</span><strong>{selectedJob.contactPhone}</strong></div>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">⌖</span>
                      <div><span>Adres</span><strong>{selectedJob.workAddress || selectedJob.location}</strong></div>
                    </div>
                    <p className="detail-apply-note clean-note">
                      Görüşme ve işe alım süreci işveren tarafından yürütülür. Ekiş yalnızca ilan ve iletişim bilgisini gösterir.
                    </p>
                  </div>
                </aside>

                <section className="detail-right detail-main-clean">
                  <p className="detail-company">{selectedJob.company}</p>
                  <h3 className="detail-title">{selectedJob.title}</h3>
                  <p className="detail-summary">
                    {selectedJob.description || "Bu ilan için açıklama bilgisi bulunmuyor."}
                  </p>

                  <div className="detail-left-meta detail-meta-clean">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M4 7h16v12H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                      Çalışma tipi: <strong>{selectedJob.type}</strong>
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 3 4 8l8 5 8-5-8-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M4 13l8 5 8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Kategori: <strong>{selectedJob.category || "Vitrin ilan"}</strong>
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Yayın: <strong>{getDaysAgoLabel(selectedJob.createdAt)}</strong>
                    </span>
                  </div>

                  <div className="detail-description-box detail-description-clean">
                    <h4 className="detail-description-title">İş açıklaması</h4>
                    <div className="detail-description">
                      {selectedJob.description || "Bu ilan için açıklama bilgisi bulunmuyor."}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="container">
        <section className="top-search" id="ilanlar">
          <div className="filter-wrap">
            <div className="filter-grid">
              <div className="field">
                <label>İlanlarda ara</label>
                <input
                  type="text"
                  placeholder="Ne iş arıyorsun? (garson, kurye...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
              </div>

              <div className="field">
                <label>Şehir seç</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  {cities.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Meslek seç</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Çalışma tipi seç</label>
                <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                  {types.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="search-action">
                <button className="search-btn search-btn-primary" type="button" onClick={handleSearchSubmit}>Ara</button>
              </div>

              <div className="search-action">
                <button className="search-btn search-btn-clear" type="button" onClick={clearFilters}>Temizle</button>
              </div>
            </div>
          </div>
        </section>

        <section className="hero">
          <div className="hero-card">
            <div className="hero-content">
              <div>
                <h1 className="hero-title">Günlük, saatlik ve part time işleri kolayca keşfet.</h1>
              </div>

              <div className="hero-trust-row">
                <div className="hero-trust-pill">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M24 5.5 37 10.6v10.1c0 8.3-5.4 15.9-13 18.8-7.6-2.9-13-10.5-13-18.8V10.6L24 5.5Z" fill="#ff4f26"/>
                      <path d="M18.2 23.8 22.2 27.8 30.8 18.7" stroke="white" strokeWidth="3.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>
                    <strong>Onaylı ilanlar</strong>
                    <small>Güvenle başvur</small>
                  </span>
                </div>
                <div className="hero-trust-pill">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M24 5.5c2.1 0 3.7 2.2 5.5 2.8 1.9.6 4.4-.4 6 .8 1.6 1.2 1.7 3.9 2.9 5.5 1.2 1.6 3.8 2.4 4.4 4.3.6 1.8-.9 4.1-.9 6.1s1.5 4.3.9 6.1c-.6 1.9-3.2 2.7-4.4 4.3-1.2 1.6-1.3 4.3-2.9 5.5-1.6 1.2-4.1.2-6 .8-1.8.6-3.4 2.8-5.5 2.8s-3.7-2.2-5.5-2.8c-1.9-.6-4.4.4-6-.8-1.6-1.2-1.7-3.9-2.9-5.5-1.2-1.6-3.8-2.4-4.4-4.3-.6-1.8.9-4.1.9-6.1s-1.5-4.3-.9-6.1c.6-1.9 3.2-2.7 4.4-4.3 1.2-1.6 1.3-4.3 2.9-5.5 1.6-1.2 4.1-.2 6-.8 1.8-.6 3.4-2.8 5.5-2.8Z" fill="#ff4f26"/>
                      <path d="M18.5 30.2 29.5 17.8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      <circle cx="18.5" cy="18.8" r="2.8" stroke="white" strokeWidth="2.6"/>
                      <circle cx="29.6" cy="29.3" r="2.8" stroke="white" strokeWidth="2.6"/>
                    </svg>
                  </span>
                  <span>
                    <strong>Türkiye geneli fırsatlar</strong>
                    <small>Tüm şehirlerde ilanlar</small>
                  </span>
                </div>
                <div className="hero-trust-pill">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M27.4 4.8 12.5 27.2h10.2l-2.2 16 15-22.5H25.2l2.2-15.9Z" fill="#ff4f26"/>
                    </svg>
                  </span>
                  <span>
                    <strong>Hızlı başvuru süreci</strong>
                    <small>İlanlara kolayca başvur</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section featured-section" id="one-cikanlar">
          <div className="section-head featured-head">
            <h2 className="section-title section-title-vitrin">Ekiş Acil</h2>
            <div className="featured-head-actions">
              <span>{filteredFeaturedJobs.length} ilan</span>
              <a href="#one-cikanlar" onClick={(e) => { e.preventDefault(); setShowFeaturedList(true); }}>Tümünü Gör →</a>
            </div>
          </div>

          <div className="featured-grid">
            {visibleFeaturedJobs.map((job) => (
              <article key={job.id} className="featured-card" onClick={() => setSelectedJob(job)}>
                <div className="card-top">
                  <div className="pill"><span>★</span> Öne Çıkan</div>
                  <div className="card-top-right">
                    <div className="job-days">{getDaysAgoLabel(job.createdAt)}</div>
                    <div className="type-tag">{job.type}</div>
                  </div>
                </div>

                <div className="job-company featured-company">{job.company}</div>
                <h3 className="job-title featured-title">{job.title}</h3>
                <div className="featured-location">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{job.location}</span>
                </div>

                <div className="featured-divider" />

                <div className="featured-salary-row">
                  <div className="salary-wallet" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 8.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M4 8.5 17 5v3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="job-salary featured-salary">{job.salary}</div>
                </div>

                <div className="featured-icon-circle">
                  <CategoryIcon job={job} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="all-jobs-panel">
            <div className="all-jobs-top">
              <div className="all-jobs-title-block">
                <h2 className="all-jobs-title">Tüm ilanlar</h2>
                <div className="all-jobs-sub">{filteredJobs.length} ilan bulundu</div>
              </div>

              <label className="sort-control">
                <span>Sırala:</span>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="newest">En yeni ilanlar</option>
                  <option value="salaryHigh">Ücret yüksekten düşüğe</option>
                  <option value="salaryLow">Ücret düşükten yükseğe</option>
                </select>
              </label>
            </div>

            <div className="quick-type-tabs" aria-label="Hızlı çalışma tipi filtreleri">
              {types.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`quick-type-tab ${submittedJobType === item ? "active" : ""}`}
                  onClick={() => {
                    setJobType(item);
                    setSubmittedJobType(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {filteredJobs.length === 0 ? (
              <div className="empty-box">Aramana uygun ilan bulunamadı.</div>
            ) : (
              <div className="jobs-grid">
                {sortedJobs.map((job) => (
                  <article key={job.id} className="soft-job-card" onClick={() => setSelectedJob(job)}>
                    <div className="soft-top">
                      <div className="soft-company">{job.company}</div>
                      <div className="soft-days">{getDaysAgoLabel(job.createdAt)}</div>
                    </div>

                    <h3 className="soft-title">{job.title}</h3>

                    <div className="soft-details">
                      <div className="soft-detail">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" fill="currentColor" opacity="0.20"></path>
                          <circle cx="12" cy="10" r="2.6" fill="currentColor"></circle>
                        </svg>
                        <span>{job.location}</span>
                      </div>
                      <div className="soft-detail">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 3 4 8l8 5 8-5-8-5Z" fill="currentColor" opacity="0.18"></path>
                          <path d="m4 12 8 5 8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>{job.category}</span>
                      </div>
                    </div>

                    <div className="soft-divider" />

                    <div className="soft-footer">
                      <div className="soft-salary">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M4 8.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                          <path d="M4 8.5 17 5v3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>{job.salary}</span>
                      </div>
                      <div className="soft-badge">{job.type}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {infoModal && (
          <div className="post-modal-backdrop" onClick={() => setInfoModal(null)}>
            <div className="info-modal" onClick={(e) => e.stopPropagation()}>
              <div className="info-modal-head">
                <h3 className="info-modal-title">{footerInfoContent[infoModal].title}</h3>
                <button className="info-modal-close" type="button" onClick={() => setInfoModal(null)}>×</button>
              </div>
              <div className="info-modal-body">
                {footerInfoContent[infoModal].blocks.map((block, index) => {
                  if (block.type === "list") {
                    return (
                      <ul key={index}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  if (block.type === "note") {
                    return (
                      <div className="info-modal-note" key={index}>
                        {block.text}
                      </div>
                    );
                  }

                  return <p key={index}>{block.text}</p>;
                })}
              </div>
            </div>
          </div>
        )}

        {showFeaturedList && (
          <div className="post-modal-backdrop" onClick={() => setShowFeaturedList(false)}>
            <div className="info-modal" onClick={(e) => e.stopPropagation()}>
              <div className="info-modal-head">
                <h3 className="info-modal-title">Tüm Ekiş Acil İlanları</h3>
                <button className="info-modal-close" type="button" onClick={() => setShowFeaturedList(false)}>×</button>
              </div>
              <div className="info-modal-body">
                {filteredFeaturedJobs.length === 0 ? (
                  <div className="empty-box">Seçili filtrelere uygun Ekiş Acil ilanı bulunamadı.</div>
                ) : (
                  <div className="featured-list-modal-grid">
                    {filteredFeaturedJobs.map((job) => (
                      <article
                        key={job.id}
                        className="featured-list-modal-card"
                        onClick={() => {
                          setShowFeaturedList(false);
                          setSelectedJob(job);
                        }}
                      >
                        <div>
                          <div className="featured-list-modal-company">{job.company}</div>
                          <h4>{job.title}</h4>
                          <p>{job.location}</p>
                        </div>
                        <strong>{job.salary}</strong>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <footer className="site-footer">
          <div className="site-footer-topline" />
          <div className="site-footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <img
                  className="footer-logo"
                  src={logoSrc}
                  alt="Ekiş logo"
                  onError={() => {
                    if (logoSrc !== "/logo-ekis.png") setLogoSrc("/logo-ekis.png");
                  }}
                />
                <p className="footer-brand-text">
                  Günlük, saatlik ve part time iş fırsatlarını tek yerde buluşturan sade ve hızlı iş ilan platformu.
                </p>
              </div>

              <div>
                <h3 className="footer-subheading">İş Arayan</h3>
                <div className="footer-links">
                  <a className="footer-link" href="#ilanlar">İlanları keşfet</a>
                  <a className="footer-link" href="#one-cikanlar">Ekiş Acil</a>
                  <button className="footer-link footer-link-button" type="button" onClick={() => setInfoModal("cityJobs")}>Şehre göre işler</button>
                  <button className="footer-link footer-link-button" type="button" onClick={() => setInfoModal("faq")}>Sık sorulanlar</button>
                </div>
              </div>

              <div>
                <h3 className="footer-subheading">İşveren</h3>
                <div className="footer-links">
                  <a className="footer-link" href="#" onClick={(e) => { e.preventDefault(); setShowForm(true); }}>İlan ver</a>
                  <a className="footer-link" href="#" onClick={(e) => { e.preventDefault(); setShowForm(true); setSelectedPlan("featured"); }}>Ekiş Acil’e çıkar</a>
                  <button className="footer-link footer-link-button" type="button" onClick={() => setInfoModal("pricing")}>Fiyatlandırma</button>
                  <button className="footer-link footer-link-button" type="button" onClick={() => setInfoModal("support")}>Destek al</button>
                </div>
              </div>

              <div>
                <h3 className="footer-subheading">Bizi takip et</h3>
                <div className="footer-socials">
                  <a className="footer-social" href="#" aria-label="Instagram">ig</a>
                  <a className="footer-social" href="#" aria-label="X">x</a>
                  <a className="footer-social" href="#" aria-label="TikTok">tt</a>
                </div>

                <div className="footer-boxes">
                  <a className="footer-app-box" href="#">
                    <span className="footer-app-icon">▶</span>
                    <span className="footer-app-text">
                      <strong>Mobil uygulama</strong>
                      <span>Yakında yayında</span>
                    </span>
                  </a>
                  <a className="footer-app-box" href="#">
                    <span className="footer-app-icon">★</span>
                    <span className="footer-app-text">
                      <strong>İşveren paketi</strong>
                      <span>Daha fazla görünürlük</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-bottom-links">
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("about")}>Hakkımızda</button>
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("terms")}>Kullanım şartları</button>
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("privacy")}>Gizlilik</button>
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("contact")}>İletişim</button>
              </div>
              <div className="footer-copy">Ekiş © 2026</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
