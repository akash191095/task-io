import React, { useContext } from "react";
import { StoreContext } from "../contexts/Store";
import ServerItem from "./ServerItem";

function Servers() {
  const {
    data: { servers },
  } = useContext(StoreContext);

  return servers.map((server) => (
    <ServerItem key={server.id} server={server} />
  ));
}

export default Servers;
