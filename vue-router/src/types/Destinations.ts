export interface Experience {
  name: string;
  slug: string;
  image: string;
  description: string;
}
export interface Destination {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  experiences: Experience[];
}
