# E-Ombor — Mengi Tekstil

Mavjud ombor, ruxsatnoma, yuklama va Excel eksport ilovasining yangilangan dizayni.
Oddiy HTML, CSS va JavaScript. Ishlatish uchun build yoki npm kerak emas.

## Nima yangilandi?

- To‘q rangli yon menyu, och rangli ish maydoni, bir xil kartochka va jadval uslubi.
- Telefonlarda beshta asosiy bo‘lim uchun pastki navigatsiya.
- Kunduzgi va tungi mavzu, o‘qiladigan shriftlar, klaviatura fokus belgisi.
- Birinchi tashrifda o‘zbek tili; oldingi til va mavzu tanlovi saqlanadi.
- Ishlaydigan mavzu tugmasi va Ctrl/Cmd + K orqali qidiruvga o‘tish.
- Hisobotlar til almashtirilganda va ilova qayta render qilinganda yangilanadi.
- Materiallar hisobida avvalgi 5 ta material cheklovi olib tashlandi.
- DOM yangilanishining o‘zini qayta chaqirish sikli bartaraf etildi.
- Offline keshga amaldagi dizayn va JavaScript fayllari qo‘shildi.
- Ishlatilmaydigan 43 ta eski versiya va takroriy fayl olib tashlandi.

## Ma’lumotlarni saqlash

`config.js`, `offline-sync.js`, `sync-core.js`, IndexedDB nomi, localStorage
kalitlari va koddagi boshlang‘ich ruxsatnoma ma’lumotlari o‘zgartirilmagan.
Haqiqiy bazaga hech qanday yozuv yuborilmagan. Parol kodga kiritilmagan.

**Yangilanishni aynan mavjud sayt manziliga joylang.** Brauzerdagi mahalliy
ma’lumotlar sayt domeniga bog‘langan. Boshqa domen yoki mahalliy serverda ochish
eski brauzer ma’lumotlarini avtomatik ko‘chirmaydi. Brauzer ma’lumotlarini,
IndexedDB yoki localStorage’ni tozalamang; `config.js` faylini almashtirmang.
Mavjud ilovaning boshlang‘ich ma’lumotlarni qo‘shish va bir xil raqamlarni
birlashtirish tartibi ham saqlangan.

## GitHub orqali yuklash

1. ZIP ichidagi `e-ombor` papkasini oching.
2. Mavjud repozitoriyda **Add file → Upload files** ni tanlang.
3. Papkaning o‘zini emas, ichidagi fayllarni repozitoriy ildiziga yuklang.
4. O‘zgarishlarni commit qiling. Avvalgi hosting/deploy tartibini ishlating.

Asosiy yangilangan fayllar: `index.html`, `ui-v23.js`, `sw.js` va yangi `design.css`.
`client-final-fixed.css` va `ui-v23.css` mavjud formalar bilan moslik uchun kerak.
`design.css` ularning ustidan yagona yangi ko‘rinishni beradi.
GitHub Upload files eski fayllarni o‘chirmaydi; ular endi sahifada ishlatilmaydi.
To‘liq tozalash uchun quyidagi patch usulidan foydalaning.

## Git bilan to‘liq yangilash

ZIP ichidagi `e-ombor-redesign.patch` faylini repozitoriy tashqarisiga qo‘ying.
Mavjud repozitoriyda:

```bash
git switch -c redesign/e-ombor
git apply --check ../e-ombor-redesign.patch
git apply ../e-ombor-redesign.patch
git add -A
git commit -m "Refresh E-Ombor design and fix UI navigation"
git push -u origin redesign/e-ombor
```

Keyin GitHub’da yangi branch uchun Pull Request oching. Patch
`5eb9b509566e2644111ff8eb81a81f2e1feaa820` commit asosida tayyorlangan.
`git apply --check` xato bersa, joriy kod o‘zgargan: majburan qo‘llamang,
farqlarni tekshiring.

## Mahalliy ishga tushirish

```bash
python -m http.server 8080
```

Brauzerda `http://localhost:8080` ni oching. Dastlab internet kerak:
Excel kutubxonalari CDN orqali olinadi, keyin service worker ularni keshlaydi.

## Tekshiruvlar

Node.js 20+ bilan:

```bash
npm ci
npm test
```

Sinovlar haqiqiy bazaga ulanmaydi. Ajratilgan xotiradagi ma’lumotlar yordamida
navigatsiya, hisobot tili, qidiruv, mavzu, ruxsat tekshiruvi, tahrirni bekor
qilish, yuklama vazni, saqlash chaqirig‘i, hisob-kitob va DOM barqarorligi sinaladi.

**Tekshiruv chegarasi:** bu muhitda mahalliy sahifani brauzerda ochish bloklangan.
Haqiqiy hisob bilan kirish, Supabase tarmoq sinxronlashuvi, brauzerda Excel
faylini yuklash va turli ekranlardagi vizual ko‘rinish oxirigacha tekshirilmagan.
Deploy oldidan shu amallarni mavjud saytning sinov nusxasida tekshiring.

## Fayllar

- `index.html` — sahifa va mavjud biznes funksiyalari.
- `ui-v23.js` — interfeys, tarjimalar, hisobot, eksport va forma boshqaruvi.
- `design.css` — yangi dizayn va telefon uchun moslashuv.
- `client-final-fixed.css`, `ui-v23.css` — mavjud murakkab formalar uchun uslublar.
- `config.js`, `offline-sync.js`, `sync-core.js` — mavjud baza va offline qatlam.
- `sw.js`, `manifest.webmanifest` — offline ilova qobig‘i.
- `tests/` — ajratilgan avtomatik sinovlar.
