# Learn Notes

In this case, when the component is imported directly, all is in the final
bundle, this extra weight is added to first load

## Iconify

The regular icons components for vue is not ready to use in server side
rendering, is ok use the webcomponent version 

## Roting

```html
activeClass=""
exactActiveClass=""

```

## Suspense

```vue
<Suspense v-if="Component" :timeout="0">
```

When exist an asynchronously dependency, this component not render the component
until the data is ok, the promise is resolved.
This wait a timeout to render the fallback
if the timeout is 0, always show the fallback slot


## Supabase auth

For auth settings liked or not verification mail:
[doc](https://supabase.com/dashboard/project/ootaiunorfuaalxdqdzu/auth/providers)
