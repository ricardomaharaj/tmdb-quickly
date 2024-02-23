export function ErrorMsg({ msg }: { msg?: string }) {
  return <div className='rounded-xl bg-red-900 p-4 text-white'>{msg}</div>
}
