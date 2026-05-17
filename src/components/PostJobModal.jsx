import { PALETTE, categories, cities, types } from "../data/constants";
import { cityDistricts } from "../data/cityDistricts";
import { normalizeLocation, toTitleCase } from "../utils/jobUtils";

export default function PostJobModal({
  show,
  formData,
  errors,
  captcha,
  previewSalary,
  showPreview,
  onClose,
  onChange,
  onRefreshCaptcha,
  onTogglePreview,
  onPublish,
}) {
  if (!show) return null;

  return (
        <div className="post-modal-backdrop" onClick={onClose}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-panel-inner">
              <h3 className="post-title">İlan ver</h3>
              <p className="post-desc">Formu doldur, ilanını ön izle, admin onayına gönder.</p>
              <div style={{
                marginBottom: "16px",
                padding: "12px 14px",
                borderRadius: "14px",
                background: "rgba(88,173,173,0.08)",
                border: "1px solid rgba(88,173,173,0.16)",
                fontSize: "13px",
                fontWeight: "700",
                color: PALETTE.slate
              }}>
                Tüm ilanlar admin kontrolünden geçerek yayına alınır.
              </div>

              <div className="post-form-grid">
                <div className="form-section-label">İlan bilgileri</div>
                <div className="post-field">
                  <label>Firma adı<span className="required-star">*</span></label>
                  <input
                    className={errors.company ? "field-error" : ""}
                    name="company"
                    type="text"
                    placeholder="Örn. Nova Organizasyon"
                    value={formData.company}
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                  {errors.title && <div className="error-text">{errors.title}</div>}
                  <div className="input-hint">Örn: Garson, Kurye, Depo Personeli gibi net başlık kullan.</div>
                </div>

                <div className="post-field">
                  <label>Şehir<span className="required-star">*</span></label>
                  <select
                    className={errors.city ? "field-error" : ""}
                    name="city"
                    value={formData.city}
                    onChange={onChange}
                  >
                    <option value="">Şehir seç</option>
                    {cities.filter((item) => item !== "Tümü").map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.city && <div className="error-text">{errors.city}</div>}
                </div>

                <div className="post-field">
                  <label>İlçe / Konum<span className="required-star">*</span></label>
                  <select
                    className={errors.district ? "field-error" : ""}
                    name="district"
                    value={formData.district}
                    onChange={onChange}
                    disabled={!formData.city}
                  >
                    <option value="">
                      {formData.city ? "İlçe seç" : "Önce şehir seç"}
                    </option>
                    {(cityDistricts[formData.city] || []).map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.district && <div className="error-text">{errors.district}</div>}
                  <div className="input-hint">İlçe listesi seçtiğin şehre göre otomatik güncellenir.</div>
                </div>

                <div className="post-field">
                  <label>Kategori<span className="required-star">*</span></label>
                  <select
                    className={errors.category ? "field-error" : ""}
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                  >
                    <option value="">Kategori seç</option>
                    {categories.filter((item) => item !== "Tümü").map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.category && <div className="error-text">{errors.category}</div>}
                </div>

                <div className="post-field">
                  <label>Çalışma tipi</label>
                  <select name="workType" value={formData.workType} onChange={onChange}>
                    {types.filter((item) => item !== "Tümü").map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="form-section-label">Adres ve iletişim</div>

                <div className="post-field full">
                  <label>İş adresi / buluşma noktası<span className="required-star">*</span></label>
                  <input
                    className={errors.workAddress ? "field-error" : ""}
                    name="workAddress"
                    type="text"
                    placeholder="Örn. Kadıköy / Moda, AVM önü, depo giriş kapısı"
                    value={formData.workAddress}
                    onChange={onChange}
                  />
                  {errors.workAddress && <div className="error-text">{errors.workAddress}</div>}
                  <div className="input-hint">Tam adres yerine adayın anlayacağı buluşma noktası da yazılabilir.</div>
                </div>

                <div className="post-field">
                  <label>Yetkili kişi adı</label>
                  <input
                    name="contactName"
                    type="text"
                    placeholder="Örn. Ahmet Yılmaz"
                    value={formData.contactName}
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                  {errors.contactPhone && <div className="error-text">{errors.contactPhone}</div>}
                </div>

                <div className="form-section-label">Güvenlik ve detay</div>

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
                      onChange={onChange}
                    />
                    {errors.captchaAnswer && <div className="error-text">{errors.captchaAnswer}</div>}
                  </div>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={onRefreshCaptcha}
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                  <div className="preview-location">{normalizeLocation(formData.city, formData.district) || "Şehir / Konum burada görünecek"}</div>
                  <div className="preview-salary">{previewSalary || "Ücret bilgisi burada görünecek"}</div>
                  <p className="preview-desc">
                    {formData.description || "İş açıklaması burada görünecek. Kullanıcılar ilanı açtığında bu alanı okuyacak."}
                  </p>
                </div>
              )}

              <div className="modal-actions">
                <button className="btn btn-primary" type="button" onClick={onTogglePreview}>
                  {showPreview ? "Önizlemeyi Gizle" : "İlanı Önizle"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={onPublish}>
                  İlanı Yayınla
                </button>
                <button className="btn btn-secondary" type="button" onClick={onClose}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
  );
}
