/* ---------- Riyadh map data ---------- */
import { initProjectsMap } from './projects-map.js'

const center = { lat: 24.7136, lng: 46.6753 }

initProjectsMap({
  center,
  zoom: 11,

  regions: [
    {
      name: 'الرياض',
      center,
      zoom: 11,
      districts: [
        { name: 'النرجس', lat: 24.8795, lng: 46.6615 },
        { name: 'الملقا', lat: 24.8045, lng: 46.6050 },
        { name: 'العارض', lat: 24.8655, lng: 46.5955 },
        { name: 'الياسمين', lat: 24.8255, lng: 46.6455 },
        { name: 'القيروان', lat: 24.8410, lng: 46.5735 },
        { name: 'الصحافة', lat: 24.8045, lng: 46.6390 },
        { name: 'حطين', lat: 24.7650, lng: 46.6010 },
        { name: 'الرمال', lat: 24.8730, lng: 46.8600 },
        { name: 'قرطبة', lat: 24.8105, lng: 46.7340 },
      ],
    },
  ],

  // Sample data — replace with the projects from the database.
  // Either paste the array here, or pass the API URL instead:
  //   projects: '/api/projects?city=riyadh',
  // deal must match the #map-deal options (ايجار / بيع)
  // type must match the #map-property options (شقق / فلل / أراضي / مكاتب)
  projects: [
    { name: 'مشروع النرجس السكني', lat: 24.8812, lng: 46.6578, url: '/property.html', deal: 'ايجار', type: 'شقق', district: 'النرجس' },
    { name: 'فلل النرجس', lat: 24.8741, lng: 46.6682, url: '/property.html', deal: 'بيع', type: 'فلل', district: 'النرجس' },
    { name: 'برج الملقا', lat: 24.8031, lng: 46.6098, url: '/property.html', deal: 'ايجار', type: 'مكاتب', district: 'الملقا' },
    { name: 'أبراج الملقا السكنية', lat: 24.8092, lng: 46.5987, url: '/property.html', deal: 'بيع', type: 'شقق', district: 'الملقا' },
    { name: 'مشروع العارض', lat: 24.8678, lng: 46.5901, url: '/property.html', deal: 'بيع', type: 'أراضي', district: 'العارض' },
    { name: 'شقق الياسمين', lat: 24.8270, lng: 46.6512, url: '/property.html', deal: 'ايجار', type: 'شقق', district: 'الياسمين' },
    { name: 'فلل القيروان', lat: 24.8389, lng: 46.5779, url: '/property.html', deal: 'بيع', type: 'فلل', district: 'القيروان' },
    { name: 'مكاتب الصحافة', lat: 24.8012, lng: 46.6431, url: '/property.html', deal: 'ايجار', type: 'مكاتب', district: 'الصحافة' },
    { name: 'مشروع حطين', lat: 24.7672, lng: 46.5968, url: '/property.html', deal: 'بيع', type: 'فلل', district: 'حطين' },
    { name: 'شقق الرمال', lat: 24.8711, lng: 46.8634, url: '/property.html', deal: 'ايجار', type: 'شقق', district: 'الرمال' },
    { name: 'أراضي قرطبة', lat: 24.8121, lng: 46.7302, url: '/property.html', deal: 'بيع', type: 'أراضي', district: 'قرطبة' },
  ],
})
