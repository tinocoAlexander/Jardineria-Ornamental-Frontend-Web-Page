import { useState } from "react";
import { useAppState } from "../../contexts/AppStateContext";

const ContentManager = () => {
  const { content, updateContent } = useAppState();
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [contentForm, setContentForm] = useState({ ...content });

  const handleEditContent = (field: keyof typeof content) => {
    setEditingContent(field);
    setContentForm({ ...content });
  };

  const handleSaveContent = () => {
    if (editingContent) {
      updateContent(
        editingContent as keyof typeof content,
        contentForm[editingContent as keyof typeof content]
      );
      setEditingContent(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contenido del Sitio</h2>
      {Object.entries(content).map(([key, value]) => (
        <div key={key} className="bg-white p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold capitalize">{key}</h4>
          {editingContent === key ? (
            <>
              <textarea
                className="w-full p-3 border rounded-lg mt-2"
                rows={4}
                value={contentForm[key as keyof typeof content]}
                onChange={(e) =>
                  setContentForm((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
              <div className="space-x-2 mt-2">
                <button
                  onClick={handleSaveContent}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingContent(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center mt-2">
              <p>{value}</p>
              <button
                onClick={() => handleEditContent(key as keyof typeof content)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentManager;
