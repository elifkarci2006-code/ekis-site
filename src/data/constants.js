export const PALETTE = {
  coral: "#f65a45",
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

export const ADS_ENABLED = false;

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

export const types = ["Tümü", "Günlük", "Saatlik", "Part Time"];

export const cities = ["Tümü", "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"];
