/* ---------- Projects map (Google Maps JS API) ---------- */
// Shared by the home page (whole kingdom, several regions) and the city pages
// (one city). Each page has its own data file in src/maps/ that calls initProjectsMap().
//
// Markup expected on the page:
//   #projects-map   the map container
//   #map-region     region / city select
//   #map-deal       deal filter   (option values must match project.deal)
//   #map-property   type filter   (option values must match project.type)
//   #map-districts  chips container (districts or cities of the selected region)
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID, SHOW_TRAFFIC } from './config.js'
import pinIcon from '../assets/images/map-pin.svg'

const DISTRICT_ZOOM = 14

let googleMapsReady
function loadGoogleMaps() {
  if (!GOOGLE_MAPS_API_KEY) console.warn('Google Maps: add your API key in src/maps/config.js')
  googleMapsReady ??= new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      key: GOOGLE_MAPS_API_KEY,
      v: 'weekly',
      libraries: 'marker',
      language: 'ar',
      region: 'SA',
      loading: 'async',
      callback: '__googleMapsReady',
    })
    window.__googleMapsReady = resolve
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`
    script.async = true
    script.onerror = reject
    document.head.append(script)
  })
  return googleMapsReady
}

// Load the map only when it scrolls near the viewport (each load is billed by Google)
function whenVisible(el) {
  return new Promise((resolve) => {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          resolve()
        }
      },
      { rootMargin: '300px' }
    )
    io.observe(el)
  })
}

function pinElement(project) {
  const pin = document.createElement('a')
  pin.href = project.url
  pin.className = 'map-pin'
  pin.innerHTML = `<img src="${pinIcon}" alt="" width="36" height="44" /><span class="map-pin-label"></span>`
  pin.querySelector('.map-pin-label').textContent = project.name
  return pin
}

/**
 * @param {object} options
 * @param {{lat:number,lng:number}} options.center   initial view
 * @param {number} options.zoom
 * @param {string} [options.allLabel]                 adds a first "whole map" option to #map-region (home page)
 * @param {string} [options.regionChipLabel]          text of the "whole region" chip (default: كل أحياء <region>)
 * @param {object[]} options.regions                  entries of #map-region:
 *   { name, center, zoom, districts: [{ name, lat, lng, zoom? }] }
 * @param {object[]|string} options.projects          array, or an API URL that returns the same JSON:
 *   { name, lat, lng, url, deal, type }
 */
export async function initProjectsMap({ center, zoom, allLabel, regionChipLabel, regions, projects }) {
  const mapEl = document.querySelector('#projects-map')
  if (!mapEl) return
  const regionSelect = document.querySelector('#map-region')
  const dealSelect = document.querySelector('#map-deal')
  const typeSelect = document.querySelector('#map-property')
  const districtsEl = document.querySelector('#map-districts')
  let map

  const chip = (text, value) =>
    `<button type="button" data-chip data-value="${value}" class="h-9 shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-line bg-white px-4 text-xs text-dark transition hover:border-gold sm:text-[13px]">${text}</button>`

  const goTo = (place, placeZoom) => {
    if (!map) return
    map.panTo({ lat: place.lat, lng: place.lng })
    map.setZoom(placeZoom)
  }

  // "" = whole map (its chips are the regions), otherwise the index of a region
  const showRegion = (value) => {
    const region = regions[value]
    districtsEl.innerHTML = region
      ? [...region.districts.map((d, i) => chip(d.name, i)), chip(regionChipLabel ?? `كل أحياء ${region.name}`, '')].join('')
      : regions.map((r, i) => chip(r.name, `region:${i}`)).join('')
    region ? goTo(region.center, region.zoom) : goTo(center, zoom)
  }

  regionSelect.innerHTML =
    (allLabel ? `<option value="">${allLabel}</option>` : '') +
    regions.map((r, i) => `<option value="${i}">${r.name}</option>`).join('')
  regionSelect.addEventListener('change', () => showRegion(regionSelect.value))
  showRegion(regionSelect.value)

  districtsEl.addEventListener('click', (e) => {
    const target = e.target.closest('[data-chip]')
    if (!target) return
    const { value } = target.dataset

    // Region chip on the "whole map" view: switch the select to that region
    if (value.startsWith('region:')) {
      regionSelect.value = value.slice(7)
      showRegion(regionSelect.value)
      return
    }

    districtsEl.querySelectorAll('[data-chip]').forEach((c) => {
      const on = c === target
      c.classList.toggle('border-gold', on)
      c.classList.toggle('bg-gold', on)
      c.classList.toggle('text-white', on)
      c.classList.toggle('bg-white', !on)
      c.classList.toggle('text-dark', !on)
    })
    const region = regions[regionSelect.value]
    const district = region.districts[value]
    district ? goTo(district, district.zoom ?? DISTRICT_ZOOM) : goTo(region.center, region.zoom)
  })

  await whenVisible(mapEl)
  await loadGoogleMaps()

  if (typeof projects === 'string') projects = await fetch(projects).then((r) => r.json())

  const start = regions[regionSelect.value] ?? { center, zoom }
  map = new google.maps.Map(mapEl, {
    center: start.center,
    zoom: start.zoom,
    mapId: GOOGLE_MAP_ID,
    disableDefaultUI: true,
    // The map fades out on its sides (.map-fade), so keep the zoom buttons bottom-centre
    zoomControl: true,
    zoomControlOptions: { position: google.maps.ControlPosition.BLOCK_END_INLINE_CENTER },
    gestureHandling: 'cooperative',
  })
  if (SHOW_TRAFFIC) new google.maps.TrafficLayer().setMap(map)

  const markers = projects.map((project) => {
    const content = pinElement(project)
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: project.lat, lng: project.lng },
      content,
      title: project.name,
    })
    // Bring the hovered pin (and its label) above its neighbours
    content.addEventListener('mouseenter', () => (marker.zIndex = 1000))
    content.addEventListener('mouseleave', () => (marker.zIndex = null))
    return { marker, project }
  })

  const applyFilters = () => {
    const deal = dealSelect?.value
    const type = typeSelect?.value
    markers.forEach(({ marker, project }) => {
      const show = (!deal || project.deal === deal) && (!type || project.type === type)
      marker.map = show ? map : null
    })
  }
  dealSelect?.addEventListener('change', applyFilters)
  typeSelect?.addEventListener('change', applyFilters)
  applyFilters()
}
