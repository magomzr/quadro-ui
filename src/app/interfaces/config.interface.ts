export interface Labels {
  common: Record<string, string>;
  catalog: Record<string, string>;
  orders: Record<string, string>;
  customers: Record<string, string>;
  settings: Record<string, string>;
  login: Record<string, string>;
  logs: Record<string, string>;
}

export interface AppConfig {
  labels: Labels;
  navbar: {
    items: NavbarItem[];
  };
  currency: ConfigOption[];
  locale: ConfigOption[];
}

export interface ConfigOption {
  name: string;
  value: string;
}

export interface NavbarItem {
  label: string;
  link: string;
}
