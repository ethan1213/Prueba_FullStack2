export const initialTalleres = [
  {
    id: 1,
    title: "Alfabetización Digital para Personas Mayores",
    area: "Tecnología",
    unidadVecinal: "Unidad Vecinal N° 12 Los Castaños",
    comuna: "La Florida",
    direccion: "Av. Santa Raquel 1450",
    fechaHora: "18 Octubre 2026 · 10:00 hrs",
    docenteLider: "Prof. Nelson Melo",
    cuposMaximos: 35,
    inscritos: 24,
    quorumPct: 68.5,
    descripcion: "Capacitación práctica para el uso de smartphones, navegación en portales de salud y trámites con ClaveÚnica.",
    image: "/img/portafolio.jpg",
    asistentes: [
      { id: "PART-LF-001", nombre: "Vecino Participante A", hora: "10:02:15", estado: "Acreditado QR", synced: true },
      { id: "PART-LF-002", nombre: "Vecina Participante B", hora: "10:03:02", estado: "Acreditado QR", synced: true },
      { id: "PART-PA-003", nombre: "Estudiante Voluntario C", hora: "10:04:18", estado: "Acreditado QR", synced: false }
    ]
  },
  {
    id: 2,
    title: "Taller de Emprendimiento y Comercio Digital",
    area: "Emprendimiento",
    unidadVecinal: "Sede Comunitaria Villa Cordillera",
    comuna: "Puente Alto",
    direccion: "Calle Central 780",
    fechaHora: "20 Octubre 2026 · 15:30 hrs",
    docenteLider: "Prof. Coordinador CITT",
    cuposMaximos: 25,
    inscritos: 15,
    quorumPct: 60.0,
    descripcion: "Asesoría a pequeños comerciantes en catálogos en línea, pasarelas de pago y presencia comunitaria.",
    image: "/img/catalogo.jpg",
    asistentes: [
      { id: "PART-PA-004", nombre: "Comerciante Vecinal D", hora: "15:32:10", estado: "Acreditado QR", synced: true }
    ]
  },
  {
    id: 3,
    title: "Reparación Sustentable y Reutilización de Hardware",
    area: "Sustentabilidad",
    unidadVecinal: "Centro Cultural La Granja Sur",
    comuna: "La Granja",
    direccion: "Pasaje Las Violetas 320",
    fechaHora: "24 Octubre 2026 · 11:00 hrs",
    docenteLider: "Prof. Nelson Melo",
    cuposMaximos: 20,
    inscritos: 18,
    quorumPct: 90.0,
    descripcion: "Mantenimiento básico de computadores para prolongar la vida útil de equipos comunitarios.",
    image: "/img/negocio.jpg",
    asistentes: []
  }
];

export const metricasVCM = {
  tiempoPromedioQR: "2.8s",
  tasaEncuestas: "78.4%",
  ahorroPapel: "100%",
  horasHombreAhorradas: "140 hrs"
};
