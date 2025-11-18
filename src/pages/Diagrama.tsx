import React, { useEffect, useRef, useState } from "react";
import {
  IonCard,
  IonContent,
  IonIcon,
  IonPage,
  IonPopover,
  IonTitle,
  IonItem,
  IonButton,
  IonBadge,
} from "@ionic/react";
import {
  alertCircleOutline,
  arrowDownOutline,
  time,
  closeCircleOutline,
  refresh,
} from "ionicons/icons";
import "./Diagrama.css";

type NivelFlujoId = "basico" | "intermedio" | "avanzado";

type ProblematicaFlujoId =
  | "ventilador_electrico"
  | "celular_solar"
  | "auto"
  | "molino_viento"
  | "circuito_foco"
  | "semaforo_inteligente"
  | "regadera_automatica"
  | "termostato"
  | "iluminacion_casa"
  | "sistema_incendios"
  | "cruce_peatonal"
  | "lavadora"
  | "tostadora"
  | "cafetera"
  | "refrigerador"
  | "lavavajillas"
  | "horno"
  | "aire_acondicionado";

interface EscenarioFlujo {
  id: ProblematicaFlujoId;
  titulo: string;
  bloquesOrdenados: string[];
}

type DiccionarioFlujo = Record<NivelFlujoId, EscenarioFlujo[]>;

const diccionarioFlujo: DiccionarioFlujo = {
  basico: [
    {
      id: "ventilador_electrico",
      titulo: "Hacer funcionar un ventilador eléctrico",
      bloquesOrdenados: [
        "Conectar el cable a la corriente",
        "Encender el botón de velocidad",
        "El motor convierte la energía eléctrica en movimiento",
        "El ventilador empieza a girar.",
      ],
    },
    {
      id: "celular_solar",
      titulo: "Cargar un celular con energía solar",
      bloquesOrdenados: [
        "Colocar el panel solar bajo el Sol",
        "El panel convierte la energía solar en eléctrica",
        "Conectar el cargador solar al celular",
        "El celular empieza a cargarse.",
      ],
    },
    {
      id: "auto",
      titulo: "Encender un automóvil",
      bloquesOrdenados: [
        "Girar la llave de encendido",
        "El combustible se quema en el motor",
        "La energía química se transforma en energía mecánica",
        "Las llantas comienzan a moverse.",
      ],
    },
    {
      id: "molino_viento",
      titulo: "Generar energía con un molino de viento",
      bloquesOrdenados: [
        "El viento mueve las aspas del molino",
        "El generador convierte el movimiento en energía eléctrica",
        "La energía se envía por cables",
        "Se usa para encender un foco.",
      ],
    },
    {
      id: "circuito_foco",
      titulo: "Encender un foco con un circuito sencillo",
      bloquesOrdenados: [
        "Conectar la pila al foco con los cables",
        "Asegurar que el interruptor esté cerrado",
        "La corriente fluye hacia el foco",
        "El foco se enciende.",
      ],
    },
  ],
  intermedio: [
    {
      id: "semaforo_inteligente",
      titulo: "El semáforo inteligente",
      bloquesOrdenados: [
        "Encender sistema de control",
        "Luz verde encendida (autos avanzan)",
        "Cambiar a luz amarilla (precaución)",
        "Cambiar a luz roja (autos se detienen).",
      ],
    },
    {
      id: "regadera_automatica",
      titulo: "Encender una regadera automática",
      bloquesOrdenados: [
        "Sensor detecta movimiento de las personas",
        "Sistema abre la válvula de agua",
        "El agua fluye por la regadera",
        "Al salir la persona, el sistema cierra la válvula.",
      ],
    },
    {
      id: "termostato",
      titulo: "Regular la temperatura con un termostato",
      bloquesOrdenados: [
        "Leer temperatura actual",
        "Comparar con temperatura deseada",
        "Si hace frío, encender calefacción",
        "Si hace calor, apagar calefacción.",
      ],
    },
    {
      id: "iluminacion_casa",
      titulo: "Mostrar el funcionamiento de iluminación automática en una casa",
      bloquesOrdenados: [
        "Sensor de movimiento detecta presencia",
        "Enviar señal al sistema de luces",
        "Luces se encienden automáticamente",
        "Si no hay movimiento, las luces se apagan.",
      ],
    },
    {
      id: "sistema_incendios",
      titulo: "Sistema contra incendios",
      bloquesOrdenados: [
        "Sensor detecta humo o aumento de temperatura",
        "Activar alarma de emergencia",
        "Abrir válvulas de aspersores",
        "Apagar el fuego y cerrar válvulas.",
      ],
    },
    {
      id: "cruce_peatonal",
      titulo: "Cruce peatonal automatizado",
      bloquesOrdenados: [
        "Peatón presiona el botón de cruce",
        "Luz roja para autos",
        "Luz verde para peatones",
        "Después de unos segundos, vuelve a luz verde para autos.",
      ],
    },
  ],
  avanzado: [
    {
      id: "lavadora",
      titulo: "Lavadora automática",
      bloquesOrdenados: [
        "Llenar el tanque con agua",
        "Activar el ciclo de lavado",
        "Enjuagar la ropa",
        "Centrifugar y apagar el sistema",
      ],
    },
    {
      id: "tostadora",
      titulo:
        "Funcionamiento de una tostadora automática para preparar el desayuno",
      bloquesOrdenados: [
        "Insertar el pan en las ranuras",
        "Activar el nivel de tostado",
        "Las resistencias calientan el pan",
        "Saltar el pan automáticamente al finalizar",
      ],
    },
    {
      id: "cafetera",
      titulo: "Cafetera programable",
      bloquesOrdenados: [
        "Programar hora de inicio",
        "Calentar el agua",
        "Pasar el agua caliente por el café molido",
        "Servir el café en la jarra",
      ],
    },
    {
      id: "refrigerador",
      titulo: "Refrigerador con control automático",
      bloquesOrdenados: [
        "Medir temperatura interna",
        "Comparar con temperatura configurada",
        "Activar compresor si hace calor",
        "Apagar compresor al alcanzar temperatura deseada",
      ],
    },
    {
      id: "lavavajillas",
      titulo: "Lavavajillas automático",
      bloquesOrdenados: [
        "Cargar los platos y cubiertos",
        "Seleccionar el programa de lavado",
        "Lavar, enjuagar y secar los utensilios",
        "Apagar al finalizar el ciclo",
      ],
    },
    {
      id: "horno",
      titulo: "Horno eléctrico con temporizador",
      bloquesOrdenados: [
        "Programar temperatura y tiempo",
        "Encender las resistencias de calor",
        "Cocinar el alimento",
        "Apagar el horno al terminar el tiempo programado",
      ],
    },
    {
      id: "aire_acondicionado",
      titulo: "Aire acondicionado inteligente",
      bloquesOrdenados: [
        "Leer temperatura del ambiente",
        "Comparar con temperatura deseada",
        "Enfriar o calentar el aire",
        "Mantener temperatura constante",
      ],
    },
  ],
};

