import { Div } from './div'

export function Bio({ bio }: { bio?: string }) {
  if (!bio) return <></>

  return (
    <>
      <Div
        value={!!bio}
        className={`flex max-h-[250px] flex-col gap-2 overflow-y-scroll`}
      >
        {bio.split('. ').map((x) => (
          <div>{x}</div>
        ))}
      </Div>
    </>
  )
}
