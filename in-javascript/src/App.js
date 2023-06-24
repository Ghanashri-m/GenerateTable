import './App.css';
import {useState} from 'react';

const Table = ({rows, columns}) => {
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

export default function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  return (
    <div className="app">
      <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const row = formData.get('rows');
          const col = formData.get('cols');
          setRows(row);
          setCols(col);
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