import { Checkbox, CheckState } from 'components/checkbox';
import { useState } from 'react';

function Home() {
  const [checked, setChecked] = useState<CheckState>('indeterminate');
  return (
    <div className="relative items-center justify-center overflow-hidden bg-gray-300 p-20 text-5xl">
      <Checkbox
        checked={checked}
        onCheck={(e) => {
          setChecked(e);
        }}
        size="lg"
      />
      <Checkbox
        checked={checked}
        onCheck={(e) => {
          setChecked(e);
        }}
        size="lg"
      />
    </div>
  );
}

export default Home;
