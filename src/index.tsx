import Home from 'pages/Home';
import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(<Home />);
