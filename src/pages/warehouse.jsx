import '../styles/warehouse.scss';
import Hero from '../components/Hero/Hero';
import TableHeader from '../components/TableHeader/TableHeader';
import TableRow from '../components/TableRow/TableRow';

function Warehouse() {
    const warehouse = {
        name: 'Manhattan',
        link: '/warehouse',
        address: '123 Main St, New York, NY 10001',
        contactName: 'John Doe',
        phoneNumber: '(123) 456-7890',
        email: 'd4q3A@example.com'
    }

    return (
        <main className="warehouse">
            <Hero />
            <TableHeader />
            <TableRow warehouse={warehouse}/>
        </main>
    );
}

export default Warehouse;