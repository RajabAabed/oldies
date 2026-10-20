/* ============================================================
   Map data — edit this object to change what shows on the map.
   Keys are the region ids in the SVG (<path id="...">).
   - name:      label shown in the white tooltip on the map
   - short:     name used in the dropdown and the "كل أحياء ..." chip
   - districts: chips shown under the filters
   - label:     optional {x, y} for the tooltip (SVG coords, 1000 x 825)
   - prices:    gold badges; x/y optional (auto-placed when missing)
   ============================================================ */
const mapData = {
  SAU1097: {
    name: 'منطقة الرياض',
    short: 'الرياض',
    districts: ['النرجس', 'الملقا', 'العارض', 'الياسمين', 'القيروان', 'الصحافة', 'حطين', 'الرمال', 'قرطبة'],
    label: { x: 494, y: 557 },
    prices: [
      { value: 20450, x: 453, y: 410 },
      { value: 10000, x: 390, y: 456 },
      { value: 40000, x: 557, y: 490 },
      { value: 9200, x: 557, y: 586 },
    ],
  },
  SAU1098: {
    name: 'المنطقة الشرقية',
    short: 'الشرقية',
    districts: ['الدمام', 'الخبر', 'الظهران', 'القطيف', 'الجبيل', 'الأحساء'],
    label: { x: 738, y: 539 },
    prices: [
      { value: 9200, x: 548, y: 223 },
      { value: 40000, x: 862, y: 580 },
      { value: 10000, x: 703, y: 650 },
    ],
  },
  SAU888: { name: 'منطقة مكة المكرمة', short: 'مكة المكرمة', districts: ['جدة', 'مكة المكرمة', 'الطائف', 'رابغ'], prices: [{ value: 15300 }, { value: 8700 }, { value: 22100 }] },
  SAU845: { name: 'منطقة المدينة المنورة', short: 'المدينة المنورة', districts: ['المدينة المنورة', 'ينبع', 'العلا'], prices: [{ value: 11200 }, { value: 7400 }] },
  SAU846: { name: 'منطقة القصيم', short: 'القصيم', districts: ['بريدة', 'عنيزة', 'الرس'], prices: [{ value: 6800 }, { value: 9100 }] },
  SAU847: { name: 'منطقة حائل', short: 'حائل', districts: ['حائل', 'بقعاء'], prices: [{ value: 5600 }] },
  SAU848: { name: 'منطقة تبوك', short: 'تبوك', districts: ['تبوك', 'أملج', 'الوجه'], prices: [{ value: 7900 }, { value: 12500 }] },
  SAU861: { name: 'منطقة الحدود الشمالية', short: 'الحدود الشمالية', districts: ['عرعر', 'رفحاء'], prices: [{ value: 4800 }] },
  SAU862: { name: 'منطقة الجوف', short: 'الجوف', districts: ['سكاكا', 'دومة الجندل'], prices: [{ value: 5200 }] },
  SAU885: { name: 'منطقة الباحة', short: 'الباحة', districts: ['الباحة', 'بلجرشي'], prices: [{ value: 4600 }] },
  SAU886: { name: 'منطقة عسير', short: 'عسير', districts: ['أبها', 'خميس مشيط'], prices: [{ value: 8300 }, { value: 6900 }] },
  SAU887: { name: 'منطقة جازان', short: 'جازان', districts: ['جازان', 'صبيا'], prices: [{ value: 5100 }] },
  SAU1096: { name: 'منطقة نجران', short: 'نجران', districts: ['نجران', 'شرورة'], prices: [{ value: 4900 }] },
}
const defaultRegion = 'SAU1097'

/* ---------- Back to top ---------- */
const toTop = document.querySelector('#to-top')
const onScroll = () => {
  const y = window.scrollY
  toTop.classList.toggle('opacity-0', y < 600)
  toTop.classList.toggle('translate-y-20', y < 600)
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

/* ---------- Mobile menu ---------- */
const menu = document.querySelector('#mobile-menu')
const overlay = document.querySelector('#menu-overlay')
const setMenu = (open) => {
  menu.classList.toggle('is-open', open)
  overlay.classList.toggle('opacity-0', !open)
  overlay.classList.toggle('pointer-events-none', !open)
  document.body.classList.toggle('overflow-hidden', open)
}
document.querySelector('#menu-open').addEventListener('click', () => setMenu(true))
document.querySelector('#menu-close').addEventListener('click', () => setMenu(false))
overlay.addEventListener('click', () => setMenu(false))
menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => setMenu(false)))

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      revealObserver.unobserve(entry.target)
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
)
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el))

