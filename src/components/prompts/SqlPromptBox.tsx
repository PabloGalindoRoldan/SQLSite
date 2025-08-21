import { RotateCw } from "lucide-react";
import { sqlPrompts, PromptItem } from "./SqlPrompts";

interface SqlPromptBoxProps {
  selectedDb: string;
  currentPrompt: PromptItem | null;
  setCurrentPrompt: (p: PromptItem | null) => void;
}

export default function SqlPromptBox({
  selectedDb,
  currentPrompt,
  setCurrentPrompt,
}: SqlPromptBoxProps) {
  const prompts = sqlPrompts[selectedDb] ?? [];

  // Utility para obtener un prompt aleatorio
  const getRandomPrompt = (exclude?: PromptItem): PromptItem | null => {
    if (prompts.length === 0) return null;
    if (prompts.length === 1) return prompts[0];

    let newPrompt: PromptItem;
    do {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    } while (exclude && newPrompt.prompt === exclude.prompt);

    return newPrompt;
  };

  const refreshPrompt = () => {
    const newPrompt = getRandomPrompt(currentPrompt ?? undefined);
    if (newPrompt) setCurrentPrompt(newPrompt);
  };

  return (
    <div className="relative text-gray-600 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-shrink-0 w-6"></div>

        <p className="text-sm text-center flex-1 px-2">
          {currentPrompt?.prompt ?? "No hay prompts disponibles"}
        </p>

        <div className="flex-shrink-0 w-6">
          <button
            onClick={refreshPrompt}
            className="p-1 rounded-md hover:bg-gray-200 transition w-full"
            title="Nuevo Problema"
          >
            <RotateCw className="h-4 w-4 text-gray-600 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
