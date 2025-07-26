export interface AppConfig {
  currency: ConfigOption[];
  locale: ConfigOption[];
  navbar: {
    items: NavbarItem[];
  };
}

export interface ConfigOption {
  name: string;
  value: string;
}

export interface NavbarItem {
  label: string;
  link: string;
}
