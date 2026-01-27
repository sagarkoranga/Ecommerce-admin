export default function CategoryTree({ categories, onEdit, onDelete }) {
return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Categories
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr
              key={cat.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-gray-800">
                    {cat.name}
                  </span>

                  {/* Nested Children */}
                  {cat.children?.length > 0 && (
                    <div className="ml-6 mt-2 border-l pl-4 border-gray-300">
                      <CategoryTree
                        categories={cat.children}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  )}
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(cat)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(cat.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}