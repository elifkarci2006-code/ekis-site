import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";

import {
  SHOPIER_FEATURED_LINK,
  PALETTE,
  featuredSeed,
  jobsSeed,
  categories,
  types,
  cities,
} from "./data";

import {
  getDaysAgoLabel,
  getJobDurationDays,
  getJobExpireDate,
  getDaysLeftLabel,
  isJobActive,
  generateCaptchaQuestion,
  inferCategory,
  formatSalaryPreview,
  toTitleCase,
  normalizeLocation,
  buildPublicAddress,
  buildPrivateMapAddress,
  cleanPhone,
  getPhoneHref,
  getWhatsappHref,
  getMapHref,
  getShareText,
} from "./utils";

import { getStyles } from "./styles";


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
  const [adminFilter, setAdminFilter] = useState("all");
  const [adminSearch, setAdminSearch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [pendingJob, setPendingJob] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/logo-ekis.png");
  const [headerSmall, setHeaderSmall] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [jobs, setJobs] = useState(jobsSeed);
  const [featuredJobs, setFeaturedJobs] = useState(featuredSeed);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [errors, setErrors] = useState({});
  const [infoModal, setInfoModal] = useState(null);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");
  const [adminAuthenticated, setAdminAuthenticated] = useState(
    () => window.localStorage.getItem("ekisAdminAuth") === "true"
  );
  const [captcha, setCaptcha] = useState(() => generateCaptchaQuestion());
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    category: "",
    city: "",
    district: "",
    neighborhood: "",
    street: "",
    doorNo: "",
    workType: "Günlük",
    salary: "",
    description: "",
    workAddress: "",
    contactName: "",
    contactPhone: "",
    captchaAnswer: "",
  });
