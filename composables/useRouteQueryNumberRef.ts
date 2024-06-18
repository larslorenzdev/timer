export default function (name: string, defaultValue = 0) {
  const route = useRoute()
  const router = useRouter()
  const param = shallowRef(typeof route.query[name] === 'string' ? Number.parseInt(route.query[name] as string) : defaultValue)

  watch(param, (value) => {
    return router.replace({ query: { ...route.query, [name]: value } })
  })

  return param
}
