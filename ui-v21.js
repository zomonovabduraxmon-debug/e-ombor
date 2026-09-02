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

  function materialTextV20(lang){
    const key = normalizeLang(lang);
    const copy = {
      uz:{
        material:'Mato / material',
        materialPlaceholder:'100% paxta, trikotaj',
        itemName:'Nomi',
        hs:'TIF TN',
        unit:'Birlik',
        qty:'Soni',
        weight:'Vazn, kg',
        positions:'Pozitsiyalar'
      },
      ru:{
        material:'Материал / ткань',
        materialPlaceholder:'100% хлопок, трикотаж',
        itemName:'Наименование',
        hs:'ТН ВЭД',
        unit:'Ед.',
        qty:'Кол-во',
        weight:'Вес, кг',
        positions:'Позиции'
      },
      en:{
        material:'Material / fabric',
        materialPlaceholder:'100% cotton, knit',
        itemName:'Item name',
        hs:'HS code',
        unit:'Unit',
        qty:'Qty',
        weight:'Weight, kg',
        positions:'Items'
      },
      tr:{
        material:'Kumaş / malzeme',
        materialPlaceholder:'%100 pamuk, triko',
        itemName:'Ürün adı',
        hs:'GTİP',
        unit:'Birim',
        qty:'Miktar',
        weight:'Ağırlık, kg',
        positions:'Kalemler'
      }
    };
    return {...copy[key]};
  }

  function canMutateV21(authInfo){
    return !!(authInfo && authInfo.loggedIn === true);
  }

  function normalizePermitItemV20(item){
    const source = item && typeof item === 'object' ? item : {};
    return {...source, material:String(source.material ?? '')};
  }

  function activityTextV17(lang){
    const key = normalizeLang(lang);
    const copy = {
      uz:{
        button:'So‘nggi o‘zgarishlar', title:'So‘nggi o‘zgarishlar', range:'Oxirgi 24 soat',
        permit:'Ruxsatnoma yangilandi', shipment:'Yuklama yangilandi',
        empty:'Oxirgi 24 soatda o‘zgarish topilmadi', items:'pozitsiya', close:'Yopish'
      },
      ru:{
        button:'Последние изменения', title:'Последние изменения', range:'Последние 24 часа',
        permit:'Разрешение обновлено', shipment:'Отгрузка обновлена',
        empty:'За последние 24 часа изменений нет', items:'поз.', close:'Закрыть'
      },
      en:{
        button:'Recent changes', title:'Recent changes', range:'Last 24 hours',
        permit:'Permit updated', shipment:'Shipment updated',
        empty:'No changes in the last 24 hours', items:'items', close:'Close'
      },
      tr:{
        button:'Son değişiklikler', title:'Son değişiklikler', range:'Son 24 saat',
        permit:'İzin güncellendi', shipment:'Sevkiyat güncellendi',
        empty:'Son 24 saatte değişiklik yok', items:'kalem', close:'Kapat'
      }
    };
    return {...copy[key]};
  }

  function activityItemsV17(records, lang){
    const copy = activityTextV17(lang);
    return (Array.isArray(records) ? records : [])
      .filter(r=>r && !r.deleted_at && (r.entity_type==='permit' || r.entity_type==='shipment'))
      .slice()
      .sort((a,b)=>(Date.parse(b.updated_at||'')||0)-(Date.parse(a.updated_at||'')||0))
      .map(r=>{
        const data = r.data && typeof r.data==='object' ? r.data : {};
        const id = String(data.id || r.id || '').trim();
        if(r.entity_type==='shipment'){
          const lines = Array.isArray(data.lines) ? data.lines : [];
          const invoice = String(data.invoiceNo || data.invoice || data.invoiceNumber || '').trim();
          const permit = String(data.permitId || '').trim();
          const refs = [invoice, permit].filter(Boolean).join(' · ');
          return {
            id:r.id, kind:'shipment', updatedAt:r.updated_at || '',
            title:`${copy.shipment}${id ? ` · ${id}` : ''}`,
            detail:[refs, lines.length ? `${lines.length} ${copy.items}` : ''].filter(Boolean).join(' · ')
          };
        }
        const items = Array.isArray(data.items) ? data.items : [];
        return {
          id:r.id, kind:'permit', updatedAt:r.updated_at || '',
          title:`${copy.permit}${id ? ` · ${id}` : ''}`,
          detail:items.length ? `${items.length} ${copy.items}` : ''
        };
      });
  }

  function heroTextV14(lang){
    const key = normalizeLang(lang);
    const copy = {
      uz:{
        title:'Ombor qoldig‘i',
        hint:'Joriy holat bo‘yicha ombordagi mahsulotlar',
        items:'Jami nomenklaturalar',
        weight:'Jami vazn',
        itemUnit:'nomenklatura'
      },
      ru:{
        title:'Остаток на складе',
        hint:'Товары на складе по текущему состоянию',
        items:'Всего номенклатур',
        weight:'Общий вес',
        itemUnit:'номенклатура'
      },
      en:{
        title:'Warehouse balance',
        hint:'Products currently in warehouse',
        items:'Total items',
        weight:'Total weight',
        itemUnit:'items'
      },
      tr:{
        title:'Depo bakiyesi',
        hint:'Mevcut depo ürünleri',
        items:'Toplam kalem',
        weight:'Toplam ağırlık',
        itemUnit:'kalem'
      }
    };
    return {...copy[key]};
  }

  function nextTheme(theme){
    return theme === 'dark' ? 'light' : 'dark';
  }

  function quickSections(){
    return [
      {tab:'dashboard', textKey:'dashboard'},
      {tab:'permits', textKey:'permits'},
      {tab:'shipment', textKey:'shipment'},
      {tab:'export', textKey:'export'}
    ];
  }

  function sidebarSectionsV9(){
    return [
      {action:'home', label:'Bosh sahifa', icon:'home'},
      {tab:'dashboard', label:'Qoldiqlar', icon:'spool'},
      {tab:'permits', label:'Ruxsatnomalar', icon:'clipboard'},
      {tab:'shipment', label:'Yangi yuklama', icon:'truck'},
      {tab:'export', label:'Eksport', icon:'ship'},
      {action:'stats', label:'Hisobotlar', icon:'chart'},
      {action:'settings', label:'Sozlamalar', icon:'gear'},
      {action:'logout', label:'Chiqish', icon:'logout'}
    ];
  }

  function resolveSidebarSelectionV10(activeTab, requested){
    const tab = ['dashboard','permits','shipment','export'].includes(activeTab) ? activeTab : 'dashboard';
    if(tab !== 'dashboard') return tab;
    return requested === 'home' ? 'home' : 'dashboard';
  }

  function sidebarSectionsV11(){
    return [
      {id:'dashboard', label:'Qoldiqlar', icon:'spool'},
      {id:'permits', label:'Ruxsatnomalar', icon:'clipboard'},
      {id:'shipment', label:'Yangi yuklama', icon:'truck'},
      {id:'export', label:'Eksport', icon:'ship'},
      {id:'reports', label:'Hisobotlar', icon:'chart'}
    ];
  }

  function sidebarDestinationV11(id){
    return id === 'reports'
      ? {tab:'dashboard', mode:'reports'}
      : {tab:['dashboard','permits','shipment','export'].includes(id) ? id : 'dashboard', mode:'normal'};
  }

  function resolveSidebarSelectionV11(activeTab, requested){
    const tab = ['dashboard','permits','shipment','export'].includes(activeTab) ? activeTab : 'dashboard';
    if(tab !== 'dashboard') return tab;
    return requested === 'reports' ? 'reports' : 'dashboard';
  }

  function sidebarSectionsV12(){
    return [
      {id:'dashboard', label:'Qoldiqlar', icon:'spool'},
      {id:'permits', label:'Ruxsatnomalar', icon:'clipboard'},
      {id:'shipment', label:'Yangi yuklama', icon:'truck'},
      {id:'export', label:'Eksport', icon:'ship'},
      {id:'reports', label:'Hisobotlar', icon:'chart'}
    ];
  }

  function sidebarDestinationV12(id){
    return id === 'reports'
      ? {tab:'dashboard', mode:'reports'}
      : {tab:['dashboard','permits','shipment','export'].includes(id) ? id : 'dashboard', mode:'normal'};
  }

  function resolveSidebarSelectionV12(activeTab, requested){
    const tab = ['dashboard','permits','shipment','export'].includes(activeTab) ? activeTab : 'dashboard';
    if(tab !== 'dashboard') return tab;
    return requested === 'reports' ? 'reports' : 'dashboard';
  }

  function computeKpiDeltasV12(permits, shipments, recentShipmentIds){
    const ps = Array.isArray(permits) ? permits : [];
    const ss = Array.isArray(shipments) ? shipments : [];
    const recent = recentShipmentIds instanceof Set ? recentShipmentIds : new Set(recentShipmentIds || []);

    function statusCounts(excludeRecent){
      const usage = new Map();
      for(const sh of ss){
        if(excludeRecent && recent.has(sh && sh.id)) continue;
        if(!sh || !Array.isArray(sh.lines)) continue;
        for(const ln of sh.lines){
          const key = `${sh.permitId}:${ln.itemId}`;
          usage.set(key, (usage.get(key)||0) + (Number(ln.qty)||0));
        }
      }

      let warn = 0, crit = 0;
      for(const permit of ps){
        for(const item of (permit && Array.isArray(permit.items) ? permit.items : [])){
          const allowed = Number(item.qty)||0;
          const used = usage.get(`${permit.id}:${item.id}`)||0;
          const rem = allowed - used;
          const pct = allowed ? Math.max(0,rem)/allowed : 0;
          if(rem <= 0) crit++;
          else if(pct <= .25) warn++;
        }
      }
      return {warn,crit};
    }

    const current = statusCounts(false);
    const before = statusCounts(true);
    return {
      warn:current.warn,
      crit:current.crit,
      deltaWarn:current.warn-before.warn,
      deltaCrit:current.crit-before.crit
    };
  }

  function formatDeltaV12(value){
    const n = Number(value)||0;
    if(n > 0) return `+${n} ↑`;
    if(n < 0) return `−${Math.abs(n)} ↓`;
    return '0';
  }

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
    let v10SideSelection = 'dashboard';
    let v11SideSelection = 'dashboard';
    let v12SideSelection = 'dashboard';
    let v12Navigating = false;
    let recentChangesCacheV12 = { at:0, data:null };
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
      currentTheme = nextTheme(currentTheme);
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
      updateQuickAppsMenu();
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

    function navigateQuickTab(tab){
      const allowed = new Set(quickSections().map(x=>x.tab));
      if(!allowed.has(tab)) return false;
      try{
        const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
        if(btn){
          btn.click();
          return true;
        }
        if(typeof setTab === 'function'){
          setTab(tab);
          return true;
        }
      }catch(err){
        console.error('Quick navigation failed', err);
      }
      return false;
    }

    function closeQuickAppsMenu(){
      const menu = document.getElementById('quickAppsMenuV5');
      const btn = document.getElementById('dashboardShortcutV5');
      if(menu) menu.hidden = true;
      if(btn) btn.setAttribute('aria-expanded','false');
    }

    function updateQuickAppsMenu(){
      const menu = document.getElementById('quickAppsMenuV5');
      if(!menu) return;
      menu.querySelectorAll('[data-quick-tab-v5]').forEach(btn=>{
        const tab = btn.dataset.quickTabV5;
        const section = quickSections().find(x=>x.tab===tab);
        const label = btn.querySelector('.quick-app-label-v5');
        if(label && section) label.textContent = getText(section.textKey);
        btn.classList.toggle('active', !!document.querySelector(`.tab-btn.active[data-tab="${tab}"]`));
      });
    }

    function helpMarkupV5(){
      const info = {
        ru:{
          title:'Помощь',
          intro:'Панель быстрых действий управляет интерфейсом, не изменяя данные разрешений и отгрузок.',
          language:'Язык — переключает интерфейс между Русским, English, O‘zbek и Türkçe.',
          theme:'Тема — переключает светлый и тёмный режим.',
          sections:'Меню разделов — быстрый переход к Остаткам, Разрешениям, Новой отгрузке и Экспорту.',
          login:'Войти — открывает существующий вход редактора для синхронизации изменений.'
        },
        en:{
          title:'Help',
          intro:'Quick controls manage the interface without changing permit or shipment data.',
          language:'Language — switches the interface between Russian, English, Uzbek and Turkish.',
          theme:'Theme — switches light and dark mode.',
          sections:'Sections menu — jump to Balances, Permits, New shipment or Export.',
          login:'Sign in — opens the existing editor login used to sync changes.'
        },
        uz:{
          title:'Yordam',
          intro:'Tezkor boshqaruv paneli faqat interfeysni boshqaradi, ruxsatnoma va yuklama ma’lumotlarini o‘zgartirmaydi.',
          language:'Til — interfeysni Русский, English, O‘zbek va Türkçe orasida almashtiradi.',
          theme:'Rejim — yorug‘ va qorong‘i ko‘rinishni almashtiradi.',
          sections:'Bo‘limlar — Qoldiqlar, Ruxsatnomalar, Yangi yuklama va Eksportga tez o‘tadi.',
          login:'Kirish — o‘zgarishlarni sinxronlash uchun mavjud tahrirlovchi login oynasini ochadi.'
        },
        tr:{
          title:'Yardım',
          intro:'Hızlı kontroller yalnızca arayüzü yönetir; izin ve sevkiyat verilerini değiştirmez.',
          language:'Dil — arayüzü Rusça, İngilizce, Özbekçe ve Türkçe arasında değiştirir.',
          theme:'Tema — açık ve koyu modu değiştirir.',
          sections:'Bölümler — Bakiyeler, İzinler, Yeni sevkiyat ve Dışa aktara hızlı geçiş sağlar.',
          login:'Giriş yap — değişiklikleri eşitlemek için mevcut editör girişini açar.'
        }
      }[currentLang] || null;
      return info;
    }

    function closeHelpModalV5(){
      document.getElementById('helpModalV5')?.remove();
    }

    function openHelpModalV5(){
      closeHelpModalV5();
      const h = helpMarkupV5();
      const backdrop = document.createElement('div');
      backdrop.className = 'help-backdrop-v5';
      backdrop.id = 'helpModalV5';
      backdrop.innerHTML = `
        <div class="help-card-v5" role="dialog" aria-modal="true" aria-labelledby="helpTitleV5">
          <div class="help-head-v5">
            <div>
              <div class="help-kicker-v5">${getText('help')}</div>
              <h2 id="helpTitleV5">${h.title}</h2>
            </div>
            <button type="button" class="help-close-v5" data-help-close-v5 aria-label="${getText('close')}">×</button>
          </div>
          <p class="help-intro-v5">${h.intro}</p>
          <div class="help-list-v5">
            <div class="help-item-v5"><span>🌐</span><p>${h.language}</p></div>
            <div class="help-item-v5"><span>◐</span><p>${h.theme}</p></div>
            <div class="help-item-v5"><span>▦</span><p>${h.sections}</p></div>
            <div class="help-item-v5"><span>↪</span><p>${h.login}</p></div>
          </div>
          <div class="help-foot-v5">
            <button type="button" class="control-btn-v5" data-help-close-v5>${getText('close')}</button>
          </div>
        </div>`;
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', e=>{
        if(e.target===backdrop || e.target.closest('[data-help-close-v5]')) closeHelpModalV5();
      });
    }

    function v9IconSvg(kind){
      const icons = {
        home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/>',
        spool:'<ellipse cx="12" cy="5" rx="5.5" ry="2.5"/><path d="M7 5v14M17 5v14"/><ellipse cx="12" cy="19" rx="5.5" ry="2.5"/><path d="M8.5 8.2 15.5 10M8.5 11.2l7 1.8M8.5 14.2l7 1.8"/>',
        clipboard:'<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V3h6v2M8.5 10h7M8.5 14h7M8.5 18h4.5"/>',
        truck:'<path d="M3 7h11v10H3z"/><path d="M14 11h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
        ship:'<path d="m4 14 3 6h10l3-6-8-3-8 3Z"/><path d="M9 11V5h6v8M12 5V2M7 20c1.5 1 3 1 5 0 2 1 3.5 1 5 0"/>',
        chart:'<path d="M4 20V10M9 20V5M14 20v-8M19 20V3"/><path d="M3 20h18"/>',
        gear:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.4 2.7a7 7 0 0 0-1.7 1L5 5.7 3 9.1 5 10.6a7 7 0 0 0 0 2.8L3 14.9l2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.7h5l.4-2.7a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.5.1-.9.1-1.4Z"/>',
        logout:'<path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10"/>',
        bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>'
      };
      return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${icons[kind]||icons.home}</svg>`;
    }

    function updateV9SidebarActive(){
      const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'dashboard';
      v10SideSelection = resolveSidebarSelectionV10(activeTab, v10SideSelection);
      document.querySelectorAll('.v9-side-btn').forEach(btn=>{
        const tabMatch = btn.dataset.v9Tab && btn.dataset.v9Tab === v10SideSelection;
        const homeMatch = btn.dataset.v9Action === 'home' && v10SideSelection === 'home';
        btn.classList.toggle('active', !!(tabMatch || homeMatch));
      });
    }

    function createV9Sidebar(){
      if(document.querySelector('.v9-sidebar')){
        updateV9SidebarActive();
        return;
      }

      const rows = sidebarSectionsV9();
      const side = document.createElement('aside');
      side.className = 'v9-sidebar';
      side.setAttribute('aria-label','Tezkor navigatsiya');
      side.innerHTML = `
        <div class="v9-side-top">
          ${rows.slice(0,6).map(item=>`
            <button type="button" class="v9-side-btn" ${item.tab?`data-v9-tab="${item.tab}"`:`data-v9-action="${item.action}"`} title="${item.label}" aria-label="${item.label}">
              ${v9IconSvg(item.icon)}<span>${item.label}</span>
            </button>`).join('')}
        </div>
        <div class="v9-side-bottom">
          ${rows.slice(6).map(item=>`
            <button type="button" class="v9-side-btn" data-v9-action="${item.action}" title="${item.label}" aria-label="${item.label}">
              ${v9IconSvg(item.icon)}<span>${item.label}</span>
            </button>`).join('')}
        </div>`;

      document.body.prepend(side);

      side.querySelectorAll('[data-v9-tab]').forEach(btn=>btn.addEventListener('click', ()=>{
        v10SideSelection = btn.dataset.v9Tab;
        navigateQuickTab(btn.dataset.v9Tab);
        updateV9SidebarActive();
        scheduleEnhance();
      }));

      side.querySelectorAll('[data-v9-action]').forEach(btn=>btn.addEventListener('click', ()=>{
        const action = btn.dataset.v9Action;
        if(action==='home'){
          v10SideSelection = 'home';
          navigateQuickTab('dashboard');
        }else if(action==='stats'){
          v10SideSelection = 'dashboard';
          navigateQuickTab('dashboard');
        }else if(action==='settings'){
          openHelpModalV5();
        }else if(action==='logout'){
          document.getElementById('authBtn')?.click();
        }
        updateV9SidebarActive();
        scheduleEnhance();
      }));

      updateV9SidebarActive();
    }

    function updateV11SidebarActive(){
      const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'dashboard';
      v11SideSelection = resolveSidebarSelectionV11(activeTab, v11SideSelection);
      document.querySelectorAll('.v11-side-btn[data-v11-section]').forEach(btn=>{
        btn.classList.toggle('active', btn.dataset.v11Section === v11SideSelection);
      });
    }

    function renderV11ReportsView(){
      const app = document.getElementById('app');
      if(!app) return;

      const existing = app.querySelector('.v11-reports-view');
      if(v11SideSelection !== 'reports' || !isDashboardActive()){
        existing?.remove();
        app.classList.remove('v11-reports-active');
        return;
      }

      const stats = Array.from(app.querySelectorAll('.stat-card')).slice(0,3).map(card=>({
        num: card.querySelector('.num')?.textContent?.trim() || '—',
        lbl: card.querySelector('.lbl')?.textContent?.trim() || ''
      }));
      const metrics = Array.from(app.querySelectorAll('.warehouse-value')).slice(0,2).map(v=>({
        num: v.querySelector('strong')?.textContent?.trim() || '—',
        unit: v.querySelector('span')?.textContent?.trim() || ''
      }));

      const view = existing || document.createElement('section');
      view.className = 'v11-reports-view';
      view.innerHTML = `
        <div class="v11-reports-head">
          <div>
            <h1>Hisobotlar</h1>
            <p>Ombor, ruxsatnomalar va qoldiqlar bo‘yicha joriy ko‘rsatkichlar</p>
          </div>
          <button type="button" class="v11-report-export-btn">Excel hisobot</button>
        </div>
        <div class="v11-report-grid">
          <article class="v11-report-card v11-report-wide">
            <span>Jami miqdor</span>
            <strong>${metrics[0]?.num || '—'}</strong>
            <small>${metrics[0]?.unit || ''}</small>
          </article>
          <article class="v11-report-card v11-report-wide">
            <span>Jami vazn</span>
            <strong>${metrics[1]?.num || '—'}</strong>
            <small>${metrics[1]?.unit || ''}</small>
          </article>
          ${stats.map((s,i)=>`
            <article class="v11-report-card">
              <div class="v11-report-card-icon">${v9IconSvg(i===0?'clipboard':i===1?'spool':'chart')}</div>
              <span>${s.lbl}</span>
              <strong>${s.num}</strong>
            </article>`).join('')}
        </div>
        <div class="v11-report-note">
          <div>${v9IconSvg('chart')}</div>
          <p>To‘liq ma’lumotlar “Qoldiqlar” va “Ruxsatnomalar” bo‘limlarida saqlanadi. Excel faylini eksport bo‘limidan yuklab olish mumkin.</p>
        </div>`;

      if(!existing) app.appendChild(view);
      app.classList.add('v11-reports-active');

      view.querySelector('.v11-report-export-btn')?.addEventListener('click', ()=>{
        v11SideSelection = 'export';
        navigateQuickTab('export');
        updateV11SidebarActive();
        scheduleEnhance();
      }, {once:true});
    }

    function createV11Sidebar(){
      document.querySelector('.v9-sidebar')?.remove();
      if(document.querySelector('.v11-sidebar')){
        updateV11SidebarActive();
        return;
      }

      const side = document.createElement('aside');
      side.className = 'v11-sidebar';
      side.setAttribute('aria-label','Asosiy bo‘limlar');
      side.innerHTML = `
        <nav class="v11-side-main">
          ${sidebarSectionsV11().map(item=>`
            <button type="button" class="v11-side-btn" data-v11-section="${item.id}" aria-label="${item.label}" title="${item.label}">
              <span class="v11-side-icon">${v9IconSvg(item.icon)}</span>
              <span class="v11-side-label">${item.label}</span>
            </button>`).join('')}
        </nav>
        <div class="v11-side-aux">
          <button type="button" class="v11-side-aux-btn" data-v11-aux="settings" aria-label="Sozlamalar" title="Sozlamalar">${v9IconSvg('gear')}</button>
          <button type="button" class="v11-side-aux-btn" data-v11-aux="logout" aria-label="Chiqish" title="Chiqish">${v9IconSvg('logout')}</button>
        </div>`;

      document.body.prepend(side);

      side.querySelectorAll('[data-v11-section]').forEach(btn=>btn.addEventListener('click', ()=>{
        const id = btn.dataset.v11Section;
        const destination = sidebarDestinationV11(id);
        v11SideSelection = id;
        navigateQuickTab(destination.tab);
        setTimeout(()=>{
          renderV11ReportsView();
          updateV11SidebarActive();
          scheduleEnhance();
        },0);
      }));

      side.querySelector('[data-v11-aux="settings"]')?.addEventListener('click', openHelpModalV5);
      side.querySelector('[data-v11-aux="logout"]')?.addEventListener('click', ()=>document.getElementById('authBtn')?.click());

      document.querySelectorAll('.tab-btn').forEach(tab=>{
        if(tab.dataset.v11Bound) return;
        tab.dataset.v11Bound = '1';
        tab.addEventListener('click', ()=>{
          v11SideSelection = tab.dataset.tab || 'dashboard';
          setTimeout(()=>{
            renderV11ReportsView();
            updateV11SidebarActive();
          },0);
        });
      });

      updateV11SidebarActive();
    }

    function decorateV11Hero(){
      const app = document.getElementById('app');
      if(!app || !isDashboardActive()) return;

      const toolbar = app.querySelector('.toolbar');
      if(toolbar){
        toolbar.classList.remove('v10-dashboard-toolbar');
        toolbar.classList.add('v11-dashboard-toolbar');
      }

      const summary = app.querySelector('.warehouse-summary');
      if(!summary) return;
      summary.classList.add('v11-textile-hero');

      let main = summary.querySelector('.warehouse-summary-main');
      if(!main){
        main = document.createElement('div');
        main.className = 'warehouse-summary-main';
        const first = summary.firstElementChild;
        if(first && !first.classList.contains('warehouse-values')) main.appendChild(first);
        summary.insertBefore(main, summary.firstChild);
      }

      let icon = main.querySelector('.warehouse-icon');
      if(!icon){
        icon = document.createElement('div');
        icon.className = 'warehouse-icon';
        main.insertBefore(icon, main.firstChild);
      }
      icon.className = 'warehouse-icon v11-warehouse-icon';
      icon.setAttribute('aria-hidden','true');
      icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 10.2 12 4l9 6.2V20H3z"/>
          <path d="M6.5 11.5h11V20h-11z"/>
          <path d="M9.2 14h5.6M9.2 17h5.6"/>
        </svg>`;

      const title = main.querySelector('.title');
      const hint = main.querySelector('.hint');
      if(title) title.textContent = "OMBOR QOLDIG'I";
      if(hint) hint.textContent = "Joriy holat bo‘yicha ombordagi mahsulotlar";

      const values = summary.querySelector('.warehouse-values');
      if(values){
        values.classList.add('v11-warehouse-values');
        Array.from(values.querySelectorAll('.warehouse-value')).slice(0,2).forEach((value,index)=>{
          let label = value.querySelector('.v11-metric-label');
          if(!label){
            label = document.createElement('small');
            label.className = 'v11-metric-label';
            value.insertBefore(label, value.firstChild);
          }
          label.textContent = index===0 ? 'Jami miqdor' : 'Jami vazn';
        });
      }

      let rolls = summary.querySelector('.v11-rolls');
      if(!rolls){
        rolls = document.createElement('div');
        rolls.className = 'v11-rolls';
        rolls.setAttribute('aria-hidden','true');
        summary.appendChild(rolls);
      }
    }

    function updateV12SidebarActive(){
      const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'dashboard';
      v12SideSelection = resolveSidebarSelectionV12(activeTab, v12SideSelection);
      document.querySelectorAll('.v12-side-btn[data-v12-section]').forEach(btn=>{
        btn.classList.toggle('active', btn.dataset.v12Section === v12SideSelection);
      });
      document.querySelector('.tab-btn[data-tab="dashboard"]')?.classList.toggle('v12-under-reports', v12SideSelection === 'reports');
    }

    function renderV12ReportsView(){
      const app = document.getElementById('app');
      if(!app) return;

      const existing = app.querySelector('.v12-reports-view');
      if(v12SideSelection !== 'reports' || !isDashboardActive()){
        existing?.remove();
        app.classList.remove('v12-reports-active');
        return;
      }

      const stats = Array.from(app.querySelectorAll('.stat-card')).slice(0,3).map(card=>({
        num:card.querySelector('.num')?.textContent?.trim() || '—',
        lbl:card.querySelector('.lbl')?.textContent?.trim() || ''
      }));
      const values = Array.from(app.querySelectorAll('.warehouse-value')).slice(0,2).map(v=>({
        num:v.querySelector('strong')?.textContent?.trim() || '—',
        unit:v.querySelector('span')?.textContent?.trim() || '',
        label:v.querySelector('.v11-metric-label,.v12-metric-label')?.textContent?.trim() || ''
      }));

      const view = existing || document.createElement('section');
      view.className = 'v12-reports-view';
      view.innerHTML = `
        <div class="v12-reports-head">
          <div><h1>Hisobotlar</h1><p>Omborning joriy holati va so‘nggi o‘zgarishlar</p></div>
          <button type="button" class="v12-report-export-btn">Eksportga o‘tish</button>
        </div>
        <div class="v12-report-grid">
          ${values.map(v=>`
            <article class="v12-report-card v12-report-primary">
              <span>${v.label || 'Ko‘rsatkich'}</span>
              <strong>${v.num}</strong><small>${v.unit}</small>
            </article>`).join('')}
          ${stats.map((s,i)=>`
            <article class="v12-report-card">
              <div class="v12-report-icon">${v9IconSvg(i===0?'clipboard':i===1?'spool':'chart')}</div>
              <span>${s.lbl}</span><strong>${s.num}</strong>
            </article>`).join('')}
        </div>`;

      if(!existing) app.appendChild(view);
      app.classList.add('v12-reports-active');

      view.querySelector('.v12-report-export-btn')?.addEventListener('click', ()=>{
        v12SideSelection = 'export';
        v12Navigating = true;
        navigateQuickTab('export');
        v12Navigating = false;
        updateV12SidebarActive();
        scheduleEnhance();
      }, {once:true});
    }

    function createV12Sidebar(){
      document.querySelector('.v9-sidebar')?.remove();
      document.querySelector('.v11-sidebar')?.remove();

      if(document.querySelector('.v12-sidebar')){
        updateV12SidebarActive();
        return;
      }

      const side = document.createElement('aside');
      side.className = 'v12-sidebar';
      side.setAttribute('aria-label','Asosiy bo‘limlar');
      side.innerHTML = `
        <nav class="v12-side-main">
          ${sidebarSectionsV12().map(item=>`
            <button type="button" class="v12-side-btn" data-v12-section="${item.id}" aria-label="${item.label}" title="${item.label}">
              <span class="v12-side-icon">${v9IconSvg(item.icon)}</span>
              <span class="v12-side-label">${item.label}</span>
            </button>`).join('')}
        </nav>
        <div class="v12-side-aux">
          <button type="button" class="v12-side-aux-btn" data-v12-aux="settings" aria-label="Sozlamalar" title="Sozlamalar">${v9IconSvg('gear')}</button>
          <button type="button" class="v12-side-aux-btn" data-v12-aux="logout" aria-label="Chiqish" title="Chiqish">${v9IconSvg('logout')}</button>
        </div>`;
      document.body.prepend(side);

      side.querySelectorAll('[data-v12-section]').forEach(btn=>btn.addEventListener('click', ()=>{
        const id = btn.dataset.v12Section;
        const destination = sidebarDestinationV12(id);
        v12SideSelection = id;
        v12Navigating = true;
        navigateQuickTab(destination.tab);
        v12Navigating = false;
        v12SideSelection = id;
        setTimeout(()=>{
          renderV12ReportsView();
          updateV12SidebarActive();
          scheduleEnhance();
        },0);
      }));

      side.querySelector('[data-v12-aux="settings"]')?.addEventListener('click',openHelpModalV5);
      side.querySelector('[data-v12-aux="logout"]')?.addEventListener('click',()=>document.getElementById('authBtn')?.click());

      document.querySelectorAll('.tab-btn').forEach(tab=>{
        if(tab.dataset.v12Bound) return;
        tab.dataset.v12Bound = '1';
        tab.addEventListener('click', ()=>{
          if(v12Navigating) return;
          v12SideSelection = tab.dataset.tab || 'dashboard';
          setTimeout(()=>{
            renderV12ReportsView();
            updateV12SidebarActive();
          },0);
        });
      });

      updateV12SidebarActive();
    }

    function closeRecentActivityV17(){
      document.querySelector('.activity-overlay-v17')?.remove();
      document.querySelector('.activity-drawer-v17')?.remove();
      ['recentActivityBtnV17','recentActivityBtnV18','recentActivityBtnV19'].forEach(id=>document.getElementById(id)?.setAttribute('aria-expanded','false'));
    }

    function formatActivityTimeV17(iso){
      const d = new Date(iso || '');
      if(!Number.isFinite(d.getTime())) return '';
      try{
        return new Intl.DateTimeFormat(currentLang==='uz'?'uz-UZ':currentLang==='ru'?'ru-RU':currentLang==='tr'?'tr-TR':'en-GB',{
          hour:'2-digit',minute:'2-digit',day:'2-digit',month:'short'
        }).format(d);
      }catch(_){
        return d.toLocaleString();
      }
    }

    function readActivityRecordsV17(){
      return new Promise(resolve=>{
        if(!('indexedDB' in window)){
          resolve([]);
          return;
        }
        let request;
        try{ request = indexedDB.open('permit_app_offline_v2'); }
        catch(_){ resolve([]); return; }

        request.onerror = ()=>resolve([]);
        request.onsuccess = ()=>{
          const db = request.result;
          if(!db.objectStoreNames.contains('records')){
            db.close(); resolve([]); return;
          }
          const tx = db.transaction('records','readonly');
          const get = tx.objectStore('records').getAll();
          get.onerror = ()=>{ db.close(); resolve([]); };
          get.onsuccess = ()=>{
            const since = Date.now() - 24*60*60*1000;
            const rows = (get.result||[])
              .filter(r=>{
                const t = Date.parse(r.updated_at||'');
                return !r.deleted_at && Number.isFinite(t) && t>=since &&
                  (r.entity_type==='permit' || r.entity_type==='shipment');
              })
              .sort((a,b)=>(Date.parse(b.updated_at||'')||0)-(Date.parse(a.updated_at||'')||0))
              .slice(0,30);
            db.close();
            resolve(rows);
          };
        };
      });
    }

    function renderActivityDrawerV17(records){
      closeRecentActivityV17();
      const copy = activityTextV17(currentLang);
      const items = activityItemsV17(records,currentLang);

      const overlay = document.createElement('button');
      overlay.type = 'button';
      overlay.className = 'activity-overlay-v17';
      overlay.setAttribute('aria-label',copy.close);

      const drawer = document.createElement('aside');
      drawer.className = 'activity-drawer-v17';
      drawer.setAttribute('data-v17-activity','');
      drawer.setAttribute('aria-label',copy.title);
      drawer.innerHTML = `
        <div class="activity-head-v17">
          <div>
            <h3>${escapeHtmlV5(copy.title)}</h3>
            <span>${escapeHtmlV5(copy.range)}</span>
          </div>
          <button type="button" class="activity-close-v17" aria-label="${escapeHtmlV5(copy.close)}">×</button>
        </div>
        <div class="activity-list-v17">
          ${items.length ? items.map(item=>`
            <article class="activity-item-v17" data-kind="${item.kind}">
              <span class="activity-icon-v17">${v9IconSvg(item.kind==='shipment'?'truck':'clipboard')}</span>
              <div class="activity-content-v17">
                <strong>${escapeHtmlV5(item.title)}</strong>
                ${item.detail ? `<p>${escapeHtmlV5(item.detail)}</p>` : ''}
                <time>${escapeHtmlV5(formatActivityTimeV17(item.updatedAt))}</time>
              </div>
            </article>`).join('') : `
            <div class="activity-empty-v17">
              ${v9IconSvg('chart')}
              <strong>${escapeHtmlV5(copy.empty)}</strong>
            </div>`}
        </div>`;

      document.body.appendChild(overlay);
      document.body.appendChild(drawer);
      ['recentActivityBtnV17','recentActivityBtnV18','recentActivityBtnV19'].forEach(id=>document.getElementById(id)?.setAttribute('aria-expanded','true'));

      overlay.addEventListener('click',closeRecentActivityV17);
      drawer.querySelector('.activity-close-v17')?.addEventListener('click',closeRecentActivityV17);
      requestAnimationFrame(()=>drawer.classList.add('open'));
    }

    function openRecentActivityV17(){
      const old = document.querySelector('.activity-drawer-v17');
      if(old){
        closeRecentActivityV17();
        return;
      }
      readActivityRecordsV17().then(renderActivityDrawerV17);
    }

    function syncActivityButtonV19(){
      const btn = document.getElementById('recentActivityBtnV19');
      if(!btn) return;
      const copy = activityTextV17(currentLang);

      let span = btn.querySelector('span');
      if(!span){
        span = document.createElement('span');
        btn.appendChild(span);
      }
      span.textContent = copy.button;
      btn.setAttribute('aria-label',copy.button);

      let dot = btn.querySelector('.activity-dot-v19');
      if(!dot){
        dot = document.createElement('i');
        dot.className = 'activity-dot-v19';
        dot.setAttribute('aria-hidden','true');
        btn.appendChild(dot);
      }

      readActivityRecordsV17().then(records=>{
        dot.hidden = records.length===0;
        btn.dataset.count = String(records.length);
        btn.title = `${copy.button}${records.length ? ` · ${records.length}` : ''}`;
      });
    }

    function rebuildControlsV19(controls, search, filter, sort){
      const grid = document.createElement('div');
      grid.className = 'v19-control-grid';

      // Remove every legacy V17/V18 wrapper at once, while preserving
      // the original input/select nodes and all of their listeners.
      controls.replaceChildren(grid);

      if(search){
        const shell = document.createElement('div');
        shell.className = 'v19-search-shell';
        shell.innerHTML = `
          <span class="v19-leading-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
              <circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>
            </svg>
          </span>`;
        shell.appendChild(search);
        const hint = document.createElement('span');
        hint.className = 'v19-search-shortcut';
        hint.textContent = navigator.platform && /Mac/i.test(navigator.platform) ? '⌘ K' : 'Ctrl K';
        hint.setAttribute('aria-hidden','true');
        shell.appendChild(hint);
        grid.appendChild(shell);
      }

      if(filter){
        const shell = document.createElement('div');
        shell.className = 'v19-select-shell v19-filter-shell';
        shell.innerHTML = `
          <span class="v19-leading-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 6h16l-6 7v5l-4 2v-7L4 6Z"/>
            </svg>
          </span>`;
        shell.appendChild(filter);
        grid.appendChild(shell);
      }

      if(sort){
        const shell = document.createElement('div');
        shell.className = 'v19-select-shell v19-sort-shell';
        shell.innerHTML = `
          <span class="v19-leading-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M8 4v16M5 7l3-3 3 3M16 20V4M13 17l3 3 3-3"/>
            </svg>
          </span>`;
        shell.appendChild(sort);
        grid.appendChild(shell);
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'recentActivityBtnV19';
      btn.className = 'recent-activity-btn-v19';
      btn.setAttribute('aria-expanded','false');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/>
        </svg>
        <span></span>`;
      btn.addEventListener('click',openRecentActivityV17);
      grid.appendChild(btn);

      controls.dataset.v19Built = '1';
      return grid;
    }

    function createControlRowV19(){
      if(!isDashboardActive()){
        closeRecentActivityV17();
        return;
      }

      const controls = document.querySelector('#app .dashboard-controls');
      const search = document.getElementById('dashSearch');
      const filter = document.getElementById('dashboardFilter');
      const sort = document.getElementById('dashboardSort');
      if(!controls || !search || !filter || !sort) return;

      controls.className = 'dashboard-controls v19-controls';

      const currentGrid = controls.querySelector(':scope > .v19-control-grid');
      const valid =
        controls.dataset.v19Built === '1' &&
        currentGrid &&
        search.closest('.v19-search-shell')?.parentElement === currentGrid &&
        filter.closest('.v19-filter-shell')?.parentElement === currentGrid &&
        sort.closest('.v19-sort-shell')?.parentElement === currentGrid &&
        document.getElementById('recentActivityBtnV19')?.parentElement === currentGrid;

      if(!valid) rebuildControlsV19(controls,search,filter,sort);
      syncActivityButtonV19();

      if(!document.documentElement.dataset.v19Shortcuts){
        document.documentElement.dataset.v19Shortcuts = '1';
        document.addEventListener('keydown',e=>{
          if((e.metaKey || e.ctrlKey) && String(e.key).toLowerCase()==='k'){
            const field = document.getElementById('dashSearch');
            if(field && isDashboardActive()){
              e.preventDefault();
              field.focus();
              field.select?.();
            }
          }
          if(e.key==='Escape') closeRecentActivityV17();
        });
      }
    }

    function syncActivityButtonV18(){
      const btn = document.getElementById('recentActivityBtnV18');
      if(!btn) return;
      const copy = activityTextV17(currentLang);

      let icon = btn.querySelector('svg');
      if(!icon){
        btn.insertAdjacentHTML('afterbegin',`
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/>
          </svg>`);
        icon = btn.querySelector('svg');
      }

      let span = btn.querySelector('span');
      if(!span){
        span = document.createElement('span');
        btn.appendChild(span);
      }
      span.textContent = copy.button;

      let dot = btn.querySelector('.activity-dot-v18');
      if(!dot){
        dot = document.createElement('i');
        dot.className = 'activity-dot-v18';
        dot.setAttribute('aria-hidden','true');
        btn.appendChild(dot);
      }

      btn.title = copy.button;
      btn.setAttribute('aria-label',copy.button);

      readActivityRecordsV17().then(records=>{
        dot.hidden = records.length===0;
        btn.dataset.count = String(records.length);
        btn.title = `${copy.button}${records.length ? ` · ${records.length}` : ''}`;
      });
    }

    function createControlRowV18(){
      if(!isDashboardActive()){
        closeRecentActivityV17();
        return;
      }

      const controls = document.querySelector('#app .dashboard-controls');
      if(!controls) return;

      controls.classList.remove('v17-controls');
      controls.classList.add('v18-controls');

      controls.querySelector('.v12-filter-action')?.remove();
      controls.querySelector('.recent-activity-btn-v17')?.remove();

      let grid = controls.querySelector('.v18-control-grid');
      if(!grid){
        grid = document.createElement('div');
        grid.className = 'v18-control-grid';
        controls.appendChild(grid);
      }

      const search = document.getElementById('dashSearch');
      if(search){
        let shell = search.closest('.v18-search-shell');
        if(!shell){
          shell = document.createElement('div');
          shell.className = 'v18-search-shell';
          search.parentNode.insertBefore(shell,search);
          shell.appendChild(search);
          shell.insertAdjacentHTML('afterbegin',`
            <span class="v18-leading-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
                <circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>
              </svg>
            </span>`);
          const hint = document.createElement('span');
          hint.className = 'v18-search-shortcut';
          hint.textContent = navigator.platform && /Mac/i.test(navigator.platform) ? '⌘ K' : 'Ctrl K';
          hint.setAttribute('aria-hidden','true');
          shell.appendChild(hint);
        }
        if(shell.parentElement !== grid) grid.appendChild(shell);
      }

      const filter = document.getElementById('dashboardFilter');
      if(filter){
        let shell = filter.closest('.v18-filter-shell');
        if(!shell){
          shell = document.createElement('div');
          shell.className = 'v18-select-shell v18-filter-shell';
          filter.parentNode.insertBefore(shell,filter);
          shell.appendChild(filter);
          shell.insertAdjacentHTML('afterbegin',`
            <span class="v18-leading-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M4 6h16l-6 7v5l-4 2v-7L4 6Z"/>
              </svg>
            </span>`);
        }
        if(shell.parentElement !== grid) grid.appendChild(shell);
      }

      const sort = document.getElementById('dashboardSort');
      if(sort){
        let shell = sort.closest('.v18-sort-shell');
        if(!shell){
          shell = document.createElement('div');
          shell.className = 'v18-select-shell v18-sort-shell';
          sort.parentNode.insertBefore(shell,sort);
          shell.appendChild(sort);
          shell.insertAdjacentHTML('afterbegin',`
            <span class="v18-leading-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <path d="M8 4v16M5 7l3-3 3 3M16 20V4M13 17l3 3 3-3"/>
              </svg>
            </span>`);
        }
        if(shell.parentElement !== grid) grid.appendChild(shell);
      }

      let btn = document.getElementById('recentActivityBtnV18');
      if(!btn){
        btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'recentActivityBtnV18';
        btn.className = 'recent-activity-btn-v18';
        btn.setAttribute('aria-expanded','false');
        btn.addEventListener('click',openRecentActivityV17);
      }
      if(btn.parentElement !== grid) grid.appendChild(btn);

      syncActivityButtonV18();
    }

    function createControlRowV17(){
      if(!isDashboardActive()){
        closeRecentActivityV17();
        return;
      }

      const controls = document.querySelector('#app .dashboard-controls');
      if(!controls) return;
      controls.classList.add('v17-controls');

      // V12 used this last button as reset. V17 replaces it with actual unseen information.
      controls.querySelector('.v12-filter-action')?.remove();

      const search = document.getElementById('dashSearch');
      if(search && !search.closest('.search-shell-v17')){
        const wrap = document.createElement('div');
        wrap.className = 'search-shell-v17';
        search.parentNode.insertBefore(wrap,search);
        wrap.appendChild(search);

        const hint = document.createElement('span');
        hint.className = 'search-shortcut-v17';
        hint.textContent = navigator.platform && /Mac/i.test(navigator.platform) ? '⌘ K' : 'Ctrl K';
        hint.setAttribute('aria-hidden','true');
        wrap.appendChild(hint);
      }

      const filter = document.getElementById('dashboardFilter');
      if(filter && !filter.closest('.filter-shell-v17')){
        const wrap = document.createElement('div');
        wrap.className = 'filter-shell-v17 select-shell-v17';
        filter.parentNode.insertBefore(wrap,filter);
        wrap.appendChild(filter);
        wrap.insertAdjacentHTML('afterbegin',`
          <span class="control-leading-v17" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16l-6 7v5l-4 2v-7L4 6Z"/></svg>
          </span>`);
      }

      const sort = document.getElementById('dashboardSort');
      if(sort && !sort.closest('.sort-shell-v17')){
        const wrap = document.createElement('div');
        wrap.className = 'sort-shell-v17 select-shell-v17';
        sort.parentNode.insertBefore(wrap,sort);
        wrap.appendChild(sort);
        wrap.insertAdjacentHTML('afterbegin',`
          <span class="control-leading-v17" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 4v16M5 7l3-3 3 3M16 20V4M13 17l3 3 3-3"/></svg>
          </span>`);
      }

      if(!document.getElementById('recentActivityBtnV17')){
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'recentActivityBtnV17';
        btn.className = 'recent-activity-btn-v17';
        btn.setAttribute('aria-expanded','false');
        controls.appendChild(btn);
        btn.addEventListener('click',openRecentActivityV17);
      }

      const copy = activityTextV17(currentLang);
      const activityBtn = document.getElementById('recentActivityBtnV17');
      if(activityBtn){
        activityBtn.innerHTML = `
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/>
          </svg>
          <span>${escapeHtmlV5(copy.button)}</span>
          <i class="activity-dot-v17" aria-hidden="true"></i>`;
        readActivityRecordsV17().then(records=>{
          const dot = activityBtn.querySelector('.activity-dot-v17');
          if(dot) dot.hidden = records.length===0;
          activityBtn.dataset.count = String(records.length);
          activityBtn.title = `${copy.button}${records.length ? ` · ${records.length}` : ''}`;
        });
      }

      if(!document.documentElement.dataset.v17Shortcuts){
        document.documentElement.dataset.v17Shortcuts = '1';
        document.addEventListener('keydown',e=>{
          if((e.metaKey || e.ctrlKey) && String(e.key).toLowerCase()==='k'){
            const field = document.getElementById('dashSearch');
            if(field && isDashboardActive()){
              e.preventDefault();
              field.focus();
              field.select?.();
            }
          }
          if(e.key==='Escape') closeRecentActivityV17();
        });
      }
    }

    function createV12FilterButton(){
      if(!isDashboardActive()) return;
      const controls = document.querySelector('#app .dashboard-controls');
      if(!controls || controls.querySelector('.v12-filter-action')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'v12-filter-action';
      btn.title = 'Filtrlarni tozalash';
      btn.setAttribute('aria-label','Filtrlarni tozalash');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path d="M4 7h16M4 12h16M4 17h16"/>
          <circle cx="9" cy="7" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="11" cy="17" r="2"/>
        </svg>`;
      controls.appendChild(btn);

      btn.addEventListener('click', ()=>{
        const search = document.getElementById('dashSearch');
        if(search){
          search.value = '';
          search.dispatchEvent(new Event('input',{bubbles:true}));
        }
        setTimeout(()=>{
          const filter = document.getElementById('dashboardFilter');
          if(filter){
            filter.value = 'all';
            filter.dispatchEvent(new Event('change',{bubbles:true}));
          }
          setTimeout(()=>{
            const sort = document.getElementById('dashboardSort');
            if(sort){
              sort.value = 'remaining-desc';
              sort.dispatchEvent(new Event('change',{bubbles:true}));
            }
          },0);
        },0);
      });
    }

    function decorateV12HeroMetrics(){
      const app = document.getElementById('app');
      if(!app || !isDashboardActive()) return;

      const toolbar = app.querySelector('.toolbar');
      if(toolbar){
        toolbar.classList.remove('v10-dashboard-toolbar','v11-dashboard-toolbar');
        toolbar.classList.add('v12-dashboard-toolbar');
      }

      const summary = app.querySelector('.warehouse-summary');
      if(!summary) return;
      summary.classList.add('v12-textile-hero');

      const title = summary.querySelector('.title');
      const hint = summary.querySelector('.hint');
      if(title) title.textContent = "OMBOR QOLDIG'I";
      if(hint) hint.textContent = "Joriy holat bo‘yicha ombordagi mahsulotlar";

      const rowsCount = app.querySelectorAll('.panel tbody tr').length;
      const values = Array.from(summary.querySelectorAll('.warehouse-value')).slice(0,2);
      if(values[0]){
        const strong = values[0].querySelector('strong');
        const unit = values[0].querySelector('span');
        if(strong) strong.textContent = String(rowsCount).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
        if(unit) unit.textContent = 'nomenklatura';
        let label = values[0].querySelector('.v12-metric-label,.v11-metric-label');
        if(!label){
          label = document.createElement('small');
          values[0].insertBefore(label,values[0].firstChild);
        }
        label.className = 'v12-metric-label';
        label.textContent = 'Jami nomenklaturalar';
      }
      if(values[1]){
        let label = values[1].querySelector('.v12-metric-label,.v11-metric-label');
        if(!label){
          label = document.createElement('small');
          values[1].insertBefore(label,values[1].firstChild);
        }
        label.className = 'v12-metric-label';
        label.textContent = 'Jami vazn';
      }

      summary.querySelector('.v11-rolls')?.classList.add('v12-rolls');
    }

    function cleanupMetricLabelsV13(summary, heroCopy){
      if(!summary) return;
      Array.from(summary.querySelectorAll('.warehouse-value')).slice(0,2).forEach((value,index)=>{
        const labels = Array.from(value.querySelectorAll('.v11-metric-label,.v12-metric-label,.v13-metric-label'));
        labels.slice(1).forEach(node=>node.remove());

        let label = labels[0];
        if(!label){
          label = document.createElement('small');
          value.insertBefore(label,value.firstChild);
        }
        label.className = 'v13-metric-label';
        label.textContent = index===0 ? heroCopy.items : heroCopy.weight;

        value.classList.add('v13-metric');

        const strong = value.querySelector('strong');
        if(strong) strong.classList.add('v13-metric-number');

        const unit = value.querySelector('span');
        if(unit) unit.classList.add('v13-metric-unit');
      });
    }

    function decorateV13HeroMetrics(){
      const app = document.getElementById('app');
      if(!app || !isDashboardActive()) return;

      const toolbar = app.querySelector('.toolbar');
      if(toolbar){
        toolbar.classList.remove('v10-dashboard-toolbar','v11-dashboard-toolbar');
        toolbar.classList.add('v12-dashboard-toolbar');
      }

      const summary = app.querySelector('.warehouse-summary');
      if(!summary) return;

      summary.classList.add('v9-textile-summary','v11-textile-hero','v12-textile-hero','v13-textile-hero');

      let main = summary.querySelector('.warehouse-summary-main');
      if(!main){
        main = document.createElement('div');
        main.className = 'warehouse-summary-main';
        const first = summary.firstElementChild;
        if(first && !first.classList.contains('warehouse-values')) main.appendChild(first);
        summary.insertBefore(main, summary.firstChild);
      }

      let icon = main.querySelector('.warehouse-icon');
      if(!icon){
        icon = document.createElement('div');
        main.insertBefore(icon,main.firstChild);
      }
      icon.className = 'warehouse-icon v11-warehouse-icon v13-warehouse-icon';
      if(icon.dataset.v13Ready !== '1'){
        icon.setAttribute('aria-hidden','true');
        icon.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 10.2 12 4l9 6.2V20H3z"/>
            <path d="M6.5 11.5h11V20h-11z"/>
            <path d="M9.2 14h5.6M9.2 17h5.6"/>
          </svg>`;
        icon.dataset.v13Ready = '1';
      }

      const heroCopy = heroTextV14(currentLang);
      const title = main.querySelector('.title');
      const hint = main.querySelector('.hint');
      if(title) title.textContent = heroCopy.title;
      if(hint) hint.textContent = heroCopy.hint;

      const valuesWrap = summary.querySelector('.warehouse-values');
      if(valuesWrap){
        valuesWrap.classList.add('v11-warehouse-values','v13-warehouse-values');

        const values = Array.from(valuesWrap.querySelectorAll('.warehouse-value')).slice(0,2);

        if(values[0]){
          const strong = values[0].querySelector('strong');
          const unit = values[0].querySelector('span');
          const rowsCount = app.querySelectorAll('.panel tbody tr').length;
          const countText = String(rowsCount).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
          if(strong && strong.textContent !== countText) strong.textContent = countText;
          if(unit) unit.textContent = heroCopy.itemUnit;
        }

        cleanupMetricLabelsV13(summary, heroCopy);
      }

      let rolls = summary.querySelector('.v11-rolls');
      if(!rolls){
        rolls = document.createElement('div');
        rolls.className = 'v11-rolls v12-rolls';
        rolls.setAttribute('aria-hidden','true');
        summary.appendChild(rolls);
      }else{
        rolls.classList.add('v12-rolls');
      }
    }

    function readRecentChangesV12(){
      const now = Date.now();
      if(recentChangesCacheV12.data && (now-recentChangesCacheV12.at) < 30000){
        return Promise.resolve(recentChangesCacheV12.data);
      }

      return new Promise(resolve=>{
        if(!('indexedDB' in window)){
          resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
          return;
        }

        let request;
        try{ request = indexedDB.open('permit_app_offline_v2'); }
        catch(_){
          resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
          return;
        }

        request.onerror = ()=>resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
        request.onsuccess = ()=>{
          const db = request.result;
          if(!db.objectStoreNames.contains('records')){
            db.close();
            resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
            return;
          }

          const tx = db.transaction('records','readonly');
          const get = tx.objectStore('records').getAll();
          get.onerror = ()=>{
            db.close();
            resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
          };
          get.onsuccess = ()=>{
            const since = Date.now() - 24*60*60*1000;
            const permitIds = new Set();
            const shipmentIds = new Set();
            for(const r of (get.result||[])){
              const ts = Date.parse(r.updated_at || '');
              if(!Number.isFinite(ts) || ts < since || r.deleted_at) continue;
              if(r.entity_type==='permit') permitIds.add(r.id);
              if(r.entity_type==='shipment') shipmentIds.add(r.id);
            }
            const data = {recentPermitIds:permitIds,recentShipmentIds:shipmentIds};
            recentChangesCacheV12 = {at:Date.now(),data};
            db.close();
            resolve(data);
          };
        };
      });
    }

    function updateV12KpiChanges(){
      if(!isDashboardActive() || typeof state === 'undefined') return;
      readRecentChangesV12().then(meta=>{
        if(!isDashboardActive()) return;
        const cards = Array.from(document.querySelectorAll('#app .stat-card')).slice(0,3);
        if(cards.length < 3) return;

        const deltas = computeKpiDeltasV12(state.permits,state.shipments,meta.recentShipmentIds);
        const values = [meta.recentPermitIds.size,deltas.deltaWarn,deltas.deltaCrit];
        const titles = [
          'So‘nggi 24 soatda yangilangan ruxsatnomalar',
          'So‘nggi 24 soatdagi yuklamalar ta’sirida kam qolganlar o‘zgarishi',
          'So‘nggi 24 soatdagi yuklamalar ta’sirida tugagan/ortiqcha sarf o‘zgarishi'
        ];

        cards.forEach((card,index)=>{
          let badge = card.querySelector('.v12-kpi-delta');
          if(!badge){
            badge = document.createElement('span');
            badge.className = 'v12-kpi-delta';
            card.appendChild(badge);
          }
          const value = values[index];
          const text = formatDeltaV12(value);
          if(badge.textContent !== text) badge.textContent = text;
          badge.title = titles[index];
          badge.dataset.tone = index===0 ? (value>0?'good':'neutral') : (value>0?'bad':value<0?'good':'neutral');
        });
      });
    }

    function showV9Notification(){
      document.querySelector('.v9-notice-popover')?.remove();
      const pill = document.getElementById('syncPill');
      const box = document.createElement('div');
      box.className = 'v9-notice-popover';
      box.innerHTML = `
        <div class="v9-notice-dot"></div>
        <div><strong>Tizim holati</strong><span>${pill?.textContent?.trim() || 'Tizim faol'}</span></div>`;
      document.body.appendChild(box);
      setTimeout(()=>box.classList.add('show'),0);
      setTimeout(()=>{ box.classList.remove('show'); setTimeout(()=>box.remove(),180); },2600);
    }

    function createV9Notification(){
      if(document.getElementById('notificationV9')) return;
      const theme = document.getElementById('themeToggleV5');
      if(!theme) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'notificationV9';
      btn.className = 'control-btn-v5 icon-only-v5 v9-notification-btn';
      btn.setAttribute('aria-label','Bildirishnomalar');
      btn.innerHTML = `${v9IconSvg('bell')}<span class="v9-notification-badge">3</span>`;
      theme.insertAdjacentElement('afterend',btn);
      btn.addEventListener('click',showV9Notification);
    }

    function decorateV10Hero(){
      const app = document.getElementById('app');
      if(!app || !isDashboardActive()) return;

      const toolbar = app.querySelector('.toolbar');
      if(toolbar){
        toolbar.classList.add('v10-dashboard-toolbar');
      }

      const summary = app.querySelector('.warehouse-summary');
      if(!summary) return;
      summary.classList.add('v10-textile-hero');

      let main = summary.querySelector('.warehouse-summary-main');
      if(!main){
        main = document.createElement('div');
        main.className = 'warehouse-summary-main';
        const first = summary.firstElementChild;
        if(first && !first.classList.contains('warehouse-values')){
          main.appendChild(first);
        }
        summary.insertBefore(main, summary.firstChild);
      }

      let icon = main.querySelector('.warehouse-icon');
      if(!icon){
        icon = document.createElement('div');
        icon.className = 'warehouse-icon';
        icon.setAttribute('aria-hidden','true');
        main.insertBefore(icon, main.firstChild);
      }
      icon.classList.add('v10-warehouse-icon');
      icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 10.2 12 4l9 6.2V20H3z"/>
          <path d="M7 20v-7.2h10V20"/>
          <path d="M9.5 13v7M14.5 13v7"/>
          <path d="M5.7 10.5h12.6"/>
        </svg>`;
    }

    function createBrandV15(){
      const brand = document.querySelector('.topbar .brand');
      if(!brand) return;
      if(brand.querySelector('.brand-v15')) return;

      const shell = document.createElement('div');
      shell.className = 'brand-v15 brand-v16';
      shell.innerHTML = `
        <span class="brand-symbol-v15 brand-symbol-v16" aria-hidden="true">
          <img src="./logo-symbol-v16.png" alt="">
        </span>
        <span class="brand-divider-v15 brand-divider-v16" aria-hidden="true"></span>
        <span class="brand-company-v15 brand-company-v16">
          <strong>MENGI TEKSTIL</strong>
          <small>GROUP</small>
        </span>`;
      brand.appendChild(shell);
    }

    function decorateLoginModalV15(){
      const backdrop = document.querySelector('.modal-backdrop');
      if(!backdrop) return;

      const modal = backdrop.querySelector('.modal');
      const email = modal?.querySelector('#authEmail');
      const password = modal?.querySelector('#authPassword');
      if(!modal || !email || !password) return;

      backdrop.classList.add('v15-auth-backdrop');
      modal.classList.add('v15-login-modal');

      const body = modal.querySelector('.modal-body');
      if(body && !body.querySelector('.v15-login-brand')){
        const brand = document.createElement('div');
        brand.className = 'v15-login-brand';
        brand.innerHTML = `
          <span class="v15-login-symbol" aria-hidden="true">
            <img src="./logo-symbol-v16.png" alt="">
          </span>
          <span class="v15-login-company">
            <strong>MENGI TEKSTIL</strong>
            <small>GROUP</small>
          </span>`;
        body.insertBefore(brand, body.firstChild);
      }

      const fields = body?.querySelectorAll('.field') || [];
      fields.forEach(field=>field.classList.add('v15-auth-field'));
    }

    function decorateV9Dashboard(){
      document.documentElement.classList.add('v9-shell-ready','v11-shell-ready','v12-shell-ready');
      document.body.classList.add('v9-shell-body','v11-shell-body','v12-shell-body');
      document.documentElement.dataset.textileAsset = 'textile-bg-v11.svg';
      createV12Sidebar();
      createV9Notification();

      const app = document.getElementById('app');
      if(!app) return;
      app.classList.toggle('v9-dashboard-active',isDashboardActive());
      if(isDashboardActive()){
        app.querySelector('.warehouse-summary')?.classList.add('v9-textile-summary');
        app.querySelector('.panel')?.classList.add('v9-main-table');
        decorateV13HeroMetrics();
        createControlRowV19();
        updateV12KpiChanges();
      }
      renderV12ReportsView();
      updateV12SidebarActive();
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
        <div class="quick-apps-wrap-v5">
          <button class="control-btn-v5 icon-only-v5" id="dashboardShortcutV5" type="button" aria-label="Sections" aria-haspopup="menu" aria-expanded="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"></rect><rect x="14" y="4" width="6" height="6" rx="1"></rect><rect x="4" y="14" width="6" height="6" rx="1"></rect><rect x="14" y="14" width="6" height="6" rx="1"></rect></svg>
          </button>
          <div class="quick-apps-menu-v5" id="quickAppsMenuV5" role="menu" hidden>
            ${quickSections().map(section=>`
              <button type="button" class="quick-app-option-v5" data-quick-tab-v5="${section.tab}" role="menuitem">
                <span class="quick-app-dot-v5"></span>
                <span class="quick-app-label-v5">${getText(section.textKey)}</span>
                <span class="quick-app-arrow-v5">›</span>
              </button>`).join('')}
          </div>
        </div>
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
      document.getElementById('dashboardShortcutV5').addEventListener('click', e=>{
        e.stopPropagation();
        const menu = document.getElementById('quickAppsMenuV5');
        const willOpen = menu.hidden;
        closeLanguageMenu();
        menu.hidden = !willOpen;
        e.currentTarget.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        updateQuickAppsMenu();
      });
      document.querySelectorAll('[data-quick-tab-v5]').forEach(btn=>btn.addEventListener('click', ()=>{
        if(navigateQuickTab(btn.dataset.quickTabV5)){
          closeQuickAppsMenu();
          scheduleEnhance();
        }
      }));
      document.getElementById('helpV5').addEventListener('click', openHelpModalV5);
      updateLanguageControl();
      updateQuickAppsMenu();
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
      const body = btn.closest('.panel-body');
      if(panel){
        panel.classList.add('export-panel-v5','export-panel-v7');
      }
      if(!body) return;

      body.classList.add('export-panel-body-v5','export-panel-body-v7');
      if(body.querySelector('.export-card-v7')) return;

      const text = body.querySelector('p');
      const card = document.createElement('div');
      card.className = 'export-card-v7';

      const icon = document.createElement('div');
      icon.className = 'export-icon-v7';
      icon.setAttribute('aria-hidden','true');
      icon.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"></path>
          <path d="M14 2v5h5"></path>
          <path d="M9 13h6M9 17h6"></path>
        </svg>`;

      const content = document.createElement('div');
      content.className = 'export-content-v7';

      const meta = document.createElement('div');
      meta.className = 'export-meta-v7';
      meta.innerHTML = `
        <span class="export-format-v7">XLSX</span>
        <span class="export-safe-v7">✓</span>`;

      if(text){
        content.appendChild(meta);
        content.appendChild(text);
      }else{
        content.appendChild(meta);
      }

      const action = document.createElement('div');
      action.className = 'export-action-v7';
      action.appendChild(btn);

      card.appendChild(icon);
      card.appendChild(content);
      card.appendChild(action);
      body.appendChild(card);
    }

    const MUTATION_SELECTOR_V21 = [
      '#btnNewPermit',
      '[data-edit-permit]',
      '[data-del-permit]',
      '#btnSavePermit',
      '#btnSaveShipment',
      '#btnConfirmUpload',
      '[data-del-shipment]'
    ].join(',');

    let authGateV21 = { loggedIn:false, checked:false };

    function decoratePermitTableV21(){
      const row = document.querySelector('#app [data-open-permit]');
      const table = row?.closest('table');
      if(!table) return;
      table.classList.add('v21-permits-table');
      table.closest('.panel')?.classList.add('v21-permits-panel');
    }

    function applyAuthGateToDomV21(){
      const allowed = authGateV21.loggedIn === true;
      document.documentElement.toggleAttribute('data-auth-locked-v21',!allowed);

      document.querySelectorAll(MUTATION_SELECTOR_V21).forEach(el=>{
        el.classList.toggle('auth-locked-v21',!allowed);
        el.setAttribute('aria-disabled',allowed?'false':'true');
        if(!allowed){
          el.dataset.authTitleV21 = el.getAttribute('title') || '';
          el.setAttribute('title', currentLang==='uz'
            ? 'O‘zgartirish uchun avval Kirish qiling'
            : currentLang==='ru'
              ? 'Войдите, чтобы изменять данные'
              : currentLang==='tr'
                ? 'Verileri değiştirmek için giriş yapın'
                : 'Sign in to change data');
        }else if(el.dataset.authTitleV21 !== undefined){
          if(el.dataset.authTitleV21) el.setAttribute('title',el.dataset.authTitleV21);
          else el.removeAttribute('title');
          delete el.dataset.authTitleV21;
        }
      });
    }

    async function refreshAuthGateV21(){
      let info = null;
      try{
        if(window.OfflineSync && typeof OfflineSync.authInfo === 'function'){
          info = await OfflineSync.authInfo();
        }
      }catch(_){ info = null; }

      authGateV21 = { loggedIn:canMutateV21(info), checked:true };
      applyAuthGateToDomV21();
      return authGateV21.loggedIn;
    }

    function showLoginRequiredV21(){
      const messages = {
        uz:'Ma’lumotlarni o‘zgartirish uchun avval Kirish qiling.',
        ru:'Чтобы изменять данные, сначала войдите в систему.',
        en:'Sign in before changing data.',
        tr:'Verileri değiştirmek için önce giriş yapın.'
      };
      try{ toast(messages[currentLang] || messages.uz); }catch(_){ }
      const authBtn = document.getElementById('authBtn');
      if(authBtn){
        authBtn.classList.add('auth-attention-v21');
        setTimeout(()=>authBtn.classList.remove('auth-attention-v21'),900);
        setTimeout(()=>authBtn.click(),30);
      }
    }

    function installMutationGuardV21(){
      if(document.documentElement.dataset.v21MutationGuard==='1') return;
      document.documentElement.dataset.v21MutationGuard='1';

      document.addEventListener('click',e=>{
        const target = e.target.closest?.(MUTATION_SELECTOR_V21);
        if(!target || authGateV21.loggedIn) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showLoginRequiredV21();
      },true);

      window.addEventListener('permit-sync-status',()=>{
        setTimeout(refreshAuthGateV21,0);
      });
    }

    function scheduleEnhance(){
      clearTimeout(enhanceTimer);
      enhanceTimer = setTimeout(()=>{
        createQuickControlBar();
        createBrandV15();
        decorateLoginModalV15();
        decorateV9Dashboard();
        translateDOM(document.body);
        syncActivityButtonV19();
        decoratePermitTableV21();
        applyAuthGateToDomV21();
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

    function safeHtmlV20(value){
      return String(value ?? '').replace(/[&<>"']/g,ch=>({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
      }[ch]));
    }

    function safeAttrV20(value){
      return safeHtmlV20(value);
    }

    function blankItemV20(){
      return { id: uid('it'), name:'', material:'', tnved:'', unit:'шт', qty:'', weight:'' };
    }

    function openPermitModalV20(permitId){
      const copy = materialTextV20(currentLang);
      const editing = !!permitId;
      const existing = editing ? state.permits.find(x=>x.id===permitId) : null;
      if(editing && !existing) return;

      const p = editing
        ? existing
        : { id:uid('perm'), number:'', date:'', note:'', items:[blankItemV20()] };

      const draft = JSON.parse(JSON.stringify(p));
      draft.items = (Array.isArray(draft.items) ? draft.items : []).map(normalizePermitItemV20);
      if(!draft.items.length) draft.items = [blankItemV20()];

      function itemsHtml(){
        return draft.items.map((it,i)=>`
          <div class="item-row-grid v20-material-grid" data-item-row="${safeAttrV20(it.id)}">
            <div class="idx">${i+1}</div>
            <input type="text" placeholder="${safeAttrV20(copy.itemName)}" value="${safeAttrV20(it.name)}" data-field="name">
            <input class="material-input-v20" type="text" placeholder="${safeAttrV20(copy.materialPlaceholder)}" value="${safeAttrV20(it.material)}" data-field="material">
            <input type="text" placeholder="${safeAttrV20(copy.hs)}" value="${safeAttrV20(it.tnved)}" data-field="tnved">
            <select data-field="unit">
              <option value="шт" ${it.unit==='шт'?'selected':''}>шт</option>
              <option value="пара" ${it.unit==='пара'?'selected':''}>пара</option>
              <option value="кг" ${it.unit==='кг'?'selected':''}>кг</option>
            </select>
            <input type="number" placeholder="${safeAttrV20(copy.qty)}" value="${safeAttrV20(it.qty)}" data-field="qty">
            <input type="number" placeholder="${safeAttrV20(copy.weight)}" value="${safeAttrV20(it.weight)}" data-field="weight">
            <button class="remove-x" data-remove-item="${safeAttrV20(it.id)}" title="Удалить строку">&times;</button>
          </div>
        `).join('');
      }

      function bodyHtml(){
        return `
          <div class="field-row">
            <div class="field"><label>Номер разрешения</label><input type="text" id="fldNumber" value="${safeAttrV20(draft.number)}" placeholder="напр. RC20260001681"></div>
            <div class="field"><label>Дата разрешения</label><input type="date" id="fldDate" value="${safeAttrV20(draft.date||'')}"></div>
          </div>
          <div class="field"><label>Примечание (клиент / бренд, необязательно)</label><input type="text" id="fldNote" value="${safeAttrV20(draft.note||'')}" placeholder="напр. ARYANCOM"></div>

          <div class="v20-material-note">
            <span class="v20-material-note-icon" aria-hidden="true">✦</span>
            <span>${safeHtmlV20(copy.material)} — ${safeHtmlV20(copy.materialPlaceholder)}</span>
          </div>

          <div style="margin-top:14px;">
            <div class="item-row-grid v20-material-grid v20-material-head">
              <div></div>
              <div>${safeHtmlV20(copy.itemName)}</div>
              <div>${safeHtmlV20(copy.material)}</div>
              <div>${safeHtmlV20(copy.hs)}</div>
              <div>${safeHtmlV20(copy.unit)}</div>
              <div>${safeHtmlV20(copy.qty)}</div>
              <div>${safeHtmlV20(copy.weight)}</div>
              <div></div>
            </div>
            <div id="itemsHost">${itemsHtml()}</div>
            <button class="btn secondary sm" id="btnAddItem" style="margin-top:8px;">+ Добавить позицию</button>
          </div>
        `;
      }

      showModal(`
        <div class="modal-head">
          <h2>${editing?'Изменить разрешение':'Новое разрешение'}</h2>
          <button class="close-x" data-close>&times;</button>
        </div>
        <div class="modal-body" id="permitModalBody">${bodyHtml()}</div>
        <div class="modal-foot">
          <button class="btn secondary" data-close>Отмена</button>
          <button class="btn" id="btnSavePermit">Сохранить</button>
        </div>
      `);

      document.querySelector('.modal-backdrop .modal')?.classList.add('v20-permit-modal');

      function rebindItemRows(){
        document.querySelectorAll('#itemsHost [data-item-row]').forEach(rowEl=>{
          const id = rowEl.dataset.itemRow;
          rowEl.querySelectorAll('[data-field]').forEach(inp=>{
            const update = ()=>{
              const it = draft.items.find(x=>String(x.id)===String(id));
              if(it) it[inp.dataset.field] = inp.value;
            };
            inp.addEventListener('input',update);
            if(inp.tagName==='SELECT') inp.addEventListener('change',update);
          });
        });

        document.querySelectorAll('[data-remove-item]').forEach(btn=>{
          btn.addEventListener('click',()=>{
            if(draft.items.length<=1){
              toast('Должна остаться хотя бы одна позиция');
              return;
            }
            draft.items = draft.items.filter(x=>String(x.id)!==String(btn.dataset.removeItem));
            document.getElementById('itemsHost').innerHTML = itemsHtml();
            rebindItemRows();
          });
        });
      }

      rebindItemRows();

      document.getElementById('btnAddItem')?.addEventListener('click',()=>{
        draft.items.push(blankItemV20());
        document.getElementById('itemsHost').innerHTML = itemsHtml();
        rebindItemRows();
      });

      document.getElementById('btnSavePermit')?.addEventListener('click',async()=>{
        draft.number = document.getElementById('fldNumber').value.trim();
        draft.date = document.getElementById('fldDate').value;
        draft.note = document.getElementById('fldNote').value.trim();

        if(!draft.number){
          toast('Укажите номер разрешения');
          return;
        }

        draft.items = draft.items
          .map(normalizePermitItemV20)
          .filter(it=>String(it.name||'').trim()!=='');

        if(!draft.items.length){
          toast('Добавьте хотя бы одну позицию с названием');
          return;
        }

        draft.items.forEach(it=>{
          it.name = String(it.name||'').trim();
          it.material = String(it.material||'').trim();
          it.tnved = String(it.tnved||'').trim();
          it.qty = Number(it.qty)||0;
          it.weight = Number(it.weight)||0;
        });

        const idx = state.permits.findIndex(x=>x.id===draft.id);
        if(idx>=0) state.permits[idx] = draft;
        else state.permits.push(draft);

        await savePermits();
        closeModal();
        render();
        toast(editing?'Разрешение обновлено':'Разрешение добавлено');
      });
    }

    function openPermitDetailV20(permitId){
      const copy = materialTextV20(currentLang);
      const p = state.permits.find(x=>x.id===permitId);
      if(!p) return;

      const shipments = state.shipments
        .filter(s=>s.permitId===permitId)
        .sort((a,b)=>(a.invoiceDate||'').localeCompare(b.invoiceDate||''));

      const t = permitTotals(p);

      const itemRows = (Array.isArray(p.items) ? p.items : []).map(raw=>{
        const it = normalizePermitItemV20(raw);
        const used = itemUsage(p.id,it.id);
        const st = itemStatus(it,used);
        const material = String(it.material||'').trim();

        return `<tr>
          <td>${safeHtmlV20(it.name)}</td>
          <td class="material-cell-v20">
            ${material
              ? `<span class="material-chip-v20">${safeHtmlV20(material)}</span>`
              : `<span class="material-empty-v20">—</span>`}
          </td>
          <td class="code-col">${safeHtmlV20(it.tnved||'—')}</td>
          <td class="num-col">${fmt(it.qty,0)} ${safeHtmlV20(it.unit)}</td>
          <td class="num-col">${fmt(it.weight,2)} кг</td>
          <td class="num-col">${fmt(used.qty,0)}</td>
          <td class="num-col">${fmt(st.remQty,0)}</td>
          <td class="num-col">${fmt(st.remWeight,2)}</td>
        </tr>`;
      }).join('');

      const shipRows = shipments.map(s=>{
        const lineQty = (Array.isArray(s.lines)?s.lines:[]).reduce((a,l)=>a+(Number(l.qty)||0),0);
        const lineW = (Array.isArray(s.lines)?s.lines:[]).reduce((a,l)=>a+(Number(l.weight)||0),0);
        return `<tr>
          <td>${safeHtmlV20(s.invoiceNumber||'—')}</td>
          <td>${safeHtmlV20(s.invoiceDate||'—')}</td>
          <td class="num-col">${Array.isArray(s.lines)?s.lines.length:0}</td>
          <td class="num-col">${fmt(lineQty,0)}</td>
          <td class="num-col">${fmt(lineW,2)}</td>
          <td style="text-align:right;"><button class="btn danger sm" data-del-shipment="${safeAttrV20(s.id)}">Удалить</button></td>
        </tr>`;
      }).join('');

      showModal(`
        <div class="modal-head">
          <div>
            <h2>${safeHtmlV20(p.number)}</h2>
            <div class="v20-permit-title-sub">${safeHtmlV20(copy.positions)} · ${(Array.isArray(p.items)?p.items.length:0)}</div>
          </div>
          <button class="close-x" data-close>&times;</button>
        </div>
        <div class="modal-body">
          <div class="subtle-note" style="margin-bottom:14px;">
            от ${safeHtmlV20(p.date||'—')}
            ${p.note?(' · '+safeHtmlV20(p.note)):''}
            &middot; разрешено ${fmt(t.allowedQty,0)} шт / ${fmt(t.allowedW,2)} кг
            &middot; остаток ${fmt(t.remQty,0)} шт / ${fmt(t.remW,2)} кг
          </div>

          <h3 class="v20-section-title">${safeHtmlV20(copy.positions)}</h3>
          <div class="v20-detail-table-wrap">
            <table class="v20-detail-table">
              <thead>
                <tr>
                  <th>${safeHtmlV20(copy.itemName)}</th>
                  <th>${safeHtmlV20(copy.material)}</th>
                  <th>${safeHtmlV20(copy.hs)}</th>
                  <th>Разрешено</th>
                  <th>Вес разр.</th>
                  <th>Отгружено</th>
                  <th>Остаток кол-во</th>
                  <th>Остаток вес</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
            </table>
          </div>

          <h3 style="font-family:var(--serif);font-size:14px;margin:20px 0 8px 0;">Отгрузки по этому разрешению</h3>
          ${shipments.length
            ? `<table><thead><tr><th>Инвойс</th><th>Дата</th><th>Строк</th><th>Кол-во</th><th>Вес</th><th></th></tr></thead><tbody>${shipRows}</tbody></table>`
            : `<div class="subtle-note">Отгрузок ещё не было.</div>`}
        </div>
        <div class="modal-foot">
          <button class="btn secondary" data-close>Закрыть</button>
        </div>
      `);

      document.querySelector('.modal-backdrop .modal')?.classList.add('v20-permit-modal','v20-permit-detail-modal');

      document.querySelectorAll('[data-del-shipment]').forEach(el=>el.addEventListener('click',async()=>{
        if(!confirm('Удалить эту отгрузку? Остаток по разрешению будет пересчитан.')) return;
        state.shipments = state.shipments.filter(s=>s.id!==el.dataset.delShipment);
        await saveShipments();
        closeModal();
        render();
        toast('Отгрузка удалена');
      }));
    }

    function installPermitMaterialV20(){
      window.blankItemV20 = blankItemV20;
      window.openPermitModalV20 = openPermitModalV20;
      window.openPermitDetailV20 = openPermitDetailV20;

      // Replace only the permit add/edit/detail UI functions.
      // Existing state, OfflineSync, savePermits and shipment data remain untouched.
      window.openPermitModal = openPermitModalV20;
      window.openPermitDetail = openPermitDetailV20;
    }

    function initBrowser(){
      installPermitMaterialV20();
      installMutationGuardV21();
      refreshAuthGateV21();
      document.documentElement.dataset.lang = currentLang;
      document.documentElement.dataset.theme = currentTheme;
      applyTheme();
      createQuickControlBar();
      createBrandV15();
      decorateLoginModalV15();
      decorateV9Dashboard();
      translateDOM(document.body);
      decoratePermitTableV21();
      applyAuthGateToDomV21();
      applyDashboardPagination();
      styleExportPanel();

      document.addEventListener('click', e=>{
        if(!e.target.closest('.language-wrap-v5')) closeLanguageMenu();
        if(!e.target.closest('.quick-apps-wrap-v5')) closeQuickAppsMenu();
        const exportBtn = e.target.closest('#btnExportAll');
        if(exportBtn){
          e.preventDefault();
          e.stopImmediatePropagation();
          hardenedExportWorkbook();
        }
      }, true);
      document.addEventListener('keydown', e=>{
        if(e.key==='Escape'){
          closeLanguageMenu();
          closeQuickAppsMenu();
          closeHelpModalV5();
        }
      });
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

  return { paginate, translateText, translateDynamicText, safeSheetName, nextTheme, quickSections, sidebarSectionsV9, resolveSidebarSelectionV10, sidebarSectionsV11, sidebarDestinationV11, resolveSidebarSelectionV11, sidebarSectionsV12, sidebarDestinationV12, resolveSidebarSelectionV12, computeKpiDeltasV12, formatDeltaV12, heroTextV14, activityTextV17, activityItemsV17, materialTextV20, normalizePermitItemV20, canMutateV21, UI_TEXT, LANGUAGES, PAGE_SIZE };
});
