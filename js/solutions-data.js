
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
    subtitle: 'Gráficos de promedios y rangos (24 horas, 4 piezas por hora)',
    context: `Una planta corta alambre a una longitud objetivo. Cada hora se miden **4 piezas** (muestra de tamaño n = 4) y se repite esto **24 horas seguidas**. Con esos datos se arman dos gráficos de control para responder una pregunta simple: **¿el proceso es estable o algo raro está pasando?**`,
    steps: [
      {
        heading: 'Paso 0 — ¿Qué estamos controlando?',
        body: `<p>El ejercicio no pide solo calcular promedios: pide saber si la máquina de corte trabaja de forma **consistente** o si hay **causas especiales** (falla de calibración, operador distinto, material defectuoso, etc.).</p>
<p><strong>Variación común:</strong> pequeñas diferencias normales entre piezas. <strong>Variación especial:</strong> algo fuera de lo habitual que hay que investigar.</p>
<p>Herramienta usada: **gráficos de control X̄–R** (se leen “X barra” y “R”).</p>`,
      },
      {
        heading: 'Paso 1 — Glosario (qué significa cada símbolo)',
        body: `<table class="data-table"><thead><tr><th>Símbolo</th><th>Nombre en español</th><th>Qué es</th></tr></thead>
<tbody>
<tr><td><strong>n</strong></td><td>Tamaño de muestra</td><td>Piezas medidas por hora = <strong>4</strong></td></tr>
<tr><td><strong>X̄</strong> (X barra)</td><td>Promedio del subgrupo</td><td>Media de las 4 longitudes de esa hora</td></tr>
<tr><td><strong>R</strong></td><td>Rango del subgrupo</td><td>Pieza más larga − pieza más corta (en esa hora)</td></tr>
<tr><td><strong>X̄̄</strong> (X doble barra)</td><td>Gran media</td><td>Promedio de los 24 promedios horarios</td></tr>
<tr><td><strong>R̄</strong> (R barra)</td><td>Rango promedio</td><td>Promedio de los 24 rangos horarios</td></tr>
<tr><td><strong>LC</strong></td><td>Línea central</td><td>Valor “normal” esperado del gráfico</td></tr>
<tr><td><strong>LCI</strong></td><td>Límite inferior de control</td><td>Franja baja: si un punto cae aquí, alerta</td></tr>
<tr><td><strong>LCS</strong></td><td>Límite superior de control</td><td>Franja alta: si un punto cae aquí, alerta</td></tr>
<tr><td><strong>A₂, D₃, D₄</strong></td><td>Constantes de tabla</td><td>Números del libro para n = 4 (no se inventan)</td></tr>
</tbody></table>`,
      },
      {
        heading: 'Paso 2 — Estructura de los datos',
        body: `<p>Cada **hora** es un **subgrupo**. En cada subgrupo:</p>
<ol class="step-list">
<li>Se miden <strong>4 piezas</strong> de alambre (n = 4).</li>
<li>Se calcula <strong>X̄</strong> = promedio de esas 4 medidas.</li>
<li>Se calcula <strong>R</strong> = medida máxima − medida mínima del subgrupo.</li>
</ol>
<p>Se repite durante <strong>24 horas</strong> → tenemos 24 valores de X̄ y 24 valores de R (ya calculados en la tabla del ejercicio).</p>
<p><strong>Ejemplo conceptual (hora 1):</strong> si las 4 piezas midieran 3.0, 3.5, 3.2 y 3.4 → X̄ = 3.28 y R = 3.5 − 3.0 = 0.50. En la tabla real del ejercicio, hora 1 tiene X̄ = 3.25 y R = 0.71.</p>`,
      },
      {
        heading: 'Paso 3 — Constantes para n = 4',
        body: `<p>Como cada hora tiene <strong>n = 4</strong> piezas, el curso entrega estas constantes (tabla estadística):</p>
<ul class="calc-list">
<li><strong>A₂ = 0.729</strong> → se usa para calcular límites del gráfico de promedios (X̄)</li>
<li><strong>D₃ = 0</strong> → límite inferior del gráfico R (con n = 4 suele ser cero)</li>
<li><strong>D₄ = 2.282</strong> → límite superior del gráfico R</li>
</ul>
<p>No hay que deducirlas: vienen del tamaño de muestra n = 4.</p>`,
      },
      {
        heading: 'Paso 4 — Calcular la gran media X̄̄',
        body: `<p>Sumamos los <strong>24 promedios horarios</strong> (columna X̄):</p>
<p>∑X̄ = 3.25 + 3.11 + 3.22 + 3.39 + 3.07 + 2.86 + 3.05 + 2.65 + 3.02 + 2.85 + 2.83 + 2.97 + 3.11 + 2.83 + 3.12 + 2.86 + 2.86 + 2.74 + 3.13 + 2.89 + 2.65 + 3.28 + 2.94 + 2.64</p>
<p><strong>∑X̄ = 71.32</strong></p>
<p>Dividimos entre 24 horas:</p>
<p><strong>X̄̄ = 71.32 ÷ 24 = 2.9717 ≈ 2.972</strong></p>
<p>Interpretación: la longitud promedio “global” del proceso ronda <strong>2.972</strong> (unidades del ejercicio). Esta es la <strong>línea central del gráfico X̄</strong>: LC<sub>X̄</sub> = 2.972.</p>`,
      },
      {
        heading: 'Paso 5 — Calcular el rango promedio R̄',
        body: `<p>Sumamos los <strong>24 rangos</strong> (columna R):</p>
<p>∑R = 0.71 + 1.18 + 1.43 + 1.26 + 1.17 + 0.32 + 0.53 + 1.13 + 0.71 + 1.33 + 1.17 + 0.40 + 0.85 + 1.31 + 1.06 + 0.50 + 1.43 + 1.29 + 1.41 + 1.09 + 1.08 + 0.46 + 1.58 + 0.97</p>
<p><strong>∑R = 24.37</strong></p>
<p><strong>R̄ = 24.37 ÷ 24 = 1.0154 ≈ 1.015</strong></p>
<p>Interpretación: en promedio, dentro de cada hora la diferencia entre la pieza más larga y la más corta ronda <strong>1.015</strong>. Esta es la <strong>línea central del gráfico R</strong>: LC<sub>R</sub> = 1.015.</p>`,
      },
      {
        heading: 'Paso 6 — Límites del gráfico de promedios (X̄)',
        body: `<p>Definen el “corredor seguro” donde deberían caer los promedios horarios si el proceso está estable:</p>
<ul class="calc-list">
<li><strong>Límite superior (LCS):</strong> X̄̄ + A₂·R̄ = 2.972 + 0.729(1.015) = 2.972 + 0.740 = <strong>3.712</strong></li>
<li><strong>Línea central (LC):</strong> X̄̄ = <strong>2.972</strong></li>
<li><strong>Límite inferior (LCI):</strong> X̄̄ − A₂·R̄ = 2.972 − 0.740 = <strong>2.231</strong></li>
</ul>
<p>Regla: si algún X̄ de una hora cae <strong>fuera</strong> de [2.231 ; 3.712], hay señal de problema en la media del proceso.</p>`,
      },
      {
        heading: 'Paso 7 — Límites del gráfico de rangos (R)',
        body: `<p>Controlan si la **dispersión** (variabilidad pieza a pieza) se salió de lo normal:</p>
<ul class="calc-list">
<li><strong>Límite superior (LCS):</strong> D₄·R̄ = 2.282(1.015) = <strong>2.317</strong></li>
<li><strong>Línea central (LC):</strong> R̄ = <strong>1.015</strong></li>
<li><strong>Límite inferior (LCI):</strong> D₃·R̄ = 0(1.015) = <strong>0</strong></li>
</ul>
<p>Regla: si algún R horario supera 2.317 o cae por debajo de 0 (imposible en la práctica), la variabilidad del subgrupo sería anormal.</p>`,
      },
      {
        heading: 'Paso 8 — Resumen de límites (tabla final)',
        body: `<table class="data-table"><thead><tr><th>Gráfico</th><th>LCI (piso)</th><th>LC (centro)</th><th>LCS (techo)</th></tr></thead>
<tbody>
<tr><td><strong>Promedios X̄</strong></td><td>2.231</td><td>2.972</td><td>3.712</td></tr>
<tr><td><strong>Rangos R</strong></td><td>0</td><td>1.015</td><td>2.317</td></tr>
</tbody></table>
<p>Estos se dibujan como líneas horizontales en los gráficos interactivos del portafolio (línea verde = datos, líneas punteadas = límites).</p>`,
      },
      {
        heading: 'Paso 9 — Comparar cada hora contra los límites',
        body: `<p>Revisamos los 24 subgrupos. Extremos observados:</p>
<ul class="calc-list">
<li><strong>Gráfico X̄:</strong> valor más bajo = 2.64 · valor más alto = 3.39</li>
<li>¿Están entre 2.231 y 3.712? Sí → <strong>las 24 horas pasan</strong></li>
<li><strong>Gráfico R:</strong> valor más bajo = 0.32 · valor más alto = 1.58</li>
<li>¿Están entre 0 y 2.317? Sí → <strong>las 24 horas pasan</strong></li>
</ul>
<p>Ningún punto queda fuera del corredor en ninguno de los dos gráficos.</p>`,
      },
      {
        heading: 'Paso 10 — Muestra de verificación (3 horas)',
        body: `<table class="data-table"><thead><tr><th>Hora</th><th>X̄</th><th>¿X̄ OK?</th><th>R</th><th>¿R OK?</th></tr></thead>
<tbody>
<tr><td>1</td><td>3.25</td><td>2.231 ≤ 3.25 ≤ 3.712 ✓</td><td>0.71</td><td>0 ≤ 0.71 ≤ 2.317 ✓</td></tr>
<tr><td>6</td><td>2.86</td><td>✓</td><td>0.32</td><td>✓ (rango más bajo del día)</td></tr>
<tr><td>23</td><td>2.94</td><td>✓</td><td>1.58</td><td>✓ (rango más alto, aún dentro)</td></tr>
</tbody></table>
<p>Lo mismo ocurre con las otras 21 horas: todas muestran ✓ en la tabla del portafolio.</p>`,
      },
      {
        heading: 'Paso 11 — ¿Por qué dos gráficos y no uno?',
        body: `<ul class="calc-list">
<li><strong>Gráfico X̄</strong> vigila si la longitud **promedio** se desvía (¿el corte quedó más largo o más corto en general?).</li>
<li><strong>Gráfico R</strong> vigila si la **dispersión** entre piezas creció (¿hay piezas muy distintas entre sí en la misma hora?).</li>
</ul>
<p>Un proceso puede tener media estable pero variabilidad alta, o al revés. Por eso se usan **ambos**.</p>`,
      },
      {
        heading: 'Paso 12 — Conclusión estadística',
        body: `<p>Como <strong>todos</strong> los X̄ y todos los R caen dentro de sus límites:</p>
<ul class="calc-list">
<li>No hay evidencia de causas especiales en las 24 horas analizadas.</li>
<li>Las fluctuaciones son **variación común** del sistema de corte.</li>
<li>El proceso de corte preciso de alambre está <strong>bajo control estadístico</strong>.</li>
</ul>
<p>Acción gerencial: mantener el procedimiento actual; no se requiere ajuste urgente de la máquina por estos datos. Seguir monitoreando hora a hora.</p>`,
      },
    ],
    decision: {
      title: 'Conclusión gerencial',
      text: 'Durante las 24 horas muestreadas, ningún promedio ni rango salió de los límites de control. El corte de alambre es estable: la longitud media ronda 2.972 y la dispersión típica ronda 1.015. No se detectaron causas especiales; el proceso puede continuar bajo el mismo esquema de control.',
      metrics: [
        { label: 'Gran media (centro X̄)', value: '2.972' },
        { label: 'Rango promedio (centro R)', value: '1.015' },
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
    subtitle: 'Distribución de mercancía en Limón (maximización)',
    context: `Una empresa distribuidora en Limón recibe importaciones en la zona portuaria y debe repartir mercancía desde tres bodegas (Moín, Cieneguita y Liverpool) hacia cuatro centros de distribución (Limón Centro, Siquirres, Guápiles y Talamanca). Cada celda de la matriz indica la ganancia en miles de colones (₡) por cada tonelada enviada por esa ruta. El objetivo es **maximizar** la ganancia total respetando la capacidad de cada bodega y la demanda de cada centro.`,
    steps: [
      {
        heading: 'Paso 0 — Entender el problema',
        body: `<p>Antes de calcular, identificamos los elementos del modelo:</p>
<ul class="calc-list">
<li><strong>Orígenes (bodegas):</strong> O₁ Moín, O₂ Cieneguita, O₃ Liverpool</li>
<li><strong>Destinos (centros):</strong> D₁ Limón Centro, D₂ Siquirres, D₃ Guápiles, D₄ Talamanca</li>
<li><strong>Decisión:</strong> cuántas toneladas enviar de cada bodega a cada centro</li>
<li><strong>Meta:</strong> maximizar ganancia total (no minimizar costo)</li>
</ul>
<p>Los números dentro de la matriz son <strong>ganancia por tonelada</strong>, expresada en miles de colones. Por ejemplo, 16 significa ₡16 000 por tonelada de Moín hacia Limón Centro.</p>`,
      },
      {
        heading: 'Paso 1 — Matriz de ganancias (datos del ejercicio)',
        body: `<table class="data-table"><thead><tr><th>Origen / Destino</th><th>Limón C.</th><th>Siquirres</th><th>Guápiles</th><th>Talamanca</th><th>Oferta</th></tr></thead>
<tbody>
<tr><td><strong>Moín</strong></td><td>16</td><td>11</td><td>8</td><td>5</td><td>120 t</td></tr>
<tr><td><strong>Cieneguita</strong></td><td>15</td><td>12</td><td>9</td><td>6</td><td>100 t</td></tr>
<tr><td><strong>Liverpool</strong></td><td>14</td><td>13</td><td>10</td><td>7</td><td>80 t</td></tr>
<tr><td><strong>Demanda</strong></td><td>70 t</td><td>90 t</td><td>80 t</td><td>60 t</td><td>300 t</td></tr>
</tbody></table>
<p>Lectura de ejemplo: enviar 1 tonelada de Moín a Guápiles genera ganancia 8 (₡8 000). Enviar desde Liverpool a Talamanca genera 7 (₡7 000).</p>`,
      },
      {
        heading: 'Paso 2 — Variables de decisión',
        body: `<p>Definimos <strong>X<sub>ij</sub></strong> = toneladas enviadas del origen <em>i</em> al destino <em>j</em>.</p>
<ul class="calc-list">
<li>X₁₁ = toneladas Moín → Limón Centro</li>
<li>X₁₂ = toneladas Moín → Siquirres</li>
<li>X₁₃ = toneladas Moín → Guápiles</li>
<li>X₁₄ = toneladas Moín → Talamanca</li>
<li>… y así para Cieneguita (X₂ⱼ) y Liverpool (X₃ⱼ)</li>
</ul>
<p>Hay 3 × 4 = <strong>12 variables</strong>. Cada una debe ser ≥ 0.</p>`,
      },
      {
        heading: 'Paso 3 — Función objetivo (maximizar Z)',
        body: `<p>Sumamos ganancia × toneladas en cada ruta usada:</p>
<p><strong>Max Z =</strong> 16X₁₁ + 11X₁₂ + 8X₁₃ + 5X₁₄<br>
+ 15X₂₁ + 12X₂₂ + 9X₂₃ + 6X₂₄<br>
+ 14X₃₁ + 13X₃₂ + 10X₃₃ + 7X₃₄</p>
<p><strong>Z</strong> = ganancia total en <strong>miles de colones</strong>. Si Z = 3 310, la ganancia real es <strong>₡3 310 000</strong>.</p>`,
      },
      {
        heading: 'Paso 4 — Restricciones de oferta (bodegas)',
        body: `<p>Cada bodega no puede enviar más de lo que tiene:</p>
<ul class="calc-list">
<li><strong>Moín:</strong> X₁₁ + X₁₂ + X₁₃ + X₁₄ = 120</li>
<li><strong>Cieneguita:</strong> X₂₁ + X₂₂ + X₂₃ + X₂₄ = 100</li>
<li><strong>Liverpool:</strong> X₃₁ + X₃₂ + X₃₃ + X₃₄ = 80</li>
</ul>`,
      },
      {
        heading: 'Paso 5 — Restricciones de demanda (centros)',
        body: `<p>Cada centro debe recibir exactamente lo que necesita:</p>
<ul class="calc-list">
<li><strong>Limón Centro:</strong> X₁₁ + X₂₁ + X₃₁ = 70</li>
<li><strong>Siquirres:</strong> X₁₂ + X₂₂ + X₃₂ = 90</li>
<li><strong>Guápiles:</strong> X₁₃ + X₂₃ + X₃₃ = 80</li>
<li><strong>Talamanca:</strong> X₁₄ + X₂₄ + X₃₄ = 60</li>
</ul>`,
      },
      {
        heading: 'Paso 6 — Verificar balanceo',
        body: `<p>El modelo debe estar <strong>balanceado</strong>: oferta total = demanda total.</p>
<ul class="calc-list">
<li>Oferta: 120 + 100 + 80 = <strong>300 t</strong></li>
<li>Demanda: 70 + 90 + 80 + 60 = <strong>300 t</strong></li>
</ul>
<p>300 = 300 ✓ No hace falta agregar filas ni columnas ficticias. Podemos aplicar Vogel directamente.</p>`,
      },
      {
        heading: 'Paso 7 — Tabla de costo de oportunidad',
        body: `<p>Para maximizar, comparamos cuánto <strong>perdemos</strong> al no elegir la mejor ganancia de cada fila. En cada fila restamos el máximo de esa fila a cada celda:</p>
<p><strong>Fila Moín</strong> (máx = 16): 16−16=0, 16−11=5, 16−8=8, 16−5=11</p>
<p><strong>Fila Cieneguita</strong> (máx = 15): 0, 4, 7, 10 · <strong>Fila Liverpool</strong> (máx = 14): 2, 5, 6, 9</p>
<table class="data-table"><thead><tr><th></th><th>Limón C.</th><th>Siquirres</th><th>Guápiles</th><th>Talamanca</th></tr></thead>
<tbody>
<tr><td>Moín</td><td>0</td><td>5</td><td>8</td><td>11</td></tr>
<tr><td>Cieneguita</td><td>1</td><td>4</td><td>7</td><td>10</td></tr>
<tr><td>Liverpool</td><td>2</td><td>5</td><td>6</td><td>9</td></tr>
</tbody></table>
<p><strong>Regla práctica:</strong> número más bajo = ruta más conveniente en esa fila. Empezamos donde la ganancia original es mayor (celda 16) o el costo de oportunidad es 0.</p>`,
      },
      {
        heading: 'Paso 8 — Vogel: asignación 1 (Moín → Limón Centro)',
        body: `<p>La celda más rentable es <strong>Moín → Limón Centro (ganancia 16)</strong>.</p>
<ul class="calc-list">
<li>Oferta Moín = 120 t · Demanda Limón C. = 70 t</li>
<li>Asignamos <strong>min(120, 70) = 70 t</strong> → X₁₁ = 70</li>
<li>Oferta restante Moín: 120 − 70 = <strong>50 t</strong></li>
<li>Demanda restante Limón C.: 70 − 70 = <strong>0 t</strong> (columna cerrada)</li>
</ul>
<p>Limón Centro ya está satisfecho; esa columna no recibe más envíos.</p>`,
      },
      {
        heading: 'Paso 9 — Vogel: asignación 2 (Moín → Siquirres)',
        body: `<p>Seguimos en la fila de Moín (aún quedan 50 t). El siguiente menor costo de oportunidad es <strong>5</strong> → ruta Moín → Siquirres (ganancia 11).</p>
<ul class="calc-list">
<li>Oferta Moín = 50 t · Demanda Siquirres = 90 t</li>
<li>Asignamos <strong>min(50, 90) = 50 t</strong> → X₁₂ = 50</li>
<li>Oferta Moín: 50 − 50 = <strong>0</strong> (fila Moín cerrada)</li>
<li>Demanda Siquirres: 90 − 50 = <strong>40 t</strong> pendientes</li>
</ul>
<p>Parcial: Moín envió 70 t a Limón C. y 50 t a Siquirres (120 t en total).</p>`,
      },
      {
        heading: 'Paso 10 — Vogel: asignación 3 (Cieneguita → Siquirres)',
        body: `<p>Siquirres aún necesita 40 t. En la fila Cieneguita, la mejor opción disponible es Siquirres (costo opp. 4, ganancia 12).</p>
<ul class="calc-list">
<li>Oferta Cieneguita = 100 t · Demanda Siquirres = 40 t</li>
<li>Asignamos <strong>min(100, 40) = 40 t</strong> → X₂₂ = 40</li>
<li>Oferta Cieneguita: 100 − 40 = <strong>60 t</strong></li>
<li>Demanda Siquirres: 40 − 40 = <strong>0</strong> (columna cerrada)</li>
</ul>`,
      },
      {
        heading: 'Paso 11 — Vogel: asignación 4 (Cieneguita → Guápiles)',
        body: `<ul class="calc-list">
<li>Oferta Cieneguita = 60 t · Demanda Guápiles = 80 t</li>
<li>Asignamos <strong>min(60, 80) = 60 t</strong> → X₂₃ = 60</li>
<li>Oferta Cieneguita: 60 − 60 = <strong>0</strong> (fila cerrada)</li>
<li>Demanda Guápiles: 80 − 60 = <strong>20 t</strong> pendientes</li>
</ul>`,
      },
      {
        heading: 'Paso 12 — Vogel: asignación 5 (Liverpool → Guápiles)',
        body: `<ul class="calc-list">
<li>Oferta Liverpool = 80 t · Demanda Guápiles = 20 t</li>
<li>Asignamos <strong>min(80, 20) = 20 t</strong> → X₃₃ = 20</li>
<li>Oferta Liverpool: 80 − 20 = <strong>60 t</strong></li>
<li>Demanda Guápiles: 20 − 20 = <strong>0</strong></li>
</ul>`,
      },
      {
        heading: 'Paso 13 — Vogel: asignación 6 (Liverpool → Talamanca)',
        body: `<ul class="calc-list">
<li>Oferta Liverpool = 60 t · Demanda Talamanca = 60 t</li>
<li>Asignamos <strong>min(60, 60) = 60 t</strong> → X₃₄ = 60</li>
<li>Oferta y demanda restantes = <strong>0</strong> ✓</li>
</ul>
<p><strong>Tabla final de asignación (toneladas):</strong></p>
<table class="data-table"><thead><tr><th></th><th>Limón C.</th><th>Siquirres</th><th>Guápiles</th><th>Talamanca</th><th>Oferta</th></tr></thead>
<tbody>
<tr><td>Moín</td><td><strong>70</strong></td><td><strong>50</strong></td><td>0</td><td>0</td><td>120</td></tr>
<tr><td>Cieneguita</td><td>0</td><td><strong>40</strong></td><td><strong>60</strong></td><td>0</td><td>100</td></tr>
<tr><td>Liverpool</td><td>0</td><td>0</td><td><strong>20</strong></td><td><strong>60</strong></td><td>80</td></tr>
<tr><td>Demanda</td><td>70</td><td>90</td><td>80</td><td>60</td><td>300</td></tr>
</tbody></table>`,
      },
      {
        heading: 'Paso 14 — Calcular ganancia total Z',
        body: `<p>Solo multiplicamos las celdas <strong>con toneladas asignadas</strong> por su ganancia unitaria:</p>
<ul class="calc-list">
<li>Moín → Limón C.: 16 × 70 = <strong>1 120</strong></li>
<li>Moín → Siquirres: 11 × 50 = <strong>550</strong></li>
<li>Cieneguita → Siquirres: 12 × 40 = <strong>480</strong></li>
<li>Cieneguita → Guápiles: 9 × 60 = <strong>540</strong></li>
<li>Liverpool → Guápiles: 10 × 20 = <strong>200</strong></li>
<li>Liverpool → Talamanca: 7 × 60 = <strong>420</strong></li>
</ul>
<p><strong>Z = 1 120 + 550 + 480 + 540 + 200 + 420 = 3 310</strong> (miles)</p>
<p>Ganancia total = <strong>₡3 310 000</strong></p>`,
      },
      {
        heading: 'Paso 15 — Salto de piedra (¿es óptima?)',
        body: `<p>Verificamos si Vogel ya dio la mejor solución:</p>
<ul class="calc-list">
<li>Celdas básicas: m + n − 1 = 3 + 4 − 1 = <strong>6</strong> ✓ (tenemos 6 rutas activas)</li>
<li>Evaluamos una celda vacía, ej. X₁₃ (Moín → Guápiles, ganancia 8)</li>
<li>Circuito: X₁₃(+) → X₁₂(−) → X₂₂(+) → X₂₃(−) → X₁₃</li>
<li>Δ = +8 − 11 + 12 − 9 = <strong>0</strong></li>
</ul>
<p>Como Δ = 0, mover toneladas por esa ruta <strong>no mejora</strong> la ganancia. Al evaluar las demás celdas vacías también da 0 → la solución de Vogel está <strong>maximizada</strong>.</p>`,
      },
    ],
    decision: {
      title: 'Decisión de distribución',
      text: 'Enviar 70 t de Moín a Limón Centro y 50 t a Siquirres; 40 t de Cieneguita a Siquirres y 60 t a Guápiles; 20 t de Liverpool a Guápiles y 60 t a Talamanca. Es el plan que maximiza ganancia (₡3 310 000) sin violar capacidades ni demandas. Moín concentra las rutas más rentables; Liverpool cubre el remanente hacia Guápiles y Talamanca.',
      metrics: [{ label: 'Ganancia total', value: '₡3 310 000' }, { label: 'Rutas activas', value: '6 de 12' }, { label: 'Optimalidad', value: 'Confirmada (Δ = 0)' }],
    },
  },

  'trans-assign': {
    title: 'Modelo de Asignación — Camiones',
    subtitle: 'Rendimiento camión × ruta (maximización)',
    context: `La misma empresa tiene 4 camiones y 4 rutas fijas (Limón Centro, Siquirres, Guápiles, Talamanca). Cada camión rinde distinto en cada ruta por terreno, combustible y carga. Solo puede ir **un camión por ruta** y **cada camión a una sola ruta**. Buscamos la asignación que **maximice el rendimiento total**.`,
    steps: [
      {
        heading: 'Paso 0 — Diferencia con transporte',
        body: `<p>En <strong>transporte</strong> enviamos cantidades (toneladas) por muchas rutas a la vez. En <strong>asignación</strong> cada fila (camión) se asigna a <strong>exactamente una</strong> columna (ruta), y cada ruta recibe <strong>exactamente un</strong> camión. Es un problema de emparejar 4 camiones con 4 rutas.</p>`,
      },
      {
        heading: 'Paso 1 — Matriz de rendimiento',
        body: `<p>Cada número es el desempeño del camión en esa ruta (mayor = mejor):</p>
<table class="data-table"><thead><tr><th>Camión / Ruta</th><th>Limón C.</th><th>Siquirres</th><th>Guápiles</th><th>Talamanca</th></tr></thead>
<tbody>
<tr><td><strong>Camión 1</strong></td><td>90</td><td>75</td><td>70</td><td>60</td></tr>
<tr><td><strong>Camión 2</strong></td><td>80</td><td>88</td><td>82</td><td>74</td></tr>
<tr><td><strong>Camión 3</strong></td><td>70</td><td>78</td><td>92</td><td>85</td></tr>
<tr><td><strong>Camión 4</strong></td><td>75</td><td>80</td><td>86</td><td>95</td></tr>
</tbody></table>
<p>Ejemplo: Camión 3 en Guápiles rinde 92; Camión 4 en Talamanca rinde 95 (el valor más alto de toda la matriz).</p>`,
      },
      {
        heading: 'Paso 2 — Variables de decisión',
        body: `<p><strong>y<sub>ij</sub></strong> = 1 si el camión <em>i</em> se asigna a la ruta <em>j</em>; 0 si no.</p>
<p>Hay 4 × 4 = 16 variables, pero solo <strong>4 valdrán 1</strong> (una por camión y una por ruta).</p>
<p>Ejemplos: y₁₁ = 1 → Camión 1 va a Limón Centro · y₄₄ = 1 → Camión 4 va a Talamanca</p>`,
      },
      {
        heading: 'Paso 3 — Función objetivo',
        body: `<p><strong>Max Z =</strong> 90y₁₁ + 75y₁₂ + 70y₁₃ + 60y₁₄<br>
+ 80y₂₁ + 88y₂₂ + 82y₂₃ + 74y₂₄<br>
+ 70y₃₁ + 78y₃₂ + 92y₃₃ + 85y₃₄<br>
+ 75y₄₁ + 80y₄₂ + 86y₄₃ + 95y₄₄</p>
<p>Como cada y<sub>ij</sub> es 0 o 1, al final Z será la <strong>suma de 4 rendimientos</strong> (uno por camión asignado).</p>`,
      },
      {
        heading: 'Paso 4 — Restricciones',
        body: `<p><strong>Cada camión a exactamente una ruta:</strong></p>
<ul class="calc-list">
<li>Camión 1: y₁₁ + y₁₂ + y₁₃ + y₁₄ = 1</li>
<li>Camión 2: y₂₁ + y₂₂ + y₂₃ + y₂₄ = 1</li>
<li>Camión 3: y₃₁ + y₃₂ + y₃₃ + y₃₄ = 1</li>
<li>Camión 4: y₄₁ + y₄₂ + y₄₃ + y₄₄ = 1</li>
</ul>
<p><strong>Cada ruta con exactamente un camión:</strong></p>
<ul class="calc-list">
<li>Limón C.: y₁₁ + y₂₁ + y₃₁ + y₄₁ = 1</li>
<li>Siquirres: y₁₂ + y₂₂ + y₃₂ + y₄₂ = 1</li>
<li>Guápiles: y₁₃ + y₂₃ + y₃₃ + y₄₃ = 1</li>
<li>Talamanca: y₁₄ + y₂₄ + y₃₄ + y₄₄ = 1</li>
</ul>
<p>Todas las y<sub>ij</sub> ∈ {0, 1}</p>`,
      },
      {
        heading: 'Paso 5 — Convertir maximización (restar el máximo)',
        body: `<p>Para aplicar el método de asignación estándar, restamos el <strong>valor máximo de la matriz (95)</strong> a cada celda. Esto transforma el problema en uno equivalente de minimización de “costo de oportunidad”:</p>
<table class="data-table"><thead><tr><th></th><th>Limón C.</th><th>Siquirres</th><th>Guápiles</th><th>Talamanca</th></tr></thead>
<tbody>
<tr><td>Camión 1</td><td>95−90=5</td><td>20</td><td>25</td><td>35</td></tr>
<tr><td>Camión 2</td><td>15</td><td>7</td><td>13</td><td>21</td></tr>
<tr><td>Camión 3</td><td>25</td><td>17</td><td>3</td><td>10</td></tr>
<tr><td>Camión 4</td><td>20</td><td>15</td><td>9</td><td>0</td></tr>
</tbody></table>
<p>Los ceros indican las mejores opciones relativas tras la transformación.</p>`,
      },
      {
        heading: 'Paso 6 — Reducción por filas',
        body: `<p>En cada fila restamos el <strong>mínimo de esa fila</strong> a todos sus valores (para crear más ceros):</p>
<ul class="calc-list">
<li>Fila Camión 1 (mín = 5): 5−5=0, 20−5=15, 25−5=20, 35−5=30</li>
<li>Fila Camión 2 (mín = 7): 15−7=8, 0, 6, 14</li>
<li>Fila Camión 3 (mín = 3): 22, 14, 0, 7</li>
<li>Fila Camión 4 (mín = 0): ya tiene un 0, fila sin cambio</li>
</ul>
<table class="data-table"><thead><tr><th></th><th>Limón C.</th><th>Siquirres</th><th>Guápiles</th><th>Talamanca</th></tr></thead>
<tbody>
<tr><td>Camión 1</td><td>0</td><td>15</td><td>20</td><td>30</td></tr>
<tr><td>Camión 2</td><td>8</td><td>0</td><td>6</td><td>14</td></tr>
<tr><td>Camión 3</td><td>22</td><td>14</td><td>0</td><td>7</td></tr>
<tr><td>Camión 4</td><td>20</td><td>15</td><td>9</td><td>0</td></tr>
</tbody></table>`,
      },
      {
        heading: 'Paso 7 — Reducción por columnas',
        body: `<p>Repetimos el proceso por columnas (restar el mínimo de cada columna). Como ya hay ceros en cada columna, los mínimos columnares son 0 y la matriz <strong>no cambia</strong> en este ejercicio.</p>
<p>Ya tenemos suficientes ceros para intentar una asignación completa.</p>`,
      },
      {
        heading: 'Paso 8 — Asignación óptima (celdas en 0)',
        body: `<p>Buscamos un conjunto de ceros donde <strong>cada fila y cada columna tenga exactamente un cero seleccionado</strong>:</p>
<table class="data-table"><thead><tr><th>Asignación</th><th>Celda cero</th><th>Rendimiento original</th></tr></thead>
<tbody>
<tr><td>Camión 1 → Limón Centro</td><td>(1,1)</td><td><strong>90</strong></td></tr>
<tr><td>Camión 2 → Siquirres</td><td>(2,2)</td><td><strong>88</strong></td></tr>
<tr><td>Camión 3 → Guápiles</td><td>(3,3)</td><td><strong>92</strong></td></tr>
<tr><td>Camión 4 → Talamanca</td><td>(4,4)</td><td><strong>95</strong></td></tr>
</tbody></table>
<p>Matriz de asignación (1 = asignado):</p>
<table class="data-table"><thead><tr><th></th><th>Limón C.</th><th>Siquirres</th><th>Guápiles</th><th>Talamanca</th></tr></thead>
<tbody>
<tr><td>Camión 1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>Camión 2</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>Camión 3</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>Camión 4</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
</tbody></table>`,
      },
      {
        heading: 'Paso 9 — Calcular Z y verificar',
        body: `<p>Sumamos los rendimientos de las celdas asignadas en la <strong>matriz original</strong> (no la reducida):</p>
<ul class="calc-list">
<li>Camión 1 → Limón C.: <strong>90</strong></li>
<li>Camión 2 → Siquirres: <strong>88</strong></li>
<li>Camión 3 → Guápiles: <strong>92</strong></li>
<li>Camión 4 → Talamanca: <strong>95</strong></li>
</ul>
<p><strong>Z = 90 + 88 + 92 + 95 = 365</strong></p>
<p>Verificación rápida: ¿podría Camión 4 ir a Guápiles (86) en lugar de Talamanca? Sí, pero entonces otro camión perdería su mejor ruta y el total bajaría. Esta asignación en diagonal es la óptima del método.</p>`,
      },
    ],
    decision: {
      title: 'Decisión operativa diaria',
      text: 'Plan de despacho: Camión 1 → Limón Centro, Camión 2 → Siquirres, Camión 3 → Guápiles, Camión 4 → Talamanca. Rendimiento total 365 unidades. Cada ruta queda cubierta con el camión que mejor desempeño tiene en ese tramo, sin repetir camiones ni dejar rutas sin asignar.',
      metrics: [{ label: 'Z máximo', value: '365' }, { label: 'Camión estrella', value: 'C4 → Talamanca (95)' }, { label: 'Rutas cubiertas', value: '4 / 4' }],
    },
  },

  'prog-goals': {
    title: 'Programación por Metas',
    subtitle: 'Panadería La Espiga Dorada — Grecia',
    context: `Panadería artesanal en Grecia (Alajuela) que produce pan (x) y repostería fina (y). Debe cumplir **tres metas en orden de prioridad**: P1 ganancia $2 200, P2 exactamente 160 horas laborales, P3 energía ≤ 300 kWh. A diferencia de programación lineal clásica, aquí no todas las metas se cumplen al 100%: el modelo busca el **mejor compromiso** minimizando desviaciones indeseables.`,
    steps: [
      {
        heading: 'Paso 0 — Entender el problema',
        body: `<p>La gerencia decide <strong>cuántos lotes</strong> de cada producto hacer por semana. No hay una sola meta: hay tres, y la P1 (dinero) es más importante que la P2 (horas), y la P2 más que la P3 (energía).</p>
<p><strong>Datos por lote:</strong></p>
<table class="data-table"><thead><tr><th>Producto</th><th>Variable</th><th>Ganancia</th><th>Horas</th><th>Energía</th></tr></thead>
<tbody>
<tr><td>Pan artesanal</td><td>x</td><td>$30</td><td>2 h</td><td>5 kWh</td></tr>
<tr><td>Repostería fina</td><td>y</td><td>$50</td><td>4 h</td><td>8 kWh</td></tr>
</tbody></table>`,
      },
      {
        heading: 'Paso 1 — Variables de decisión',
        body: `<ul class="calc-list">
<li><strong>x</strong> = lotes semanales de pan artesanal (≥ 0)</li>
<li><strong>y</strong> = lotes semanales de repostería fina (≥ 0)</li>
</ul>
<p>Son las únicas decisiones que controla la gerencia.</p>`,
      },
      {
        heading: 'Paso 2 — Metas y prioridades',
        body: `<table class="data-table"><thead><tr><th>Prioridad</th><th>Meta</th><th>Valor objetivo</th><th>Desviación a evitar</th></tr></thead>
<tbody>
<tr><td><strong>P1</strong></td><td>Rentabilidad</td><td>$2 200 exactos</td><td>d1⁻ (faltante de dinero)</td></tr>
<tr><td><strong>P2</strong></td><td>Acuerdo laboral</td><td>160 h exactas</td><td>d2⁻ y d2⁺ (faltante o exceso de horas)</td></tr>
<tr><td><strong>P3</strong></td><td>Política ambiental</td><td>≤ 300 kWh</td><td>d3⁺ (exceso de energía)</td></tr>
</tbody></table>
<p>P1 tiene peso infinito relativo frente a P3: primero se protege el dinero, luego las horas, y al final la energía.</p>`,
      },
      {
        heading: 'Paso 3 — Variables de desviación',
        body: `<p>Cada meta se convierte en ecuación con variables que miden <strong>cuánto nos fallamos</strong>:</p>
<ul class="calc-list">
<li><strong>d1⁻</strong> = dólares que faltan para llegar a $2 200 · <strong>d1⁺</strong> = dólares de más</li>
<li><strong>d2⁻</strong> = horas que faltan · <strong>d2⁺</strong> = horas de más (extras)</li>
<li><strong>d3⁻</strong> = kWh ahorrados bajo 300 · <strong>d3⁺</strong> = kWh de exceso sobre 300</li>
</ul>
<p>Todas las desviaciones son ≥ 0.</p>`,
      },
      {
        heading: 'Paso 4 — Restricciones por metas (ecuaciones)',
        body: `<p>Cada meta pasa de desigualdad a igualdad sumando/restando desviaciones:</p>
<ul class="calc-list">
<li><strong>Meta 1 (ganancia):</strong> 30x + 50y + d1⁻ − d1⁺ = 2 200</li>
<li><strong>Meta 2 (horas):</strong> 2x + 4y + d2⁻ − d2⁺ = 160</li>
<li><strong>Meta 3 (energía):</strong> 5x + 8y + d3⁻ − d3⁺ = 300</li>
</ul>
<p>Ejemplo de lectura: si producimos poco, entra d1⁻ para “llenar” hasta 2 200. Si nos pasamos de energía, entra d3⁺.</p>`,
      },
      {
        heading: 'Paso 5 — Función objetivo',
        body: `<p><strong>Min Z = P1(d1⁻) + P2(d2⁻ + d2⁺) + P3(d3⁺)</strong></p>
<p>Solo penalizamos desviaciones <strong>indeseables</strong>:</p>
<ul class="calc-list">
<li>No penalizamos d1⁺ (ganar de más no molesta en P1)</li>
<li>No penalizamos d3⁻ (gastar menos energía tampoco)</li>
</ul>
<p>Los pesos P1, P2, P3 son muy grandes en orden decreciente (P1 ≫ P2 ≫ P3).</p>`,
      },
      {
        heading: 'Paso 6 — Resolver P1 y P2 primero (sustitución)',
        body: `<p>Como P1 y P2 son prioritarias, buscamos cumplirlas <strong>sin desviación</strong>: d1⁻ = d1⁺ = d2⁻ = d2⁺ = 0.</p>
<p>Quedan dos ecuaciones:</p>
<ul class="calc-list">
<li>30x + 50y = 2 200 … (1)</li>
<li>2x + 4y = 160 … (2)</li>
</ul>
<p>Simplificamos dividiendo (1) entre 10 y (2) entre 2:</p>
<ul class="calc-list">
<li>3x + 5y = 220</li>
<li>x + 2y = 80</li>
</ul>`,
      },
      {
        heading: 'Paso 7 — Despeje de x e y',
        body: `<p>De <strong>x + 2y = 80</strong> despejamos:</p>
<p><strong>x = 80 − 2y</strong></p>
<p>Sustituimos en <strong>3x + 5y = 220</strong>:</p>
<ul class="calc-list">
<li>3(80 − 2y) + 5y = 220</li>
<li>240 − 6y + 5y = 220</li>
<li>240 − y = 220</li>
<li><strong>y = 20</strong></li>
</ul>
<p>Entonces <strong>x = 80 − 2(20) = 40</strong></p>
<p><strong>Plan provisional:</strong> 40 lotes de pan y 20 de repostería.</p>`,
      },
      {
        heading: 'Paso 8 — Verificar Meta 1 (ganancia)',
        body: `<p>Ganancia = 30(40) + 50(20) = 1 200 + 1 000 = <strong>$2 200</strong></p>
<ul class="calc-list">
<li>Meta: $2 200 · Resultado: $2 200</li>
<li>d1⁻ = 0 · d1⁺ = 0 ✓</li>
</ul>
<p>La meta financiera se cumple exactamente.</p>`,
      },
      {
        heading: 'Paso 9 — Verificar Meta 2 (horas)',
        body: `<p>Horas = 2(40) + 4(20) = 80 + 80 = <strong>160 h</strong></p>
<ul class="calc-list">
<li>Meta: 160 h exactas · Resultado: 160 h</li>
<li>d2⁻ = 0 · d2⁺ = 0 ✓</li>
</ul>
<p>No hay horas faltantes ni extras: se respeta el acuerdo con el personal.</p>`,
      },
      {
        heading: 'Paso 10 — Evaluar Meta 3 (energía)',
        body: `<p>Energía = 5(40) + 8(20) = 200 + 160 = <strong>360 kWh</strong></p>
<p>Meta ambiental: máximo 300 kWh → nos pasamos por <strong>60 kWh</strong>.</p>
<p>En la ecuación: 5x + 8y + d3⁻ − d3⁺ = 300</p>
<p>360 + 0 − d3⁺ = 300 → <strong>d3⁺ = 60</strong></p>
<p>Es el “precio” del compromiso: cumplir P1 y P2 obliga a exceder la meta ambiental.</p>`,
      },
      {
        heading: 'Paso 11 — Valor de Z y conclusión del modelo',
        body: `<p>Con d1⁻ = d2⁻ = d2⁺ = 0 y d3⁺ = 60:</p>
<p><strong>Min Z = P1(0) + P2(0) + P3(60) = 60·P3</strong></p>
<p>No existe otra producción que cumpla P1 y P2 con menor exceso de energía. La solución del modelo por metas es <strong>x* = 40, y* = 20</strong>.</p>`,
      },
    ],
    decision: {
      title: 'Decisión de producción',
      text: 'Producir 40 lotes de pan y 20 de repostería cumple rentabilidad ($2 200) y acuerdo laboral (160 h), pero excede la meta ambiental en 60 kWh. La gerencia debe negociar con la municipalidad, invertir en hornos eficientes o aceptar el exceso; las metas P1 y P2 tienen prioridad absoluta sobre P3.',
      metrics: [{ label: 'x* pan', value: '40 lotes' }, { label: 'y* repostería', value: '20 lotes' }, { label: 'Exceso energía d3⁺', value: '60 kWh' }],
    },
  },

  'prog-nonlinear': {
    title: 'Programación No Lineal',
    subtitle: 'Fábrica — Productos A y B',
    context: `Una fábrica produce productos A (x unidades) y B (y unidades). Los ingresos tienen **rendimientos decrecientes** (curvas cuadráticas), pero los costos son lineales. Se busca el beneficio máximo respetando horas de máquina y materia prima. Es programación **no lineal** porque la función objetivo tiene términos x² e y².`,
    steps: [
      {
        heading: 'Paso 0 — Entender el enunciado',
        body: `<ul class="calc-list">
<li><strong>Ingreso A:</strong> 40x − x² (dólares)</li>
<li><strong>Ingreso B:</strong> 50y − 2y² (dólares)</li>
<li><strong>Costo A:</strong> 5x · <strong>Costo B:</strong> 8y</li>
<li><strong>Restricción 1:</strong> 2x + 3y ≤ 120 (horas máquina)</li>
<li><strong>Restricción 2:</strong> x + 2y ≤ 80 (materia prima)</li>
</ul>
<p>Variables: x, y ≥ 0 (cantidades a producir).</p>`,
      },
      {
        heading: 'Paso 1 — Construir la función objetivo',
        body: `<p><strong>Beneficio = Ingreso − Costo</strong> para cada producto:</p>
<ul class="calc-list">
<li>Beneficio A: (40x − x²) − 5x = <strong>35x − x²</strong></li>
<li>Beneficio B: (50y − 2y²) − 8y = <strong>42y − 2y²</strong></li>
</ul>
<p><strong>Max Z = 35x − x² + 42y − 2y²</strong></p>
<p>Esta Z es la ganancia total en dólares. Los términos cuadráticos (−x², −2y²) modelan que vender mucho baja el precio unitario efectivo.</p>`,
      },
      {
        heading: 'Paso 2 — Restricciones del modelo',
        body: `<ul class="calc-list">
<li>2x + 3y ≤ 120 &nbsp;(horas de máquina disponibles)</li>
<li>x + 2y ≤ 80 &nbsp;(materia prima disponible)</li>
<li>x ≥ 0, y ≥ 0 &nbsp;(no se produce cantidades negativas)</li>
</ul>
<p>En conjunto definen la <strong>región factible</strong> (polígono en el plano x-y).</p>`,
      },
      {
        heading: 'Paso 3 — Método: punto crítico sin restricciones',
        body: `<p>Primero maximizamos Z como si no hubiera límites. Para funciones suaves, el máximo interior cumple <strong>derivadas parciales = 0</strong>.</p>
<p>Separar Z en partes:</p>
<ul class="calc-list">
<li>f(x) = 35x − x² → f′(x) = 35 − 2x</li>
<li>g(y) = 42y − 2y² → g′(y) = 42 − 4y</li>
</ul>`,
      },
      {
        heading: 'Paso 4 — Resolver ∂Z/∂x = 0',
        body: `<ul class="calc-list">
<li>35 − 2x = 0</li>
<li>2x = 35</li>
<li><strong>x = 17.5</strong></li>
</ul>
<p>Interpretación: sin restricciones, lo óptimo sería producir 17.5 unidades de A.</p>`,
      },
      {
        heading: 'Paso 5 — Resolver ∂Z/∂y = 0',
        body: `<ul class="calc-list">
<li>42 − 4y = 0</li>
<li>4y = 42</li>
<li><strong>y = 10.5</strong></li>
</ul>
<p>Punto crítico candidato: <strong>(17.5 , 10.5)</strong></p>`,
      },
      {
        heading: 'Paso 6 — Verificar factibilidad (restricción 1)',
        body: `<p>2x + 3y ≤ 120</p>
<ul class="calc-list">
<li>2(17.5) + 3(10.5) = 35 + 31.5 = <strong>66.5</strong></li>
<li>66.5 ≤ 120 ✓</li>
</ul>
<p>Usamos 66.5 de 120 horas → hay <strong>holgura</strong> de 53.5 h.</p>`,
      },
      {
        heading: 'Paso 7 — Verificar factibilidad (restricción 2)',
        body: `<p>x + 2y ≤ 80</p>
<ul class="calc-list">
<li>17.5 + 2(10.5) = 17.5 + 21 = <strong>38.5</strong></li>
<li>38.5 ≤ 80 ✓</li>
</ul>
<p>El punto crítico está <strong>dentro</strong> de la región factible → no choca con ningún límite.</p>`,
      },
      {
        heading: 'Paso 8 — Calcular Z* (beneficio máximo)',
        body: `<p>Sustituimos x = 17.5, y = 10.5 en Z:</p>
<ul class="calc-list">
<li>35(17.5) = 612.50</li>
<li>−(17.5)² = −306.25</li>
<li>42(10.5) = 441.00</li>
<li>−2(10.5)² = −220.50</li>
</ul>
<p><strong>Z* = 612.50 − 306.25 + 441.00 − 220.50 = $526.75</strong></p>`,
      },
      {
        heading: 'Paso 9 — Interpretación gerencial',
        body: `<table class="data-table"><thead><tr><th>Concepto</th><th>Valor</th><th>Significado</th></tr></thead>
<tbody>
<tr><td>x* (Producto A)</td><td>17.5 u</td><td>Cantidad óptima de A</td></tr>
<tr><td>y* (Producto B)</td><td>10.5 u</td><td>Cantidad óptima de B</td></tr>
<tr><td>Horas usadas</td><td>66.5 / 120</td><td>Máquina no saturada (55% aprox.)</td></tr>
<tr><td>Materia prima</td><td>38.5 / 80</td><td>Holgura para crecer</td></tr>
<tr><td>Z*</td><td>$526.75</td><td>Beneficio máximo alcanzable</td></tr>
</tbody></table>
<p>Como el óptimo sin restricciones ya es factible, <strong>no hace falta</strong> buscar en las esquinas del polígono: (17.5, 10.5) es la solución global.</p>`,
      },
    ],
    decision: {
      title: 'Decisión de producción',
      text: 'Producir 17.5 unidades de A y 10.5 de B maximiza el beneficio ($526.75). Los recursos no están al 100%: la fábrica podría crecer en volumen antes de topar con horas o materia prima. Si solo se permitieran enteros, habría que evaluar puntos (17,10), (18,10), etc. — este ejercicio admite fracciones.',
      metrics: [{ label: 'x*', value: '17.5 u' }, { label: 'y*', value: '10.5 u' }, { label: 'Z*', value: '$526.75' }],
    },
  },

  'prog-integer': {
    title: 'Programación Entera Pura',
    subtitle: 'Taller textil — Camisas y pantalones',
    context: `Un taller textil confecciona **camisas completas** y **pantalones completos**. No se pueden hacer medias prendas: las cantidades deben ser **números enteros**. Hay tres recursos limitados (tela, tiempo, botones). Objetivo: **maximizar ganancia semanal** sin pasarse de lo disponible.`,
    steps: [
      {
        heading: 'Paso 0 — Datos del taller',
        body: `<table class="data-table"><thead><tr><th>Recurso</th><th>Por camisa</th><th>Por pantalón</th><th>Disponible</th></tr></thead>
<tbody>
<tr><td>Tela (m)</td><td>1</td><td>2</td><td>10</td></tr>
<tr><td>Tiempo (h)</td><td>2</td><td>1</td><td>11</td></tr>
<tr><td>Botones (cajas)</td><td>1</td><td>1</td><td>9</td></tr>
<tr><td>Ganancia</td><td>$60</td><td>$50</td><td>—</td></tr>
</tbody></table>
<p>Ejemplo: 1 camisa usa 1 m tela, 2 h y 1 caja de botones y deja $60.</p>`,
      },
      {
        heading: 'Paso 1 — Variables de decisión',
        body: `<ul class="calc-list">
<li><strong>x₁</strong> = número de camisas a producir esta semana (entero ≥ 0)</li>
<li><strong>x₂</strong> = número de pantalones a producir (entero ≥ 0)</li>
</ul>`,
      },
      {
        heading: 'Paso 2 — Función objetivo',
        body: `<p><strong>Max Z = 60x₁ + 50x₂</strong></p>
<p>Cada camisa aporta $60; cada pantalón $50. Queremos la combinación entera que más dinero deje.</p>`,
      },
      {
        heading: 'Paso 3 — Restricciones',
        body: `<ul class="calc-list">
<li><strong>Tela:</strong> x₁ + 2x₂ ≤ 10</li>
<li><strong>Tiempo:</strong> 2x₁ + x₂ ≤ 11</li>
<li><strong>Botones:</strong> x₁ + x₂ ≤ 9</li>
<li><strong>Enteridad:</strong> x₁, x₂ ∈ {0, 1, 2, 3, …}</li>
</ul>
<p>Las tres primeras son lineales; la enteridad es lo que distingue este modelo de programación lineal continua.</p>`,
      },
      {
        heading: 'Paso 4 — Rectas frontera (igualdades)',
        body: `<p>Para graficar, usamos las igualdades de cada restricción:</p>
<ul class="calc-list">
<li><strong>R1 (tela):</strong> x₁ + 2x₂ = 10 → pasa por (10, 0) y (0, 5)</li>
<li><strong>R2 (tiempo):</strong> 2x₁ + x₂ = 11 → pasa por (5.5, 0) y (0, 11)</li>
<li><strong>R3 (botones):</strong> x₁ + x₂ = 9 → pasa por (9, 0) y (0, 9)</li>
</ul>
<p>La región factible es el polígono donde se cumplen las tres desigualdades simultáneamente (primer cuadrante).</p>`,
      },
      {
        heading: 'Paso 5 — Vértices candidatos de la región',
        body: `<p>En programación lineal, el óptimo continuo está en un <strong>vértice</strong>. Calculamos intersecciones factibles:</p>
<ul class="calc-list">
<li><strong>(0, 0):</strong> origen · Z = $0</li>
<li><strong>(5.5, 0):</strong> R2 con eje x · cumple R1 y R3 · Z = 60(5.5) = $330</li>
<li><strong>(0, 5):</strong> R1 con eje y · cumple R2 y R3 · Z = 50(5) = $250</li>
<li><strong>(4, 3):</strong> cruce R1 ∩ R2 (ver paso 6) · Z = $390</li>
</ul>
<p>El vértice con mayor Z continuo es (4, 3).</p>`,
      },
      {
        heading: 'Paso 6 — Intersección R1 ∩ R2 (tela y tiempo)',
        body: `<p>Resolvemos el sistema:</p>
<ul class="calc-list">
<li>x₁ + 2x₂ = 10 … (R1)</li>
<li>2x₁ + x₂ = 11 … (R2)</li>
</ul>
<p>De R2: <strong>x₂ = 11 − 2x₁</strong></p>
<p>Sustituimos en R1:</p>
<ul class="calc-list">
<li>x₁ + 2(11 − 2x₁) = 10</li>
<li>x₁ + 22 − 4x₁ = 10</li>
<li>−3x₁ = −12</li>
<li><strong>x₁ = 4</strong></li>
</ul>
<p>Entonces x₂ = 11 − 2(4) = <strong>3</strong> → punto <strong>(4, 3)</strong></p>
<p>Verificamos botones: 4 + 3 = 7 ≤ 9 ✓ (factible)</p>`,
      },
      {
        heading: 'Paso 7 — Evaluar Z en cada vértice',
        body: `<table class="data-table"><thead><tr><th>Vértice (x₁, x₂)</th><th>Cálculo Z = 60x₁ + 50x₂</th><th>Ganancia</th></tr></thead>
<tbody>
<tr><td>(0, 0)</td><td>0</td><td>$0</td></tr>
<tr><td>(5.5, 0)</td><td>60(5.5) = 330</td><td>$330</td></tr>
<tr><td>(0, 5)</td><td>50(5) = 250</td><td>$250</td></tr>
<tr><td><strong>(4, 3)</strong></td><td>60(4) + 50(3) = 240 + 150</td><td><strong>$390</strong></td></tr>
</tbody></table>
<p>(4, 3) da la mayor ganancia.</p>`,
      },
      {
        heading: 'Paso 8 — ¿Por qué no hay que redondear?',
        body: `<p>En programación entera, si el mejor vértice del relajamiento lineal ya tiene coordenadas <strong>enteras</strong>, ese punto es automáticamente óptimo entero.</p>
<p>(4, 3) tiene x₁ = 4 y x₂ = 3 (ambos enteros) → <strong>solución óptima directa</strong>, sin branch-and-bound ni redondeo.</p>
<p>Si el vértice fuera (4.2, 2.8), habría que probar combinaciones enteras cercanas.</p>`,
      },
      {
        heading: 'Paso 9 — Verificación completa de (4, 3)',
        body: `<ul class="calc-list">
<li><strong>Tela:</strong> 4 + 2(3) = 4 + 6 = 10 ≤ 10 ✓ (activa al 100% — cuello de botella)</li>
<li><strong>Tiempo:</strong> 2(4) + 3 = 8 + 3 = 11 ≤ 11 ✓ (activa al 100%)</li>
<li><strong>Botones:</strong> 4 + 3 = 7 ≤ 9 ✓ (sobran 2 cajas — holgura)</li>
<li><strong>Ganancia:</strong> Z = 60(4) + 50(3) = <strong>$390/semana</strong></li>
</ul>`,
      },
      {
        heading: 'Paso 10 — Interpretación para el taller',
        body: `<p>Producir <strong>4 camisas y 3 pantalones</strong> agota tela y tiempo: esos son los recursos que limitan la producción. Los botones no limitan (quedan 2 cajas sin usar).</p>
<p>Si el taller quisiera más ganancia, necesitaría más tela o más horas de costura, no más botones.</p>`,
      },
    ],
    decision: {
      title: 'Decisión de planificación semanal',
      text: 'Producir 4 camisas y 3 pantalones genera $390/semana, el máximo posible con los recursos actuales. Tela y tiempo son cuellos de botella al 100%; botones tienen holgura de 2 cajas. Plan operativo: asignar costura y tela a esa mezcla antes de considerar otras combinaciones.',
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
