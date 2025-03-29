import "../styles/warehouse.css";
import AddWarehouse from "./AddWarehouse";
import EditWarehouse from "./EditWarehouse";


function Warehouse() {
  return (
    <section>
      <Routes>
        <Route path="/warehouses/add" element={<AddWarehouse />} />
        <Route path="/warehouses/edit/:id" element={<EditWarehouse />} />
      </Routes>
    </section>
  );
}

//still need to add the actual display list of warehouses? 
export default Warehouse;
