"use client";
import { useEffect, useState } from "react";
import { Bot, Trash2, Search, Loader2, Eye } from "lucide-react";
import axios from "axios";
import PromptDetail from "../[PromptId]/page";
import { api } from "../../../../utils/Axios";

const PromptHistory = () => {
  const [prompts, setPrompts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState("");
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    promptType: "",
    plantType: "",
    diseaseType: "",
  });

  // Fetch prompts with filters
  const fetchPrompts = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params[k] = v;
      });
      const res = await api.get("/ai/prompts", { params });
      setPrompts(res.data?.data?.prompts || []);
      setPagination(res.data?.data?.pagination || {});
    } catch (err) {
      setError("Failed to fetch prompts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
    // eslint-disable-next-line
  }, [
    filters.page,
    filters.limit,
    filters.promptType,
    filters.plantType,
    filters.diseaseType,
  ]);

  // Delete prompt
  const handleDeletePrompt = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prompt?")) return;
    setDeleteLoading(id);
    setError("");
    try {
      await api.delete(`/ai/prompts/${id}`);
      setPrompts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete prompt.");
    } finally {
      setDeleteLoading("");
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };

  // Pagination controls
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-[#181c20] via-[#23272f] to-[#181c20] py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-[#20262d] rounded-3xl shadow-2xl border border-green-400/30 p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-8 pt-8 pb-4">
          <Bot className="w-8 h-8 text-green-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            AI Prompt History
          </h2>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 px-8 pb-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="plantType"
              value={filters.plantType}
              onChange={handleFilterChange}
              placeholder="Plant type"
              className="bg-[#23272f] border border-[#2a2d34] rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="diseaseType"
              value={filters.diseaseType}
              onChange={handleFilterChange}
              placeholder="Disease type"
              className="bg-[#23272f] border border-[#2a2d34] rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <div>
            <select
              name="promptType"
              value={filters.promptType}
              onChange={handleFilterChange}
              className="bg-[#23272f] border border-[#2a2d34] rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="">All Types</option>
              <option value="general">General</option>
              <option value="diagnosis">Diagnosis</option>
              <option value="treatment">Treatment</option>
              <option value="prevention">Prevention</option>
              <option value="disease_info">Disease Info</option>
              <option value="ai_treatment">AI Treatment</option>
            </select>
          </div>
        </div>
        {/* Table/List */}
        <div className="px-4 md:px-8 pb-4">
          {loading ? (
            <div className="flex items-center gap-2 text-blue-300 text-base mt-8">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading prompts...
            </div>
          ) : error ? (
            <div className="text-red-400 text-sm mt-4">{error}</div>
          ) : prompts.length === 0 ? (
            <div className="text-gray-400 italic mt-8">No prompts found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead>
                  <tr className="text-gray-400 border-b border-[#2a2d34]">
                    <th className="py-2 px-2">Prompt</th>
                    <th className="py-2 px-2">Type</th>
                    {/* <th className="py-2 px-2">Plant</th> */}
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prompts.map((p) => (
                    <PromptListItem
                      key={p._id}
                      prompt={p}
                      onView={() => setSelectedPromptId(p._id)}
                      onDelete={() => handleDeletePrompt(p._id)}
                      deleteLoading={deleteLoading === p._id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-4">
            <button
              className="px-3 py-1 rounded bg-[#23272f] border border-[#2a2d34] text-white disabled:opacity-50"
              disabled={filters.page <= 1}
              onClick={() => handlePageChange(filters.page - 1)}
            >
              Prev
            </button>
            <span className="text-gray-300 text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-[#23272f] border border-[#2a2d34] text-white disabled:opacity-50"
              disabled={filters.page >= pagination.totalPages}
              onClick={() => handlePageChange(filters.page + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* Prompt Detail Modal */}
        {selectedPromptId && (
          <PromptDetail
            PromptId={selectedPromptId}
            onClose={() => setSelectedPromptId(null)}
          />
        )}
      </div>
      {/* Custom scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2d34;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

// PromptListItem component
const PromptListItem = ({ prompt, onView, onDelete, deleteLoading }) => (
  <tr className="border-b border-[#23272f] hover:bg-[#23272f]/60 transition">
    <td
      className="py-2 px-2 max-w-[260px] truncate"
      title={prompt.prompt || prompt.symptoms || ""}
    >
      {prompt.userPrompt || prompt.symptoms || (
        <span className="italic text-gray-500">No prompt</span>
      )}
    </td>
    <td className="py-2 px-2 capitalize">{prompt.promptType || "—"}</td>
    {/* <td className="py-2 px-2">{prompt.plantType || "—"}</td> */}
    <td className="py-2 px-2">
      {prompt.createdAt ? new Date(prompt.createdAt).toLocaleString() : "—"}
    </td>
    <td className="py-2 px-2 flex gap-2">
      <button
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        title="View"
        onClick={onView}
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
        title="Delete"
        disabled={deleteLoading}
        onClick={onDelete}
      >
        {deleteLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </td>
  </tr>
);

export default PromptHistory;
