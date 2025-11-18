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
  const escenariosNivelBase = diccionarioFlujo[nivelConfigKey];

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

  const totalJuegos = escenariosSeleccionados.length || 1;

  const escenarioActual: EscenarioFlujo =
    escenariosSeleccionados[indiceJuegoActual] ||
    escenariosSeleccionados[0] ||
    escenariosNivelBase[0];

  const [bloquesDesordenados, setBloquesDesordenados] = useState<string[]>(() =>
    shuffleArray(escenarioActual.bloquesOrdenados)
  );

  const [slotsContent, setSlotsContent] = useState<(string | null)[]>(() =>
    Array(escenarioActual.bloquesOrdenados.length).fill(null)
  );
  const [slotEstados, setSlotEstados] = useState<("default" | "error")[]>(() =>
    Array(escenarioActual.bloquesOrdenados.length).fill("default")
  );
  const [seleccion, setSeleccion] = useState<SelectedSource>(null);

  useEffect(() => {
    setBloquesDesordenados(shuffleArray(escenarioActual.bloquesOrdenados));

    setSlotsContent(Array(escenarioActual.bloquesOrdenados.length).fill(null));

    setSlotEstados(
      Array(escenarioActual.bloquesOrdenados.length).fill("default")
    );
  }, [escenarioActual.id]);

  useEffect(() => {
    setJuegoActualCompletado(false);
  }, [indiceJuegoActual]);

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
    setTiempoRestante(config.tiempoPorJuego * 60);
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

  const handleCerrarOverlayResumenFinal = () => {
    setOverlayResumenFinal(false);
  };

  useEffect(() => {
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

    return () => clearInterval(intervalId);
  }, [
    juegoTerminado,
    tiempoRestante,
    overlayFinJuego.abierto,
    overlayTiempoAgotado,
  ]);

  useEffect(() => {
    if (juegoTerminado || tiempoRestante <= 0) {
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

  const juegoContainerRef = useRef<HTMLDivElement | null>(null);
  const dragPreviewRef = useRef<HTMLDivElement | null>(null);

  const dropOnSlot = (slotIndex: number) => {
    if (juegoTerminado || tiempoRestante <= 0) return;

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

    setSlotEstados((prev) => {
      const nuevos = [...prev];
      nuevos[fromIndex] = "default";
      return nuevos;
    });
  };

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

    const optionsElement = target.closest(
      "[data-drop-zone='options']"
    ) as HTMLElement | null;
    if (optionsElement) {
      dropToOptions();
      dragInfoRef.current = null;
      setTouchPreview(null);
      return;
    }

    dragInfoRef.current = null;
    setTouchPreview(null);
  };

  const slots = Array.from(
    { length: escenarioActual.bloquesOrdenados.length },
    (_, i) => i
  );

  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  const handleTouchMoveOnContainer = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (!dragInfoRef.current || !touchPreview) return;

    const touch = event.touches[0];
    if (!touch) return;

    event.preventDefault();

    if (dragPreviewRef.current) {
      dragPreviewRef.current.style.transform = `translate3d(${touch.clientX}px, ${touch.clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  const handleClickOption = (index: number) => {
    if (juegoTerminado || tiempoRestante <= 0) return;

    if (seleccion && seleccion.type === "option" && seleccion.index === index) {
      setSeleccion(null);
    } else {
      setSeleccion({ type: "option", index });
    }
  };

  const handleClickSlot = (slotIndex: number) => {
    if (juegoTerminado || tiempoRestante <= 0) return;

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
    setTiempoRestante(config.tiempoPorJuego * 60);
    setPuntuacionTotal(0);
    setJuegosCompletados(0);
    setJuegosFallados(0);
    setMensajeResultado(null);
    setJuegoActualCompletado(false);
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
              <div className="flow-node flow-node-start">Inicio</div>

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
