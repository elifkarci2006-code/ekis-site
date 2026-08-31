// Kept in sync with ekis-mobile's visual identity (src/styles/homeStyles.ts,
// src/constants/typeColors.ts) so the website and the app look like the same
// product. "sage"/"aqua"/"teal" are kept only for any leftover references --
// the live palette is coral/slate/text/bg/border/warm below.
export const PALETTE = {
  coral: "#FF5A3C",
  sage: "#9BC78F",
  aqua: "#76BFBE",
  teal: "#58ADAD",
  slate: "#1F2937",
  bg: "#FFFFFF",
  white: "#FFFFFF",
  text: "#1F2937",
  softText: "#5D6B7F",
  border: "rgba(31,41,55,0.08)",
  warm: "#FFF2EC",
  cardBg: "#F5F7F8",
};

// Kept in sync with the mobile app's ADMIN_EMAILS (ekis-mobile/src/app/index.tsx)
// and the server-side authoritative copy in
// ekis-mobile/supabase/functions/_shared/bankTransfer.ts. Single source for
// this site so the admin login check and the "Admin Paneli" menu item can't
// drift apart from each other.
export const ADMIN_EMAILS = ["nkarci95@gmail.com", "ekissosyal@gmail.com"];

// Kept in sync with the mobile app's featuredPackages (ekis-mobile/src/app/index.tsx)
// and the server-side authoritative copy in ekis-mobile/supabase/functions/_shared/paytr.ts.
export const featuredPackages = [
  { id: 1, title: "24 Saat", days: 1, price: 149 },
  { id: 2, title: "10 Gün", days: 10, price: 499 },
  { id: 3, title: "20 Gün", days: 20, price: 699 },
];

// Kept in sync with the mobile app's categories list (ekis-mobile/src/app/index.tsx)
// -- both platforms write this into the same job_posts.category text column.
export const categories = [
  "Tümü",
  "Garson / Servis",
  "Kafe & Restoran",
  "Kurye & Dağıtım",
  "Depo & Lojistik",
  "Temizlik",
  "Etkinlik & Organizasyon",
  "Satış & Mağaza",
  "Ofis & Yardımcı İşler",
  "İnşaat & Fiziksel İş",
  "Freelance / Dijital",
  "Diğer",
];

export const types = ["Tümü", "Günlük", "Saatlik", "Part Time", "Tam Zamanlı"];

export const cities = ["Tümü", "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"];
