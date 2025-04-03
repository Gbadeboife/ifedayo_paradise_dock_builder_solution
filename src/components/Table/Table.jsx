import React from 'react'

export const Table = ( { className, tableColumns, tableData } ) => {
  return (
    <div className={ `shadow overflow-x-auto border-b border-gray-200 ${ className }` }>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            { tableColumns.map( ( column, i ) => (
              <th
                key={ i }
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                onClick={ () => onSort( i ) }
              >
                { column.header }
                <span>
                  { column.isSorted
                    ? column.isSortedDesc
                      ? " ▼"
                      : " ▲"
                    : "" }
                </span>
              </th>
            ) ) }
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          { tableData.map( ( row, i ) => {
            return (
              <tr key={ i }>
                { tableColumns.map( ( cell, index ) => {
                  if ( cell.accessor == "" ) {
                    return (
                      <td
                        key={ index }
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {/* <button
                              className="text-xs"
                              onClick={ () => {
                                navigate( "/admin/edit-quotes/" + row.id, {
                                  state: row,
                                } );
                              } }
                            >
                              { " " }
                              Edit
                            </button> */}
                        <button
                          className="text-xs px-1 text-blue-500"
                          onClick={ () => {
                            navigate( "/admin/view-quotes/" + row.id, {
                              state: row,
                            } );
                          } }
                        >
                          { " " }
                          View
                        </button>
                        <button
                          className="text-xs px-1 text-red-500"
                          onClick={ () => deleteItem( row.id ) }
                        >
                          { " " }
                          Delete
                        </button>
                      </td>
                    );
                  }
                  if ( cell.mappingExist ) {
                    return (
                      <td
                        key={ index }
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        { cell.mappings[ row[ cell.accessor ] ] }
                      </td>
                    );
                  }
                  return (
                    <td key={ index } className="px-6 py-4 whitespace-nowrap">
                      { [ "image", "top_view", "thumbnail" ].includes( cell.accessor ) ? <img className={ `rounded-md` } src={ row[ cell.accessor ] } /> : row[ cell.accessor ] }
                    </td>
                  );
                } ) }
              </tr>
            );
          } ) }
        </tbody>
      </table>
    </div>

  )
}