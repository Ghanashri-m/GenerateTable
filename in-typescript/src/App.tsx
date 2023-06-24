import {FormEvent, useState} from 'react';
import './App.css';

interface TableProps {
  rows: number;
  columns: number;
}

const Table: React.FC<TableProps> = ({rows, columns}) => {
  return (
    <table>
      <tbody>
        {Array.from({ length: rows }, () => 0).map(
          (_, row) => (
            <tr key={row}>
              {
                Array.from({ length: columns }, () => 0).map(
                (_, col) => (
                  <td key={col}>
                    {col % 2 === 0
                      ? rows * col + (row + 1)
                      : rows * (col + 1) - row}
                  </td>
                ),
              )}
            </tr>
          ),
        )}
      </tbody>
    </table>
  )
}

function App() {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);

  return (
    <div className='app'>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const row = formData.get('rows');
          const col = formData.get('cols');
          console.log(col);
          if (typeof row === 'string' && typeof col === 'string') {
            setRows(parseInt(row, 10));
            setCols(parseInt(col, 10));
          }
        }}>
        <div>
          <label htmlFor='rows'>Rows</label>
          <input type='number' name='rows' id='rows' min={1} defaultValue={rows} />
        </div>
        <div>
          <label htmlFor='cols'>Columns</label>
          <input type='number' name='cols' id='cols' min={1} defaultValue={cols} />
        </div>
        <button type='submit'>Submit</button>
      </form>
      {Boolean(rows) && Boolean(cols) && (
      <Table rows={rows} columns={cols} />
    )}
    </div>
  );
}

export default App;