/* ---------- Count up ---------- */
const formatter = new Intl.NumberFormat('en-US', { useGrouping: false })
const countUp = (el) => {
  const target = Number(el.dataset.count)
  const duration = 1800
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = formatter.format(Math.round(target * eased))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      countUp(entry.target)
      countObserver.unobserve(entry.target)
    })
  },
  { threshold: 0.6 },
)
document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el))

/* ---------- Parallax ---------- */
const parallaxEls = document.querySelectorAll('[data-parallax]')
const parallax = () => {
  parallaxEls.forEach((el) => {
    const rect = el.parentElement.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight) return
    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.15
    el.style.transform = `translateY(${offset}px) scale(1.2)`
  })
}
window.addEventListener('scroll', () => requestAnimationFrame(parallax), { passive: true })
parallax()

/* ---------- Sliders (RTL aware) ---------- */
document.querySelectorAll('[data-slider]').forEach((track) => {
  const name = track.dataset.slider
  const step = () => (track.firstElementChild?.offsetWidth ?? 300) + 20
  // In RTL, "next" moves toward the left (negative scrollLeft)
  const nextBtn = document.querySelector(`[data-slider-next="${name}"]`)
  const prevBtn = document.querySelector(`[data-slider-prev="${name}"]`)
  nextBtn?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }))
  prevBtn?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }))

  // Disable arrows at the ends
  const updateArrows = () => {
    const pos = Math.abs(track.scrollLeft)
    const max = track.scrollWidth - track.clientWidth
    if (prevBtn) prevBtn.disabled = pos <= 2
    if (nextBtn) nextBtn.disabled = pos >= max - 2
  }
  track.addEventListener('scroll', updateArrows, { passive: true })
  window.addEventListener('resize', updateArrows)
  updateArrows()

  // Drag to scroll on desktop
  let down = false
  let startX = 0
  let startScroll = 0
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return
    down = true
    startX = e.clientX
    startScroll = track.scrollLeft
    track.style.scrollSnapType = 'none'
    track.style.scrollBehavior = 'auto'
  })
  window.addEventListener('pointermove', (e) => {
    if (!down) return
    track.scrollLeft = startScroll - (e.clientX - startX)
  })
  window.addEventListener('pointerup', () => {
    if (!down) return
    down = false
    track.style.scrollSnapType = ''
    track.style.scrollBehavior = ''
  })
})

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach((item) => {
  item.querySelector('.faq-btn').addEventListener('click', () => {
    const open = !item.classList.contains('is-open')
    document.querySelectorAll('.faq-item.is-open').forEach((o) => {
      o.classList.remove('is-open')
      o.querySelector('.faq-btn').setAttribute('aria-expanded', 'false')
    })
    item.classList.toggle('is-open', open)
    item.querySelector('.faq-btn').setAttribute('aria-expanded', String(open))
  })
})

/* ---------- Chips (toggle active within group) ---------- */
document.querySelectorAll('[data-quick]').forEach((chip) => {
  chip.addEventListener('click', () => {
    const input = document.querySelector('#search-form input')
    input.value = chip.textContent.trim()
    input.focus()
  })
})
document.querySelector('#search-form')?.addEventListener('submit', (e) => {
  e.preventDefault()
  document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })
})