useEffect(() => {
  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("job_posts")
      .select("*")
      .neq("status", "rejected")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase hata:", error);
      return;
    }

    if (!data || data.length === 0) {
      console.log("Henüz gerçek ilan yok, demo ilanlar gösteriliyor.");
      return;
    }

    const formatted = data.map((job) => ({
      id: job.id,
      dbId: job.id,
      title: toTitleCase(job.job_title),
      company: toTitleCase(job.company_name),
      city: job.city,
      district: job.district,
      neighborhood: job.neighborhood || "",
      street: job.street || "",
      doorNo: job.door_no || "",
      location: normalizeLocation(job.city, job.district),
      workAddress: buildPublicAddress({
        neighborhood: job.neighborhood,
        street: job.street,
      }) || normalizeLocation(job.city, job.district),
      salary: job.salary,
      type: job.plan_type === "featured" ? "Öne Çıkan" : "Standart",
      description: job.description,
      contactPhone: job.phone,
      createdAt: job.created_at,
      category: job.category || "Genel",
      viewsCount: Number(job.views_count || 0),
      status: job.status || "pending",
      plan: job.plan_type === "featured" ? "featured" : "free",
      featuredStatus:
        job.plan_type === "featured" ? "live" : null,
    }));

    const pendingFromDb = formatted.filter(
      (j) => j.status === "pending"
    );

    const normalJobs = formatted.filter(
      (j) => j.status !== "pending" && j.featuredStatus !== "live"
    );

    const featuredJobsFromDb = formatted.filter(
      (j) => j.status !== "pending" && j.featuredStatus === "live"
    );

    setPendingJobs(pendingFromDb);
    setJobs([...normalJobs, ...jobsSeed]);
    setFeaturedJobs([...featuredJobsFromDb, ...featuredSeed]);
  };

  fetchJobs();
}, []);
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
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      setIsAdminRoute(hash === "#admin" || path.endsWith("/admin") || searchParams.get("admin") === "1");
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

  const handleAdminLogin = () => {
    if (adminPassword === "ekis2026") {
      window.localStorage.setItem("ekisAdminAuth", "true");
      setAdminAuthenticated(true);
      setAdminLoginError("");
      setAdminPassword("");
      return;
    }

    setAdminLoginError("Şifre hatalı kankam 😄");
  };

  const handleAdminLogout = () => {
    window.localStorage.removeItem("ekisAdminAuth");
    setAdminAuthenticated(false);
    setAdminPassword("");
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
        category: "",
        city: "",
        district: "",
        neighborhood: "",
        street: "",
        doorNo: "",
        workType: "Günlük",
        salary: "",
        description: "",
        workAddress: "",
        contactName: "",
        contactPhone: "",
        captchaAnswer: "",
      });
      setCaptcha(generateCaptchaQuestion());
    }
  }, [showForm]);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.company.trim()) nextErrors.company = "Firma adı zorunludur.";
    if (!formData.title.trim()) nextErrors.title = "İlan başlığı zorunludur.";
    if (!formData.category.trim()) nextErrors.category = "Kategori seçimi zorunludur.";
    if (!formData.city.trim()) nextErrors.city = "Şehir seçimi zorunludur.";
    if (!formData.district.trim()) nextErrors.district = "İlçe zorunludur.";
    if (!formData.neighborhood.trim()) nextErrors.neighborhood = "Mahalle zorunludur.";
    if (!formData.street.trim()) nextErrors.street = "Sokak / cadde zorunludur.";

    const phoneDigits = formData.contactPhone.replace(/\D/g, "");
    const invalidRepeatingPhone = /^(\d)\1+$/.test(phoneDigits);
    const allJobsForSpamCheck = [...jobs, ...featuredJobs, ...pendingJobs];
    const duplicatePhoneCount = allJobsForSpamCheck.filter(
      (job) => String(job.contactPhone || "").replace(/\D/g, "") === phoneDigits
    ).length;

    if (!formData.contactPhone.trim()) {
      nextErrors.contactPhone = "Telefon numarası zorunludur.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      nextErrors.contactPhone = "Geçerli bir telefon numarası giriniz.";
    } else if (invalidRepeatingPhone || phoneDigits === "1234567890" || phoneDigits === "12345678901") {
      nextErrors.contactPhone = "Lütfen gerçek bir telefon numarası giriniz.";
    } else if (duplicatePhoneCount >= 3) {
      nextErrors.contactPhone = "Bu numara ile çok fazla ilan girilmiş. Lütfen farklı bir numara kullanın.";
    }

    if (!formData.salary.trim()) nextErrors.salary = "Ücret bilgisi zorunludur.";
    if (!formData.description.trim()) nextErrors.description = "İş açıklaması zorunludur.";

    if (!formData.captchaAnswer.trim()) {
      nextErrors.captchaAnswer = "Güvenlik sorusunu cevaplayınız.";
    } else if (formData.captchaAnswer.trim() !== captcha.answer) {
      nextErrors.captchaAnswer = "Güvenlik sorusu hatalı cevaplandı.";
    }

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

    if (name === "captchaAnswer") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, captchaAnswer: onlyNumbers }));
      setErrors((prev) => ({ ...prev, captchaAnswer: "" }));
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
    title: toTitleCase(formData.title),
    company: toTitleCase(formData.company),
    city: toTitleCase(formData.city),
    district: toTitleCase(formData.district),
    neighborhood: toTitleCase(formData.neighborhood),
    street: toTitleCase(formData.street),
    doorNo: String(formData.doorNo || "").trim(),
    location: normalizeLocation(formData.city, formData.district),
    salary: formatSalaryPreview(formData.workType, formData.salary),
    type: formData.workType,
    category: formData.category,
    description: formData.description.trim(),
    workAddress: buildPublicAddress({
      neighborhood: formData.neighborhood,
      street: formData.street,
    }),
    contactName: toTitleCase(formData.contactName),
    contactPhone: formData.contactPhone.trim(),
    status: "active",
    durationDays: selectedPlan === "featured" ? 15 : 30,
    createdAt: new Date().toISOString(),
  });

  const handlePublishClick = () => {
    if (!validateForm()) return;
    setPendingJob(buildJobFromForm());
    setSelectedPlan("free");
    setShowPlanModal(true);
  };

  const handlePlanContinue = async () => {
    if (!pendingJob) return;

    const payload = {
      company_name: pendingJob.company,
      job_title: pendingJob.title,
      category: pendingJob.category,
      city: toTitleCase(formData.city),
      district: toTitleCase(formData.district),
      neighborhood: toTitleCase(formData.neighborhood),
      street: toTitleCase(formData.street),
      door_no: String(formData.doorNo || "").trim(),
      salary: pendingJob.salary,
      description: pendingJob.description,
      phone: pendingJob.contactPhone,
      plan_type: selectedPlan === "featured" ? "featured" : "normal",
      views_count: 0,
      status: "pending",
      expires_at: new Date(
        Date.now() +
          (selectedPlan === "featured" ? 15 : 30) *
            24 *
            60 *
            60 *
            1000
      ).toISOString(),
    };

    const { data, error } = await supabase
      .from("job_posts")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("İlan kaydedilemedi:", error);
      alert(`İlan kaydedilemedi 😥\n${error?.message || ""}`);
      return;
    }

    const reviewJob = {
      ...pendingJob,
      id: data?.id || pendingJob.id,
      dbId: data?.id,
      plan: selectedPlan === "featured" ? "featured" : "free",
      durationDays: selectedPlan === "featured" ? 15 : 30,
      status: "pending",
      paymentStatus: selectedPlan === "featured" ? "pending" : "not_required",
      submittedAt: new Date().toISOString(),
      city: toTitleCase(formData.city),
      district: toTitleCase(formData.district),
      neighborhood: toTitleCase(formData.neighborhood),
      street: toTitleCase(formData.street),
      doorNo: String(formData.doorNo || "").trim(),
    };

    setPendingJobs((prev) => [reviewJob, ...prev]);

    if (selectedPlan === "featured") {
      window.open(SHOPIER_FEATURED_LINK, "_blank", "noopener,noreferrer");
    }

    alert("İlan admin onayına gönderildi 🚀");

    setShowPlanModal(false);
    setShowForm(false);
    setShowPreview(false);
    setPendingJob(null);
    setSelectedPlan("free");

    setFormData({
      company: "",
      title: "",
      category: "",
      city: "",
      district: "",
      neighborhood: "",
      street: "",
      doorNo: "",
      workType: "Günlük",
      salary: "",
      description: "",
      workAddress: "",
      contactName: "",
      contactPhone: "",
      captchaAnswer: "",
    });

    setCaptcha(generateCaptchaQuestion());
  };

  const openJobDetail = async (job) => {
    const nextViews = Number(job.viewsCount || 0) + 1;
    const updatedJob = { ...job, viewsCount: nextViews };

    setSelectedJob(updatedJob);

    const updateLocalViews = (item) =>
      item.id === job.id ? { ...item, viewsCount: nextViews } : item;

    if (job.featuredStatus === "live" || job.plan === "featured") {
      setFeaturedJobs((prev) => prev.map(updateLocalViews));
    } else {
      setJobs((prev) => prev.map(updateLocalViews));
    }

    if (job.dbId) {
      const { error } = await supabase
        .from("job_posts")
        .update({ views_count: nextViews })
        .eq("id", job.dbId);

      if (error) {
        console.error("Görüntülenme sayısı güncellenemedi:", error);
      }
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (!isJobActive(job)) return false;
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
      if (!isJobActive(job)) return false;
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
  const approvePendingJob = async (job) => {
    const approvedJob = {
      ...job,
      status: "active",
      approvedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      featuredStatus: job.plan === "featured" ? "live" : undefined,
    };

    if (job.dbId) {
      const { error } = await supabase
        .from("job_posts")
        .update({ status: "active" })
        .eq("id", job.dbId);

      if (error) {
        console.error("İlan onaylanamadı:", error);
        alert("İlan onaylanamadı 😥");
        return;
      }
    }

    setPendingJobs((prev) => prev.filter((item) => item.id !== job.id));

    if (job.plan === "featured") {
      setFeaturedJobs((prev) => [approvedJob, ...prev]);
    } else {
      setJobs((prev) => [approvedJob, ...prev]);
    }
  };

  const rejectPendingJob = async (jobId) => {
    const job = pendingJobs.find((item) => item.id === jobId);

    if (job?.dbId) {
      const { error } = await supabase
        .from("job_posts")
        .update({ status: "rejected" })
        .eq("id", job.dbId);

      if (error) {
        console.error("İlan reddedilemedi:", error);
        alert("İlan reddedilemedi 😥");
        return;
      }
    }

    setPendingJobs((prev) => prev.filter((item) => item.id !== jobId));
  };

  const updateDbJob = async (job, changes, errorMessage) => {
    if (!job.dbId) return true;

    const { error } = await supabase
      .from("job_posts")
      .update(changes)
      .eq("id", job.dbId);

    if (error) {
      console.error(errorMessage, error);
      alert(`${errorMessage}\n${error?.message || ""}`);
      return false;
    }

    return true;
  };

  const toggleJobActive = async (job) => {
    const nextStatus = job.status === "passive" ? "active" : "passive";
    const ok = await updateDbJob(job, { status: nextStatus }, "İlan durumu güncellenemedi 😥");
    if (!ok) return;

    const toggle = (item) =>
      item.id === job.id ? { ...item, status: nextStatus } : item;

    if (job.adminStatus === "Ekiş Acil") {
      setFeaturedJobs((prev) => prev.map(toggle));
    } else {
      setJobs((prev) => prev.map(toggle));
    }
  };

  const makeJobFeatured = async (job) => {
    const ok = await updateDbJob(job, { plan_type: "featured", status: "active" }, "İlan Ekiş Acil yapılamadı 😥");
    if (!ok) return;

    setJobs((prev) => prev.filter((item) => item.id !== job.id));
    setFeaturedJobs((prev) => [
      {
        ...job,
        plan: "featured",
        status: "active",
        durationDays: 15,
        featuredStatus: "live",
      },
      ...prev,
    ]);
  };

  const makeJobStandard = async (job) => {
    const ok = await updateDbJob(job, { plan_type: "normal", status: "active" }, "İlan standarda alınamadı 😥");
    if (!ok) return;

    setFeaturedJobs((prev) => prev.filter((item) => item.id !== job.id));
    setJobs((prev) => [
      {
        ...job,
        plan: "free",
        status: "active",
        durationDays: 30,
        featuredStatus: null,
      },
      ...prev,
    ]);
  };

  const deleteJob = async (job) => {
    const ok = await updateDbJob(job, { status: "rejected" }, "İlan silinemedi 😥");
    if (!ok) return;

    if (job.adminStatus === "Ekiş Acil") {
      setFeaturedJobs((prev) => prev.filter((item) => item.id !== job.id));
    } else if (job.adminStatus === "Onay Bekliyor") {
      setPendingJobs((prev) => prev.filter((item) => item.id !== job.id));
    } else {
      setJobs((prev) => prev.filter((item) => item.id !== job.id));
    }
  };

  const adminJobs = useMemo(() => {
    const all = [
      ...pendingJobs.map((job) => ({ ...job, adminStatus: "Onay Bekliyor" })),
      ...featuredJobs.map((job) => ({ ...job, adminStatus: "Ekiş Acil" })),
      ...jobs.map((job) => ({ ...job, adminStatus: "Standart" })),
    ];

    return all.filter((job) => {
      const searchText = `${job.title} ${job.company} ${job.location} ${job.contactPhone || ""}`.toLocaleLowerCase("tr-TR");
      const matchesSearch = searchText.includes(adminSearch.toLocaleLowerCase("tr-TR"));
      const active = isJobActive(job);

      if (adminFilter === "active") return matchesSearch && active;
      if (adminFilter === "expired") return matchesSearch && !active;
      if (adminFilter === "pending") return matchesSearch && job.adminStatus === "Onay Bekliyor";
      if (adminFilter === "featured") return matchesSearch && job.adminStatus === "Ekiş Acil";
      if (adminFilter === "standard") return matchesSearch && job.adminStatus === "Standart";

      return matchesSearch;
    });
  }, [jobs, featuredJobs, pendingJobs, adminFilter, adminSearch]);

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
      <style>{getStyles(PALETTE)}</style>

      {isAdminRoute && (
        <div className="admin-page">
          {!adminAuthenticated ? (
            <div className="admin-login-card">
              <h1>Admin Girişi</h1>
              <p>Admin paneline devam etmek için şifre gir.</p>
              <input
                type="password"
                placeholder="Admin şifresi"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setAdminLoginError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdminLogin();
                }}
              />
              {adminLoginError && <div className="admin-login-error">{adminLoginError}</div>}
              <div className="admin-login-actions">
                <button className="btn btn-primary" type="button" onClick={handleAdminLogin}>
                  Giriş Yap
                </button>
                <button className="btn btn-secondary" type="button" onClick={goHome}>
                  Siteye Dön
                </button>
              </div>
            </div>
          ) : (
          <div className="admin-shell">
            <div className="admin-top">
              <div className="admin-title-block">
                <img
                  className="admin-logo"
                  src={logoSrc}
                  alt="Ekiş logo"
                  onError={() => {
                    if (logoSrc !== "/logo-ekis.png") setLogoSrc("/logo-ekis.png");
                  }}
                />
                <h1>Admin Paneli</h1>
                <p>Daha sade yönetim ekranı: ilanları tek listeden kontrol et.</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btn-secondary" type="button" onClick={handleAdminLogout}>
                  Çıkış Yap
                </button>
                <button className="btn btn-secondary" type="button" onClick={goHome}>
                  Siteye Dön
                </button>
              </div>
            </div>

            <div className="admin-stats">
              <div className="admin-stat">
                <span>Toplam ilan</span>
                <strong>{jobs.length + featuredJobs.length + pendingJobs.length}</strong>
              </div>
              <div className="admin-stat">
                <span>Standart ilan</span>
                <strong>{jobs.length}</strong>
              </div>
              <div className="admin-stat">
                <span>Ekiş Acil</span>
                <strong>{featuredJobs.length}</strong>
              </div>
              <div className="admin-stat">
                <span>Bekleyen işlem</span>
                <strong>{pendingJobs.length}</strong>
              </div>
            </div>

            <div className="admin-compact-layout">
              <aside className="admin-side">
                <h2 className="admin-side-title">Hızlı İşlemler</h2>
                <div className="admin-side-list">
                  <button className="admin-side-item" type="button">
                    Toplam ilan <span>{jobs.length + featuredJobs.length + pendingJobs.length}</span>
                  </button>
                  <button className="admin-side-item" type="button" onClick={() => setAdminFilter("pending")}>
                    Onay bekleyen <span>{pendingJobs.length}</span>
                  </button>
                  <button className="admin-side-item" type="button">
                    Ekiş Acil <span>{featuredJobs.length}</span>
                  </button>
                  <button className="admin-side-item" type="button">
                    Standart ilan <span>{jobs.length}</span>
                  </button>
                  <button className="admin-side-item" type="button" onClick={() => setShowForm(true)}>
                    Yeni ilan ekle <span>+</span>
                  </button>
                </div>
              </aside>

              <section className="admin-main-panel">
                <div className="admin-main-head">
                  <h2>Tüm İlanlar</h2>
                  <span className="admin-badge">{adminJobs.length} kayıt</span>
                </div>

                <div className="admin-tools">
                  <input
                    type="text"
                    placeholder="İlan, firma, şehir veya telefon ara..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                  />
                  <select value={adminFilter} onChange={(e) => setAdminFilter(e.target.value)}>
                    <option value="all">Tümü</option>
                    <option value="pending">Onay bekleyen</option>
                    <option value="active">Aktif</option>
                    <option value="expired">Süresi dolan</option>
                    <option value="featured">Ekiş Acil</option>
                    <option value="standard">Standart</option>
                  </select>
                </div>

                <div className="admin-table">
                  <div className="admin-table-row header">
                    <div>İlan</div>
                    <div>Konum</div>
                    <div>Tip</div>
                    <div>Durum</div>
                    <div>İşlem</div>
                  </div>

                  {adminJobs.length === 0 ? (
                    <div className="admin-empty">Bu filtrelere uygun ilan yok.</div>
                  ) : adminJobs.map((job) => (
                    <article className={`admin-table-row ${!isJobActive(job) ? "admin-expired" : ""}`} key={`${job.adminStatus}-${job.id}`}>
                      <div className="admin-table-title">
                        <strong>{job.title}</strong>
                        <span>{job.company}</span>
                        <div className="admin-status-line">{job.adminStatus === "Onay Bekliyor" ? "Admin onayı bekliyor" : getDaysLeftLabel(job)}</div>
                      </div>

                      <div className="admin-table-cell">{job.location}</div>
                      <div className="admin-table-cell">{job.type}</div>
                      <div>
                        <span className="admin-badge">{job.adminStatus === "Onay Bekliyor" ? "Onay bekliyor" : isJobActive(job) ? job.adminStatus : "Süresi doldu"}</span>
                      </div>

                      <div className="admin-table-actions">
                        <button className="admin-mini-btn light" type="button" onClick={() => openJobDetail(job)}>
                          Detay
                        </button>

                        {job.adminStatus === "Onay Bekliyor" ? (
                          <>
                            <button className="admin-mini-btn" type="button" onClick={() => approvePendingJob(job)}>
                              Onayla
                            </button>
                            <button className="admin-mini-btn danger" type="button" onClick={() => rejectPendingJob(job.id)}>
                              Reddet
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="admin-mini-btn light"
                              type="button"
                              onClick={() => toggleJobActive(job)}
                            >
                              {job.status === "passive" ? "Aktif Et" : "Pasif Yap"}
                            </button>

                            {job.adminStatus === "Ekiş Acil" ? (
                              <button
                                className="admin-mini-btn light"
                                type="button"
                                onClick={() => makeJobStandard(job)}
                              >
                                Standarta Al
                              </button>
                            ) : (
                              <button
                                className="admin-mini-btn"
                                type="button"
                                onClick={() => makeJobFeatured(job)}
                              >
                                Ekiş Acil Yap
                              </button>
                            )}

                            <button
                              className="admin-mini-btn danger"
                              type="button"
                              onClick={() => deleteJob(job)}
                            >
                              Sil
                            </button>
                          </>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
          )}
        </div>
      )}

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

                <div className="post-field full">
                  <label>Kategori<span className="required-star">*</span></label>
                  <select
                    className={errors.category ? "field-error" : ""}
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="">Kategori seç</option>
                    {categories.filter((item) => item !== "Tümü").map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.category && <div className="error-text">{errors.category}</div>}
                </div>

                <div className="location-section">
                  <div className="location-section-title">
                    📍 Konum Bilgileri
                  </div>

                <div className="post-field">
                  <label>Şehir<span className="required-star">*</span></label>
                  <select
                    className={errors.city ? "field-error" : ""}
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                  >
                    <option value="">Şehir seç</option>
                    {cities.filter((item) => item !== "Tümü").map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.city && <div className="error-text">{errors.city}</div>}
                </div>

                <div className="post-field">
                  <label>İlçe<span className="required-star">*</span></label>
                  <input
                    className={errors.district ? "field-error" : ""}
                    name="district"
                    type="text"
                    placeholder="Örn. Odunpazarı"
                    value={formData.district}
                    onChange={handleFormChange}
                  />
                  {errors.district && <div className="error-text">{errors.district}</div>}
                </div>

                <div className="post-field">
                  <label>Mahalle<span className="required-star">*</span></label>
                  <input
                    className={errors.neighborhood ? "field-error" : ""}
                    name="neighborhood"
                    type="text"
                    placeholder="Örn. Vişnelik"
                    value={formData.neighborhood}
                    onChange={handleFormChange}
                  />
                  {errors.neighborhood && <div className="error-text">{errors.neighborhood}</div>}
                </div>

                <div className="post-field">
                  <label>Sokak / Cadde<span className="required-star">*</span></label>
                  <input
                    className={errors.street ? "field-error" : ""}
                    name="street"
                    type="text"
                    placeholder="Örn. İsmet İnönü Cad."
                    value={formData.street}
                    onChange={handleFormChange}
                  />
                  {errors.street && <div className="error-text">{errors.street}</div>}
                </div>

                <div className="post-field">
                  <label>Kapı No <small>(opsiyonel - ilanda gösterilmez)</small></label>
                  <input
                    className={errors.doorNo ? "field-error" : ""}
                    name="doorNo"
                    type="text"
                    placeholder="Örn. 12A"
                    value={formData.doorNo}
                    onChange={handleFormChange}
                  />
                  {errors.doorNo && <div className="error-text">{errors.doorNo}</div>}
                </div>

                </div>

                <div className="post-field">
                  <label>Çalışma tipi</label>
                  <select name="workType" value={formData.workType} onChange={handleFormChange}>
                    {types.filter((item) => item !== "Tümü").map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
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

                <div className="captcha-box">
                  <div className="post-field">
                    <label>Güvenlik sorusu<span className="required-star">*</span></label>
                    <div className="captcha-question">{captcha.question} = ?</div>
                  </div>
                  <div className="post-field">
                    <label>Cevabınız<span className="required-star">*</span></label>
                    <input
                      className={errors.captchaAnswer ? "field-error" : ""}
                      name="captchaAnswer"
                      type="text"
                      inputMode="numeric"
                      placeholder="Cevap"
                      value={formData.captchaAnswer}
                      onChange={handleFormChange}
                    />
                    {errors.captchaAnswer && <div className="error-text">{errors.captchaAnswer}</div>}
                  </div>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      setCaptcha(generateCaptchaQuestion());
                      setFormData((prev) => ({ ...prev, captchaAnswer: "" }));
                    }}
                  >
                    Yenile
                  </button>
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

                  <h4 className="preview-title">{toTitleCase(formData.title) || "İlan başlığı burada görünecek"}</h4>
                  <div className="preview-company">{toTitleCase(formData.company) || "Firma adı burada görünecek"}</div>
                  <div className="preview-location">{formData.category || "Kategori burada görünecek"}</div>
                  <div className="preview-location">{normalizeLocation(formData.city, formData.district) || "Şehir / İlçe burada görünecek"}</div>
                  <div className="preview-location">
                    {buildPublicAddress({ neighborhood: formData.neighborhood, street: formData.street }) || "Mahalle / sokak bilgisi burada görünecek"}
                  </div>
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
                İlanın admin onayına düşer. Onay sonrası standart listede veya Ekiş Acil alanında yayınlanır.
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
                  {selectedPlan === "featured" ? "Ödeme Adımına Geç" : "Onaya Gönder"}
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
          <div className="detail-modal detail-modal-modern detail-modal-ref-v4" onClick={(e) => e.stopPropagation()}>
            <button className="detail-close detail-close-modern" type="button" onClick={() => setSelectedJob(null)}>×</button>

            <div className="detail-modern-grid detail-modern-grid-ref-v4">
              <section className="detail-modern-main detail-modern-main-ref-v4">
                <div className="detail-modern-badges">
                  {selectedJob.plan === "featured" || selectedJob.featuredStatus === "live" ? (
                    <span className="modern-badge hot">★ Ekiş Acil</span>
                  ) : (
                    <span className="modern-badge">Yeni İlan</span>
                  )}
                  <span className="modern-badge soft">{selectedJob.type}</span>
                  <span className="modern-badge soft">👁 {Number(selectedJob.viewsCount || 0)} görüntülenme</span>
                </div>

                <p className="detail-modern-company">{selectedJob.company}</p>
                <h3 className="detail-modern-title">{selectedJob.title}</h3>
                <p className="detail-modern-summary">
                  {selectedJob.description || "Bu ilan için açıklama bilgisi bulunmuyor."}
                </p>

                <div className="detail-modern-meta">
                  <div>
                    <span>Konum</span>
                    <strong>{selectedJob.location}</strong>
                  </div>
                  <div>
                    <span>Kategori</span>
                    <strong>{selectedJob.category || "Genel"}</strong>
                  </div>

                </div>

                <div className="detail-modern-desc-card">
                  <h4>İş açıklaması</h4>
                  <p>{selectedJob.description || "Bu ilan için açıklama bilgisi bulunmuyor."}</p>
                </div>
              </section>

              <aside className="detail-modern-side detail-modern-side-ref-v4">
                <div className="detail-modern-salary-card">
                  <span>Ücret bilgisi</span>
                  <strong>{selectedJob.salary}</strong>
                </div>

                <div className="detail-modern-contact-card">
                  <h4>Başvuru</h4>

                  <div className="modern-contact-row">
                    <span>Yetkili</span>
                    <strong>{selectedJob.contactName || "İşveren"}</strong>
                  </div>
                  <div className="modern-contact-row">
                    <span>Telefon / WhatsApp</span>
                    <strong>{selectedJob.contactPhone || "Belirtilmedi"}</strong>
                  </div>
                  <div className="modern-contact-row">
                    <span>Adres</span>
                    <strong>{selectedJob.workAddress || selectedJob.location}</strong>
                  </div>

                  <a className="modern-whatsapp-btn" href={getWhatsappHref(selectedJob.contactPhone, selectedJob)} target="_blank" rel="noopener noreferrer">
                    WhatsApp'tan Yaz
                  </a>

                  <div className="modern-mini-actions">
                    <a href={getPhoneHref(selectedJob.contactPhone)}>Ara</a>
                    <a href={getMapHref(selectedJob)} target="_blank" rel="noopener noreferrer">Harita</a>
                    <button
                      type="button"
                      onClick={() => {
                        const shareData = {
                          title: selectedJob.title,
                          text: getShareText(selectedJob),
                          url: window.location.href,
                        };

                        if (navigator.share) {
                          navigator.share(shareData).catch(() => {});
                        } else {
                          navigator.clipboard?.writeText(`${shareData.text} - ${shareData.url}`);
                          alert("İlan bağlantısı kopyalandı 🚀");
                        }
                      }}
                    >
                      Paylaş
                    </button>
                  </div>

                  <p className="modern-safe-note">
                    Kapı numarası ilanda gösterilmez. Kesin konum ve görüşme süreci işveren tarafından yürütülür.
                  </p>
                </div>
              </aside>
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
                      <path d="M24 5.5 37 10.6v10.1c0 8.3-5.4 15.9-13 18.8-7.6-2.9-13-10.5-13-18.8V10.6L24 5.5Z" fill="#f65a45"/>
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
                      <path d="M24 5.5c2.1 0 3.7 2.2 5.5 2.8 1.9.6 4.4-.4 6 .8 1.6 1.2 1.7 3.9 2.9 5.5 1.2 1.6 3.8 2.4 4.4 4.3.6 1.8-.9 4.1-.9 6.1s1.5 4.3.9 6.1c-.6 1.9-3.2 2.7-4.4 4.3-1.2 1.6-1.3 4.3-2.9 5.5-1.6 1.2-4.1.2-6 .8-1.8.6-3.4 2.8-5.5 2.8s-3.7-2.2-5.5-2.8c-1.9-.6-4.4.4-6-.8-1.6-1.2-1.7-3.9-2.9-5.5-1.2-1.6-3.8-2.4-4.4-4.3-.6-1.8.9-4.1.9-6.1s-1.5-4.3-.9-6.1c.6-1.9 3.2-2.7 4.4-4.3 1.2-1.6 1.3-4.3 2.9-5.5 1.6-1.2 4.1-.2 6-.8 1.8-.6 3.4-2.8 5.5-2.8Z" fill="#f65a45"/>
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
                      <path d="M27.4 4.8 12.5 27.2h10.2l-2.2 16 15-22.5H25.2l2.2-15.9Z" fill="#f65a45"/>
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
              <article key={job.id} className="featured-card" onClick={() => openJobDetail(job)}>
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
                  <article key={job.id} className="soft-job-card" onClick={() => openJobDetail(job)}>
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
                  <a
                    className="footer-social"
                    href="https://www.instagram.com/ekis.official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
                      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                    </svg>
                  </a>
                  <a
                    className="footer-social"
                    href="https://www.facebook.com/ekisplatform"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                      <path d="M14 8.2h2V5h-2.4C10.8 5 9 6.8 9 9.6V12H7v3.2h2V21h3.4v-5.8H15l.5-3.2h-3.1V9.9c0-1 .4-1.7 1.6-1.7Z" />
                    </svg>
                  </a>
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
