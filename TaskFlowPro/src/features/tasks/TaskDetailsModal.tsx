import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Tag, CheckSquare, Trash2, AlertCircle, MessageSquare, Plus } from 'lucide-react';
import { Task, Priority, Label, ChecklistItem } from '../../types';
import { cn, getPriorityColor, getPriorityLabel } from '../../utils';
import { useTasks } from '../../hooks/useBoardData';
import { format } from 'date-fns';

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const PRIORITIES = [Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.URGENT];
const PRESET_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, isOpen, onClose }) => {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const { updateTask, deleteTask } = useTasks();
  const [newChecklistItem, setNewChecklistItem] = useState('');

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleUpdate = (updates: Partial<Task>) => {
    const updated = { ...editedTask, ...updates };
    setEditedTask(updated);
    updateTask(updated);
  };

  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    const newItem: ChecklistItem = {
      id: crypto.randomUUID(),
      text: newChecklistItem,
      completed: false,
    };
    handleUpdate({ checklist: [...editedTask.checklist, newItem] });
    setNewChecklistItem('');
  };

  const toggleChecklistItem = (id: string) => {
    const updatedChecklist = editedTask.checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    handleUpdate({ checklist: updatedChecklist });
  };

  const removeChecklistItem = (id: string) => {
    handleUpdate({ checklist: editedTask.checklist.filter(item => item.id !== id) });
  };

  const addLabel = (color: string) => {
    const newLabel: Label = {
      id: crypto.randomUUID(),
      text: 'Label',
      color,
    };
    handleUpdate({ labels: [...editedTask.labels, newLabel] });
  };

  const removeLabel = (id: string) => {
    handleUpdate({ labels: editedTask.labels.filter(l => l.id !== id) });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id, task.columnId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <CheckSquare size={20} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Task Details</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
            {/* Title */}
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => handleUpdate({ title: e.target.value })}
              className="w-full text-3xl font-bold text-slate-800 dark:text-slate-100 bg-transparent border-none outline-none mb-6 placeholder:text-slate-300"
              placeholder="Task Title"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Left Column: Meta */}
              <div className="md:col-span-2 space-y-8">
                {/* Description */}
                <section>
                  <div className="flex items-center gap-2 text-slate-400 mb-3">
                    <AlertCircle size={16} />
                    <h5 className="text-xs font-bold uppercase tracking-wider">Description</h5>
                  </div>
                  <textarea
                    value={editedTask.description}
                    onChange={(e) => handleUpdate({ description: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-300 outline-none focus:ring-2 ring-indigo-500/20 transition-all min-h-[120px] resize-none"
                    placeholder="Add a more detailed description..."
                  />
                </section>

                {/* Checklist */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckSquare size={16} />
                      <h5 className="text-xs font-bold uppercase tracking-wider">Checklist</h5>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                      {Math.round((editedTask.checklist.filter(i => i.completed).length / (editedTask.checklist.length || 1)) * 100)}%
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {editedTask.checklist.map(item => (
                      <div key={item.id} className="flex items-center gap-3 group">
                        <button
                          onClick={() => toggleChecklistItem(item.id)}
                          className={cn(
                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                            item.completed 
                              ? "bg-indigo-500 border-indigo-500 text-white" 
                              : "border-slate-300 dark:border-slate-700 hover:border-indigo-500"
                          )}
                        >
                          {item.completed && <CheckSquare size={12} />}
                        </button>
                        <span className={cn(
                          "text-sm flex-grow",
                          item.completed ? "text-slate-400 line-through" : "text-slate-600 dark:text-slate-300"
                        )}>
                          {item.text}
                        </span>
                        <button
                          onClick={() => removeChecklistItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addChecklistItem()}
                      placeholder="Add an item..."
                      className="flex-grow bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2 text-sm outline-none"
                    />
                    <button
                      onClick={addChecklistItem}
                      className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </section>
              </div>

              {/* Right Column: Controls */}
              <div className="space-y-6">
                {/* Priority */}
                <section>
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Priority</h5>
                  <div className="flex flex-col gap-2">
                    {PRIORITIES.map(p => (
                      <button
                        key={p}
                        onClick={() => handleUpdate({ priority: p })}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border-2",
                          editedTask.priority === p 
                            ? `${getPriorityColor(p)} border-transparent` 
                            : "border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700"
                        )}
                      >
                        <div className={cn("w-2 h-2 rounded-full", editedTask.priority === p ? "bg-white" : getPriorityColor(p).split(' ')[0])} />
                        {getPriorityLabel(p)}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Due Date */}
                <section>
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Due Date</h5>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="date"
                      value={editedTask.dueDate || ''}
                      onChange={(e) => handleUpdate({ dueDate: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 outline-none"
                    />
                  </div>
                </section>

                {/* Labels */}
                <section>
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Labels</h5>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editedTask.labels.map(label => (
                      <div
                        key={label.id}
                        className="group relative flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white"
                        style={{ backgroundColor: label.color }}
                      >
                        {label.text}
                        <button onClick={() => removeLabel(label.id)} className="hover:scale-110 transition-transform">
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {PRESET_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => addLabel(color)}
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </section>

                {/* Estimated Time */}
                <section>
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Estimate (mins)</h5>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="number"
                      value={editedTask.estimatedTime || ''}
                      onChange={(e) => handleUpdate({ estimatedTime: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 outline-none"
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Created {format(new Date(editedTask.createdAt), 'MMM d, yyyy')}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
