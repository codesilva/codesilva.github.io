import { memo } from "react";

export const Cell = memo(({ children }) => {
  return <div className='cell'>{children}</div>;
});
