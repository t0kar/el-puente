import { Ic } from "../../components/icons";

export const ExitBtn = ({ onClick }: { onClick: () => void }) => (
  <button className="icon-btn" aria-label="Salir" title="Salir" onClick={onClick}>
    <Ic.close />
  </button>
);
