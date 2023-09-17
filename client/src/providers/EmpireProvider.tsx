import { IProductiveStructure } from "estructures";
import React, {
  MutableRefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createVoidContext } from "utils/voidContext";
import { ResourceContext } from "./ResourceProvider";
import { Farm } from "estructures/farm";
import { LatLng } from "leaflet";

interface EmpireContextType {
  empire: MutableRefObject<{ productionEstructures: IProductiveStructure[] }>;
  setMarker: (marker: LatLng) => void;
  marker: LatLng | null;
}

export const EmpireContext = createContext<EmpireContextType>(
  createVoidContext("empire-context")
);

export const EmpireProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { bullets, dope } = useContext(ResourceContext);
  const [marker, setMarkerAction] = useState<LatLng | null>(null);

  const state = useRef<{
    productionEstructures: IProductiveStructure[];
  }>({
    productionEstructures: [],
  });

  const setMarker = useCallback(
    (marker: LatLng) => {
      setMarkerAction(marker);
    },
    [setMarkerAction]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      state.current.productionEstructures.forEach((pe) => {
        pe.resource.produce(pe.produce());
      });
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <EmpireContext.Provider
      value={{
        empire: state,
        setMarker,
        marker,
      }}
    >
      {children}
    </EmpireContext.Provider>
  );
};
