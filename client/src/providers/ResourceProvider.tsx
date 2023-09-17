import React, { createContext, useEffect, useRef, useState } from "react";
import { Bullets, Dope, Money, Power, Resource } from "resources";
import { createVoidContext } from "utils/voidContext";

interface ResourcesContextType {
  bullets: React.MutableRefObject<Resource>;
  money: React.MutableRefObject<Resource>;
  power: React.MutableRefObject<Resource>;
  dope: React.MutableRefObject<Resource>;
}

export const ResourceContext = createContext<ResourcesContextType>(
  createVoidContext("resource-context")
);

const useResource = (resource: React.MutableRefObject<Resource>) => {
  const [, setAmount] = useState(resource.current.current);

  useEffect(() => {
    resource.current.addCallback((a: number) => setAmount(a));
  }, [resource]);

  return resource;
};

export const ResourceProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const bullets = useResource(useRef(Bullets));
  const money = useResource(useRef(Money));
  const power = useResource(useRef(Power));
  const dope = useResource(useRef(Dope));

  return (
    <ResourceContext.Provider
      value={{
        bullets,
        money,
        power,
        dope,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};
