
const PORTFOLIO_CONFIG = {
  student: {
    name: 'Jurguen Salas Herrera',
    carnet: 'C27067',
    course: 'IF7200 — Métodos Cuantitativos para la Toma de Decisiones',
    campus: 'UCR Sede del Caribe',
  },

  
  resumenesPdf: {
    file: 'Resumenes Jurguen Salas F.pdf',
    title: 'Resúmenes ejecutivos — IF7200',
    description: 'Síntesis analítica de las seis exposiciones del curso: Markov, Control estadístico, Simulación Monte Carlo, Modelos de redes, Transporte y asignación, y Programación.',
  },

  
  studentVideos: {
    markov: {
      id: 'IAkib1s6ztE',
      title: 'Explicación paso a paso — Análisis Markov',
      description: 'Video propio: resolución del ejercicio de cuota de mercado retail en Limón.',
      channel: 'Jurguen Salas Herrera',
    },
    simulation: {
      id: 'foEbjjo1ZSw',
      title: 'Explicación paso a paso — Simulación Monte Carlo',
      description: 'Video propio: simulación de la terminal de aduanas (escenarios A, B y C).',
      channel: 'Jurguen Salas Herrera',
    },
    networks: {
      id: 'lUks2i_i4ng',
      title: 'Explicación paso a paso — Modelos de redes',
      description: 'Video propio: Dijkstra (ruta más corta) y Kruskal (árbol mínimo) en la red logística.',
      channel: 'Jurguen Salas Herrera',
    },
  },

  
  video: {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/boiCzzgww34',
    title: 'DecisionLab Limón — Recorrido general del portafolio (9 min)',
  },

  
  videoPlayback: 'auto',

  
  pdfExports: [
    { id: 'markov', label: 'Markov — Supermercados' },
    { id: 'control', label: 'Control — Corte de alambre' },
    { id: 'sim-a', label: 'Simulación Parte A' },
    { id: 'sim-b', label: 'Simulación Parte B' },
    { id: 'sim-c', label: 'Simulación Parte C' },
    { id: 'networks', label: 'Modelos de Redes' },
    { id: 'trans-vogel', label: 'Transporte Vogel' },
    { id: 'trans-assign', label: 'Asignación Camiones' },
    { id: 'prog-goals', label: 'Programación por metas' },
    { id: 'prog-nonlinear', label: 'Programación no lineal' },
    { id: 'prog-integer', label: 'Programación entera textil' },
  ],

  
  topicVideos: {
    markov: {
      heading: '¿De dónde vienen las cadenas de Markov?',
      history: 'Andrei Markov (Rusia, 1906) modeló secuencias donde el futuro solo depende del presente. Su primer ejemplo: contar vocales y consonantes en la novela Eugene Onegin de Pushkin. Hoy se usan en cuotas de mercado, clima, epidemias y recomendaciones.',
      videos: [
        {
          id: '6pO6Mm2qJaE',
          title: 'La Extraña Matemática Que Predice (Casi) Todo',
          channel: 'Veritasium en español',
          duration: '22 min',
          lang: 'Español · cadenas de Markov y predicción',
        },
      ],
    },
    control: {
      heading: 'Nacimiento del control estadístico',
      history: 'Walter Shewhart creó el primer gráfico de control en 1924 en los Laboratorios Bell (EE.UU.), para distinguir variación normal de variación especial. W. Edwards Deming llevó el método a Japón tras la Segunda Guerra Mundial. Es la base del SPC y del Six Sigma.',
      videos: [
        {
          id: 'jZkvTa2KV-g',
          title: 'Qué es y cómo surgió el control estadístico de procesos',
          channel: 'José David Flores Dorantes',
          duration: '12 min',
          lang: 'Español · origen e historia del CEP',
        },
      ],
    },
    simulation: {
      heading: 'Historia de la simulación Monte Carlo',
      history: 'Stanislaw Ulam (1946) tuvo la idea mientras jugaba solitario: simular miles de partidas en lugar de calcular a mano. John von Neumann la programó en el ENIAC para problemas de física nuclear en Los Álamos. El nombre viene del casino de Mónaco.',
      videos: [
        {
          id: 'WJjDr67frtM',
          title: '¿En qué consiste el Método Montecarlo?',
          channel: 'Date un Voltio',
          duration: '6 min',
          lang: 'Español · origen con Ulam y Los Álamos',
        },
      ],
    },
    networks: {
      heading: 'Origen de la teoría de grafos y las redes',
      history: 'Leonhard Euler resolvió en 1736 el acertijo de los siete puentes de Königsberg, abstrayendo la ciudad en vértices y aristas: nació la teoría de grafos. Siglos después, Dijkstra (1959) y Kruskal (1956) aportaron algoritmos de caminos mínimos y árboles de expansión, base del GPS y la logística portuaria.',
      videos: [
        {
          id: 'm_IT0RNZRw8',
          title: 'El problema de los puentes de Königsberg',
          channel: 'math2me',
          duration: '9 min',
          lang: 'Español · Euler y nacimiento de los grafos',
        },
      ],
    },
    transport: {
      heading: 'Problema de transporte en investigación de operaciones',
      history: 'Gaspard Monge formalizó el problema en 1781. Kantorovich (1939–1942), Hitchcock (1941) y Koopmans (1947) lo vincularon con la programación lineal; Dantzig lo resolvió con el Simplex en 1951. La investigación de operaciones moderna nació en la Segunda Guerra Mundial y después impulsó la distribución comercial.',
      videos: [
        {
          id: 'AoMXCGcE3LE',
          title: 'Historia de la Investigación de Operaciones',
          channel: 'Jaime Meneses',
          duration: '5 min',
          lang: 'Español · antecedentes y evolución de la IO',
        },
      ],
    },
    programming: {
      heading: 'De la programación lineal a la no lineal',
      history: 'George Dantzig inventó el método Simplex en 1947 para modelos lineales con restricciones de igualdad. Pero muchos problemas reales tienen funciones curvas (no lineales) y límites del tipo ≤ o ≥. Para eso surgió la programación no lineal (PNL): William Karush lo planteó en 1939 y Harold Kuhn con Albert Tucker lo publicaron en 1951 (condiciones KKT). A partir de la PL también derivaron la programación entera (decisiones 0-1, como el taller textil) y la programación por metas (varios objetivos con prioridades).',
      videos: [
        {
          id: 'pr1Oc-9AWmQ',
          title: 'Historia de la programación lineal',
          channel: 'Bryan Umaña Gómez',
          duration: '11 min',
          lang: 'Español · Dantzig, Simplex e IO',
        },
      ],
    },
  },
};
