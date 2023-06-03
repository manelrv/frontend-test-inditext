import {ReactElement} from "react";

const Loading = ({ small }: { small?: boolean }): ReactElement => {
  return (
    <div
      className={`flex ${
        small ? 'h-16' : 'h-96'
      }  w-full animate-pulse items-center justify-center rounded bg-slate-200`}
    >
      Loading...
    </div>
  )
}

export default Loading