/* ---------- Saudi regions map ---------- */
// Home page only
if (document.querySelector('#sa-map')) {
  const VIEW_W = 1000
  const VIEW_H = 825
  const mapSvg = document.querySelector('#sa-map')
  const mapOverlay = document.querySelector('#map-overlay')
  const regionSelect = document.querySelector('#map-region')
  const districtsEl = document.querySelector('#map-districts')
  const riyal = '<svg class="h-[0.85em] w-auto" viewBox="0 0 20 22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M7 2v14.5l-4 1" /><path d="M12.5 4v15" /><path d="M2 10.5l16-3.5" /><path d="M2 14.5l16-3.5" /><path d="M14 20l4-1" /></svg>'
  const priceFormat = new Intl.NumberFormat('en-US')
  const pct = (x, y) => `left:${(x / VIEW_W) * 100}%;top:${(y / VIEW_H) * 100}%`

  // Fallback badge positions (fractions of the region bounding box, from its centre)
  const autoSpots = [
    [-0.32, -0.22],
    [0.06, -0.06],
    [-0.3, 0.18],
    [0.08, 0.3],
  ]

  regionSelect.innerHTML = Object.entries(mapData)
    .map(([id, r]) => `<option value="${id}">${r.short}</option>`)
    .join('')

  const renderDistricts = (r) => {
    const chip = (text) =>
      `<button type="button" data-chip class="h-9 shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-line bg-white px-4 text-xs text-dark transition hover:border-gold sm:text-[13px]">${text}</button>`
    districtsEl.innerHTML = [...r.districts, `كل أحياء ${r.short}`].map(chip).join('')
  }
  districtsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-chip]')
    if (!chip) return
    const on = !chip.classList.contains('is-on')
    districtsEl.querySelectorAll('[data-chip]').forEach((c) => {
      c.classList.remove('is-on', 'border-gold', 'bg-gold', 'text-white')
      c.classList.add('bg-white', 'text-dark')
    })
    if (on) {
      chip.classList.add('is-on', 'border-gold', 'bg-gold', 'text-white')
      chip.classList.remove('bg-white', 'text-dark')
    }
  })

  const renderOverlay = (id) => {
    const r = mapData[id]
    const box = document.getElementById(id).getBBox()
    const cx = box.x + box.width / 2
    const cy = box.y + box.height / 2
    const label = r.label ?? { x: cx, y: cy }

    const badges = (r.prices ?? [])
      .map((p, i) => {
        const [fx, fy] = autoSpots[i % autoSpots.length]
        const x = p.x ?? cx + fx * box.width
        const y = p.y ?? cy + fy * box.height
        return `<span class="map-pop absolute inline-flex -translate-y-full items-center gap-1 whitespace-nowrap rounded-full rounded-bl-none bg-gold px-2 py-1 text-[10px] font-medium text-white shadow-sm sm:px-3.5 sm:py-1.5 sm:text-[15px]" dir="ltr" style="${pct(x, y)};animation-delay:${150 + i * 90}ms">${riyal}${priceFormat.format(p.value)}</span>`
      })
      .join('')

    mapOverlay.innerHTML = `${badges}
      <span class="map-pop absolute -translate-x-1/2 -translate-y-full" style="${pct(label.x, label.y)}">
        <span class="relative mb-2 block whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-dark shadow-[0_4px_16px_rgba(0,0,0,0.1)] sm:px-5 sm:py-2.5 sm:text-[15px]">${r.name}
          <span class="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rotate-45 bg-white"></span>
        </span>
      </span>`
  }

  const selectRegion = (id) => {
    if (!mapData[id]) return
    mapSvg.querySelectorAll('.region').forEach((p) => p.classList.toggle('is-active', p.id === id))
    // Bring the active region to the front so its thick border is not covered by neighbours
    mapSvg.appendChild(document.getElementById(id))
    regionSelect.value = id
    renderDistricts(mapData[id])
    renderOverlay(id)
  }

  mapSvg.addEventListener('click', (e) => {
    const path = e.target.closest('.region')
    if (path) selectRegion(path.id)
  })
  regionSelect.addEventListener('change', () => selectRegion(regionSelect.value))
  selectRegion(defaultRegion)
}

/* ---------- City Google map ---------- */
// City pages (riyadh, jeddah): district chips move the embedded Google map.
// The city and its districts come from data-city / data-districts on the iframe.
if (document.querySelector('#city-map')) {
  const cityMap = document.querySelector('#city-map')
  const regionSelect = document.querySelector('#map-region')
  const districtsEl = document.querySelector('#map-districts')
  const city = cityMap.dataset.city
  const districts = cityMap.dataset.districts.split('،')
  const mapSrc = (q, zoom) =>
    `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&hl=ar&output=embed`

  regionSelect.innerHTML = `<option>${city}</option>`

  const chip = (text, district = '') =>
    `<button type="button" data-chip data-district="${district}" class="h-9 shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-line bg-white px-4 text-xs text-dark transition hover:border-gold sm:text-[13px]">${text}</button>`
  districtsEl.innerHTML = [...districts.map((d) => chip(d, d)), chip(`كل أحياء ${city}`)].join('')

  districtsEl.addEventListener('click', (e) => {
    const target = e.target.closest('[data-chip]')
    if (!target) return
    districtsEl.querySelectorAll('[data-chip]').forEach((c) => {
      const on = c === target
      c.classList.toggle('is-on', on)
      c.classList.toggle('border-gold', on)
      c.classList.toggle('bg-gold', on)
      c.classList.toggle('text-white', on)
      c.classList.toggle('bg-white', !on)
      c.classList.toggle('text-dark', !on)
    })
    const district = target.dataset.district
    cityMap.src = district
      ? mapSrc(`حي ${district}، ${city}، السعودية`, 14)
      : mapSrc(`${city}، السعودية`, 11)
  })
}

