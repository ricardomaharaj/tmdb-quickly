import { Div } from '~/components/ui/div'

export function Bio({ bio }: { bio?: string }) {
  if (!bio) return <></>

  const bioArr = bio.split('. ')

  return (
    <>
      <Div
        value={!!bio}
        className={`flex max-h-[250px] flex-col gap-2 overflow-y-scroll`}
      >
        {bioArr.map((x) => (
          <div>{x}</div>
        ))}
      </Div>
    </>
  )
}
