import React, { useEffect, useRef, useState } from "react";
import {
  IonCard,
  IonContent,
  IonIcon,
  IonPage,
  IonPopover,
  IonItem,
  IonButton,
  IonBadge,
  IonChip,
} from "@ionic/react";
import {
  alertCircleOutline,
  arrowDownOutline,
  time,
  closeCircleOutline,
  refresh,
  informationCircleOutline,
  pauseCircleOutline,
  playCircleOutline,
  exitOutline,
  homeOutline,
} from "ionicons/icons";
import "./Diagrama.css";
import { App } from "@capacitor/app";

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
  problematicas?: ProblematicaFlujoId[];
  steps?: number;
};

type NivelId = "basico" | "intermedio" | "avanzado";

type SelectedSource =
  | { type: "option"; index: number }
  | { type: "slot"; index: number }
  | null;

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

  const normalizarNivelConfig = (n: string): NivelId => {
    const mapa: Record<string, NivelId> = {
      basico: "basico",
      basic: "basico",
      intermedio: "intermedio",
      intermediate: "intermedio",
      avanzado: "avanzado",
      advanced: "avanzado",
    };
    return mapa[n] || "basico";
  };

  interface DiagramaJSON {
    id: string;
    titulo: string;
    opciones: string[];
    solucion: string[];
  }

  type DiagramaRuntimeConfig = {
    nivel?: string;
    diagramasIds?: string[];
    diagramas?: DiagramaJSON[];
    autor?: string;
    version?: string;
    fecha?: string; // YYYY-MM-DD
    descripcion?: string;
    nombreJuego?: string;
    nombreApp?: string;
    plataformas?: string | string[];
  };

  const [configLoaded, setConfigLoaded] = useState<boolean>(false);

  const [appNombreJuego, setAppNombreJuego] = useState<string>("STEAM-G");
  const [appAutor, setAppAutor] = useState<string>("STEAM-G");
  const [appVersion, setAppVersion] = useState<string>("1.0.0");
  const [appFecha, setAppFecha] = useState<string>("16 de Noviembre del 2025");
  const [appPlataformas, setAppPlataformas] = useState<string>("Android");
  const [appDescripcion, setAppDescripcion] = useState<string>(
    "Ordena los bloques del proceso para reconstruir el diagrama de flujo.",
  );

  const [diagramasFromJson, setDiagramasFromJson] = useState<EscenarioFlujo[]>(
    [],
  );
  const [diagramasIdsFromJson, setDiagramasIdsFromJson] = useState<
    ProblematicaFlujoId[]
  >([]);
  const [tiempoFromJson, setTiempoFromJson] = useState<number | null>(null);

  const formatPlataforma = (texto: string): string => {
    const mapa: Record<string, string> = {
      android: "Android",
      ios: "iOS",
      web: "Web",
    };
    return texto
      .split(/,\s*/)
      .map(
        (p) => mapa[p.toLowerCase()] ?? p.charAt(0).toUpperCase() + p.slice(1),
      )
      .join(", ");
  };

  const formatearFechaLarga = (isoDate?: string) => {
    if (!isoDate) return appFecha;

    const [year, month, day] = isoDate.split("-");
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const mesIndex = Number(month) - 1;
    if (mesIndex < 0 || mesIndex > 11) return isoDate;

    return `${Number(day)} de ${meses[mesIndex]} del ${year}`;
  };

  const getNivelLabel = (nivelId: NivelId): string => {
    const labels: Record<NivelId, string> = {
      basico: "Básico",
      intermedio: "Intermedio",
      avanzado: "Avanzado",
    };
    return labels[nivelId] ?? nivelId;
  };

  const [showStartScreen, setShowStartScreen] = useState<boolean>(true);
  const [showInformation, setShowInformation] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [pausado, setPausado] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [indiceJuegoActual, setIndiceJuegoActual] = useState(0);
  const [nivelConfig, setNivelConfig] = useState<string>(nivel);
  const nivelConfigKey = normalizarNivelConfig(nivelConfig);
  const config = configuracionNiveles[nivelConfigKey];
  const [numJuegosConfig, setNumJuegosConfig] = useState<number>(
    configuracionNiveles[nivelConfigKey].numeroJuegos,
  );
  const [numJuegosFromJson, setNumJuegosFromJson] = useState<boolean>(false);
  const [tiempoRestante, setTiempoRestante] = useState(() => {
    return tiempoFromJson !== null
      ? tiempoFromJson
      : config.tiempoPorJuego * 60;
  });
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [juegosCompletados, setJuegosCompletados] = useState(0);
  const [juegosFallados, setJuegosFallados] = useState(0);
  const [mensajeResultado, setMensajeResultado] = useState<string | null>(null);
  const [juegoActualCompletado, setJuegoActualCompletado] = useState(false);

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

  const todosLosEscenarios: EscenarioFlujo[] = [
    ...diccionarioFlujo.basico,
    ...diccionarioFlujo.intermedio,
    ...diccionarioFlujo.avanzado,
  ];

  const escenariosNivelBase =
    diagramasFromJson.length > 0
      ? diagramasFromJson
      : diccionarioFlujo[nivelConfigKey];

  const escenariosSeleccionados: EscenarioFlujo[] =
    diagramasFromJson.length > 0
      ? diagramasFromJson
      : diagramasIdsFromJson.length > 0
        ? diagramasIdsFromJson
            .map((id) =>
              todosLosEscenarios.find((escenario) => escenario.id === id),
            )
            .filter((escenario): escenario is EscenarioFlujo => !!escenario)
        : problematicas && problematicas.length > 0
          ? problematicas
              .map((id) =>
                escenariosNivelBase.find((escenario) => escenario.id === id),
              )
              .filter((escenario): escenario is EscenarioFlujo => !!escenario)
          : escenariosNivelBase.slice(0, numJuegosConfig);

  const totalJuegos = escenariosSeleccionados.length || 1;

  const escenarioActual: EscenarioFlujo =
    escenariosSeleccionados[indiceJuegoActual] ||
    escenariosSeleccionados[0] ||
    escenariosNivelBase[0];

  const [bloquesDesordenados, setBloquesDesordenados] = useState<string[]>(() =>
    shuffleArray(escenarioActual.bloquesOrdenados),
  );

  const [slotsContent, setSlotsContent] = useState<(string | null)[]>(() =>
    Array(escenarioActual.bloquesOrdenados.length).fill(null),
  );
  const [slotEstados, setSlotEstados] = useState<("default" | "error")[]>(() =>
    Array(escenarioActual.bloquesOrdenados.length).fill("default"),
  );
  const [seleccion, setSeleccion] = useState<SelectedSource>(null);

  useEffect(() => {
    const cargarConfig = async () => {
      try {
        const res = await fetch("/config/diagramas-config.json");

        if (!res.ok) {
          setConfigLoaded(true);
          return;
        }

        const data: DiagramaRuntimeConfig = await res.json();

        if (data.nivel) {
          setNivelConfig(data.nivel);
        }

        if (data.autor) setAppAutor(data.autor);
        if (data.version) setAppVersion(data.version);
        if (data.fecha) setAppFecha(formatearFechaLarga(data.fecha));
        if (data.descripcion) setAppDescripcion(data.descripcion);

        if (data.plataformas) {
          if (Array.isArray(data.plataformas)) {
            setAppPlataformas(data.plataformas.join(", "));
          } else {
            setAppPlataformas(data.plataformas);
          }
        }

        if (data.nombreApp) setAppNombreJuego(data.nombreApp);
        else if (data.nombreJuego) setAppNombreJuego(data.nombreJuego);

        if (
          data.diagramas &&
          Array.isArray(data.diagramas) &&
          data.diagramas.length > 0
        ) {
          const diagramasConvertidos: EscenarioFlujo[] = data.diagramas.map(
            (diagrama) => ({
              id: diagrama.id as ProblematicaFlujoId,
              titulo: diagrama.titulo,
              bloquesOrdenados: diagrama.solucion,
            }),
          );

          setDiagramasFromJson(shuffleArray(diagramasConvertidos));
          setNumJuegosConfig(diagramasConvertidos.length);
          setNumJuegosFromJson(true);
        } else if (
          data.diagramasIds &&
          Array.isArray(data.diagramasIds) &&
          data.diagramasIds.length > 0
        ) {
          setDiagramasIdsFromJson(data.diagramasIds as ProblematicaFlujoId[]);
          setNumJuegosConfig(data.diagramasIds.length);
          setNumJuegosFromJson(true);
        }
      } catch (err) {
        console.error("No se pudo cargar diagrama-config.json", err);
      } finally {
        setConfigLoaded(true);
      }
    };

    cargarConfig();
  }, []);

  useEffect(() => {
    if (numJuegosFromJson) return;
    setNumJuegosConfig(configuracionNiveles[nivelConfigKey].numeroJuegos);
  }, [nivelConfigKey, numJuegosFromJson]);

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = window.setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => window.clearTimeout(timer);
    }

    if (showCountdown && countdown === 0) {
      const t = window.setTimeout(() => setShowCountdown(false), 500);
      return () => window.clearTimeout(t);
    }
  }, [countdown, showCountdown]);

  useEffect(() => {
    setBloquesDesordenados(shuffleArray(escenarioActual.bloquesOrdenados));

    setSlotsContent(Array(escenarioActual.bloquesOrdenados.length).fill(null));

    setSlotEstados(
      Array(escenarioActual.bloquesOrdenados.length).fill("default"),
    );
  }, [escenarioActual.id]);

  useEffect(() => {
    setJuegoActualCompletado(false);
  }, [indiceJuegoActual]);

  const handleComprobarResultado = () => {
    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      juegoTerminado ||
      tiempoRestante <= 0 ||
      juegoActualCompletado
    ) {
      return;
    }

    const hayEspaciosVacios = slotsContent.some((slot) => slot === null);
    if (hayEspaciosVacios) return;

    const esCorrecto = slotsContent.every(
      (slot, index) => slot === escenarioActual.bloquesOrdenados[index],
    );

    if (!esCorrecto) {
      setSlotEstados(
        escenarioActual.bloquesOrdenados.map((_, index) => {
          const valorSlot = slotsContent[index];
          if (valorSlot === null) return "default";
          return valorSlot === escenarioActual.bloquesOrdenados[index]
            ? "default"
            : "error";
        }),
      );
      return;
    }

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

  const avanzarAlSiguienteJuego = () => {
    const esUltimoJuego = indiceJuegoActual + 1 >= totalJuegos;

    if (esUltimoJuego) {
      setJuegoTerminado(true);
      setOverlayResumenFinal(true);
      return;
    }

    setIndiceJuegoActual((prev) => prev + 1);
    const tiempoInicial =
      tiempoFromJson !== null ? tiempoFromJson : config.tiempoPorJuego * 60;
    setTiempoRestante(tiempoInicial);
    setMensajeResultado(null);
  };

  const handleCerrarOverlayFinJuego = () => {
    setOverlayFinJuego((prev) => ({ ...prev, abierto: false }));
    avanzarAlSiguienteJuego();
  };

  const handleCerrarOverlayTiempoAgotado = () => {
    setOverlayTiempoAgotado(false);
    avanzarAlSiguienteJuego();
  };

  useEffect(() => {
    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      juegoTerminado ||
      tiempoRestante <= 0 ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      overlayResumenFinal
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

    return () => clearInterval(intervalId);
  }, [
    showStartScreen,
    showCountdown,
    pausado,
    overlayResumenFinal,
    juegoTerminado,
    tiempoRestante,
    overlayFinJuego.abierto,
    overlayTiempoAgotado,
  ]);

  useEffect(() => {
    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      juegoTerminado ||
      tiempoRestante <= 0
    ) {
      return;
    }

    const hayEspaciosVacios = slotsContent.some((slot) => slot === null);
    if (hayEspaciosVacios) {
      return;
    }

    handleComprobarResultado();
  }, [slotsContent, tiempoRestante, juegoTerminado]);

  useEffect(() => {
    if (tiempoRestante === 0 && !juegoTerminado && !juegoActualCompletado) {
      setOverlayTiempoAgotado(true);
      setJuegosFallados((prev) => prev + 1);
    }
  }, [tiempoRestante, juegoTerminado, juegoActualCompletado]);

  useEffect(() => {
    if (!overlayFinJuego.abierto) return;

    const timeoutId = window.setTimeout(() => {
      handleCerrarOverlayFinJuego();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [overlayFinJuego.abierto]);

  useEffect(() => {
    if (!overlayTiempoAgotado) return;

    const timeoutId = window.setTimeout(() => {
      handleCerrarOverlayTiempoAgotado();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [overlayTiempoAgotado]);

  const dragInfoRef = useRef<{
    source: "options" | "slot";
    index: number;
  } | null>(null);

  const [touchPreview, setTouchPreview] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);
  const lastTouchEndRef = useRef<number>(0);

  const juegoContainerRef = useRef<HTMLDivElement | null>(null);
  const dragPreviewRef = useRef<HTMLDivElement | null>(null);

  const dropOnSlot = (slotIndex: number) => {
    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      overlayResumenFinal ||
      juegoTerminado ||
      tiempoRestante <= 0
    )
      return;

    const info = dragInfoRef.current;
    if (!info) return;

    if (info.source === "options") {
      const bloque = bloquesDesordenados[info.index];
      if (!bloque) return;

      const bloquePrevio = slotsContent[slotIndex];

      setSlotsContent((prev) => {
        const newSlots = [...prev];
        newSlots[slotIndex] = bloque;
        return newSlots;
      });

      setBloquesDesordenados((prev) => {
        const nuevos = prev.filter((_, i) => i !== info.index);
        if (bloquePrevio) {
          nuevos.push(bloquePrevio);
        }
        return nuevos;
      });

      setSlotEstados((prev) => {
        const nuevos = [...prev];
        nuevos[slotIndex] = "default";
        return nuevos;
      });
    }
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

      setSlotEstados((prev) => {
        const nuevos = [...prev];
        nuevos[fromIndex] = "default";
        nuevos[slotIndex] = "default";
        return nuevos;
      });
    }
  };

  const dropToOptions = () => {
    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      overlayResumenFinal ||
      juegoTerminado ||
      tiempoRestante <= 0
    )
      return;

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

    setSlotEstados((prev) => {
      const nuevos = [...prev];
      nuevos[fromIndex] = "default";
      return nuevos;
    });
  };

  const handleTouchEndOnContainer = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      overlayResumenFinal ||
      juegoTerminado ||
      tiempoRestante <= 0
    ) {
      dragInfoRef.current = null;
      setTouchPreview(null);
      return;
    }
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

    const slotElement = target.closest(
      "[data-slot-index]",
    ) as HTMLElement | null;
    if (slotElement && slotElement.dataset.slotIndex != null) {
      const slotIndex = Number(slotElement.dataset.slotIndex);
      dropOnSlot(slotIndex);
      dragInfoRef.current = null;
      setTouchPreview(null);
      lastTouchEndRef.current = Date.now();
      return;
    }

    const optionsElement = target.closest(
      "[data-drop-zone='options']",
    ) as HTMLElement | null;
    if (optionsElement) {
      dropToOptions();
      dragInfoRef.current = null;
      setTouchPreview(null);
      lastTouchEndRef.current = Date.now();
      return;
    }

    dragInfoRef.current = null;
    setTouchPreview(null);
    lastTouchEndRef.current = Date.now();
  };

  const slots = Array.from(
    { length: escenarioActual.bloquesOrdenados.length },
    (_, i) => i,
  );

  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  const handleTouchMoveOnContainer = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      overlayResumenFinal ||
      juegoTerminado ||
      tiempoRestante <= 0
    ) {
      return;
    }
    if (!dragInfoRef.current) return;

    const touch = event.touches[0];
    if (!touch) return;

    event.preventDefault();

    setTouchPreview((prev) =>
      prev ? { ...prev, x: touch.clientX, y: touch.clientY } : null,
    );
  };

  const handleClickOption = (index: number) => {
    if (Date.now() - lastTouchEndRef.current < 300) return;

    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      overlayResumenFinal ||
      juegoTerminado ||
      tiempoRestante <= 0
    )
      return;

    if (seleccion && seleccion.type === "option" && seleccion.index === index) {
      setSeleccion(null);
    } else {
      setSeleccion({ type: "option", index });
    }
  };

  const handleClickSlot = (slotIndex: number) => {
    if (Date.now() - lastTouchEndRef.current < 300) return;

    if (
      showStartScreen ||
      showCountdown ||
      pausado ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      overlayResumenFinal ||
      juegoTerminado ||
      tiempoRestante <= 0
    )
      return;

    const bloqueEnSlot = slotsContent[slotIndex];

    if (!seleccion) {
      if (bloqueEnSlot) {
        setSeleccion({ type: "slot", index: slotIndex });
      }
      return;
    }

    if (seleccion.type === "option") {
      const optionIndex = seleccion.index;
      const bloque = bloquesDesordenados[optionIndex];
      if (!bloque) {
        setSeleccion(null);
        return;
      }

      const bloquePrevio = slotsContent[slotIndex];

      setSlotsContent((prev) => {
        const newSlots = [...prev];
        newSlots[slotIndex] = bloque;
        return newSlots;
      });

      setBloquesDesordenados((prev) => {
        const nuevos = prev.filter((_, i) => i !== optionIndex);
        if (bloquePrevio) {
          nuevos.push(bloquePrevio);
        }
        return nuevos;
      });

      setSlotEstados((prev) => {
        const nuevos = [...prev];
        nuevos[slotIndex] = "default";
        return nuevos;
      });

      setSeleccion(null);
      return;
    }

    if (seleccion.type === "slot") {
      const fromIndex = seleccion.index;

      if (fromIndex === slotIndex) {
        setSeleccion(null);
        return;
      }

      setSlotsContent((prev) => {
        const newSlots = [...prev];
        const tmp = newSlots[fromIndex];
        newSlots[fromIndex] = newSlots[slotIndex];
        newSlots[slotIndex] = tmp;
        return newSlots;
      });

      setSlotEstados((prev) => {
        const nuevos = [...prev];
        nuevos[fromIndex] = "default";
        nuevos[slotIndex] = "default";
        return nuevos;
      });

      setSeleccion(null);
    }
  };

  const reiniciarJuego = () => {
    const primerEscenario = escenariosSeleccionados[0] || escenarioActual;

    setJuegoTerminado(false);
    setOverlayResumenFinal(false);
    setOverlayTiempoAgotado(false);
    setOverlayFinJuego({ abierto: false, puntosObtenidos: 0 });
    setIndiceJuegoActual(0);
    const tiempoInicial =
      tiempoFromJson !== null ? tiempoFromJson : config.tiempoPorJuego * 60;
    setTiempoRestante(tiempoInicial);
    setPuntuacionTotal(0);
    setJuegosCompletados(0);
    setJuegosFallados(0);
    setMensajeResultado(null);
    setJuegoActualCompletado(false);
    setBloquesDesordenados(shuffleArray(primerEscenario.bloquesOrdenados));
    setSlotsContent(Array(primerEscenario.bloquesOrdenados.length).fill(null));
    setSlotEstados(
      Array(primerEscenario.bloquesOrdenados.length).fill("default"),
    );

    setSeleccion(null);
    setTouchPreview(null);
    dragInfoRef.current = null;

    setPausado(false);
    setShowCountdown(false);
    setCountdown(5);
  };

  const iniciarJuego = () => {
    reiniciarJuego();
    setCountdown(5);
    setShowCountdown(true);
  };

  const handleStartGame = () => {
    setShowStartScreen(false);
    iniciarJuego();
  };

  const handleExitApp = async () => {
    try {
      await App.exitApp();
    } catch (e) {
      window.close();
    }
  };

  const handleExitToStart = () => {
    setShowInformation(false);
    setShowInstructions(false);

    setPausado(false);
    setShowCountdown(false);
    setCountdown(5);

    reiniciarJuego();
    setShowStartScreen(true);
  };

  const handleInformation = () => {
    setShowInformation((prev) => !prev);
  };

  const handlePausar = () => {
    if (
      showStartScreen ||
      showCountdown ||
      showInstructions ||
      overlayResumenFinal ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      juegoTerminado ||
      pausado
    ) {
      return;
    }

    setSeleccion(null);
    setTouchPreview(null);
    dragInfoRef.current = null;

    setPausado(true);
  };

  const handleResume = () => {
    setPausado(false);
  };

  const handleSalirDesdePausa = () => {
    setPausado(false);
    handleExitToStart();
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
      {showCountdown && countdown > 0 && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown}</div>
        </div>
      )}

      {showInformation && (
        <div className="info-modal-background">
          <div className="info-modal">
            <div className="header">
              <h2 style={{ color: "var(--color-primary)", fontWeight: "bold" }}>
                {appNombreJuego}
              </h2>
              <p
                style={{
                  color: "#8b8b8bff",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                Actividad configurada desde la plataforma Steam-G
              </p>
            </div>

            <div className="cards-info">
              <div className="card">
                <p className="title">VERSIÓN</p>
                <p className="data">{appVersion}</p>
              </div>

              <div className="card">
                <p className="title">FECHA DE CREACIÓN</p>
                <p className="data">{appFecha}</p>
              </div>

              <div className="card">
                <p className="title">PLATAFORMAS</p>
                <p className="data">{formatPlataforma(appPlataformas)}</p>
              </div>

              <div className="card">
                <p className="title">NÚMERO DE DIAGRAMAS</p>
                <p className="data">{totalJuegos}</p>
              </div>

              <div className="card description">
                <p className="title">DESCRIPCIÓN</p>
                <p className="data">{appDescripcion}</p>
              </div>
            </div>

            <div className="button">
              <IonButton expand="full" onClick={handleInformation}>
                Cerrar
              </IonButton>
            </div>
          </div>
        </div>
      )}

      {pausado && (
        <div className="pause-overlay">
          <div className="pause-card">
            <h2>Juego en pausa</h2>
            <p>El tiempo está detenido.</p>

            <IonButton
              expand="block"
              id="resume"
              style={{ marginTop: "16px" }}
              onClick={handleResume}
            >
              <IonIcon slot="start" icon={playCircleOutline}></IonIcon>
              Reanudar
            </IonButton>

            <IonButton
              expand="block"
              id="finalize"
              style={{ marginTop: "10px" }}
              onClick={handleSalirDesdePausa}
            >
              <IonIcon slot="start" icon={homeOutline}></IonIcon>
              Finalizar juego
            </IonButton>

            <IonButton
              expand="block"
              id="exit"
              style={{ marginTop: "10px" }}
              onClick={handleExitApp}
            >
              <IonIcon slot="start" icon={exitOutline}></IonIcon>
              Cerrar aplicación
            </IonButton>
          </div>
        </div>
      )}

      {touchPreview && (
        <div
          ref={dragPreviewRef}
          className="drag-preview"
          style={{
            transform: `translate3d(${touchPreview.x}px, ${touchPreview.y}px, 0) translate(-50%, -50%)`,
          }}
        >
          <IonCard className="option-card ion-no-margin ion-padding">
            <IonItem lines="none">
              <span>{touchPreview.text}</span>
            </IonItem>
          </IonCard>
        </div>
      )}

      {showInstructions && (
        <div className="ins-overlay">
          <div className="ins-card">
            <div className="ins-title">
              <h2 style={{ margin: 0, fontWeight: "bold" }}>Reglas Básicas</h2>
              <IonIcon
                icon={closeCircleOutline}
                style={{ fontSize: "26px" }}
                onClick={() => setShowInstructions(false)}
              />
            </div>

            <div className="ins-stats">
              <p style={{ textAlign: "justify" }}>
                <strong>
                  Arrastra las instrucciones al diagrama de flujo en el orden
                  adecuado.
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {overlayTiempoAgotado && (
        <div className="defeat-overlay">
          <div className="defeat-message">
            <h2>¡Tiempo agotado! ⏰</h2>
            <p>No lograste completar el diagrama a tiempo.</p>
            <p>Pasando al siguiente diagrama...</p>
          </div>
        </div>
      )}

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

      {overlayResumenFinal && (
        <div className="summary-overlay">
          <div className="summary-message">
            {(() => {
              const total = totalJuegos || 0;
              const correctas = juegosCompletados;
              const incorrectas = Math.max(total - correctas, 0);
              const maxScoreTotal = total * config.puntosPorJuego;
              const porcentaje =
                total > 0 ? Math.round((correctas / total) * 100) : 0;
              const etiqueta =
                correctas === total
                  ? "¡PERFECTO! 🏆"
                  : porcentaje >= 70
                    ? "¡Excelente! 🔥"
                    : porcentaje >= 50
                      ? "¡Buen trabajo! 👍"
                      : "¡Sigue practicando! 💪";

              return (
                <>
                  <h2>Juego Terminado</h2>

                  <div className="resumen-final">
                    <h3>Resultados Finales</h3>

                    <p>
                      <strong>Diagramas completados:</strong> {total}
                    </p>

                    <p>
                      <strong>Correctos:</strong> {correctas}
                    </p>

                    <p>
                      <strong>Incorrectos:</strong> {incorrectas}
                    </p>

                    <p>
                      <strong>Puntuación total:</strong> {puntuacionTotal} /{" "}
                      {maxScoreTotal}
                    </p>

                    <IonBadge className="badge">{etiqueta}</IonBadge>
                  </div>

                  <IonButton
                    id="finalize"
                    expand="block"
                    onClick={handleSalirDesdePausa}
                  >
                    <IonIcon icon={refresh} slot="start" />
                    Jugar de Nuevo
                  </IonButton>

                  <IonButton id="exit" expand="block" onClick={handleExitApp}>
                    <IonIcon slot="start" icon={exitOutline}></IonIcon>
                    Cerrar aplicación
                  </IonButton>
                </>
              );
            })()}
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

      <IonContent fullscreen className="ion-padding">
        {showStartScreen ? (
          <div className="inicio-container">
            <div className="header-game ion-no-border">
              <div className="toolbar-game">
                <div className="titles start-page">
                  <h1>{appNombreJuego}</h1>
                </div>
              </div>
            </div>

            <div className="info-juego">
              <div className="info-item">
                <IonChip>
                  <strong>Nivel: {getNivelLabel(nivelConfigKey)}</strong>
                </IonChip>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className="page-start-btns"
            >
              <IonButton
                onClick={handleStartGame}
                className="play"
                disabled={!configLoaded}
              >
                <IonIcon slot="start" icon={playCircleOutline}></IonIcon>
                {configLoaded ? "Iniciar juego" : "Cargando..."}
              </IonButton>

              <IonButton onClick={handleInformation} className="info">
                <IonIcon slot="start" icon={informationCircleOutline}></IonIcon>
                Información
              </IonButton>
            </div>
          </div>
        ) : (
          <>
            <div className="header-game start ion-no-border">
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
                        <h2>{appNombreJuego}</h2>
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
                  <strong>{appNombreJuego}</strong>
                </span>
              </div>
            </div>

            <div className="instructions-exercises">
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

              <div className="rules" onClick={() => setShowInstructions(true)}>
                Reglas Básicas
              </div>
            </div>

            <div className={`juego-container ${touchPreview ? "dragging" : ""}`}
              ref={juegoContainerRef}
              onTouchEnd={handleTouchEndOnContainer}
              onTouchMove={handleTouchMoveOnContainer}
            >
              <div className="flowchart-content">
                <div className="flowchart-title">
                  <h5>{escenarioActual.titulo}</h5>
                </div>

                <div className="flowchart-container">
                  <div className="flow-node flow-node-start">Inicio</div>

                  {slots.map((index) => {
                    const slotIsFull = slotsContent[index] !== null;
                    const slotIsRect = index === 1 || index === 2;

                    return (
                      <React.Fragment key={index}>
                        <div className="flow-arrow">
                          <IonIcon icon={arrowDownOutline} />
                        </div>

                        <div
                          className={`
                            ${
                              slotIsRect
                                ? "flow-slot flow-slot-rect"
                                : "flow-slot flow-slot-parallelogram"
                            }
                            ${
                              slotEstados[index] === "error"
                                ? "flow-slot-error"
                                : ""
                            }
                            ${slotIsFull ? "flow-slot-selected" : ""}
                            ${dragOverSlot === index ? "flow-slot-dragover" : ""}
                          `}
                          data-slot-index={index}
                          draggable={slotIsFull}
                          onClick={() => handleClickSlot(index)}
                          onDragStart={() => {
                            if (slotIsFull) {
                              dragInfoRef.current = { source: "slot", index };
                            }
                          }}
                          onDragEnd={() => {
                            dragInfoRef.current = null;
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOverSlot(index);
                          }}
                          onDragLeave={() => {
                            setDragOverSlot(null);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOverSlot(null);
                            dropOnSlot(index);
                          }}
                          onTouchStart={(e) => {
                            if (!slotIsFull) return;
                            const touch = e.touches[0];
                            if (!touch) return;
                            dragInfoRef.current = { source: "slot", index };
                            setTouchPreview({
                              text: slotsContent[index] || "",
                              x: touch.clientX,
                              y: touch.clientY,
                            });
                          }}
                          onTouchMove={(e) => {
                            if (!dragInfoRef.current) return;
                            const touch = e.touches[0];
                            if (!touch) return;
                            e.preventDefault();
                            setTouchPreview((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    x: touch.clientX,
                                    y: touch.clientY,
                                  }
                                : null,
                            );
                          }}
                        >
                          <div className="flow-slot-inner">
                            {slotsContent[index] ?? "Arrastra aquí"}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}

                  <div className="flow-arrow">
                    <IonIcon icon={arrowDownOutline} />
                  </div>

                  <div className="flow-node flow-node-end">Fin</div>
                </div>
              </div>

              <div className="options">
                <div className="options-title">Pasos</div>
                <div
                  className="options-content"
                  data-drop-zone="options"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    dropToOptions();
                  }}
                >
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
                        draggable
                        onDragStart={() => {
                          dragInfoRef.current = { source: "options", index };
                        }}
                        onDragEnd={() => {
                          dragInfoRef.current = null;
                        }}
                        onTouchStart={(e) => {
                          const touch = e.touches[0];
                          if (!touch) return;
                          dragInfoRef.current = { source: "options", index };
                          setTouchPreview({
                            text: bloque,
                            x: touch.clientX,
                            y: touch.clientY,
                          });
                        }}
                        onTouchMove={(e) => {
                          if (!dragInfoRef.current) return;
                          const touch = e.touches[0];
                          if (!touch) return;
                          e.preventDefault();
                          setTouchPreview((prev) =>
                            prev
                              ? { ...prev, x: touch.clientX, y: touch.clientY }
                              : null,
                          );
                        }}
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
            </div>

            <div className="button game">
              <IonButton
                shape="round"
                expand="full"
                onClick={handlePausar}
                disabled={
                  showCountdown ||
                  showInstructions
                }
              >
                <IonIcon slot="start" icon={pauseCircleOutline} />
                Pausar
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Diagrama;
