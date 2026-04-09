import React, { useEffect, useMemo, useState } from "react";

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
};

const cities = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin",
  "Aydın","Balıkesir","Bartın","Batman","Bayburt","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa",
  "Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Düzce","Edirne","Elazığ","Erzincan","Erzurum",
  "Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Iğdır","Isparta","İstanbul","İzmir",
  "Kahramanmaraş","Karabük","Karaman","Kars","Kastamonu","Kayseri","Kırıkkale","Kırklareli","Kırşehir",
  "Kilis","Kocaeli","Konya","Kütahya","Malatya","Manisa","Mardin","Mersin","Muğla","Muş","Nevşehir",
  "Niğde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Şanlıurfa","Şırnak",
  "Tekirdağ","Tokat","Trabzon","Tunceli","Uşak","Van","Yalova","Yozgat","Zonguldak"
].sort();

const jobsSeed = [
  { id:1,title:"Garson",company:"Cafe",location:"İstanbul",salary:"1200 TL",type:"Günlük"},
  { id:2,title:"Kurye",company:"Paket",location:"Ankara",salary:"200 TL/saat",type:"Saatlik"},
];

export default function App() {
  const [search,setSearch]=useState("");
  const [city,setCity]=useState("Tümü");

  const filteredJobs = useMemo(()=>{
    return jobsSeed.filter(j=>{
      return (
        j.title.toLowerCase().includes(search.toLowerCase()) &&
        (city==="Tümü" || j.location===city)
      )
    })
  },[search,city]);

  return (
    <div>
      <style>{`
        body {
          margin:0;
          font-family:Inter;
          background:${PALETTE.bg};
        }

        .topbar {
          position:sticky;
          top:0;
          z-index:999;
          background: linear-gradient(
            90deg,
            rgba(245,247,248,0.85) 0%,
            rgba(118,191,190,0.35) 50%,
            rgba(88,173,173,0.45) 100%
          ) !important;
          backdrop-filter: blur(18px);
          border-bottom:1px solid rgba(0,0,0,0.05);
        }

        .container {
          width:90%;
          margin:auto;
        }

        .logo {
          height:70px;
        }

        .hero {
          padding:20px;
        }

        .search-box {
          background:${PALETTE.teal};
          padding:15px;
          border-radius:20px;
          display:flex;
          gap:10px;
        }

        input, select {
          height:45px;
          border-radius:10px;
          border:none;
          padding:0 10px;
        }

        .btn {
          background:${PALETTE.slate};
          color:white;
          border:none;
          padding:10px 20px;
          border-radius:10px;
          cursor:pointer;
        }

        .jobs {
          margin-top:20px;
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:10px;
        }

        .job {
          background:white;
          padding:15px;
          border-radius:15px;
        }

      `}</style>

      <header className="topbar">
        <div className="container">
          <img src="/logo-ekis.png" className="logo" />
        </div>
      </header>

      <div className="container hero">

        <div className="search-box">
          <input
            placeholder="İş ara..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />

          <select value={city} onChange={e=>setCity(e.target.value)}>
            <option>Tümü</option>
            {cities.map(c=><option key={c}>{c}</option>)}
          </select>

          <button className="btn">Ara</button>
        </div>

        <div className="jobs">
          {filteredJobs.map(j=>(
            <div key={j.id} className="job">
              <h3>{j.title}</h3>
              <div>{j.company}</div>
              <div>{j.location}</div>
              <div>{j.salary}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