/* ---------- Image lightbox (property gallery) ---------- */
const galleryLinks = [...document.querySelectorAll('[data-lightbox]')]
if (galleryLinks.length) {
  const box = document.createElement('div')
  box.className = 'lightbox'
  box.setAttribute('role', 'dialog')
  box.setAttribute('aria-modal', 'true')
  box.innerHTML = `
    <img alt="" />
    <button type="button" data-lb="close" class="lightbox-btn top-5 right-5" aria-label="إغلاق"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button>
    <button type="button" data-lb="prev" class="lightbox-btn right-5 top-1/2 -translate-y-1/2" aria-label="السابق"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></button>
    <button type="button" data-lb="next" class="lightbox-btn left-5 top-1/2 -translate-y-1/2" aria-label="التالي"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg></button>`
  document.body.appendChild(box)
  const boxImg = box.querySelector('img')
  let current = 0

  const show = (i) => {
    current = (i + galleryLinks.length) % galleryLinks.length
    const img = galleryLinks[current].querySelector('img')
    boxImg.src = img.currentSrc || img.src
    boxImg.alt = img.alt
  }
  const setOpen = (open) => {
    box.classList.toggle('is-open', open)
    document.body.classList.toggle('overflow-hidden', open)
  }
  galleryLinks.forEach((link, i) =>
    link.addEventListener('click', (e) => {
      e.preventDefault()
      show(i)
      setOpen(true)
    }),
  )
  box.addEventListener('click', (e) => {
    const action = e.target.closest('[data-lb]')?.dataset.lb
    if (action === 'prev') show(current - 1)
    else if (action === 'next') show(current + 1)
    else if (action === 'close' || e.target === box) setOpen(false)
  })
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return
    if (e.key === 'Escape') setOpen(false)
    // RTL: the right arrow goes back, the left arrow goes forward
    if (e.key === 'ArrowRight') show(current - 1)
    if (e.key === 'ArrowLeft') show(current + 1)
  })
}

/* ---------- Service request form (UI only) ---------- */
document.querySelector('#request-form')?.addEventListener('submit', (e) => {
  e.preventDefault()
  e.target.reset()
  e.target.querySelector('[data-form-success]').classList.remove('hidden')
})

/* ---------- AI assistant chat (UI only) ---------- */
if (document.querySelector("#chat")) {
  const chatPanel = document.querySelector("#chat-panel")
  const chatToggle = document.querySelector("#chat-toggle")
  const chatLog = document.querySelector("#chat-log")
  const chatInput = document.querySelector("#chat-form input")
  const sparkle = chatToggle.innerHTML.replace("size-7", "size-3.5")

  const setChat = (open) => {
    chatPanel.classList.toggle("opacity-0", !open)
    chatPanel.classList.toggle("scale-95", !open)
    chatPanel.classList.toggle("translate-y-4", !open)
    chatPanel.classList.toggle("pointer-events-none", !open)
    chatPanel.setAttribute("aria-hidden", String(!open))
    chatToggle.setAttribute("aria-expanded", String(open))
    if (open) setTimeout(() => chatInput.focus(), 300)
  }
  chatToggle.addEventListener("click", () => setChat(chatPanel.classList.contains("opacity-0")))
  document.querySelector("#chat-close").addEventListener("click", () => setChat(false))
  document.addEventListener("keydown", (e) => e.key === "Escape" && setChat(false))

  const escapeHtml = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[c])
  const botMessage = (text) =>
    `<div class="flex items-start gap-2"><span class="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-white">${sparkle}</span><p class="text-justify text-[13px] leading-6 text-dark">${text}</p></div>`

  document.querySelector("#chat-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const text = chatInput.value.trim()
    if (!text) return
    chatLog.insertAdjacentHTML("beforeend", `<p class="max-w-[85%] self-end rounded-2xl rounded-bl-sm bg-[#f4f4f4] px-3 py-2 text-[13px] leading-6 text-dark">${escapeHtml(text)}</p>`)
    chatInput.value = ""
    chatLog.scrollTop = chatLog.scrollHeight
    setTimeout(() => {
      chatLog.insertAdjacentHTML("beforeend", botMessage("شكراً لتواصلك! سيتواصل معك أحد مستشارينا قريباً لمساعدتك في طلبك."))
      chatLog.scrollTop = chatLog.scrollHeight
    }, 700)
  })
}
