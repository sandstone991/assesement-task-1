import { PageItem, PageSelector } from 'components/pageSelector';
const generatePages = (count: number): PageItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Page ${i + 1}`,
    defaultChecked: Math.random() > 0.5
  }));
};
function Home() {
  const pages = generatePages(6);
  return (
    <div
      className="flex size-full items-center justify-center font-Montserrat text-[14px] font-normal"
      style={{
        lineHeight: '18.2px',
        color: 'rgb(31, 33, 40)'
      }}
    >
      <PageSelector pages={pages} className="size-fit" />
    </div>
  );
}

export default Home;
