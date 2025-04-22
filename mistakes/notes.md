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
import { ref,reactive, watch } from "vue";

let letters = reactive([]);
watch(letters, console.log("letters has changed", letters));

letters = ['a','b','c'];

```

```typescript
// ✅
// Now all is ok, the watcher is trigger and the redraws
import { ref, watch } from "vue";

let letters = ref([]);
watch(letters, console.log("letters has changed", letters.value));

letters.value = ['a','b','c'];

```

## 
