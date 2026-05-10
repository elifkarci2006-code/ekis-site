/* ADMIN PANEL PREMIUM FIX */

.admin-main-panel {
  padding: 22px;
  border-radius: 28px;
}

.admin-tools input,
.admin-tools select {
  height: 46px;
  border-radius: 14px;
  border: 1px solid rgba(60,74,95,0.14);
  background: #fff;
  padding: 0 14px;
  color: #3C4A5F;
  font-size: 14px;
  font-weight: 700;
  outline: none;
}

.admin-tools input:focus,
.admin-tools select:focus {
  border-color: rgba(246,90,69,0.45);
  box-shadow: 0 0 0 4px rgba(246,90,69,0.10);
}

.admin-table {
  gap: 12px;
}

.admin-table-row {
  grid-template-columns:
    minmax(260px, 1.5fr)
    minmax(150px, 0.8fr)
    minmax(110px, 0.55fr)
    minmax(130px, 0.65fr)
    minmax(250px, 0.9fr);
  gap: 18px;
  padding: 18px 20px;
  border-radius: 22px;
  background: rgba(255,255,255,0.96);
  border: 1px solid rgba(60,74,95,0.08);
  box-shadow: 0 10px 24px rgba(60,74,95,0.045);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.admin-table-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(60,74,95,0.08);
  border-color: rgba(246,90,69,0.20);
}

.admin-table-row > div {
  min-width: 0;
  color: #3C4A5F;
  font-size: 14px;
  font-weight: 700;
}

.admin-table-row strong {
  display: block;
  color: #25324A;
  font-size: 15px;
  font-weight: 950;
  line-height: 1.25;
  margin-bottom: 4px;
}

.admin-table-row small,
.admin-table-row span {
  color: #6B7280;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
}

.admin-table-row:first-child {
  background: rgba(255,255,255,0.72);
  box-shadow: none;
  transform: none;
  border-radius: 18px;
}

.admin-table-row:first-child > div {
  color: #5D6B7F;
  font-size: 13px;
  font-weight: 950;
}

.admin-table-row button {
  border: none;
  min-height: 34px;
  border-radius: 999px;
  padding: 8px 12px;
  margin: 3px;
  background: #F3F6FA;
  color: #3C4A5F;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    background 0.16s ease,
    color 0.16s ease,
    box-shadow 0.16s ease;
}

.admin-table-row button:hover {
  transform: translateY(-1px);
  background: #E9EEF5;
  box-shadow: 0 8px 18px rgba(60,74,95,0.10);
}

.admin-table-row button:nth-child(1) {
  background: #EEF4FF;
  color: #2F5DA8;
}

.admin-table-row button:nth-child(2) {
  background: #F3F4F6;
  color: #4B5563;
}

.admin-table-row button:nth-child(3) {
  background: rgba(246,90,69,0.12);
  color: #D94B36;
}

.admin-table-row button:nth-child(4) {
  background: rgba(220,38,38,0.10);
  color: #B91C1C;
}

.admin-side-item {
  box-shadow: 0 8px 18px rgba(60,74,95,0.035);
  transition:
    transform 0.16s ease,
    background 0.16s ease,
    border-color 0.16s ease;
}

.admin-side-item:hover {
  transform: translateY(-1px);
  background: #F7FAFC;
  border-color: rgba(246,90,69,0.20);
}

.admin-top .btn,
.admin-top button,
.admin-top a {
  border-radius: 16px;
}

@media (max-width: 1100px) {
  .admin-table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .admin-tools {
    grid-template-columns: 1fr;
  }

  .admin-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
