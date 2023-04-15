import React from "react";
import ItemList from "../itemList/ItemList";
import items from "../../mockData/items.json";
export default function Itemsection() {
  return (
    <>
      <section>
        <ItemList items={items} />
      </section>
    </>
  );
}
