import { createSlice } from '@reduxjs/toolkit';
import { Dict } from '@shtcut-ui/react';

interface initialStateProps {
    pagination: Dict | null;
    showDropdown: boolean;
}

const initialState = {
    pagination: null,
    showDropdown: false
} as initialStateProps;

const UI_KEY = 'ui';

export const uiSlice = createSlice({
    name: UI_KEY,
    initialState,
    reducers: {
        paginate: (state, action) => {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    [action.payload.endpointName]: action.payload.pagination
                }
            };
        },
        toggleDropdown: (state) => {
            state.showDropdown = !state.showDropdown;
        },
        setDropdownState: (state, action) => {
            state.showDropdown = action.payload;
        }
    }
});

export const { paginate, toggleDropdown, setDropdownState } = uiSlice.actions;

export default uiSlice.reducer;
