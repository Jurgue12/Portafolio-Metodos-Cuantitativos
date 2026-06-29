/**
 * Contextos, resoluciones paso a paso y decisiones gerenciales
 */
const SOLUTIONS = {
  markov: {
    title: 'Análisis Markov — Supermercados en Limón',
    subtitle: 'Pronóstico de participación de mercado',
    context: `El comercio minorista en Limón se concentra en tres alternativas: Maxi Palí, Megasuper y comercios locales. Las familias pueden permanecer en la misma cadena o migrar según precios, promociones, ubicación y experiencia de compra. El modelo de Markov captura esa lealtad y fuga entre cadenas para proyectar cuotas de mercado anuales y el equilibrio de largo plazo.`,
    steps: [
      { heading: 'Datos iniciales', body: `<p><strong>π(0) = [0.45, 0.35, 0.20]</strong> — Maxi Palí 45%, Megasuper 35%, Locales 20%.</p><p>Matriz P con diagonal de permanencia (ej. 88% se queda en Maxi Palí).</p>` },
      { heading: 'Fórmula de transición', body: `<p><strong>π(n + 1) = π(n) · P</strong></p><p>Cada componente se calcula multiplicando el vector actual por la columna correspondiente de P.</p>` },
      { heading: 'Período 1 — π(1)', body: `<ul class="calc-list"><li>M = 0.45(0.88) + 0.35(0.10) + 0.20(0.15) = <strong>0.4610</strong> (46.10%)</li><li>G = 0.45(0.07) + 0.35(0.85) + 0.20(0.10) = <strong>0.3490</strong> (34.90%)</li><li>L = 0.45(0.05) + 0.35(0.05) + 0.20(0.75) = <strong>0.1900</strong> (19.00%)</li></ul>` },
      { heading: 'Período 2 — π(2)', body: `<p>Con π(1) = [0.4610, 0.3490, 0.1900]:</p><ul class="calc-list"><li>M = <strong>0.46908</strong> (46.91%)</li><li>G = <strong>0.34792</strong> (34.79%)</li><li>L = <strong>0.18300</strong> (18.30%)</li></ul>` },
      { heading: 'Períodos 3 a 10', body: `<p>Se repite π(n+1) = π(n) · P hasta P10. Maxi Palí converge hacia ~49%, Locales hacia ~17%. Ver tabla completa en el paso final del modal y en la sección interactiva.</p>` },
      { heading: 'Estado estable π = π · P', body: `<p>Sistema con M + G + L = 1:</p><ul class="calc-list"><li>0.12M − 0.10G − 0.15L = 0</li><li>−0.07M + 0.15G − 0.10L = 0</li><li>M + G + L = 1</li></ul><p><strong>Solución:</strong> π* = [0.4924, 0.3409, 0.1667]</p>` },
    ],
    decision: {
      title: 'Decisión estratégica',
      text: 'Maxi Palí consolidará ~49.2% del mercado en el largo plazo. Megasuper debe invertir en retención (fidelización, precio, servicio) para frenar la fuga hacia Maxi Palí. Los comercios locales perderían participación (~16.7% estable), lo que sugiere diferenciación o nichos locales.',
      metrics: [
        { label: 'Ganador largo plazo', value: 'Maxi Palí 49.24%' },
        { label: 'π(10) proyectado', value: '49.00% / 34.24% / 16.76%' },
        { label: 'Recomendación Megasuper', value: 'Programas de lealtad' },
      ],
    },
  },

  control: {
    title: 'Control Estadístico — Corte preciso de alambre',
    subtitle: 'Gráficos X̄–R (24 subgrupos, n = 4)',
    context: `Una planta de manufactura controla la longitud de cortes de alambre con subgrupos de 4 piezas cada hora, durante 24 horas. Los gráficos X̄–R permiten verificar si la media y la dispersión del proceso se mantienen estables o si hay causas especiales que requieran intervención.`,
    steps: [
      { heading: 'Datos del ejercicio', body: `<p><strong>24 subgrupos</strong> (horas) · tamaño de subgrupo <strong>n = 4</strong></p><p>Constantes para n = 4: <strong>A₂ = 0.729</strong>, <strong>D₃ = 0</strong>, <strong>D₄ = 2.282</strong></p>` },
      { heading: 'Gran media X̄̄', body: `<p>∑X̄ = 71.32 → X̄̄ = 71.32 / 24 = <strong>2.972</strong></p><p>Línea central del gráfico X̄: LC = 2.972</p>` },
      { heading: 'Rango promedio R̄', body: `<p>∑R = 24.37 → R̄ = 24.37 / 24 = <strong>1.015</strong></p><p>Línea central del gráfico R: LC = 1.015</p>` },
      { heading: 'Límites del gráfico X̄', body: `<ul class="calc-list"><li>LCS = X̄̄ + A₂R̄ = 2.972 + 0.729(1.015) = <strong>3.712</strong></li><li>LC = <strong>2.972</strong></li><li>LCI = X̄̄ − A₂R̄ = <strong>2.231</strong></li></ul>` },
      { heading: 'Límites del gráfico R', body: `<ul class="calc-list"><li>LCS = D₄R̄ = 2.282(1.015) = <strong>2.317</strong></li><li>LC = <strong>1.015</strong></li><li>LCI = D₃R̄ = <strong>0</strong></li></ul>` },
      { heading: 'Verificación', body: `<p>Gráfico X̄: mínimo observado 2.64, máximo 3.39 → todos dentro de [2.231 ; 3.712].</p><p>Gráfico R: mínimo 0.32, máximo 1.58 → todos dentro de [0 ; 2.317].</p><p>Ningún punto fuera de los límites en ninguno de los dos gráficos.</p>` },
    ],
    decision: {
      title: 'Conclusión gerencial',
      text: 'El proceso de corte preciso de alambre está bajo control estadístico. Las variaciones observadas corresponden a variación común del sistema; no se detectan causas especiales que afecten la producción en las 24 horas analizadas.',
      metrics: [
        { label: 'X̄̄ (LC X̄)', value: '2.972' },
        { label: 'R̄ (LC R)', value: '1.015' },
        { label: 'Estado del proceso', value: 'Bajo control ✓' },
      ],
    },
  },

  'sim-a': {
    title: 'Simulación Monte Carlo — Parte A',
    subtitle: 'Tiempos de inspección aduanera (colas)',
    context: `La terminal portuaria de Limón enfrenta variabilidad en el aforo físico. Los contenedores inspeccionados tardan 15, 30, 45 o 60 minutos según historial de 100 casos. Se simulan 10 contenedores con números aleatorios fijos para evaluar el comportamiento del sistema frente al valor esperado teórico.`,
    steps: [
      { heading: 'Probabilidades y rangos', body: `<table class="data-table"><tr><th>Tiempo</th><th>P(x)</th><th>Rango</th></tr><tr><td>15 min</td><td>0.20</td><td>1–20</td></tr><tr><td>30 min</td><td>0.40</td><td>21–60</td></tr><tr><td>45 min</td><td>0.30</td><td>61–90</td></tr><tr><td>60 min</td><td>0.10</td><td>91–100</td></tr></table>` },
      { heading: 'Valor esperado E(X)', body: `<p>E(X) = 15(0.20) + 30(0.40) + 45(0.30) + 60(0.10) = <strong>34.5 minutos</strong></p>` },
      { heading: 'Simulación (RN: 25, 88, 12, 65, 92, 8, 45, 73, 19, 54)', body: `<p>Resultados: 30, 45, 15, 45, 60, 15, 30, 45, 15, 30 min</p><p>Total = 330 min → Promedio = <strong>33 min</strong></p>` },
    ],
    decision: {
      title: 'Conclusión gerencial',
      text: 'El promedio simulado (33 min) es inferior al teórico (34.5 min). Aunque hubo un caso extremo de 60 min que saturaría la caseta, la alta frecuencia de trámites rápidos compensó el promedio del turno. Se recomienda planificar capacidad considerando la cola por casos extremos, no solo la media.',
      metrics: [{ label: 'E(X) teórico', value: '34.5 min' }, { label: 'Promedio simulado', value: '33 min' }],
    },
  },

  'sim-b': {
    title: 'Simulación Monte Carlo — Parte B',
    subtitle: 'Control de marchamos (insumos)',
    context: `Los oficiales de aduana utilizan marchamos de alta seguridad tras revisar contenedores. La demanda diaria es incierta (historial de 100 días). Simular 10 días permite evaluar si planificar con la media teórica es suficiente o se requiere inventario de seguridad.`,
    steps: [
      { heading: 'Probabilidades', body: `<p>50 u (15%), 100 u (45%), 150 u (30%), 200 u (10%)</p><p>E(X) = 50(0.15) + 100(0.45) + 150(0.30) + 200(0.10) = <strong>117.5 u/día</strong></p>` },
      { heading: 'Simulación', body: `<p>RN: 50, 10, 85, 42, 95, 22, 67, 5, 33, 78 → 100, 50, 150, 100, 200, 100, 150, 50, 100, 150</p><p>Total = 1150 → Promedio = <strong>115 u/día</strong></p>` },
    ],
    decision: {
      title: 'Conclusión gerencial',
      text: 'El promedio (115) se acerca al teórico (117.5), pero en 4 de 10 días la demanda fue 150 o 200. Planificar stock solo con la media provocaría escasez recurrente. Se justifica un inventario de seguridad para picos de demanda.',
      metrics: [{ label: 'Días con demanda alta', value: '4 de 10' }, { label: 'Promedio simulado', value: '115 u/día' }],
    },
  },

  'sim-c': {
    title: 'Simulación Monte Carlo — Parte C',
    subtitle: 'Política de mantenimiento del escáner',
    context: `El escáner de rayos X sufre averías que paralizan inspecciones. El historial de 100 fallas indica días útiles de operación antes del colapso. Simular 10 ciclos ayuda a decidir si el mantenimiento preventivo debe ser más estricto que esperar al promedio teórico.`,
    steps: [
      { heading: 'Probabilidades', body: `<p>10 días (30%), 20 días (40%), 30 días (20%), 40 días (10%)</p><p>E(X) = <strong>21 días útiles</strong></p>` },
      { heading: 'Simulación', body: `<p>Resultados: 30, 10, 20, 20, 40, 10, 20, 30, 10, 20 días → Promedio = <strong>21 días</strong></p><p>70% de las fallas ocurren a los 20 días o antes.</p>` },
    ],
    decision: {
      title: 'Conclusión gerencial',
      text: 'Aunque el promedio empírico coincide con la teoría (21 días), el 70% de las veces la máquina falla a los 20 días o antes. Esperar 21 días para revisar garantiza averías. Se recomienda mantenimiento preventivo estricto antes del día 20.',
      metrics: [{ label: 'Fallos ≤ 20 días', value: '70%' }, { label: 'E(X) teórico', value: '21 días' }],
    },
  },

  networks: {
    title: 'Modelos de Redes',
    subtitle: 'Puerto de Limón — Ruta corta y árbol mínimo',
    context: `Una red logística conecta el Puerto de Limón (A) con nodos intermedios y un destino F. Se requiere la ruta más corta A→F para un envío urgente, y un árbol de expansión mínima para diseñar la red de cableado/infraestructura que conecte todos los puntos al menor costo total.`,
    steps: [
      { heading: 'Parte 1 — Dijkstra (A → F)', body: `<ol class="step-list"><li>Desde A: caminos a B(7), C(5), D(6) → elegir C (5 km)</li><li>Desde C: C→F = 4 km → total <strong>9 km</strong></li><li>Alternativas A→D→F = 14 km y A→B→E→F = 14 km (descartadas)</li></ol><p><strong>Ruta óptima: A → C → F = 9 km</strong></p>` },
      { heading: 'Parte 2 — Kruskal (MST)', body: `<ol class="step-list"><li>B–C (2) → C–D (3) → E–F (3) = 8 km</li><li>C–F (4) conecta componentes → 12 km</li><li>A–C (5) incluye puerto → <strong>17 km total</strong></li></ol><p>Arcos: B-C, C-D, E-F, C-F, A-C</p>` },
    ],
    decision: {
      title: 'Decisión logística',
      text: 'Para envíos puntuales A→F usar ruta A-C-F (9 km). Para infraestructura compartida que conecte todos los nodos, construir el MST de 17 km evitando redundancias y ciclos innecesarios.',
      metrics: [{ label: 'Ruta más corta', value: '9 km' }, { label: 'Árbol mínimo', value: '17 km' }],
    },
  },

  'trans-vogel': {
    title: 'Modelo de Transporte — Vogel',
    subtitle: 'Distribución de mercancía en Limón',
    context: `Una empresa distribuidora almacena mercancía en bodegas de Moín, Cieneguita y Liverpool y debe abastecer Limón Centro, Siquirres, Guápiles y Talamanca. El objetivo es maximizar la ganancia por tonelada transportada (₡ miles/t), balanceando oferta (300 t) y demanda (300 t).`,
    steps: [
      { heading: 'Balanceo', body: `<p>Oferta: 120 + 100 + 80 = 300 t · Demanda: 70 + 90 + 80 + 60 = 300 t ✓</p>` },
      { heading: 'Método de Vogel (maximización)', body: `<p>Se transforma ganancia a costo de oportunidad y se asignan celdas con mayor ganancia:</p><ul class="calc-list"><li>Moín → Limón C.: 70 t</li><li>Moín → Siquirres: 50 t</li><li>Cieneguita → Siquirres: 40 t, Guápiles: 60 t</li><li>Liverpool → Guápiles: 20 t, Talamanca: 60 t</li></ul>` },
      { heading: 'Ganancia total', body: `<p>Z = 16(70) + 11(50) + 12(40) + 9(60) + 10(20) + 7(60) = <strong>3 310</strong> miles → <strong>₡3 310 000</strong></p>` },
      { heading: 'Salto de piedra', body: `<p>Todas las celdas vacías dan Δ = 0 → solución óptima confirmada.</p>` },
    ],
    decision: {
      title: 'Decisión de distribución',
      text: 'Priorizar envíos de Moín hacia Limón Centro y Siquirres (mayor ganancia/t). La solución Vogel es óptima; no hay mejora posible con salto de piedra. Gerencia puede implementar este plan de despacho con confianza.',
      metrics: [{ label: 'Ganancia total', value: '₡3 310 000' }, { label: 'Optimalidad', value: 'Confirmada' }],
    },
  },

  'trans-assign': {
    title: 'Modelo de Asignación — Camiones',
    subtitle: 'Rendimiento camión × ruta',
    context: `La empresa cuenta con 4 camiones y 4 rutas hacia los centros de distribución. Cada camión tiene distinto rendimiento por ruta (combustible, acceso, carga). Se busca asignar un camión por ruta para maximizar el rendimiento operativo total.`,
    steps: [
      { heading: 'Matriz de rendimiento', body: `<p>4 camiones × 4 rutas con valores de desempeño por combinación.</p>` },
      { heading: 'Método húngaro (reducción filas/columnas)', body: `<p>Asignación óptima:</p><ul class="calc-list"><li>Camión 1 → Limón Centro (90)</li><li>Camión 2 → Siquirres (88)</li><li>Camión 3 → Guápiles (92)</li><li>Camión 4 → Talamanca (95)</li></ul>` },
      { heading: 'Función objetivo', body: `<p>Z = 90 + 88 + 92 + 95 = <strong>365</strong></p>` },
    ],
    decision: {
      title: 'Decisión operativa diaria',
      text: 'Asignar cada camión a la ruta donde maximiza su rendimiento. Plan operativo: C1→Limón Centro, C2→Siquirres, C3→Guápiles, C4→Talamanca, con rendimiento total de 365 unidades.',
      metrics: [{ label: 'Z máximo', value: '365' }, { label: 'Camiones', value: '4 asignados' }],
    },
  },

  'prog-goals': {
    title: 'Programación por Metas',
    subtitle: 'Panadería La Espiga Dorada — Grecia',
    context: `Panadería artesanal que produce pan (x) y repostería fina (y). Debe cumplir tres metas jerárquicas: ganancia semanal de $2 200 (P1), exactamente 160 horas laborales (P2) y consumo energético ≤ 300 kWh (P3). El modelo minimiza desviaciones indeseables ponderadas por prioridad.`,
    steps: [
      { heading: 'Variables y metas', body: `<p>Pan: $30/lote, 2 h, 5 kWh · Repostería: $50/lote, 4 h, 8 kWh</p><p>Min Z = P1(d1⁻) + P2(d2⁻ + d2⁺) + P3(d3⁺)</p>` },
      { heading: 'Restricciones por metas', body: `<ul class="calc-list"><li>30x + 50y + d1⁻ − d1⁺ = 2200</li><li>2x + 4y + d2⁻ − d2⁺ = 160</li><li>5x + 8y + d3⁻ − d3⁺ = 300</li></ul>` },
      { heading: 'Solución por sustitución', body: `<p>De P1 y P2: 30x + 50y = 2200 y 2x + 4y = 160</p><p>Simplificando: x + 2y = 80 → y = 20, x = 40</p>` },
      { heading: 'Verificación P3', body: `<p>Energía: 5(40) + 8(20) = 360 kWh → exceso d3⁺ = <strong>60 kWh</strong></p>` },
    ],
    decision: {
      title: 'Decisión de producción',
      text: 'Producir 40 lotes de pan y 20 de repostería cumple rentabilidad y acuerdo laboral, pero excede la meta ambiental en 60 kWh. La gerencia debe negociar con la municipalidad o invertir en eficiencia energética; las metas financiera y laboral tienen prioridad absoluta.',
      metrics: [{ label: 'x* pan', value: '40 lotes' }, { label: 'y* repostería', value: '20 lotes' }, { label: 'Exceso energía', value: '+60 kWh' }],
    },
  },

  'prog-nonlinear': {
    title: 'Programación No Lineal',
    subtitle: 'Fábrica — Productos A y B',
    context: `Una fábrica produce dos productos con ingresos decrecientes por elasticidad de demanda. El beneficio Z combina ingresos cuadráticos menos costos lineales. Se maximiza sujeto a restricciones de horas máquina y materia prima.`,
    steps: [
      { heading: 'Función objetivo', body: `<p>Max Z = 35x − x² + 42y − 2y²</p><p>(derivado de ingresos 40x−x², 50y−2y² menos costos 5x, 8y)</p>` },
      { heading: 'Restricciones', body: `<ul class="calc-list"><li>2x + 3y ≤ 120</li><li>x + 2y ≤ 80</li><li>x, y ≥ 0</li></ul>` },
      { heading: 'Derivadas parciales = 0', body: `<p>∂Z/∂x = 35 − 2x = 0 → x = 17.5</p><p>∂Z/∂y = 42 − 4y = 0 → y = 10.5</p>` },
      { heading: 'Factibilidad y Z*', body: `<p>2(17.5) + 3(10.5) = 66.5 ≤ 120 ✓ · 17.5 + 2(10.5) = 38.5 ≤ 80 ✓</p><p>Z* = 35(17.5) − 17.5² + 42(10.5) − 2(10.5)² = <strong>$526.75</strong></p>` },
    ],
    decision: {
      title: 'Decisión de producción',
      text: 'Producir 17.5 unidades de A y 10.5 de B maximiza el beneficio ($526.75). Los recursos no están saturados (66.5/120 h, 38.5/80 materia prima), indicando holgura para expansión si crece la demanda.',
      metrics: [{ label: 'x*', value: '17.5 u' }, { label: 'y*', value: '10.5 u' }, { label: 'Z*', value: '$526.75' }],
    },
  },

  'prog-integer': {
    title: 'Programación Entera Pura',
    subtitle: 'Taller textil — Camisas y pantalones',
    context: `Un taller textil confecciona camisas y pantalones completos. Cada prenda consume tela, tiempo de costura y botones. Las cantidades deben ser enteras. El objetivo es maximizar la ganancia semanal respetando la disponibilidad de recursos.`,
    steps: [
      { heading: 'Variables', body: `<p>x₁ = camisas · x₂ = pantalones (enteros ≥ 0)</p>` },
      { heading: 'Función objetivo', body: `<p><strong>Max Z = 60x₁ + 50x₂</strong></p>` },
      { heading: 'Restricciones', body: `<ul class="calc-list"><li>x₁ + 2x₂ ≤ 10 (tela)</li><li>2x₁ + x₂ ≤ 11 (tiempo)</li><li>x₁ + x₂ ≤ 9 (botones)</li></ul>` },
      { heading: 'Vértices factibles', body: `<p>(0,0)→$0 · (5,0)→$330 · (0,5)→$250 · <strong>(4,3)→$390</strong></p>` },
      { heading: 'Intersección R1 ∩ R2 (tela y tiempo)', body: `<p>x₂ = 11 − 2x₁ · x₁ + 2(11−2x₁) = 10 → x₁ = 4, x₂ = 3</p><p>Botones: 4 + 3 = 7 ≤ 9 ✓ · Punto entero → solución óptima directa.</p>` },
      { heading: 'Verificación (4, 3)', body: `<ul class="calc-list"><li>Tela: 4 + 6 = 10 ≤ 10 ✓ (activa)</li><li>Tiempo: 8 + 3 = 11 ≤ 11 ✓ (activa)</li><li>Botones: 7 ≤ 9 ✓ (holgura 2 cajas)</li></ul>` },
    ],
    decision: {
      title: 'Decisión de planificación semanal',
      text: 'Producir 4 camisas y 3 pantalones genera $390/semana. Tela y tiempo son cuellos de botella (100% utilizados); botones tienen holgura. No conviene redondear otro vértice: (4,3) ya es entero y óptimo.',
      metrics: [{ label: 'Camisas x₁*', value: '4' }, { label: 'Pantalones x₂*', value: '3' }, { label: 'Ganancia Z*', value: '$390' }],
    },
  },
};

const STUDENT = {
  name: 'Jurguen Salas Herrera',
  carnet: 'C27067',
};

const EXERCISE_CONTEXTS = {
  markov: SOLUTIONS.markov.context,
  control: SOLUTIONS.control.context,
  simulation: `La terminal portuaria de aduanas en Limón enfrenta variabilidad operativa en inspección física, control de insumos (marchamos) y mantenimiento del escáner de rayos X. La simulación Monte Carlo modela el comportamiento probabilístico del sistema en tres frentes críticos.`,
  networks: SOLUTIONS.networks.context,
  transport: `Empresa distribuidora en Limón: mercancía desde bodegas en Moín, Cieneguita y Liverpool hacia centros en Limón Centro, Siquirres, Guápiles y Talamanca. Se optimiza ganancia por tonelada y asignación de camiones a rutas.`,
  programming: `Tres modelos de optimización: programación por metas (panadería con prioridades), programación no lineal (fábrica con rendimientos decrecientes) y programación entera (taller textil con recursos discretos).`,
};
