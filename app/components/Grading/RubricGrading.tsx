"use client";

import React, { useState } from "react";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";

interface RubricItem {
  id: string;
  category: string;
  weight: number;
  criteria: string[];
}

interface RubricGradingProps {
  onSave: (rubric: RubricItem[]) => void;
}

export const RubricGrading = ({ onSave }: RubricGradingProps) => {
  const [rubricItems, setRubricItems] = useState<RubricItem[]>([
    {
      id: "1",
      category: "Content",
      weight: 40,
      criteria: [
        "Excellent understanding",
        "Good understanding",
        "Basic understanding",
        "Limited understanding",
      ],
    },
    {
      id: "2",
      category: "Presentation",
      weight: 30,
      criteria: ["Professional", "Good", "Basic", "Needs improvement"],
    },
    {
      id: "3",
      category: "Research",
      weight: 30,
      criteria: ["Extensive", "Good", "Basic", "Limited"],
    },
  ]);

  const addRubricItem = () => {
    const newItem: RubricItem = {
      id: Date.now().toString(),
      category: "",
      weight: 0,
      criteria: ["Excellent", "Good", "Basic", "Poor"],
    };
    setRubricItems([...rubricItems, newItem]);
  };

  const removeRubricItem = (id: string) => {
    setRubricItems(rubricItems.filter((item) => item.id !== id));
  };

  const updateRubricItem = (
    id: string,
    field: keyof RubricItem,
    value: string | number | string[]
  ) => {
    setRubricItems(
      rubricItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const validateWeights = () => {
    const totalWeight = rubricItems.reduce((sum, item) => sum + item.weight, 0);
    return totalWeight === 100;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Grading Rubric</h2>
        <div className="flex gap-2">
          <button
            onClick={addRubricItem}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <FiPlus className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={() => onSave(rubricItems)}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
            disabled={!validateWeights()}
          >
            <FiSave className="w-4 h-4" />
            Save Rubric
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {rubricItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) =>
                    updateRubricItem(item.id, "category", e.target.value)
                  }
                  placeholder="Category name"
                  className="w-full px-3 py-2 border rounded-lg mb-2"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Weight:</span>
                  <input
                    type="number"
                    value={item.weight}
                    onChange={(e) =>
                      updateRubricItem(
                        item.id,
                        "weight",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-20 px-3 py-2 border rounded-lg"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-gray-600">%</span>
                </div>
              </div>
              <button
                onClick={() => removeRubricItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {item.criteria.map((criterion, index) => (
                <input
                  key={index}
                  type="text"
                  value={criterion}
                  onChange={(e) => {
                    const newCriteria = [...item.criteria];
                    newCriteria[index] = e.target.value;
                    updateRubricItem(item.id, "criteria", newCriteria);
                  }}
                  placeholder={`Criterion ${index + 1}`}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!validateWeights() && (
        <div className="mt-4 text-red-500 text-sm">
          Total weight must equal 100%
        </div>
      )}
    </div>
  );
};
