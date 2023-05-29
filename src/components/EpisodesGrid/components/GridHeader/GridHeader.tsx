import {ReactElement} from "react";

const GridHeader = (): ReactElement => {
  return (
    <>
      <p className={'col-span-4'}>Title</p>
      <p>Date</p>
      <p>Duration</p>
    </>
  )
}

export default GridHeader
