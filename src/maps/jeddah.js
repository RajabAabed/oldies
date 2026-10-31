/* ---------- Jeddah map data ---------- */
import { initProjectsMap } from './projects-map.js'

const center = { lat: 21.5433, lng: 39.1728 }

initProjectsMap({
  center,
  zoom: 11,

  regions: [
    {
      name: 'جدة',
      center,
      zoom: 11,
      districts: [
        { name: 'الشاطئ', lat: 21.5950, lng: 39.1100 },
        { name: 'الروضة', lat: 21.5640, lng: 39.1530 },
        { name: 'الحمراء', lat: 21.5280, lng: 39.1640 },
        { name: 'النعيم', lat: 21.6150, lng: 39.1550 },
        { name: 'أبحر الشمالية', lat: 21.7700, lng: 39.1150 },
        { name: 'الزهراء', lat: 21.6010, lng: 39.1350 },
        { name: 'المحمدية', lat: 21.6600, lng: 39.1400 },
        { name: 'السلامة', lat: 21.5850, lng: 39.1560 },
        { name: 'البساتين', lat: 21.6870, lng: 39.1110 },
      ],
    },
  ],

  // Sample data — replace with the projects from the database.
  // Either paste the array here, or pass the API URL instead:
  //   projects: '/api/projects?city=jeddah',
  // deal must match the #map-deal options (ايجار / بيع)
  // type must match the #map-property options (شقق / فلل / أراضي / مكاتب)
  projects: [
    { name: 'أبراج الشاطئ', lat: 21.5972, lng: 39.1078, url: '/property.html', deal: 'بيع', type: 'شقق', district: 'الشاطئ' },
    { name: 'مكاتب الروضة', lat: 21.5621, lng: 39.1567, url: '/property.html', deal: 'ايجار', type: 'مكاتب', district: 'الروضة' },
    { name: 'شقق الحمراء', lat: 21.5302, lng: 39.1612, url: '/property.html', deal: 'ايجار', type: 'شقق', district: 'الحمراء' },
    { name: 'فلل النعيم', lat: 21.6131, lng: 39.1589, url: '/property.html', deal: 'بيع', type: 'فلل', district: 'النعيم' },
    { name: 'منتجع أبحر الشمالية', lat: 21.7724, lng: 39.1121, url: '/property.html', deal: 'بيع', type: 'فلل', district: 'أبحر الشمالية' },
    { name: 'مشروع الزهراء', lat: 21.6032, lng: 39.1318, url: '/property.html', deal: 'ايجار', type: 'شقق', district: 'الزهراء' },
    { name: 'أراضي المحمدية', lat: 21.6578, lng: 39.1436, url: '/property.html', deal: 'بيع', type: 'أراضي', district: 'المحمدية' },
    { name: 'شقق السلامة', lat: 21.5869, lng: 39.1531, url: '/property.html', deal: 'ايجار', type: 'شقق', district: 'السلامة' },
    { name: 'فلل البساتين', lat: 21.6851, lng: 39.1142, url: '/property.html', deal: 'بيع', type: 'فلل', district: 'البساتين' },
  ],
})
