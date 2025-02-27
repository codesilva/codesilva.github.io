import { memo } from "react";

export const Row = memo(({ children }) => {
  return <div className='row'>
    {children}
  </div>
});