type OrdenamientoProps = {
  nivel?: string;
  problematicas?: ProblematicaFlujoId[]; // IDs que vienen desde el generador
  steps?: number;
};

type NivelId = "basico" | "intermedio" | "avanzado";

type SelectedSource =
  | { type: "option"; index: number }
  | { type: "slot"; index: number }
  | null;

// Mezcla los elementos de un arreglo (Fisher–Yates)
const shuffleArray = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const Diagrama: React.FC<OrdenamientoProps> = ({
  nivel = "basic",
  problematicas,
}) => {
  const configuracionNiveles: Record<
    NivelId,
    {
      numeroJuegos: number;
      puntosPorJuego: number;
      tiempoPorJuego: number;
    }
  > = {
    basico: {
      numeroJuegos: 3,
      puntosPorJuego: 10,
      tiempoPorJuego: 3,
    },
    intermedio: {
      numeroJuegos: 4,
      puntosPorJuego: 15,
      tiempoPorJuego: 4,
    },
    avanzado: {
      numeroJuegos: 5,
      puntosPorJuego: 20,
      tiempoPorJuego: 5,
    },
  };

  const normalizarNivelConfig = (n: string): NivelId =>
    ({
      basico: "basico",
      basic: "basico",
      intermedio: "intermedio",
      intermediate: "intermedio",
      avanzado: "avanzado",
      advanced: "avanzado",
    }[n] || "basico");

  const [appName] = useState("Juego de diagramas de flujo");
  const [appAutor] = useState("STEAM-G");
  const [appVersion] = useState("1.0.0");
  const [appFecha] = useState("16 de Noviembre del 2025");
  const [appDescripcion] = useState(
    "Ordena los bloques del proceso para reconstruir el diagrama de flujo."
  );

  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [indiceJuegoActual, setIndiceJuegoActual] = useState(0);

  const [nivelConfig] = useState<string>(nivel);
  const nivelConfigKey = normalizarNivelConfig(nivelConfig);
  const config = configuracionNiveles[nivelConfigKey];

  const [tiempoRestante, setTiempoRestante] = useState(() => {
    return config.tiempoPorJuego * 60;
  });
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  // Indica si ya se terminaron todas las partidas del nivel
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [juegosCompletados, setJuegosCompletados] = useState(0);
  const [juegosFallados, setJuegosFallados] = useState(0);

  // Texto de retroalimentación (correcto / incorrecto / tiempo agotado)
  const [mensajeResultado, setMensajeResultado] = useState<string | null>(null);
  // Indica si el juego actual ya fue completado correctamente
  const [juegoActualCompletado, setJuegoActualCompletado] = useState(false);

  // Overlays de retroalimentación
  const [overlayFinJuego, setOverlayFinJuego] = useState<{
    abierto: boolean;
    puntosObtenidos: number;
  }>({
    abierto: false,
    puntosObtenidos: 0,
  });

  const [overlayTiempoAgotado, setOverlayTiempoAgotado] =
    useState<boolean>(false);

  const [overlayResumenFinal, setOverlayResumenFinal] =
    useState<boolean>(false);

  // Escenarios disponibles para el nivel actual (básico / intermedio / avanzado)
  const escenariosNivelBase = diccionarioFlujo[nivelConfigKey];

  /**
   * Escenarios que realmente se jugarán, según las problemáticas que vengan por props.
   * - Si `problematicas` viene con IDs, se toman SOLO esos escenarios, en ese orden.
   * - Si no viene nada, se toman los primeros N escenarios según el nivel (3/4/5).
   */
  const escenariosSeleccionados: EscenarioFlujo[] =
    problematicas && problematicas.length > 0
      ? problematicas
          .map((id) =>
            escenariosNivelBase.find((escenario) => escenario.id === id)
          )
          .filter((escenario): escenario is EscenarioFlujo => !!escenario)
      : escenariosNivelBase.slice(
          0,
          configuracionNiveles[nivelConfigKey].numeroJuegos
        );

  // Número total de juegos que se jugarán en este nivel
  const totalJuegos = escenariosSeleccionados.length || 1;

  // Escenario actual según el índice de juego
  const escenarioActual: EscenarioFlujo =
    escenariosSeleccionados[indiceJuegoActual] ||
    escenariosSeleccionados[0] ||
    escenariosNivelBase[0];

  const [bloquesDesordenados, setBloquesDesordenados] = useState<string[]>(() =>
    shuffleArray(escenarioActual.bloquesOrdenados)
  );

  // Contenido de cada slot del diagrama (null = vacío)
  const [slotsContent, setSlotsContent] = useState<(string | null)[]>(() =>
    Array(escenarioActual.bloquesOrdenados.length).fill(null)
  );
  // Estado visual de cada slot (normal o error)
  const [slotEstados, setSlotEstados] = useState<("default" | "error")[]>(() =>
    Array(escenarioActual.bloquesOrdenados.length).fill("default")
  );
  // Paso / slot actualmente seleccionado para colocar
  const [seleccion, setSeleccion] = useState<SelectedSource>(null);

  useEffect(() => {
    // 1. Cada vez que cambie el escenarioActual, mezclamos de nuevo los bloques
    setBloquesDesordenados(shuffleArray(escenarioActual.bloquesOrdenados));

    // 2. Reiniciamos los slots a null con el tamaño correcto
    setSlotsContent(Array(escenarioActual.bloquesOrdenados.length).fill(null));

    // 3. Restauramos el color de todos los slots
    setSlotEstados(
      Array(escenarioActual.bloquesOrdenados.length).fill("default")
    );
  }, [escenarioActual.id]);

  // Cada vez que cambiamos de juego, restablecemos el estado de completado
  useEffect(() => {
    setJuegoActualCompletado(false);
  }, [indiceJuegoActual]);

  /**
   * Comprueba si el diagrama está correctamente ordenado.
   * - Si es incorrecto: muestra mensaje, pero deja que el jugador siga moviendo mientras haya tiempo.
   * - Si es correcto: suma puntos y pasa a la siguiente partida (o termina el nivel).
   */
  const handleComprobarResultado = () => {
    if (juegoTerminado || tiempoRestante <= 0 || juegoActualCompletado) {
      return;
    }

    const hayEspaciosVacios = slotsContent.some((slot) => slot === null);
    if (hayEspaciosVacios) return;

    const esCorrecto = slotsContent.every(
      (slot, index) => slot === escenarioActual.bloquesOrdenados[index]
    );

    if (!esCorrecto) {
      // Aquí SOLO marcas de rojo, NO terminas el juego
      setSlotEstados(
        escenarioActual.bloquesOrdenados.map((_, index) => {
          const valorSlot = slotsContent[index];
          if (valorSlot === null) return "default";
          return valorSlot === escenarioActual.bloquesOrdenados[index]
            ? "default"
            : "error";
        })
      );
      return;
    }

    // ✅ Si es correcto, ahí sí marcas completado
    setSlotEstados((prev) => prev.map(() => "default"));

    const puntosObtenidos = config.puntosPorJuego;
    setPuntuacionTotal((prev) => prev + puntosObtenidos);
    setJuegoActualCompletado(true);
    setJuegosCompletados((prev) => prev + 1);

    setOverlayFinJuego({
      abierto: true,
      puntosObtenidos,
    });
  };

  /**
   * Avanza al siguiente juego o, si era el último, muestra el resumen final.
   */
  const avanzarAlSiguienteJuego = () => {
    const esUltimoJuego = indiceJuegoActual + 1 >= totalJuegos;

    if (esUltimoJuego) {
      setJuegoTerminado(true);
      setOverlayResumenFinal(true);
      return;
    }

    setIndiceJuegoActual((prev) => prev + 1);
    setTiempoRestante(config.tiempoPorJuego * 60);
    setMensajeResultado(null);
  };

  /**
   * Cierra el overlay de fin de juego y avanza.
   */
  const handleCerrarOverlayFinJuego = () => {
    setOverlayFinJuego((prev) => ({ ...prev, abierto: false }));
    avanzarAlSiguienteJuego();
  };

  /**
   * Cierra el overlay de tiempo agotado y avanza.
   */
  const handleCerrarOverlayTiempoAgotado = () => {
    setOverlayTiempoAgotado(false);
    avanzarAlSiguienteJuego();
  };

  /**
   * Cierra el overlay de resumen final.
   */
  const handleCerrarOverlayResumenFinal = () => {
    setOverlayResumenFinal(false);
  };

  /**
   * Temporizador: descuenta 1 segundo cada 1000 ms mientras:
   * - haya tiempo (> 0)
   * - el nivel no haya terminado
   */
  useEffect(() => {
    // Si el juego ya terminó, el tiempo llegó a 0
    // o hay un overlay de resultado abierto, no avanzamos el tiempo
    if (
      juegoTerminado ||
      tiempoRestante <= 0 ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Limpieza del intervalo al desmontar o al cambiar dependencias
    return () => clearInterval(intervalId);
  }, [
    juegoTerminado,
    tiempoRestante,
    overlayFinJuego.abierto,
    overlayTiempoAgotado,
  ]);

  /**
   * Cada vez que cambian los slots:
   * - Si todos están llenos y hay tiempo → se llama a handleComprobarResultado().
   * - Si hay huecos, no hace nada (todavía no está listo el diagrama).
   */
  useEffect(() => {
    if (juegoTerminado || tiempoRestante <= 0) {
      return;
    }

    const hayEspaciosVacios = slotsContent.some((slot) => slot === null);
    if (hayEspaciosVacios) {
      return;
    }

    // Todos los slots están llenos y aún hay tiempo → comprobamos
    handleComprobarResultado();
  }, [slotsContent, tiempoRestante, juegoTerminado]);

  /**
   * Cuando el tiempo llega a 0 y el juego actual no se ha completado correctamente,
   * mostramos el overlay de tiempo agotado.
   */
  useEffect(() => {
    if (tiempoRestante === 0 && !juegoTerminado && !juegoActualCompletado) {
      setOverlayTiempoAgotado(true);
      setJuegosFallados((prev) => prev + 1);
    }
  }, [tiempoRestante, juegoTerminado, juegoActualCompletado]);

  // Cuando se muestra el overlay de victoria, esperamos 7 segundos
  // y luego cerramos el overlay y avanzamos al siguiente juego.
  useEffect(() => {
    if (!overlayFinJuego.abierto) return;

    const timeoutId = window.setTimeout(() => {
      handleCerrarOverlayFinJuego();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [overlayFinJuego.abierto]);

  // Cuando se muestra el overlay de tiempo agotado, esperamos 7 segundos
  // y luego cerramos el overlay y avanzamos al siguiente juego.
  useEffect(() => {
    if (!overlayTiempoAgotado) return;

    const timeoutId = window.setTimeout(() => {
      handleCerrarOverlayTiempoAgotado();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [overlayTiempoAgotado]);

  // Información de lo que se está "arrastrando"
  const dragInfoRef = useRef<{
    source: "options" | "slot";
    index: number;
  } | null>(null);

  // Vista previa del elemento que se arrastra con touch
  const [touchPreview, setTouchPreview] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Ref al contenedor general para manejar el touchend
  const juegoContainerRef = useRef<HTMLDivElement | null>(null);
  const dragPreviewRef = useRef<HTMLDivElement | null>(null);

  /* ===================== LÓGICA DE DROP REUTILIZABLE ===================== */

  // Aplica la lógica de soltar sobre un slot (desktop o touch)
  const dropOnSlot = (slotIndex: number) => {
    // Si ya terminó el nivel o se acabó el tiempo, no permitimos más movimientos
    if (juegoTerminado || tiempoRestante <= 0) return;

    const info = dragInfoRef.current;
    if (!info) return;

    // Desde la lista de pasos hacia un slot
    if (info.source === "options") {
      const bloque = bloquesDesordenados[info.index];
      if (!bloque) return;

      const bloquePrevio = slotsContent[slotIndex];

      // Actualizar slots
      setSlotsContent((prev) => {
        const newSlots = [...prev];
        newSlots[slotIndex] = bloque;
        return newSlots;
      });

      // Actualizar lista de opciones
      setBloquesDesordenados((prev) => {
        const nuevos = prev.filter((_, i) => i !== info.index);
        if (bloquePrevio) {
          nuevos.push(bloquePrevio);
        }
        return nuevos;
      });

      // El slot que se acaba de modificar vuelve a su color normal
      setSlotEstados((prev) => {
        const nuevos = [...prev];
        nuevos[slotIndex] = "default";
        return nuevos;
      });
    }

    // Desde otro slot → intercambio
    if (info.source === "slot") {
      const fromIndex = info.index;
      if (fromIndex === slotIndex) return;

      setSlotsContent((prev) => {
        const newSlots = [...prev];
        const tmp = newSlots[fromIndex];
        newSlots[fromIndex] = newSlots[slotIndex];
        newSlots[slotIndex] = tmp;
        return newSlots;
      });

      // Al intercambiar, ambos slots vuelven a su color normal
      setSlotEstados((prev) => {
        const nuevos = [...prev];
        nuevos[fromIndex] = "default";
        nuevos[slotIndex] = "default";
        return nuevos;
      });
    }
  };

  // Aplica la lógica de soltar de un slot a la zona de opciones
  const dropToOptions = () => {
    // Igual bloqueamos devolver bloques a la lista si no hay tiempo o el nivel terminó
    if (juegoTerminado || tiempoRestante <= 0) return;

    const info = dragInfoRef.current;
    if (!info || info.source !== "slot") return;

    const fromIndex = info.index;
    const bloque = slotsContent[fromIndex];
    if (!bloque) return;

    setSlotsContent((prev) => {
      const newSlots = [...prev];
      newSlots[fromIndex] = null;
      return newSlots;
    });

    setBloquesDesordenados((prev) => [...prev, bloque]);

    // Si el bloque regresó a la lista, el slot vuelve a su color original
    setSlotEstados((prev) => {
      const nuevos = [...prev];
      nuevos[fromIndex] = "default";
      return nuevos;
    });
  };

  /* ===================== DRAG & DROP DESKTOP (HTML5) ===================== */

  const handleDragStartFromOption = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    dragInfoRef.current = { source: "options", index };
    // Algunos navegadores necesitan setData para que se dispare el drop
    event.dataTransfer.setData("text/plain", String(index));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragStartFromSlot = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!slotsContent[index]) return;
    dragInfoRef.current = { source: "slot", index };
    event.dataTransfer.setData("text/plain", String(index));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOverSlot = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDropOnSlot = (
    event: React.DragEvent<HTMLDivElement>,
    slotIndex: number
  ) => {
    event.preventDefault();
    dropOnSlot(slotIndex);
    dragInfoRef.current = null;
  };

  const handleDragOverOptions = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDropToOptions = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropToOptions();
    dragInfoRef.current = null;
  };

  /* ===================== SOPORTE TOUCH (MÓVIL) ===================== */

  const handleTouchStartFromOption = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    dragInfoRef.current = { source: "options", index };

    const touches = event.touches;
    if (!touches || touches.length === 0) return;

    const touch = touches[0];
    const text = bloquesDesordenados[index];

    if (text) {
      setTouchPreview({
        text,
        x: touch.clientX,
        y: touch.clientY,
      });
    }
  };

  const handleTouchStartFromSlot = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!slotsContent[index]) return;

    dragInfoRef.current = { source: "slot", index };

    const touches = event.touches;
    if (!touches || touches.length === 0) return;

    const touch = touches[0];
    const text = slotsContent[index];

    if (text) {
      setTouchPreview({
        text,
        x: touch.clientX,
        y: touch.clientY,
      });
    }
  };

  // Se dispara cuando levantamos el dedo en cualquier parte del contenedor del juego
  const handleTouchEndOnContainer = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const info = dragInfoRef.current;
    if (!info) {
      setTouchPreview(null);
      return;
    }

    const touch = event.changedTouches[0];
    if (!touch) {
      dragInfoRef.current = null;
      setTouchPreview(null);
      return;
    }

    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!target) {
      dragInfoRef.current = null;
      setTouchPreview(null);
      return;
    }

    // ¿Se soltó sobre un slot?
    const slotElement = target.closest(
      "[data-slot-index]"
    ) as HTMLElement | null;
    if (slotElement && slotElement.dataset.slotIndex != null) {
      const slotIndex = Number(slotElement.dataset.slotIndex);
      dropOnSlot(slotIndex);
      dragInfoRef.current = null;
      setTouchPreview(null);
      return;
    }

    // ¿Se soltó sobre la zona de opciones?
    const optionsElement = target.closest(
      "[data-drop-zone='options']"
    ) as HTMLElement | null;
    if (optionsElement) {
      dropToOptions();
      dragInfoRef.current = null;
      setTouchPreview(null);
      return;
    }

    // Si no cayó en ningún lado válido, simplemente limpiamos
    dragInfoRef.current = null;
    setTouchPreview(null);
  };

  /* ===================== UTILIDADES ===================== */

  const slots = Array.from(
    { length: escenarioActual.bloquesOrdenados.length },
    (_, i) => i
  );

  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  // Mientras se arrastra con el dedo, movemos la vista previa
  const handleTouchMoveOnContainer = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (!dragInfoRef.current || !touchPreview) return;

    const touch = event.touches[0];
    if (!touch) return;

    // Evitamos el scroll mientras se arrastra
    event.preventDefault();

    // 🔹 Movemos el "ghost" manualmente, sin re-renderizar React
    if (dragPreviewRef.current) {
      dragPreviewRef.current.style.transform = `translate3d(${touch.clientX}px, ${touch.clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  const handleClickOption = (index: number) => {
    if (juegoTerminado || tiempoRestante <= 0) return;

    // Si vuelves a hacer clic sobre la misma opción, la deseleccionas
    if (seleccion && seleccion.type === "option" && seleccion.index === index) {
      setSeleccion(null);
    } else {
      // Seleccionas este paso como origen
      setSeleccion({ type: "option", index });
    }
  };

  const handleClickSlot = (slotIndex: number) => {
    if (juegoTerminado || tiempoRestante <= 0) return;

    const bloqueEnSlot = slotsContent[slotIndex];

    // 🟢 Caso 1: no hay nada seleccionado todavía
    // Si el slot tiene contenido, lo seleccionamos para moverlo.
    if (!seleccion) {
      if (bloqueEnSlot) {
        setSeleccion({ type: "slot", index: slotIndex });
      }
      return;
    }

    // 🟢 Caso 2: hay una opción seleccionada => comportamiento actual (opción → slot)
    if (seleccion.type === "option") {
      const optionIndex = seleccion.index;
      const bloque = bloquesDesordenados[optionIndex];
      if (!bloque) {
        setSeleccion(null);
        return;
      }

      const bloquePrevio = slotsContent[slotIndex];

      // 2.1. Actualizar contenido de slots
      setSlotsContent((prev) => {
        const newSlots = [...prev];
        newSlots[slotIndex] = bloque;
        return newSlots;
      });

      // 2.2. Actualizar lista de opciones
      setBloquesDesordenados((prev) => {
        const nuevos = prev.filter((_, i) => i !== optionIndex);
        if (bloquePrevio) {
          nuevos.push(bloquePrevio);
        }
        return nuevos;
      });

      // 2.3. Limpiar estado visual de error del slot
      setSlotEstados((prev) => {
        const nuevos = [...prev];
        nuevos[slotIndex] = "default";
        return nuevos;
      });

      // 2.4. Limpiar selección
      setSeleccion(null);
      return;
    }

    // 🟢 Caso 3: hay un slot seleccionado y se hace clic en otro slot => intercambio
    if (seleccion.type === "slot") {
      const fromIndex = seleccion.index;

      // Si haces clic otra vez en el mismo slot, solo deselecciona
      if (fromIndex === slotIndex) {
        setSeleccion(null);
        return;
      }

      // 3.1. Intercambio de contenidos entre slots
      setSlotsContent((prev) => {
        const newSlots = [...prev];
        const tmp = newSlots[fromIndex];
        newSlots[fromIndex] = newSlots[slotIndex];
        newSlots[slotIndex] = tmp;
        return newSlots;
      });

      // 3.2. Ambos slots vuelven a color normal (por si alguno estaba en rojo)
      setSlotEstados((prev) => {
        const nuevos = [...prev];
        nuevos[fromIndex] = "default";
        nuevos[slotIndex] = "default";
        return nuevos;
      });

      // 3.3. Limpiar selección
      setSeleccion(null);
    }
  };

  const reiniciarJuego = () => {
    // Tomamos siempre el primer escenario que se va a jugar
    const primerEscenario = escenariosSeleccionados[0] || escenarioActual;

    // 1. Estado general del juego
    setJuegoTerminado(false);
    setOverlayResumenFinal(false);
    setOverlayTiempoAgotado(false);
    setOverlayFinJuego({ abierto: false, puntosObtenidos: 0 });

    // Volvemos al primer juego
    setIndiceJuegoActual(0);

    // 2. Tiempo y puntuación
    setTiempoRestante(config.tiempoPorJuego * 60);
    setPuntuacionTotal(0);
    setJuegosCompletados(0);
    setJuegosFallados(0);
    setMensajeResultado(null);
    setJuegoActualCompletado(false);

    // 3. Estado visual y contenido de los slots (IMPORTANTÍSIMO)
    setBloquesDesordenados(shuffleArray(primerEscenario.bloquesOrdenados));
    setSlotsContent(Array(primerEscenario.bloquesOrdenados.length).fill(null));
    setSlotEstados(
      Array(primerEscenario.bloquesOrdenados.length).fill("default")
    );
  };

  const generarConfeti = () => {
    const colores = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];

    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colores[Math.floor(Math.random() * colores.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
  };

  return (
    <IonPage>
      <IonContent>
        <div className="header-game ion-no-border">
          <div className="toolbar-game">
            <div className="titles">
              <h1>STEAM-G</h1>
              <IonIcon
                icon={alertCircleOutline}
                size="small"
                id="info-diagrama"
              />
              <IonPopover
                trigger="info-diagrama"
                side="bottom"
                alignment="center"
              >
                <IonCard className="filter-card ion-no-margin">
                  <div className="section header-section">
                    <h2>{appName}</h2>
                  </div>

                  <div className="section description-section">
                    <p>{appDescripcion}</p>
                  </div>

                  <div className="section footer-section">
                    <span>{appFecha}</span>
                  </div>
                </IonCard>
              </IonPopover>
            </div>
            <span>
              <strong>Autor:</strong> {appAutor} | <strong>Versión:</strong>{" "}
              {appVersion}
            </span>
          </div>
        </div>
        {touchPreview && (
          <div
            ref={dragPreviewRef}
            className="drag-preview"
            style={{ top: touchPreview.y, left: touchPreview.x }}
          >
            <IonCard className="option-card ion-no-margin ion-padding">
              <IonItem lines="none">
                <span>{touchPreview.text}</span>
              </IonItem>
            </IonCard>
          </div>
        )}

        {/* Contenedor general del juego: aquí escuchamos el touchend */}
        <div
          className="juego-container"
          ref={juegoContainerRef}
          onTouchEnd={handleTouchEndOnContainer}
          onTouchMove={handleTouchMoveOnContainer}
        >
          <IonTitle
            className="ion-text-center instructions"
            onClick={() => setShowInstructions(true)}
          >
            Instrucciones
          </IonTitle>

          <div className="info">
            <div className="num-words">
              <strong>
                Juego {indiceJuegoActual + 1} de {totalJuegos}
              </strong>
            </div>
            <div className="temporizador">
              <IonIcon icon={time} className="icono-tiempo" />
              <h5 className="tiempo-display">
                {formatearTiempo(tiempoRestante)}
              </h5>
            </div>
            <div className="num-words">
              <strong>Puntuación: {puntuacionTotal}</strong>
            </div>
          </div>
          <div className="flowchart-content">
            <div className="flowchart-title">
              <h5>{escenarioActual.titulo}</h5>
            </div>

            <div className="flowchart-container">
              {/* Inicio */}
              <div className="flow-node flow-node-start">Inicio</div>

              {/* Bloques intermedios dinámicos */}
              {slots.map((index) => (
                <React.Fragment key={index}>
                  <div className="flow-arrow">
                    <IonIcon icon={arrowDownOutline} />
                  </div>

                  <div
                    className={`${
                      index === 2
                        ? "flow-slot flow-slot-rect"
                        : "flow-slot flow-slot-parallelogram"
                    } ${
                      slotEstados[index] === "error" ? "flow-slot-error" : ""
                    } ${
                      seleccion &&
                      seleccion.type === "slot" &&
                      seleccion.index === index
                        ? "flow-slot-selected"
                        : ""
                    }`}
                    onClick={() => handleClickSlot(index)}
                  >
                    <div className="flow-slot-inner">
                      {slotsContent[index] ?? "Arrastra aquí"}
                    </div>
                  </div>
                </React.Fragment>
              ))}

              {/* Overlay de instrucciones */}
              {showInstructions && (
                <div className="ins-overlay">
                  <div className="ins-card">
                    <div className="ins-title">
                      <h2 style={{ margin: 0, fontWeight: "bold" }}>
                        Instrucciones
                      </h2>
                      <IonIcon
                        icon={closeCircleOutline}
                        style={{ fontSize: "26px" }}
                        onClick={() => setShowInstructions(false)}
                      />
                    </div>

                    <div className="ins-stats">
                      <p style={{ textAlign: "justify" }}>
                        <strong>
                          Lee con atención la problemática y ordena las tarjetas
                          con los pasos correctos, desde el primero hasta el
                          último. Completa el orden antes de que termine el
                          tiempo asignado. Cuando creas que el orden es
                          correcto, pulsa
                          <em> "Comprobar resultado"</em>.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flow-arrow">
                <IonIcon icon={arrowDownOutline} />
              </div>

              <div className="flow-node flow-node-end">Fin</div>
            </div>
          </div>

          {/* Pasos desordenados */}
          <div className="options">
            <div className="options-title">Pasos</div>
            <div className="options-content">
              {bloquesDesordenados.map((bloque, index) => {
                const isSelected =
                  seleccion &&
                  seleccion.type === "option" &&
                  seleccion.index === index;

                return (
                  <IonCard
                    key={index}
                    className={`option-card ion-no-padding ion-no-margin ion-margin-bottom ${
                      isSelected ? "option-card-selected" : ""
                    }`}
                  >
                    <div
                      className="option-card-inner"
                      onClick={() => handleClickOption(index)}
                    >
                      <IonItem lines="none">
                        <span>{bloque}</span>
                      </IonItem>
                    </div>
                  </IonCard>
                );
              })}
            </div>
          </div>

          {/* Overlay: tiempo agotado (mensaje de error) */}
          {overlayTiempoAgotado && (
            <div className="defeat-overlay">
              <div className="defeat-message">
                <h2>¡Tiempo agotado! ⏰</h2>
                <p>No lograste completar el diagrama a tiempo.</p>
                <p>Pasando al siguiente diagrama...</p>
              </div>
            </div>
          )}

          {/* Overlay: fin de juego actual (mensaje de felicitaciones) */}
          {overlayFinJuego.abierto && (
            <div className="victory-overlay">
              <div className="victory-message">
                <h2>¡Muy bien! 🎉</h2>
                <p>Has reconstruido correctamente el diagrama de flujo.</p>
                <p>
                  <strong>
                    Has ganado +{overlayFinJuego.puntosObtenidos} puntos
                  </strong>
                </p>
                <p>Preparando el siguiente diagrama...</p>
              </div>

              <div className="confetti-container">
                {generarConfeti().map((particula) => (
                  <div
                    key={particula.id}
                    className="confetti"
                    style={{
                      backgroundColor: particula.color,
                      left: `${particula.left}%`,
                      animationDelay: `${particula.delay}s`,
                      animationDuration: `${particula.duration}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Overlay: resumen final (como en Reorder) */}
          {overlayResumenFinal && (
            <div className="summary-overlay">
              <div className="summary-message">
                <h2>Juego terminado</h2>
                <div className="resumen-final">
                  <h3>Resultados finales</h3>
                  <p>
                    <strong>Diagramas completados:</strong>
                  </p>
                  <p>
                    {juegosCompletados} de {totalJuegos}
                  </p>
                  <p>
                    <strong>Diagramas fallados:</strong>
                  </p>
                  <p>{juegosFallados}</p>
                  <p>
                    <strong>Puntuación total:</strong>
                  </p>
                  <p>{puntuacionTotal} puntos</p>
                  <IonBadge color="primary">
                    {juegosCompletados === totalJuegos
                      ? "¡PERFECTO! 🏆"
                      : juegosCompletados > juegosFallados
                      ? "¡Buen trabajo! 👍"
                      : "¡Sigue intentando! 💪"}
                  </IonBadge>
                </div>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={reiniciarJuego}
                  color="light"
                  style={{ marginTop: "20px" }}
                >
                  <IonIcon slot="start" icon={refresh} />
                  Reiniciar juego
                </IonButton>
              </div>

              <div className="confetti-container">
                {generarConfeti().map((particula) => (
                  <div
                    key={particula.id}
                    className="confetti"
                    style={{
                      backgroundColor: particula.color,
                      left: `${particula.left}%`,
                      animationDelay: `${particula.delay}s`,
                      animationDuration: `${particula.duration}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Diagrama;
