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

/* ---------- Projects filter: two-thumb ranges (UI only) ---------- */
document.querySelector('#projects-filter')?.addEventListener('submit', (e) => e.preventDefault())

document.querySelectorAll('[data-range]').forEach((range) => {
  const [lo, hi] = range.querySelectorAll('input[type="range"]')
  const labels = range.nextElementSibling
  const unit = range.dataset.unit
  const format = (v) => `${Number(v).toLocaleString('en-US')} ${unit}`
  const percent = (v) => ((v - lo.min) / (lo.max - lo.min)) * 100

  const update = (e) => {
    // Keep the thumbs from crossing each other
    if (+lo.value > +hi.value) {
      if (e?.target === lo) lo.value = hi.value
      else hi.value = lo.value
    }
    range.style.setProperty('--from', `${percent(lo.value)}%`)
    range.style.setProperty('--to', `${percent(hi.value)}%`)
    labels.querySelector('[data-range-min]').textContent = format(lo.value)
    labels.querySelector('[data-range-max]').textContent = format(hi.value)
  }

  lo.addEventListener('input', update)
  hi.addEventListener('input', update)
  update()
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
