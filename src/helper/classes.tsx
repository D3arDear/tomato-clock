const identify = (value: string | undefined) => (value ? value : "");
function classes(...names: (string | undefined)[]) {
  return names.filter(identify).join(" ");
}
export default classes;

interface Options {
  extra: string | undefined;
}
interface ClassTriggers {
  [Key: string]: boolean;
}
const scopeClassMaker = (prefix: string) => (name: string | ClassTriggers, options?: Options) =>
  Object.entries(name instanceof Object ? name : { [name]: name })
    .filter((kv) => kv[1] !== false)
    .map((kv) => kv[0])
    .map((name) => {
      return [prefix, name].filter(Boolean).join("-");
    })
    .concat((options && options.extra) || [])
    .join(" ");

export { scopeClassMaker };
