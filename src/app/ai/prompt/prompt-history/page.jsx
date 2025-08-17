"use client";
import { useEffect, useState } from "react";
import {
  Bot,
  Trash2,
  Search,
  Loader2,
  Eye,
  Filter,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Brain,
  X,
  RefreshCw,
  Archive,
  Tag,
} from "lucide-react";
import PromptDetail from "../[PromptId]/page";
import { api } from "../../../../utils/Axios";
import NavBar from "../../../../components/heading";
import BottomNav from "../../../../components/bottomBar";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";

const PromptHistory = () => {
  const [prompts, setPrompts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState("");
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
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
      setError("Failed to fetch prompts. Please try again.");
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
    if (
      !window.confirm(
        "Are you sure you want to delete this conversation? This action cannot be undone."
      )
    )
      return;
    setDeleteLoading(id);
    setError("");
    try {
      await api.delete(`/ai/prompts/${id}`);
      setPrompts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete prompt. Please try again.");
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

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 12,
      promptType: "",
      plantType: "",
      diseaseType: "",
    });
  };

  // Pagination controls
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      general: "from-blue-400 to-blue-500",
      diagnosis: "from-red-400 to-red-500",
      treatment: "from-green-400 to-green-500",
      prevention: "from-yellow-400 to-yellow-500",
      disease_info: "from-purple-400 to-purple-500",
      ai_treatment: "from-teal-400 to-teal-500",
    };
    return colors[type] || "from-gray-400 to-gray-500";
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((v) => v && v !== 1 && v !== 12)
      .length;
  };

  return (
    <>
      {/* Top Nav */}
      <div className="fixed top-0 left-0 flex shadow-lg px-4 py-4 bg-white w-full h-14 z-50">
        <Link href="/ai/prompt" className="flex items-center gap-2">
          <HiArrowLeft className="text-gray-800 text-xl" />
        </Link>
        <h2 className="absolute left-1/3 transform -translate-x-1/2 text-gray-800 font-semibold text-base sm:text-lg truncate">
          AI Conversation History
        </h2>
      </div>
      <div className="min-h-screen bg-gray-100 py-24 px-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-200 mb-8 p-0 overflow-hidden">
            <div className="px-8 py-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-green-100 border border-green-200">
                    <Archive className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                      Conversation History
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Review your AI plant disease consultations
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      showFilters || getActiveFiltersCount() > 0
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {getActiveFiltersCount() > 0 && (
                      <span className="bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={fetchPrompts}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all duration-200"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-slideDown">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="plantType"
                        value={filters.plantType}
                        onChange={handleFilterChange}
                        placeholder="Search by plant type..."
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm min-w-[200px]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        name="diseaseType"
                        value={filters.diseaseType}
                        onChange={handleFilterChange}
                        placeholder="Search by disease..."
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm min-w-[200px]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <select
                        name="promptType"
                        value={filters.promptType}
                        onChange={handleFilterChange}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
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
                    {getActiveFiltersCount() > 0 && (
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200 text-sm"
                      >
                        <X className="w-4 h-4" />
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-0 overflow-hidden">
            <div className="p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
                    <Brain className="w-6 h-6 text-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-gray-600 text-lg">
                    Loading conversations...
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="p-4 rounded-full bg-red-100 border border-red-200 mb-4">
                    <X className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-red-600 text-lg font-medium mb-4">
                    {error}
                  </p>
                  <button
                    onClick={fetchPrompts}
                    className="px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : prompts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="p-6 rounded-full bg-gray-100 border border-gray-200 mb-6">
                    <MessageSquare className="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No conversations found
                  </h3>
                  <p className="text-gray-600 text-center max-w-md">
                    {getActiveFiltersCount() > 0
                      ? "Try adjusting your filters to see more results."
                      : "Start your first AI conversation to see your history here."}
                  </p>
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-200"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Results Summary */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                      Showing{" "}
                      <span className="text-gray-800 font-medium">
                        {prompts.length}
                      </span>{" "}
                      of{" "}
                      <span className="text-gray-800 font-medium">
                        {pagination.total || 0}
                      </span>{" "}
                      conversations
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      Latest conversations first
                    </div>
                  </div>

                  {/* Conversation Cards */}
                  <div className="grid gap-4">
                    {prompts.map((prompt) => (
                      <ConversationCard
                        key={prompt._id}
                        prompt={prompt}
                        onView={() => setSelectedPromptId(prompt._id)}
                        onDelete={() => handleDeletePrompt(prompt._id)}
                        deleteLoading={deleteLoading === prompt._id}
                        formatDate={formatDate}
                        getTypeColor={getTypeColor}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-sm">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-all duration-200"
                      disabled={filters.page <= 1}
                      onClick={() => handlePageChange(filters.page - 1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, pagination.totalPages) },
                        (_, i) => {
                          const page = i + 1;
                          const isActive = page === filters.page;
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                                isActive
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                      )}
                    </div>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-all duration-200"
                      disabled={filters.page >= pagination.totalPages}
                      onClick={() => handlePageChange(filters.page + 1)}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Detail Modal */}
          {selectedPromptId && (
            <PromptDetail
              PromptId={selectedPromptId}
              onClose={() => setSelectedPromptId(null)}
            />
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>

      <BottomNav />
    </>
  );
};

// Enhanced Conversation Card Component
const ConversationCard = ({
  prompt,
  onView,
  onDelete,
  deleteLoading,
  formatDate,
  getTypeColor,
}) => {
  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-100 border border-green-200">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${getTypeColor(
                    prompt.promptType
                  )}`}
                ></span>
                <span className="text-gray-800 font-medium capitalize text-sm">
                  {prompt.promptType || "General"}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">
                  {formatDate(prompt.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">
                Your Question
              </p>
              <p className="text-gray-800 text-sm leading-relaxed">
                {truncateText(prompt.userPrompt || prompt.symptoms) || (
                  <span className="italic text-gray-400">
                    No prompt available
                  </span>
                )}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">
                AI Response
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {truncateText(prompt.aiResponse || prompt.diagnosis) || (
                  <span className="italic text-gray-400">
                    No response available
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Tags */}
          {(prompt.plantType || prompt.diseaseType) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {prompt.plantType && (
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs">
                  Plant: {prompt.plantType}
                </span>
              )}
              {prompt.diseaseType && (
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-xs">
                  Disease: {prompt.diseaseType}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-200"
            title="View conversation"
            onClick={onView}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
            title="Delete conversation"
            disabled={deleteLoading}
            onClick={onDelete}
          >
            {deleteLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptHistory;