import { Hono } from "hono";
import { cors } from "hono/cors";

// ---
interface Experience {
  name: string;
  slug: string;
  image: string;
  description: string;
}
interface Destination {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  experiences: Experience[];
}
interface Destinations {
  destinations: Destination[];
}
// ---
const dataFile = "src/destinations.json";
// ---
const app = new Hono();
app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("api/v1/destinations/:slug", async (c) => {
  const { slug } = c.req.param();
  const dataFromFile = Bun.file(dataFile);
  const content = (await dataFromFile.json()) as Destinations;
  const destination = content.destinations.find(
    (dest: Destination) => dest.slug === slug,
  );
  if (!destination) {
    return c.notFound();
  }

  return c.json(destination);
});

export default {
  port: 3000,
  fetch: app.fetch,
  hostname: "0.0.0.0" // lo call ooutside
};
