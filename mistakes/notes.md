# Mistakes

## Omitting the Key Directive on v-for

When skip the `:key` directive, the elements inside the rendered element could
be view problems.
For example, if exists an list of elements and you change the order of it, the
content of the v-for of static HTML will not follow the shuffle

This problem continue if use the `index` in the `v-for`, cause the index not
change in the reordering

## Prop Drilling / Emit Juggling

Not pass a prop in the multiple child's or emit the event in multiple parents.
Use `provide/inject`,

Now the `Root` component was to provide a value and the `DeepChild` will inject
them.

### Use just Provide and Inject -> Global State Management

Use a `composables`

```typescript
// composables/useCounter.ts

import { ref } from "vue";

const count = ref(0);
export const useCounter = () => {
  return {
    count,
  };
};
```

Now is possible use counter in the components

```typescript
import { useCounter } from "./composables/useCounter.ts";

const { count } = useCounter();
```

## Watching Arrays the Wrong Way

```typescript
// ❌
import { ref, watch } from "vue";
const numbers = ref<numbers[]>([]);

watch(numbers, console.log("new number added"));
const randomNumber = () => numbers.value.push(Math.random());
```

This approach not trigger the console.log

### Solution 1: use deep

```typescript
// ✅
import { ref, watch } from "vue";
const numbers = ref<numbers[]>([]);

watch(numbers, console.log("new number added"), {
  deep: true, // see deep
});
const randomNumber = () => numbers.value.push(Math.random());
```

### Solution 2: use spread

```typescript
// ✅
import { ref, watch } from "vue";
const numbers = ref<numbers[]>([]);

watch(numbers, console.log("new number added"));
// use spread
const randomNumber = () => (numbers.value = [...numbers.value, Math.random()]);
```

## Replacing Reactive State the Wrong Way

When replace the value of the reactive var initialized with `reactive` instead
of use a ref, the replace don't trigger a redraw

This occurs when replace all value

```typescript
// ❌
// letters don't trigger the watch or redraws
import { ref, reactive, watch } from "vue";

let letters = reactive([]);
watch(letters, console.log("letters has changed", letters));

letters = ["a", "b", "c"];
```

```typescript
// ✅
// Now all is ok, the watcher is trigger and the redraws
import { ref, watch } from "vue";

let letters = ref([]);
watch(letters, console.log("letters has changed", letters.value));

letters.value = ["a", "b", "c"];
```

## Unintentionally Mutating Props

How to don't mutate the props, using destructurated data

[vue playground exmample](https://play.vuejs.org/#eNqNVduO0zoU/RUrB6kdaUjEOeepZKpyGSQQlxEgXggPJnFbD45t2U5nRlX/nbXtNkmhVIxGrfde9vbaF69us2fW5ptOZLOs9LWTNjAvQmeZ4np1VWXBV9m80rK1xgW2ZU4s2Y4tnWnZBMcmPfTWrKR+ZVy7B/Oi91D8ydNKV7o22gemCHjJA2dXFG+6rTRjouVSzViVSS2D5GpBdl6btsouCbfc+xF8AzMiuwsKXOmySPRBFkYQrVU8CFiMlWvBG+FYrXAIOYFF4FILF1Nj+CvXK2c6u7fIfjJ/1wUEYNYZ68sCjh6082e6YWtzx/jGyIbJUBaHs9g5hIIRb04GEtLnOAwV3DxuTSMUtvWlqjJWHDZaJ+bb7aiMux0IwHlIJl2IldS2C6fC5bHcfdCyIHJp6UUdpCEjIYNdFqOywvThQdFysR+BzqnpZB2C9bOiqBud33pcKzcu1yIU2rbFwsra1N4X9L34tzgs81uUKW+lzuGZXMRZQUIsToblTSP1asaeONEC2hH6D7c2wS13SOpxMHa8A7z37LJLDDHKvZQrEDIakx7PUQ9aK5VwHywliHGapYiEcaXM3ZvoC64TcQTjmbWof5zw3/p78lXZjRNeuI3Yjy1hAQxFSPD1p/fiHuseRGs6hd1nwI/CG9URx7Tteacb0B7ti2xfxy6gUp/99X0Q2h+SIqK0cxf3Vxme44szqQ90/8v/j+dQUVTx6D3/rV7c8VCvjxQD/fmjmsTGhwcr2A09O+hDajGN7xeuOtHT3MvFp+CQMI6RL0nEyEXEB9mJLxkhG7HEw4sXlPFzPqWJO2hTzdNVtDWqE8vzPJ7NBx4syU4Kdd3K4MtIbAqGk842eCOzYffkEtwelOHNLCX2dTICv13MGOkIyIIJhY1Fm8Z4F+xqnpiPbo99nG64iuh0xDmHE+xQN5DGmmji/5w4LklxFr77jiyQp9gIHdDIR3FB8R8JINOTWcXajEuG+3o9W0qhGgzHIJyKfxeqNxm7jiLUm3u5ov6DwEGhNG/HJpjXYm0UZBVeb1ox+qU4krqhKMdil2T6mMtv1Oj35c44NOU0O5q1iPcER55jjiPgND3acIZdWfxSyWMmqXMUnKLBEd/pSNqpwb+qd7b7CcZMqzo=)

## Forgetting to Clean Up Your Manual Event Listeners

When use a conditional to render a component, exmample:

```vue
<template>
  <MyChildComponent v-if="check" />
</template>
```

If some events are added in on mount, this events main be removed in unmount

Better use: `useEventListener`

## Destructured data

```vue
<script lang="ts">
import { reactive, toRefs } from "vue";
const animal = reactive({
  name: "Lion",
  diet: "Carnivore",
  lifespan: "8-12",
});

const { diet, lifespan } = toRefs(animal);
</script>
<template></template>
```

When use in composables:

```typescript
import { reactive, toRefs } from "vue";
export const useLion = () => {
  const animal = {
    name: "Lion",
    diet: "Carnivore",
    lifespan: "8-12",
  };
  return toRefs(animal);
};
```

Now can destructure the use 
```vue
<script lang="ts">
import {useLion} from "./UseLion.ts"
const {name,diet} = useLion()
</script>

```
