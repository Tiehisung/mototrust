import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { ICreateListingFormData } from '@/pages/dashboard/Listings/validations';
import {
    updateField,
    setCurrentStep,
    setImages,
    addImageUrl,
    removeImageUrl,
    resetForm,
    markClean,
    updateFormData,
} from '@/store/slices/listing.slice';

export const useListingForm = () => {
    const dispatch = useDispatch();
    const { data, currentStep, isDirty, lastSaved } = useSelector(
        (state: RootState) => state.listing
    );

    const updateFieldValue = useCallback(
        <K extends keyof ICreateListingFormData>(field: K, value: ICreateListingFormData[K]) => {
            dispatch(updateField({ field, value }));
        },
        [dispatch]
    );

    const updateMultipleFields = useCallback(
        (fields: Partial<ICreateListingFormData>) => {
            dispatch(updateFormData(fields));
        },
        [dispatch]
    );

    const goToStep = useCallback(
        (step: number) => {
            dispatch(setCurrentStep(step));
        },
        [dispatch]
    );

    // Image handlers (URL-based)
    const handleImagesChange = useCallback(
        (urls: string[]) => {
            dispatch(setImages(urls));
        },
        [dispatch]
    );

    const handleAddImageUrl = useCallback(
        (url: string) => {
            dispatch(addImageUrl(url));
        },
        [dispatch]
    );

    const handleRemoveImageUrl = useCallback(
        (index: number) => {
            dispatch(removeImageUrl(index));
        },
        [dispatch]
    );

    const clearForm = useCallback(() => {
        dispatch(resetForm());
    }, [dispatch]);

    const handleSubmitSuccess = useCallback(() => {
        dispatch(markClean());
    }, [dispatch]);

    return {
        // State
        formData: data as ICreateListingFormData,
        currentStep,
        isDirty,
        lastSaved,

        // Actions
        updateField: updateFieldValue,
        updateMultipleFields,
        goToStep,
        setCurrentStep: goToStep,
        handleImagesChange,
        handleAddImageUrl,
        handleRemoveImageUrl,
        clearForm,
        submitSuccess: handleSubmitSuccess,
    };
};