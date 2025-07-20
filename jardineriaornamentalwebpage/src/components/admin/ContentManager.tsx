import { useEffect, useState } from "react";
import { useAppState, Content } from "../../contexts/AppStateContext";
import ContentCard from "./components/ContentCard";

const ContentManager = () => {
  const { content, loadContent, updateContent, toggleActivo, deleteContent } =
    useAppState();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Partial<Content>>({});

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleEdit = (item: Content) => {
    setEditingId(item._id);
    setFormState({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormState({});
  };

  const handleChange = (field: keyof Content, value: string | boolean) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleSave = async () => {
    if (!editingId) return;
    await updateContent(editingId, formState);
    setEditingId(null);
  };

  if (!content) return <div className="p-6">Cargando contenido...</div>;

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Gestión de Contenido
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((item) => (
          <ContentCard
            key={item._id}
            item={item}
            isEditing={editingId === item._id}
            formState={formState}
            onEdit={() => handleEdit(item)}
            onCancel={handleCancel}
            onChange={handleChange}
            onSave={handleSave}
            onToggle={() => toggleActivo(item._id)}
            onDelete={() => deleteContent(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentManager;
