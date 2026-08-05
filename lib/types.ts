// Tipos que reflejan el modelo de datos definido en el backend Django.
// Mantener sincronizados con los serializers de DRF.

export type EstadoSorteo = "borrador" | "publicado" | "oculto";
export type FuenteSorteo = "manual" | "ocr_ia";
export type RolAdmin = "superadmin" | "editor";
export type TipoImagen = "sorteo" | "ganador" | "numero_ganador" | "vendedor";
export type TipoDisenoBoleto = "delante" | "atras";

export interface PremioSecundario {
  id: number;
  nombre: string;
  numero: string;
  valor: string; // string porque el backend serializa Decimal como string
}

export interface ImagenResultado {
  id: number;
  tipo: TipoImagen;
  url_original: string;
  url_optimizada: string;
  proveedor: string;
  generada_por_ia: boolean;
  created_at: string;
}

export interface DisenoBoleto {
  id: number;
  tipo: TipoDisenoBoleto;
  nombre: string;
  imagen_url: string;
  activo: boolean;
  creado_en: string;
}

export interface CodigoQR {
  id: number;
  codigo: string;
  url_publica: string;
  activo: boolean;
  created_at: string;
}

export interface Sorteo {
  id: number;
  nombre_juego: string;
  fecha_sorteo: string; // YYYY-MM-DD
  hora_sorteo: string; // HH:mm:ss
  numero_ganador: string;
  serie: string;
  premio_principal: string;
  video_url: string | null;
  video_entrega_premio: string | null;
  estado: EstadoSorteo;
  creado_por: number | null;
  fuente: FuenteSorteo;
  created_at: string;
  updated_at: string;
  codigo_qr?: CodigoQR | null;
  imagenes?: ImagenResultado[];
  premios_secundarios?: PremioSecundario[];
}

export interface ResultadoHistorialItem {
  id: number;
  nombre_juego: string;
  fecha_sorteo: string;
  numero_ganador: string;
  serie: string;
  premio_principal: string;
  estado: EstadoSorteo;
  imagen_portada?: string | null;
}

export interface PaginaHistorial {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultadoHistorialItem[];
}

export interface Administrador {
  id: number;
  usuario: string;
  email: string;
  rol: RolAdmin;
  activo: boolean;
  ultimo_login: string | null;
}

export interface LogAuditoria {
  id: number;
  administrador: string | null;
  accion: string;
  entidad_afectada: string;
  entidad_id: number | null;
  metadata: Record<string, unknown>;
  creado_en: string;
}

// Payloads de formularios de administración

export interface SorteoFormValues {
  fecha_sorteo: string;
  hora_sorteo: string;
  numero_ganador: string;
  premio_principal: string;
  video_url: string;
  video_entrega_premio: string;
  fuente: FuenteSorteo;
}

export interface LoginPayload {
  usuario: string;
  password: string;
}

export interface AdministradorFormValues {
  usuario: string;
  email: string;
  rol: RolAdmin;
  password?: string;
}
