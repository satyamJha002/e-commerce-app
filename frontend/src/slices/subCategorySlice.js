import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategories: [],
  selectedSubCategory: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrev: false,
  },
  filters: {
    search: "",
    categoryId: "",
    status: "",
  },
};

const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },

    clearSelectedSubCategory: (state) => {
      state.selectedSubCategory = null;
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        search: "",
        categoryId: "",
        status: "",
      };
    },

    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    // Manual update of sub-category (for optimistic updates)
    updateSubCategoryInList: (state, action) => {
      const updatedSubCategory = action.payload;
      const index = state.subCategories.findIndex(
        (sc) => sc._id === updatedSubCategory._id
      );
      if (index !== -1) {
        state.subCategories[index] = updatedSubCategory;
      }
    },

    removeSubCategoryFromList: (state, action) => {
      const id = action.payload;
      state.subCategories = state.subCategories.filter((sc) => sc._id !== id);
    },

    // Reset to initial state
    resetSubCategoryState: (state) => {
      return initialState;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setSelectedSubCategory,
  clearSelectedSubCategory,
  setFilters,
  clearFilters,
  setPagination,
  updateSubCategoryInList,
  removeSubCategoryFromList,
  resetSubCategoryState,
} = subCategorySlice.actions;

export default subCategorySlice.reducer;
