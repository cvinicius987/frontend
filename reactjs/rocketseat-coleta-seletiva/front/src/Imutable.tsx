import React, {useState} from 'react';

interface HeaderProps {
    title?: String;
}

const Imutable: React.FC<HeaderProps> = (props) => {

  const [counter, setCounter] = useState(0);

  function handleCounter(){
    setCounter(counter + 1);
  }

    return (
        <header>
            Contador: {counter}
            <button onClick={handleCounter}>Click....</button>
        </header>
    );
}

export default Imutable;