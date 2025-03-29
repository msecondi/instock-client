const EditWarehouse = () => {
    const { id } = useParams(); // Get warehouse ID from URL
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Fetch existing warehouse data
    useEffect(() => {
      const fetchWarehouse = async () => {
        try {
          // Replace with your actual API endpoint
          const response = await axios.get(`http://localhost:8080/api/warehouses/${id}`);
          setWarehouse(response.data);
        } catch (error) {
          console.error('Error fetching warehouse:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchWarehouse();
    }, [id]);
    
    const handleSubmit = async (formData) => {
      try {
        // PUT request for updating an existing warehouse
        await axios.put(`http://localhost:8080/api/warehouses/${id}`, formData);
        navigate('/warehouses');
      } catch (error) {
        console.error('Error updating warehouse:', error);
      }
    };
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    return (
      <div className="edit-warehouse">
        <WarehouseForm 
          initialValues={warehouse} // Pre-populate with existing data
          onSubmit={handleSubmit}
          isEditMode={true}
        />
      </div>
    );
  };