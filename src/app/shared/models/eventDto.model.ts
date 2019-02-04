export interface EventDto {
  id?: string | number;
  start: Date;
  end?: Date;
  title: string;
  color?: {
    primary: string;
    secondary: string;
  };
}
