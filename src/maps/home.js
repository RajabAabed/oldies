/* ---------- Home page map data (whole kingdom) ---------- */
import { initProjectsMap } from './projects-map.js'

// City chips zoom to the whole city, not to a single district
const CITY_ZOOM = 11

initProjectsMap({
  center: { lat: 23.9, lng: 45.1 },
  zoom: 5,
  allLabel: 'كل مناطق المملكة',
  regionChipLabel: 'كل المنطقة',

  // Regions in the #map-region select; districts are the chips under the filters
  regions: [
    {
      name: 'منطقة الرياض',
      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 11,
      districts: [
        { name: 'النرجس', lat: 24.8795, lng: 46.6615 },
        { name: 'الملقا', lat: 24.8045, lng: 46.605 },
        { name: 'العارض', lat: 24.8655, lng: 46.5955 },
        { name: 'الياسمين', lat: 24.8255, lng: 46.6455 },
        { name: 'القيروان', lat: 24.841, lng: 46.5735 },
        { name: 'الصحافة', lat: 24.8045, lng: 46.639 },
        { name: 'حطين', lat: 24.765, lng: 46.601 },
        { name: 'الرمال', lat: 24.873, lng: 46.86 },
        { name: 'قرطبة', lat: 24.8105, lng: 46.734 },
      ],
    },
    {
      name: 'المنطقة الشرقية',
      center: { lat: 26.15, lng: 49.95 },
      zoom: 8,
      districts: [
        { name: 'الدمام', lat: 26.4207, lng: 50.0888, zoom: CITY_ZOOM },
        { name: 'الخبر', lat: 26.2172, lng: 50.1971, zoom: CITY_ZOOM },
        { name: 'الظهران', lat: 26.2361, lng: 50.0393, zoom: CITY_ZOOM },
        { name: 'القطيف', lat: 26.5196, lng: 50.0115, zoom: CITY_ZOOM },
        { name: 'الجبيل', lat: 27.0174, lng: 49.6225, zoom: CITY_ZOOM },
        { name: 'الأحساء', lat: 25.3833, lng: 49.5869, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة مكة المكرمة',
      center: { lat: 21.6, lng: 39.7 },
      zoom: 8,
      districts: [
        { name: 'جدة', lat: 21.5433, lng: 39.1728, zoom: CITY_ZOOM },
        { name: 'مكة المكرمة', lat: 21.3891, lng: 39.8579, zoom: CITY_ZOOM },
        { name: 'الطائف', lat: 21.2703, lng: 40.4158, zoom: CITY_ZOOM },
        { name: 'رابغ', lat: 22.7986, lng: 39.0349, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة المدينة المنورة',
      center: { lat: 25.0, lng: 38.6 },
      zoom: 7,
      districts: [
        { name: 'المدينة المنورة', lat: 24.4672, lng: 39.6024, zoom: CITY_ZOOM },
        { name: 'ينبع', lat: 24.0895, lng: 38.0618, zoom: CITY_ZOOM },
        { name: 'العلا', lat: 26.6085, lng: 37.9232, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة القصيم',
      center: { lat: 26.1, lng: 43.8 },
      zoom: 9,
      districts: [
        { name: 'بريدة', lat: 26.326, lng: 43.975, zoom: CITY_ZOOM },
        { name: 'عنيزة', lat: 26.084, lng: 43.994, zoom: CITY_ZOOM },
        { name: 'الرس', lat: 25.8694, lng: 43.4973, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة حائل',
      center: { lat: 27.65, lng: 42.0 },
      zoom: 9,
      districts: [
        { name: 'حائل', lat: 27.5114, lng: 41.7208, zoom: CITY_ZOOM },
        { name: 'بقعاء', lat: 27.889, lng: 42.406, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة تبوك',
      center: { lat: 27.0, lng: 36.8 },
      zoom: 7,
      districts: [
        { name: 'تبوك', lat: 28.3838, lng: 36.555, zoom: CITY_ZOOM },
        { name: 'أملج', lat: 25.021, lng: 37.2685, zoom: CITY_ZOOM },
        { name: 'الوجه', lat: 26.2455, lng: 36.4525, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة الحدود الشمالية',
      center: { lat: 30.3, lng: 42.2 },
      zoom: 8,
      districts: [
        { name: 'عرعر', lat: 30.9753, lng: 41.0381, zoom: CITY_ZOOM },
        { name: 'رفحاء', lat: 29.6202, lng: 43.4948, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة الجوف',
      center: { lat: 29.9, lng: 40.05 },
      zoom: 9,
      districts: [
        { name: 'سكاكا', lat: 29.9697, lng: 40.2064, zoom: CITY_ZOOM },
        { name: 'دومة الجندل', lat: 29.8115, lng: 39.8689, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة الباحة',
      center: { lat: 19.95, lng: 41.5 },
      zoom: 10,
      districts: [
        { name: 'الباحة', lat: 20.0129, lng: 41.4677, zoom: CITY_ZOOM },
        { name: 'بلجرشي', lat: 19.8594, lng: 41.5583, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة عسير',
      center: { lat: 18.25, lng: 42.6 },
      zoom: 10,
      districts: [
        { name: 'أبها', lat: 18.2164, lng: 42.5053, zoom: CITY_ZOOM },
        { name: 'خميس مشيط', lat: 18.3, lng: 42.7333, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة جازان',
      center: { lat: 17.0, lng: 42.6 },
      zoom: 10,
      districts: [
        { name: 'جازان', lat: 16.8892, lng: 42.5511, zoom: CITY_ZOOM },
        { name: 'صبيا', lat: 17.1495, lng: 42.6254, zoom: CITY_ZOOM },
      ],
    },
    {
      name: 'منطقة نجران',
      center: { lat: 17.5, lng: 45.6 },
      zoom: 7,
      districts: [
        { name: 'نجران', lat: 17.4924, lng: 44.1277, zoom: CITY_ZOOM },
        { name: 'شرورة', lat: 17.4667, lng: 47.1167, zoom: CITY_ZOOM },
      ],
    },
  ],

  // Sample data — replace with the projects from the database.
  // Either paste the array here, or pass the API URL instead:
  //   projects: '/api/projects',
  // deal must match the #map-deal options (ايجار / بيع)
  // type must match the #map-property options (شقق / فلل / أراضي / مكاتب)
  projects: [
    { name: 'مشروع النرجس السكني', lat: 24.8812, lng: 46.6578, url: '/property.html', deal: 'ايجار', type: 'شقق' },
    { name: 'برج الملقا', lat: 24.8031, lng: 46.6098, url: '/property.html', deal: 'ايجار', type: 'مكاتب' },
    { name: 'فلل حطين', lat: 24.7672, lng: 46.5968, url: '/property.html', deal: 'بيع', type: 'فلل' },
    { name: 'أراضي قرطبة', lat: 24.8121, lng: 46.7302, url: '/property.html', deal: 'بيع', type: 'أراضي' },
    { name: 'أبراج الشاطئ', lat: 21.5972, lng: 39.1078, url: '/property.html', deal: 'بيع', type: 'شقق' },
    { name: 'شقق الحمراء', lat: 21.5302, lng: 39.1612, url: '/property.html', deal: 'ايجار', type: 'شقق' },
    { name: 'مشروع مكة السكني', lat: 21.4225, lng: 39.8262, url: '/property.html', deal: 'ايجار', type: 'شقق' },
    { name: 'برج الدمام', lat: 26.4344, lng: 50.1033, url: '/property.html', deal: 'ايجار', type: 'مكاتب' },
    { name: 'فلل الخبر', lat: 26.2794, lng: 50.2083, url: '/property.html', deal: 'بيع', type: 'فلل' },
    { name: 'مشروع المدينة المنورة', lat: 24.4709, lng: 39.6122, url: '/property.html', deal: 'بيع', type: 'شقق' },
    { name: 'فلل أبها', lat: 18.2465, lng: 42.5117, url: '/property.html', deal: 'بيع', type: 'فلل' },
  ],
})
