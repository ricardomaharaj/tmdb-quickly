type Props = {
  fetching: boolean
  overview: string | undefined
}

export function Overview({ fetching, overview }: Props) {
  return (
    <>
      <div className='bubble'>
        {overview ? (
          <p>{overview}</p>
        ) : fetching ? (
          <p>loading...</p>
        ) : (
          <p>No overview</p>
        )}
      </div>
    </>
  )
}
