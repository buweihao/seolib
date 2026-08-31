export interface FormOption {
  label: string;
  value: string;
}

export interface ConfigurableFormField {
  name: string;
  label: string;
  control?: "text" | "email" | "tel" | "url" | "select" | "textarea" | "file" | "checkbox" | "checkbox-group";
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  options?: FormOption[];
  span?: "half" | "full";
  help?: string;
  appearance?: "default" | "tags";
}
