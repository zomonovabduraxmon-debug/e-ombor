(function(root, factory){
  const api = factory();
  if(typeof module !== 'undefined' && module.exports) module.exports = api;
  if(root) root.EOMBOR_UI_V5 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  'use strict';

  const PAGE_SIZE = 20;
  const LANG_KEY = 'eombor_lang_v5';
  const THEME_KEY = 'eombor_theme_v5';

  const LANGUAGES = {
    en:{label:'English', flag:'🇬🇧', htmlLang:'en'},
    ru:{label:'Русский', flag:'🇷🇺', htmlLang:'ru'},
    uz:{label:"O‘zbek", flag:'🇺🇿', htmlLang:'uz'},
    tr:{label:'Türkçe', flag:'🇹🇷', htmlLang:'tr'}
  };

  const UI_TEXT = {
    brandSub:{ru:'рухсатнома · остатки по квотам',en:'permits · quota balances',uz:'ruxsatnoma · kvota qoldiqlari',tr:'izinler · kota bakiyeleri'},
    dashboard:{ru:'Остатки',en:'Balances',uz:'Qoldiqlar',tr:'Bakiyeler'},
    permits:{ru:'Разрешения',en:'Permits',uz:'Ruxsatnomalar',tr:'İzinler'},
    shipment:{ru:'Новая отгрузка',en:'New shipment',uz:'Yangi yuklama',tr:'Yeni sevkiyat'},
    export:{ru:'Экспорт',en:'Export',uz:'Eksport',tr:'Dışa aktar'},
    dashboardTitle:{ru:'Остатки по разрешениям',en:'Balances by permit',uz:'Ruxsatnomalar bo‘yicha qoldiqlar',tr:'İzinlere göre bakiyeler'},
    dashboardDesc:{ru:'Сводка по всем позициям всех загруженных разрешений',en:'Summary of all items across uploaded permits',uz:'Yuklangan barcha ruxsatnomalardagi pozitsiyalar bo‘yicha jamlanma',tr:'Yüklenen tüm izinlerdeki kalemlerin özeti'},
    searchPlaceholder:{ru:'Поиск: номер, товар, ТН ВЭД…',en:'Search: number, item, HS code…',uz:'Qidirish: raqam, mahsulot, TIF TN…',tr:'Ara: numara, ürün, GTİP…'},
    filterAll:{ru:'Фильтр: Все',en:'Filter: All',uz:'Filtr: Barchasi',tr:'Filtre: Tümü'},
    statusOk:{ru:'В норме',en:'Normal',uz:'Me’yorda',tr:'Normal'},
    statusWarn:{ru:'Мало осталось',en:'Low balance',uz:'Kam qoldi',tr:'Az kaldı'},
    statusFinished:{ru:'Закончено',en:'Finished',uz:'Tugagan',tr:'Bitti'},
    statusOver:{ru:'Перерасход',en:'Overdrawn',uz:'Ortiqcha sarf',tr:'Aşım'},
    accepted:{ru:'Accepted',en:'Accepted',uz:'Qabul qilingan',tr:'Kabul edildi'},
    completed:{ru:'Completed',en:'Completed',uz:'Yakunlangan',tr:'Tamamlandı'},
    sortRemainDesc:{ru:'Остаток: больше → меньше',en:'Balance: high → low',uz:'Qoldiq: ko‘p → kam',tr:'Bakiye: çok → az'},
    sortRemainAsc:{ru:'Остаток: меньше → больше',en:'Balance: low → high',uz:'Qoldiq: kam → ko‘p',tr:'Bakiye: az → çok'},
    sortDateDesc:{ru:'Дата: новые → старые',en:'Date: newest → oldest',uz:'Sana: yangi → eski',tr:'Tarih: yeni → eski'},
    sortDateAsc:{ru:'Дата: старые → новые',en:'Date: oldest → newest',uz:'Sana: eski → yangi',tr:'Tarih: eski → yeni'},
    stockTitle:{ru:'Остаток на складе',en:'Warehouse balance',uz:'Ombor qoldig‘i',tr:'Depo bakiyesi'},
    stockHint:{ru:'Итого по текущему фильтру',en:'Total for current filter',uz:'Joriy filtr bo‘yicha jami',tr:'Geçerli filtre toplamı'},
    stockHintSearch:{ru:'Итого по текущему фильтру и поиску',en:'Total for current filter and search',uz:'Joriy filtr va qidiruv bo‘yicha jami',tr:'Geçerli filtre ve arama toplamı'},
    permitsTotal:{ru:'Разрешений всего',en:'Total permits',uz:'Jami ruxsatnomalar',tr:'Toplam izin'},
    finishedOver:{ru:'Закончено / перерасход',en:'Finished / overdrawn',uz:'Tugagan / ortiqcha sarf',tr:'Bitti / aşım'},
    positions:{ru:'Позиции',en:'Items',uz:'Pozitsiyalar',tr:'Kalemler'},
    permitHeader:{ru:'Разрешение',en:'Permit',uz:'Ruxsatnoma',tr:'İzin'},
    nameHeader:{ru:'Наименование',en:'Item name',uz:'Nomi',tr:'Ürün adı'},
    categoryHeader:{ru:'Категория',en:'Category',uz:'Kategoriya',tr:'Kategori'},
    allowedHeader:{ru:'Разрешено',en:'Allowed',uz:'Ruxsat etilgan',tr:'İzin verilen'},
    shippedHeader:{ru:'Отгружено',en:'Shipped',uz:'Yuklangan',tr:'Sevk edildi'},
    remainQtyHeader:{ru:'Остаток кол-во',en:'Balance qty',uz:'Qoldiq soni',tr:'Kalan miktar'},
    remainWeightHeader:{ru:'Остаток вес',en:'Balance weight',uz:'Qoldiq vazni',tr:'Kalan ağırlık'},
    fillHeader:{ru:'Заполнение',en:'Remaining',uz:'Qolgan ulush',tr:'Kalan oran'},
    statusHeader:{ru:'Статус',en:'Status',uz:'Holat',tr:'Durum'},
    totalFilter:{ru:'Итого по фильтру',en:'Filter total',uz:'Filtr bo‘yicha jami',tr:'Filtre toplamı'},
    noFilterData:{ru:'По этому фильтру данных нет',en:'No data for this filter',uz:'Bu filtr bo‘yicha ma’lumot yo‘q',tr:'Bu filtre için veri yok'},
    changeFilter:{ru:'Измените фильтр, сортировку или поиск.',en:'Change the filter, sort, or search.',uz:'Filtr, saralash yoki qidiruvni o‘zgartiring.',tr:'Filtreyi, sıralamayı veya aramayı değiştirin.'},
    permitsTitle:{ru:'Разрешения',en:'Permits',uz:'Ruxsatnomalar',tr:'İzinler'},
    permitsDesc:{ru:'Реестр разрешений (рухсатнома) и их позиций',en:'Registry of permits and their items',uz:'Ruxsatnomalar va ularning pozitsiyalari reyestri',tr:'İzinler ve kalemleri kaydı'},
    addPermit:{ru:'+ Добавить разрешение',en:'+ Add permit',uz:'+ Ruxsatnoma qo‘shish',tr:'+ İzin ekle'},
    positionsHeader:{ru:'Позиций',en:'Items',uz:'Pozitsiyalar',tr:'Kalemler'},
    allowedQty:{ru:'Разрешено, шт',en:'Allowed, qty',uz:'Ruxsat etilgan, dona',tr:'İzin verilen, adet'},
    remainHeader:{ru:'Остаток',en:'Balance',uz:'Qoldiq',tr:'Bakiye'},
    edit:{ru:'Изменить',en:'Edit',uz:'Tahrirlash',tr:'Düzenle'},
    delete:{ru:'Удалить',en:'Delete',uz:'O‘chirish',tr:'Sil'},
    noPermits:{ru:'Разрешений ещё нет',en:'No permits yet',uz:'Hali ruxsatnomalar yo‘q',tr:'Henüz izin yok'},
    addFirstPermit:{ru:'Нажмите «Добавить разрешение», чтобы внести первое.',en:'Click “Add permit” to create the first one.',uz:'Birinchisini kiritish uchun “Ruxsatnoma qo‘shish”ni bosing.',tr:'İlkini eklemek için “İzin ekle”ye tıklayın.'},
    shipmentTitle:{ru:'Новая отгрузка',en:'New shipment',uz:'Yangi yuklama',tr:'Yeni sevkiyat'},
    shipmentDesc:{ru:'Спишите количество и вес по конкретному разрешению',en:'Enter quantity and weight for a specific permit',uz:'Aniq ruxsatnoma bo‘yicha miqdor va vaznni kiriting',tr:'Belirli bir izin için miktar ve ağırlık girin'},
    shipmentDescShort:{ru:'Списание количества/веса по разрешению',en:'Quantity/weight deduction by permit',uz:'Ruxsatnoma bo‘yicha miqdor/vazn hisobdan chiqarilishi',tr:'İzine göre miktar/ağırlık düşümü'},
    inputMethod:{ru:'Способ ввода',en:'Input method',uz:'Kiritish usuli',tr:'Giriş yöntemi'},
    manualByItems:{ru:'Вручную по позициям',en:'Manual by item',uz:'Qo‘lda, pozitsiyalar bo‘yicha',tr:'Kalem bazında manuel'},
    uploadInvoice:{ru:'Загрузить инвойс (Excel/CSV)',en:'Upload invoice (Excel/CSV)',uz:'Invoys yuklash (Excel/CSV)',tr:'Fatura yükle (Excel/CSV)'},
    invoiceNo:{ru:'Номер инвойса / накладной',en:'Invoice / waybill number',uz:'Invoys / yuk xati raqami',tr:'Fatura / irsaliye numarası'},
    invoiceExample:{ru:'напр. MTG-ARYANCOM-160',en:'e.g. MTG-ARYANCOM-160',uz:'masalan: MTG-ARYANCOM-160',tr:'örn. MTG-ARYANCOM-160'},
    invoiceDate:{ru:'Дата инвойса',en:'Invoice date',uz:'Invoys sanasi',tr:'Fatura tarihi'},
    choosePermit:{ru:'Выберите разрешение выше.',en:'Select a permit above.',uz:'Yuqoridan ruxsatnomani tanlang.',tr:'Yukarıdan bir izin seçin.'},
    addPermitFirst:{ru:'Сначала добавьте разрешение',en:'Add a permit first',uz:'Avval ruxsatnoma qo‘shing',tr:'Önce bir izin ekleyin'},
    shipmentNeedsPermit:{ru:'Отгрузку можно провести только по существующему разрешению.',en:'A shipment can only be created for an existing permit.',uz:'Yuklama faqat mavjud ruxsatnoma bo‘yicha amalga oshiriladi.',tr:'Sevkiyat yalnızca mevcut bir izin için oluşturulabilir.'},
    autoWeight:{ru:'Пересчитать вес автоматически',en:'Recalculate weight automatically',uz:'Vaznni avtomatik qayta hisoblash',tr:'Ağırlığı otomatik yeniden hesapla'},
    saveShipment:{ru:'Сохранить отгрузку',en:'Save shipment',uz:'Yuklamani saqlash',tr:'Sevkiyatı kaydet'},
    itemName:{ru:'Наименование',en:'Item name',uz:'Nomi',tr:'Ürün adı'},
    remaining:{ru:'Остаток',en:'Balance',uz:'Qoldiq',tr:'Bakiye'},
    shippingQty:{ru:'Отгружаем, кол-во',en:'Ship, quantity',uz:'Yuklanadi, miqdor',tr:'Sevk, miktar'},
    shippingWeight:{ru:'Отгружаем, вес (кг)',en:'Ship, weight (kg)',uz:'Yuklanadi, vazn (kg)',tr:'Sevk, ağırlık (kg)'},
    exportTitle:{ru:'Экспорт',en:'Export',uz:'Eksport',tr:'Dışa aktar'},
    exportDesc:{ru:'Выгрузка полного реестра в Excel — один лист на разрешение, с историей отгрузок',en:'Export the full registry to Excel — one sheet per permit with shipment history',uz:'To‘liq reyestrni Excelga eksport qilish — har ruxsatnomaga bitta varaq va yuklamalar tarixi',tr:'Tüm kaydı Excel’e aktar — izin başına bir sayfa ve sevkiyat geçmişi'},
    downloadExcel:{ru:'Скачать Excel',en:'Download Excel',uz:'Excel yuklab olish',tr:'Excel indir'},
    exporting:{ru:'Формирование…',en:'Preparing…',uz:'Tayyorlanmoqda…',tr:'Hazırlanıyor…'},
    exportDone:{ru:'Файл сформирован',en:'File created',uz:'Fayl tayyorlandi',tr:'Dosya oluşturuldu'},
    exportError:{ru:'Не удалось сформировать Excel',en:'Could not create Excel file',uz:'Excel faylini yaratib bo‘lmadi',tr:'Excel dosyası oluşturulamadı'},
    exportLibraryMissing:{ru:'Excel-библиотека не загружена',en:'Excel library is not loaded',uz:'Excel kutubxonasi yuklanmagan',tr:'Excel kitaplığı yüklenmedi'},
    exportNoData:{ru:'Нет разрешений для экспорта',en:'No permits to export',uz:'Eksport qilish uchun ruxsatnoma yo‘q',tr:'Dışa aktarılacak izin yok'},
    close:{ru:'Закрыть',en:'Close',uz:'Yopish',tr:'Kapat'},
    cancel:{ru:'Отмена',en:'Cancel',uz:'Bekor qilish',tr:'İptal'},
    save:{ru:'Сохранить',en:'Save',uz:'Saqlash',tr:'Kaydet'},
    login:{ru:'Войти',en:'Sign in',uz:'Kirish',tr:'Giriş yap'},
    logout:{ru:'Выйти',en:'Sign out',uz:'Chiqish',tr:'Çıkış yap'},
    editorAccount:{ru:'Аккаунт редактора',en:'Editor account',uz:'Tahrirlovchi akkaunti',tr:'Editör hesabı'},
    email:{ru:'Email',en:'Email',uz:'Email',tr:'E-posta'},
    password:{ru:'Пароль',en:'Password',uz:'Parol',tr:'Şifre'},
    footer:{ru:'Offline-first: изменения сначала сохраняются на этом устройстве. При появлении интернета они автоматически синхронизируются с общей базой Supabase.',en:'Offline-first: changes are saved on this device first and sync with the shared Supabase database when internet returns.',uz:'Offline-first: o‘zgarishlar avval ushbu qurilmada saqlanadi va internet qaytganda umumiy Supabase bazasi bilan sinxronlanadi.',tr:'Offline-first: değişiklikler önce bu cihazda kaydedilir ve internet geri geldiğinde ortak Supabase veritabanıyla senkronize edilir.'},
    localReady:{ru:'локально · готово',en:'local · ready',uz:'lokal · tayyor',tr:'yerel · hazır'},
    localMode:{ru:'локальный режим',en:'local mode',uz:'lokal rejim',tr:'yerel mod'},
    offlineSaved:{ru:'офлайн · сохранено на устройстве',en:'offline · saved on device',uz:'oflayn · qurilmada saqlandi',tr:'çevrimdışı · cihazda kaydedildi'},
    prev:{ru:'Назад',en:'Previous',uz:'Oldingi',tr:'Önceki'},
    next:{ru:'Далее',en:'Next',uz:'Keyingi',tr:'Sonraki'},
    page:{ru:'Страница',en:'Page',uz:'Sahifa',tr:'Sayfa'},
    of:{ru:'из',en:'of',uz:'/',tr:'/'},
    showing:{ru:'Показано',en:'Showing',uz:'Ko‘rsatilmoqda',tr:'Gösterilen'},
    language:{ru:'Язык',en:'Language',uz:'Til',tr:'Dil'},
    theme:{ru:'Тема',en:'Theme',uz:'Mavzu',tr:'Tema'},
    dashboardShortcut:{ru:'Перейти к остаткам',en:'Go to balances',uz:'Qoldiqlarga o‘tish',tr:'Bakiyelere git'},
    help:{ru:'Помощь',en:'Help',uz:'Yordam',tr:'Yardım'},
    helpMessage:{ru:'Выберите язык, тему или раздел в панели быстрых действий.',en:'Use the quick controls to choose language, theme, or a section.',uz:'Tezkor panel orqali til, mavzu yoki bo‘limni tanlang.',tr:'Hızlı panelden dil, tema veya bölüm seçin.'},
    lightMode:{ru:'Светлая тема',en:'Light mode',uz:'Yorug‘ rejim',tr:'Açık tema'},
    darkMode:{ru:'Тёмная тема',en:'Dark mode',uz:'Qorong‘i rejim',tr:'Koyu tema'}
  };

  const reverseText = new Map();
  for(const [key, entry] of Object.entries(UI_TEXT)){
    for(const value of Object.values(entry)){
      if(value && !reverseText.has(value)) reverseText.set(value, key);
    }
  }

  function normalizeLang(lang){ return LANGUAGES[lang] ? lang : 'ru'; }

  function textByKey(key, lang){
    const entry = UI_TEXT[key];
    if(!entry) return key;
    const code = normalizeLang(lang);
    return entry[code] || entry.ru || key;
  }

  function paginate(items, requestedPage, pageSize){
    const list = Array.isArray(items) ? items : [];
    const size = Math.max(1, Number(pageSize) || PAGE_SIZE);
    const pageCount = Math.max(1, Math.ceil(list.length / size));
    const raw = Math.trunc(Number(requestedPage) || 1);
    const page = Math.min(pageCount, Math.max(1, raw));
    const from = (page - 1) * size;
    const pageItems = list.slice(from, from + size);
    return {
      items: pageItems,
      page,
      pageSize: size,
      pageCount,
      total: list.length,
      start: list.length ? from + 1 : 0,
      end: list.length ? from + pageItems.length : 0
    };
  }

  function translateText(text, lang){
    const value = String(text ?? '');
    const key = reverseText.get(value);
    return key ? textByKey(key, lang) : value;
  }

  function translateDynamicText(text, lang){
    const value = String(text ?? '');
    const code = normalizeLang(lang);

    let m = value.match(/^(\d+)\s+позиций$/);
    if(m){
      const n = m[1];
      return code==='en' ? `${n} items` : code==='uz' ? `${n} pozitsiya` : code==='tr' ? `${n} kalem` : `${n} позиций`;
    }

    m = value.match(/^Позиции разрешения\s+(.+)$/);
    if(m){
      const suffix = m[1];
      return code==='en' ? `Permit ${suffix} items` : code==='uz' ? `${suffix} ruxsatnoma pozitsiyalari` : code==='tr' ? `${suffix} izin kalemleri` : `Позиции разрешения ${suffix}`;
    }

    m = value.match(/^Файл будет содержать\s+(\d+)\s+лист\(ов\), по одному на каждое разрешение, с колонками по каждой отгрузке \(как в исходных файлах учёта\) и остатками\.$/);
    if(m){
      const n = m[1];
      return code==='en' ? `The file will contain ${n} sheet(s), one per permit, with shipment columns and balances.`
        : code==='uz' ? `Faylda ${n} ta varaq bo‘ladi: har ruxsatnomaga bittadan, yuklamalar va qoldiqlar bilan.`
        : code==='tr' ? `Dosyada ${n} sayfa olacak: her izin için bir sayfa, sevkiyat sütunları ve bakiyelerle.`
        : value;
    }

    return value;
  }

  function safeSheetName(base, usedNames){
    const used = usedNames || new Set();
    let raw = String(base ?? '').replace(/[\\/*?:\[\]]/g, '_').trim();
    if(!raw) raw = 'Sheet';
    raw = raw.slice(0,31);
    let candidate = raw;
    let i = 2;
    const exists = name => {
      const lower = name.toLowerCase();
      for(const v of used){ if(String(v).toLowerCase() === lower) return true; }
      return false;
    };
    while(exists(candidate)){
      const suffix = '_' + i++;
      candidate = raw.slice(0, 31 - suffix.length) + suffix;
    }
    used.add(candidate);
    return candidate;
  }

  /* Browser-only augmentation. */
  if(typeof window !== 'undefined' && typeof document !== 'undefined'){
    let currentLang = normalizeLang(localStorage.getItem(LANG_KEY) || 'ru');
    let currentTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    let dashboardPage = 1;
    let enhanceTimer = null;
    let observer = null;

    function getText(key){ return textByKey(key, currentLang); }

    function notify(messageOrKey){
      const msg = UI_TEXT[messageOrKey] ? getText(messageOrKey) : String(messageOrKey || '');
      try{
        if(typeof toast === 'function') toast(msg);
        else console.info(msg);
      }catch(_){ console.info(msg); }
    }

    function applyTheme(){
      document.documentElement.dataset.theme = currentTheme;
      const meta = document.querySelector('meta[name="theme-color"]');
      if(meta) meta.setAttribute('content', currentTheme === 'dark' ? '#0d1524' : '#f4f7fb');
      const btn = document.getElementById('themeToggleV5');
      if(btn){
        btn.setAttribute('aria-pressed', currentTheme === 'dark' ? 'true' : 'false');
        btn.setAttribute('title', currentTheme === 'dark' ? getText('lightMode') : getText('darkMode'));
        btn.innerHTML = currentTheme === 'dark'
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path></svg>';
      }
    }

    function toggleTheme(){
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, currentTheme);
      applyTheme();
    }

    function languageButtonHtml(){
      const info = LANGUAGES[currentLang];
      return `<span class="control-icon-v5">🌐</span><span class="lang-current-v5">${info.label}</span><span class="chev-v5">⌄</span>`;
    }

    function updateLanguageControl(){
      document.documentElement.dataset.lang = currentLang;
      document.documentElement.lang = LANGUAGES[currentLang].htmlLang;
      const btn = document.getElementById('languageToggleV5');
      if(btn){
        btn.innerHTML = languageButtonHtml();
        btn.setAttribute('title', getText('language'));
      }
      document.querySelectorAll('[data-lang-v5]').forEach(el=>{
        const code = el.dataset.langV5;
        el.classList.toggle('active', code === currentLang);
        const check = el.querySelector('.lang-check-v5');
        if(check) check.textContent = code === currentLang ? '✓' : '';
      });
      const help = document.getElementById('helpV5');
      if(help) help.setAttribute('title', getText('help'));
      const dash = document.getElementById('dashboardShortcutV5');
      if(dash) dash.setAttribute('title', getText('dashboardShortcut'));
      applyTheme();
    }

    function setLanguage(lang){
      const code = normalizeLang(lang);
      currentLang = code;
      localStorage.setItem(LANG_KEY, code);
      updateLanguageControl();
      closeLanguageMenu();
      try{ if(typeof render === 'function') render(); }catch(err){ console.error(err); }
      scheduleEnhance();
    }

    function createQuickControlBar(){
      if(document.querySelector('.quick-control-bar-v5')) return;
      const actions = document.querySelector('.topbar-actions');
      if(!actions) return;

      const bar = document.createElement('div');
      bar.className = 'quick-control-bar-v5';
      bar.innerHTML = `
        <div class="language-wrap-v5">
          <button class="control-btn-v5 language-control-v5" id="languageToggleV5" type="button" aria-haspopup="menu" aria-expanded="false"></button>
          <div class="lang-menu-v5" id="languageMenuV5" role="menu" hidden>
            ${Object.entries(LANGUAGES).map(([code,info])=>`
              <button type="button" class="lang-option-v5" data-lang-v5="${code}" role="menuitem">
                <span class="lang-flag-v5">${info.flag}</span><span>${info.label}</span><span class="lang-check-v5"></span>
              </button>`).join('')}
          </div>
        </div>
        <button class="control-btn-v5 icon-only-v5" id="themeToggleV5" type="button" aria-label="Theme"></button>
        <button class="control-btn-v5 icon-only-v5" id="dashboardShortcutV5" type="button" aria-label="Dashboard">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"></rect><rect x="14" y="4" width="6" height="6" rx="1"></rect><rect x="4" y="14" width="6" height="6" rx="1"></rect><rect x="14" y="14" width="6" height="6" rx="1"></rect></svg>
        </button>
        <button class="control-btn-v5 icon-only-v5" id="helpV5" type="button" aria-label="Help">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M9.6 9a2.6 2.6 0 1 1 4.2 2c-1 .7-1.8 1.2-1.8 2.5"></path><path d="M12 17h.01"></path></svg>
        </button>`;

      const sync = actions.querySelector('.sync-pill');
      if(sync) sync.insertAdjacentElement('afterend', bar); else actions.prepend(bar);

      document.getElementById('languageToggleV5').addEventListener('click', e=>{
        e.stopPropagation();
        const menu = document.getElementById('languageMenuV5');
        const willOpen = menu.hidden;
        menu.hidden = !willOpen;
        e.currentTarget.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
      document.querySelectorAll('[data-lang-v5]').forEach(btn=>btn.addEventListener('click', ()=>setLanguage(btn.dataset.langV5)));
      document.getElementById('themeToggleV5').addEventListener('click', toggleTheme);
      document.getElementById('dashboardShortcutV5').addEventListener('click', ()=>{
        try{
          if(typeof setTab === 'function') setTab('dashboard');
          else document.querySelector('[data-tab="dashboard"]')?.click();
        }catch(err){ console.error(err); }
        scheduleEnhance();
      });
      document.getElementById('helpV5').addEventListener('click', ()=>notify('helpMessage'));
      updateLanguageControl();
    }

    function closeLanguageMenu(){
      const menu = document.getElementById('languageMenuV5');
      const btn = document.getElementById('languageToggleV5');
      if(menu) menu.hidden = true;
      if(btn) btn.setAttribute('aria-expanded','false');
    }

    function translateNodeText(node){
      if(!node || !node.nodeValue) return;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if(!trimmed) return;
      let translated = translateText(trimmed, currentLang);
      if(translated === trimmed) translated = translateDynamicText(trimmed, currentLang);
      if(translated === trimmed) return;
      const start = raw.indexOf(trimmed);
      node.nodeValue = raw.slice(0,start) + translated + raw.slice(start + trimmed.length);
    }

    function translateAttributes(rootEl){
      const all = rootEl.matches?.('input,button,select,[title],[aria-label]') ? [rootEl] : [];
      if(rootEl.querySelectorAll) all.push(...rootEl.querySelectorAll('input,button,select,[title],[aria-label]'));
      for(const el of all){
        for(const attr of ['placeholder','title','aria-label']){
          const current = el.getAttribute?.(attr);
          if(!current) continue;
          let translated = translateText(current, currentLang);
          if(translated === current) translated = translateDynamicText(current, currentLang);
          if(translated !== current) el.setAttribute(attr, translated);
        }
      }
    }

    function translateDOM(rootEl){
      const rootNode = rootEl || document.body;
      if(!rootNode) return;
      const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let n;
      while((n = walker.nextNode())){
        const parent = n.parentElement;
        if(!parent || parent.closest('script,style')) continue;
        const rawDataCell = parent.closest('tbody td');
        if(rawDataCell && !parent.closest('.badge,button')) continue;
        nodes.push(n);
      }
      nodes.forEach(translateNodeText);
      if(rootNode.nodeType === 1) translateAttributes(rootNode);
    }

    function isDashboardActive(){
      const active = document.querySelector('.tab-btn.active');
      return !!active && active.getAttribute('data-tab') === 'dashboard';
    }

    function applyDashboardPagination(){
      if(!isDashboardActive()){
        document.querySelectorAll('.table-pagination-v5').forEach(el=>el.remove());
        return;
      }
      const app = document.getElementById('app');
      if(!app) return;
      const tables = Array.from(app.querySelectorAll('.panel table'));
      const table = tables.find(t=>t.querySelectorAll('thead th').length >= 9);
      if(!table) return;
      const tbody = table.tBodies && table.tBodies[0];
      if(!tbody) return;
      const rows = Array.from(tbody.rows);
      const info = paginate(rows, dashboardPage, PAGE_SIZE);
      dashboardPage = info.page;
      rows.forEach((row, idx)=>{ row.hidden = idx < (info.page-1)*PAGE_SIZE || idx >= info.page*PAGE_SIZE; });

      const body = table.closest('.panel-body');
      if(!body) return;
      let pager = body.querySelector('.table-pagination-v5');
      if(!pager){
        pager = document.createElement('div');
        pager.className = 'table-pagination-v5';
        body.appendChild(pager);
      }
      const paginationSignatureV5 = `${currentLang}|${info.page}|${info.pageCount}|${info.start}|${info.end}|${info.total}`;
      if(pager.dataset.paginationSignatureV5 !== paginationSignatureV5){
        pager.dataset.paginationSignatureV5 = paginationSignatureV5;
        pager.innerHTML = `
          <div class="pagination-summary-v5">${getText('showing')} ${info.start}–${info.end} / ${info.total}</div>
          <div class="pagination-actions-v5">
            <button type="button" class="pagination-btn-v5" data-page-prev-v5 ${info.page<=1?'disabled':''}>‹ ${getText('prev')}</button>
            <span class="pagination-page-v5">${getText('page')} <strong>${info.page}</strong> ${getText('of')} ${info.pageCount}</span>
            <button type="button" class="pagination-btn-v5" data-page-next-v5 ${info.page>=info.pageCount?'disabled':''}>${getText('next')} ›</button>
          </div>`;
        pager.querySelector('[data-page-prev-v5]')?.addEventListener('click', ()=>{ dashboardPage--; applyDashboardPagination(); });
        pager.querySelector('[data-page-next-v5]')?.addEventListener('click', ()=>{ dashboardPage++; applyDashboardPagination(); });
      }
    }

    function styleExportPanel(){
      const btn = document.getElementById('btnExportAll');
      if(!btn) return;
      const panel = btn.closest('.panel');
      if(panel) panel.classList.add('export-panel-v5');
      const body = btn.closest('.panel-body');
      if(body) body.classList.add('export-panel-body-v5');
    }

    function scheduleEnhance(){
      clearTimeout(enhanceTimer);
      enhanceTimer = setTimeout(()=>{
        createQuickControlBar();
        translateDOM(document.body);
        applyDashboardPagination();
        styleExportPanel();
      },0);
    }

    function hardenedExportWorkbook(){
      const button = document.getElementById('btnExportAll');
      let originalLabel = button ? button.textContent : '';
      try{
        if(typeof XLSX === 'undefined' || !XLSX.utils || typeof XLSX.writeFile !== 'function'){
          notify('exportLibraryMissing');
          return;
        }
        if(typeof state === 'undefined' || !state || !Array.isArray(state.permits) || !state.permits.length){
          notify('exportNoData');
          return;
        }
        if(button){ button.disabled = true; button.textContent = getText('exporting'); }

        const wb = XLSX.utils.book_new();
        const usedNames = new Set();
        const permitsForExport = state.permits.slice().sort((a,b)=>(a.date||'').localeCompare(b.date||''));

        for(const p of permitsForExport){
          const shipmentsForPermit = Array.isArray(state.shipments)
            ? state.shipments.filter(s=>s.permitId===p.id).slice().sort((a,b)=>(a.invoiceDate||'').localeCompare(b.invoiceDate||''))
            : [];

          const headerTitles = ['№','Наименование','Код ТН ВЭД','Количество разреш','Вес разрешение кг'];
          shipmentsForPermit.forEach(()=>{ headerTitles.push('Кол-во','Вес'); });
          headerTitles.push('Остаток количество','Остаток вес','Вес 1 единицы');

          const aoa = [];
          const titleRow = new Array(headerTitles.length).fill('');
          titleRow[1] = `Разрешение №${p.number} от ${p.date||''}`;
          aoa.push(titleRow);

          const invRow = new Array(headerTitles.length).fill('');
          let c = 5;
          shipmentsForPermit.forEach(s=>{ invRow[c] = `${s.invoiceNumber||''} от ${s.invoiceDate||''}`; c += 2; });
          aoa.push(invRow);
          aoa.push(headerTitles);

          (Array.isArray(p.items) ? p.items : []).forEach((it,idx)=>{
            const row = [idx+1, it.name, it.tnved, Number(it.qty)||0, Number(it.weight)||0];
            shipmentsForPermit.forEach(s=>{
              const line = Array.isArray(s.lines) ? s.lines.find(l=>l.itemId===it.id) : null;
              row.push(line ? (Number(line.qty)||0) : '', line ? Number((Number(line.weight)||0).toFixed(3)) : '');
            });
            const used = typeof itemUsage === 'function' ? itemUsage(p.id, it.id) : {qty:0,weight:0};
            const remQty = (Number(it.qty)||0) - (Number(used.qty)||0);
            const remWeight = (Number(it.weight)||0) - (Number(used.weight)||0);
            row.push(remQty, Number(remWeight.toFixed(3)), it.qty ? Number(((Number(it.weight)||0)/(Number(it.qty)||1)).toFixed(6)) : '');
            aoa.push(row);
          });

          const items = Array.isArray(p.items) ? p.items : [];
          const totals = ['', 'Итого', '', items.reduce((a,it)=>a+(Number(it.qty)||0),0), items.reduce((a,it)=>a+(Number(it.weight)||0),0)];
          shipmentsForPermit.forEach(s=>{
            const lines = Array.isArray(s.lines) ? s.lines : [];
            totals.push(lines.reduce((a,l)=>a+(Number(l.qty)||0),0), Number(lines.reduce((a,l)=>a+(Number(l.weight)||0),0).toFixed(3)));
          });
          const totalsUsed = shipmentsForPermit.reduce((acc,s)=>{
            for(const line of (Array.isArray(s.lines)?s.lines:[])){
              acc.qty += Number(line.qty)||0;
              acc.weight += Number(line.weight)||0;
            }
            return acc;
          },{qty:0,weight:0});
          totals.push(
            items.reduce((a,it)=>a+(Number(it.qty)||0),0) - totalsUsed.qty,
            Number((items.reduce((a,it)=>a+(Number(it.weight)||0),0) - totalsUsed.weight).toFixed(3)),
            ''
          );
          aoa.push(totals);

          const ws = XLSX.utils.aoa_to_sheet(aoa);
          const merges = [{s:{r:0,c:1},e:{r:0,c:headerTitles.length-1}}];
          let cc = 5;
          shipmentsForPermit.forEach(()=>{ merges.push({s:{r:1,c:cc},e:{r:1,c:cc+1}}); cc += 2; });
          ws['!merges'] = merges;
          ws['!cols'] = headerTitles.map((_,i)=> i===1 ? {wch:38} : {wch:14});
          XLSX.utils.book_append_sheet(wb, ws, safeSheetName(p.number, usedNames));
        }

        XLSX.writeFile(wb, 'Разрешения_учет.xlsx');
        notify('exportDone');
      }catch(err){
        console.error('Export failed', err);
        notify('exportError');
      }finally{
        if(button){
          button.disabled = false;
          button.textContent = originalLabel || getText('downloadExcel');
          translateDOM(button);
        }
      }
    }

    function initBrowser(){
      document.documentElement.dataset.lang = currentLang;
      document.documentElement.dataset.theme = currentTheme;
      applyTheme();
      createQuickControlBar();
      translateDOM(document.body);
      applyDashboardPagination();
      styleExportPanel();

      document.addEventListener('click', e=>{
        if(!e.target.closest('.language-wrap-v5')) closeLanguageMenu();
        const exportBtn = e.target.closest('#btnExportAll');
        if(exportBtn){
          e.preventDefault();
          e.stopImmediatePropagation();
          hardenedExportWorkbook();
        }
      }, true);
      document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLanguageMenu(); });
      document.addEventListener('input', e=>{ if(e.target && e.target.id==='dashSearch') dashboardPage = 1; }, true);
      document.addEventListener('change', e=>{
        if(e.target && (e.target.id==='dashboardFilter' || e.target.id==='dashboardSort')) dashboardPage = 1;
      }, true);

      const observed = document.getElementById('app') || document.body;
      observer = new MutationObserver(()=>scheduleEnhance());
      observer.observe(observed,{childList:true,subtree:true,characterData:true});
      const topbar = document.querySelector('.topbar');
      if(topbar && topbar !== observed){
        const topObserver = new MutationObserver(()=>scheduleEnhance());
        topObserver.observe(topbar,{childList:true,subtree:true,characterData:true});
      }
      scheduleEnhance();
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBrowser, {once:true});
    else initBrowser();
  }

  return { paginate, translateText, translateDynamicText, safeSheetName, UI_TEXT, LANGUAGES, PAGE_SIZE };
});
