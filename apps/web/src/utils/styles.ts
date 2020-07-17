// /* instabul-ignore next */
// export const style = (styles: string): Record<string, any> => {
//   // const css = renderSync({
//   //   data: styles,
//   //   outputStyle: 'compressed',
//   // }).css.toString()
//   //   .trim()

//   // const newCss = css
//   //   .replace(/}[^$]/g, '" }, "')
//   //   .replace(/{/g, '": { "')
//   //   .replace(/^\s*\S/g, '"$&')
//   //   .replace(/;/g, '", "')
//   //   .replace(/(({|;)[^;}]*):/g, '$1": "')

//   // console.log(newCss)

//   // const json = JSON.parse(`{${newCss}}`)
//   return {}
// }

// export const renameKeys = (obj: Record<string, any>): Record<string, any> => {
//   const keyValues = Object.keys(obj).map((key) => {
//     const camelCased = key.replace(/-([a-z])/g, function (g) {
//       return g[1].toUpperCase()
//     })
//     return { [camelCased]: obj[key] }
//   })
//   return Object.assign({}, ...keyValues)
// }
