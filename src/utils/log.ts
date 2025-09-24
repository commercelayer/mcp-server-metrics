
export function log(msg?: string, context?: string): void {
  console.log(`${context? `[${context}] ` : ''}${msg || ''}`)
}
