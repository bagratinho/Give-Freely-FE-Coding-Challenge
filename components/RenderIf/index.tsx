import { useEffect, useState } from "react"

interface IRenderIfProps {
  condition: boolean;
  children: React.ReactNode;
}

export default function RenderIf(props: IRenderIfProps) {
  return props.condition ? (
    <>
      {props.children}  
    </>
  ) : null;
}

