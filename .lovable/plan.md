

## Plan: Update Legal Pages & Contact Information

### 1. Privacy Policy (`src/pages/Privacy.tsx`)
- Replace all `[ФИО / наименование ...]` placeholders with "Мельникова Анастасия Викторовна"
- Replace `[ИНН]` with "591111416790"
- Replace `[адрес]` with "Пермский край, п. Николаев Посад, ул. Солнечная, д. 7"
- Replace `[email]` with "info.melanomusic@gmail.com"
- Replace `[срок]` with "3 года"
- Replace `[дата]` with current date

### 2. Public Offer (`src/pages/Offer.tsx`)
- Replace `[ФИО / наименование]` with "Мельникова Анастасия Викторовна"
- Replace `[ИНН]` with "591111416790"
- Replace `[адрес]` with "Пермский край, п. Николаев Посад, ул. Солнечная, д. 7"
- Replace `[email]` with "info.melanomusic@gmail.com"
- Replace `[ОГРНИП]` placeholder with a dash or "—" (not provided)
- Replace `[__]%` with "50%"

### 3. Contact Page (`src/pages/Contact.tsx`)
- Email card: change to "info.melanomusic@gmail.com" with `mailto:` link
- Telegram card: change to "@melano_sounds" with link to `https://t.me/melano_sounds`
- Music platforms card: replace placeholder text with three active links:
  - Apple Music → provided URL
  - VK Музыка → provided URL
  - Яндекс Музыка → provided URL
- Add `Music` icon from lucide-react for the platforms section

### 4. Admin Content defaults (`src/pages/admin/AdminContent.tsx`)
- Update `defaultContent.contactEmail` to "info.melanomusic@gmail.com"
- Update `defaultContent.contactTelegram` to "@melano_sounds"

### Files to modify
- `src/pages/Privacy.tsx`
- `src/pages/Offer.tsx`
- `src/pages/Contact.tsx`
- `src/pages/admin/AdminContent.tsx`

