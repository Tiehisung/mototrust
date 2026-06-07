import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ICreateListingFormData } from '@/pages/dashboard/Listings/validations';
import { EListingType } from '@/types/listing';

// ============================================
// TYPES
// ============================================
export interface ListingDraftState {
    data: Partial<ICreateListingFormData>;
    currentStep: number;
    isDirty: boolean;
    lastSaved: string | null;
}

// ============================================
// INITIAL STATE
// ============================================
const initialState: ListingDraftState = {
    data: {
        priceNegotiable: true,
        hasDocuments: false,
        listingType: 'standard' as EListingType,
        condition: undefined,
        brand: '',
        location: '',
        images: [],
    },
    currentStep: 1,
    isDirty: false,
    lastSaved: null,
};

// ============================================
// SLICE
// ============================================
const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        // Update entire form data at once
        updateFormData: (state, action: PayloadAction<Partial<ICreateListingFormData>>) => {
            state.data = { ...state.data, ...action.payload };
            state.isDirty = true;
            state.lastSaved = new Date().toISOString();
        },

        // Update single field
        updateField: (
            state,
            action: PayloadAction<{ field: keyof ICreateListingFormData; value: any }>
        ) => {
            (state.data as any)[action.payload.field] = action.payload.value;
            state.isDirty = true;
            state.lastSaved = new Date().toISOString();
        },

        // Set current step
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
            state.lastSaved = new Date().toISOString();
        },

        // Image management (URLs only)
        setImages: (state, action: PayloadAction<string[]>) => {
            state.data.images = action.payload;
            state.isDirty = true;
        },

        addImageUrl: (state, action: PayloadAction<string>) => {
            if (!state.data.images) state.data.images = [];
            state.data.images.push(action.payload);
            state.isDirty = true;
        },

        removeImageUrl: (state, action: PayloadAction<number>) => {
            if (state.data.images) {
                state.data.images.splice(action.payload, 1);
                state.isDirty = true;
            }
        },

        // Reset form
        resetForm: () => initialState,

        // Mark clean after successful submit
        markClean: (state) => {
            state.isDirty = false;
        },

        // Restore draft
        restoreDraft: (_state, action: PayloadAction<ListingDraftState>) => {
            return action.payload;
        },
    },
});

export const {
    updateFormData,
    updateField,
    setCurrentStep,
    setImages,
    addImageUrl,
    removeImageUrl,
    resetForm,
    markClean,
    restoreDraft,
} = listingSlice.actions;

export default listingSlice.reducer;